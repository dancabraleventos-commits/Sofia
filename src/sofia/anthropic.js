/**
 * Chama a API da Anthropic (Claude) com o prompt da Sofia.
 * Retorna o texto da resposta.
 */
async function callAnthropic(prompt) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) throw new Error('[Anthropic] ANTHROPIC_API_KEY não configurada');

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-haiku-4-5-20251001', // rápido e econômico para conversa em tempo real
      max_tokens: 512,
      messages: [{ role: 'user', content: prompt }],
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`[Anthropic] Erro ${response.status}: ${err}`);
  }

  const data = await response.json();
  const text = data.content?.[0]?.text || '';
return text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
}

module.exports = { callAnthropic };
