"use client";

import { useRef, useState } from "react";
import { activities, activityCount, faqs, stats } from "@/data/content";
import { Glow, PixelCluster } from "@/components/landing/decor";
import { Reveal } from "@/components/landing/reveal";
import { TalkButton } from "@/components/landing/talk";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";
import { AboutNext, AboutTabs, PageHero } from "@/components/site/page-kit";

/* Left column of the comparison: the fragmented way most teams run engagement today. */
const PAINS = [
  "A different vendor for sports, wellness, workshops and the party",
  "Templated formats that don't flex to your team or goals",
  "Handoffs and gaps between vendors on the day itself",
  "No one to call once the invoice is settled",
];

/* Right column: what changes with one crew end to end. */
const WINS = [
  "One relationship for sports, wellness, workshops and the party",
  "Every format built around your team's size, context and goals",
  "One crew in the room from setup to the last handshake",
  "Feedback and outcomes measured after the day, not forgotten",
];

/* The five differentiators walked through in the sticky-scroll section. */
const DIFFERENTIATORS = [
  {
    title: "Gen Z-led crew",
    body: "India's first Gen Z-led employee engagement company. The people who plan your day are the ones who show up and run it — no account manager handing you off to a stranger on-site.",
  },
  {
    title: "Built around your goals",
    body: "No templates. Every format is shaped around your team's size, context and what the day is actually meant to change.",
  },
  {
    title: "End-to-end, start to finish",
    body: "Planning, logistics and execution on the day, all under one crew. You're not stitching together five different bookings yourself.",
  },
  {
    title: "Scales from ten to thousands",
    body: "From a tight team of ten to an enterprise-wide gathering of thousands, our formats scale without losing their intent.",
  },
  {
    title: "In-office, offsite or virtual",
    body: "Built to work inside your existing office space, out at a destination, or over video for remote and hybrid teams — the format follows the team, not the other way round.",
  },
  {
    title: "Measured outcomes",
    body: faqs[faqs.length - 1].a,
  },
] as const;

/* Small check glyph for the comparison card's mint bullets. */
function Check({ className = "size-3" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="m5 13 4 4L19 7" />
    </svg>
  );
}

export function WhyUs() {
  return (
    <>
      <PageHero
        eyebrow="Why us"
        lead="One crew for the whole day,"
        accent="not five vendors."
        crumbs={[{ label: "About us", href: "/about-us" }, { label: "Why us" }]}
      >
        <AboutTabs />
      </PageHero>

      <Comparison />
      <Differentiators />
      <Breadth />
      <Stats />

      <section className="relative isolate overflow-x-clip px-2 py-16 md:px-3 md:py-24">
        <Reveal className="mx-auto flex max-w-[1240px] flex-col items-center gap-6 rounded-[2.25rem] bg-mint-wash px-6 py-14 text-center ring-1 ring-emerald/10 md:rounded-[2.75rem] md:px-12 md:py-20">
          <span className="eyebrow">Let&apos;s talk</span>
          <h2 className="max-w-[18ch] font-display text-[clamp(2.2rem,5vw,4rem)] leading-[1.02] font-light tracking-tight">
            One brief. One crew. <span className="font-serif text-emerald italic">One day that lands.</span>
          </h2>
          <TalkButton className="mt-4" size="lg">
            Plan your offsite
          </TalkButton>
        </Reveal>
      </section>

      <AboutNext />
    </>
  );
}

/* "The usual way" vs "OneThrive": muted pains on the left, an ink card of mint checks on the right. */
function Comparison() {
  return (
    <section className="relative isolate overflow-x-clip py-20 md:py-32">
      <Glow tone="soft" className="-z-10 top-10 -left-24 size-[26rem]" />
      <div className="mx-auto w-full max-w-[1240px] px-5 md:px-8">
        <Reveal as="header" className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">The difference</span>
          <h2 className="mt-6 font-display text-[clamp(2.2rem,5vw,4rem)] leading-[1.02] font-light tracking-tight">
            The usual way <span className="text-ink/35">vs.</span>{" "}
            <span className="font-serif text-emerald italic">OneThrive.</span>
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-6 md:mt-20 lg:grid-cols-2 lg:gap-8">
          <Reveal>
            <div className="h-full rounded-[2rem] bg-white/60 p-8 ring-1 ring-ink/8 md:p-10">
              <p className="text-xs font-medium tracking-[0.18em] text-grey uppercase">The usual way</p>
              <ul className="mt-6 flex flex-col gap-5">
                {PAINS.map((pain) => (
                  <li key={pain} className="flex items-start gap-3 text-ink/55">
                    <span aria-hidden className="mt-2.5 block h-px w-4 shrink-0 bg-ink/25" />
                    <span className="leading-relaxed line-through decoration-ink/25">{pain}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="h-full rounded-[2rem] bg-ink p-8 text-cream shadow-lift md:p-10">
              <p className="text-xs font-medium tracking-[0.18em] text-mint uppercase">OneThrive</p>
              <ul className="mt-6 flex flex-col gap-5">
                {WINS.map((win) => (
                  <li key={win} className="flex items-start gap-3">
                    <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-mint text-ink">
                      <Check className="size-3" />
                    </span>
                    <span className="leading-relaxed text-cream/85">{win}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* Sticky left heading, cards revealing on the right as the section scrolls past. */
function Differentiators() {
  return (
    <section className="relative isolate overflow-x-clip py-20 md:py-32">
      <PixelCluster cols={14} rows={8} seed={41} className="absolute top-10 right-0 -z-0 hidden opacity-60 md:block" />
      <div className="mx-auto w-full max-w-[1240px] px-5 md:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <span className="eyebrow">What that means</span>
            <h2 className="mt-6 max-w-[14ch] font-display text-[clamp(2.4rem,5.5vw,4.5rem)] leading-[1.02] font-light tracking-tight">
              Six things that <span className="font-serif text-emerald italic">actually change.</span>
            </h2>
            <p className="mt-6 max-w-[42ch] text-ink/65">
              Not a list of features — the parts of working with us that show up on the day itself.
            </p>
          </div>

          <ul className="flex flex-col gap-5">
            {DIFFERENTIATORS.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.03}>
                <li className="rounded-[1.75rem] bg-white/70 p-7 ring-1 ring-ink/6 transition-shadow duration-500 hover:shadow-float md:p-9">
                  <span className="font-display text-3xl font-light text-emerald/30">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-3 font-display text-2xl font-light tracking-tight text-ink">{item.title}</h3>
                  <p className="mt-3 max-w-[54ch] leading-relaxed text-ink/70">{item.body}</p>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* The breadth of the catalogue: activity categories as an interactive pill cloud. */
function Breadth() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <section className="relative isolate overflow-x-clip bg-mint-wash py-20 md:py-32">
      <Glow className="-z-10 top-0 right-[10%] size-[28rem]" />
      <div className="mx-auto w-full max-w-[1240px] px-5 md:px-8">
        <Reveal as="header" className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">Breadth</span>
          <h2 className="mt-6 font-display text-[clamp(2.2rem,5vw,4rem)] leading-[1.02] font-light tracking-tight">
            <span className="font-semibold">{activityCount}+</span> formats,{" "}
            <span className="font-serif text-emerald italic">one shelf.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-md text-ink/65 text-balance">
            Every category below sits inside the same one relationship — tap a category to see how deep it goes.
          </p>
        </Reveal>

        <Reveal stagger={0.06} className="mt-14 flex flex-wrap justify-center gap-3 md:mt-20">
          {activities.map((group) => {
            const isActive = active === group.category;
            return (
              <button
                key={group.category}
                type="button"
                aria-pressed={isActive}
                onClick={() => setActive(isActive ? null : group.category)}
                className={`cursor-pointer rounded-full px-5 py-3 text-sm font-medium transition-[background-color,color,transform] duration-500 ease-spring active:scale-95 ${
                  isActive ? "bg-ink text-mint" : "bg-white text-ink ring-1 ring-ink/8 hover:ring-emerald/40"
                }`}
              >
                {group.category}
                <span className={`ml-2 ${isActive ? "text-mint/60" : "text-grey"}`}>{group.items.length}</span>
              </button>
            );
          })}
        </Reveal>

        <div className="mt-8 min-h-[3.5rem]">
          {active && (
            <Reveal className="mx-auto max-w-[900px] rounded-[1.75rem] bg-white/80 p-6 text-center ring-1 ring-ink/6 md:p-8">
              <p className="flex flex-wrap justify-center gap-2">
                {activities
                  .find((group) => group.category === active)
                  ?.items.map((item) => (
                    <span key={item} className="rounded-full bg-mint-soft px-3 py-1.5 text-sm text-emerald-deep">
                      {item}
                    </span>
                  ))}
              </p>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}

/* Count-up stats band, scrubbed once on entry. */
function Stats() {
  const root = useRef<HTMLDivElement>(null);
  const band = [...stats, { value: activityCount, suffix: "+", label: "activity formats" }];

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const els = gsap.utils.toArray<HTMLElement>("[data-count]", root.current ?? undefined);
      els.forEach((el) => {
        const target = Number(el.dataset.count ?? "0");
        const state = { value: 0 };
        gsap.to(state, {
          value: target,
          duration: 1.6,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
          onUpdate: () => {
            el.textContent = String(Math.round(state.value));
          },
        });
      });
    },
    { scope: root },
  );

  return (
    <section className="relative isolate overflow-x-clip py-16 md:py-24">
      <div ref={root} className="mx-auto w-full max-w-[1240px] px-5 md:px-8">
        <div className="grid grid-cols-1 gap-8 rounded-[2.25rem] bg-ink px-8 py-14 text-cream sm:grid-cols-3 md:rounded-[2.75rem] md:px-14 md:py-16">
          {band.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-display text-[clamp(2.6rem,6vw,4.5rem)] leading-none font-light tracking-tight">
                <span data-count={stat.value}>0</span>
                <span className="text-mint">{stat.suffix}</span>
              </p>
              <p className="mt-3 text-sm text-cream/60">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
