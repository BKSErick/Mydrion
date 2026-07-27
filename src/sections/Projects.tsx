import { useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionIntro } from "../components/SectionIntro";
import { projects } from "../data/siteContent";

export function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (
      !section ||
      !track ||
      import.meta.env.MODE === "test" ||
      reduceMotion ||
      window.matchMedia("(max-width: 899px)").matches
    ) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);
    const context = gsap.context(() => {
      const overflow = () => Math.max(0, track.scrollWidth - window.innerWidth + 48);

      gsap.to(track, {
        x: () => -overflow(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${overflow() + window.innerHeight * 0.8}`,
          scrub: 0.7,
          pin: true,
          invalidateOnRefresh: true
        }
      });
    }, section);

    return () => context.revert();
  }, [reduceMotion]);

  return (
    <section
      className="projects"
      id="projetos"
      ref={sectionRef}
      aria-labelledby="projects-title"
    >
      <div className="projects__header section-shell">
        <SectionIntro
          id="projects-title"
          index="03"
          eyebrow="Trabalho em movimento"
          tone="light"
          title={
            <>
              Projetos que saíram
              <br />
              <span>do campo das ideias.</span>
            </>
          }
        />
        <p>
          Produtos próprios, sistemas operacionais e presenças digitais construídos
          para contextos reais.
        </p>
      </div>

      <div className="projects__viewport">
        <div className="projects__track" ref={trackRef}>
          {projects.map((project, index) => (
            <article className="project-panel" key={project.name}>
              <div className="project-panel__meta">
                <span>0{index + 1}</span>
                <span>{project.type}</span>
              </div>
              <div className="project-panel__body">
                <h3>{project.name}</h3>
                <p>{project.statement}</p>
              </div>
              <div className="project-panel__footer">
                <ul aria-label={`Áreas do projeto ${project.name}`}>
                  {project.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
                {"href" in project ? (
                  <a href={project.href} target="_blank" rel="noreferrer">
                    {project.linkLabel}
                    <ArrowUpRight aria-hidden="true" size={18} />
                  </a>
                ) : (
                  <span>{project.status}</span>
                )}
              </div>
              <div className="project-panel__graphic" aria-hidden="true">
                <span />
                <span />
                <span />
              </div>
            </article>
          ))}
          <div className="projects__closing" aria-hidden="true">
            <img src="/brand/mydrion-mark.svg" alt="" />
            <p>Próximo projeto:</p>
            <strong>o seu.</strong>
          </div>
        </div>
      </div>
    </section>
  );
}
