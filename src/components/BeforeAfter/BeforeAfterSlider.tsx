import { useCallback, useRef, useState } from "react";

interface Props {
  before: string;
  after: string;
  beforeAlt?: string;
  afterAlt?: string;
}

export function BeforeAfterSlider({
  before,
  after,
  beforeAlt = "Original photo",
  afterAlt = "Photo with the new hairstyle",
}: Props) {
  const [pos, setPos] = useState(50);
  const ref = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const move = useCallback((clientX: number) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setPos(Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100)));
  }, []);

  return (
    <div
      ref={ref}
      className="relative aspect-3/4 w-full overflow-hidden rounded-sm select-none"
      onPointerDown={(e) => {
        dragging.current = true;
        move(e.clientX);
      }}
      onPointerMove={(e) => dragging.current && move(e.clientX)}
      onPointerUp={() => (dragging.current = false)}
      onPointerLeave={() => (dragging.current = false)}
    >
      <img src={before} alt={beforeAlt} className="absolute inset-0 h-full w-full object-cover" />
      <img
        src={after}
        alt={afterAlt}
        className="absolute inset-0 h-full w-full object-cover"
        style={{ clipPath: `inset(0 0 0 ${pos}%)` }}
      />
      <div
        className="pointer-events-none absolute top-0 bottom-0 w-px bg-accent"
        style={{ left: `${pos}%` }}
      >
        <span className="absolute top-1/2 left-1/2 flex size-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-accent bg-background/80 font-sans text-[0.6rem] tracking-[0.1em] backdrop-blur">
          ⇆
        </span>
      </div>
      <input
        type="range"
        min={0}
        max={100}
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        aria-label="Compare before and after"
        className="absolute bottom-3 left-1/2 w-2/3 -translate-x-1/2 accent-primary"
      />
      <span className="absolute top-3 left-3 font-sans text-[0.55rem] tracking-[0.28em] text-primary-foreground uppercase mix-blend-difference">
        Before
      </span>
      <span className="absolute top-3 right-3 font-sans text-[0.55rem] tracking-[0.28em] text-primary-foreground uppercase mix-blend-difference">
        After
      </span>
    </div>
  );
}
