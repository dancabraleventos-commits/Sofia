/**
 * Detecta o melhor add-on a oferecer com base na categoria do negócio.
 *
 * Prioridade (conforme briefing):
 *  1. Barbearia, salão, clínica, academia → Calendário R$29/mês
 *  2. Restaurante, loja, farmácia, oficina → Google Meu Negócio R$19/mês
 *  3. Demais → Instagram com IA R$39/mês
 */

const ADDONS = {
  calendario: {
    type: 'calendario',
    name: 'Calendário de Agendamento',
    price: 'R$29/mês',
  },
  google: {
    type: 'google',
    name: 'Google Meu Negócio',
    price: 'R$19/mês',
  },
  instagram: {
    type: 'instagram',
    name: 'Instagram com IA',
    price: 'R$39/mês',
  },
};

const CALENDARIO_KEYWORDS = [
  'barbearia', 'barber', 'salão', 'salao', 'cabeleireiro', 'cabeleireira',
  'clínica', 'clinica', 'academia', 'fisioterapia', 'fisio',
  'estética', 'estetica', 'spa', 'massagem', 'pilates', 'personal',
  'dentista', 'odonto', 'médico', 'medico', 'psicólogo', 'psicologo',
  'nutricionista', 'terapeuta',
];

const GOOGLE_KEYWORDS = [
  'restaurante', 'lanchonete', 'pizzaria', 'hamburgueria', 'hamburguer',
  'loja', 'farmácia', 'farmacia', 'oficina', 'mecânica', 'mecanica',
  'padaria', 'mercado', 'supermercado', 'petshop', 'pet shop', 'pet',
  'açougue', 'acougue', 'sorveteria', 'confeitaria', 'doce',
  'mercearia', 'borracharia', 'elétrica', 'eletrica',
];

/**
 * @param {string} categoria - Categoria/tipo do negócio
 * @returns {{ type: string, name: string, price: string }}
 */
function detectBestAddon(categoria) {
  if (!categoria) return ADDONS.instagram;

  const normalized = categoria.toLowerCase();

  if (CALENDARIO_KEYWORDS.some(kw => normalized.includes(kw))) {
    return ADDONS.calendario;
  }

  if (GOOGLE_KEYWORDS.some(kw => normalized.includes(kw))) {
    return ADDONS.google;
  }

  return ADDONS.instagram;
}

module.exports = { detectBestAddon, ADDONS };
