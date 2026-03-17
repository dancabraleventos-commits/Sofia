/**
 * Handler de POST /mercadopago/criar-pagamento
 * Recebe: { lead_id, addon, valor, cpf, nome }
 * Retorna: { pix_code, pix_qr, link_pagamento }
 */

const { createPixPayment } = require('./client');
const { createAddon } = require('../supabase/mutations');

// Preços canônicos por tipo — usados para validação
const ADDON_PRICES = {
  plano_base:   47.00,
  calendario:   29.00,
  instagram:    39.00,
  google:       19.00,
  whatsapp_bot: 69.00,
  dominio:       9.90,
  logo:         20.00, // R$20 único conforme tabela de preços VitrineIA
};

const ADDON_DESCRIPTIONS = {
  plano_base:   'VitrineIA — Plano Base',
  calendario:   'VitrineIA — Calendário de Agendamento',
  instagram:    'VitrineIA — Instagram com IA',
  google:       'VitrineIA — Google Meu Negócio',
  whatsapp_bot: 'VitrineIA — Bot WhatsApp IA',
  dominio:      'VitrineIA — Domínio Próprio',
  logo:         'VitrineIA — Logotipo',
};

async function handleCriarPagamento(req, res) {
  const { lead_id, addon, valor, cpf, nome } = req.body;

  if (!lead_id || !addon || !valor || !cpf || !nome) {
    return res.status(400).json({
      error: 'Campos obrigatórios: lead_id, addon, valor, cpf, nome',
    });
  }

  if (!ADDON_PRICES[addon]) {
    return res.status(400).json({
      error: `Addon inválido: ${addon}. Tipos permitidos: ${Object.keys(ADDON_PRICES).join(', ')}`,
    });
  }

  const valorNum = Number(valor);
  if (isNaN(valorNum) || valorNum <= 0) {
    return res.status(400).json({ error: 'Campo valor deve ser numérico positivo' });
  }

  const serverUrl = process.env.SERVER_URL;
  if (!serverUrl) {
    return res.status(500).json({ error: '[MP] SERVER_URL não configurada' });
  }

  try {
    const payment = await createPixPayment({
      amount: valorNum,
      description: ADDON_DESCRIPTIONS[addon] || `VitrineIA — ${addon}`,
      payerName: nome,
      payerCpf: cpf,
      leadId: lead_id,
      notificationUrl: `${serverUrl}/webhooks/mercadopago`,
      externalReference: `${lead_id}:${addon}`,
    });

    await createAddon({
      lead_id,
      type: addon,
      payment_id: payment.id,
      valor: valorNum,
    });

    console.log(`[MP] Pagamento PIX criado — lead ${lead_id}, addon ${addon}, payment ${payment.id}`);

    return res.status(200).json({
      pix_code: payment.pix_code,
      pix_qr: payment.pix_qr,
      link_pagamento: payment.link_pagamento,
    });
  } catch (err) {
    console.error('[MP] Erro ao criar pagamento:', err.message);
    return res.status(500).json({ error: err.message });
  }
}

module.exports = { handleCriarPagamento };
