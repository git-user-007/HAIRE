import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteNav, SiteFooter } from "@/components/Navigation/SiteNav";
import { HairstyleCard } from "@/components/HairstyleCard/HairstyleCard";
import { hairstyles } from "@/lib/hairstyles";
import { useLooks } from "@/hooks/useLooks";

export const Route = createFileRoute("/stylist")({
  head: () => ({
    meta: [
      { title: "AI Stylist — HAIRÉ" },
      {
        name: "description",
        content:
          "Describe your hair, your face shape and your mood. The HAIRÉ AI stylist suggests the cuts, colours and upkeep that fit.",
      },
      { property: "og:title", content: "AI Stylist — HAIRÉ" },
      {
        property: "og:description",
        content: "A conversational stylist that reads your brief and answers with looks.",
      },
    ],
  }),
  component: StylistPage,
});

const prompts = [
  "Round face, wavy hair, low effort",
  "Something bold for a party",
  "Office-appropriate but not boring",
  "Protective style I can keep for weeks",
];

function StylistPage() {
  const [brief, setBrief] = useState("");
  const [answered, setAnswered] = useState(false);
  const { toggle, isSaved } = useLooks();

  const picks = hairstyles.filter((h) => {
    const b = brief.toLowerCase();
    if (!b) return false;
    return (
      h.moods.some((m) => b.includes(m)) ||
      h.textures.some((t) => b.includes(t)) ||
      h.occasions.some((o) => b.includes(o)) ||
      b.includes(h.length)
    );
  });
  const shown = (picks.length ? picks : hairstyles).slice(0, 3);

  return (
    <div className="film-grain min-h-screen bg-background">
      <SiteNav />
      <main className="mx-auto max-w-4xl px-5 py-14 md:px-8 md:py-20">
        <p className="eyebrow">The stylist</p>
        <h1 className="text-editorial mt-3 text-5xl leading-[0.95] md:text-7xl">
          Tell me about <span className="gradient-text">your hair</span>
        </h1>

        <form
          className="mt-10"
          onSubmit={(e) => {
            e.preventDefault();
            setAnswered(true);
          }}
        >
          <label htmlFor="brief" className="eyebrow">
            Your brief
          </label>
          <textarea
            id="brief"
            value={brief}
            onChange={(e) => setBrief(e.target.value)}
            rows={4}
            placeholder="e.g. long wavy hair, oval face, elegant but low upkeep"
            className="mt-3 w-full resize-none border border-border bg-card px-5 py-4 font-sans text-sm text-foreground outline-none placeholder:text-muted-foreground/70 focus:border-primary"
          />
          <div className="mt-4 flex flex-wrap gap-2">
            {prompts.map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setBrief(p)}
                className="rounded-full border border-border px-4 py-2 font-sans text-[0.6rem] tracking-[0.2em] text-muted-foreground uppercase hover:border-primary hover:text-primary"
              >
                {p}
              </button>
            ))}
          </div>
          <button type="submit" className="btn-ghostline mt-8">
            Style me
          </button>
        </form>

        {answered && (
          <section className="mt-16">
            <p className="eyebrow">The stylist suggests</p>
            <p className="mt-3 max-w-xl font-sans text-sm text-muted-foreground">
              Based on your brief, these three silhouettes balance the mood you described with the
              upkeep you can live with.
            </p>
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
              {shown.map((style, i) => (
                <HairstyleCard
                  key={style.id}
                  style={style}
                  index={i}
                  saved={isSaved(style.id)}
                  onSave={(s) => toggle({ id: s.id, name: s.name, image: s.image })}
                />
              ))}
            </div>
          </section>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}
