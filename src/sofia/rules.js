/**
 * Respostas rápidas por regra para mensagens simples.
 * Evita chamar a IA desnecessariamente e reduz custo e latência.
 *
 * Retorna { text, newState, triggerLandingPage } ou null se nenhuma regra se aplicar.
 */
function applyRuleBasedReply({ text, convState }) {
  const normalized = text.trim().toLowerCase();
  const stage = convState?.stage || 'initial';

  // Confirmações simples
  if (['sim', 's', 'ok', 'pode', 'claro', 'quero', 'manda'].includes(normalized)) {

    // Se o lead já viu as perguntas e está pronto para receber a página
    if (stage === 'ready_to_send_page') {
      return {
        text: 'Ótimo! Em instantes você recebe o link da sua página. 😊',
        newState: { stage: 'ready_to_buy', last_intent: 'confirmação positiva' },
        triggerLandingPage: true, // ← FIX: agora dispara a página
      };
    }

    // Se ainda está no fluxo consultivo, deixa a IA continuar o diálogo
    return null;
  }

  // Negativas simples
  if (['não', 'nao', 'n', 'agora não', 'agora nao', 'depois'].includes(normalized)) {
    return {
      text: 'Tudo bem! Se mudar de ideia é só falar. 😊',
      newState: { stage: 'objection', last_intent: 'negativa momentânea' },
      triggerLandingPage: false,
    };
  }

  // Agradecimentos
  if (['obrigado', 'obrigada', 'vlw', 'valeu', 'tmj'].includes(normalized)) {
    return {
      text: 'Fico feliz em ajudar! Se quiser avançar com a presença digital do seu negócio, estou aqui. 😊',
      newState: {},
      triggerLandingPage: false,
    };
  }

  // Mensagens muito curtas e genéricas — deixa a IA tratar
  return null;
}

module.exports = { applyRuleBasedReply };
