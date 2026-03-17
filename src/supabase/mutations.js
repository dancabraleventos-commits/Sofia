const { supabase } = require('./client');

async function saveMessage({ lead_id, direction, message_id, text, raw_payload }) {
  const { error } = await supabase.from('messages').insert({
    lead_id,
    direction,
    message_id: message_id || null,
    text,
    raw_payload: raw_payload || null,
    created_at: new Date().toISOString(),
  });
  if (error) console.error('[Supabase] saveMessage error:', error.message);
}

async function updateConversationState(leadId, state) {
  const { error } = await supabase
    .from('conversation_state')
    .upsert({
      lead_id: leadId,
      ...state,
      updated_at: new Date().toISOString(),
    }, { onConflict: 'lead_id' });
  if (error) console.error('[Supabase] updateConversationState error:', error.message);
}

async function createAddon({ lead_id, type, payment_id, valor }) {
  const { error } = await supabase.from('addons').insert({
    lead_id,
    type,
    payment_id,
    valor,
    status: 'pending',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  });
  if (error) console.error('[Supabase] createAddon error:', error.message);
}

async function updateAddonStatus(paymentId, status) {
  const { error } = await supabase
    .from('addons')
    .update({ status, updated_at: new Date().toISOString() })
    .eq('payment_id', paymentId);
  if (error) console.error('[Supabase] updateAddonStatus error:', error.message);
}

async function saveLandingPageUrl(leadId, url) {
  const { error } = await supabase
    .from('leads')
    .update({
      url_pagina: url,
      pagina_gerada: true,
      updated_at: new Date().toISOString(),
    })
    .eq('id', leadId);
  if (error) console.error('[Supabase] saveLandingPageUrl error:', error.message);
}

module.exports = { saveMessage, updateConversationState, saveLandingPageUrl, createAddon, updateAddonStatus };
