import { useEffect, useState } from "react";

export function PageProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const maximum =
        document.documentElement.scrollHeight - window.innerHeight;
      setProgress(maximum > 0 ? Math.min(1, window.scrollY / maximum) : 0);
    };

    const handleScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <div
      className="page-progress"
      data-testid="page-progress"
      aria-hidden="true"
    >
      <span style={{ transform: `scaleX(${progress})` }} />
    </div>
  );
}
