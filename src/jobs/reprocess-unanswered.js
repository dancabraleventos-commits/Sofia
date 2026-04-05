/**
 * Reprocessador — envia follow-up para leads de Barbearia e Salão de Beleza
 * que receberam o primeiro contato nas últimas 48h mas não foram respondidos pela Sofia.
 */

const { createClient } = require('@supabase/supabase-js');
const { respondWithSofia } = require('../sofia/engine');
const { sendWhatsAppMessage } = require('../evolution/client');
const { saveMessage, updateConversationState } = require('../supabase/mutations');
const { getRecentMessages, getConversationState } = require('../supabase/queries');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const INSTANCE_NAME = process.env.EVOLUTION_INSTANCE || 'Sofia';
const DELAY_BETWEEN_MS = 3000;

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function findUnansweredLeads() {
  console.log('[Reprocess] Buscando leads de Barbearia e Salão de Beleza das últimas 48h...');

  const cutoff = new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString();

  const { data: leads, error } = await supabase
    .from('leads')
    .select('*')
    .in('categoria', ['Barbearia', 'Salão de Beleza'])
    .eq('whatsapp_enviado', true)
    .gte('whatsapp_enviado_em', cutoff);

  if (error) {
    console.error('[Reprocess] Erro buscando leads:', error.message);
    return [];
  }

  if (!leads || leads.length === 0) {
    console.log('[Reprocess] Nenhum lead encontrado.');
    return [];
  }

  console.log(`[Reprocess] ${leads.length} leads encontrados. Filtrando sem resposta da Sofia...`);

  const leadIds = leads.map(l => l.id);

  // Remove os que já têm mensagem outbound (já foram respondidos)
  const { data: outbound, error: err2 } = await supabase
    .from('messages')
    .select('lead_id')
    .eq('direction', 'outbound')
    .in('lead_id', leadIds);

  if (err2) {
    console.error('[Reprocess] Erro buscando outbound:', err2.message);
    return [];
  }

  const respondedIds = new Set((outbound || []).map(m => m.lead_id));
  const unanswered = leads.filter(l => !respondedIds.has(l.id));

  console.log(`[Reprocess] ${unanswered.length} leads sem resposta da Sofia.`);
  return unanswered;
}

async function reprocessLead(lead) {
  const phone = lead.telefone || lead.phone;
  const nome = lead.nome || lead.name || 'Lead';

  console.log(`[Reprocess] Processando: ${nome} (${phone})`);

  try {
    const [recentMessages, convState] = await Promise.all([
      getRecentMessages(lead.id, 10),
      getConversationState(lead.id),
    ]);

    const text = recentMessages.length > 0
      ? recentMessages[recentMessages.length - 1].text
      : 'Oi';

    const { reply, newState } = await respondWithSofia({
      lead,
      text,
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
    console.error(`[Reprocess] ❌ Erro ao processar ${phone}:`, err.message);
    return false;
  }
}

async function runReprocess() {
  console.log('[Reprocess] Iniciando reprocessamento...');

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
