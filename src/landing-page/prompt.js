/**
 * Prompt de landing page — templates premium dark luxury por segmento.
 * Design inspirado em: fundo escuro, acento dourado, tipografia serif elegante,
 * divisores ornamentais, números em destaque, tags pill para serviços.
 */

const SEGMENTOS = {
  barbearia: {
    match: ['barbeiro', 'barbearia', 'barba', 'barber', 'cabelo masculino'],
    fonts: `<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet">`,
    css: `
      :root {
        --bg: #0a0a0a;
        --bg-card: #141414;
        --bg-card-hover: #1c1c1c;
        --gold: #c9a84c;
        --gold-light: #e8c97a;
        --gold-dim: rgba(201,168,76,0.15);
        --text: #f0ede8;
        --text-muted: rgba(240,237,232,0.55);
        --text-label: #c9a84c;
        --border: rgba(201,168,76,0.18);
        --border-subtle: rgba(255,255,255,0.06);
        --font-display: 'Cormorant Garamond', serif;
        --font-body: 'DM Sans', sans-serif;
      }
      *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
      html { scroll-behavior: smooth; }
      body { background: var(--bg); color: var(--text); font-family: var(--font-body); font-weight: 300; line-height: 1.6; }

      /* HEADER */
      .header { position: sticky; top: 0; z-index: 100; background: rgba(10,10,10,0.92); backdrop-filter: blur(12px); border-bottom: 1px solid var(--border); padding: 1rem 2.5rem; display: flex; justify-content: space-between; align-items: center; }
      .header-logo { font-family: var(--font-display); font-size: 1.5rem; color: var(--gold); font-weight: 600; letter-spacing: 0.02em; text-decoration: none; }
      .btn-wpp-header { display: flex; align-items: center; gap: 0.5rem; background: transparent; border: 1px solid var(--gold); color: var(--gold); padding: 0.55rem 1.4rem; border-radius: 2px; font-family: var(--font-body); font-size: 0.78rem; font-weight: 500; letter-spacing: 0.12em; text-transform: uppercase; text-decoration: none; transition: all 0.25s; cursor: pointer; }
      .btn-wpp-header:hover { background: var(--gold); color: #0a0a0a; }

      /* HERO */
      .hero { min-height: 92vh; display: flex; align-items: center; justify-content: center; padding: 6rem 2rem 4rem; text-align: center; position: relative; overflow: hidden; }
      .hero::before { content: ''; position: absolute; inset: 0; background: radial-gradient(ellipse 80% 60% at 50% 40%, rgba(201,168,76,0.05) 0%, transparent 70%); pointer-events: none; }
      .hero-eyebrow { font-family: var(--font-body); font-size: 0.72rem; font-weight: 500; letter-spacing: 0.25em; text-transform: uppercase; color: var(--gold); margin-bottom: 1.8rem; }
      .hero h1 { font-family: var(--font-display); font-size: clamp(3rem, 8vw, 6.5rem); font-weight: 600; line-height: 1.05; color: var(--text); margin-bottom: 1.5rem; }
      .hero h1 em { font-style: italic; color: var(--gold); }
      .hero-sub { font-size: clamp(0.95rem, 1.5vw, 1.1rem); color: var(--text-muted); max-width: 520px; margin: 0 auto 2.5rem; line-height: 1.8; }
      .hero-badges { display: flex; gap: 0.75rem; justify-content: center; flex-wrap: wrap; margin-bottom: 3rem; }
      .hero-badge { border: 1px solid var(--border); color: var(--text-muted); padding: 0.35rem 1rem; border-radius: 2px; font-size: 0.78rem; letter-spacing: 0.08em; }
      .btn-cta { display: inline-flex; align-items: center; gap: 0.6rem; background: var(--gold); color: #0a0a0a; padding: 1rem 2.5rem; font-family: var(--font-body); font-size: 0.82rem; font-weight: 500; letter-spacing: 0.15em; text-transform: uppercase; text-decoration: none; border-radius: 2px; transition: all 0.25s; }
      .btn-cta:hover { background: var(--gold-light); transform: translateY(-2px); box-shadow: 0 12px 32px rgba(201,168,76,0.25); }
      .btn-cta-outline { display: inline-flex; align-items: center; gap: 0.6rem; background: transparent; border: 1px solid var(--gold); color: var(--gold); padding: 1rem 2.5rem; font-family: var(--font-body); font-size: 0.82rem; font-weight: 500; letter-spacing: 0.15em; text-transform: uppercase; text-decoration: none; border-radius: 2px; transition: all 0.25s; }
      .btn-cta-outline:hover { background: var(--gold); color: #0a0a0a; }

      /* DIVISOR ORNAMENTAL */
      .divider { display: flex; align-items: center; gap: 1rem; padding: 0 2rem; max-width: 900px; margin: 0 auto; }
      .divider-line { flex: 1; height: 1px; background: linear-gradient(90deg, transparent, var(--gold), transparent); opacity: 0.35; }
      .divider-diamond { width: 8px; height: 8px; background: var(--gold); transform: rotate(45deg); flex-shrink: 0; }

      /* SEÇÕES */
      .section { padding: 6rem 2rem; }
      .section-inner { max-width: 1100px; margin: 0 auto; }
      .section-label { font-size: 0.72rem; font-weight: 500; letter-spacing: 0.25em; text-transform: uppercase; color: var(--gold); margin-bottom: 1rem; text-align: center; }
      .section-title { font-family: var(--font-display); font-size: clamp(2rem, 4vw, 3.2rem); font-weight: 600; text-align: center; margin-bottom: 0.8rem; line-height: 1.15; }
      .section-title em { font-style: italic; color: var(--gold); }
      .section-sub { text-align: center; color: var(--text-muted); max-width: 560px; margin: 0 auto 3.5rem; font-size: 1rem; line-height: 1.8; }

      /* STATS */
      .stats-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0; border: 1px solid var(--border); border-radius: 2px; overflow: hidden; max-width: 780px; margin: 0 auto; }
      .stat-item { padding: 2.5rem 2rem; text-align: center; border-right: 1px solid var(--border); }
      .stat-item:last-child { border-right: none; }
      .stat-icon { color: var(--gold); font-size: 1.4rem; margin-bottom: 0.8rem; opacity: 0.8; }
      .stat-number { font-family: var(--font-display); font-size: clamp(2.5rem, 5vw, 4rem); font-weight: 400; color: var(--text); line-height: 1; margin-bottom: 0.4rem; }
      .stat-label { font-size: 0.72rem; font-weight: 500; letter-spacing: 0.18em; text-transform: uppercase; color: var(--text-muted); }

      /* SERVIÇOS — TAGS PILL */
      .servicos-intro { font-family: var(--font-display); font-size: clamp(1.1rem, 2vw, 1.4rem); font-style: italic; color: var(--text-muted); text-align: center; max-width: 600px; margin: 0 auto 2.5rem; line-height: 1.8; }
      .servicos-tags { display: flex; flex-wrap: wrap; gap: 0.75rem; justify-content: center; max-width: 860px; margin: 0 auto; }
      .servico-tag { border: 1px solid var(--border); color: var(--text); padding: 0.6rem 1.4rem; border-radius: 2px; font-size: 0.88rem; letter-spacing: 0.04em; transition: all 0.2s; cursor: default; }
      .servico-tag:hover { border-color: var(--gold); color: var(--gold); background: var(--gold-dim); }

      /* DESTAQUES — CARDS NUMERADOS */
      .destaques-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; background: var(--border-subtle); border: 1px solid var(--border-subtle); border-radius: 2px; overflow: hidden; margin-top: 3rem; }
      .destaque-card { background: var(--bg-card); padding: 2.5rem 2rem; position: relative; transition: background 0.25s; }
      .destaque-card:hover { background: var(--bg-card-hover); }
      .destaque-num { font-family: var(--font-display); font-size: 5rem; font-weight: 600; color: rgba(201,168,76,0.07); position: absolute; top: 1rem; right: 1.5rem; line-height: 1; pointer-events: none; }
      .destaque-line { width: 32px; height: 2px; background: var(--gold); margin-bottom: 1.2rem; }
      .destaque-card h3 { font-family: var(--font-display); font-size: 1.2rem; font-weight: 600; color: var(--text); line-height: 1.4; }

      /* DEPOIMENTOS */
      .depoimentos-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; margin-top: 3rem; }
      .depoimento { background: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: 2px; padding: 2.2rem; position: relative; }
      .depoimento::before { content: '"'; font-family: var(--font-display); font-size: 6rem; color: var(--gold); opacity: 0.12; position: absolute; top: -0.5rem; left: 1.5rem; line-height: 1; }
      .depoimento-texto { font-family: var(--font-display); font-style: italic; color: var(--text-muted); line-height: 1.8; margin-bottom: 1.5rem; padding-top: 1rem; font-size: 1.05rem; }
      .depoimento-stars { color: var(--gold); font-size: 0.8rem; letter-spacing: 0.1em; margin-bottom: 0.5rem; }
      .depoimento-autor { font-weight: 500; color: var(--text); font-size: 0.9rem; }
      .depoimento-cidade { font-size: 0.78rem; color: var(--text-muted); letter-spacing: 0.06em; }

      /* CTA FINAL */
      .section-cta { padding: 7rem 2rem; text-align: center; border-top: 1px solid var(--border-subtle); }
      .cta-title { font-family: var(--font-display); font-size: clamp(2.2rem, 5vw, 4rem); font-weight: 600; margin-bottom: 1rem; line-height: 1.1; }
      .cta-title em { font-style: italic; color: var(--gold); }
      .cta-sub { color: var(--text-muted); max-width: 480px; margin: 0 auto 2.5rem; font-size: 1rem; line-height: 1.8; }
      .cta-buttons { display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; }

      /* FOOTER */
      .footer { padding: 3rem 2rem; border-top: 1px solid var(--border-subtle); text-align: center; }
      .footer-logo { font-family: var(--font-display); font-size: 1.4rem; color: var(--gold); margin-bottom: 0.8rem; font-weight: 600; }
      .footer p { color: var(--text-muted); font-size: 0.85rem; line-height: 1.9; }
      .footer a { color: var(--text-muted); text-decoration: none; }
      .footer-powered { font-size: 0.72rem; letter-spacing: 0.12em; text-transform: uppercase; color: rgba(201,168,76,0.35); margin-top: 1.5rem; }

      /* FLOAT WPP */
      .wpp-float { position: fixed; bottom: 2rem; right: 2rem; z-index: 999; background: #25d366; color: #fff; width: 58px; height: 58px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; text-decoration: none; box-shadow: 0 8px 24px rgba(37,211,102,0.35); transition: all 0.25s; }
      .wpp-float:hover { transform: translateY(-3px) scale(1.05); box-shadow: 0 12px 32px rgba(37,211,102,0.45); }

      /* ANIMAÇÕES */
      @keyframes fadeUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
      .fade-up { animation: fadeUp 0.7s ease forwards; }
      .delay-1 { animation-delay: 0.1s; opacity: 0; }
      .delay-2 { animation-delay: 0.22s; opacity: 0; }
      .delay-3 { animation-delay: 0.34s; opacity: 0; }
      .delay-4 { animation-delay: 0.46s; opacity: 0; }

      /* RESPONSIVE */
      @media (max-width: 768px) {
        .header { padding: 0.9rem 1.2rem; }
        .hero { min-height: 80vh; padding: 5rem 1.2rem 3rem; }
        .stats-grid { grid-template-columns: 1fr; }
        .stat-item { border-right: none; border-bottom: 1px solid var(--border); }
        .stat-item:last-child { border-bottom: none; }
        .destaques-grid { grid-template-columns: 1fr; }
        .section { padding: 4rem 1.2rem; }
        .section-cta { padding: 4rem 1.2rem; }
        .cta-buttons { flex-direction: column; align-items: center; }
      }
    `,
    stats: [
      { icon: '✂', num: '8+', label: 'Anos de experiência' },
      { icon: '👤', num: '200+', label: 'Clientes por mês' },
      { icon: '⭐', num: '4.9', label: 'Avaliação no Google' },
    ],
  },

  salao: {
    match: ['salão', 'salao', 'cabeleireiro', 'cabeleireira', 'beleza', 'estética', 'estetica', 'manicure', 'unhas', 'hair'],
    fonts: `<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Jost:wght@300;400;500&display=swap" rel="stylesheet">`,
    css: `
      :root {
        --bg: #0d0a10;
        --bg-card: #150f1a;
        --bg-card-hover: #1d1525;
        --gold: #d4a5c9;
        --gold-light: #e8c5e2;
        --gold-dim: rgba(212,165,201,0.12);
        --text: #f5f0f8;
        --text-muted: rgba(245,240,248,0.55);
        --text-label: #d4a5c9;
        --border: rgba(212,165,201,0.18);
        --border-subtle: rgba(255,255,255,0.06);
        --font-display: 'Cormorant Garamond', serif;
        --font-body: 'Jost', sans-serif;
      }
      *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
      html { scroll-behavior: smooth; }
      body { background: var(--bg); color: var(--text); font-family: var(--font-body); font-weight: 300; line-height: 1.6; }
      .header { position: sticky; top: 0; z-index: 100; background: rgba(13,10,16,0.92); backdrop-filter: blur(12px); border-bottom: 1px solid var(--border); padding: 1rem 2.5rem; display: flex; justify-content: space-between; align-items: center; }
      .header-logo { font-family: var(--font-display); font-size: 1.5rem; color: var(--gold); font-weight: 600; letter-spacing: 0.02em; text-decoration: none; }
      .btn-wpp-header { display: flex; align-items: center; gap: 0.5rem; background: transparent; border: 1px solid var(--gold); color: var(--gold); padding: 0.55rem 1.4rem; border-radius: 2px; font-family: var(--font-body); font-size: 0.78rem; font-weight: 500; letter-spacing: 0.12em; text-transform: uppercase; text-decoration: none; transition: all 0.25s; }
      .btn-wpp-header:hover { background: var(--gold); color: var(--bg); }
      .hero { min-height: 92vh; display: flex; align-items: center; justify-content: center; padding: 6rem 2rem 4rem; text-align: center; position: relative; overflow: hidden; }
      .hero::before { content: ''; position: absolute; inset: 0; background: radial-gradient(ellipse 80% 60% at 50% 40%, rgba(212,165,201,0.06) 0%, transparent 70%); pointer-events: none; }
      .hero-eyebrow { font-family: var(--font-body); font-size: 0.72rem; font-weight: 500; letter-spacing: 0.25em; text-transform: uppercase; color: var(--gold); margin-bottom: 1.8rem; }
      .hero h1 { font-family: var(--font-display); font-size: clamp(3rem, 8vw, 6.5rem); font-weight: 600; line-height: 1.05; color: var(--text); margin-bottom: 1.5rem; }
      .hero h1 em { font-style: italic; color: var(--gold); }
      .hero-sub { font-size: clamp(0.95rem, 1.5vw, 1.1rem); color: var(--text-muted); max-width: 520px; margin: 0 auto 2.5rem; line-height: 1.8; }
      .hero-badges { display: flex; gap: 0.75rem; justify-content: center; flex-wrap: wrap; margin-bottom: 3rem; }
      .hero-badge { border: 1px solid var(--border); color: var(--text-muted); padding: 0.35rem 1rem; border-radius: 2px; font-size: 0.78rem; letter-spacing: 0.08em; }
      .btn-cta { display: inline-flex; align-items: center; gap: 0.6rem; background: var(--gold); color: var(--bg); padding: 1rem 2.5rem; font-family: var(--font-body); font-size: 0.82rem; font-weight: 500; letter-spacing: 0.15em; text-transform: uppercase; text-decoration: none; border-radius: 2px; transition: all 0.25s; }
      .btn-cta:hover { background: var(--gold-light); transform: translateY(-2px); box-shadow: 0 12px 32px rgba(212,165,201,0.25); }
      .btn-cta-outline { display: inline-flex; align-items: center; gap: 0.6rem; background: transparent; border: 1px solid var(--gold); color: var(--gold); padding: 1rem 2.5rem; font-family: var(--font-body); font-size: 0.82rem; font-weight: 500; letter-spacing: 0.15em; text-transform: uppercase; text-decoration: none; border-radius: 2px; transition: all 0.25s; }
      .btn-cta-outline:hover { background: var(--gold); color: var(--bg); }
      .divider { display: flex; align-items: center; gap: 1rem; padding: 0 2rem; max-width: 900px; margin: 0 auto; }
      .divider-line { flex: 1; height: 1px; background: linear-gradient(90deg, transparent, var(--gold), transparent); opacity: 0.3; }
      .divider-diamond { width: 8px; height: 8px; background: var(--gold); transform: rotate(45deg); flex-shrink: 0; }
      .section { padding: 6rem 2rem; }
      .section-inner { max-width: 1100px; margin: 0 auto; }
      .section-label { font-size: 0.72rem; font-weight: 500; letter-spacing: 0.25em; text-transform: uppercase; color: var(--gold); margin-bottom: 1rem; text-align: center; }
      .section-title { font-family: var(--font-display); font-size: clamp(2rem, 4vw, 3.2rem); font-weight: 600; text-align: center; margin-bottom: 0.8rem; line-height: 1.15; }
      .section-title em { font-style: italic; color: var(--gold); }
      .section-sub { text-align: center; color: var(--text-muted); max-width: 560px; margin: 0 auto 3.5rem; font-size: 1rem; line-height: 1.8; }
      .stats-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0; border: 1px solid var(--border); border-radius: 2px; overflow: hidden; max-width: 780px; margin: 0 auto; }
      .stat-item { padding: 2.5rem 2rem; text-align: center; border-right: 1px solid var(--border); }
      .stat-item:last-child { border-right: none; }
      .stat-icon { color: var(--gold); font-size: 1.4rem; margin-bottom: 0.8rem; opacity: 0.8; }
      .stat-number { font-family: var(--font-display); font-size: clamp(2.5rem, 5vw, 4rem); font-weight: 400; color: var(--text); line-height: 1; margin-bottom: 0.4rem; }
      .stat-label { font-size: 0.72rem; font-weight: 500; letter-spacing: 0.18em; text-transform: uppercase; color: var(--text-muted); }
      .servicos-intro { font-family: var(--font-display); font-size: clamp(1.1rem, 2vw, 1.4rem); font-style: italic; color: var(--text-muted); text-align: center; max-width: 600px; margin: 0 auto 2.5rem; line-height: 1.8; }
      .servicos-tags { display: flex; flex-wrap: wrap; gap: 0.75rem; justify-content: center; max-width: 860px; margin: 0 auto; }
      .servico-tag { border: 1px solid var(--border); color: var(--text); padding: 0.6rem 1.4rem; border-radius: 2px; font-size: 0.88rem; letter-spacing: 0.04em; transition: all 0.2s; cursor: default; }
      .servico-tag:hover { border-color: var(--gold); color: var(--gold); background: var(--gold-dim); }
      .destaques-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; background: var(--border-subtle); border: 1px solid var(--border-subtle); border-radius: 2px; overflow: hidden; margin-top: 3rem; }
      .destaque-card { background: var(--bg-card); padding: 2.5rem 2rem; position: relative; transition: background 0.25s; }
      .destaque-card:hover { background: var(--bg-card-hover); }
      .destaque-num { font-family: var(--font-display); font-size: 5rem; font-weight: 600; color: rgba(212,165,201,0.07); position: absolute; top: 1rem; right: 1.5rem; line-height: 1; }
      .destaque-line { width: 32px; height: 2px; background: var(--gold); margin-bottom: 1.2rem; }
      .destaque-card h3 { font-family: var(--font-display); font-size: 1.2rem; font-weight: 600; color: var(--text); line-height: 1.4; }
      .depoimentos-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; margin-top: 3rem; }
      .depoimento { background: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: 2px; padding: 2.2rem; position: relative; }
      .depoimento::before { content: '"'; font-family: var(--font-display); font-size: 6rem; color: var(--gold); opacity: 0.1; position: absolute; top: -0.5rem; left: 1.5rem; line-height: 1; }
      .depoimento-texto { font-family: var(--font-display); font-style: italic; color: var(--text-muted); line-height: 1.8; margin-bottom: 1.5rem; padding-top: 1rem; font-size: 1.05rem; }
      .depoimento-stars { color: var(--gold); font-size: 0.8rem; letter-spacing: 0.1em; margin-bottom: 0.5rem; }
      .depoimento-autor { font-weight: 500; color: var(--text); font-size: 0.9rem; }
      .depoimento-cidade { font-size: 0.78rem; color: var(--text-muted); letter-spacing: 0.06em; }
      .section-cta { padding: 7rem 2rem; text-align: center; border-top: 1px solid var(--border-subtle); }
      .cta-title { font-family: var(--font-display); font-size: clamp(2.2rem, 5vw, 4rem); font-weight: 600; margin-bottom: 1rem; line-height: 1.1; }
      .cta-title em { font-style: italic; color: var(--gold); }
      .cta-sub { color: var(--text-muted); max-width: 480px; margin: 0 auto 2.5rem; font-size: 1rem; line-height: 1.8; }
      .cta-buttons { display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; }
      .footer { padding: 3rem 2rem; border-top: 1px solid var(--border-subtle); text-align: center; }
      .footer-logo { font-family: var(--font-display); font-size: 1.4rem; color: var(--gold); margin-bottom: 0.8rem; font-weight: 600; }
      .footer p { color: var(--text-muted); font-size: 0.85rem; line-height: 1.9; }
      .footer a { color: var(--text-muted); text-decoration: none; }
      .footer-powered { font-size: 0.72rem; letter-spacing: 0.12em; text-transform: uppercase; color: rgba(212,165,201,0.3); margin-top: 1.5rem; }
      .wpp-float { position: fixed; bottom: 2rem; right: 2rem; z-index: 999; background: #25d366; color: #fff; width: 58px; height: 58px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; text-decoration: none; box-shadow: 0 8px 24px rgba(37,211,102,0.35); transition: all 0.25s; }
      .wpp-float:hover { transform: translateY(-3px) scale(1.05); }
      @keyframes fadeUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
      .fade-up { animation: fadeUp 0.7s ease forwards; }
      .delay-1 { animation-delay: 0.1s; opacity: 0; }
      .delay-2 { animation-delay: 0.22s; opacity: 0; }
      .delay-3 { animation-delay: 0.34s; opacity: 0; }
      .delay-4 { animation-delay: 0.46s; opacity: 0; }
      @media (max-width: 768px) {
        .header { padding: 0.9rem 1.2rem; }
        .hero { min-height: 80vh; padding: 5rem 1.2rem 3rem; }
        .stats-grid { grid-template-columns: 1fr; }
        .stat-item { border-right: none; border-bottom: 1px solid var(--border); }
        .stat-item:last-child { border-bottom: none; }
        .destaques-grid { grid-template-columns: 1fr; }
        .section { padding: 4rem 1.2rem; }
        .section-cta { padding: 4rem 1.2rem; }
        .cta-buttons { flex-direction: column; align-items: center; }
      }
    `,
    stats: [
      { icon: '✨', num: '10+', label: 'Anos no mercado' },
      { icon: '💆', num: '300+', label: 'Clientes por mês' },
      { icon: '⭐', num: '4.9', label: 'Avaliação no Google' },
    ],
  },
};

// Segmentos genéricos com dark luxury simplificado
const DEFAULT_SEG = {
  fonts: `<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet">`,
  css: `
    :root { --bg:#0a0a0a; --bg-card:#141414; --bg-card-hover:#1c1c1c; --gold:#c9a84c; --gold-light:#e8c97a; --gold-dim:rgba(201,168,76,0.15); --text:#f0ede8; --text-muted:rgba(240,237,232,0.55); --border:rgba(201,168,76,0.18); --border-subtle:rgba(255,255,255,0.06); --font-display:'Cormorant Garamond',serif; --font-body:'DM Sans',sans-serif; }
    *,*::before,*::after{margin:0;padding:0;box-sizing:border-box;} html{scroll-behavior:smooth;} body{background:var(--bg);color:var(--text);font-family:var(--font-body);font-weight:300;line-height:1.6;}
    .header{position:sticky;top:0;z-index:100;background:rgba(10,10,10,0.92);backdrop-filter:blur(12px);border-bottom:1px solid var(--border);padding:1rem 2.5rem;display:flex;justify-content:space-between;align-items:center;}
    .header-logo{font-family:var(--font-display);font-size:1.5rem;color:var(--gold);font-weight:600;text-decoration:none;}
    .btn-wpp-header{display:flex;align-items:center;gap:0.5rem;background:transparent;border:1px solid var(--gold);color:var(--gold);padding:0.55rem 1.4rem;border-radius:2px;font-size:0.78rem;font-weight:500;letter-spacing:0.12em;text-transform:uppercase;text-decoration:none;transition:all 0.25s;}
    .btn-wpp-header:hover{background:var(--gold);color:#0a0a0a;}
    .hero{min-height:92vh;display:flex;align-items:center;justify-content:center;padding:6rem 2rem 4rem;text-align:center;position:relative;}
    .hero::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse 80% 60% at 50% 40%,rgba(201,168,76,0.05) 0%,transparent 70%);pointer-events:none;}
    .hero-eyebrow{font-size:0.72rem;font-weight:500;letter-spacing:0.25em;text-transform:uppercase;color:var(--gold);margin-bottom:1.8rem;}
    .hero h1{font-family:var(--font-display);font-size:clamp(3rem,8vw,6.5rem);font-weight:600;line-height:1.05;margin-bottom:1.5rem;}
    .hero h1 em{font-style:italic;color:var(--gold);}
    .hero-sub{font-size:clamp(0.95rem,1.5vw,1.1rem);color:var(--text-muted);max-width:520px;margin:0 auto 2.5rem;line-height:1.8;}
    .hero-badges{display:flex;gap:0.75rem;justify-content:center;flex-wrap:wrap;margin-bottom:3rem;}
    .hero-badge{border:1px solid var(--border);color:var(--text-muted);padding:0.35rem 1rem;border-radius:2px;font-size:0.78rem;letter-spacing:0.08em;}
    .btn-cta{display:inline-flex;align-items:center;gap:0.6rem;background:var(--gold);color:#0a0a0a;padding:1rem 2.5rem;font-size:0.82rem;font-weight:500;letter-spacing:0.15em;text-transform:uppercase;text-decoration:none;border-radius:2px;transition:all 0.25s;}
    .btn-cta:hover{background:var(--gold-light);transform:translateY(-2px);}
    .btn-cta-outline{display:inline-flex;align-items:center;gap:0.6rem;background:transparent;border:1px solid var(--gold);color:var(--gold);padding:1rem 2.5rem;font-size:0.82rem;font-weight:500;letter-spacing:0.15em;text-transform:uppercase;text-decoration:none;border-radius:2px;transition:all 0.25s;}
    .btn-cta-outline:hover{background:var(--gold);color:#0a0a0a;}
    .divider{display:flex;align-items:center;gap:1rem;padding:0 2rem;max-width:900px;margin:0 auto;}
    .divider-line{flex:1;height:1px;background:linear-gradient(90deg,transparent,var(--gold),transparent);opacity:0.35;}
    .divider-diamond{width:8px;height:8px;background:var(--gold);transform:rotate(45deg);flex-shrink:0;}
    .section{padding:6rem 2rem;} .section-inner{max-width:1100px;margin:0 auto;}
    .section-label{font-size:0.72rem;font-weight:500;letter-spacing:0.25em;text-transform:uppercase;color:var(--gold);margin-bottom:1rem;text-align:center;}
    .section-title{font-family:var(--font-display);font-size:clamp(2rem,4vw,3.2rem);font-weight:600;text-align:center;margin-bottom:0.8rem;line-height:1.15;}
    .section-title em{font-style:italic;color:var(--gold);}
    .section-sub{text-align:center;color:var(--text-muted);max-width:560px;margin:0 auto 3.5rem;font-size:1rem;line-height:1.8;}
    .stats-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:0;border:1px solid var(--border);border-radius:2px;overflow:hidden;max-width:780px;margin:0 auto;}
    .stat-item{padding:2.5rem 2rem;text-align:center;border-right:1px solid var(--border);}
    .stat-item:last-child{border-right:none;}
    .stat-icon{color:var(--gold);font-size:1.4rem;margin-bottom:0.8rem;opacity:0.8;}
    .stat-number{font-family:var(--font-display);font-size:clamp(2.5rem,5vw,4rem);font-weight:400;line-height:1;margin-bottom:0.4rem;}
    .stat-label{font-size:0.72rem;font-weight:500;letter-spacing:0.18em;text-transform:uppercase;color:var(--text-muted);}
    .servicos-intro{font-family:var(--font-display);font-size:clamp(1.1rem,2vw,1.4rem);font-style:italic;color:var(--text-muted);text-align:center;max-width:600px;margin:0 auto 2.5rem;line-height:1.8;}
    .servicos-tags{display:flex;flex-wrap:wrap;gap:0.75rem;justify-content:center;max-width:860px;margin:0 auto;}
    .servico-tag{border:1px solid var(--border);color:var(--text);padding:0.6rem 1.4rem;border-radius:2px;font-size:0.88rem;transition:all 0.2s;}
    .servico-tag:hover{border-color:var(--gold);color:var(--gold);background:var(--gold-dim);}
    .destaques-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:var(--border-subtle);border:1px solid var(--border-subtle);border-radius:2px;overflow:hidden;margin-top:3rem;}
    .destaque-card{background:var(--bg-card);padding:2.5rem 2rem;position:relative;transition:background 0.25s;}
    .destaque-card:hover{background:var(--bg-card-hover);}
    .destaque-num{font-family:var(--font-display);font-size:5rem;font-weight:600;color:rgba(201,168,76,0.07);position:absolute;top:1rem;right:1.5rem;line-height:1;}
    .destaque-line{width:32px;height:2px;background:var(--gold);margin-bottom:1.2rem;}
    .destaque-card h3{font-family:var(--font-display);font-size:1.2rem;font-weight:600;line-height:1.4;}
    .depoimentos-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:1.5rem;margin-top:3rem;}
    .depoimento{background:var(--bg-card);border:1px solid var(--border-subtle);border-radius:2px;padding:2.2rem;position:relative;}
    .depoimento::before{content:'"';font-family:var(--font-display);font-size:6rem;color:var(--gold);opacity:0.12;position:absolute;top:-0.5rem;left:1.5rem;line-height:1;}
    .depoimento-texto{font-family:var(--font-display);font-style:italic;color:var(--text-muted);line-height:1.8;margin-bottom:1.5rem;padding-top:1rem;font-size:1.05rem;}
    .depoimento-stars{color:var(--gold);font-size:0.8rem;margin-bottom:0.5rem;}
    .depoimento-autor{font-weight:500;font-size:0.9rem;}
    .depoimento-cidade{font-size:0.78rem;color:var(--text-muted);}
    .section-cta{padding:7rem 2rem;text-align:center;border-top:1px solid var(--border-subtle);}
    .cta-title{font-family:var(--font-display);font-size:clamp(2.2rem,5vw,4rem);font-weight:600;margin-bottom:1rem;line-height:1.1;}
    .cta-title em{font-style:italic;color:var(--gold);}
    .cta-sub{color:var(--text-muted);max-width:480px;margin:0 auto 2.5rem;font-size:1rem;line-height:1.8;}
    .cta-buttons{display:flex;gap:1rem;justify-content:center;flex-wrap:wrap;}
    .footer{padding:3rem 2rem;border-top:1px solid var(--border-subtle);text-align:center;}
    .footer-logo{font-family:var(--font-display);font-size:1.4rem;color:var(--gold);margin-bottom:0.8rem;font-weight:600;}
    .footer p{color:var(--text-muted);font-size:0.85rem;line-height:1.9;}
    .footer a{color:var(--text-muted);text-decoration:none;}
    .footer-powered{font-size:0.72rem;letter-spacing:0.12em;text-transform:uppercase;color:rgba(201,168,76,0.3);margin-top:1.5rem;}
    .wpp-float{position:fixed;bottom:2rem;right:2rem;z-index:999;background:#25d366;color:#fff;width:58px;height:58px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:1.5rem;text-decoration:none;box-shadow:0 8px 24px rgba(37,211,102,0.35);transition:all 0.25s;}
    .wpp-float:hover{transform:translateY(-3px) scale(1.05);}
    @keyframes fadeUp{from{opacity:0;transform:translateY(24px);}to{opacity:1;transform:translateY(0);}}
    .fade-up{animation:fadeUp 0.7s ease forwards;} .delay-1{animation-delay:0.1s;opacity:0;} .delay-2{animation-delay:0.22s;opacity:0;} .delay-3{animation-delay:0.34s;opacity:0;} .delay-4{animation-delay:0.46s;opacity:0;}
    @media(max-width:768px){.header{padding:0.9rem 1.2rem;}.hero{min-height:80vh;padding:5rem 1.2rem 3rem;}.stats-grid{grid-template-columns:1fr;}.stat-item{border-right:none;border-bottom:1px solid var(--border);}.stat-item:last-child{border-bottom:none;}.destaques-grid{grid-template-columns:1fr;}.section{padding:4rem 1.2rem;}.section-cta{padding:4rem 1.2rem;}.cta-buttons{flex-direction:column;align-items:center;}}
  `,
  stats: [
    { icon: '🏆', num: '5+', label: 'Anos de experiência' },
    { icon: '👥', num: '150+', label: 'Clientes por mês' },
    { icon: '⭐', num: '4.8', label: 'Avaliação no Google' },
  ],
};

function detectarSegmento(categoria) {
  if (!categoria) return { seg: DEFAULT_SEG, key: 'default' };
  const lower = categoria.toLowerCase();
  for (const [key, seg] of Object.entries(SEGMENTOS)) {
    if (seg.match && seg.match.some(kw => lower.includes(kw))) return { seg, key };
  }
  return { seg: DEFAULT_SEG, key: 'default' };
}

function buildLandingPagePrompt({ nome, categoria, cidade, phone, endereco }) {
  const { seg } = detectarSegmento(categoria);
  const phoneClean = phone.replace(/\D/g, '');
  const whatsappUrl = `https://wa.me/55${phoneClean}?text=Olá%2C%20vim%20pelo%20site%20e%20gostaria%20de%20mais%20informações`;

  const statsHtml = seg.stats.map(s => `
    <div class="stat-item">
      <div class="stat-icon">${s.icon}</div>
      <div class="stat-number">${s.num}</div>
      <div class="stat-label">${s.label}</div>
    </div>`).join('');

  return `Você é um desenvolvedor frontend especialista em design premium. Sua tarefa é gerar o HTML completo de uma landing page dark luxury para o negócio abaixo.

## DADOS DO NEGÓCIO
- Nome: ${nome}
- Segmento: ${categoria}
- Cidade: ${cidade}
- WhatsApp: ${phone}
- Endereço/Info: ${endereco || 'não informado'}
- URL WhatsApp: ${whatsappUrl}

## INSTRUÇÕES
1. O <style> já está pronto — copie EXATAMENTE, sem alterar nenhuma propriedade CSS
2. Crie apenas o <body> com conteúdo rico e específico para ${categoria} em ${cidade}
3. Use linguagem elegante, persuasiva e local — mencione ${cidade} naturalmente
4. Os depoimentos devem ter nomes e contextos plausíveis para a região
5. Retorne APENAS HTML puro começando com <!DOCTYPE html>

## HTML PARA GERAR

<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="${nome} — ${categoria} em ${cidade}. Atendimento de qualidade, agende agora.">
  <title>${nome} | ${categoria} em ${cidade}</title>
  ${seg.fonts}
  <style>${seg.css}</style>
</head>
<body>

<!-- HEADER: div.header com a.header-logo (nome do negócio) e a.btn-wpp-header href="${whatsappUrl}" com texto "AGENDAR AGORA" -->

<!-- HERO: section.hero com div contendo:
  - p.hero-eyebrow com "${categoria} · ${cidade}"
  - h1 com headline impactante em 2 linhas — use <em> na palavra mais importante, específica para ${categoria}
  - p.hero-sub com proposta de valor em 2 frases (mencione ${cidade})
  - div.hero-badges com 3 spans.hero-badge (ex: "Desde 2015", "Sem fila de espera", "Atendimento VIP")
  - a.btn-cta href="${whatsappUrl}" com texto "AGENDAR PELO WHATSAPP →"
-->

<!-- DIVISOR: div.divider com div.divider-line + div.divider-diamond + div.divider-line -->

<!-- STATS: section.section com div.section-inner contendo div.stats-grid:
${statsHtml}
  (use exatamente esses stats — não altere os números)
-->

<!-- DIVISOR novamente -->

<!-- SERVIÇOS: section.section com div.section-inner contendo:
  - p.section-label com "NOSSOS SERVIÇOS"
  - h2.section-title com texto usando <em> na palavra-chave
  - p.servicos-intro com frase elegante em itálico sobre os serviços
  - div.servicos-tags com 8-10 spans.servico-tag (serviços específicos de ${categoria} — nomes reais do setor)
-->

<!-- DIVISOR -->

<!-- DESTAQUES: section.section com div.section-inner contendo:
  - p.section-label "POR QUE NOS ESCOLHER"
  - h2.section-title com <em>
  - div.destaques-grid com 6 divs.destaque-card, cada um com:
    - span.destaque-num (01 a 06)
    - div.destaque-line
    - h3 com diferencial específico e convincente (ex: "Ambiente climatizado e música ambiente", "Produtos importados de alta qualidade")
-->

<!-- DIVISOR -->

<!-- DEPOIMENTOS: section.section com div.section-inner contendo:
  - p.section-label "DEPOIMENTOS"
  - h2.section-title
  - div.depoimentos-grid com 3 divs.depoimento, cada um com:
    - div.depoimento-stars "★★★★★"
    - p.depoimento-texto (depoimento específico e realista, menciona o serviço e o resultado — não genérico)
    - p.depoimento-autor (nome plausível para ${cidade})
    - span.depoimento-cidade (${cidade})
-->

<!-- DIVISOR -->

<!-- CTA FINAL: section.section-cta com:
  - p.section-label "PRONTO PARA DAR O PRÓXIMO PASSO?"
  - h2.cta-title com texto de urgência suave usando <em>
  - p.cta-sub com frase de fechamento
  - div.cta-buttons com:
    - a.btn-cta href="${whatsappUrl}" "AGENDAR PELO WHATSAPP →"
    - a.btn-cta-outline href="${whatsappUrl}" "FALAR COM A GENTE"
-->

<!-- FOOTER: footer.footer com:
  - p.footer-logo (nome do negócio)
  - p com endereço e telefone
  - p com horários de funcionamento (inferir para ${categoria})
  - p.footer-powered "Powered by VitrineIA"
-->

<!-- FLOAT: a.wpp-float href="${whatsappUrl}" target="_blank" com ícone SVG do WhatsApp -->

</body>
</html>

Retorne APENAS o HTML completo. Sem explicações. HTML puro.`;
}

module.exports = { buildLandingPagePrompt };
