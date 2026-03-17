const express = require('express');
const { handleEvolutionWebhook } = require('./webhooks/evolution');
const { handleGerarLandingPage } = require('./landing-page/handler');
const { handleCriarPagamento } = require('./mercadopago/handler');
const { handleMercadoPagoWebhook } = require('./webhooks/mercadopago');
const { handleHandoffYasmin } = require('./handoff/yasmin');

const app = express();
app.use(express.json());

// Health check — Railway verifica este endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'sofia-vitrineia', timestamp: new Date().toISOString() });
});

// Webhook principal da Evolution API
app.post('/webhooks/evolution', handleEvolutionWebhook);

// Geração e deploy de landing page para um lead
app.post('/gerar-landing-page', handleGerarLandingPage);

// Mercado Pago — criação de cobrança PIX
app.post('/mercadopago/criar-pagamento', handleCriarPagamento);

// Mercado Pago — webhook de notificação de pagamento
app.post('/webhooks/mercadopago', handleMercadoPagoWebhook);

// Handoff para a Yasmin após pagamento confirmado
app.post('/handoff/yasmin', handleHandoffYasmin);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`[Sofia] Serviço rodando na porta ${PORT}`);
});
