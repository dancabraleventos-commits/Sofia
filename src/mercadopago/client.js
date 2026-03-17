/**
 * Cliente da API do Mercado Pago.
 * Expõe: createPixPayment, getPayment.
 */

const MP_BASE = 'https://api.mercadopago.com';

function headers() {
  const token = process.env.MERCADOPAGO_ACCESS_TOKEN;
  if (!token) throw new Error('[MP] MERCADOPAGO_ACCESS_TOKEN não configurada');
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };
}

/**
 * Cria uma cobrança PIX no Mercado Pago.
 * @returns {Promise<{ id, pix_code, pix_qr, link_pagamento }>}
 */
async function createPixPayment({
  amount,
  description,
  payerName,
  payerCpf,
  leadId,
  notificationUrl,
  externalReference,
}) {
  const body = {
    transaction_amount: Number(amount),
    description,
    payment_method_id: 'pix',
    payer: {
      email: `lead-${leadId}@vitrineia.com.br`,
      first_name: payerName,
      identification: {
        type: 'CPF',
        number: payerCpf.replace(/\D/g, ''),
      },
    },
    notification_url: notificationUrl,
    external_reference: externalReference,
  };

  const res = await fetch(`${MP_BASE}/v1/payments`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`[MP] Criar pagamento erro ${res.status}: ${err}`);
  }

  const data = await res.json();
  const txData = data.point_of_interaction?.transaction_data ?? {};

  return {
    id: String(data.id),
    pix_code: txData.qr_code ?? null,
    pix_qr: txData.qr_code_base64 ?? null,
    link_pagamento: txData.ticket_url ?? null,
  };
}

/**
 * Busca um pagamento pelo ID e retorna seus dados.
 */
async function getPayment(paymentId) {
  const res = await fetch(`${MP_BASE}/v1/payments/${paymentId}`, {
    method: 'GET',
    headers: headers(),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`[MP] Buscar pagamento erro ${res.status}: ${err}`);
  }

  return res.json();
}

module.exports = { createPixPayment, getPayment };
