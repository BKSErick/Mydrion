import { motion, useReducedMotion } from "framer-motion";
import { SectionIntro } from "../components/SectionIntro";
import { processSteps } from "../data/siteContent";

export function Process() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      className="process section-shell"
      id="processo"
      aria-labelledby="process-title"
    >
      <SectionIntro
        id="process-title"
        index="04"
        eyebrow="Método"
        title={
          <>
            Complexidade entra.
            <br />
            <span>Clareza sai.</span>
          </>
        }
      />

      <div className="process__layout">
        <div className="process__statement">
          <p>
            Não começamos pela ferramenta. Começamos entendendo a decisão, o fluxo e o
            resultado que o projeto precisa sustentar.
          </p>
          <span>Do problema à publicação.</span>
        </div>
        <ol className="process__steps">
          {processSteps.map((step, index) => (
            <motion.li
              key={step.index}
              initial={reduceMotion ? false : { opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.55 }}
              transition={{
                duration: reduceMotion ? 0 : 0.65,
                delay: reduceMotion ? 0 : index * 0.06
              }}
            >
              <span>{step.index}</span>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
