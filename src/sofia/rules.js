/**
 * Respostas rápidas por regra para mensagens simples.
 * Evita chamar a IA desnecessariamente e reduz custo e latência.
 *
 * Retorna { text, newState } ou null se nenhuma regra se aplicar.
 */
function applyRuleBasedReply({ text, convState }) {
  const normalized = text.trim().toLowerCase();

  // Confirmações simples — não precisa de IA
  if (['sim', 's', 'ok', 'pode', 'claro', 'quero', 'manda'].includes(normalized)) {
    return {
      text: 'Ótimo! Me deixa te mostrar o que preparei. Em instantes você recebe o link da sua página.',
      newState: { stage: 'ready_to_buy', last_intent: 'confirmação positiva' },
    };
  }

  // Negativas simples
  if (['não', 'nao', 'n', 'agora não', 'agora nao', 'depois'].includes(normalized)) {
    return {
      text: 'Tudo bem! Só queria garantir que você soubesse da oportunidade. Se mudar de ideia, é só falar. 😊',
      newState: { stage: 'objection', last_intent: 'negativa momentânea' },
    };
  }

  // Agradecimentos
  if (['obrigado', 'obrigada', 'vlw', 'valeu', 'tmj'].includes(normalized)) {
    return {
      text: 'Fico feliz em ajudar! Se quiser avançar com a presença digital do seu negócio, estou aqui.',
      newState: {},
    };
  }

  // Mensagens muito curtas e genéricas — deixa a IA tratar
  return null;
}

module.exports = { applyRuleBasedReply };
