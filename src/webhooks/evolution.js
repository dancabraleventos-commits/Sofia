const { getLead, getRecentMessages, getConversationState } = require('../supabase/queries');
const { saveMessage, updateConversationState } = require('../supabase/mutations');
const { respondWithSofia } = require('../sofia/engine');
const { sendWhatsAppMessage } = require('../evolution/client');

// Deduplicação em memória (fallback rápido; Supabase é a fonte de verdade)
const processedIds = new Set();

async function handleEvolutionWebhook(req, res) {
  // Responde imediatamente para a Evolution não retentar
  res.status(200).json({ received: true });

  try {
    const payload = req.body;

    // --- Filtros anti-loop ---
    if (!payload?.data?.message?.conversation) return;           // sem texto
    if (payload?.data?.key?.fromMe === true) return;            // mensagem nossa
    if (payload?.data?.key?.remoteJid?.includes('@g.us')) return; // grupo

    const messageId = payload?.data?.key?.id;
    if (!messageId) return;
    if (processedIds.has(messageId)) return; // duplicidade em memória
    processedIds.add(messageId);
    setTimeout(() => processedIds.delete(messageId), 60_000);   // limpa após 1 min

    const phone = payload.data.key.remoteJid.replace('@s.whatsapp.net', '');
    const text = payload.data.message.conversation;
    const instanceName = payload.instance;

    // --- Busca contexto no Supabase ---
    const lead = await getLead(phone);
    if (!lead) {
      console.warn(`[Sofia] Lead não encontrado para ${phone}`);
      return;
    }

    const [recentMessages, convState] = await Promise.all([
      getRecentMessages(lead.id, 10),
      getConversationState(lead.id),
    ]);

    // Salva mensagem inbound
    await saveMessage({
      lead_id: lead.id,
      direction: 'inbound',
      message_id: messageId,
      text,
      raw_payload: payload,
    });

    // --- Motor da Sofia ---
    const { reply, newState, triggerLandingPage } = await respondWithSofia({
      lead,
      text,
      recentMessages,
      convState,
    });

    if (!reply) return;

    // Envia resposta via Evolution
    await sendWhatsAppMessage({ instanceName, phone, message: reply });

    // Salva mensagem outbound
    await saveMessage({
      lead_id: lead.id,
      direction: 'outbound',
      text: reply,
    });

    // Atualiza estado da conversa
    await updateConversationState(lead.id, newState);

    // Aciona n8n para landing page se necessário
    if (triggerLandingPage) {
      await triggerN8nLandingPage(lead);
    }
  } catch (err) {
    console.error('[Sofia] Erro no webhook:', err);
  }
}

async function triggerN8nLandingPage(lead) {
  const n8nUrl = process.env.N8N_LANDING_PAGE_WEBHOOK;
  if (!n8nUrl) {
    console.warn('[Sofia] N8N_LANDING_PAGE_WEBHOOK não configurada');
    return;
  }
  try {
    await fetch(n8nUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ lead_id: lead.id, phone: lead.phone }),
    });
    console.log(`[Sofia] Landing page acionada para lead ${lead.id}`);
  } catch (err) {
    console.error('[Sofia] Erro ao acionar landing page no n8n:', err);
  }
}

module.exports = { handleEvolutionWebhook };
