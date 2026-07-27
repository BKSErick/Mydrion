export const MYDRION_WHATSAPP_NUMBER = "5531991072407";

export type ProjectBrief = {
  name: string;
  company?: string;
  projectType: string;
  timing: string;
  challenge: string;
};

export function buildWhatsAppUrl(brief: ProjectBrief) {
  const message = [
    "Olá, Erick. Vim pelo site da Mydrion e quero mapear um projeto.",
    "",
    `Nome: ${brief.name.trim()}`,
    `Empresa: ${brief.company?.trim() || "Não informada"}`,
    `Tipo de projeto: ${brief.projectType}`,
    `Momento: ${brief.timing}`,
    `Desafio: ${brief.challenge.trim()}`
  ].join("\n");

  return `https://wa.me/${MYDRION_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
