/**
 * Handler do endpoint POST /gerar-landing-page.
 * Recebe dados do lead, gera HTML via Claude, faz deploy no Vercel,
 * salva URL no Supabase e envia via WhatsApp.
 */
const { buildLandingPagePrompt } = require('./prompt');
const { deployToVercel } = require('./vercel');
const { saveLandingPageUrl } = require('../supabase/mutations');
const { sendWhatsAppMessage } = require('../evolution/client');

async function handleGerarLandingPage(req, res) {
  const { nome, categoria, cidade, phone, endereco, lead_id } = req.body;

  if (!nome || !categoria || !cidade || !phone || !lead_id) {
    return res.status(400).json({
      error: 'Campos obrigatórios: nome, categoria, cidade, phone, lead_id',
    });
  }

  // Responde imediatamente para não bloquear o cliente
  res.status(202).json({ status: 'processing', lead_id });

  try {
    console.log(`[LandingPage] Gerando página para lead ${lead_id} — ${nome} (${categoria}, ${cidade})`);

    // 1. Gera o HTML via Claude Sonnet
    const html = await generateHtmlWithClaude({ nome, categoria, cidade, phone, endereco });
    console.log(`[LandingPage] HTML gerado — ${html.length} caracteres`);

    // 2. Faz deploy no Vercel
    const url = await deployToVercel(html, lead_id);
    console.log(`[LandingPage] Deploy concluído: ${url}`);

    // 3. Salva URL no Supabase
    await saveLandingPageUrl(lead_id, url);
    console.log(`[LandingPage] URL salva no Supabase para lead ${lead_id}`);

    // 4. Envia URL via WhatsApp
    const instanceName = process.env.EVOLUTION_INSTANCE;
    if (!instanceName) {
      console.warn('[LandingPage] EVOLUTION_INSTANCE não configurada — envio WhatsApp pulado');
    } else {
      const message = `Olá, ${nome}! 🎉 Sua página personalizada está pronta:\n\n${url}\n\nAcesse agora e veja como ficou! Qualquer ajuste é só me falar. 😊`;
      await sendWhatsAppMessage({ instanceName, phone, message });
      console.log(`[LandingPage] URL enviada via WhatsApp para ${phone}`);
    }

  } catch (err) {
    console.error('[LandingPage] Erro:', err.message);
  }
}

async function generateHtmlWithClaude({ nome, categoria, cidade, phone, endereco }) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) throw new Error('[Anthropic] ANTHROPIC_API_KEY não configurada');

  const prompt = buildLandingPagePrompt({ nome, categoria, cidade, phone, endereco });

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-6',
      max_tokens: 32000,
      messages: [{ role: 'user', content: prompt }],
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`[Anthropic] Erro ${response.status}: ${err}`);
  }

  const data = await response.json();
  const html = data.content?.[0]?.text || '';

  if (!html.includes('<!DOCTYPE html') && !html.includes('<html')) {
    throw new Error('[Anthropic] Resposta não contém HTML válido');
  }

  // Remove possível bloco markdown se o modelo ignorar a instrução
  return html
    .replace(/^```html\n?/i, '')
    .replace(/^```\n?/, '')
    .replace(/\n?```$/, '')
    .trim();
}

module.exports = { handleGerarLandingPage };
