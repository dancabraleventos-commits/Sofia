/**
 * Handler de POST /webhooks/mercadopago
 * Recebe notificação de pagamento do Mercado Pago.
 * Verifica status consultando a API da MP, então processa o evento.
 */

const { getPayment } = require('../mercadopago/client');
const { getAddonByPaymentId, getLeadById } = require('../supabase/queries');
const { updateAddonStatus, updateConversationState } = require('../supabase/mutations');
const { sendWhatsAppMessage } = require('../evolution/client');

const ADDON_DISPLAY_NAMES = {
  plano_base:   'Plano Base VitrineIA',
  calendario:   'Calendário de Agendamento',
  instagram:    'Instagram com IA',
  google:       'Google Meu Negócio',
  whatsapp_bot: 'Bot WhatsApp IA',
  dominio:      'Domínio Próprio',
  logo:         'Logotipo',
};

async function handleMercadoPagoWebhook(req, res) {
  // Responde imediatamente para o MP não retentar
  res.status(200).json({ received: true });

  try {
    const { action, data } = req.body;

    // MP envia action "payment.created" ou "payment.updated"
    if (!action?.startsWith('payment.') || !data?.id) {
      return;
    }

    const paymentId = String(data.id);
    console.log(`[MP] Notificação recebida — action: ${action}, payment: ${paymentId}`);

    // Verifica autenticidade consultando a API da MP
    const payment = await getPayment(paymentId);

    if (payment.status !== 'approved') {
      console.log(`[MP] Pagamento ${paymentId} ignorado — status: ${payment.status}`);
      return;
    }

    // Localiza o addon pelo payment_id
    const addon = await getAddonByPaymentId(paymentId);
    if (!addon) {
      console.warn(`[MP] Addon não encontrado para payment_id ${paymentId}`);
      return;
    }

    if (addon.status === 'active') {
      console.log(`[MP] Addon ${addon.id} já está ativo — ignorando duplicata`);
      return;
    }

    // Atualiza status do addon para 'active'
    await updateAddonStatus(paymentId, 'active');
    console.log(`[MP] Addon ${addon.type} ativado para lead ${addon.lead_id}`);

    // Atualiza conversation_state do lead
    await updateConversationState(addon.lead_id, {
      stage: 'addon_active',
      last_intent: `${addon.type} pago e ativo`,
    });

    // Envia confirmação via WhatsApp
    const lead = await getLeadById(addon.lead_id);
    if (lead) {
      const addonName = ADDON_DISPLAY_NAMES[addon.type] || addon.type;
      const phone = lead.phone || lead.telefone;
      const instanceName = process.env.EVOLUTION_INSTANCE;

      if (phone && instanceName) {
        const message = `Pagamento confirmado! Seu ${addonName} está ativo. 🎉\n\nEm instantes nosso time entrará em contato para configurar tudo pra você.`;
        await sendWhatsAppMessage({ instanceName, phone, message });
        console.log(`[MP] Confirmação enviada via WhatsApp para ${phone}`);
      } else {
        console.warn('[MP] Envio WhatsApp pulado: phone ou EVOLUTION_INSTANCE ausente');
      }

      // Notifica a Yasmin para handoff
      await notifyYasmin({ lead, addon, payment });
    }

  } catch (err) {
    console.error('[MP] Erro no webhook:', err.message);
  }
}

async function notifyYasmin({ lead, addon, payment }) {
  const serverUrl = process.env.SERVER_URL;
  if (!serverUrl) {
    console.warn('[MP] SERVER_URL não configurada — handoff Yasmin pulado');
    return;
  }

  try {
    const res = await fetch(`${serverUrl}/handoff/yasmin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        lead_id:    lead.id,
        phone:      lead.phone || lead.telefone,
        nome:       lead.nome || lead.name,
        addon_type: addon.type,
        payment_id: payment.id,
        valor:      payment.transaction_amount,
      }),
    });

    if (!res.ok) {
      console.warn(`[MP] Handoff Yasmin respondeu ${res.status}`);
    } else {
      console.log(`[MP] Handoff Yasmin acionado para lead ${lead.id}`);
    }
  } catch (err) {
    console.warn('[MP] Erro ao acionar handoff Yasmin:', err.message);
  }
}

module.exports = { handleMercadoPagoWebhook };
