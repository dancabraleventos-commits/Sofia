/**
 * Reprocessador de leads que responderam mas não receberam resposta da Sofia.
 *
 * Lógica:
 * 1. Busca leads com mensagens inbound de ONTEM na tabela messages
 *    mas sem nenhuma mensagem outbound correspondente.
 * 2. Para cada um, pega a última mensagem do lead e reprocessa
 *    pela engine da Sofia exatamente como faria no webhook.
 * 3. Envia a resposta via Evolution API e salva no Supabase.
 *
 * Pode ser chamado via:
 *   - POST /jobs/reprocess-unanswered  (endpoint HTTP)
 *   - node src/jobs/reprocess-unanswered.js  (linha de comando)
 */

const { createClient } = require('@supabase/supabase-js');
const { respondWithSofia } = require('../sofia/engine');
const { sendWhatsAppMessage } = require('../evolution/client');
const { saveMessage, updateConversationState, markLeadResponded } = require('../supabase/mutations');
const { getRecentMessages, getConversationState } = require('../supabase/queries');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const INSTANCE_NAME = process.env.EVOLUTION_INSTANCE || 'Sofia';
const DELAY_BETWEEN_MS = 3000; // 3 segundos entre cada envio para não banir

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Retorna início e fim de ontem no fuso de Brasília (UTC-3).
 */
function getYesterdayRange() {
  const now = new Date();

  // Ontem 00:00:00 BRT = ontem 03:00:00 UTC
  const start = new Date(now);
  start.setUTCDate(start.getUTCDate() - 1);
  start.setUTCHours(3, 0, 0, 0);

  // Ontem 23:59:59 BRT = hoje 02:59:59 UTC
  const end = new Date(now);
  end.setUTCHours(2, 59, 59, 999);

  return { start, end };
}

/**
 * Busca leads que têm mensagem inbound de ONTEM mas NENHUMA outbound.
 * Esses são os leads que responderam ontem e ficaram sem retorno da Sofia.
 */
async function findUnansweredLeads() {
  const { start, end } = getYesterdayRange();

  console.log(`[Reprocess] Buscando mensagens de ontem: ${start.toISOString()} até ${end.toISOString()}`);

  // Leads que têm pelo menos 1 mensagem inbound de ontem
  const { data: leadsWithInbound, error: err1 } = await supabase
    .from('messages')
    .select('lead_id')
    .eq('direction', 'inbound')
    .gte('created_at', start.toISOString())
    .lte('created_at', end.toISOString());

  if (err1) {
    console.error('[Reprocess] Erro buscando inbound:', err1.message);
    return [];
  }

  const inboundLeadIds = [...new Set((leadsWithInbound || []).map(m => m.lead_id))];
  if (inboundLeadIds.length === 0) {
    console.log('[Reprocess] Nenhuma mensagem inbound encontrada ontem.');
    return [];
  }

  console.log(`[Reprocess] ${inboundLeadIds.length} leads responderam ontem.`);

  // Leads que têm pelo menos 1 mensagem outbound (qualquer data)
  const { data: leadsWithOutbound, error: err2 } = await supabase
    .from('messages')
    .select('lead_id')
    .eq('direction', 'outbound')
    .in('lead_id', inboundLeadIds);

  if (err2) {
    console.error('[Reprocess] Erro buscando outbound:', err2.message);
    return [];
  }

  const outboundLeadIds = new Set((leadsWithOutbound || []).map(m => m.lead_id));

  // Leads que responderam ontem mas nunca receberam resposta da Sofia
  const unansweredLeadIds = inboundLeadIds.filter(id => !outboundLeadIds.has(id));

  if (unansweredLeadIds.length === 0) {
    console.log('[Reprocess] Todos os leads de ontem já foram respondidos.');
    return [];
  }

  console.log(`[Reprocess] ${unansweredLeadIds.length} leads sem resposta encontrados.`);

  // Busca os dados completos dos leads
  const { data: leads, error: err3 } = await supabase
    .from('leads')
    .select('*')
    .in('id', unansweredLeadIds);

  if (err3) {
    console.error('[Reprocess] Erro buscando dados dos leads:', err3.message);
    return [];
  }

  return leads || [];
}

/**
 * Busca a última mensagem inbound de um lead (o que ele escreveu).
 */
async function getLastInboundMessage(leadId) {
  const { data, error } = await supabase
    .from('messages')
    .select('text, created_at')
    .eq('lead_id', leadId)
    .eq('direction', 'inbound')
    .order('created_at', { ascending: false })
    .limit(1)
    .single();

  if (error) return null;
  return data?.text || null;
}

/**
 * Reprocessa um lead individualmente.
 */
async function reprocessLead(lead) {
  const phone = lead.telefone || lead.phone;
  const nome = lead.nome || lead.name || 'Lead';

  console.log(`[Reprocess] Processando: ${nome} (${phone})`);

  try {
    const lastText = await getLastInboundMessage(lead.id);
    if (!lastText) {
      console.warn(`[Reprocess] Nenhuma mensagem inbound para lead ${lead.id}`);
      return false;
    }

    const [recentMessages, convState] = await Promise.all([
      getRecentMessages(lead.id, 10),
      getConversationState(lead.id),
    ]);

    if (!lead.respondeu_whatsapp) {
      await markLeadResponded(lead.id);
    }

    const { reply, newState } = await respondWithSofia({
      lead,
      text: lastText,
      recentMessages,
      convState,
    });

    if (!reply) {
      console.warn(`[Reprocess] Sofia não gerou resposta para ${phone}`);
      return false;
    }

    await sendWhatsAppMessage({
      instanceName: INSTANCE_NAME,
      phone,
      message: reply,
    });

    await saveMessage({
      lead_id: lead.id,
      direction: 'outbound',
      text: reply,
    });

    await updateConversationState(lead.id, newState);

    console.log(`[Reprocess] ✅ Respondido: ${nome} (${phone})`);
    return true;

  } catch (err) {
    console.error(`[Reprocess] Erro ao processar ${phone}:`, err.message);
    return false;
  }
}

/**
 * Função principal — roda o reprocessamento completo.
 */
async function runReprocess() {
  console.log('[Reprocess] Iniciando reprocessamento de leads sem resposta (ontem)...');

  const leads = await findUnansweredLeads();

  if (leads.length === 0) {
    return { processed: 0, success: 0, failed: 0 };
  }

  let success = 0;
  let failed = 0;

  for (let i = 0; i < leads.length; i++) {
    const lead = leads[i];
    console.log(`[Reprocess] ${i + 1}/${leads.length}`);

    const ok = await reprocessLead(lead);
    if (ok) success++;
    else failed++;

    if (i < leads.length - 1) {
      await sleep(DELAY_BETWEEN_MS);
    }
  }

  console.log(`[Reprocess] Concluído. ✅ ${success} respondidos | ❌ ${failed} falhas`);
  return { processed: leads.length, success, failed };
}

module.exports = { runReprocess };

// Permite rodar direto via: node src/jobs/reprocess-unanswered.js
if (require.main === module) {
  require('dotenv').config();
  runReprocess()
    .then(result => {
      console.log('[Reprocess] Resultado final:', result);
      process.exit(0);
    })
    .catch(err => {
      console.error('[Reprocess] Erro fatal:', err);
      process.exit(1);
    });
}
