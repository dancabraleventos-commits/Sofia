-- ============================================================
-- VitrineIA / Sofia — Schema Supabase
-- Execute no SQL Editor do seu projeto Supabase
-- ============================================================

-- Tabela de leads
CREATE TABLE IF NOT EXISTS leads (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  phone         TEXT UNIQUE NOT NULL,
  name          TEXT,
  business_type TEXT,
  city          TEXT,
  status        TEXT DEFAULT 'new',        -- new | active | converted | lost
  score         INT DEFAULT 0,
  priority      INT DEFAULT 0,
  landing_page_url       TEXT,
  landing_page_sent_at   TIMESTAMPTZ,
  last_interaction_at    TIMESTAMPTZ,
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  updated_at    TIMESTAMPTZ DEFAULT NOW()
);

-- Tabela de mensagens
CREATE TABLE IF NOT EXISTS messages (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id     UUID NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
  direction   TEXT NOT NULL CHECK (direction IN ('inbound', 'outbound')),
  message_id  TEXT UNIQUE,                 -- ID da Evolution; usado para deduplicação
  text        TEXT NOT NULL,
  raw_payload JSONB,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Tabela de estado da conversa
CREATE TABLE IF NOT EXISTS conversation_state (
  lead_id           UUID PRIMARY KEY REFERENCES leads(id) ON DELETE CASCADE,
  stage             TEXT DEFAULT 'initial',
  -- prospecting | interested | objection | ready_to_buy | sent_page | waiting_payment
  last_intent       TEXT,
  last_objective    TEXT,
  lock_until        TIMESTAMPTZ,           -- evita respostas duplicadas em janela curta
  requested_landing_page BOOLEAN DEFAULT FALSE,
  last_ai_response  TEXT,
  last_inbound_at   TIMESTAMPTZ,
  last_outbound_at  TIMESTAMPTZ,
  updated_at        TIMESTAMPTZ DEFAULT NOW()
);

-- Índices úteis
CREATE INDEX IF NOT EXISTS idx_messages_lead_id   ON messages (lead_id);
CREATE INDEX IF NOT EXISTS idx_messages_created_at ON messages (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_phone        ON leads (phone);
CREATE INDEX IF NOT EXISTS idx_leads_status       ON leads (status);
