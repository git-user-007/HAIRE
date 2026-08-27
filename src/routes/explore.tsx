import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SiteNav, SiteFooter } from "@/components/Navigation/SiteNav";
import { HairstyleCard } from "@/components/HairstyleCard/HairstyleCard";
import { categories, hairstyles } from "@/lib/hairstyles";
import { useLooks } from "@/hooks/useLooks";

export const Route = createFileRoute("/explore")({
  head: () => ({
    meta: [
      { title: "Explore Hairstyles — HAIRÉ" },
      {
        name: "description",
        content:
          "Browse an editorial gallery of bobs, lobs, wolf cuts, braids, curls and curtain bangs. Save the looks that feel like you.",
      },
      { property: "og:title", content: "Explore Hairstyles — HAIRÉ" },
      {
        property: "og:description",
        content: "An editorial gallery of hairstyles, curated by texture, mood and upkeep.",
      },
    ],
  }),
  component: ExplorePage,
});

function ExplorePage() {
  const [cat, setCat] = useState("All");
  const { toggle, isSaved } = useLooks();

  const visible = useMemo(
    () => (cat === "All" ? hairstyles : hairstyles.filter((h) => h.category === cat)),
    [cat],
  );

  return (
    <div className="film-grain min-h-screen bg-background">
      <SiteNav />
      <main className="mx-auto max-w-7xl px-5 py-14 md:px-8 md:py-20">
        <p className="eyebrow">The gallery</p>
        <h1 className="text-editorial mt-3 text-5xl leading-[0.95] md:text-7xl">
          Explore <span className="gradient-text">every silhouette</span>
        </h1>
        <p className="mt-4 max-w-xl font-sans text-sm text-muted-foreground">
          Ten signature directions, shot like a campaign. Tap a look to see the detail, or save it to
          My Looks.
        </p>

        <div className="mt-10 flex flex-wrap gap-2" role="tablist" aria-label="Hairstyle categories">
          {categories.map((c) => (
            <button
              key={c}
              role="tab"
              aria-selected={cat === c}
              onClick={() => setCat(c)}
              className={`rounded-full border px-4 py-2 font-sans text-[0.62rem] tracking-[0.24em] uppercase transition-colors ${
                cat === c
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border text-muted-foreground hover:border-primary hover:text-primary"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {visible.map((style, i) => (
            <HairstyleCard
              key={style.id}
              style={style}
              index={i}
              saved={isSaved(style.id)}
              onSave={(s) => toggle({ id: s.id, name: s.name, image: s.image })}
            />
          ))}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
