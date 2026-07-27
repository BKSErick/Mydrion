import { buildWhatsAppUrl } from "./whatsapp";

describe("WhatsApp project brief", () => {
  it("creates a structured prefilled message without losing accents", () => {
    const url = buildWhatsAppUrl({
      name: "Érick",
      company: "Mydrion",
      projectType: "Sistema sob medida",
      timing: "Nos próximos 30 dias",
      challenge: "Conectar operação e dados comerciais."
    });

    expect(url).toMatch(/^https:\/\/wa\.me\/5531991072407\?text=/);

    const message = decodeURIComponent(url.split("?text=")[1]);
    expect(message).toContain("Nome: Érick");
    expect(message).toContain("Empresa: Mydrion");
    expect(message).toContain("Tipo de projeto: Sistema sob medida");
    expect(message).toContain("Momento: Nos próximos 30 dias");
    expect(message).toContain("Desafio: Conectar operação e dados comerciais.");
  });
});
