import { useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionIntro } from "../components/SectionIntro";
import { capabilities } from "../data/siteContent";

export function Capabilities() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sceneRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<Array<HTMLElement | null>>([]);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (
      import.meta.env.MODE === "test" ||
      reduceMotion ||
      window.matchMedia("(max-width: 899px)").matches
    ) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);
    const context = gsap.context(() => {
      stepRefs.current.forEach((step, index) => {
        if (!step) return;
        ScrollTrigger.create({
          trigger: step,
          start: "top center",
          end: "bottom center",
          onEnter: () => setActiveIndex(index),
          onEnterBack: () => setActiveIndex(index)
        });
      });
    }, sceneRef);

    return () => context.revert();
  }, [reduceMotion]);

  return (
    <section
      className="capabilities section-shell"
      id="capacidades"
      aria-labelledby="capabilities-title"
    >
      <SectionIntro
        id="capabilities-title"
        index="02"
        eyebrow="Capacidades"
        title={
          <>
            Uma arquitetura.
            <br />
            <span>Quatro formas de construir.</span>
          </>
        }
      />

      <div className="capabilities__scene" ref={sceneRef}>
        <div className="capabilities__visual" aria-hidden="true">
          <div className="capabilities__visual-frame">
            <span className="capabilities__visual-index">
              {capabilities[activeIndex].index}
            </span>
            <div className={`capability-symbol capability-symbol--${activeIndex}`}>
              <span />
              <span />
              <span />
              <span />
            </div>
            <p>{capabilities[activeIndex].eyebrow}</p>
          </div>
        </div>

        <div className="capabilities__steps">
          {capabilities.map((capability, index) => (
            <article
              className={`capability-step ${
                activeIndex === index ? "is-active" : ""
              }`}
              key={capability.id}
              ref={(element) => {
                stepRefs.current[index] = element;
              }}
              onMouseEnter={() => setActiveIndex(index)}
            >
              <span className="capability-step__index">{capability.index}</span>
              <div>
                <p className="capability-step__eyebrow">{capability.eyebrow}</p>
                <h3>{capability.title}</h3>
                <p className="capability-step__body">{capability.body}</p>
                <p className="capability-step__outcome">{capability.outcome}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
