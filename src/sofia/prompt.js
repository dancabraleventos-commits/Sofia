/**
 * Prompt premium para geração de landing page HTML completa via Claude.
 * CSS base injetado diretamente — modelo não tem escolha visual.
 */

const SEGMENTOS = {
  corretor: {
    match: ['corretor', 'imóvel', 'imovel', 'imobiliária', 'imobiliaria', 'permuta', 'apartamento', 'casa'],
    css: `
      --cor-primaria: #0f2540;
      --cor-secundaria: #c9a84c;
      --cor-acento: #f5f0e8;
      --cor-texto: #1a1a2e;
      --hero-bg: linear-gradient(135deg, #0f2540 0%, #1a3c5e 60%, #0f2540 100%);
      --fonte-display: 'Cormorant Garamond', serif;
      --fonte-body: 'Jost', sans-serif;`,
    fonts: 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=Jost:wght@300;400;500;600&display=swap',
    hero_text: 'Encontre o Imóvel Ideal',
    cta: 'Quero Meu Imóvel Agora',
  },
  barbeiro: {
    match: ['barbeiro', 'barbearia', 'barba', 'cabelo masculino'],
    css: `
      --cor-primaria: #1a1a1a;
      --cor-secundaria: #d4af37;
      --cor-acento: #f9f4e8;
      --cor-texto: #111111;
      --hero-bg: linear-gradient(160deg, #1a1a1a 0%, #2d2d2d 100%);
      --fonte-display: 'Bebas Neue', cursive;
      --fonte-body: 'DM Sans', sans-serif;`,
    fonts: 'https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500&display=swap',
    hero_text: 'O Melhor da Barbearia',
    cta: 'Agendar Agora',
  },
  salao: {
    match: ['salão', 'salao', 'cabeleireiro', 'cabeleireira', 'beleza', 'estética', 'estetica', 'manicure', 'unhas'],
    css: `
      --cor-primaria: #2d1b3d;
      --cor-secundaria: #e8a4c8;
      --cor-acento: #fdf6f9;
      --cor-texto: #1a0a2e;
      --hero-bg: linear-gradient(135deg, #2d1b3d 0%, #6b3fa0 100%);
      --fonte-display: 'Playfair Display', serif;
      --fonte-body: 'Nunito', sans-serif;`,
    fonts: 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Nunito:wght@300;400;600&display=swap',
    hero_text: 'Sua Beleza em Mãos Especializadas',
    cta: 'Agendar Horário',
  },
  clinica: {
    match: ['clínica', 'clinica', 'médico', 'medico', 'dentista', 'odonto', 'psicólogo', 'psicologo', 'fisio', 'saúde', 'saude', 'nutricionista'],
    css: `
      --cor-primaria: #003d6b;
      --cor-secundaria: #00b4d8;
      --cor-acento: #f0f8ff;
      --cor-texto: #0a2540;
      --hero-bg: linear-gradient(135deg, #003d6b 0%, #0077b6 100%);
      --fonte-display: 'Outfit', sans-serif;
      --fonte-body: 'Outfit', sans-serif;`,
    fonts: 'https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;700&display=swap',
    hero_text: 'Sua Saúde em Boas Mãos',
    cta: 'Agendar Consulta',
  },
  restaurante: {
    match: ['restaurante', 'lanchonete', 'pizzaria', 'hamburgueria', 'comida', 'culinária', 'culinaria', 'café', 'cafe', 'padaria', 'confeitaria'],
    css: `
      --cor-primaria: #7b2d00;
      --cor-secundaria: #e85d04;
      --cor-acento: #fff8f0;
      --cor-texto: #3d1400;
      --hero-bg: linear-gradient(135deg, #7b2d00 0%, #c44d00 100%);
      --fonte-display: 'Fraunces', serif;
      --fonte-body: 'Karla', sans-serif;`,
    fonts: 'https://fonts.googleapis.com/css2?family=Fraunces:wght@400;700&family=Karla:wght@400;500&display=swap',
    hero_text: 'Sabor e Qualidade em Cada Detalhe',
    cta: 'Fazer Pedido Agora',
  },
  academia: {
    match: ['academia', 'personal', 'crossfit', 'pilates', 'musculação', 'musculacao', 'fitness', 'treino'],
    css: `
      --cor-primaria: #0d0d0d;
      --cor-secundaria: #ff3d00;
      --cor-acento: #fff5f3;
      --cor-texto: #0d0d0d;
      --hero-bg: linear-gradient(160deg, #0d0d0d 0%, #1a0800 100%);
      --fonte-display: 'Barlow Condensed', sans-serif;
      --fonte-body: 'Barlow', sans-serif;`,
    fonts: 'https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700;800&family=Barlow:wght@400;500&display=swap',
    hero_text: 'Transforme Seu Corpo. Supere Seus Limites.',
    cta: 'Começar Agora',
  },
  default: {
    css: `
      --cor-primaria: #1a2e4a;
      --cor-secundaria: #e67e22;
      --cor-acento: #fafafa;
      --cor-texto: #1a1a1a;
      --hero-bg: linear-gradient(135deg, #1a2e4a 0%, #2e4a6e 100%);
      --fonte-display: 'Plus Jakarta Sans', sans-serif;
      --fonte-body: 'Plus Jakarta Sans', sans-serif;`,
    fonts: 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;600;700&display=swap',
    hero_text: 'O Melhor Serviço para Você',
    cta: 'Falar pelo WhatsApp',
  },
};

function detectarSegmento(categoria) {
  if (!categoria) return SEGMENTOS.default;
  const lower = categoria.toLowerCase();
  for (const [, seg] of Object.entries(SEGMENTOS)) {
    if (seg.match && seg.match.some(kw => lower.includes(kw))) return seg;
  }
  return SEGMENTOS.default;
}

function buildLandingPagePrompt({ nome, categoria, cidade, phone, endereco }) {
  const seg = detectarSegmento(categoria);
  const phoneClean = phone.replace(/\D/g, '');
  const whatsappUrl = `https://wa.me/55${phoneClean}?text=Olá%2C%20vim%20pelo%20site%20e%20gostaria%20de%20mais%20informações`;

  return `Você é um desenvolvedor frontend sênior. Gere uma landing page HTML completa para o seguinte negócio.

## DADOS
- Nome: ${nome}
- Segmento: ${categoria}
- Cidade: ${cidade}
- WhatsApp: ${phone}
- Diferenciais: ${endereco || 'não informado'}
- Link WhatsApp: ${whatsappUrl}

## CSS OBRIGATÓRIO — USE EXATAMENTE ESTAS VARIÁVEIS NO :root
\`\`\`css
:root {${seg.css}
}
\`\`\`

## FONTE OBRIGATÓRIA — ESTE LINK EXATO NO <head>
<link href="${seg.fonts}" rel="stylesheet">

## ESTRUTURA HTML OBRIGATÓRIA

### 1. HEADER (position: sticky, top: 0, z-index: 100)
- background: var(--cor-primaria)
- Nome "${nome}" à esquerda em var(--fonte-display), cor: var(--cor-secundaria)
- Botão "WhatsApp" à direita: background #25d366, border-radius 50px

### 2. HERO SECTION
- background: var(--hero-bg) — USE ESTE GRADIENTE EXATO
- min-height: 85vh, display flex, align-items center, text-align center
- H1: font-family var(--fonte-display), font-size clamp(2.5rem, 6vw, 5rem), cor: #ffffff
- Subheadline: extraída dos diferenciais "${endereco}", cor: rgba(255,255,255,0.85)
- Botão CTA primário: background #25d366, padding 1rem 2.5rem, border-radius 50px, font-size 1.1rem
- Headline deve mencionar "${cidade}" e focar em resultado para o cliente

### 3. BENEFÍCIOS (3 cards)
- background: var(--cor-acento)
- Cards: background #fff, border-radius 16px, box-shadow 0 4px 24px rgba(0,0,0,0.08)
- Ícone Font Awesome: color var(--cor-secundaria), font-size 2.5rem
- Título: font-family var(--fonte-display), color var(--cor-primaria)
- Conteúdo específico para ${categoria}

### 4. DIFERENCIAIS (sobre fundo escuro)
- background: var(--cor-primaria)
- Texto: #ffffff
- 4 diferenciais extraídos de: "${endereco || categoria}"
- Ícones Font Awesome: color var(--cor-secundaria)
- Borda left nos itens: 3px solid var(--cor-secundaria)

### 5. DEPOIMENTOS (3 cards)
- background: var(--cor-acento)
- Aspas decorativas grandes: color var(--cor-secundaria), font-size 4rem, opacity 0.3
- Nome e cidade do cliente (fictícios, plausíveis para ${cidade})

### 6. CTA FINAL
- background: var(--hero-bg)
- Headline de urgência mencionando ${cidade}
- Botão WhatsApp grande: background #25d366

### 7. FOOTER
- background: var(--cor-primaria)
- Cor texto: rgba(255,255,255,0.8)
- Nome, cidade, contato, copyright

## ANIMAÇÕES OBRIGATÓRIAS
\`\`\`css
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}
.fade-in { animation: fadeInUp 0.6s ease forwards; }
.delay-1 { animation-delay: 0.1s; }
.delay-2 { animation-delay: 0.2s; }
.delay-3 { animation-delay: 0.3s; }
\`\`\`

## OUTROS REQUISITOS TÉCNICOS
- Font Awesome: <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
- Mobile-first, breakpoint 768px
- Scroll behavior smooth
- Hover nos botões: filter brightness(1.1), transform translateY(-2px)
- Hover nos cards: transform translateY(-4px), box-shadow maior

## FORMATO DE RESPOSTA
Retorne APENAS o HTML completo começando com <!DOCTYPE html> e terminando com </html>.
Sem explicações. Sem markdown. Sem blocos de código. HTML puro.`;
}

module.exports = { buildLandingPagePrompt };
