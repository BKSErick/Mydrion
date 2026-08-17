import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  MoveHorizontal
} from "lucide-react";
import {
  type KeyboardEvent,
  type PointerEvent,
  useCallback,
  useEffect,
  useRef,
  useState
} from "react";
import { SectionIntro } from "../components/SectionIntro";
import { projects } from "../data/siteContent";

const DESKTOP_QUERY = "(min-width: 900px)";

type DragState = {
  active: boolean;
  moved: boolean;
  pointerId: number;
  startScroll: number;
  startX: number;
};

const initialDragState: DragState = {
  active: false,
  moved: false,
  pointerId: -1,
  startScroll: 0,
  startX: 0
};

export function Projects() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const dragState = useRef<DragState>({ ...initialDragState });
  const [activeIndex, setActiveIndex] = useState(0);
  const [canGoBack, setCanGoBack] = useState(false);
  const [canGoForward, setCanGoForward] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const updateNavigation = useCallback(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const maximum = Math.max(0, viewport.scrollWidth - viewport.clientWidth);
    const current = Math.min(maximum, Math.max(0, viewport.scrollLeft));
    const center = current + viewport.clientWidth / 2;
    const panels = Array.from(
      viewport.querySelectorAll<HTMLElement>(".project-panel")
    );

    let closestIndex = 0;
    let closestDistance = Number.POSITIVE_INFINITY;

    panels.forEach((panel, index) => {
      const panelCenter = panel.offsetLeft + panel.offsetWidth / 2;
      const distance = Math.abs(panelCenter - center);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    setActiveIndex(closestIndex);
    setCanGoBack(current > 2);
    setCanGoForward(current < maximum - 2);
    setProgress(maximum === 0 ? 0 : (current / maximum) * 100);
  }, []);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const handleWheel = (event: WheelEvent) => {
      if (!window.matchMedia(DESKTOP_QUERY).matches) return;

      const maximum = viewport.scrollWidth - viewport.clientWidth;
      const delta =
        Math.abs(event.deltaX) > Math.abs(event.deltaY)
          ? event.deltaX
          : event.deltaY;
      const canMove =
        (delta > 0 && viewport.scrollLeft < maximum - 2) ||
        (delta < 0 && viewport.scrollLeft > 2);

      if (!canMove) return;

      event.preventDefault();
      viewport.scrollLeft += delta;
    };

    const initialFrame = window.requestAnimationFrame(updateNavigation);
    viewport.addEventListener("scroll", updateNavigation, { passive: true });
    viewport.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("resize", updateNavigation);

    return () => {
      window.cancelAnimationFrame(initialFrame);
      viewport.removeEventListener("scroll", updateNavigation);
      viewport.removeEventListener("wheel", handleWheel);
      window.removeEventListener("resize", updateNavigation);
    };
  }, [updateNavigation]);

  function moveViewport(direction: -1 | 1) {
    const viewport = viewportRef.current;
    if (!viewport) return;

    viewport.scrollBy({
      left: viewport.clientWidth * 0.72 * direction,
      behavior: "smooth"
    });
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const actions: Partial<Record<string, () => void>> = {
      ArrowLeft: () => moveViewport(-1),
      ArrowRight: () => moveViewport(1),
      Home: () => viewport.scrollTo({ left: 0, behavior: "smooth" }),
      End: () =>
        viewport.scrollTo({
          left: viewport.scrollWidth,
          behavior: "smooth"
        })
    };
    const action = actions[event.key];

    if (action) {
      event.preventDefault();
      action();
    }
  }

  function handlePointerDown(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType === "mouse" && event.button !== 0) return;

    const viewport = viewportRef.current;
    if (!viewport) return;

    dragState.current = {
      active: true,
      moved: false,
      pointerId: event.pointerId,
      startScroll: viewport.scrollLeft,
      startX: event.clientX
    };
    viewport.setPointerCapture?.(event.pointerId);
    setIsDragging(true);
  }

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    const viewport = viewportRef.current;
    const drag = dragState.current;
    if (!viewport || !drag.active) return;

    const distance = event.clientX - drag.startX;
    if (Math.abs(distance) > 5) drag.moved = true;
    viewport.scrollLeft = drag.startScroll - distance;
  }

  function finishDrag(event: PointerEvent<HTMLDivElement>) {
    const viewport = viewportRef.current;
    if (!dragState.current.active) return;

    viewport?.releasePointerCapture?.(event.pointerId);
    dragState.current.active = false;
    setIsDragging(false);
  }

  return (
    <section className="projects" id="projetos" aria-labelledby="projects-title">
      <div className="projects__header section-shell">
        <SectionIntro
          id="projects-title"
          index="04"
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

      <div className="projects__controls section-shell">
        <p className="projects__hint">
          <MoveHorizontal aria-hidden="true" size={18} />
          Role, arraste ou use as setas
        </p>
        <div className="projects__counter" aria-live="polite">
          <span>0{activeIndex + 1}</span>
          <span>/</span>
          <span>0{projects.length}</span>
        </div>
        <div className="projects__buttons">
          <button
            type="button"
            aria-label="Projeto anterior"
            disabled={!canGoBack}
            onClick={() => moveViewport(-1)}
          >
            <ArrowLeft aria-hidden="true" />
          </button>
          <button
            type="button"
            aria-label="Próximo projeto"
            disabled={!canGoForward}
            onClick={() => moveViewport(1)}
          >
            <ArrowRight aria-hidden="true" />
          </button>
        </div>
      </div>

      <div
        className={`projects__viewport ${isDragging ? "is-dragging" : ""}`}
        ref={viewportRef}
        role="region"
        aria-label="Navegação horizontal dos projetos"
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={finishDrag}
        onPointerCancel={finishDrag}
        onClickCapture={(event) => {
          if (dragState.current.moved) {
            event.preventDefault();
            event.stopPropagation();
            dragState.current.moved = false;
          }
        }}
      >
        <div className="projects__track">
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
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noreferrer"
                    data-meta-event="ViewContent"
                    data-meta-source="projects"
                    data-meta-content={project.name}
                  >
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

      <div className="projects__progress" aria-hidden="true">
        <span style={{ transform: `scaleX(${progress / 100})` }} />
      </div>
    </section>
  );
}
