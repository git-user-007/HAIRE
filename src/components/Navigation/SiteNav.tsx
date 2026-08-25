import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";

const links = [
  { to: "/", label: "Home" },
  { to: "/explore", label: "Explore" },
  { to: "/stylist", label: "AI Stylist" },
  { to: "/mirror", label: "Live Mirror" },
  { to: "/looks", label: "My Looks" },
];

export function SiteNav() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
      className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-xl"
    >
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 md:px-8"
        aria-label="Main"
      >
        <Link
          to="/"
          className="text-editorial text-xl tracking-[0.22em] text-foreground md:text-2xl"
        >
          HAIR<span className="gradient-text">É</span>
        </Link>
        <ul className="flex flex-wrap items-center justify-end gap-x-5 gap-y-1 md:gap-x-8">
          {links.slice(1).map((l) => (
            <li key={l.to}>
              <Link
                to={l.to}
                activeProps={{ className: "text-foreground" }}
                className="font-sans text-[0.62rem] tracking-[0.26em] text-muted-foreground uppercase transition-colors hover:text-primary md:text-[0.68rem]"
              >
                {l.label}
              </Link>
            </li>
          ))}
          <li>
            <Link to="/finder" className="btn-ghostline hidden md:inline-flex">
              Find your hairstyle
            </Link>
          </li>
        </ul>
      </nav>
    </motion.header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 px-6 py-12 text-center">
      <p className="text-editorial text-2xl tracking-[0.2em]">
        HAIR<span className="gradient-text">É</span>
      </p>
      <p className="eyebrow mt-3">Find the hair that feels like you</p>
    </footer>
  );
}
