/**
 * Prompt com CSS base pré-escrito — modelo apenas preenche conteúdo.
 */

const SEGMENTOS = {
  corretor: {
    match: ['corretor', 'imóvel', 'imovel', 'imobiliária', 'imobiliaria', 'permuta', 'apartamento', 'casa'],
    fonts: '<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=Jost:wght@300;400;500;600&display=swap" rel="stylesheet">',
    css_root: `--cor-primaria: #0f2540; --cor-secundaria: #c9a84c; --cor-acento: #f5f0e8; --cor-texto: #1a1a2e; --fonte-display: 'Cormorant Garamond', serif; --fonte-body: 'Jost', sans-serif;`,
    hero_style: `background: #0f2540; background: linear-gradient(135deg, #0f2540 0%, #1a3c5e 60%, #0f2540 100%);`,
    dark_style: `background: #0f2540;`,
  },
  barbeiro: {
    match: ['barbeiro', 'barbearia', 'barba', 'cabelo masculino'],
    fonts: '<link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet">',
    css_root: `--cor-primaria: #1a1a1a; --cor-secundaria: #d4af37; --cor-acento: #f9f4e8; --cor-texto: #111111; --fonte-display: 'Bebas Neue', cursive; --fonte-body: 'DM Sans', sans-serif;`,
    hero_style: `background: #1a1a1a; background: linear-gradient(160deg, #1a1a1a 0%, #2d2d2d 100%);`,
    dark_style: `background: #1a1a1a;`,
  },
  salao: {
    match: ['salão', 'salao', 'cabeleireiro', 'cabeleireira', 'beleza', 'estética', 'estetica', 'manicure', 'unhas'],
    fonts: '<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Nunito:wght@300;400;600&display=swap" rel="stylesheet">',
    css_root: `--cor-primaria: #2d1b3d; --cor-secundaria: #e8a4c8; --cor-acento: #fdf6f9; --cor-texto: #1a0a2e; --fonte-display: 'Playfair Display', serif; --fonte-body: 'Nunito', sans-serif;`,
    hero_style: `background: #2d1b3d; background: linear-gradient(135deg, #2d1b3d 0%, #6b3fa0 100%);`,
    dark_style: `background: #2d1b3d;`,
  },
  clinica: {
    match: ['clínica', 'clinica', 'médico', 'medico', 'dentista', 'odonto', 'psicólogo', 'psicologo', 'fisio', 'saúde', 'saude', 'nutricionista'],
    fonts: '<link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;700&display=swap" rel="stylesheet">',
    css_root: `--cor-primaria: #003d6b; --cor-secundaria: #00b4d8; --cor-acento: #f0f8ff; --cor-texto: #0a2540; --fonte-display: 'Outfit', sans-serif; --fonte-body: 'Outfit', sans-serif;`,
    hero_style: `background: #003d6b; background: linear-gradient(135deg, #003d6b 0%, #0077b6 100%);`,
    dark_style: `background: #003d6b;`,
  },
  restaurante: {
    match: ['restaurante', 'lanchonete', 'pizzaria', 'hamburgueria', 'comida', 'culinária', 'culinaria', 'café', 'cafe', 'padaria', 'confeitaria'],
    fonts: '<link href="https://fonts.googleapis.com/css2?family=Fraunces:wght@400;700&family=Karla:wght@400;500&display=swap" rel="stylesheet">',
    css_root: `--cor-primaria: #7b2d00; --cor-secundaria: #e85d04; --cor-acento: #fff8f0; --cor-texto: #3d1400; --fonte-display: 'Fraunces', serif; --fonte-body: 'Karla', sans-serif;`,
    hero_style: `background: #7b2d00; background: linear-gradient(135deg, #7b2d00 0%, #c44d00 100%);`,
    dark_style: `background: #7b2d00;`,
  },
  academia: {
    match: ['academia', 'personal', 'crossfit', 'pilates', 'musculação', 'musculacao', 'fitness', 'treino'],
    fonts: '<link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700;800&family=Barlow:wght@400;500&display=swap" rel="stylesheet">',
    css_root: `--cor-primaria: #0d0d0d; --cor-secundaria: #ff3d00; --cor-acento: #fff5f3; --cor-texto: #0d0d0d; --fonte-display: 'Barlow Condensed', sans-serif; --fonte-body: 'Barlow', sans-serif;`,
    hero_style: `background: #0d0d0d; background: linear-gradient(160deg, #0d0d0d 0%, #1a0800 100%);`,
    dark_style: `background: #0d0d0d;`,
  },
  default: {
    fonts: '<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;600;700&display=swap" rel="stylesheet">',
    css_root: `--cor-primaria: #1a2e4a; --cor-secundaria: #e67e22; --cor-acento: #fafafa; --cor-texto: #1a1a1a; --fonte-display: 'Plus Jakarta Sans', sans-serif; --fonte-body: 'Plus Jakarta Sans', sans-serif;`,
    hero_style: `background: #1a2e4a; background: linear-gradient(135deg, #1a2e4a 0%, #2e4a6e 100%);`,
    dark_style: `background: #1a2e4a;`,
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

  // CSS base completo — modelo NÃO deve alterar nenhum valor de cor ou fonte
  const cssBase = `
    <style>
      :root { ${seg.css_root} }
      * { margin: 0; padding: 0; box-sizing: border-box; }
      html { scroll-behavior: smooth; }
      body { font-family: var(--fonte-body); color: var(--cor-texto); }

      /* HEADER */
      .header { position: sticky; top: 0; z-index: 100; background: var(--cor-primaria); padding: 1rem 2rem; display: flex; justify-content: space-between; align-items: center; }
      .header-logo { font-family: var(--fonte-display); font-size: 1.4rem; color: var(--cor-secundaria); text-decoration: none; font-weight: 700; }
      .btn-whatsapp-header { background: #25d366; color: #fff; border: none; padding: 0.6rem 1.4rem; border-radius: 50px; font-size: 0.95rem; font-weight: 600; cursor: pointer; text-decoration: none; display: flex; align-items: center; gap: 0.4rem; transition: all 0.2s; }
      .btn-whatsapp-header:hover { filter: brightness(1.1); transform: translateY(-2px); }

      /* HERO */
      .hero { ${seg.hero_style} min-height: 88vh; display: flex; align-items: center; justify-content: center; text-align: center; padding: 4rem 2rem; }
      .hero-inner { max-width: 860px; }
      .hero h1 { font-family: var(--fonte-display); font-size: clamp(2.4rem, 6vw, 4.8rem); color: #ffffff; line-height: 1.1; margin-bottom: 1.2rem; font-weight: 700; }
      .hero p { font-size: clamp(1rem, 2vw, 1.25rem); color: rgba(255,255,255,0.85); margin-bottom: 0.8rem; line-height: 1.6; }
      .hero-badges { display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; margin-bottom: 2rem; }
      .hero-badge { background: rgba(255,255,255,0.12); border: 1px solid rgba(255,255,255,0.2); color: #fff; padding: 0.4rem 1rem; border-radius: 50px; font-size: 0.85rem; }
      .btn-cta-primary { display: inline-flex; align-items: center; gap: 0.5rem; background: #25d366; color: #fff; padding: 1rem 2.4rem; border-radius: 50px; font-size: 1.1rem; font-weight: 700; text-decoration: none; transition: all 0.25s; box-shadow: 0 8px 24px rgba(37,211,102,0.35); }
      .btn-cta-primary:hover { filter: brightness(1.1); transform: translateY(-3px); box-shadow: 0 12px 32px rgba(37,211,102,0.45); }

      /* SEÇÕES CLARAS */
      .section-light { background: var(--cor-acento); padding: 5rem 2rem; }
      .section-white { background: #ffffff; padding: 5rem 2rem; }
      .section-title { font-family: var(--fonte-display); font-size: clamp(1.8rem, 4vw, 2.8rem); color: var(--cor-primaria); text-align: center; margin-bottom: 0.5rem; font-weight: 700; }
      .section-subtitle { text-align: center; color: #666; margin-bottom: 3rem; font-size: 1.05rem; }
      .section-title-accent { display: block; width: 60px; height: 4px; background: var(--cor-secundaria); margin: 0.6rem auto 2.5rem; border-radius: 2px; }

      /* CARDS BENEFÍCIOS */
      .cards-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1.5rem; max-width: 1100px; margin: 0 auto; }
      .card { background: #fff; border-radius: 16px; padding: 2rem; box-shadow: 0 4px 24px rgba(0,0,0,0.08); transition: all 0.3s; text-align: center; }
      .card:hover { transform: translateY(-6px); box-shadow: 0 12px 36px rgba(0,0,0,0.13); }
      .card-icon { font-size: 2.6rem; color: var(--cor-secundaria); margin-bottom: 1rem; }
      .card h3 { font-family: var(--fonte-display); font-size: 1.25rem; color: var(--cor-primaria); margin-bottom: 0.6rem; font-weight: 700; }
      .card p { color: #666; line-height: 1.6; font-size: 0.95rem; }

      /* SEÇÃO ESCURA — DIFERENCIAIS */
      .section-dark { ${seg.dark_style} padding: 5rem 2rem; }
      .section-dark .section-title { color: #ffffff; }
      .section-dark .section-subtitle { color: rgba(255,255,255,0.7); }
      .diferenciais-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1.5rem; max-width: 1100px; margin: 0 auto; }
      .diferencial-item { border-left: 4px solid var(--cor-secundaria); padding: 1.2rem 1.5rem; background: rgba(255,255,255,0.07); border-radius: 0 12px 12px 0; }
      .diferencial-item i { color: var(--cor-secundaria); font-size: 1.4rem; margin-bottom: 0.6rem; display: block; }
      .diferencial-item h4 { color: #ffffff; font-family: var(--fonte-display); font-size: 1.05rem; margin-bottom: 0.4rem; font-weight: 600; }
      .diferencial-item p { color: rgba(255,255,255,0.75); font-size: 0.9rem; line-height: 1.5; }

      /* DEPOIMENTOS */
      .depoimento-card { background: #fff; border-radius: 16px; padding: 2rem; box-shadow: 0 4px 20px rgba(0,0,0,0.07); position: relative; }
      .depoimento-card::before { content: '"'; font-size: 5rem; color: var(--cor-secundaria); opacity: 0.2; position: absolute; top: -0.5rem; left: 1rem; font-family: serif; line-height: 1; }
      .depoimento-texto { color: #555; line-height: 1.7; margin-bottom: 1rem; font-style: italic; padding-top: 1.5rem; }
      .depoimento-autor { font-weight: 700; color: var(--cor-primaria); font-family: var(--fonte-display); }
      .depoimento-cidade { font-size: 0.85rem; color: #999; }
      .estrelas { color: #f4b400; margin-bottom: 0.5rem; }

      /* CTA FINAL */
      .section-cta { ${seg.hero_style} padding: 5rem 2rem; text-align: center; }
      .section-cta h2 { font-family: var(--fonte-display); font-size: clamp(1.8rem, 4vw, 3rem); color: #ffffff; margin-bottom: 1rem; font-weight: 700; }
      .section-cta p { color: rgba(255,255,255,0.85); margin-bottom: 2rem; font-size: 1.1rem; }

      /* FOOTER */
      .footer { ${seg.dark_style} padding: 3rem 2rem; text-align: center; }
      .footer-logo { font-family: var(--fonte-display); font-size: 1.6rem; color: var(--cor-secundaria); margin-bottom: 0.8rem; font-weight: 700; }
      .footer p { color: rgba(255,255,255,0.6); font-size: 0.9rem; line-height: 1.8; }
      .footer a { color: rgba(255,255,255,0.6); text-decoration: none; }

      /* ANIMAÇÕES */
      @keyframes fadeInUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
      .fade-in { animation: fadeInUp 0.6s ease forwards; }
      .delay-1 { animation-delay: 0.1s; opacity: 0; }
      .delay-2 { animation-delay: 0.2s; opacity: 0; }
      .delay-3 { animation-delay: 0.3s; opacity: 0; }

      /* RESPONSIVE */
      @media (max-width: 768px) {
        .header { padding: 0.8rem 1rem; }
        .hero { min-height: 70vh; padding: 3rem 1rem; }
        .cards-grid, .diferenciais-grid { grid-template-columns: 1fr; }
        .section-light, .section-white, .section-dark, .section-cta { padding: 3rem 1rem; }
      }
    </style>`;

  return `Você é um desenvolvedor frontend. Sua ÚNICA tarefa é gerar o HTML de uma landing page preenchendo o conteúdo (textos, ícones, copy) na estrutura abaixo. NÃO altere nenhuma propriedade CSS. NÃO adicione novas regras de cor ou fonte. Apenas preencha os textos.

## DADOS DO NEGÓCIO
- Nome: ${nome}
- Segmento: ${categoria}
- Cidade: ${cidade}
- WhatsApp: ${phone}
- Diferenciais: ${endereco || 'não informado'}
- URL WhatsApp: ${whatsappUrl}

## HTML COMPLETO PARA GERAR

Gere um HTML completo com esta estrutura exata. O <style> já está pronto — copie-o sem alterar nada. Apenas crie o <body> com o conteúdo adequado ao negócio.

<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="${nome} — ${categoria} em ${cidade}">
  <title>${nome} | ${categoria} em ${cidade}</title>
  ${seg.fonts}
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
  ${cssBase}
</head>
<body>

  <!-- HEADER: use classe "header". Logo com classe "header-logo". Botão com classe "btn-whatsapp-header" e href="${whatsappUrl}" -->

  <!-- HERO: use classe "hero". Dentro: div.hero-inner com h1 (headline focada em resultado para o cliente em ${cidade}), p (subheadline), div.hero-badges (3 badges com diferenciais de "${endereco}"), botão .btn-cta-primary com href="${whatsappUrl}" -->

  <!-- BENEFÍCIOS: section.section-light com h2.section-title, span.section-title-accent, p.section-subtitle, div.cards-grid com 3 .card (cada um com div.card-icon > i.fa-..., h3, p). Conteúdo específico para ${categoria} -->

  <!-- DIFERENCIAIS: section.section-dark com h2.section-title, span.section-title-accent, div.diferenciais-grid com 4 .diferencial-item. Extrair de: "${endereco || categoria}" -->

  <!-- DEPOIMENTOS: section.section-light com h2.section-title, span.section-title-accent, div.cards-grid com 3 .depoimento-card (div.estrelas com ★★★★★, p.depoimento-texto, p.depoimento-autor, span.depoimento-cidade). Nomes e cidade plausíveis para ${cidade} -->

  <!-- CTA FINAL: section.section-cta com h2 (urgência + ${cidade}), p, botão .btn-cta-primary com href="${whatsappUrl}" -->

  <!-- FOOTER: footer.footer com p.footer-logo (nome do negócio), p com cidade/contato/CRECI se mencionado, p com copyright -->

</body>
</html>

Retorne APENAS o HTML completo. Sem explicações. Sem markdown. HTML puro começando com <!DOCTYPE html>.`;
}

module.exports = { buildLandingPagePrompt };
