import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type SectionIntroProps = {
  id?: string;
  index: string;
  eyebrow: string;
  title: ReactNode;
  tone?: "dark" | "light";
};

export function SectionIntro({
  id,
  index,
  eyebrow,
  title,
  tone = "dark"
}: SectionIntroProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.header
      className={`section-intro section-intro--${tone}`}
      initial={reduceMotion ? false : { opacity: 0, y: 34 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{
        duration: reduceMotion ? 0 : 0.75,
        ease: [0.22, 1, 0.36, 1]
      }}
    >
      <div className="section-intro__meta">
        <span>{index}</span>
        <span>{eyebrow}</span>
      </div>
      <h2 id={id}>{title}</h2>
    </motion.header>
  );
}
