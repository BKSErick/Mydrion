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
  return (
    <header className={`section-intro section-intro--${tone}`}>
      <div className="section-intro__meta">
        <span>{index}</span>
        <span>{eyebrow}</span>
      </div>
      <h2 id={id}>{title}</h2>
    </header>
  );
}
