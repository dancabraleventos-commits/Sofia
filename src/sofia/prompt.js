/**
 * Prompt premium para geração de landing page HTML completa via Claude.
 * Gera uma página única com CSS embutido, otimizada para conversão.
 * Paletas e diretrizes visuais específicas por segmento.
 */

// Paletas e personalidade visual por segmento
const SEGMENTOS = {
  corretor: {
    match: ['corretor', 'imóvel', 'imovel', 'imobiliária', 'imobiliaria', 'permuta', 'apartamento', 'casa'],
    cores: { primaria: '#0f2540', secundaria: '#c9a84c', acento: '#f5f0e8', texto: '#1a1a2e' },
    fonte: 'Cormorant Garamond',
    fonteBody: 'Jost',
    estilo: 'luxury/refined — sofisticado, editorial, premium. Transmite confiança e exclusividade.',
    hero_bg: 'linear-gradient(135deg, #0f2540 0%, #1a3c5e 60%, #0f2540 100%)',
    emoji_setor: '🏡',
  },
  barbeiro: {
    match: ['barbeiro', 'barbearia', 'barba', 'cabelo masculino'],
    cores: { primaria: '#1a1a1a', secundaria: '#d4af37', acento: '#f9f4e8', texto: '#111111' },
    fonte: 'Bebas Neue',
    fonteBody: 'DM Sans',
    estilo: 'bold/industrial — masculino, forte, vintage moderno. Transmite habilidade e estilo.',
    hero_bg: 'linear-gradient(160deg, #1a1a1a 0%, #2d2d2d 100%)',
    emoji_setor: '✂️',
  },
  salao: {
    match: ['salão', 'salao', 'cabeleireiro', 'cabeleireira', 'beleza', 'estética', 'estetica', 'manicure', 'unhas'],
    cores: { primaria: '#2d1b3d', secundaria: '#e8a4c8', acento: '#fdf6f9', texto: '#1a0a2e' },
    fonte: 'Playfair Display',
    fonteBody: 'Nunito',
    estilo: 'elegante/feminino — sofisticado com toque floral. Transmite cuidado e feminilidade.',
    hero_bg: 'linear-gradient(135deg, #2d1b3d 0%, #6b3fa0 100%)',
    emoji_setor: '💅',
  },
  clinica: {
    match: ['clínica', 'clinica', 'médico', 'medico', 'dentista', 'odonto', 'psicólogo', 'psicologo', 'fisio', 'saúde', 'saude', 'nutricionista'],
    cores: { primaria: '#003d6b', secundaria: '#00b4d8', acento: '#f0f8ff', texto: '#0a2540' },
    fonte: 'Outfit',
    fonteBody: 'Source Sans 3',
    estilo: 'clean/confiável — moderno, claro, transmite segurança e competência profissional.',
    hero_bg: 'linear-gradient(135deg, #003d6b 0%, #0077b6 100%)',
    emoji_setor: '🏥',
  },
  restaurante: {
    match: ['restaurante', 'lanchonete', 'pizzaria', 'hamburgueria', 'comida', 'culinária', 'culinaria', 'café', 'cafe', 'padaria', 'confeitaria'],
    cores: { primaria: '#7b2d00', secundaria: '#e85d04', acento: '#fff8f0', texto: '#3d1400' },
    fonte: 'Fraunces',
    fonteBody: 'Karla',
    estilo: 'apetitoso/acolhedor — quente, convidativo. Desperta apetite e sensação de conforto.',
    hero_bg: 'linear-gradient(135deg, #7b2d00 0%, #c44d00 100%)',
    emoji_setor: '🍽️',
  },
  advocacia: {
    match: ['advogado', 'advogada', 'advocacia', 'jurídico', 'juridico', 'direito', 'escritório jurídico'],
    cores: { primaria: '#1c2b4a', secundaria: '#8b6914', acento: '#f8f6f0', texto: '#0d1b2e' },
    fonte: 'EB Garamond',
    fonteBody: 'Inter',
    estilo: 'formal/autoridade — sério, elegante, transmite credibilidade e competência.',
    hero_bg: 'linear-gradient(160deg, #1c2b4a 0%, #2e4270 100%)',
    emoji_setor: '⚖️',
  },
  contabilidade: {
    match: ['contábil', 'contabil', 'contabilidade', 'contador', 'contadora', 'fiscal', 'tributário'],
    cores: { primaria: '#14433d', secundaria: '#2ec4a3', acento: '#f0faf8', texto: '#0a2a26' },
    fonte: 'Syne',
    fonteBody: 'Mulish',
    estilo: 'confiável/moderno — profissional, claro, transmite organização e segurança financeira.',
    hero_bg: 'linear-gradient(135deg, #14433d 0%, #1a6b5e 100%)',
    emoji_setor: '📊',
  },
  academia: {
    match: ['academia', 'personal', 'crossfit', 'pilates', 'musculação', 'musculacao', 'fitness', 'treino'],
    cores: { primaria: '#0d0d0d', secundaria: '#ff3d00', acento: '#fff5f3', texto: '#0d0d0d' },
    fonte: 'Barlow Condensed',
    fonteBody: 'Barlow',
    estilo: 'energético/impactante — forte, dinâmico, motivacional. Transmite poder e resultados.',
    hero_bg: 'linear-gradient(160deg, #0d0d0d 0%, #1a0800 100%)',
    emoji_setor: '💪',
  },
  pet: {
    match: ['pet', 'veterinário', 'veterinario', 'animal', 'cachorro', 'gato', 'banho e tosa'],
    cores: { primaria: '#1a4d6e', secundaria: '#f4a261', acento: '#fff8f0', texto: '#0d2d42' },
    fonte: 'Nunito',
    fonteBody: 'Nunito',
    estilo: 'acolhedor/amigável — caloroso, alegre, transmite cuidado e amor pelos animais.',
    hero_bg: 'linear-gradient(135deg, #1a4d6e 0%, #2980b9 100%)',
    emoji_setor: '🐾',
  },
  tecnologia: {
    match: ['tech', 'tecnologia', 'software', 'desenvolvimento', 'app', 'ti ', 'informática', 'informatica', 'suporte'],
    cores: { primaria: '#0a0a1a', secundaria: '#6c63ff', acento: '#f0f0ff', texto: '#0a0a1a' },
    fonte: 'Space Grotesk',
    fonteBody: 'Space Grotesk',
    estilo: 'tech/futurista — moderno, digital, transmite inovação e competência técnica.',
    hero_bg: 'linear-gradient(135deg, #0a0a1a 0%, #1a1a3e 100%)',
    emoji_setor: '💻',
  },
};

const SEGMENTO_DEFAULT = {
  cores: { primaria: '#1a2e4a', secundaria: '#e67e22', acento: '#fafafa', texto: '#1a1a1a' },
  fonte: 'Plus Jakarta Sans',
  fonteBody: 'Plus Jakarta Sans',
  estilo: 'profissional/moderno — limpo, confiável, transmite competência e seriedade.',
  hero_bg: 'linear-gradient(135deg, #1a2e4a 0%, #2e4a6e 100%)',
  emoji_setor: '⭐',
};

function detectarSegmento(categoria) {
  if (!categoria) return SEGMENTO_DEFAULT;
  const lower = categoria.toLowerCase();
  for (const [, seg] of Object.entries(SEGMENTOS)) {
    if (seg.match.some(kw => lower.includes(kw))) return seg;
  }
  return SEGMENTO_DEFAULT;
}

function buildLandingPagePrompt({ nome, categoria, cidade, phone, endereco }) {
  const seg = detectarSegmento(categoria);
  const phoneClean = phone.replace(/\D/g, '');
  const whatsappUrl = `https://wa.me/55${phoneClean}?text=Olá%2C%20vim%20pelo%20site%20e%20gostaria%20de%20mais%20informações`;

  return `Você é um designer e copywriter sênior especializado em landing pages de alta conversão para negócios brasileiros. Seu trabalho é criar páginas que parecem ter custado R$5.000, não geradas por IA.

## DADOS DO NEGÓCIO
- Nome: ${nome}
- Segmento: ${categoria}
- Cidade: ${cidade}
- WhatsApp: ${phone}
- Informações adicionais: ${endereco || 'não informado'}

## IDENTIDADE VISUAL OBRIGATÓRIA PARA ESTE SEGMENTO
Estilo: ${seg.estilo}
- Cor primária: ${seg.cores.primaria}
- Cor secundária/acento dourado: ${seg.cores.secundaria}
- Cor de fundo suave: ${seg.cores.acento}
- Cor de texto: ${seg.cores.texto}
- Hero background: ${seg.hero_bg}
- Fonte display (títulos): ${seg.fonte} — importar do Google Fonts
- Fonte body (texto): ${seg.fonteBody} — importar do Google Fonts
- Emoji/ícone do setor: ${seg.emoji_setor}

## DIRETRIZES DE DESIGN — OBRIGATÓRIAS
Você DEVE implementar todos estes elementos:

1. **Tipografia contrastante**: Títulos grandes e impactantes (3.5rem–5rem no desktop), linha de base ampla
2. **Hero de alto impacto**: Fundo com o gradiente definido acima, texto branco, sem imagens externas
3. **Cards com glassmorphism**: background: rgba(255,255,255,0.08), backdrop-filter: blur(10px), border: 1px solid rgba(255,255,255,0.15) — usar nas seções sobre fundo escuro
4. **Linha decorativa**: Usar a cor secundária como acento (underline nos títulos, bordas left nos destaques, separadores)
5. **Botão WhatsApp**: Verde #25d366 com ícone FontAwesome, border-radius: 50px, padding generoso, sombra colorida
6. **Animações de entrada**: @keyframes fadeInUp com animation-delay escalonado nos cards (0.1s, 0.2s, 0.3s)
7. **Seções alternadas**: Hero escuro → Benefícios claro → Diferenciais escuro (primária) → Depoimentos claro → CTA escuro
8. **Footer elegante**: Fundo escuro com cor primária, logo/nome grande, contatos alinhados

## ESTRUTURA DA PÁGINA (nesta ordem exata)
1. **Header fixo** — fundo primário semitransparente com blur, nome do negócio à esquerda, botão WhatsApp à direita
2. **Hero** — headline impactante (resultado/transformação, não descrição), subheadline específica, 2 CTAs (WhatsApp + "Ver como funciona")
3. **Benefícios** — 3 cards sobre fundo claro com ícone FontAwesome, título, descrição de 2 linhas. Específicos do segmento
4. **Por que escolher** — fundo primário escuro, 4 diferenciais com ícone colorido na cor secundária, extraídos das informações adicionais
5. **Depoimentos** — 3 cards com aspas decorativas grandes, nome e cidade do cliente (fictícios mas plausíveis)
6. **CTA central** — fundo gradiente, headline de urgência, botão grande WhatsApp, subtext com cidade
7. **Footer** — contato, CRECI se mencionado, cidade, copyright

## COPYWRITING — REGRAS
- Headline do Hero: foco em RESULTADO para o cliente, não em descrição do serviço. Ex: "Encontre o Imóvel Ideal em ${cidade} Sem Complicação" — nunca "Somos especialistas em..."
- Use o nome "${nome}" em pelo menos 3 lugares estratégicos
- Mencione "${cidade}" na headline e no CTA final
- Extraia diferenciais REAIS das informações adicionais: "${endereco || ''}"
- Urgência natural: "atendimento personalizado", "agenda limitada", "consulta gratuita" — nunca fake
- Depoimentos: nomes brasileiros comuns, específicos ao segmento e cidade
- CTA dos botões: verbos de ação + benefício. Ex: "Quero Meu Imóvel Agora", não "Clique aqui"
- Link WhatsApp em TODOS os botões: ${whatsappUrl}

## REQUISITOS TÉCNICOS
- HTML único autocontido, CSS embutido no <style>
- Mobile-first, breakpoint principal em 768px
- Google Fonts: @import das duas fontes definidas acima
- Font Awesome 6 via CDN: https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css
- Sem jQuery, sem frameworks externos de CSS
- CSS variables no :root para todas as cores
- Scroll behavior: smooth
- Meta tags: viewport, description com nome e cidade, og:title

## FORMATO DE RESPOSTA
Retorne APENAS o código HTML completo começando com <!DOCTYPE html> e terminando com </html>.
Zero explicações. Zero markdown. Zero blocos de código. Apenas HTML puro pronto para publicar.`;
}

module.exports = { buildLandingPagePrompt };
