export const contactHref =
  "https://wa.me/5531991072407?text=Ol%C3%A1%2C%20Erick.%20Conheci%20a%20Mydrion%20e%20quero%20mapear%20um%20projeto.";

export const hero = {
  eyebrow: "TECNOLOGIA SOB MEDIDA PARA INDÚSTRIA",
  headline: "A GENTE ORGANIZA O COMERCIAL E A OPERAÇÃO DE QUEM FABRICA.",
  body:
    "O comprador industrial pesquisa antes de ligar. Do outro lado, o pedido ainda chega vago e a ordem de serviço vive em planilha, WhatsApp e memória da equipe. A Mydrion resolve os dois lados: a triagem na entrada e o controle na operação.",
  primaryCta: {
    label: "Mapear meu projeto",
    href: "#briefing"
  },
  secondaryCta: {
    label: "Ver projetos reais",
    href: "#projetos"
  }
} as const;

export const proofPoints = [
  "Produto próprio em operação",
  "Cases industriais reais",
  "Entrega remota, Brasil inteiro"
] as const;

export const clientLogos = [
  { name: "BFT", src: "/clients/bft.svg" },
  { name: "Espaço Constru", src: "/clients/espaco-constru.svg" },
  { name: "GTHouse", src: "/clients/gthouse.png" },
  { name: "Metalthec", src: "/clients/metaltech.png" },
  { name: "SPhaus", src: "/clients/sphaus.svg" },
  { name: "Via BR", src: "/clients/viabr.svg" },
  { name: "OStrack", src: "/clients/ostrack.svg" }
] as const;

export const capabilities = [
  {
    id: "sites",
    index: "01",
    title: "Páginas industriais com Ficha de Escopo",
    eyebrow: "Entrada",
    body:
      "O cliente informa serviço, equipamento, medida, material e urgência, e anexa foto ou desenho, antes de falar com você. O pedido cai no WhatsApp já preenchido em vez de virar uma ida e volta até descobrir o que ele quer.",
    outcome: "Menos hora técnica virando atendimento."
  },
  {
    id: "systems",
    index: "02",
    title: "Sistemas de operação",
    eyebrow: "Operação",
    body:
      "A ordem de serviço sai da planilha, do WhatsApp e da memória da equipe. Etapa, responsável, tempo parado e próxima ação num lugar só, com rastro de quem fez o quê e quando.",
    outcome: "O prazo para de se perder no intervalo."
  },
  {
    id: "saas",
    index: "03",
    title: "Produtos SaaS",
    eyebrow: "Produto",
    body:
      "Quando uma operação que funciona pode virar produto: jornadas, permissões, dados, cobrança e evolução planejados como sistema vivo. É o caminho que a gente percorreu no OStrack.",
    outcome: "Uma operação que vira produto."
  },
  {
    id: "automation",
    index: "04",
    title: "Automação e IA",
    eyebrow: "Escala",
    body:
      "O trabalho manual que hoje depende de alguém lembrar de fazer. Automação com regra, contexto e supervisão humana, sem criar uma caixa-preta nova no meio do processo.",
    outcome: "Velocidade sem perder o comando."
  }
] as const;

export const boundaries = {
  title: "Onde a gente entra, e onde não entra.",
  intro:
    "Escopo não é arrogância. Fora do perfil abaixo eu não entrego o resultado que prometo, e prefiro dizer isso antes da proposta.",
  fits: {
    title: "A Mydrion entra quando",
    items: [
      "Você atende pedido técnico variável, onde medida e material mudam o preço.",
      "O orçamento nasce de uma conversa de WhatsApp até alguém descobrir o que o cliente quer.",
      "A ordem de serviço é tocada em planilha, e-mail e memória da equipe.",
      "Você atende cliente grande e precisa provar rastreabilidade, escopo aprovado e qualidade."
    ]
  },
  doesNotFit: {
    title: "A Mydrion não entra quando",
    items: [
      "Você quer só identidade visual, sem mudar como o pedido chega.",
      "A comparação é com preço de mercado de site, e não com a hora técnica que se gasta hoje.",
      "O negócio é comércio, revenda simples ou serviço padronizado, sem pedido técnico.",
      "O que falta é um ERP fiscal, financeiro ou de estoque.",
      "É startup ou agência procurando uma software house genérica."
    ]
  }
} as const;

export const projects = [
  {
    name: "OStrack",
    type: "Produto próprio / SaaS",
    statement:
      "Gestão de ordem de serviço para recuperadoras e usinagens: etapa, responsável, tempo parado e próxima ação, com escopo aprovado sem vazar preço pro cliente.",
    tags: ["Produto", "Sistema", "Operação"],
    href: "https://o-strackpagina.vercel.app/",
    linkLabel: "Conhecer o OStrack"
  },
  {
    name: "Metalthec",
    type: "Site institucional",
    statement:
      "Presença digital criada para traduzir competência técnica industrial em uma experiência clara, sólida e comercial.",
    tags: ["Site", "Estratégia", "Indústria"],
    href: "https://site-metalthec.vercel.app/",
    linkLabel: "Ver projeto"
  },
  {
    name: "Jotta Manutenções",
    type: "Sistema em operação",
    statement:
      "Arquitetura de gestão conectando dados comerciais, operação, relatórios e rotina de atendimento.",
    tags: ["CRM", "Dados", "Automação"],
    status: "Projeto ativo"
  }
] as const;

export const processSteps = [
  {
    index: "01",
    title: "Mapeamos",
    body: "Entendemos o problema real, o contexto e a decisão que precisa melhorar."
  },
  {
    index: "02",
    title: "Arquitetamos",
    body: "Transformamos complexidade em estrutura, escopo e uma direção visual clara."
  },
  {
    index: "03",
    title: "Construímos",
    body: "Desenvolvemos em ciclos curtos, com decisões visíveis e produto navegável."
  },
  {
    index: "04",
    title: "Validamos",
    body:
      "Testamos fluxo, conteúdo, responsividade, desempenho e os pontos onde a operação costuma travar."
  },
  {
    index: "05",
    title: "Publicamos",
    body: "Colocamos no ar com base preparada para aprender, operar e evoluir."
  }
] as const;
