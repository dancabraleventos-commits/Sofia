const { getLead, getRecentMessages, getConversationState } = require('../supabase/queries');
const { saveMessage, updateConversationState, markLeadResponded } = require('../supabase/mutations');
const { respondWithSofia } = require('../sofia/engine');
const { sendWhatsAppMessage } = require('../evolution/client');
const { triggerAddonWebhook } = require('../sofia/addons/n8n');
const { handleGerarLandingPage } = require('../landing-page/handler');

const processedIds = new Set();

// Armazena o timestamp de quando enviamos o "Oi, tudo bem?" para cada telefone
const firstContactSentAt = new Map();

function registerFirstContactSent(phone) {
  firstContactSentAt.set(phone, Date.now());
  setTimeout(() => firstContactSentAt.delete(phone), 60 * 60 * 1000);
}

function isBotResponse(phone) {
  const sentAt = firstContactSentAt.get(phone);
  if (!sentAt) return false;
  const elapsed = Date.now() - sentAt;
  return elapsed < 3_000; // menos de 3 segundos
}

async function handleEvolutionWebhook(req, res) {
  res.status(200).json({ received: true });

  try {
    const payload = req.body;

    // Extrai texto de conversation OU extendedTextMessage (Evolution pode usar ambos)
    const rawMessage = payload?.data?.message;
    const text =
      rawMessage?.conversation ||
      rawMessage?.extendedTextMessage?.text ||
      rawMessage?.imageMessage?.caption ||
      null;

    if (!text) return;
    if (payload?.data?.key?.fromMe === true) return;
    if (payload?.data?.key?.remoteJid?.includes('@g.us')) return;

    const messageId = payload?.data?.key?.id;
    if (!messageId) return;
    if (processedIds.has(messageId)) return;
    processedIds.add(messageId);
    setTimeout(() => processedIds.delete(messageId), 60_000);

    const phone = payload.data.key.remoteJid.replace('@s.whatsapp.net', '');

    // Filtro de bot: ignora respostas automáticas (< 3 segundos)
    if (isBotResponse(phone)) {
      console.log(`[Sofia] Resposta ignorada (bot detectado em < 3s): ${phone}`);
      return;
    }

    const instanceName = payload.instance;

    const lead = await getLead(phone);
    if (!lead) {
      console.warn(`[Sofia] Lead não encontrado para ${phone}`);
      return;
    }

    if (!lead.respondeu_whatsapp) {
      await markLeadResponded(lead.id);
    }

    const [recentMessages, convState] = await Promise.all([
      getRecentMessages(lead.id, 10),
      getConversationState(lead.id),
    ]);

    await saveMessage({
      lead_id: lead.id,
      direction: 'inbound',
      message_id: messageId,
      text,
      raw_payload: payload,
    });

    const { reply, newState, triggerLandingPage, triggerAddon } = await respondWithSofia({
      lead,
      text,
      recentMessages,
      convState,
    });

    if (!reply) return;

    await sendWhatsAppMessage({ instanceName, phone, message: reply });

    await saveMessage({
      lead_id: lead.id,
      direction: 'outbound',
      text: reply,
    });

    await updateConversationState(lead.id, newState);

    // Aciona geração de landing page diretamente no Railway (fire-and-forget)
    if (triggerLandingPage) {
      console.log(`[Sofia] Disparando geração de landing page para lead ${lead.id}`);
      triggerLandingPageInternal(lead, instanceName);
    }

    // Aciona n8n para provisionar o add-on vendido
    if (triggerAddon) {
      await triggerAddonWebhook(triggerAddon, lead);
    }

  } catch (err) {
    console.error('[Sofia] Erro no webhook:', err);
  }
}

/**
 * Gera a landing page diretamente no Railway sem depender do N8N.
 * Roda em background (fire-and-forget) para não bloquear o webhook.
 * O próprio handler envia a URL via WhatsApp quando a página ficar pronta.
 */
function triggerLandingPageInternal(lead, instanceName) {
  const phone = lead.telefone || lead.phone;
  const nome = lead.nome || lead.name || '';
  const categoria = lead.categoria || lead.business_type || 'outro';
  const cidade = lead.cidade || lead.city || '';
  const endereco = lead.endereco || '';
  const lead_id = lead.id;

  // Monta um req/res falso para reutilizar o handler existente
  const fakeReq = {
    body: { phone, nome, categoria, cidade, endereco, lead_id },
  };

  const fakeRes = {
    status: () => fakeRes,
    json: () => {},
  };

  // Chama o handler — ele responde imediatamente (202) e processa em background
  handleGerarLandingPage(fakeReq, fakeRes).catch(err => {
    console.error('[Sofia] Erro ao acionar landing page interna:', err.message);
  });
}

module.exports = { handleEvolutionWebhook, registerFirstContactSent };
