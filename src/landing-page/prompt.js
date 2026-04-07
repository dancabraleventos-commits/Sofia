/**
 * Landing page prompt — DNA visual do Fade Culture adaptado para Brasil.
 * Ticker animado, hero com foto de fundo, título gigante, grid de serviços com preços,
 * depoimentos estilo review, grain texture, cursor customizado.
 */

const FOTOS_HERO = {
  barbearia: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=1600&q=80',
  salao: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1600&q=80',
  clinica: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1600&q=80',
  restaurante: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1600&q=80',
  academia: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1600&q=80',
  default: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=80',
};

const SEGMENTOS = {
  barbearia: {
    match: ['barbeiro', 'barbearia', 'barber', 'barba', 'cabelo masculino'],
    foto: FOTOS_HERO.barbearia,
    acento: '#C8202F',
    acento_nome: 'vermelho',
    titulo_1: 'SEU MELHOR',
    titulo_2: 'CORTE',
    titulo_3: 'TE ESPERA',
    servicos: [
      { icon: '✂️', nome: 'CORTE CLÁSSICO', desc: 'Tesoura ou máquina, acabamento perfeito para todos os tipos de cabelo.', tempo: '45 min' },
      { icon: '⚡', nome: 'DEGRADÊ', desc: 'Do zero ao comprimento desejado — transição impecável, nosso serviço mais pedido.', tempo: '50 min' },
      { icon: '🪒', nome: 'BARBA COMPLETA', desc: 'Toalha quente, navalha e finalização premium. A experiência de verdade.', tempo: '40 min' },
      { icon: '👑', nome: 'CORTE + BARBA', desc: 'O combo completo para sair 100% — o favorito dos nossos clientes fiéis.', tempo: '80 min' },
    ],
    ticker_items: ['Seg–Sáb · 8h às 20h', 'Agendamento pelo WhatsApp', 'Sem fila de espera', 'Profissionais experientes', '★ 4.9 no Google'],
    steps: [
      { num: '01', titulo: 'MANDA MENSAGEM', desc: 'Fala com a gente pelo WhatsApp — atendimento imediato durante o horário comercial.', tempo: '2 minutos' },
      { num: '02', titulo: 'ESCOLHE O HORÁRIO', desc: 'Escolhe o dia e horário que melhor encaixa na sua rotina.', tempo: '1 minuto' },
      { num: '03', titulo: 'APARECE E CAI NO ESTILO', desc: 'Chega no horário marcado e sai com o visual que você merece.', tempo: 'Sem espera' },
    ],
  },
  salao: {
    match: ['salão', 'salao', 'cabeleireiro', 'cabeleireira', 'beleza', 'estética', 'estetica', 'manicure', 'unhas', 'hair'],
    foto: FOTOS_HERO.salao,
    acento: '#9B59B6',
    acento_nome: 'roxo',
    titulo_1: 'BELEZA QUE',
    titulo_2: 'TRANSFORMA',
    titulo_3: 'VOCÊ',
    servicos: [
      { icon: '💇', nome: 'CORTE FEMININO', desc: 'Corte personalizado para realçar o seu estilo e formato de rosto.', tempo: '60 min' },
      { icon: '✨', nome: 'COLORAÇÃO', desc: 'Luzes, mechas, balayage e coloração total com produtos premium.', tempo: '120 min' },
      { icon: '💅', nome: 'MANICURE & PEDICURE', desc: 'Cutículas, esmaltação e acabamento impecável para suas mãos e pés.', tempo: '60 min' },
      { icon: '🌟', nome: 'ESCOVA & PROGRESSIVA', desc: 'Liso, ondulado ou com volume — deixa do jeito que você sempre quis.', tempo: '90 min' },
    ],
    ticker_items: ['Ter–Sáb · 9h às 19h', 'Agendamento pelo WhatsApp', 'Produtos premium', 'Profissionais especializadas', '★ 4.9 no Google'],
    steps: [
      { num: '01', titulo: 'MANDA MENSAGEM', desc: 'Entre em contato pelo WhatsApp — respondemos rapidinho.', tempo: '2 minutos' },
      { num: '02', titulo: 'ESCOLHE O SERVIÇO', desc: 'Te orientamos sobre o melhor serviço para o que você precisa.', tempo: '5 minutos' },
      { num: '03', titulo: 'APARECE E SE TRANSFORMA', desc: 'Chega no horário e sai renovada, do jeito que você merece.', tempo: 'Sem espera' },
    ],
  },
  clinica: {
    match: ['clínica', 'clinica', 'médico', 'medico', 'dentista', 'odonto', 'psicólogo', 'psicologo', 'fisio', 'saúde', 'saude', 'nutricionista'],
    foto: FOTOS_HERO.clinica,
    acento: '#0077B6',
    acento_nome: 'azul',
    titulo_1: 'SUA SAÚDE',
    titulo_2: 'EM BOAS',
    titulo_3: 'MÃOS',
    servicos: [
      { icon: '🩺', nome: 'CONSULTA', desc: 'Atendimento humanizado e personalizado para cuidar da sua saúde.', tempo: '40 min' },
      { icon: '📋', nome: 'AVALIAÇÃO', desc: 'Avaliação completa para identificar o melhor plano de tratamento.', tempo: '60 min' },
      { icon: '💊', nome: 'ACOMPANHAMENTO', desc: 'Monitoramento contínuo e suporte em todas as etapas do tratamento.', tempo: 'Recorrente' },
      { icon: '🔬', nome: 'EXAMES', desc: 'Solicitação e interpretação de exames com laudos rápidos.', tempo: '30 min' },
    ],
    ticker_items: ['Seg–Sex · 8h às 18h', 'Agendamento pelo WhatsApp', 'Atendimento humanizado', 'Profissionais especializados', '★ 4.9 no Google'],
    steps: [
      { num: '01', titulo: 'ENTRE EM CONTATO', desc: 'Manda mensagem pelo WhatsApp — confirmamos a disponibilidade na hora.', tempo: '2 minutos' },
      { num: '02', titulo: 'ESCOLHE O HORÁRIO', desc: 'Agendamento rápido e confirmado sem burocracia.', tempo: '1 minuto' },
      { num: '03', titulo: 'SUA CONSULTA', desc: 'Atendimento pontual e dedicado para você.', tempo: 'Sem espera' },
    ],
  },
  restaurante: {
    match: ['restaurante', 'lanchonete', 'pizzaria', 'hamburgueria', 'comida', 'café', 'cafe', 'padaria', 'confeitaria'],
    foto: FOTOS_HERO.restaurante,
    acento: '#E85D04',
    acento_nome: 'laranja',
    titulo_1: 'SABOR QUE',
    titulo_2: 'VOCÊ NÃO',
    titulo_3: 'ESQUECE',
    servicos: [
      { icon: '🍽️', nome: 'ALMOÇO', desc: 'Pratos do dia fresquinhos, preparados com ingredientes selecionados.', tempo: '11h–15h' },
      { icon: '🌙', nome: 'JANTAR', desc: 'Ambiente aconchegante para um jantar especial em boa companhia.', tempo: '18h–22h' },
      { icon: '🛵', nome: 'DELIVERY', desc: 'Peça pelo WhatsApp e receba em casa com o mesmo capricho do salão.', tempo: '40–60 min' },
      { icon: '🎉', nome: 'EVENTOS', desc: 'Espaço para confraternizações, aniversários e eventos corporativos.', tempo: 'Sob consulta' },
    ],
    ticker_items: ['Ter–Dom · 11h às 22h', 'Peça pelo WhatsApp', 'Entrega na região', 'Ingredientes frescos', '★ 4.9 no Google'],
    steps: [
      { num: '01', titulo: 'VEJA O CARDÁPIO', desc: 'Confira nossas opções pelo WhatsApp ou acesse nossa página.', tempo: '2 minutos' },
      { num: '02', titulo: 'FAÇA SEU PEDIDO', desc: 'Manda a lista pelo WhatsApp — confirmamos em instantes.', tempo: '1 minuto' },
      { num: '03', titulo: 'APROVEITE', desc: 'Retire no local ou receba em casa com o mesmo carinho.', tempo: 'Rapidinho' },
    ],
  },
  academia: {
    match: ['academia', 'personal', 'crossfit', 'pilates', 'musculação', 'musculacao', 'fitness', 'treino'],
    foto: FOTOS_HERO.academia,
    acento: '#27AE60',
    acento_nome: 'verde',
    titulo_1: 'SEU CORPO',
    titulo_2: 'SEU MELHOR',
    titulo_3: 'RESULTADO',
    servicos: [
      { icon: '💪', nome: 'MUSCULAÇÃO', desc: 'Equipamentos modernos e fichas personalizadas para cada objetivo.', tempo: '60 min' },
      { icon: '🏃', nome: 'CARDIO', desc: 'Esteiras, bikes e elípticos com programas de treino guiados.', tempo: '45 min' },
      { icon: '🧘', nome: 'AULAS COLETIVAS', desc: 'Jump, Zumba, Funcional e mais — turmas com horários flexíveis.', tempo: '50 min' },
      { icon: '👨‍💼', nome: 'PERSONAL TRAINER', desc: 'Acompanhamento individual para resultados mais rápidos e seguros.', tempo: '60 min' },
    ],
    ticker_items: ['Seg–Sex · 6h às 22h · Sáb 8h–14h', 'Aula experimental grátis', 'Equipamentos modernos', 'Professores certificados', '★ 4.9 no Google'],
    steps: [
      { num: '01', titulo: 'FALE COM A GENTE', desc: 'Manda mensagem e agende sua aula experimental grátis.', tempo: '2 minutos' },
      { num: '02', titulo: 'CONHEÇA A ESTRUTURA', desc: 'Venha ver os equipamentos e conhecer a equipe sem compromisso.', tempo: '30 minutos' },
      { num: '03', titulo: 'COMECE SUA TRANSFORMAÇÃO', desc: 'Escolha o plano ideal e comece hoje mesmo.', tempo: 'Sem espera' },
    ],
  },
};

const DEFAULT_SEG = {
  foto: FOTOS_HERO.default,
  acento: '#C8202F',
  titulo_1: 'QUALIDADE',
  titulo_2: 'QUE VOCÊ',
  titulo_3: 'MERECE',
  servicos: [
    { icon: '⭐', nome: 'ATENDIMENTO', desc: 'Atendimento personalizado e dedicado para cada cliente.', tempo: 'Sob consulta' },
    { icon: '🏆', nome: 'QUALIDADE', desc: 'Produtos e serviços selecionados com alto padrão de qualidade.', tempo: 'Sob consulta' },
    { icon: '💬', nome: 'SUPORTE', desc: 'Estamos sempre disponíveis para tirar suas dúvidas.', tempo: 'Rápido' },
    { icon: '✅', nome: 'RESULTADO', desc: 'Compromisso com a sua satisfação em cada detalhe.', tempo: 'Garantido' },
  ],
  ticker_items: ['Seg–Sex · 8h às 18h', 'Atendimento pelo WhatsApp', 'Profissionais qualificados', 'Satisfação garantida', '★ 4.9 no Google'],
  steps: [
    { num: '01', titulo: 'ENTRE EM CONTATO', desc: 'Manda mensagem pelo WhatsApp — respondemos na hora.', tempo: '2 minutos' },
    { num: '02', titulo: 'AGENDE', desc: 'Escolha o melhor horário para você.', tempo: '1 minuto' },
    { num: '03', titulo: 'SEJA ATENDIDO', desc: 'Venha e comprove a qualidade do nosso atendimento.', tempo: 'Sem espera' },
  ],
};

function detectarSegmento(categoria) {
  if (!categoria) return DEFAULT_SEG;
  const lower = categoria.toLowerCase();
  for (const [, seg] of Object.entries(SEGMENTOS)) {
    if (seg.match && seg.match.some(kw => lower.includes(kw))) return seg;
  }
  return DEFAULT_SEG;
}

function buildLandingPagePrompt({ nome, categoria, cidade, phone, endereco }) {
  const seg = detectarSegmento(categoria);
  const phoneClean = phone.replace(/\D/g, '');
  const wppUrl = `https://wa.me/55${phoneClean}?text=Olá%2C%20vim%20pelo%20site%20e%20gostaria%20de%20mais%20informações`;
  const acento = seg.acento;

  const tickerHtml = [...seg.ticker_items, ...seg.ticker_items]
    .map(t => `<span class="ticker__item">${t} <span class="ticker__dot"></span></span>`)
    .join('');

  const servicosHtml = seg.servicos.map(s => `
      <div class="svc-card">
        <span class="svc-icon">${s.icon}</span>
        <div class="svc-name">${s.nome}</div>
        <div class="svc-desc">[DESCRIÇÃO ESPECÍFICA PARA ${nome} EM ${cidade} — baseada em: ${s.desc}]</div>
        <div><span class="svc-time">${s.tempo}</span></div>
      </div>`).join('');

  const stepsHtml = seg.steps.map(s => `
        <div class="book-step">
          <div class="book-step__num">${s.num}</div>
          <div class="book-step__body">
            <div class="book-step__title">${s.titulo}</div>
            <div class="book-step__desc">${s.desc}</div>
            <div class="book-step__time">${s.tempo}</div>
          </div>
        </div>`).join('');

  return `Você é um desenvolvedor frontend especialista em design premium. Gere o HTML completo de uma landing page de alto nível para o negócio abaixo.

## DADOS DO NEGÓCIO
- Nome: ${nome}
- Categoria: ${categoria}
- Cidade: ${cidade}
- WhatsApp: ${phone}
- Info adicional: ${endereco || 'não informado'}
- URL WhatsApp: ${wppUrl}
- Cor de acento: ${acento}
- Foto hero: ${seg.foto}

## INSTRUÇÕES CRÍTICAS
1. Retorne APENAS HTML puro começando com <!DOCTYPE html>
2. Todo texto em colchetes [ASSIM] deve ser substituído por conteúdo real e específico para ${nome} em ${cidade}
3. Depoimentos com nomes e contextos plausíveis para a região
4. Linguagem brasileira, direta e envolvente
5. NÃO use Calendly — agendamento é pelo WhatsApp

## HTML COMPLETO

<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${nome} — ${categoria} em ${cidade}</title>
  <meta name="description" content="${nome} — ${categoria} em ${cidade}. [SLOGAN ESPECÍFICO DO NEGÓCIO]" />

  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow+Condensed:ital,wght@0,300;0,400;0,700;1,300&family=Barlow:wght@300;400;500&display=swap" rel="stylesheet" />

  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; }

    :root {
      --black:   #060606;
      --off:     #0E0E0E;
      --white:   #F0EDE8;
      --red:     ${acento};
      --gold:    #BFA14A;
      --gray:    #161616;
      --gray-lt: #252525;
      --sub:     rgba(240,237,232,.45);
      --ff-disp: 'Bebas Neue', sans-serif;
      --ff-cond: 'Barlow Condensed', sans-serif;
      --ff-body: 'Barlow', sans-serif;
      --ease:    cubic-bezier(0.16, 1, 0.3, 1);
    }

    /* Cursor customizado */
    * { cursor: none !important; }
    #cur { position:fixed; width:28px; height:28px; border:2px solid var(--white); border-radius:50%; pointer-events:none; z-index:9999; transform:translate(-50%,-50%); mix-blend-mode:exclusion; transition:transform .08s, width .2s, height .2s; }
    #cur-dot { position:fixed; width:5px; height:5px; background:var(--red); border-radius:50%; pointer-events:none; z-index:9998; transform:translate(-50%,-50%); }
    #cur.hover { width:48px; height:48px; }
    @media (hover: none) { * { cursor: auto !important; } #cur, #cur-dot { display: none; } }

    body { font-family:var(--ff-body); background:var(--black); color:var(--white); overflow-x:hidden; -webkit-font-smoothing:antialiased; }

    /* Grain texture */
    body::after { content:''; position:fixed; inset:0; z-index:300; pointer-events:none; opacity:.03;
      background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E"); }

    /* Ticker */
    .ticker { position:fixed; top:0; left:0; right:0; z-index:100; background:var(--red); height:30px; overflow:hidden; display:flex; align-items:center; }
    .ticker__track { display:flex; white-space:nowrap; animation:tick 20s linear infinite; }
    .ticker__item { font-family:var(--ff-cond); font-size:.7rem; font-weight:700; letter-spacing:.2em; text-transform:uppercase; color:var(--white); padding:0 2.5rem; display:flex; align-items:center; gap:.75rem; }
    .ticker__dot { width:3px; height:3px; background:rgba(255,255,255,.4); border-radius:50%; }
    @keyframes tick { from{transform:translateX(0)} to{transform:translateX(-50%)} }

    /* Nav */
    nav { position:fixed; top:30px; left:0; right:0; z-index:99; display:flex; align-items:center; justify-content:space-between; padding:1.1rem 3rem; }
    nav::before { content:''; position:absolute; inset:0; background:linear-gradient(to bottom,rgba(6,6,6,.96) 0%,transparent 100%); pointer-events:none; }
    .nav__logo { position:relative; z-index:1; text-decoration:none; }
    .nav__logo-main { font-family:var(--ff-disp); font-size:1.5rem; letter-spacing:.12em; color:var(--white); display:block; line-height:1; }
    .nav__logo-sub { font-family:var(--ff-cond); font-size:.6rem; font-weight:700; letter-spacing:.3em; text-transform:uppercase; color:var(--gold); display:block; margin-top:1px; }
    .nav__book { font-family:var(--ff-cond); font-size:.72rem; font-weight:700; letter-spacing:.2em; text-transform:uppercase; color:var(--black); background:var(--white); padding:.55rem 1.4rem; text-decoration:none; transition:background .2s, color .2s; position:relative; z-index:1; }
    .nav__book:hover { background:var(--red); color:var(--white); }

    /* Hero */
    .hero { position:relative; height:100vh; min-height:700px; display:flex; flex-direction:column; justify-content:flex-end; padding:4rem 3rem; overflow:hidden; }
    .hero__bg { position:absolute; inset:0; background:url('${seg.foto}') center/cover no-repeat; }
    .hero__overlay { position:absolute; inset:0; background:linear-gradient(135deg,rgba(6,6,6,.88) 0%,rgba(6,6,6,.4) 50%,rgba(6,6,6,.75) 100%); }
    .hero__accent { position:absolute; left:3rem; top:35%; width:1px; height:120px; background:linear-gradient(to bottom,transparent,var(--gold),transparent); }
    .hero__num { position:absolute; right:3rem; bottom:8rem; font-family:var(--ff-disp); font-size:18rem; color:rgba(255,255,255,.025); line-height:1; pointer-events:none; }
    .hero__content { position:relative; z-index:1; }
    .hero__tag { font-family:var(--ff-cond); font-size:.68rem; font-weight:700; letter-spacing:.28em; text-transform:uppercase; color:var(--gold); margin-bottom:1.25rem; display:flex; align-items:center; gap:.75rem; opacity:0; animation:up .7s var(--ease) .1s forwards; }
    .hero__tag::before { content:''; width:20px; height:1px; background:var(--gold); }
    .hero__title { font-family:var(--ff-disp); font-size:clamp(5rem,15vw,14rem); line-height:.85; letter-spacing:-.01em; margin-bottom:2rem; opacity:0; animation:up .9s var(--ease) .35s forwards; }
    .hero__title .stroke { -webkit-text-stroke:2px rgba(240,237,232,.6); color:transparent; }
    .hero__title .gold { color:var(--gold); }
    .hero__bottom { display:flex; align-items:flex-end; justify-content:space-between; gap:2rem; opacity:0; animation:up .7s var(--ease) .6s forwards; }
    .hero__desc { font-family:var(--ff-cond); font-size:1.05rem; font-weight:300; line-height:1.6; color:var(--white); opacity:.65; max-width:40ch; }
    .hero__actions { display:flex; gap:1rem; align-items:center; flex-shrink:0; }
    .hero__cta { font-family:var(--ff-disp); font-size:1.1rem; letter-spacing:.08em; color:var(--black); background:var(--white); padding:.7rem 2rem; text-decoration:none; position:relative; overflow:hidden; transition:color .3s; }
    .hero__cta::before { content:''; position:absolute; inset:0; background:var(--red); transform:translateX(-101%); transition:transform .3s var(--ease); }
    .hero__cta:hover { color:var(--white); }
    .hero__cta:hover::before { transform:translateX(0); }
    .hero__cta span { position:relative; z-index:1; }
    .hero__stats { display:flex; gap:1px; }
    .hero__stat { background:rgba(240,237,232,.06); backdrop-filter:blur(4px); padding:1rem 1.5rem; text-align:center; border:1px solid rgba(240,237,232,.08); min-width:100px; }
    .hero__stat-n { font-family:var(--ff-disp); font-size:2.2rem; color:var(--gold); line-height:1; display:block; }
    .hero__stat-l { font-family:var(--ff-cond); font-size:.58rem; font-weight:700; letter-spacing:.2em; text-transform:uppercase; color:var(--white); opacity:.4; margin-top:.2rem; display:block; }

    /* Seções */
    .sec-tag { font-family:var(--ff-cond); font-size:.68rem; font-weight:700; letter-spacing:.25em; text-transform:uppercase; color:var(--gold); margin-bottom:.75rem; }
    .sec-title { font-family:var(--ff-disp); font-size:clamp(2.5rem,6vw,5rem); line-height:.9; color:var(--white); }
    .sec-sub { font-family:var(--ff-cond); font-size:.9rem; font-weight:300; line-height:1.6; color:var(--sub); max-width:28ch; text-align:right; }
    .sec-header { display:flex; align-items:flex-end; justify-content:space-between; margin-bottom:3.5rem; gap:2rem; }

    /* Serviços */
    .services { padding:6rem 3rem; }
    .services-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:1px; background:var(--gray-lt); }
    .svc-card { background:var(--gray); padding:2rem; position:relative; overflow:hidden; transition:background .3s; }
    .svc-card:hover { background:var(--gray-lt); }
    .svc-card::before { content:''; position:absolute; top:0; left:0; right:0; height:2px; background:var(--red); transform:scaleX(0); transform-origin:left; transition:transform .4s var(--ease); }
    .svc-card:hover::before { transform:scaleX(1); }
    .svc-icon { font-size:1.5rem; margin-bottom:1.25rem; display:block; }
    .svc-name { font-family:var(--ff-disp); font-size:1.4rem; letter-spacing:.04em; color:var(--white); margin-bottom:.4rem; }
    .svc-desc { font-size:.8rem; line-height:1.6; color:var(--sub); margin-bottom:1.25rem; }
    .svc-time { font-family:var(--ff-cond); font-size:.65rem; font-weight:700; letter-spacing:.15em; text-transform:uppercase; color:var(--sub); }

    /* Depoimentos */
    .proof { background:var(--gray); padding:5rem 3rem; }
    .proof__inner { display:grid; grid-template-columns:1fr 2fr; gap:5rem; align-items:center; }
    .proof__left-title { font-family:var(--ff-disp); font-size:clamp(3rem,6vw,5rem); line-height:.9; color:var(--white); margin-bottom:1.5rem; }
    .proof__left-title span { color:var(--red); }
    .proof__rating { display:flex; align-items:center; gap:.75rem; margin-bottom:1rem; }
    .stars { color:var(--gold); font-size:1.1rem; letter-spacing:.1em; }
    .rating-text { font-family:var(--ff-cond); font-size:.85rem; font-weight:700; color:var(--sub); }
    .proof__reviews { display:flex; flex-direction:column; gap:1px; background:var(--gray-lt); }
    .review { background:var(--gray); padding:1.75rem; }
    .review__text { font-size:.88rem; line-height:1.7; color:var(--white); opacity:.7; margin-bottom:1rem; font-style:italic; }
    .review__name { font-family:var(--ff-cond); font-size:.85rem; font-weight:700; color:var(--white); }
    .review__date { font-family:var(--ff-cond); font-size:.68rem; color:var(--sub); }
    .review__stars { color:var(--gold); font-size:.75rem; margin-bottom:.5rem; }

    /* Agendamento */
    .book-section { padding:6rem 3rem; display:grid; grid-template-columns:1fr 1fr; gap:6rem; align-items:start; }
    .book-left__title { font-family:var(--ff-disp); font-size:clamp(3rem,6vw,5.5rem); line-height:.88; color:var(--white); margin-bottom:2rem; }
    .book-left__title .stroke { -webkit-text-stroke:1px rgba(240,237,232,.3); color:transparent; }
    .book-step { display:flex; gap:1.25rem; padding:1.25rem 0; border-bottom:1px solid var(--gray-lt); }
    .book-step:last-child { border-bottom:none; }
    .book-step__num { font-family:var(--ff-disp); font-size:2.5rem; color:var(--gold); opacity:.4; line-height:1; flex-shrink:0; width:36px; }
    .book-step__title { font-family:var(--ff-cond); font-size:1rem; font-weight:700; letter-spacing:.06em; text-transform:uppercase; color:var(--white); margin-bottom:.3rem; }
    .book-step__desc { font-size:.82rem; line-height:1.6; color:var(--sub); }
    .book-step__time { font-family:var(--ff-cond); font-size:.65rem; font-weight:700; letter-spacing:.15em; text-transform:uppercase; color:var(--red); margin-top:.3rem; }
    .book-card { background:var(--gray); border:1px solid var(--gray-lt); padding:2.25rem; position:sticky; top:6rem; }
    .book-card__title { font-family:var(--ff-disp); font-size:1.8rem; letter-spacing:.04em; color:var(--white); margin-bottom:.3rem; }
    .book-card__sub { font-size:.78rem; color:var(--sub); margin-bottom:1.75rem; line-height:1.5; }
    .book-card__wpp { display:flex; align-items:center; justify-content:center; gap:.75rem; width:100%; padding:1rem; background:var(--red); color:var(--white); font-family:var(--ff-disp); font-size:1.1rem; letter-spacing:.08em; text-decoration:none; transition:opacity .2s; margin-top:1rem; }
    .book-card__wpp:hover { opacity:.85; }
    .book-card__info { font-family:var(--ff-cond); font-size:.72rem; font-weight:700; letter-spacing:.12em; text-transform:uppercase; color:var(--sub); text-align:center; margin-top:1rem; }

    /* Footer */
    footer { background:var(--off); border-top:1px solid var(--gray-lt); padding:3rem; display:grid; grid-template-columns:1fr 1fr 1fr; gap:3rem; }
    .footer__brand-name { font-family:var(--ff-disp); font-size:1.8rem; letter-spacing:.1em; color:var(--white); display:block; margin-bottom:.3rem; }
    .footer__brand-sub { font-family:var(--ff-cond); font-size:.62rem; font-weight:700; letter-spacing:.3em; text-transform:uppercase; color:var(--gold); display:block; margin-bottom:1rem; }
    .footer__desc { font-size:.82rem; line-height:1.7; color:var(--sub); }
    .footer__col-title { font-family:var(--ff-cond); font-size:.68rem; font-weight:700; letter-spacing:.2em; text-transform:uppercase; color:var(--gold); margin-bottom:1rem; }
    .footer__info { display:flex; flex-direction:column; gap:.6rem; font-size:.83rem; color:var(--sub); }
    .footer__copy { grid-column:1/-1; border-top:1px solid var(--gray-lt); padding-top:1.5rem; display:flex; align-items:center; justify-content:space-between; }
    .footer__copy p { font-size:.72rem; color:var(--sub); opacity:.4; }
    .powered { font-family:var(--ff-cond); font-size:.65rem; font-weight:700; letter-spacing:.15em; text-transform:uppercase; color:var(--gold); opacity:.6; text-decoration:none; }

    /* WPP Float */
    .wpp-float { position:fixed; bottom:2rem; right:2rem; z-index:200; background:#25d366; color:#fff; width:58px; height:58px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:1.5rem; text-decoration:none; box-shadow:0 8px 24px rgba(37,211,102,0.4); transition:all .25s; }
    .wpp-float:hover { transform:scale(1.08); }

    /* Animações */
    @keyframes up { from{opacity:0;transform:translateY(30px)} to{opacity:1;transform:translateY(0)} }
    .reveal { opacity:0; transform:translateY(20px); transition:opacity .7s var(--ease), transform .7s var(--ease); }
    .reveal.visible { opacity:1; transform:translateY(0); }

    /* Responsive */
    @media (max-width: 768px) {
      nav { padding:.9rem 1.2rem; }
      .hero { padding:2rem 1.2rem 3rem; }
      .hero__title { font-size:clamp(4rem,20vw,8rem); }
      .hero__num { display:none; }
      .hero__bottom { flex-direction:column; align-items:flex-start; }
      .hero__stats { display:none; }
      .services { padding:3rem 1.2rem; }
      .services-grid { grid-template-columns:1fr 1fr; }
      .sec-header { flex-direction:column; align-items:flex-start; }
      .sec-sub { text-align:left; }
      .proof { padding:3rem 1.2rem; }
      .proof__inner { grid-template-columns:1fr; gap:2.5rem; }
      .book-section { padding:3rem 1.2rem; grid-template-columns:1fr; gap:3rem; }
      footer { grid-template-columns:1fr; padding:2.5rem 1.2rem; gap:2rem; }
      .footer__copy { flex-direction:column; gap:.75rem; align-items:flex-start; }
    }
  </style>
</head>
<body>

  <!-- Cursor -->
  <div id="cur"></div>
  <div id="cur-dot"></div>

  <!-- Ticker -->
  <div class="ticker">
    <div class="ticker__track">
      ${tickerHtml}
    </div>
  </div>

  <!-- Nav -->
  <nav>
    <a href="#" class="nav__logo">
      <span class="nav__logo-main">${nome.toUpperCase()}</span>
      <span class="nav__logo-sub">${categoria} · ${cidade}</span>
    </a>
    <a href="${wppUrl}" class="nav__book" target="_blank">AGENDAR AGORA</a>
  </nav>

  <!-- Hero -->
  <section class="hero">
    <div class="hero__bg"></div>
    <div class="hero__overlay"></div>
    <div class="hero__accent"></div>
    <span class="hero__num">[NÚMERO MARCANTE DO NEGÓCIO — ex: ano de fundação ou quantidade de clientes]</span>
    <div class="hero__content">
      <p class="hero__tag">${categoria} · ${cidade}</p>
      <h1 class="hero__title">
        ${seg.titulo_1}<br>
        <span class="stroke">${seg.titulo_2}</span><br>
        <span class="gold">${seg.titulo_3}</span>
      </h1>
      <div class="hero__bottom">
        <p class="hero__desc">[PROPOSTA DE VALOR EM 2 FRASES — específica para ${nome} em ${cidade}. Mencione a cidade naturalmente.]</p>
        <div class="hero__actions">
          <a href="${wppUrl}" class="hero__cta" target="_blank"><span>AGENDAR PELO WHATSAPP →</span></a>
        </div>
        <div class="hero__stats">
          <div class="hero__stat"><span class="hero__stat-n">4.9</span><span class="hero__stat-l">Google</span></div>
          <div class="hero__stat"><span class="hero__stat-n">[N]+</span><span class="hero__stat-l">Clientes</span></div>
          <div class="hero__stat"><span class="hero__stat-n">[A]+</span><span class="hero__stat-l">Anos</span></div>
        </div>
      </div>
    </div>
  </section>

  <!-- Serviços -->
  <section class="services reveal" id="services">
    <div class="sec-header">
      <div>
        <p class="sec-tag">O QUE OFERECEMOS</p>
        <h2 class="sec-title">[TÍTULO DA SEÇÃO DE SERVIÇOS — específico para ${categoria}]</h2>
      </div>
      <p class="sec-sub">[FRASE CURTA E IMPACTANTE sobre os serviços — max 20 palavras]</p>
    </div>
    <div class="services-grid">
      ${servicosHtml}
    </div>
  </section>

  <!-- Depoimentos -->
  <section class="proof reveal" id="reviews">
    <div class="proof__inner">
      <div>
        <p class="sec-tag">O QUE DIZEM</p>
        <h2 class="proof__left-title">[NÚMERO] <span>★</span><br>NO GOOGLE</h2>
        <div class="proof__rating">
          <span class="stars">★★★★★</span>
          <span class="rating-text">[N]+ avaliações verificadas</span>
        </div>
        <p style="font-size:.85rem; color:var(--sub); line-height:1.7;">[FRASE SOBRE A REPUTAÇÃO DO NEGÓCIO EM ${cidade}]</p>
      </div>
      <div class="proof__reviews">
        <div class="review">
          <div class="review__stars">★★★★★</div>
          <p class="review__text">"[DEPOIMENTO REAL E ESPECÍFICO — menciona o serviço recebido e o resultado. Tom natural, não genérico.]"</p>
          <div style="display:flex;align-items:center;gap:.75rem;">
            <div><span class="review__name">[NOME PLAUSÍVEL PARA ${cidade}]</span><span class="review__date"> · [TEMPO] atrás</span></div>
          </div>
        </div>
        <div class="review">
          <div class="review__stars">★★★★★</div>
          <p class="review__text">"[SEGUNDO DEPOIMENTO — diferente contexto, menciona outro aspecto positivo do negócio]"</p>
          <div style="display:flex;align-items:center;gap:.75rem;">
            <div><span class="review__name">[NOME PLAUSÍVEL PARA ${cidade}]</span><span class="review__date"> · [TEMPO] atrás</span></div>
          </div>
        </div>
        <div class="review">
          <div class="review__stars">★★★★★</div>
          <p class="review__text">"[TERCEIRO DEPOIMENTO — foco em atendimento ou preço justo]"</p>
          <div style="display:flex;align-items:center;gap:.75rem;">
            <div><span class="review__name">[NOME PLAUSÍVEL PARA ${cidade}]</span><span class="review__date"> · [TEMPO] atrás</span></div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Agendamento -->
  <section class="book-section reveal" id="book">
    <div>
      <h2 class="book-left__title">[TÍTULO DE AGENDAMENTO]<br><span class="stroke">É SIMPLES.</span></h2>
      <div>
        ${stepsHtml}
      </div>
    </div>
    <div class="book-card">
      <div class="book-card__title">AGENDAR AGORA</div>
      <p class="book-card__sub">[FRASE DE URGÊNCIA SUAVE — ex: "Horários limitados. Garanta o seu."]</p>
      <a href="${wppUrl}" class="book-card__wpp" target="_blank">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.117.549 4.107 1.514 5.842L.057 23.943l6.261-1.439A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.006-1.372l-.359-.213-3.721.855.883-3.617-.234-.372A9.818 9.818 0 1112 21.818z"/></svg>
        FALAR NO WHATSAPP
      </a>
      <p class="book-card__info">Resposta em até 5 minutos · Seg–Sáb</p>
    </div>
  </section>

  <!-- Footer -->
  <footer>
    <div>
      <span class="footer__brand-name">${nome.toUpperCase()}</span>
      <span class="footer__brand-sub">${categoria} · ${cidade}</span>
      <p class="footer__desc">[DESCRIÇÃO CURTA DO NEGÓCIO — 2 frases sobre história e missão]</p>
    </div>
    <div>
      <p class="footer__col-title">HORÁRIOS</p>
      <div class="footer__info">
        <span>[HORÁRIOS DE FUNCIONAMENTO inferidos para ${categoria}]</span>
      </div>
    </div>
    <div>
      <p class="footer__col-title">CONTATO</p>
      <div class="footer__info">
        <span>${phone}</span>
        <span>[ENDEREÇO se disponível em: ${endereco || 'não informado'}]</span>
        <span>${cidade}</span>
      </div>
    </div>
    <div class="footer__copy">
      <p>© ${new Date().getFullYear()} ${nome}. Todos os direitos reservados.</p>
      <a href="https://vitrineia.com.br" class="powered">Powered by VitrineIA</a>
    </div>
  </footer>

  <!-- WPP Float -->
  <a href="${wppUrl}" class="wpp-float" target="_blank">
    <svg width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.117.549 4.107 1.514 5.842L.057 23.943l6.261-1.439A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.006-1.372l-.359-.213-3.721.855.883-3.617-.234-.372A9.818 9.818 0 1112 21.818z"/></svg>
  </a>

  <script>
    // Cursor customizado
    const cur = document.getElementById('cur');
    const dot = document.getElementById('cur-dot');
    let mx = 0, my = 0, cx = 0, cy = 0;
    document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; dot.style.left = mx+'px'; dot.style.top = my+'px'; });
    document.querySelectorAll('a, button').forEach(el => {
      el.addEventListener('mouseenter', () => cur.classList.add('hover'));
      el.addEventListener('mouseleave', () => cur.classList.remove('hover'));
    });
    (function loop() {
      cx += (mx - cx) * 0.12; cy += (my - cy) * 0.12;
      cur.style.left = cx+'px'; cur.style.top = cy+'px';
      requestAnimationFrame(loop);
    })();

    // Reveal on scroll
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  </script>

</body>
</html>

Substitua TODOS os textos em [COLCHETES] por conteúdo real, específico e convincente para ${nome} em ${cidade}.
Retorne APENAS o HTML completo. Sem explicações. HTML puro.`;
}

module.exports = { buildLandingPagePrompt };
