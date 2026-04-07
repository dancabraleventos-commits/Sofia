/**
 * Envia mensagens via Evolution API.
 * Suporta texto e imagem.
 */

const EVOLUTION_API_URL = () => process.env.EVOLUTION_API_URL;
const EVOLUTION_API_KEY = () => process.env.EVOLUTION_API_KEY;

function getHeaders() {
  return {
    'Content-Type': 'application/json',
    apikey: EVOLUTION_API_KEY(),
  };
}

/**
 * Envia mensagem de texto.
 */
async function sendWhatsAppMessage({ instanceName, phone, message }) {
  const url = `${EVOLUTION_API_URL()}/message/sendText/${instanceName}`;

  const response = await fetch(url, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({
      number: `${phone}@s.whatsapp.net`,
      text: message,
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`[Evolution] Erro texto ${response.status}: ${err}`);
  }

  console.log(`[Evolution] Texto enviado para ${phone}`);
}

/**
 * Envia imagem via URL pública.
 * caption = legenda opcional abaixo da imagem.
 */
async function sendWhatsAppImage({ instanceName, phone, imageUrl, caption = '' }) {
  const url = `${EVOLUTION_API_URL()}/message/sendMedia/${instanceName}`;

  const response = await fetch(url, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({
      number: `${phone}@s.whatsapp.net`,
      mediatype: 'image',
      mimetype: 'image/jpeg',
      media: imageUrl,
      caption,
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`[Evolution] Erro imagem ${response.status}: ${err}`);
  }

  console.log(`[Evolution] Imagem enviada para ${phone}`);
}

module.exports = { sendWhatsAppMessage, sendWhatsAppImage };
