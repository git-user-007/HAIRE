import { motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { collageFigures, type CollageFigure } from "./collage-data";

export type CollagePhase = "hidden" | "assembling" | "settled" | "opening";

interface Props {
  phase: CollagePhase;
  /** normalized cursor offset, -0.5..0.5 */
  pointer: { x: number; y: number };
  dim?: boolean;
}

const EASE = [0.16, 1, 0.3, 1] as const;

function useIsNarrow() {
  const [narrow, setNarrow] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setNarrow(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return narrow;
}

function Figure({
  fig,
  phase,
  pointer,
  reduced,
}: {
  fig: CollageFigure;
  phase: CollagePhase;
  pointer: { x: number; y: number };
  reduced: boolean;
}) {
  const offscreen = fig.side === "left" ? -60 : 60;
  const parallax = reduced ? 0 : fig.depth * 10;

  const target =
    phase === "hidden"
      ? { x: `${offscreen}vw`, opacity: 0, scale: 1.06, filter: "blur(14px)" }
      : phase === "opening"
        ? {
            x: `${offscreen * 1.4}vw`,
            opacity: 0,
            scale: 1.1,
            filter: "blur(10px)",
          }
        : {
            x: pointer.x * parallax,
            y: pointer.y * parallax * 0.6,
            opacity: fig.opacity ?? 1,
            scale: 1,
            filter: "blur(0px)",
          };

  return (
    <motion.div
      className="pointer-events-none absolute will-change-transform"
      style={{
        left: `${fig.left}%`,
        top: `${fig.top}%`,
        width: `${fig.width}vw`,
        minWidth: 150,
        zIndex: fig.depth,
        rotate: `${fig.rotate}deg`,
      }}
      initial={{ x: `${offscreen}vw`, opacity: 0, scale: 1.06, filter: "blur(14px)" }}
      animate={target}
      transition={
        reduced
          ? { duration: 0.4 }
          : {
              duration: phase === "opening" ? 1.1 : 1.9,
              delay: phase === "assembling" ? fig.delay : 0,
              ease: EASE,
            }
      }
    >
      <motion.img
        src={fig.src}
        alt={fig.alt}
        width={768}
        height={1024}
        loading={fig.delay > 0.5 ? "lazy" : "eager"}
        decoding="async"
        draggable={false}
        className="h-auto w-full select-none object-contain"
        style={{ filter: "drop-shadow(0 30px 45px oklch(0.35 0.12 340 / 0.28))" }}
        animate={
          reduced || phase !== "settled"
            ? {}
            : { y: [0, -10, 0], rotate: [0, fig.rotate > 0 ? 0.6 : -0.6, 0] }
        }
        transition={{
          duration: 9 + fig.depth * 1.6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: fig.delay,
        }}
      />
    </motion.div>
  );
}

export function ModelCollage({ phase, pointer, dim = false }: Props) {
  const reduced = !!useReducedMotion();
  const narrow = useIsNarrow();
  const figures = narrow ? collageFigures.filter((f) => f.mobile) : collageFigures;

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden={phase === "hidden"}>
      {figures.map((fig) => (
        <Figure key={fig.id} fig={fig} phase={phase} pointer={pointer} reduced={reduced} />
      ))}
      <motion.div
        className="pointer-events-none absolute inset-0 z-[5]"
        style={{
          background:
            "radial-gradient(58% 48% at 50% 52%, oklch(0.975 0.012 60 / 0.94) 0%, oklch(0.975 0.012 60 / 0.55) 45%, transparent 78%)",
          backdropFilter: "blur(2px)",
        }}
        animate={{ opacity: dim ? 1 : 0 }}
        transition={{ duration: 1.6, ease: EASE }}
      />
    </div>
  );
}
