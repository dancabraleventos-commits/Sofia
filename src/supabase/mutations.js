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

module.exports = { saveMessage, updateConversationState };
