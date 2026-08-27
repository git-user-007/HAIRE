import { createFileRoute, Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { CinematicIntro } from "@/components/IntroAnimation/CinematicIntro";
import { SiteNav, SiteFooter } from "@/components/Navigation/SiteNav";
import { HairstyleCard } from "@/components/HairstyleCard/HairstyleCard";
import { hairstyles } from "@/lib/hairstyles";
import { useLooks } from "@/hooks/useLooks";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "HAIRÉ — Find the hair that feels like you" },
      {
        name: "description",
        content:
          "HAIRÉ is a cinematic AI hairstyle discovery experience: explore editorial looks, get styled by AI, and preview cuts in the live mirror.",
      },
      { property: "og:title", content: "HAIRÉ — Find the hair that feels like you" },
      {
        property: "og:description",
        content:
          "A luxury AI hairstyle experience: editorial gallery, AI stylist, live mirror and your own lookbook.",
      },
    ],
  }),
  component: Home,
});

const chapters = [
  {
    eyebrow: "01 — Explore",
    title: "An editorial gallery",
    copy: "Ten signature silhouettes, shot like a campaign. Filter by texture, mood and upkeep.",
    to: "/explore" as const,
    cta: "Enter the gallery",
  },
  {
    eyebrow: "02 — Stylist",
    title: "Styled by AI",
    copy: "Describe your hair, your face, your mood. Get a considered shortlist, not a random grid.",
    to: "/stylist" as const,
    cta: "Meet the stylist",
  },
  {
    eyebrow: "03 — Mirror",
    title: "See it before the scissors",
    copy: "Upload a photo and drag between before and after in the live mirror.",
    to: "/mirror" as const,
    cta: "Open the mirror",
  },
];

function Home() {
  const [introDone, setIntroDone] = useState(false);
  const { toggle, isSaved } = useLooks();

  return (
    <>
      <AnimatePresence>
        {!introDone && <CinematicIntro onComplete={() => setIntroDone(true)} />}
      </AnimatePresence>

      <div className="film-grain min-h-screen bg-background">
        <SiteNav />
        <main>
          <section className="mx-auto max-w-7xl px-5 pt-16 pb-24 md:px-8 md:pt-24">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2 }}
              className="eyebrow"
            >
              AI hairstyle discovery
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
              className="text-editorial mt-4 max-w-4xl text-5xl leading-[0.92] md:text-8xl"
            >
              Find the hair that <span className="gradient-text">feels like you</span>
            </motion.h1>
            <p className="mt-6 max-w-xl font-sans text-sm text-muted-foreground md:text-base">
              HAIRÉ is part fashion editorial, part AI stylist. Discover the cut, test it on your own
              face, and keep the ones that feel right.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link to="/finder" className="btn-ghostline">
                Find your hairstyle
              </Link>
              <Link
                to="/explore"
                className="font-sans text-[0.62rem] tracking-[0.26em] text-muted-foreground uppercase underline-offset-8 transition-colors hover:text-primary hover:underline"
              >
                Or browse the gallery
              </Link>
            </div>
          </section>

          <section className="border-y border-border/60">
            <div className="mx-auto grid max-w-7xl grid-cols-1 md:grid-cols-3">
              {chapters.map((c) => (
                <article
                  key={c.title}
                  className="border-border/60 px-6 py-12 md:border-r md:px-8 md:py-16 md:last:border-r-0"
                >
                  <p className="eyebrow">{c.eyebrow}</p>
                  <h2 className="text-editorial mt-3 text-3xl leading-tight md:text-4xl">
                    {c.title}
                  </h2>
                  <p className="mt-3 font-sans text-sm text-muted-foreground">{c.copy}</p>
                  <Link
                    to={c.to}
                    className="mt-6 inline-block font-sans text-[0.6rem] tracking-[0.26em] text-foreground uppercase underline-offset-8 hover:text-primary hover:underline"
                  >
                    {c.cta}
                  </Link>
                </article>
              ))}
            </div>
          </section>

          <section className="mx-auto max-w-7xl px-5 py-20 md:px-8">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="eyebrow">The lookbook</p>
                <h2 className="text-editorial mt-3 text-4xl md:text-6xl">Signature silhouettes</h2>
              </div>
              <Link to="/explore" className="btn-ghostline">
                See all
              </Link>
            </div>
            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {hairstyles.slice(0, 8).map((style, i) => (
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
        </main>
        <SiteFooter />
      </div>
    </>
  );
}
