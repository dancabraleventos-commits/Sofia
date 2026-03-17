/**
 * Handler de POST /handoff/yasmin
 *
 * Chamado automaticamente pelo webhook do Mercado Pago após pagamento aprovado.
 * Busca dados completos do lead + add-ons ativos e envia para a Yasmin via WhatsApp.
 *
 * Variável obrigatória no Railway: YASMIN_PHONE (ex: 5512999999999)
 */

const { getLeadById, getActiveAddonsByLeadId } = require('../supabase/queries');
const { sendWhatsAppMessage } = require('../evolution/client');

const ADDON_DISPLAY_NAMES = {
  plano_base:   'Plano Base — R$47/mês',
  calendario:   'Calendário de Agendamento — R$29/mês',
  instagram:    'Instagram com IA — R$39/mês',
  google:       'Google Meu Negócio — R$19/mês',
  whatsapp_bot: 'Bot WhatsApp IA — R$69/mês',
  dominio:      'Domínio Próprio — R$9,90/mês',
  logo:         'Logotipo — R$20 único',
};

async function handleHandoffYasmin(req, res) {
  const { lead_id } = req.body;

  if (!lead_id) {
    return res.status(400).json({ error: 'lead_id é obrigatório' });
  }

  const yasminPhone = process.env.YASMIN_PHONE;
  const instanceName = process.env.EVOLUTION_INSTANCE;

  if (!yasminPhone || !instanceName) {
    console.warn('[Yasmin] YASMIN_PHONE ou EVOLUTION_INSTANCE não configurados');
    return res.status(500).json({ error: 'YASMIN_PHONE ou EVOLUTION_INSTANCE não configurados' });
  }

  try {
    const [lead, addons] = await Promise.all([
      getLeadById(lead_id),
      getActiveAddonsByLeadId(lead_id),
    ]);

    if (!lead) {
      return res.status(404).json({ error: 'Lead não encontrado' });
    }

    const nome     = lead.nome || lead.name || 'não informado';
    const categoria = lead.categoria || lead.business_type || 'não informado';
    const cidade   = lead.cidade || lead.city || 'não informada';
    const endereco = lead.endereco || 'não informado';
    const telefone = lead.phone || lead.telefone || 'não informado';

    const planoAddon  = addons.find(a => a.type === 'plano_base');
    const extraAddons = addons.filter(a => a.type !== 'plano_base');

    const plano = planoAddon
      ? (ADDON_DISPLAY_NAMES.plano_base)
      : 'não identificado';

    const addonsList = extraAddons.length > 0
      ? extraAddons.map(a => ADDON_DISPLAY_NAMES[a.type] || a.type).join('\n   • ')
      : 'nenhum';

    const message =
      `🔔 Novo cliente!\n\n` +
      `Nome: ${nome}\n` +
      `Negócio: ${categoria} em ${cidade}\n` +
      `Endereço: ${endereco}\n` +
      `Telefone: ${telefone}\n` +
      `Plano: ${plano}\n` +
      `Add-ons: ${extraAddons.length > 0 ? '\n   • ' + addonsList : 'nenhum'}\n\n` +
      `Já pode iniciar o onboarding!`;

    await sendWhatsAppMessage({ instanceName, phone: yasminPhone, message });

    console.log(`[Yasmin] Handoff enviado para ${yasminPhone} — lead ${lead_id}`);
    return res.status(200).json({ ok: true });

  } catch (err) {
    console.error('[Yasmin] Erro no handoff:', err.message);
    return res.status(500).json({ error: err.message });
  }
}

module.exports = { handleHandoffYasmin };
