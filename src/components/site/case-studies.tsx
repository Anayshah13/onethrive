"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { caseCategories, caseStudies, type CaseCategory } from "@/data/case-studies";
import { Glow, PixelCluster } from "@/components/landing/decor";
import { Chevron, Star } from "@/components/landing/icons";
import { Reveal } from "@/components/landing/reveal";
import { EASE_OUT } from "@/lib/gsap";
import { PillButton } from "@/components/landing/ui";
import { AboutNext, AboutTabs, PageHero } from "@/components/site/page-kit";

const [featuredCase, ...restCases] = caseStudies;

export function CaseStudies() {
  const [filter, setFilter] = useState<"All" | CaseCategory>("All");
  const visible = filter === "All" ? restCases : restCases.filter((study) => study.category === filter);

  return (
    <>
      <PageHero
        eyebrow="Case studies"
        lead="Real briefs."
        accent="Real rooms."
        crumbs={[{ label: "About us", href: "/about-us" }, { label: "Case studies" }]}
      >
        <AboutTabs />
      </PageHero>

      <section className="relative isolate overflow-x-clip px-5 pb-4 md:px-8">
        <div className="mx-auto w-full max-w-[1240px]">
          <FilterPills active={filter} onChange={setFilter} />
        </div>
      </section>

      <FeaturedCase />

      <div className="flex flex-col gap-4 py-8 md:gap-8 md:py-12">
        {visible.map((study, index) => (
          <EditorialCase key={study.slug} study={study} reversed={index % 2 === 1} />
        ))}
        {visible.length === 0 && (
          <p className="mx-auto w-full max-w-[1240px] px-5 py-16 text-center text-ink/60 md:px-8">
            No case studies in that category yet.
          </p>
        )}
      </div>

      <section className="relative isolate overflow-x-clip px-2 py-16 md:px-3 md:py-24">
        <Reveal className="mx-auto flex max-w-[1240px] flex-col items-center gap-6 rounded-[2.25rem] bg-ink px-6 py-14 text-center text-cream md:rounded-[2.75rem] md:px-12 md:py-20">
          <span className="text-xs font-medium tracking-[0.2em] text-mint uppercase">Write the next one</span>
          <h2 className="max-w-[20ch] font-display text-[clamp(2.2rem,5vw,4rem)] leading-[1.02] font-light tracking-tight">
            Your team could be <span className="font-serif text-mint italic">the next story.</span>
          </h2>
          <PillButton href="/contact-us" size="lg">
            Start your brief
          </PillButton>
        </Reveal>
      </section>

      <AboutNext />
    </>
  );
}

function FilterPills({
  active,
  onChange,
}: {
  active: "All" | CaseCategory;
  onChange: (value: "All" | CaseCategory) => void;
}) {
  const options: Array<"All" | CaseCategory> = ["All", ...caseCategories];
  return (
    <nav aria-label="Filter case studies by category" className="-mx-5 overflow-x-auto px-5 py-4 [scrollbar-width:none]">
      <ul className="inline-flex gap-1 rounded-full bg-white/70 p-1.5 shadow-float ring-1 ring-ink/6 backdrop-blur">
        {options.map((option) => {
          const isActive = active === option;
          return (
            <li key={option}>
              <button
                type="button"
                aria-pressed={isActive}
                onClick={() => onChange(option)}
                className={`relative block cursor-pointer rounded-full px-4 py-2.5 text-[13.5px] font-medium whitespace-nowrap transition-colors duration-300 ${
                  isActive ? "text-ink" : "text-ink/60 hover:text-ink"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="case-filter"
                    className="absolute inset-0 rounded-full bg-mint shadow-[0_8px_20px_-10px_rgba(0,255,171,0.8)]"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative">{option}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

/* Large opening case: image left, the story right. */
function FeaturedCase() {
  const study = featuredCase;
  return (
    <section className="relative isolate overflow-x-clip py-16 md:py-24">
      <Glow className="-z-10 top-0 right-[8%] size-[26rem]" />
      <PixelCluster cols={12} rows={7} seed={61} className="absolute top-6 left-0 -z-0 hidden opacity-60 md:block" />
      <div className="mx-auto w-full max-w-[1240px] px-5 md:px-8">
        <Reveal className="grid gap-8 overflow-hidden rounded-[2.25rem] bg-white shadow-lift ring-1 ring-ink/6 md:rounded-[2.75rem] lg:grid-cols-2 lg:gap-0">
          <div className="relative aspect-[4/3] lg:aspect-auto">
            <Image
              src={study.cover.src}
              alt={study.cover.alt}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
              priority
            />
          </div>
          <div className="flex flex-col justify-center gap-6 p-8 sm:p-10 lg:p-14">
            <div className="flex flex-wrap items-center gap-2">
              <span className="eyebrow">{study.category}</span>
              <span className="text-xs font-medium tracking-[0.1em] text-grey uppercase">{study.client}</span>
            </div>
            <h2 className="max-w-[16ch] font-display text-[clamp(1.9rem,3.6vw,3rem)] leading-[1.05] font-light tracking-tight">
              {study.title}
            </h2>
            <p className="max-w-[52ch] leading-relaxed text-ink/70">{study.summary}</p>
            {study.quote && (
              <blockquote className="border-l-2 border-mint pl-5 text-sm leading-relaxed text-ink/70 italic">
                &ldquo;{study.quote.text}&rdquo;
                <footer className="mt-2 not-italic">
                  <span className="font-semibold text-ink">{study.quote.name}</span>
                  <span className="text-grey"> — {study.quote.role}</span>
                </footer>
              </blockquote>
            )}
            <div className="flex flex-wrap gap-2">
              {study.tags.map((tag) => (
                <span key={tag} className="rounded-full bg-mint-soft px-3 py-1.5 text-xs font-medium text-emerald-deep">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* Alternating editorial block: parallax cover, tags, Challenge / Approach / Outcome columns,
   a small photo strip, and an expandable full approach list. */
function EditorialCase({ study, reversed }: { study: (typeof caseStudies)[number]; reversed: boolean }) {
  const [open, setOpen] = useState(false);
  const coverRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: coverRef, offset: ["start end", "end start"] });
  const parallax = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [-40, 40]);

  return (
    <section className="relative isolate overflow-x-clip py-6 md:py-10">
      <div className="mx-auto w-full max-w-[1240px] px-5 md:px-8">
        <Reveal
          className={`grid gap-8 rounded-[2.25rem] bg-white/70 p-6 ring-1 ring-ink/6 sm:p-8 md:rounded-[2.75rem] md:p-12 lg:grid-cols-2 lg:gap-12 ${
            reversed ? "lg:[&>*:first-child]:order-2" : ""
          }`}
        >
          <div ref={coverRef} className="relative aspect-[4/3] overflow-hidden rounded-[1.75rem]">
            <motion.div style={{ y: parallax }} className="absolute inset-[-10%]">
              <Image src={study.cover.src} alt={study.cover.alt} fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
            </motion.div>
          </div>

          <div className="flex min-w-0 flex-col gap-6">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-ink px-3 py-1.5 text-xs font-medium text-mint uppercase tracking-[0.08em]">
                {study.client}
              </span>
              <span className="text-xs font-medium tracking-[0.1em] text-grey uppercase">{study.category}</span>
            </div>
            <h3 className="font-display text-[clamp(1.6rem,3vw,2.4rem)] leading-[1.05] font-light tracking-tight">
              {study.title}
            </h3>
            <p className="leading-relaxed text-ink/70">{study.summary}</p>

            <div className="grid gap-6 sm:grid-cols-3">
              <Column label="Challenge">{study.challenge}</Column>
              <Column label="Approach">{study.approach[0]}</Column>
              <Column label="Outcome">{study.outcome}</Column>
            </div>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              className="inline-flex w-fit cursor-pointer items-center gap-1.5 text-sm font-semibold text-emerald"
            >
              {open ? "Hide the full approach" : "See the full approach"}
              <Chevron className={`size-4 transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
            </button>

            <AnimatePresence initial={false}>
              {open && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.5, ease: EASE_OUT }}
                  className="overflow-hidden"
                >
                  <ul className="flex flex-col gap-3 border-t border-ink/8 pt-5">
                    {study.approach.map((step) => (
                      <li key={step} className="flex items-start gap-3 text-sm leading-relaxed text-ink/75">
                        <Star className="mt-0.5 size-3.5 shrink-0 text-emerald" />
                        {step}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>

            {study.gallery.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pt-2 [scrollbar-width:none]">
                {study.gallery.slice(1).map((photo) => (
                  <div key={photo.src} className="relative h-20 w-28 shrink-0 overflow-hidden rounded-xl ring-1 ring-ink/6">
                    <Image src={photo.src} alt={photo.alt} fill sizes="112px" className="object-cover" />
                  </div>
                ))}
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Column({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="min-w-0">
      <p className="text-xs font-semibold tracking-[0.14em] text-emerald uppercase">{label}</p>
      <p className="mt-2 text-sm leading-relaxed text-ink/70">{children}</p>
    </div>
  );
}
