import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { ModelCollage, type CollagePhase } from "@/components/ModelCollage/ModelCollage";

const EASE = [0.16, 1, 0.3, 1] as const;

interface Props {
  onComplete: () => void;
}

export function CinematicIntro({ onComplete }: Props) {
  const reduced = !!useReducedMotion();
  const [stage, setStage] = useState<"void" | "brand" | "collage" | "cta" | "opening">("void");
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    const at = (ms: number, fn: () => void) => timers.current.push(setTimeout(fn, ms));
    if (reduced) {
      at(200, () => setStage("brand"));
      at(500, () => setStage("collage"));
      at(900, () => setStage("cta"));
    } else {
      at(700, () => setStage("brand"));
      at(3200, () => setStage("collage"));
      at(6400, () => setStage("cta"));
    }
    return () => timers.current.forEach(clearTimeout);
  }, [reduced]);

  useEffect(() => {
    if (reduced) return;
    const onMove = (e: PointerEvent) =>
      setPointer({
        x: e.clientX / window.innerWidth - 0.5,
        y: e.clientY / window.innerHeight - 0.5,
      });
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduced]);

  const enter = useCallback(() => {
    if (stage === "opening") return;
    setStage("opening");
    setTimeout(onComplete, reduced ? 200 : 1250);
  }, [stage, onComplete, reduced]);

  const collagePhase: CollagePhase =
    stage === "void" || stage === "brand"
      ? "hidden"
      : stage === "collage"
        ? "assembling"
        : stage === "opening"
          ? "opening"
          : "settled";

  const brandUp = stage !== "void" && stage !== "brand";

  return (
    <motion.section
      className="surface-cream film-grain fixed inset-0 z-50 overflow-hidden"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: EASE }}
      aria-label="HAIRÉ introduction"
    >
      <ModelCollage phase={collagePhase} pointer={pointer} dim={stage === "cta"} />

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <AnimatePresence>
          {stage !== "void" && (
            <motion.div
              initial={{ opacity: 0, filter: "blur(24px)", scale: 1.04 }}
              animate={{
                opacity: 1,
                filter: "blur(0px)",
                scale: 1,
                y: brandUp ? (reduced ? 0 : -110) : 0,
              }}
              transition={{
                opacity: { duration: 2, ease: EASE },
                filter: { duration: 2.4, ease: EASE },
                scale: { duration: 2.4, ease: EASE },
                y: { duration: 1.8, ease: EASE },
              }}
              className="flex flex-col items-center"
            >
              <h1
                className="text-editorial text-6xl leading-none tracking-[0.16em] text-foreground sm:text-7xl md:text-[7.5rem]"
                style={{ textShadow: "0 0 42px oklch(0.72 0.16 348 / 0.35)" }}
              >
                HAIR<span className="gradient-text">É</span>
              </h1>
              <motion.p
                initial={{ opacity: 0, filter: "blur(10px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                transition={{ duration: 2, delay: reduced ? 0 : 1.1, ease: EASE }}
                className="mt-6 font-sans text-[0.7rem] tracking-[0.42em] text-muted-foreground uppercase sm:text-xs"
              >
                Find the hair that feels like you.
              </motion.p>
              <motion.div
                className="hair-rule mt-8 w-40"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.8, delay: reduced ? 0 : 1.4, ease: EASE }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {stage === "cta" && (
            <motion.div
              initial={{ opacity: 0, y: 26, filter: "blur(12px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -20, filter: "blur(12px)" }}
              transition={{ duration: 1.4, ease: EASE }}
              className="absolute bottom-[16vh] flex flex-col items-center gap-6"
            >
              <button onClick={enter} className="btn-editorial">
                Find your hairstyle
              </button>
              <p className="font-sans text-[0.68rem] tracking-[0.3em] text-muted-foreground uppercase">
                Discover a look made for you
              </p>
              <button onClick={enter} className="btn-ghostline mt-2">
                <span className="text-accent">✦</span> Enter the mirror{" "}
                <span className="text-accent">✦</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* opening iris */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: stage === "opening" ? 1 : 0 }}
        transition={{ duration: 1.1, ease: EASE }}
        style={{ background: "var(--gradient-veil)" }}
      />
    </motion.section>
  );
}
