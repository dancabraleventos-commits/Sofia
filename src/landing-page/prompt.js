/**
 * Prompt premium para geração de landing page HTML completa via Claude.
 * Gera uma página única com CSS embutido, otimizada para conversão.
 */
function buildLandingPagePrompt({ nome, categoria, cidade, phone, endereco }) {
  return `Você é um especialista em design e copywriting de alta conversão para pequenas empresas brasileiras.

Gere uma landing page HTML COMPLETA, profissional e pronta para publicar para o seguinte negócio:

- Nome do negócio: ${nome}
- Categoria/Segmento: ${categoria}
- Cidade: ${cidade}
- Telefone/WhatsApp: ${phone}
- Endereço: ${endereco || 'não informado'}

## REQUISITOS TÉCNICOS OBRIGATÓRIOS
- Arquivo HTML único e autocontido (todo CSS embutido em <style>, sem dependências externas de CSS)
- Responsivo e mobile-first (funciona perfeitamente em celular)
- Carregamento rápido (sem frameworks pesados, sem jQuery)
- Usar Google Fonts via CDN (máximo 1 fonte, ex: Inter ou Poppins)
- Ícones via CDN do Font Awesome (apenas os usados)
- Cores modernas e profissionais adequadas ao segmento

## ESTRUTURA DA PÁGINA (nesta ordem)
1. **Header** com logo/nome do negócio e botão CTA de WhatsApp
2. **Hero section** com headline poderosa, subheadline e CTA principal
3. **Seção de benefícios** (3-4 cards com ícones, específicos do segmento)
4. **Seção "Por que nos escolher"** com diferenciais reais do negócio
5. **Depoimentos** (2-3 depoimentos fictícios mas plausíveis para o segmento)
6. **Seção de localização** com endereço e botão para Google Maps (se endereço informado)
7. **CTA final** com botão WhatsApp grande e persuasivo
8. **Footer** com informações de contato e direitos

## REQUISITOS DE COPYWRITING
- Headlines focadas em resultados e benefícios para o cliente
- Linguagem direta, calorosa e profissional (não robótica)
- Urgência sutil e natural (ex: "vagas limitadas", "atendimento personalizado")
- Todos os textos em português brasileiro
- CTA do WhatsApp deve abrir: https://wa.me/55${phone.replace(/\D/g, '')}?text=Olá%2C%20vim%20pelo%20site%20e%20gostaria%20de%20mais%20informações

## REQUISITOS VISUAIS
- Paleta de cores profissional e coerente com o segmento (definir 2-3 cores principais)
- Espaçamento generoso, tipografia legível
- Botões com hover effects via CSS
- Sombras e bordas arredondadas modernas
- Seções com fundos alternados (branco / cor suave)
- Animações CSS sutis (fade-in, hover transitions)

## FORMATO DE RESPOSTA
Retorne APENAS o código HTML completo, começando com <!DOCTYPE html> e terminando com </html>.
Sem explicações, sem markdown, sem blocos de código. Apenas o HTML puro.`;
}

module.exports = { buildLandingPagePrompt };
