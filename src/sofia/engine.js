const { buildPrompt } = require('./prompt');
const { callAnthropic } = require('./anthropic');
const { applyRuleBasedReply } = require('./rules');

/**
 * Motor principal da Sofia.
 * Recebe contexto completo e retorna resposta, novo estado e flag de landing page.
 */
async function respondWithSofia({ lead, text, recentMessages, convState }) {
  // 1. Tenta resposta por regra para mensagens simples
  const ruleReply = applyRuleBasedReply({ text, convState });
  if (ruleReply) {
    return {
      reply: ruleReply.text,
      newState: ruleReply.newState,
      triggerLandingPage: false,
    };
  }

  // 2. Constrói prompt e chama IA para contextos comerciais ricos
  const prompt = buildPrompt({ lead, text, recentMessages, convState });
  const aiResponse = await callAnthropic(prompt);

  // 3. Interpreta resposta da IA (JSON estruturado)
  let parsed;
  try {
    parsed = JSON.parse(aiResponse);
  } catch {
    // Fallback: usa texto bruto como resposta
    return {
      reply: aiResponse,
      newState: { last_ai_response: aiResponse },
      triggerLandingPage: false,
    };
  }

  return {
    reply: parsed.reply || null,
    newState: {
      stage: parsed.stage || convState?.stage,
      last_intent: parsed.intent || null,
      last_objective: parsed.objective || null,
      last_ai_response: parsed.reply || null,
    },
    triggerLandingPage: parsed.trigger_landing_page === true,
  };
}

module.exports = { respondWithSofia };
