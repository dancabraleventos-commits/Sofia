const { supabase } = require('./client');

async function getLead(phone) {
  const { data, error } = await supabase
    .from('leads')
    .select('*')
    .or(`phone.eq.${phone},telefone.eq.${phone}`)
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
  return (data || []).reverse();
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

/**
 * Busca a URL da landing page gerada pelo n8n/Vercel.
 * Retorna null se ainda não foi gerada.
 */
async function getLandingPageUrl(leadId) {
  const { data, error } = await supabase
    .from('leads')
    .select('url_pagina, pagina_gerada')
    .eq('id', leadId)
    .single();

  if (error || !data?.pagina_gerada || !data?.url_pagina) return null;
  return data.url_pagina;
}

module.exports = { getLead, getRecentMessages, getConversationState, getLandingPageUrl };
