import { motion } from "motion/react";
import { Heart } from "lucide-react";
import type { Hairstyle } from "@/lib/hairstyles";

interface Props {
  style: Hairstyle;
  saved?: boolean;
  onSave?: (style: Hairstyle) => void;
  onSelect?: (style: Hairstyle) => void;
  index?: number;
}

export function HairstyleCard({ style, saved, onSave, onSelect, index = 0 }: Props) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.9, delay: (index % 4) * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="card-editorial lift group"
    >
      <button
        type="button"
        onClick={() => onSelect?.(style)}
        className="block w-full text-left"
        aria-label={`Preview ${style.name}`}
      >
        <div className="relative aspect-3/4 overflow-hidden bg-secondary/50">
          <img
            src={style.image}
            alt={style.alt}
            width={768}
            height={1024}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover object-top transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.07]"
          />
          <div
            className="absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
            style={{
              background:
                "linear-gradient(180deg, transparent 40%, oklch(0.19 0.015 320 / 0.72) 100%)",
            }}
          />
          <div className="absolute inset-x-0 bottom-0 translate-y-3 p-5 opacity-0 transition-all duration-700 group-hover:translate-y-0 group-hover:opacity-100">
            <p className="text-editorial text-2xl text-primary-foreground">{style.name}</p>
            <p className="mt-1 font-sans text-[0.6rem] tracking-[0.28em] text-primary-foreground/70 uppercase">
              {style.category} · {style.upkeep} upkeep
            </p>
          </div>
        </div>
      </button>
      <div className="flex items-start justify-between gap-3 px-5 py-4">
        <div>
          <h3 className="text-editorial text-xl leading-tight">{style.name}</h3>
          <p className="mt-1 max-w-[24ch] font-sans text-xs text-muted-foreground">{style.note}</p>
        </div>
        {onSave && (
          <button
            type="button"
            onClick={() => onSave(style)}
            aria-label={saved ? `Remove ${style.name} from my looks` : `Save ${style.name}`}
            aria-pressed={saved}
            className="rounded-full border border-border p-2 transition-colors hover:border-primary hover:text-primary"
          >
            <Heart className="size-4" fill={saved ? "currentColor" : "none"} />
          </button>
        )}
      </div>
    </motion.article>
  );
}
