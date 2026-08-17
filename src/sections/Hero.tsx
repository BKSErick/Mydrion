import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { useEffect } from "react";
import { ArchitectureField } from "../components/ArchitectureField";
import { ArrowLink } from "../components/ArrowLink";
import { hero, proofPoints } from "../data/siteContent";

const headlineLines = [
  "A GENTE ORGANIZA O COMERCIAL",
  "E A OPERAÇÃO DE QUEM FABRICA."
];
const easeOut = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const motionEnabled = true;
  const motionKey = "hero-motion-on";

  useEffect(() => {
    document.body.classList.add("motion-override");
    return () => document.body.classList.remove("motion-override");
  }, []);

  return (
    <section className="hero" id="inicio" aria-labelledby="hero-title">
      <ArchitectureField
        key={`architecture-${motionKey}`}
        motionEnabled={motionEnabled}
      />

      <div className="hero__content" key={`content-${motionKey}`}>
        <motion.p
          className="hero__eyebrow"
          initial={motionEnabled ? { opacity: 0, y: 18 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: motionEnabled ? 0.68 : 0,
            delay: motionEnabled ? 0.12 : 0,
            ease: easeOut
          }}
        >
          <span aria-hidden="true">●</span>
          {hero.eyebrow}
        </motion.p>

        <h1 id="hero-title" className="hero__title" aria-label={hero.headline}>
          {headlineLines.map((line, index) => (
            <span className="hero__title-mask" aria-hidden="true" key={line}>
              <motion.span
                className="hero__title-line"
                initial={
                  motionEnabled
                    ? { y: "125%", opacity: 0, filter: "blur(10px)" }
                    : false
                }
                animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                transition={{
                  duration: motionEnabled ? 1.12 : 0,
                  delay: motionEnabled ? 0.28 + index * 0.16 : 0,
                  ease: easeOut
                }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>

        <div className="hero__lower">
          <motion.p
            initial={motionEnabled ? { opacity: 0, x: -24 } : false}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: motionEnabled ? 0.8 : 0,
              delay: motionEnabled ? 0.78 : 0,
              ease: easeOut
            }}
          >
            {hero.body}
          </motion.p>
          <motion.div
            className="hero__actions"
            initial={motionEnabled ? { opacity: 0, y: 22 } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: motionEnabled ? 0.78 : 0,
              delay: motionEnabled ? 0.94 : 0,
              ease: easeOut
            }}
          >
            <ArrowLink
              href={hero.primaryCta.href}
              data-meta-event="Contact"
              data-meta-source="hero"
            >
              {hero.primaryCta.label}
            </ArrowLink>
            <ArrowLink href={hero.secondaryCta.href} variant="text">
              {hero.secondaryCta.label}
            </ArrowLink>
          </motion.div>
        </div>
      </div>

      <motion.div
        key={`scroll-${motionKey}`}
        className="hero__scroll"
        initial={motionEnabled ? { opacity: 0, y: -8 } : false}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: motionEnabled ? 1.28 : 0,
          duration: motionEnabled ? 0.6 : 0
        }}
      >
        <span>Explore</span>
        <ArrowDown aria-hidden="true" size={16} />
      </motion.div>

      <motion.div
        key={`proof-${motionKey}`}
        className="proof-strip"
        aria-label="Pontos de confiança"
        initial={motionEnabled ? { opacity: 0, y: "100%" } : false}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: motionEnabled ? 0.82 : 0,
          delay: motionEnabled ? 1.08 : 0,
          ease: easeOut
        }}
      >
        {proofPoints.map((point, index) => (
          <motion.div
            key={point}
            initial={motionEnabled ? { opacity: 0, x: -16 } : false}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: motionEnabled ? 0.52 : 0,
              delay: motionEnabled ? 1.32 + index * 0.09 : 0
            }}
          >
            <span aria-hidden="true">0{index + 1}</span>
            <p>{point}</p>
          </motion.div>
        ))}
      </motion.div>

    </section>
  );
}
