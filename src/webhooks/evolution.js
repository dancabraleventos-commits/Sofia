const { getLead, getRecentMessages, getConversationState, getLandingPageUrl } = require('../supabase/queries');
const { saveMessage, updateConversationState } = require('../supabase/mutations');
const { respondWithSofia } = require('../sofia/engine');
const { sendWhatsAppMessage } = require('../evolution/client');
const { triggerAddonWebhook } = require('../sofia/addons/n8n');

const processedIds = new Set();

async function handleEvolutionWebhook(req, res) {
  res.status(200).json({ received: true });

  try {
    const payload = req.body;

    if (!payload?.data?.message?.conversation) return;
    if (payload?.data?.key?.fromMe === true) return;
    if (payload?.data?.key?.remoteJid?.includes('@g.us')) return;

    const messageId = payload?.data?.key?.id;
    if (!messageId) return;
    if (processedIds.has(messageId)) return;
    processedIds.add(messageId);
    setTimeout(() => processedIds.delete(messageId), 60_000);

    const phone = payload.data.key.remoteJid.replace('@s.whatsapp.net', '');
    const text = payload.data.message.conversation;
    const instanceName = payload.instance;

    const lead = await getLead(phone);
    if (!lead) {
      console.warn(`[Sofia] Lead não encontrado para ${phone}`);
      return;
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

    // Aciona n8n para gerar landing page e aguarda a URL
    if (triggerLandingPage) {
      await triggerN8nLandingPage(lead, instanceName);
    }

    // Aciona n8n para provisionar o add-on vendido
    if (triggerAddon) {
      await triggerAddonWebhook(triggerAddon, lead);
    }

  } catch (err) {
    console.error('[Sofia] Erro no webhook:', err);
  }
}

async function triggerN8nLandingPage(lead, instanceName) {
  const n8nUrl = process.env.N8N_LANDING_PAGE_WEBHOOK;
  if (!n8nUrl) {
    console.warn('[Sofia] N8N_LANDING_PAGE_WEBHOOK não configurada');
    return;
  }

  try {
    // Chama o n8n com os dados do lead
    await fetch(n8nUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        lead_id: lead.id,
        phone: lead.phone || lead.telefone,
        nome: lead.nome || lead.name,
        categoria: lead.categoria || lead.business_type,
        cidade: lead.cidade || lead.city,
        endereco: lead.endereco || '',
      }),
    });

    console.log(`[Sofia] Landing page solicitada para lead ${lead.id}, aguardando Vercel...`);

    // Aguarda o n8n gerar a página e salvar no Supabase (polling com timeout de 90s)
    const url = await pollLandingPageUrl(lead.id, 90_000);

    if (url) {
      console.log(`[Sofia] URL recebida: ${url}`);

      const nome = lead.nome || lead.name || '';
      const msgUrl =
        `Aqui está a página do *${nome}*! 🎉\n\n` +
        `👉 ${url}\n\n` +
        `Dá uma olhada e me fala o que achou! 😊`;

      await sendWhatsAppMessage({ instanceName, phone: lead.phone || lead.telefone, message: msgUrl });
      await saveMessage({ lead_id: lead.id, direction: 'outbound', text: msgUrl });

    } else {
      console.warn(`[Sofia] Timeout aguardando landing page para lead ${lead.id}`);

      const msgTimeout =
        `Estou finalizando sua página agora, em instantes te mando o link! 🚀`;
      await sendWhatsAppMessage({ instanceName, phone: lead.phone || lead.telefone, message: msgTimeout });
      await saveMessage({ lead_id: lead.id, direction: 'outbound', text: msgTimeout });
    }

  } catch (err) {
    console.error('[Sofia] Erro ao acionar landing page:', err.message);
  }
}

/**
 * Consulta o Supabase a cada 5 segundos até a URL aparecer ou o timeout estourar.
 */
async function pollLandingPageUrl(leadId, timeoutMs = 90_000) {
  const interval = 5_000;
  const maxAttempts = Math.floor(timeoutMs / interval);

  for (let i = 0; i < maxAttempts; i++) {
    await sleep(interval);
    const url = await getLandingPageUrl(leadId);
    if (url) return url;
    console.log(`[Sofia] Aguardando landing page... tentativa ${i + 1}/${maxAttempts}`);
  }

  return null;
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = { handleEvolutionWebhook };
