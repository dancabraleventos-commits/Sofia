const { buildPrompt } = require('./prompt');
const { callAnthropic } = require('./anthropic');
const { applyRuleBasedReply } = require('./rules');
const { offerBestAddon, handleAddonResponse, parseAddonStage } = require('./addons/flow');

/**
 * Motor principal da Sofia.
 * Retorna: { reply, newState, triggerLandingPage, triggerAddon }
 *
 * triggerAddon: null | 'calendario' | 'google' | 'instagram'
 *   → sinaliza que o n8n deve ser acionado para o add-on vendido.
 */
async function respondWithSofia({ lead, text, recentMessages, convState }) {
  const stage = convState?.stage || 'initial';

  // ── 1. Fluxo de add-on ativo ────────────────────────────────────────────
  // Se o lead está em algum estágio addon_offered_* ou addon_objected_*,
  // toda a conversa é tratada pelo módulo de add-ons.
  const addonMeta = parseAddonStage(stage);
  if (addonMeta && (addonMeta.state === 'offered' || addonMeta.state === 'objected')) {
    const result = handleAddonResponse({
      lead,
      text,
      addonState: addonMeta.state,
      addonType: addonMeta.addonType,
    });
    if (result) return result;
  }

  // ── 2. Entrada no fluxo de add-on (pós-conversão do plano base) ─────────
  // Quando o lead chega a waiting_payment e ainda não foi ofertado um add-on,
  // a Sofia oferece o melhor add-on para o segmento em vez de chamar a IA.
  if (stage === 'waiting_payment') {
    return offerBestAddon(lead);
  }

  // ── 3. Resposta por regra para mensagens simples ─────────────────────────
  const ruleReply = applyRuleBasedReply({ text, convState });
  if (ruleReply) {
    return {
      reply: ruleReply.text,
      newState: ruleReply.newState,
      triggerLandingPage: false,
      triggerAddon: null,
    };
  }

  // ── 4. IA para contextos comerciais ricos ────────────────────────────────
  const prompt = buildPrompt({ lead, text, recentMessages, convState });
  const aiResponse = await callAnthropic(prompt);

  let parsed;
  try {
    parsed = JSON.parse(aiResponse);
  } catch {
    return {
      reply: aiResponse,
      newState: { last_ai_response: aiResponse },
      triggerLandingPage: false,
      triggerAddon: null,
    };
  }

  return {
    reply: parsed.reply || null,
    newState: {
      stage: parsed.stage || stage,
      last_intent: parsed.intent || null,
      last_objective: parsed.objective || null,
      last_ai_response: parsed.reply || null,
    },
    triggerLandingPage: parsed.trigger_landing_page === true,
    triggerAddon: null,
  };
}

module.exports = { respondWithSofia };
