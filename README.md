# Sofia — VitrineIA

Motor conversacional comercial da VitrineIA, hospedado no Railway.

## Arquitetura

```
Evolution API (WhatsApp)
        │ webhook POST /webhooks/evolution
        ▼
   Railway (Sofia)
   ├── Filtros anti-loop (fromMe, grupo, duplicidade)
   ├── Contexto: Supabase (leads + messages + conversation_state)
   ├── Motor: regras simples → IA (Claude via Anthropic API)
   └── Resposta via Evolution API
        │ quando necessário
        ▼
      n8n  (landing page, follow-up, CRM)
```

## Estrutura do projeto

```
src/
├── server.js              # Entry point — Express + /health
├── webhooks/
│   └── evolution.js       # Handler do webhook com filtros anti-loop
├── supabase/
│   ├── client.js          # Singleton do cliente Supabase
│   ├── queries.js         # Leitura de leads, mensagens e estado
│   └── mutations.js       # Escrita de mensagens e estado
├── sofia/
│   ├── engine.js          # Orquestrador: regra → IA → estado → landing page
│   ├── prompt.js          # Prompt mestre com contexto completo do lead
│   ├── rules.js           # Respostas rápidas por regra (sem IA)
│   └── anthropic.js       # Cliente da API Anthropic
└── evolution/
    └── client.js          # Envio de mensagens via Evolution API
supabase_schema.sql        # Schema das tabelas (rodar no Supabase)
railway.toml               # Configuração do Railway
.env.example               # Variáveis de ambiente necessárias
```

## Deploy no Railway

### 1. Suba o repositório no GitHub

```bash
git init
git add .
git commit -m "feat: sofia vitrineia inicial"
git remote add origin https://github.com/SEU_USUARIO/sofia-vitrineia.git
git push -u origin main
```

### 2. Crie um novo projeto no Railway

- Acesse [railway.app](https://railway.app) → **New Project** → **Deploy from GitHub repo**
- Selecione o repositório `sofia-vitrineia`
- Railway detecta o `railway.toml` automaticamente

### 3. Configure as variáveis de ambiente no Railway

No painel do serviço → **Variables**, adicione:

| Variável | Descrição |
|---|---|
| `SUPABASE_URL` | URL do seu projeto Supabase |
| `SUPABASE_SERVICE_ROLE_KEY` | Chave service role do Supabase |
| `ANTHROPIC_API_KEY` | Chave da API Anthropic |
| `EVOLUTION_API_URL` | URL base da Evolution API |
| `EVOLUTION_API_KEY` | Chave da Evolution API |
| `N8N_LANDING_PAGE_WEBHOOK` | Webhook do n8n para geração de landing page |

### 4. Rode o schema no Supabase

Execute o conteúdo de `supabase_schema.sql` no **SQL Editor** do seu projeto Supabase.

### 5. Valide o deploy

Após o deploy, acesse:

```
https://SEU-SERVICO.up.railway.app/health
```

Deve retornar:

```json
{ "status": "ok", "service": "sofia-vitrineia", "timestamp": "..." }
```

### 6. Configure o webhook na Evolution API

No painel da Evolution, aponte o webhook para:

```
https://SEU-SERVICO.up.railway.app/webhooks/evolution
```

## Fluxo de ativação da Sofia

1. n8n gera lead → salva no Supabase → envia **primeira mensagem fixa** via Evolution
2. Lead responde → Evolution dispara webhook → **Sofia entra na conversa**
3. Sofia lê contexto, responde e atualiza estado no Supabase
4. Quando há abertura real → Sofia sinaliza → Railway chama n8n → n8n gera landing page → Sofia envia URL ao lead

## Comportamento da Sofia

- **Nunca inicia** a conversa (abertura já foi feita pelo n8n)
- **Nunca repete** saudação
- Responde como continuação natural da conversa
- Usa **regras simples** para mensagens triviais (sim/não/obrigado)
- Usa **IA (Claude)** para contextos comerciais ricos
- Sugere add-ons **conforme o contexto** do negócio do lead
- Usa urgência **plausível**, nunca falsa escassez absurda

## Desenvolvimento local

```bash
cp .env.example .env
# preencha o .env com suas credenciais reais

npm install
npm run dev   # hot reload via nodemon
```
