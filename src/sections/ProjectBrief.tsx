import { motion, useReducedMotion } from "framer-motion";
import type { FormEvent } from "react";
import {
  ArrowUpRight,
  ChevronDown,
  MessageCircleMore
} from "lucide-react";
import { trackMetaEvent } from "../lib/metaPixel";
import { buildWhatsAppUrl } from "../lib/whatsapp";

export function ProjectBrief() {
  const reduceMotion = useReducedMotion();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const projectType = String(form.get("projectType") ?? "");
    const timing = String(form.get("timing") ?? "");
    const url = buildWhatsAppUrl({
      name: String(form.get("name") ?? ""),
      company: String(form.get("company") ?? ""),
      projectType,
      timing,
      challenge: String(form.get("challenge") ?? "")
    });

    trackMetaEvent("Lead", {
      project_type: projectType,
      timing
    });
    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <section className="project-brief" id="briefing" aria-labelledby="brief-title">
      <div className="project-brief__shell section-shell">
        <motion.div
          className="project-brief__intro"
          initial={reduceMotion ? false : { opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: reduceMotion ? 0 : 0.75 }}
        >
          <p>
            <span>07</span>
            Comece pelo contexto
          </p>
          <h2 id="brief-title">
            Conte o problema.
            <br />
            <span>A conversa já começa melhor.</span>
          </h2>
          <div className="project-brief__promise">
            <MessageCircleMore aria-hidden="true" />
            <p>
              Cinco respostas organizam o primeiro contato e chegam prontas no
              WhatsApp da Mydrion.
            </p>
          </div>
        </motion.div>

        <motion.form
          className="project-brief__form"
          aria-label="Briefing do projeto"
          onSubmit={handleSubmit}
          initial={reduceMotion ? false : { opacity: 0, y: 42 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: reduceMotion ? 0 : 0.8, delay: 0.08 }}
        >
          <div className="project-brief__form-header">
            <div>
              <p>Formulário / WhatsApp</p>
              <h3>Briefing inicial</h3>
            </div>
            <p className="project-brief__form-time">
              <strong>5 respostas</strong>
              <span aria-hidden="true">•</span>
              Cerca de 2 minutos
            </p>
            <p className="project-brief__required-note">
              <span aria-hidden="true">*</span>
              Campos obrigatórios
            </p>
          </div>

          <div className="project-brief__field" data-step="01">
            <label htmlFor="brief-name">
              Seu nome <span aria-hidden="true">*</span>
            </label>
            <input
              id="brief-name"
              name="name"
              type="text"
              autoComplete="name"
              placeholder="Como podemos te chamar?"
              required
            />
          </div>

          <div
            className="project-brief__field project-brief__field--right"
            data-step="02"
          >
            <label htmlFor="brief-company">
              Empresa <small>Opcional</small>
            </label>
            <input
              id="brief-company"
              name="company"
              type="text"
              autoComplete="organization"
              placeholder="Nome da empresa"
            />
          </div>

          <div className="project-brief__field" data-step="03">
            <label htmlFor="brief-type">
              Tipo de projeto <span aria-hidden="true">*</span>
            </label>
            <div className="project-brief__select-control">
              <select id="brief-type" name="projectType" defaultValue="" required>
                <option value="" disabled>
                  Selecione uma direção
                </option>
                <option>Sistema sob medida</option>
                <option>Site estratégico</option>
                <option>Produto SaaS</option>
                <option>Automação e inteligência artificial</option>
                <option>Ainda não sei definir</option>
              </select>
              <ChevronDown aria-hidden="true" />
            </div>
          </div>

          <div
            className="project-brief__field project-brief__field--right"
            data-step="04"
          >
            <label htmlFor="brief-timing">
              Momento do projeto <span aria-hidden="true">*</span>
            </label>
            <div className="project-brief__select-control">
              <select
                id="brief-timing"
                name="timing"
                defaultValue="Nos próximos 30 dias"
                required
              >
                <option>Agora / prioridade</option>
                <option>Nos próximos 30 dias</option>
                <option>Nos próximos 3 meses</option>
                <option>Ainda estou mapeando</option>
              </select>
              <ChevronDown aria-hidden="true" />
            </div>
          </div>

          <div
            className="project-brief__field project-brief__field--wide"
            data-step="05"
          >
            <label htmlFor="brief-challenge">
              Principal desafio <span aria-hidden="true">*</span>
            </label>
            <textarea
              id="brief-challenge"
              name="challenge"
              rows={4}
              placeholder="O que hoje trava, dá retrabalho ou precisa mudar?"
              required
            />
          </div>

          <div className="project-brief__submit">
            <p>
              Nenhum dado é armazenado aqui. Ao enviar, você será direcionado ao
              WhatsApp com as respostas preenchidas.
            </p>
            <button type="submit">
              Enviar briefing no WhatsApp
              <ArrowUpRight aria-hidden="true" />
            </button>
          </div>
        </motion.form>
      </div>
    </section>
  );
}
