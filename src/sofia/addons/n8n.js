/**
 * Dispara o webhook do n8n quando um add-on é vendido.
 * Variáveis esperadas no Railway:
 *   N8N_ADDON_CALENDARIO_WEBHOOK
 *   N8N_ADDON_GOOGLE_WEBHOOK
 *   N8N_ADDON_INSTAGRAM_WEBHOOK
 */

const WEBHOOK_ENV_MAP = {
  calendario: 'N8N_ADDON_CALENDARIO_WEBHOOK',
  google:     'N8N_ADDON_GOOGLE_WEBHOOK',
  instagram:  'N8N_ADDON_INSTAGRAM_WEBHOOK',
};

async function triggerAddonWebhook(addonType, lead) {
  const envVar = WEBHOOK_ENV_MAP[addonType];
  if (!envVar) {
    console.warn(`[Addon] Tipo desconhecido: ${addonType}`);
    return;
  }

  const url = process.env[envVar];
  if (!url) {
    console.warn(`[Addon] ${envVar} não configurada — webhook pulado`);
    return;
  }

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        lead_id:    lead.id,
        phone:      lead.phone || lead.telefone,
        nome:       lead.nome || lead.name,
        categoria:  lead.categoria || lead.business_type,
        cidade:     lead.cidade || lead.city,
        addon_type: addonType,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error(`[Addon] Webhook ${addonType} erro ${res.status}: ${err}`);
    } else {
      console.log(`[Addon] Webhook ${addonType} disparado para lead ${lead.id}`);
    }
  } catch (err) {
    console.error(`[Addon] Erro ao disparar webhook ${addonType}:`, err.message);
  }
}

module.exports = { triggerAddonWebhook };
