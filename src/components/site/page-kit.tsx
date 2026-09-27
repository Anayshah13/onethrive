"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef } from "react";
import { motion } from "framer-motion";
import { aboutRoot, aboutSections } from "@/data/site";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";
import { Glow, PixelCluster } from "@/components/landing/decor";
import { ArrowUpRight } from "@/components/landing/icons";

/**
 * Top of every standalone page: breadcrumb, eyebrow, a light display heading with a serif
 * accent, and an intro. Words rise in on load. `children` renders under the intro (CTAs, tabs).
 */
export function PageHero({
  eyebrow,
  lead,
  accent,
  intro,
  crumbs = [],
  children,
}: {
  eyebrow: string;
  lead: string;
  accent: string;
  intro?: string;
  crumbs?: Array<{ label: string; href?: string }>;
  children?: React.ReactNode;
}) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const q = gsap.utils.selector(root);
      gsap
        .timeline({ defaults: { ease: "expo.out" } })
        .from(q("[data-hero-fade]"), { y: 20, autoAlpha: 0, duration: 0.9, stagger: 0.08 })
        .from(q(".hero-word"), { yPercent: 110, duration: 1.2, stagger: 0.045 }, 0.1)
        .from(q("[data-hero-after]"), { y: 28, autoAlpha: 0, filter: "blur(8px)", duration: 1.1, stagger: 0.1, clearProps: "filter" }, 0.45);
    },
    { scope: root },
  );

  const words = (text: string, className = "") =>
    text.split(" ").map((word, i) => (
      <span key={i} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
        <span className={`hero-word inline-block ${className}`}>{word}&nbsp;</span>
      </span>
    ));

  return (
    <section ref={root} className="relative isolate overflow-x-clip pt-36 pb-16 md:pt-48 md:pb-24">
      <Glow className="-z-10 -top-20 right-[8%] size-[30rem]" />
      <Glow tone="soft" className="-z-10 top-40 -left-32 size-[26rem]" />
      <PixelCluster cols={14} rows={8} seed={23} className="absolute top-24 right-0 -z-0 hidden opacity-70 md:block" />

      <div className="relative mx-auto w-full max-w-[1240px] px-5 md:px-8">
        <nav aria-label="Breadcrumb" data-hero-fade>
          <ol className="flex flex-wrap items-center gap-1.5 text-[13px] text-grey">
            <li>
              <Link href="/" className="transition-colors hover:text-emerald">
                Home
              </Link>
            </li>
            {crumbs.map((crumb) => (
              <li key={crumb.label} className="flex items-center gap-1.5">
                <span aria-hidden className="text-ink/25">/</span>
                {crumb.href ? (
                  <Link href={crumb.href} className="transition-colors hover:text-emerald">
                    {crumb.label}
                  </Link>
                ) : (
                  <span aria-current="page" className="text-ink">
                    {crumb.label}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </nav>

        <span className="eyebrow mt-8" data-hero-fade>
          {eyebrow}
        </span>
        <h1 className="mt-6 max-w-[16ch] font-display text-[clamp(2.8rem,7.2vw,6.75rem)] leading-[0.98] font-light tracking-tight text-balance">
          {words(lead)}
          {words(accent, "font-serif text-emerald italic")}
        </h1>
        {intro && (
          <p data-hero-after className="mt-7 max-w-[52ch] text-[clamp(1rem,1.4vw,1.2rem)] leading-relaxed text-ink/70">
            {intro}
          </p>
        )}
        {children && (
          <div data-hero-after className="mt-10">
            {children}
          </div>
        )}
      </div>
    </section>
  );
}

/* Pill switcher between the About sections, with a sliding mint indicator. */
export function AboutTabs({ className = "" }: { className?: string }) {
  const pathname = usePathname();
  const items = [{ ...aboutRoot, label: "Overview" }, ...aboutSections];

  return (
    <nav aria-label="About us sections" className={`-mx-5 overflow-x-auto px-5 [scrollbar-width:none] ${className}`}>
      <ul className="inline-flex gap-1 rounded-full bg-white/70 p-1.5 shadow-float ring-1 ring-ink/6 backdrop-blur">
        {items.map((item) => {
          const here = pathname === item.href;
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={here ? "page" : undefined}
                className={`relative block rounded-full px-4 py-2.5 text-[13.5px] font-medium whitespace-nowrap transition-colors duration-300 ${
                  here ? "text-ink" : "text-ink/60 hover:text-ink"
                }`}
              >
                {here && (
                  <motion.span
                    layoutId="about-tab"
                    className="absolute inset-0 rounded-full bg-mint shadow-[0_8px_20px_-10px_rgba(0,255,171,0.8)]"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative">{item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

/* Closing link to the next About section, so the four pages read as one journey. */
export function AboutNext() {
  const pathname = usePathname();
  const i = aboutSections.findIndex((s) => s.href === pathname);
  const next = aboutSections[(i + 1) % aboutSections.length];

  return (
    <section className="px-2 pb-6 md:px-3 md:pb-10">
      <Link
        href={next.href}
        className="group relative mx-auto flex max-w-[1400px] flex-col gap-8 overflow-hidden rounded-[2.25rem] bg-ink px-6 py-12 text-cream md:flex-row md:items-end md:justify-between md:rounded-[2.75rem] md:px-12 md:py-16"
      >
        <span aria-hidden className="absolute -top-24 -right-16 size-80 rounded-full bg-mint/20 blur-3xl transition-transform duration-1000 ease-out group-hover:scale-125" />
        <PixelCluster cols={12} rows={6} seed={73} className="absolute bottom-4 left-[40%] hidden opacity-20 md:block" />
        <span className="relative">
          <span className="text-xs tracking-[0.2em] text-mint uppercase">Next · {next.index}</span>
          <span className="mt-4 block font-display text-[clamp(2.4rem,6vw,5rem)] leading-none font-light tracking-tight">
            {next.label}
          </span>
          <span className="mt-4 block max-w-md text-cream/60">{next.blurb}</span>
        </span>
        <span className="relative grid size-16 shrink-0 place-items-center rounded-full bg-mint text-ink transition-transform duration-700 ease-spring group-hover:scale-110 group-hover:rotate-45 md:size-20">
          <ArrowUpRight className="size-6" />
        </span>
      </Link>
    </section>
  );
}

