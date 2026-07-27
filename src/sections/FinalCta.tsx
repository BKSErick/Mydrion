import { motion, useReducedMotion } from "framer-motion";
import { ArrowLink } from "../components/ArrowLink";
import { contactHref } from "../data/siteContent";

export function FinalCta() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="final-cta" aria-labelledby="final-cta-title">
      <div className="final-cta__lines" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
      </div>
      <motion.div
        className="final-cta__content"
        initial={reduceMotion ? false : { opacity: 0, y: 36 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: reduceMotion ? 0 : 0.8 }}
      >
        <p>Tem um problema que nenhuma ferramenta pronta resolveu?</p>
        <h2 id="final-cta-title">
          Então talvez seja hora
          <br />
          <span>de construir a certa.</span>
        </h2>
        <ArrowLink href={contactHref} target="_blank" rel="noreferrer">
          Mapear meu projeto
        </ArrowLink>
      </motion.div>
    </section>
  );
}
