import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav, SiteFooter } from "@/components/Navigation/SiteNav";
import { useLooks } from "@/hooks/useLooks";

export const Route = createFileRoute("/looks")({
  head: () => ({
    meta: [
      { title: "My Looks — HAIRÉ" },
      {
        name: "description",
        content:
          "Your saved hairstyle lookbook: every silhouette you loved, kept in one place for your next salon visit.",
      },
      { property: "og:title", content: "My Looks — HAIRÉ" },
      { property: "og:description", content: "Your personal HAIRÉ lookbook of saved hairstyles." },
    ],
  }),
  component: LooksPage,
});

function LooksPage() {
  const { looks, ready, remove } = useLooks();

  return (
    <div className="film-grain min-h-screen bg-background">
      <SiteNav />
      <main className="mx-auto max-w-7xl px-5 py-14 md:px-8 md:py-20">
        <p className="eyebrow">Your lookbook</p>
        <h1 className="text-editorial mt-3 text-5xl leading-[0.95] md:text-7xl">
          My <span className="gradient-text">Looks</span>
        </h1>

        {ready && looks.length === 0 && (
          <div className="mt-12 border border-border/70 px-6 py-16 text-center">
            <p className="font-sans text-sm text-muted-foreground">
              Nothing saved yet. Start with the gallery.
            </p>
            <Link to="/explore" className="btn-ghostline mt-6 inline-flex">
              Explore hairstyles
            </Link>
          </div>
        )}

        <div className="mt-10 grid grid-cols-2 gap-6 md:grid-cols-4">
          {looks.map((look) => (
            <article key={look.id} className="card-editorial lift">
              <div className="aspect-3/4 overflow-hidden bg-secondary/50">
                <img
                  src={look.image}
                  alt={look.name}
                  loading="lazy"
                  className="h-full w-full object-cover object-top"
                />
              </div>
              <div className="flex items-center justify-between gap-2 px-4 py-3">
                <h2 className="text-editorial text-lg">{look.name}</h2>
                <button
                  type="button"
                  onClick={() => remove(look.id)}
                  className="font-sans text-[0.58rem] tracking-[0.22em] text-muted-foreground uppercase hover:text-primary"
                >
                  Remove
                </button>
              </div>
            </article>
          ))}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
