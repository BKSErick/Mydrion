import { useRef } from "react";

export function ArchitectureField() {
  const fieldRef = useRef<HTMLDivElement>(null);

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    const field = fieldRef.current;
    if (!field) return;

    const bounds = field.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width) * 100;
    const y = ((event.clientY - bounds.top) / bounds.height) * 100;

    field.style.setProperty("--pointer-x", `${x}%`);
    field.style.setProperty("--pointer-y", `${y}%`);
  }

  return (
    <div
      ref={fieldRef}
      className="architecture-field"
      aria-hidden="true"
      onPointerMove={handlePointerMove}
    >
      <div className="architecture-field__glow" />
      <svg viewBox="0 0 760 760" role="presentation">
        <g className="architecture-field__grid">
          <path d="M0 80H760M0 200H760M0 320H760M0 440H760M0 560H760M0 680H760" />
          <path d="M80 0V760M200 0V760M320 0V760M440 0V760M560 0V760M680 0V760" />
        </g>
        <g className="architecture-field__orbits">
          <circle cx="380" cy="380" r="254" />
          <circle cx="380" cy="380" r="154" />
          <path d="M126 380H634M380 126V634" />
          <path d="M200 200L560 560M560 200L200 560" />
        </g>
        <g className="architecture-field__nodes">
          <circle cx="380" cy="126" r="5" />
          <circle cx="560" cy="200" r="5" />
          <circle cx="634" cy="380" r="5" />
          <circle cx="560" cy="560" r="5" />
          <circle cx="380" cy="634" r="5" />
          <circle cx="200" cy="560" r="5" />
          <circle cx="126" cy="380" r="5" />
          <circle cx="200" cy="200" r="5" />
        </g>
      </svg>
      <div className="architecture-field__mark">
        <img src="/brand/mydrion-mark.svg" alt="" />
      </div>
      <span className="architecture-field__coordinate architecture-field__coordinate--top">
        M / 01
      </span>
      <span className="architecture-field__coordinate architecture-field__coordinate--bottom">
        19°55′S / 43°56′W
      </span>
    </div>
  );
}
