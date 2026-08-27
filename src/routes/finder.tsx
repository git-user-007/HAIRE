import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SiteNav, SiteFooter } from "@/components/Navigation/SiteNav";
import { HairstyleCard } from "@/components/HairstyleCard/HairstyleCard";
import {
  hairstyles,
  type Length,
  type Mood,
  type Occasion,
  type Texture,
  type Upkeep,
} from "@/lib/hairstyles";
import { useLooks } from "@/hooks/useLooks";

export const Route = createFileRoute("/finder")({
  head: () => ({
    meta: [
      { title: "Hairstyle Finder — HAIRÉ" },
      {
        name: "description",
        content:
          "Answer four questions about your texture, length, mood and upkeep and HAIRÉ matches you with the hairstyles that fit your life.",
      },
      { property: "og:title", content: "Hairstyle Finder — HAIRÉ" },
      {
        property: "og:description",
        content: "Four questions. A shortlist of hairstyles that actually suit you.",
      },
    ],
  }),
  component: FinderPage,
});

const steps = [
  {
    key: "texture" as const,
    label: "Your natural texture",
    options: ["straight", "wavy", "curly", "coily"] as Texture[],
  },
  {
    key: "length" as const,
    label: "Length you want",
    options: ["short", "medium", "long"] as Length[],
  },
  {
    key: "mood" as const,
    label: "The mood",
    options: ["minimal", "elegant", "soft", "trendy", "bold", "edgy"] as Mood[],
  },
  {
    key: "upkeep" as const,
    label: "Upkeep you'll accept",
    options: ["low", "medium", "high"] as Upkeep[],
  },
  {
    key: "occasion" as const,
    label: "Mostly for",
    options: ["everyday", "college", "professional", "party", "event"] as Occasion[],
  },
];

type Answers = Partial<Record<(typeof steps)[number]["key"], string>>;

function score(style: (typeof hairstyles)[number], a: Answers) {
  let s = 0;
  if (a.texture && style.textures.includes(a.texture as Texture)) s += 3;
  if (a.length && style.length === a.length) s += 3;
  if (a.mood && style.moods.includes(a.mood as Mood)) s += 2;
  if (a.upkeep && style.upkeep === a.upkeep) s += 2;
  if (a.occasion && style.occasions.includes(a.occasion as Occasion)) s += 2;
  return s;
}

function FinderPage() {
  const [answers, setAnswers] = useState<Answers>({});
  const [done, setDone] = useState(false);
  const { toggle, isSaved } = useLooks();

  const matches = useMemo(
    () =>
      [...hairstyles]
        .map((h) => ({ h, s: score(h, answers) }))
        .sort((x, y) => y.s - x.s)
        .slice(0, 4)
        .map((x) => x.h),
    [answers],
  );

  return (
    <div className="film-grain min-h-screen bg-background">
      <SiteNav />
      <main className="mx-auto max-w-5xl px-5 py-14 md:px-8 md:py-20">
        <p className="eyebrow">The finder</p>
        <h1 className="text-editorial mt-3 text-5xl leading-[0.95] md:text-7xl">
          Find the hair that <span className="gradient-text">feels like you</span>
        </h1>

        <div className="mt-12 space-y-10">
          {steps.map((step) => (
            <fieldset key={step.key}>
              <legend className="eyebrow">{step.label}</legend>
              <div className="mt-4 flex flex-wrap gap-2">
                {step.options.map((opt) => {
                  const active = answers[step.key] === opt;
                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={() =>
                        setAnswers((prev) => ({ ...prev, [step.key]: active ? undefined : opt }))
                      }
                      aria-pressed={active}
                      className={`rounded-full border px-5 py-2.5 font-sans text-[0.62rem] tracking-[0.24em] uppercase transition-colors ${
                        active
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border text-muted-foreground hover:border-primary hover:text-primary"
                      }`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
            </fieldset>
          ))}
        </div>

        <button type="button" onClick={() => setDone(true)} className="btn-ghostline mt-12">
          Reveal my matches
        </button>

        {done && (
          <section className="mt-16">
            <p className="eyebrow">Your shortlist</p>
            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {matches.map((style, i) => (
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
