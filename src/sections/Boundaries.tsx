import { motion, useReducedMotion } from "framer-motion";
import { Check, X } from "lucide-react";
import { SectionIntro } from "../components/SectionIntro";
import { boundaries } from "../data/siteContent";

export function Boundaries() {
  const reduceMotion = useReducedMotion();

  const columns = [
    { key: "fits", tone: "fits", data: boundaries.fits },
    { key: "does-not-fit", tone: "out", data: boundaries.doesNotFit }
  ] as const;

  return (
    <section
      className="boundaries section-shell"
      id="escopo"
      aria-labelledby="boundaries-title"
    >
      <SectionIntro
        id="boundaries-title"
        index="03"
        eyebrow="Escopo"
        title={
          <>
            Onde a gente entra,
            <br />
            <span>e onde não entra.</span>
          </>
        }
      />

      <p className="boundaries__intro">{boundaries.intro}</p>

      <div className="boundaries__grid">
        {columns.map((column, columnIndex) => (
          <motion.div
            className={`boundary-card boundary-card--${column.tone}`}
            key={column.key}
            initial={reduceMotion ? false : { opacity: 0, y: 34 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: reduceMotion ? 0 : 0.7,
              delay: reduceMotion ? 0 : columnIndex * 0.08,
              ease: [0.22, 1, 0.36, 1]
            }}
          >
            <h3 className="boundary-card__title">{column.data.title}</h3>
            <ul className="boundary-card__list">
              {column.data.items.map((item) => (
                <li key={item}>
                  {column.tone === "fits" ? (
                    <Check aria-hidden="true" size={17} />
                  ) : (
                    <X aria-hidden="true" size={17} />
                  )}
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
