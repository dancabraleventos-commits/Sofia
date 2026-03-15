const { supabase } = require('./client');

async function getLead(phone) {
  const { data, error } = await supabase
    .from('leads')
    .select('*')
    .eq('phone', phone)
    .single();
  if (error) {
    console.error('[Supabase] getLead error:', error.message);
    return null;
  }
  return data;
}

async function getRecentMessages(leadId, limit = 10) {
  const { data, error } = await supabase
    .from('messages')
    .select('direction, text, created_at')
    .eq('lead_id', leadId)
    .order('created_at', { ascending: false })
    .limit(limit);
  if (error) {
    console.error('[Supabase] getRecentMessages error:', error.message);
    return [];
  }
  return (data || []).reverse(); // ordem cronológica
}

async function getConversationState(leadId) {
  const { data, error } = await supabase
    .from('conversation_state')
    .select('*')
    .eq('lead_id', leadId)
    .single();
  if (error) return null;
  return data;
}

module.exports = { getLead, getRecentMessages, getConversationState };
