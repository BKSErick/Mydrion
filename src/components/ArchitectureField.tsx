import { motion } from "framer-motion";
import { useRef } from "react";

type ArchitectureFieldProps = {
  motionEnabled?: boolean;
};

const nodes = [
  [380, 126],
  [560, 200],
  [634, 380],
  [560, 560],
  [380, 634],
  [200, 560],
  [126, 380],
  [200, 200]
] as const;

const easeOut = [0.22, 1, 0.36, 1] as const;

export function ArchitectureField({
  motionEnabled = true
}: ArchitectureFieldProps) {
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

  const lineInitial = motionEnabled
    ? { opacity: 0, pathLength: 0 }
    : false;

  return (
    <div
      ref={fieldRef}
      className="architecture-field"
      data-testid="hero-architecture"
      data-motion={motionEnabled ? "full" : "reduced"}
      aria-hidden="true"
      onPointerMove={handlePointerMove}
    >
      <div className="architecture-field__glow" />
      <div
        className="architecture-field__sweep"
        data-testid="hero-line-sweep"
      />

      <svg viewBox="0 0 760 760" role="presentation">
        <motion.g
          className="architecture-field__grid"
          initial={motionEnabled ? { opacity: 0 } : false}
          animate={{ opacity: 1 }}
          transition={{ duration: motionEnabled ? 1.1 : 0, delay: 0.05 }}
        >
          <path d="M0 80H760M0 200H760M0 320H760M0 440H760M0 560H760M0 680H760" />
          <path d="M80 0V760M200 0V760M320 0V760M440 0V760M560 0V760M680 0V760" />
        </motion.g>

        <g className="architecture-field__orbits">
          <motion.circle
            cx="380"
            cy="380"
            r="254"
            initial={lineInitial}
            animate={{ opacity: 1, pathLength: 1 }}
            transition={{ duration: motionEnabled ? 1.55 : 0, ease: easeOut }}
          />
          <motion.circle
            cx="380"
            cy="380"
            r="154"
            initial={lineInitial}
            animate={{ opacity: 1, pathLength: 1 }}
            transition={{
              duration: motionEnabled ? 1.25 : 0,
              delay: motionEnabled ? 0.22 : 0,
              ease: easeOut
            }}
          />
          <motion.path
            d="M126 380H634M380 126V634"
            initial={lineInitial}
            animate={{ opacity: 1, pathLength: 1 }}
            transition={{
              duration: motionEnabled ? 1.05 : 0,
              delay: motionEnabled ? 0.32 : 0,
              ease: easeOut
            }}
          />
          <motion.path
            d="M200 200L560 560M560 200L200 560"
            initial={lineInitial}
            animate={{ opacity: 1, pathLength: 1 }}
            transition={{
              duration: motionEnabled ? 1.05 : 0,
              delay: motionEnabled ? 0.45 : 0,
              ease: easeOut
            }}
          />
        </g>

        <g
          className="architecture-field__tracers"
          data-testid="hero-line-tracer"
        >
          <circle cx="380" cy="380" r="254" />
          <circle cx="380" cy="380" r="154" />
        </g>

        <g className="architecture-field__nodes">
          {nodes.map(([cx, cy], index) => (
            <motion.circle
              key={`${cx}-${cy}`}
              cx={cx}
              cy={cy}
              initial={
                motionEnabled ? { opacity: 0, r: 0 } : { opacity: 1, r: 5 }
              }
              animate={{ opacity: 1, r: 5 }}
              transition={{
                duration: motionEnabled ? 0.5 : 0,
                delay: motionEnabled ? 0.62 + index * 0.075 : 0,
                ease: easeOut
              }}
            />
          ))}
        </g>
      </svg>

      <div className="architecture-field__mark-position">
        <motion.div
          className="architecture-field__mark"
          data-testid="hero-mark-reveal"
          initial={
            motionEnabled
              ? { opacity: 0, scale: 0.65, filter: "blur(18px)" }
              : false
          }
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{
            duration: motionEnabled ? 0.95 : 0,
            delay: motionEnabled ? 0.68 : 0,
            ease: easeOut
          }}
        >
          <span />
          <span />
          <img src="/brand/mydrion-mark.svg" alt="" />
        </motion.div>
      </div>

      <motion.span
        className="architecture-field__coordinate architecture-field__coordinate--top"
        initial={motionEnabled ? { opacity: 0, x: 12 } : false}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: motionEnabled ? 0.6 : 0, delay: 0.9 }}
      >
        M / 01
      </motion.span>
      <motion.span
        className="architecture-field__coordinate architecture-field__coordinate--bottom"
        initial={motionEnabled ? { opacity: 0, x: 12 } : false}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: motionEnabled ? 0.6 : 0, delay: 1.02 }}
      >
        19°55′S / 43°56′W
      </motion.span>
    </div>
  );
}
