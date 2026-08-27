import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { SiteNav, SiteFooter } from "@/components/Navigation/SiteNav";
import { BeforeAfterSlider } from "@/components/BeforeAfter/BeforeAfterSlider";
import { hairstyles } from "@/lib/hairstyles";

export const Route = createFileRoute("/mirror")({
  head: () => ({
    meta: [
      { title: "Live Mirror — HAIRÉ" },
      {
        name: "description",
        content:
          "Upload a photo and compare it side by side with an editorial hairstyle preview in the HAIRÉ live mirror.",
      },
      { property: "og:title", content: "Live Mirror — HAIRÉ" },
      {
        property: "og:description",
        content: "See the cut before the scissors: before and after, side by side.",
      },
    ],
  }),
  component: MirrorPage,
});

function MirrorPage() {
  const [photo, setPhoto] = useState<string | null>(null);
  const [styleId, setStyleId] = useState(hairstyles[0]!.id);
  const inputRef = useRef<HTMLInputElement>(null);
  const style = hairstyles.find((h) => h.id === styleId)!;

  return (
    <div className="film-grain min-h-screen bg-background">
      <SiteNav />
      <main className="mx-auto max-w-5xl px-5 py-14 md:px-8 md:py-20">
        <p className="eyebrow">The mirror</p>
        <h1 className="text-editorial mt-3 text-5xl leading-[0.95] md:text-7xl">
          Live <span className="gradient-text">Mirror</span>
        </h1>
        <p className="mt-4 max-w-xl font-sans text-sm text-muted-foreground">
          Add your photo, pick a silhouette, then drag the divider to see the change.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) setPhoto(URL.createObjectURL(file));
            }}
          />
          <button type="button" onClick={() => inputRef.current?.click()} className="btn-ghostline">
            {photo ? "Change photo" : "Upload your photo"}
          </button>
          <select
            value={styleId}
            onChange={(e) => setStyleId(e.target.value)}
            aria-label="Choose a hairstyle"
            className="border border-border bg-card px-4 py-3 font-sans text-[0.62rem] tracking-[0.22em] text-foreground uppercase outline-none focus:border-primary"
          >
            {hairstyles.map((h) => (
              <option key={h.id} value={h.id}>
                {h.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-10">
          <BeforeAfterSlider
            before={photo ?? hairstyles[1]!.image}
            after={style.image}
            beforeAlt={photo ? "Your uploaded photo" : hairstyles[1]!.alt}
            afterAlt={style.alt}
          />
          <p className="mt-4 font-sans text-xs text-muted-foreground">
            {style.name} — {style.note}
          </p>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
