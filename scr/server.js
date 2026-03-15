const express = require('express');
const { handleEvolutionWebhook } = require('./webhooks/evolution');

const app = express();
app.use(express.json());

// Health check — Railway verifica este endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'sofia-vitrineia', timestamp: new Date().toISOString() });
});

// Webhook principal da Evolution API
app.post('/webhooks/evolution', handleEvolutionWebhook);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`[Sofia] Serviço rodando na porta ${PORT}`);
});
