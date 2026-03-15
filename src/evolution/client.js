/**
 * Envia mensagem de texto via Evolution API.
 */
async function sendWhatsAppMessage({ instanceName, phone, message }) {
  const baseUrl = process.env.EVOLUTION_API_URL;
  const apiKey = process.env.EVOLUTION_API_KEY;

  if (!baseUrl || !apiKey) {
    throw new Error('[Evolution] EVOLUTION_API_URL e EVOLUTION_API_KEY são obrigatórias');
  }

  const url = `${baseUrl}/message/sendText/${instanceName}`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      apikey: apiKey,
    },
    body: JSON.stringify({
      number: `${phone}@s.whatsapp.net`,
      text: message,
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`[Evolution] Erro ${response.status}: ${err}`);
  }

  console.log(`[Evolution] Mensagem enviada para ${phone}`);
}

module.exports = { sendWhatsAppMessage };
