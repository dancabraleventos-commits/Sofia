const { supabase } = require('./client');

async function getLead(phone) {
  // Tenta pela coluna 'telefone' primeiro (padrão do schema VitrineIA)
  const { data: data1, error: error1 } = await supabase
    .from('leads')
    .select('*')
    .eq('telefone', phone)
    .maybeSingle();

  if (data1) return data1;

  // Fallback: coluna 'phone' (compatibilidade)
  const { data: data2, error: error2 } = await supabase
    .from('leads')
    .select('*')
    .eq('phone', phone)
    .maybeSingle();

  if (data2) return data2;

  // Tenta com prefixo 55 removido ou adicionado
  const phoneAlt = phone.startsWith('55') ? phone.slice(2) : `55${phone}`;
  const { data: data3 } = await supabase
    .from('leads')
    .select('*')
    .or(`telefone.eq.${phoneAlt},phone.eq.${phoneAlt}`)
    .maybeSingle();

  if (!data3) {
    console.warn(`[Supabase] getLead: nenhum lead encontrado para phone=${phone}`);
  }
  return data3 || null;
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

async function getActiveAddonsByLeadId(leadId) {
  const { data, error } = await supabase
    .from('addons')
    .select('*')
    .eq('lead_id', leadId)
    .eq('status', 'active')
    .order('created_at', { ascending: true });
  if (error) {
    console.error('[Supabase] getActiveAddonsByLeadId error:', error.message);
    return [];
  }
  return data || [];
}

async function getAddonByPaymentId(paymentId) {
  const { data, error } = await supabase
    .from('addons')
    .select('*')
    .eq('payment_id', paymentId)
    .single();
  if (error) {
    console.error('[Supabase] getAddonByPaymentId error:', error.message);
    return null;
  }
  return data;
}

async function getLeadById(leadId) {
  const { data, error } = await supabase
    .from('leads')
    .select('*')
    .eq('id', leadId)
    .single();
  if (error) {
    console.error('[Supabase] getLeadById error:', error.message);
    return null;
  }
  return data;
}

module.exports = { getLead, getRecentMessages, getConversationState, getLandingPageUrl, getAddonByPaymentId, getLeadById, getActiveAddonsByLeadId };
