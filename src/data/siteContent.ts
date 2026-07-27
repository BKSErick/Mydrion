export const contactHref =
  "https://wa.me/5531991072407?text=Ol%C3%A1%2C%20Erick.%20Conheci%20a%20Mydrion%20e%20quero%20mapear%20um%20projeto.";

export const hero = {
  eyebrow: "SISTEMAS / SITES / PRODUTOS DIGITAIS",
  headline: "CONSTRUÍMOS O QUE NÃO EXISTE PRONTO.",
  body:
    "Sistemas, sites e produtos digitais sob medida para empresas que cresceram além das soluções genéricas — da arquitetura à publicação, com tecnologia que se adapta ao negócio, não o contrário.",
  primaryCta: {
    label: "Mapear meu projeto",
    href: contactHref
  },
  secondaryCta: {
    label: "Ver projetos reais",
    href: "#projetos"
  }
} as const;

export const proofPoints = [
  "Produto próprio em operação",
  "Projetos reais",
  "Arquitetura + design + desenvolvimento"
] as const;

export const capabilities = [
  {
    id: "systems",
    index: "01",
    title: "Sistemas sob medida",
    eyebrow: "Operação",
    body:
      "Plataformas construídas em torno das regras, pessoas e decisões do seu negócio — sem forçar a operação a caber em uma ferramenta genérica.",
    outcome: "Mais controle. Menos remendo."
  },
  {
    id: "sites",
    index: "02",
    title: "Sites estratégicos",
    eyebrow: "Posicionamento",
    body:
      "Experiências digitais que organizam a proposta de valor, demonstram competência e transformam atenção em uma próxima ação clara.",
    outcome: "Marca percebida no nível da entrega."
  },
  {
    id: "saas",
    index: "03",
    title: "Produtos SaaS",
    eyebrow: "Produto",
    body:
      "Da ideia à arquitetura de um produto replicável: jornadas, permissões, dados, cobrança e evolução planejados como um sistema vivo.",
    outcome: "Uma operação que pode virar produto."
  },
  {
    id: "automation",
    index: "04",
    title: "IA e automação",
    eyebrow: "Escala",
    body:
      "Automações com contexto, regras e supervisão humana para retirar atrito do processo sem criar uma nova caixa-preta.",
    outcome: "Velocidade sem perder o comando."
  }
] as const;

export const projects = [
  {
    name: "OStrack",
    type: "Produto próprio / SaaS",
    statement:
      "Gestão de ordens de serviço com visão operacional, rastreabilidade e acompanhamento do fluxo de ponta a ponta.",
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
  },
  {
    name: "Ideia Hub",
    type: "Arquitetura e sistemas",
    statement:
      "Atuação técnica na construção de estruturas digitais e soluções sob medida para novas ideias e operações.",
    tags: ["Arquitetura", "Sistemas", "Parceria"],
    status: "Parceria técnica"
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
    body: "Testamos fluxo, conteúdo, responsividade, desempenho e pontos de risco."
  },
  {
    index: "05",
    title: "Publicamos",
    body: "Colocamos no ar com base preparada para aprender, operar e evoluir."
  }
] as const;
