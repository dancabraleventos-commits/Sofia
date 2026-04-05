const express = require('express');
const { handleEvolutionWebhook, registerFirstContactSent } = require('./webhooks/evolution');
const { handleGerarLandingPage } = require('./landing-page/handler');
const { handleCriarPagamento } = require('./mercadopago/handler');
const { handleMercadoPagoWebhook } = require('./webhooks/mercadopago');
const { handleHandoffYasmin } = require('./handoff/yasmin');
const { runReprocess } = require('./jobs/reprocess-unanswered');

const app = express();
app.use(express.json());

// Health check — Railway verifica este endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'sofia-vitrineia', timestamp: new Date().toISOString() });
});

// Webhook principal da Evolution API
app.post('/webhooks/evolution', handleEvolutionWebhook);

// Notifica a Sofia que o "Oi, tudo bem?" foi enviado para um número.
// Chamado pelo N8N logo após o disparo via Evolution API.
// Body: { phone: "5512999990000" }
app.post('/webhooks/first-contact-sent', (req, res) => {
  const { phone } = req.body || {};
  if (!phone) return res.status(400).json({ error: 'phone obrigatório' });
  registerFirstContactSent(phone);
  console.log(`[Sofia] Primeiro contato registrado para ${phone}`);
  res.json({ ok: true });
});

// Geração e deploy de landing page para um lead
app.post('/gerar-landing-page', handleGerarLandingPage);

// Mercado Pago — criação de cobrança PIX
app.post('/mercadopago/criar-pagamento', handleCriarPagamento);

// Mercado Pago — webhook de notificação de pagamento
app.post('/webhooks/mercadopago', handleMercadoPagoWebhook);

// Handoff para a Yasmin após pagamento confirmado
app.post('/handoff/yasmin', handleHandoffYasmin);

// Reprocessa leads que responderam mas não receberam resposta da Sofia.
// Útil para recuperar conversas perdidas por bug ou downtime.
app.post('/jobs/reprocess-unanswered', async (req, res) => {
  console.log('[Sofia] Reprocessamento manual iniciado...');
  res.json({ ok: true, message: 'Reprocessamento iniciado em background' });
  try {
    const result = await runReprocess();
    console.log('[Sofia] Reprocessamento concluído:', result);
  } catch (err) {
    console.error('[Sofia] Erro no reprocessamento:', err.message);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`[Sofia] Serviço rodando na porta ${PORT}`);
});
