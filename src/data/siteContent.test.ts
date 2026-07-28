import { capabilities, clientLogos, hero, projects } from "./siteContent";

describe("Mydrion content governance", () => {
  it("keeps the approved hero copy and CTA", () => {
    expect(hero.headline).toBe("CONSTRUÍMOS O QUE NÃO EXISTE PRONTO.");
    expect(hero.body).not.toContain("—");
    expect(hero.primaryCta.label).toBe("Mapear meu projeto");
  });

  it("covers systems, sites, SaaS and automation equally", () => {
    expect(capabilities.map(({ id }) => id)).toEqual([
      "systems",
      "sites",
      "saas",
      "automation"
    ]);
  });

  it("uses only the verified initial project set", () => {
    expect(projects.map(({ name }) => name)).toEqual([
      "OStrack",
      "Metalthec",
      "Jotta Manutenções"
    ]);
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

  it("contains no fabricated metrics, lorem ipsum or placeholder links", () => {
    const serialized = JSON.stringify({ hero, capabilities, projects });

    expect(serialized).not.toMatch(/lorem ipsum|#href|resultado garantido/i);
    expect(serialized).not.toMatch(/\b\d+%|\b\d+x\b/i);
  });
});
