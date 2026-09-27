"use client";

import Image from "next/image";
import { useRef } from "react";
import { activityCount, crew, stats } from "@/data/content";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";
import { Glow, PixelCluster } from "@/components/landing/decor";
import { Reveal } from "@/components/landing/reveal";
import { AboutNext, AboutTabs, PageHero } from "@/components/site/page-kit";

/* Collage placement per photo (same order as crew.photos). Speed is the scrubbed parallax in px. */
const FRAMES = [
  { className: "left-0 top-0 z-10 w-[62%] -rotate-3", speed: -36, sizes: "(min-width: 768px) 26vw, 62vw" },
  { className: "right-0 top-[14%] z-20 w-[46%] rotate-[5deg]", speed: 50, sizes: "(min-width: 768px) 20vw, 46vw" },
  { className: "bottom-0 left-[24%] z-30 w-[40%] -rotate-2", speed: 22, sizes: "(min-width: 768px) 18vw, 40vw" },
] as const;

const eventsStat = stats.find((s) => s.label === "events curated");
const participantsStat = stats.find((s) => s.label === "participants");

/* Undated chapters: the shape of how OneThrive grew, without inventing years or names. */
const chapters = [
  {
    n: "Chapter 01",
    title: "The frustration",
    body: "Every team day meant juggling five vendors: one for sports, another for wellness, a third for the workshop, a fourth for the stage, a fifth for the photos. Nobody owned the whole day, so nobody was really accountable for it.",
  },
  {
    n: "Chapter 02",
    title: "The idea",
    body: "One Gen Z-led crew that could plan and run sports, wellness, workshops and the party after, under a single relationship. Fewer handoffs, one standard, one team that actually shows up on the day.",
  },
  {
    n: "Chapter 03",
    title: "The first rooms",
    body: "It started small: laughter yoga between meetings, desk yoga at 4pm, an Office Olympics that turned a Tuesday into something people talked about on Wednesday. Office sessions, run inside the space teams already had.",
  },
  {
    n: "Chapter 04",
    title: "Going bigger",
    body: "The same crew started building foundation days, carnivals and multi-day offsites, across India and abroad. Bigger rooms, bigger stakes, the same people planning and running it end to end.",
  },
  {
    n: "Chapter 05",
    title: "Today",
    body: `${eventsStat ? eventsStat.value + eventsStat.suffix : "50+"} events curated, ${
      participantsStat ? participantsStat.value.toLocaleString("en-IN") + participantsStat.suffix : "2000+"
    } participants, and a playbook of ${activityCount}+ activities. Still one team, still in the room.`,
  },
] as const;

const beliefs = [
  {
    title: "Outcomes over activities",
    body: "The game or the workshop is the vehicle, not the point. We're building toward how your team works together after the day ends.",
  },
  {
    title: "Built around your context",
    body: "No templates lifted from the last client. Every format is shaped around your team's size, goals and dynamics.",
  },
  {
    title: "One relationship, not five",
    body: "Sports, wellness, workshops and the party after, from one crew. One standard, one point of contact, start to finish.",
  },
  {
    title: "The people who plan it run it",
    body: "The team that shapes your brief is the team that shows up on the day. Nothing gets lost in a handoff.",
  },
] as const;

export function OurStory() {
  const collageRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = collageRef.current;
      if (!el || prefersReducedMotion()) return;
      const q = gsap.utils.selector(el);
      q<HTMLElement>("[data-photo]").forEach((photo) => {
        gsap.to(photo, {
          y: Number(photo.dataset.speed ?? 0),
          ease: "none",
          scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
        });
      });
    },
    { scope: collageRef },
  );

  useGSAP(
    () => {
      const el = timelineRef.current;
      if (!el || prefersReducedMotion()) return;
      const line = el.querySelector<HTMLElement>("[data-line]");
      if (!line) return;
      gsap.fromTo(
        line,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          transformOrigin: "top",
          scrollTrigger: { trigger: el, start: "top 75%", end: "bottom 65%", scrub: true },
        },
      );
    },
    { scope: timelineRef },
  );

  return (
    <>
      <PageHero
        eyebrow="Our story"
        lead="We started with one question: why do team days"
        accent="feel forgettable?"
        crumbs={[{ label: "About us", href: "/about-us" }, { label: "Our story" }]}
      >
        <AboutTabs />
      </PageHero>

      {/* Collage + pull-quote */}
      <section className="relative isolate overflow-x-clip py-16 md:py-28">
        <Glow className="-z-10 top-20 -left-24 size-[26rem]" />
        <Glow tone="soft" className="-z-10 right-0 bottom-10 size-[28rem]" />
        <PixelCluster cols={14} rows={7} seed={17} className="absolute top-8 right-4 hidden opacity-70 md:block" />

        <div className="mx-auto grid w-full max-w-[1240px] items-center gap-16 px-5 md:grid-cols-[1fr_1fr] md:gap-12 md:px-8 lg:gap-20">
          <div ref={collageRef} className="relative mx-auto aspect-[1/1.12] w-full max-w-[520px]">
            {crew.photos.map((photo, i) => {
              const frame = FRAMES[i];
              return (
                <div key={photo.src} data-photo data-speed={frame.speed} className={`absolute ${frame.className}`}>
                  <div className="rounded-[1.75rem] bg-white p-1.5 shadow-float ring-1 ring-ink/5 transition-transform duration-700 ease-spring hover:rotate-0 hover:scale-[1.03] md:rounded-[2rem] md:p-2">
                    <div className="relative aspect-[3/4] overflow-hidden rounded-[calc(1.75rem-0.375rem)] md:rounded-[calc(2rem-0.5rem)]">
                      <Image
                        src={photo.src}
                        alt={photo.alt}
                        fill
                        sizes={frame.sizes}
                        className={`object-cover ${i === 0 ? "object-[50%_60%]" : "object-center"}`}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <Reveal className="min-w-0">
            <span className="eyebrow">What we kept coming back to</span>
            <p className="mt-8 max-w-[22ch] font-serif text-[clamp(1.8rem,3.6vw,2.9rem)] leading-[1.2] text-ink italic">
              Not one relationship for sports, another for wellness, and a third for the party after.{" "}
              <span className="text-emerald">One team, one thread, start to finish.</span>
            </p>
          </Reveal>
        </div>
      </section>

      {/* Timeline */}
      <section className="relative isolate overflow-x-clip py-20 md:py-32">
        <div className="mx-auto w-full max-w-[860px] px-5 md:px-8">
          <Reveal>
            <span className="eyebrow">How we got here</span>
            <h2 className="mt-6 max-w-[20ch] font-display text-[clamp(2rem,4vw,3.2rem)] leading-[1.05] font-light tracking-tight text-balance text-ink">
              The chapters so far.
            </h2>
          </Reveal>

          <div ref={timelineRef} className="relative mt-16 pl-9 md:pl-12">
            <div aria-hidden className="absolute top-1 bottom-1 left-3 w-[2px] bg-ink/10 md:left-4">
              <div data-line className="h-full w-full origin-top scale-y-0 bg-emerald" />
            </div>

            <ul className="flex flex-col gap-14">
              {chapters.map((chapter) => (
                <Reveal key={chapter.n} as="div">
                  <li className="relative">
                    <span
                      aria-hidden
                      className="absolute top-1.5 -left-9 grid size-6 -translate-x-1/2 place-items-center rounded-full bg-mint ring-4 ring-cream md:-left-12 md:size-7"
                    >
                      <span className="size-2 rounded-full bg-ink" />
                    </span>
                    <span className="text-xs font-medium tracking-[0.18em] text-emerald uppercase">{chapter.n}</span>
                    <h3 className="mt-2 font-display text-2xl font-medium tracking-tight text-ink md:text-3xl">
                      {chapter.title}
                    </h3>
                    <p className="mt-3 max-w-[58ch] leading-7 text-grey">{chapter.body}</p>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* What we believe */}
      <section className="relative isolate overflow-x-clip py-20 md:py-32">
        <Glow className="-z-10 top-10 right-0 size-[26rem]" />
        <PixelCluster cols={12} rows={7} seed={29} className="absolute bottom-10 left-2 hidden opacity-60 md:block" />
        <div className="mx-auto w-full max-w-[1240px] px-5 md:px-8">
          <Reveal>
            <span className="eyebrow">What we believe</span>
            <h2 className="mt-6 max-w-[20ch] font-display text-[clamp(2rem,4vw,3.2rem)] leading-[1.05] font-light tracking-tight text-balance text-ink">
              The four things we don&apos;t compromise on.
            </h2>
          </Reveal>
          <Reveal
            as="ul"
            stagger={0.1}
            className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
          >
            {beliefs.map((item, i) => (
              <li key={item.title} className="flex h-full flex-col rounded-2xl bg-white/70 p-6 ring-1 ring-ink/5">
                <span className="grid size-9 place-items-center rounded-full bg-mint-soft font-display text-sm font-medium text-emerald">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="mt-5 font-display text-lg font-medium tracking-tight text-ink">{item.title}</p>
                <p className="mt-2 text-sm leading-6 text-grey">{item.body}</p>
              </li>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Crew photo strip */}
      <section className="relative isolate overflow-x-clip py-12 md:py-20">
        <div className="mx-auto w-full max-w-[1240px] px-5 md:px-8">
          <Reveal>
            <span className="eyebrow">The crew today</span>
          </Reveal>
          <Reveal
            stagger={0.08}
            className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3"
          >
            {crew.photos.map((photo) => (
              <div key={photo.src} className="relative aspect-[4/5] overflow-hidden rounded-2xl ring-1 ring-ink/5">
                <Image src={photo.src} alt={photo.alt} fill sizes="(min-width: 640px) 33vw, 100vw" className="object-cover" />
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <AboutNext />
    </>
  );
}
