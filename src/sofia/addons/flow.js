/**
 * Gerencia o fluxo de oferta, objeção e fechamento de add-ons.
 *
 * Convenção de stages:
 *   addon_offered_{type}   — oferta enviada, aguardando resposta
 *   addon_objected_{type}  — lead resistiu, rebutal enviado (máx 1x)
 *   addon_accepted         — lead aceitou
 *   addon_rejected         — lead recusou após rebutal
 *
 * Não requer mudanças no schema do Supabase — o tipo fica embutido no stage.
 */

const { detectBestAddon } = require('./detector');

// ─── Textos por add-on ──────────────────────────────────────────────────────

const MESSAGES = {
  offer: {
    calendario: (lead) =>
      `Uma coisa antes de encerrar: para ${lead.business_type || lead.categoria || 'seu negócio'}, o calendário de agendamento faz muita diferença. Seus clientes marcam horário direto pelo WhatsApp, 24h por dia, sem você precisar responder mensagem por mensagem. São só R$29/mês. Você toparia adicionar agora que está no embalo?`,

    google: (lead) => {
      const cidade = lead.city || lead.cidade || 'sua cidade';
      const cat = lead.business_type || lead.categoria || 'seu negócio';
      return `Aproveitando que você está investindo em presença digital: o seu negócio aparece no Google Maps quando alguém busca "${cat} em ${cidade}"? O Google Meu Negócio garante isso por apenas R$19/mês — é onde a maioria dos clientes novos encontra negócio hoje. Posso ativar pra você?`;
    },

    instagram: (_lead) =>
      `Agora que sua página está garantida, uma coisa vai turbinar ainda mais: o Instagram com IA. Ele cria e publica conteúdo automaticamente no seu perfil, sem você mexer em nada. R$39/mês e seu Instagram sempre atualizado com posts do seu segmento. Faz sentido pra você?`,
  },

  rebuttal: {
    calendario: (_lead) =>
      `Entendo! Mas pensa: quantas vezes você perde um agendamento porque não viu a mensagem a tempo? O calendário resolve isso automaticamente — o cliente agenda sozinho, qualquer hora, qualquer dia. Muitos dos nossos clientes recuperam os R$29 no primeiro cliente extra que veio fora do horário. Vale muito. Que tal adicionar?`,

    google: (lead) => {
      const cidade = lead.city || lead.cidade || 'sua cidade';
      const cat = lead.business_type || lead.categoria || 'seu segmento';
      return `Compreendo. Mas R$19/mês é literalmente o custo de um café. Em troca, seu negócio aparece no topo do Google Maps quando alguém em ${cidade} procura ${cat}. É a forma mais barata e eficiente de atrair cliente novo que existe hoje. Posso ativar agora?`;
    },

    instagram: (_lead) =>
      `Faz sentido a hesitação. Mas é justamente pra isso que serve: você não precisa fazer nada — a IA cuida do Instagram por você. Para quem não tem tempo, é um alívio enorme. R$39/mês por uma presença digital completa e sempre ativa. Que tal?`,
  },

  accept: (addonName) =>
    `Perfeito! Vou acionar nosso time agora para ativar o ${addonName}. Em breve você recebe as instruções. 🎉`,

  reject: (_addonName) =>
    `Sem problema! Se mudar de ideia, é só chamar. Qualquer dúvida sobre sua nova página, estou por aqui. 😊`,
};

// ─── Detecção de positivo/negativo ──────────────────────────────────────────

const POSITIVE_WORDS = [
  'sim', 's', 'ok', 'pode', 'claro', 'quero', 'aceito', 'manda', 'bora',
  'vamos', 'ótimo', 'otimo', 'topo', 'topei', 'fechado', 'fecha', 'add',
  'adiciona', 'ativa', 'ativar', 'vou querer', 'quero sim', 'com certeza',
  'vai', 'pode ser', 'porque não', 'porque nao',
];

const NEGATIVE_WORDS = [
  'não', 'nao', 'n', 'agora não', 'agora nao', 'depois', 'nunca',
  'dispensa', 'deixa', 'obrigado não', 'obrigado nao', 'valeu mas não',
  'ta bom assim', 'tá bom assim', 'por enquanto não', 'por enquanto nao',
  'no momento não', 'no momento nao',
];

function isPositive(text) {
  const t = text.trim().toLowerCase();
  return POSITIVE_WORDS.some(w => t === w || t.startsWith(w + ' ') || t.includes(` ${w}`));
}

function isNegative(text) {
  const t = text.trim().toLowerCase();
  return NEGATIVE_WORDS.some(w => t === w || t.startsWith(w + ' ') || t.includes(` ${w}`));
}

// ─── Parsing de stage ───────────────────────────────────────────────────────

/**
 * Extrai { state, addonType } de um stage como "addon_offered_calendario".
 * Retorna null se não for um stage de add-on.
 */
function parseAddonStage(stage) {
  if (!stage || !stage.startsWith('addon_')) return null;
  const parts = stage.split('_');
  // addon_offered_calendario → ['addon', 'offered', 'calendario']
  if (parts.length < 3) return null;
  return { state: parts[1], addonType: parts.slice(2).join('_') };
}

// ─── Handlers principais ─────────────────────────────────────────────────────

/**
 * Chamado quando stage === 'waiting_payment' e add-on ainda não foi ofertado.
 * Retorna a oferta do melhor add-on para o segmento do lead.
 */
function offerBestAddon(lead) {
  const categoria = lead.business_type || lead.categoria || '';
  const addon = detectBestAddon(categoria);

  const offerFn = MESSAGES.offer[addon.type];
  const reply = offerFn(lead);

  return {
    reply,
    newState: {
      stage: `addon_offered_${addon.type}`,
      last_intent: 'add-on ofertado',
      last_objective: `fechar ${addon.name}`,
    },
    triggerLandingPage: false,
    triggerAddon: null,
  };
}

/**
 * Chamado quando o stage já é addon_offered_* ou addon_objected_*.
 * Interpreta a resposta do lead e decide o próximo passo.
 */
function handleAddonResponse({ lead, text, addonState, addonType }) {
  const { ADDONS } = require('./detector');
  const addon = ADDONS[addonType] || { name: 'Add-on', type: addonType };

  // Lead em addon_offered_* responde
  if (addonState === 'offered') {
    if (isPositive(text) && !isNegative(text)) {
      // Lead aceitou na primeira oferta
      return {
        reply: MESSAGES.accept(addon.name),
        newState: { stage: 'addon_accepted', last_intent: 'add-on aceito' },
        triggerLandingPage: false,
        triggerAddon: addonType,
      };
    }

    // Lead resistiu → envia rebutal (único)
    const rebuttalFn = MESSAGES.rebuttal[addonType];
    return {
      reply: rebuttalFn ? rebuttalFn(lead) : MESSAGES.rebuttal.instagram(lead),
      newState: {
        stage: `addon_objected_${addonType}`,
        last_intent: 'lead resistiu ao add-on',
        last_objective: 'reverter objeção do add-on',
      },
      triggerLandingPage: false,
      triggerAddon: null,
    };
  }

  // Lead em addon_objected_* responde (após rebutal)
  if (addonState === 'objected') {
    if (isPositive(text) && !isNegative(text)) {
      return {
        reply: MESSAGES.accept(addon.name),
        newState: { stage: 'addon_accepted', last_intent: 'add-on aceito após rebutal' },
        triggerLandingPage: false,
        triggerAddon: addonType,
      };
    }

    // Lead recusou definitivamente — encerra com elegância
    return {
      reply: MESSAGES.reject(addon.name),
      newState: { stage: 'addon_rejected', last_intent: 'add-on recusado' },
      triggerLandingPage: false,
      triggerAddon: null,
    };
  }

  return null;
}

module.exports = { offerBestAddon, handleAddonResponse, parseAddonStage };
