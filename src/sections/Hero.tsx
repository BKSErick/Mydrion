import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { ArchitectureField } from "../components/ArchitectureField";
import { ArrowLink } from "../components/ArrowLink";
import { hero, proofPoints } from "../data/siteContent";

const headlineLines = ["CONSTRUÍMOS O QUE", "NÃO EXISTE PRONTO."];

export function Hero() {
  const reduceMotion = useReducedMotion();
  const transition = reduceMotion
    ? { duration: 0 }
    : { duration: 0.9, ease: [0.22, 1, 0.36, 1] as const };

  return (
    <section className="hero" id="inicio" aria-labelledby="hero-title">
      <ArchitectureField />

      <div className="hero__content">
        <motion.p
          className="hero__eyebrow"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...transition, delay: 0.12 }}
        >
          <span aria-hidden="true">●</span>
          {hero.eyebrow}
        </motion.p>

        <h1 id="hero-title" className="hero__title" aria-label={hero.headline}>
          {headlineLines.map((line, index) => (
            <span className="hero__title-mask" aria-hidden="true" key={line}>
              <motion.span
                initial={{ y: "115%" }}
                animate={{ y: 0 }}
                transition={{ ...transition, delay: 0.18 + index * 0.11 }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.div
          className="hero__lower"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...transition, delay: 0.52 }}
        >
          <p>{hero.body}</p>
          <div className="hero__actions">
            <ArrowLink href={hero.primaryCta.href} target="_blank" rel="noreferrer">
              {hero.primaryCta.label}
            </ArrowLink>
            <ArrowLink href={hero.secondaryCta.href} variant="text">
              {hero.secondaryCta.label}
            </ArrowLink>
          </div>
        </motion.div>
      </div>

      <motion.div
        className="hero__scroll"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: reduceMotion ? 0 : 1.1, duration: 0.6 }}
      >
        <span>Explore</span>
        <ArrowDown aria-hidden="true" size={16} />
      </motion.div>

      <div className="proof-strip" aria-label="Pontos de confiança">
        {proofPoints.map((point, index) => (
          <div key={point}>
            <span aria-hidden="true">0{index + 1}</span>
            <p>{point}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
