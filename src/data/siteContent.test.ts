import { capabilities, hero, projects } from "./siteContent";

describe("Mydrion content governance", () => {
  it("keeps the approved hero copy and CTA", () => {
    expect(hero.headline).toBe("CONSTRUÍMOS O QUE NÃO EXISTE PRONTO.");
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
      "Jotta Manutenções",
      "Ideia Hub"
    ]);
  });

  it("contains no fabricated metrics, lorem ipsum or placeholder links", () => {
    const serialized = JSON.stringify({ hero, capabilities, projects });

    expect(serialized).not.toMatch(/lorem ipsum|#href|resultado garantido/i);
    expect(serialized).not.toMatch(/\b\d+%|\b\d+x\b/i);
  });
});
