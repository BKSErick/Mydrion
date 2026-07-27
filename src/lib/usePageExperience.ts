import { useEffect } from "react";
import {
  initMetaPixel,
  trackMetaCustomEvent,
  trackMetaEvent
} from "./metaPixel";

const DEPTH_MILESTONES = [25, 50, 75, 90] as const;

export function usePageExperience() {
  useEffect(() => {
    initMetaPixel();

    const reachedDepths = new Set<number>();
    let frame = 0;

    const updateDepth = () => {
      frame = 0;
      const maximum =
        document.documentElement.scrollHeight - window.innerHeight;
      const depth = maximum > 0 ? (window.scrollY / maximum) * 100 : 0;

      DEPTH_MILESTONES.forEach((milestone) => {
        if (depth >= milestone && !reachedDepths.has(milestone)) {
          reachedDepths.add(milestone);
          trackMetaCustomEvent("ScrollDepth", { depth: milestone });
        }
      });
    };

    const handleScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(updateDepth);
    };

    const handleClick = (event: MouseEvent) => {
      const element = (event.target as Element | null)?.closest<HTMLElement>(
        "[data-meta-event]"
      );
      if (!element) return;

      const eventName = element?.dataset.metaEvent;

      if (
        eventName === "Contact" ||
        eventName === "Lead" ||
        eventName === "ViewContent"
      ) {
        const parameters: Record<string, string> = {};
        if (element.dataset.metaSource) {
          parameters.source = element.dataset.metaSource;
        }
        if (element.dataset.metaContent) {
          parameters.content_name = element.dataset.metaContent;
        }
        trackMetaEvent(eventName, parameters);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    document.addEventListener("click", handleClick);
    updateDepth();

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("click", handleClick);
    };
  }, []);

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const finePointer = window.matchMedia("(pointer: fine)").matches;

    if (reducedMotion || !finePointer) return;

    let current = window.scrollY;
    let target = window.scrollY;
    let frame = 0;

    const render = () => {
      current += (target - current) * 0.13;

      if (Math.abs(target - current) < 0.5) {
        current = target;
        frame = 0;
      } else {
        frame = window.requestAnimationFrame(render);
      }

      window.scrollTo(0, current);
    };

    const handleWheel = (event: WheelEvent) => {
      if (
        event.defaultPrevented ||
        event.ctrlKey ||
        Math.abs(event.deltaX) > Math.abs(event.deltaY) ||
        (event.target as Element | null)?.closest(
          ".projects__viewport, input, select, textarea"
        )
      ) {
        return;
      }

      const maximum =
        document.documentElement.scrollHeight - window.innerHeight;
      target = Math.max(0, Math.min(maximum, target + event.deltaY));
      event.preventDefault();

      if (!frame) {
        current = window.scrollY;
        frame = window.requestAnimationFrame(render);
      }
    };

    const syncPosition = () => {
      if (!frame) {
        current = window.scrollY;
        target = window.scrollY;
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("scroll", syncPosition, { passive: true });

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("scroll", syncPosition);
    };
  }, []);
}
