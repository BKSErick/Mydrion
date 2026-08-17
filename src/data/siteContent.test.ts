import {
  boundaries,
  capabilities,
  clientLogos,
  hero,
  processSteps,
  projects,
  proofPoints
} from "./siteContent";

const allCopy = JSON.stringify({
  hero,
  proofPoints,
  capabilities,
  boundaries,
  projects,
  processSteps
});

describe("Mydrion content governance", () => {
  it("keeps the approved hero copy and CTA", () => {
    expect(hero.eyebrow).toBe("TECNOLOGIA SOB MEDIDA PARA INDÚSTRIA");
    expect(hero.headline).toBe(
      "A GENTE ORGANIZA O COMERCIAL E A OPERAÇÃO DE QUEM FABRICA."
    );
    expect(hero.body).toContain("a triagem na entrada e o controle na operação");
    expect(hero.primaryCta.label).toBe("Mapear meu projeto");
    expect(hero.secondaryCta.label).toBe("Ver projetos reais");
  });

  it("drops the generic manifesto promise from the hero", () => {
    expect(allCopy).not.toMatch(/não existe pronto/i);
  });

  it("proves reach instead of describing the internal process", () => {
    expect(proofPoints).toEqual([
      "Produto próprio em operação",
      "Cases industriais reais",
      "Entrega remota, Brasil inteiro"
    ]);
  });

  it("orders capabilities as a ladder without renaming the ids", () => {
    expect(capabilities.map(({ id }) => id)).toEqual([
      "sites",
      "systems",
      "saas",
      "automation"
    ]);
    expect(capabilities.map(({ index }) => index)).toEqual([
      "01",
      "02",
      "03",
      "04"
    ]);
    expect(capabilities.map(({ eyebrow }) => eyebrow)).toEqual([
      "Entrada",
      "Operação",
      "Produto",
      "Escala"
    ]);
  });

  it("declares where Mydrion does and does not enter", () => {
    expect(boundaries.title).toBe("Onde a gente entra, e onde não entra.");
    expect(boundaries.fits.title).toBe("A Mydrion entra quando");
    expect(boundaries.doesNotFit.title).toBe("A Mydrion não entra quando");
    expect(boundaries.fits.items).toHaveLength(4);
    expect(boundaries.doesNotFit.items).toHaveLength(5);
    expect(boundaries.doesNotFit.items).toContain(
      "O que falta é um ERP fiscal, financeiro ou de estoque."
    );
  });

  it("names the problem in the OStrack statement", () => {
    const ostrack = projects.find(({ name }) => name === "OStrack");

    expect(ostrack?.statement).toBe(
      "Gestão de ordem de serviço para recuperadoras e usinagens: etapa, responsável, tempo parado e próxima ação, com escopo aprovado sem vazar preço pro cliente."
    );
  });

  it("uses only the verified initial project set", () => {
    expect(projects.map(({ name }) => name)).toEqual([
      "OStrack",
      "Metalthec",
      "Jotta Manutenções"
    ]);
  });

  it("never describes Jotta as predial maintenance", () => {
    expect(allCopy).not.toMatch(/predial/i);
  });

  it("uses the complete real logo set supplied for the carousel", () => {
    expect(clientLogos.map(({ name }) => name)).toEqual([
      "BFT",
      "Espaço Constru",
      "GTHouse",
      "Metalthec",
      "SPhaus",
      "Via BR",
      "OStrack"
    ]);
  });

  it("keeps every copy string free of em dashes", () => {
    expect(allCopy).not.toContain("—");
  });

  it("never uses city or region as a brand attribute", () => {
    expect(allCopy).not.toMatch(/monlevade|vale do aço|19°55|43°56/i);
  });

  it("contains no fabricated metrics, lorem ipsum or placeholder links", () => {
    expect(allCopy).not.toMatch(/lorem ipsum|#href|resultado garantido/i);
    expect(allCopy).not.toMatch(/\b\d+%|\b\d+x\b/i);
  });
});
