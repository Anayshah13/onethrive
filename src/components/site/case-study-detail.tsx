"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { caseStudies, caseStudyHref, type CaseStudy, type Media } from "@/data/case-studies";
import { Glow, PixelCluster } from "@/components/landing/decor";
import { ArrowDown, ArrowLeft, ArrowRight } from "@/components/landing/icons";
import { Reveal } from "@/components/landing/reveal";
import { PillButton } from "@/components/landing/ui";
import { CaseCover } from "@/components/site/case-cover";

/* Full write-up of a single case study at /about-us/case-studies/{id}, laid out to be skimmed:
   an at-a-glance digest up top, short labelled chapters with lists and pull lines, and the
   study's own photos interleaved so no run of text goes long without a picture. */
export function CaseStudyDetail({ study }: { study: CaseStudy }) {
  const index = caseStudies.findIndex((s) => s.id === study.id);
  const prev = caseStudies[(index - 1 + caseStudies.length) % caseStudies.length];
  const next = caseStudies[(index + 1) % caseStudies.length];

  const { writeUp } = study;
  // The cover already leads the page, so don't repeat it in the inline photo slots.
  const pool = study.photos.filter((photo) => photo.src !== study.cover?.src);

  return (
    <>
      <Hero study={study} hasStory={Boolean(writeUp)} />

      {writeUp ? (
        <Story study={study} pool={pool} />
      ) : (
        (study.video || pool.length > 0) && <DayGallery study={study} photos={pool} lead="From the" accent="day itself." />
      )}

      {writeUp && pool.length > 6 && <DayGallery study={{ ...study, video: undefined }} photos={pool.slice(6)} lead="More from" accent="the day." />}

      <section className="pt-8 pb-16 md:pb-24">
        <div className="mx-auto grid w-full max-w-[1240px] gap-4 px-5 sm:grid-cols-2 md:px-8">
          <NeighbourLink study={prev} direction="prev" />
          <NeighbourLink study={next} direction="next" />
        </div>
        <Reveal className="mx-auto mt-14 flex w-full max-w-[1240px] flex-col items-center gap-5 px-5 text-center md:px-8">
          <p className="max-w-[24ch] font-display text-[clamp(1.6rem,3vw,2.4rem)] leading-[1.1] font-light tracking-tight text-balance">
            Want a day like this for <span className="font-serif text-emerald italic">your team?</span>
          </p>
          <PillButton href="/contact-us" size="lg">
            Plan your event
          </PillButton>
        </Reveal>
      </section>
    </>
  );
}

/* ───────────────────────────── Hero ───────────────────────────── */

function Hero({ study, hasStory }: { study: CaseStudy; hasStory: boolean }) {
  const number = String(study.id).padStart(2, "0");
  const facts = (
    [
      ["Participants", study.participants],
      ["Format", study.activity],
      ["Location", study.location],
      ["Objective", study.objective],
    ] as Array<[string, string | undefined]>
  ).filter((fact): fact is [string, string] => Boolean(fact[1]));

  return (
    <>
      <section className="relative isolate overflow-x-clip pt-32 pb-10 md:pt-44 md:pb-14">
        <Glow className="-z-10 -top-20 right-[8%] size-[30rem]" />
        <Glow tone="soft" className="-z-10 top-40 -left-32 size-[26rem]" />
        <PixelCluster cols={14} rows={8} seed={29} className="absolute top-24 right-0 -z-0 hidden opacity-70 md:block" />

        <div className="relative mx-auto w-full max-w-[1240px] px-5 md:px-8">
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-1.5 text-[13px] text-grey">
              <li>
                <Link href="/" className="transition-colors hover:text-emerald">
                  Home
                </Link>
              </li>
              <Crumb href="/about-us">About Us</Crumb>
              <Crumb href="/about-us/case-studies">Case studies</Crumb>
              <li className="flex items-center gap-1.5">
                <span aria-hidden className="text-ink/25">/</span>
                <span aria-current="page" className="text-ink">
                  {study.client}
                </span>
              </li>
            </ol>
          </nav>

          <Reveal className="mt-10 flex flex-col gap-7 md:mt-14">
            <div className="flex flex-wrap items-center gap-4">
              <span className="grid h-16 w-28 place-items-center rounded-2xl bg-white p-2.5 shadow-float ring-1 ring-ink/6">
                <Image src={study.logo.src} alt={study.logo.alt} width={200} height={100} className="max-h-11 w-auto object-contain" preload />
              </span>
              <span className="eyebrow">Case study {number}</span>
            </div>
            <h1 className="max-w-[18ch] font-display text-[clamp(2.5rem,6.4vw,5.75rem)] leading-[0.98] font-light tracking-tight text-balance">
              {study.client}{" "}
              {study.activity && <span className="font-serif text-emerald italic">{study.activity}</span>}
            </h1>
          </Reveal>

          {facts.length > 0 && (
            <Reveal
              delay={0.1}
              className={`mt-10 grid gap-px overflow-hidden rounded-[1.75rem] bg-ink/8 ring-1 ring-ink/8 md:mt-12 ${
                facts.length === 1 ? "max-w-sm" : facts.length === 2 ? "max-w-2xl sm:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-4"
              }`}
            >
              {facts.map(([label, value]) => (
                <div key={label} className="bg-white/85 p-5 backdrop-blur md:p-6">
                  <p className="text-[11px] font-semibold tracking-[0.14em] text-emerald uppercase">{label}</p>
                  <p className="mt-2 text-[15px] leading-snug font-medium text-ink md:text-base">{value}</p>
                </div>
              ))}
            </Reveal>
          )}
        </div>
      </section>

      {study.cover && (
        <section className="px-2 md:px-3">
          <Reveal className="relative mx-auto aspect-[4/3] max-w-[1400px] overflow-hidden rounded-[2.25rem] md:aspect-[21/9] md:rounded-[2.75rem]">
            <CaseCover study={study} sizes="100vw" priority />
            {hasStory && (
              <a
                href="#at-a-glance"
                className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-cream/90 px-4 py-2.5 text-sm font-medium text-ink shadow-float backdrop-blur transition-colors hover:bg-mint md:bottom-6 md:left-6"
              >
                <ArrowDown className="size-4" />
                The story in 10 seconds
              </a>
            )}
          </Reveal>
        </section>
      )}
    </>
  );
}

/* ───────────────────────────── Story ───────────────────────────── */

const chapters = [
  { id: "at-a-glance", label: "At a glance" },
  { id: "the-client", label: "The client" },
  { id: "the-brief", label: "The brief" },
  { id: "our-approach", label: "Our approach" },
  { id: "on-the-ground", label: "On the ground" },
  { id: "results", label: "Results & impact" },
  { id: "conclusion", label: "Conclusion" },
] as const;

function Story({ study, pool }: { study: CaseStudy; pool: Media[] }) {
  const writeUp = study.writeUp!;
  const h = study.highlights;
  const articleRef = useRef<HTMLDivElement>(null);
  const sections = h ? chapters : chapters.filter((c) => c.id !== "at-a-glance");

  const [clientLead, clientRest] = splitLead(writeUp.background);
  const [briefLead, briefRest] = splitLead(writeUp.briefing);

  return (
    <div ref={articleRef} className="relative isolate overflow-x-clip py-16 md:py-24">
      <div className="mx-auto w-full max-w-[1240px] px-5 md:px-8 lg:grid lg:grid-cols-[11rem_minmax(0,1fr)] lg:gap-14 xl:gap-20">
        <SectionNav sections={sections} articleRef={articleRef} />

        <div className="flex min-w-0 flex-col gap-20 md:gap-28">
          {h && (
            <section id="at-a-glance" aria-labelledby="at-a-glance-title" className="scroll-mt-28">
              <Reveal>
                <span className="eyebrow">At a glance</span>
                <h2 id="at-a-glance-title" className="mt-5 font-display text-[clamp(1.9rem,3.6vw,3rem)] leading-[1.05] font-light tracking-tight">
                  The story in <span className="font-serif text-emerald italic">ten seconds.</span>
                </h2>
              </Reveal>
              <Reveal stagger={0.08} as="ul" className="mt-8 grid gap-3 md:grid-cols-3 md:gap-4">
                <GlanceCard step="01" label="The challenge" text={h.glance.challenge} />
                <GlanceCard step="02" label="What we did" text={h.glance.approach} />
                <GlanceCard step="03" label="The outcome" text={h.glance.outcome} dark />
              </Reveal>
            </section>
          )}

          <Chapter id="the-client" n="01" label="The client" title={<>Meet <Accent>{study.client}</Accent></>}>
            <Reveal className="max-w-[62ch]">
              <p className="text-[clamp(1.15rem,1.7vw,1.45rem)] leading-snug text-ink">{clientLead}</p>
              {clientRest && <p className="mt-4 text-[15px] leading-relaxed text-ink/65 md:text-base">{clientRest}</p>}
            </Reveal>
          </Chapter>

          <PhotoDuo photos={pool.slice(0, 2)} />

          <Chapter id="the-brief" n="02" label="The brief" title={<>What they <Accent>asked for</Accent></>}>
            <Reveal className="max-w-[62ch] border-l-2 border-mint pl-5 md:pl-8">
              <p className="font-display text-[clamp(1.3rem,2.2vw,1.8rem)] leading-[1.3] font-light tracking-tight text-ink">
                <Mark>{briefLead}</Mark>
              </p>
              {briefRest && <p className="mt-5 text-[15px] leading-relaxed text-ink/65 md:text-base">{briefRest}</p>}
            </Reveal>
            {study.objective && (
              <Reveal className="mt-6 inline-flex flex-wrap items-center gap-x-3 gap-y-1 rounded-2xl bg-mint-wash px-4 py-3 text-sm">
                <span className="text-[11px] font-semibold tracking-[0.14em] text-emerald uppercase">Objective</span>
                <span className="font-medium text-ink">{study.objective}</span>
              </Reveal>
            )}
          </Chapter>

          <Chapter id="our-approach" n="03" label="Our approach" title={<>How we <Accent>solved it</Accent></>}>
            <Reveal>
              <p className="max-w-[62ch] text-[15px] leading-relaxed text-ink/70 md:text-[17px]">{writeUp.solution}</p>
            </Reveal>
            {h && h.steps.length > 0 && (
              <Reveal stagger={0.07} as="ul" className="mt-10 grid gap-3 sm:grid-cols-2 md:gap-4">
                {h.steps.map((step, i) => (
                  <li key={step} className="flex gap-4 rounded-[1.5rem] bg-white p-5 ring-1 ring-ink/6 md:p-6">
                    <span
                      aria-hidden
                      className="grid size-10 shrink-0 place-items-center rounded-full bg-ink font-display text-sm text-mint tabular-nums"
                    >
                      {i + 1}
                    </span>
                    <span className="pt-2 text-[15px] leading-snug font-medium text-ink md:text-base">
                      <span className="sr-only">Step {i + 1}: </span>
                      {step}
                    </span>
                  </li>
                ))}
              </Reveal>
            )}
          </Chapter>

          {pool[2] && <PhotoWide photo={pool[2]} />}

          <Chapter id="on-the-ground" n="04" label="On the ground" title={<>What we <Accent>handled</Accent></>}>
            <div className={`grid gap-10 ${study.video ? "md:grid-cols-[minmax(0,1fr)_15rem] md:gap-10 xl:gap-14" : ""}`}>
              <div className="min-w-0">
                {h && h.handled.length > 0 && (
                  <Reveal stagger={0.04} as="ul" className="flex flex-wrap gap-2">
                    {h.handled.map((item) => (
                      <li
                        key={item}
                        className="inline-flex items-center gap-2 rounded-full bg-white py-2 pr-4 pl-2 text-sm font-medium text-ink ring-1 ring-ink/8"
                      >
                        <span aria-hidden className="grid size-6 place-items-center rounded-full bg-mint text-ink">
                          <Check />
                        </span>
                        {item}
                      </li>
                    ))}
                  </Reveal>
                )}
                <Reveal className={h ? "mt-8" : ""}>
                  {h && <p className="text-[11px] font-semibold tracking-[0.14em] text-grey uppercase">How it ran</p>}
                  <p className="mt-3 max-w-[62ch] text-[15px] leading-relaxed text-ink/70 md:text-[17px]">{writeUp.implementation}</p>
                </Reveal>
              </div>
              {study.video && <VideoCard video={study.video} client={study.client} />}
            </div>
          </Chapter>

          <Chapter id="results" n="05" label="Results & impact" title={<>How it <Accent>landed</Accent></>}>
            {h && (
              <>
                <Reveal stagger={0.07} as="ul" className="grid gap-px overflow-hidden rounded-[1.75rem] bg-ink/8 ring-1 ring-ink/8">
                  {h.takeaways.map((item) => (
                    <li key={item} className="flex items-start gap-4 bg-white p-5 md:p-6">
                      <span aria-hidden className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full bg-emerald text-cream">
                        <Check />
                      </span>
                      <span className="font-display text-[clamp(1.05rem,1.6vw,1.3rem)] leading-snug font-light tracking-tight text-ink">{item}</span>
                    </li>
                  ))}
                </Reveal>
                <Reveal className="relative mt-6 overflow-hidden rounded-[1.75rem] bg-mint-wash p-6 md:p-10">
                  <span aria-hidden className="absolute -top-6 right-4 font-serif text-[9rem] leading-none text-emerald/12 italic md:right-8">
                    &ldquo;
                  </span>
                  <p className="relative text-[11px] font-semibold tracking-[0.14em] text-emerald uppercase">Client feedback</p>
                  <p className="relative mt-4 max-w-[40ch] font-serif text-[clamp(1.4rem,2.6vw,2.1rem)] leading-[1.2] text-ink italic">
                    {h.feedback}
                  </p>
                </Reveal>
              </>
            )}
            <Reveal className={h ? "mt-8" : ""}>
              {h && <p className="text-[11px] font-semibold tracking-[0.14em] text-grey uppercase">In full</p>}
              <p className="mt-3 max-w-[62ch] text-[15px] leading-relaxed text-ink/70 md:text-[17px]">{writeUp.results}</p>
            </Reveal>
          </Chapter>

          <PhotoTrio photos={pool.slice(3, 6)} />

          <section id="conclusion" aria-labelledby="conclusion-title" className="scroll-mt-28">
            <Reveal className="relative overflow-hidden rounded-[2.25rem] bg-ink px-6 py-12 text-cream md:rounded-[2.75rem] md:px-14 md:py-16">
              <span aria-hidden className="absolute -top-24 -right-16 size-80 rounded-full bg-mint/20 blur-3xl" />
              <p className="relative flex items-center gap-3 text-xs font-semibold tracking-[0.14em] text-mint uppercase">
                <span className="font-display text-cream/35 tabular-nums">06</span>
                <span aria-hidden className="h-px w-8 bg-mint/40" />
                Conclusion
              </p>
              <h2
                id="conclusion-title"
                className="relative mt-6 max-w-[30ch] font-display text-[clamp(1.5rem,2.8vw,2.4rem)] leading-[1.2] font-light tracking-tight text-balance"
              >
                {h ? h.statement : writeUp.conclusion}
              </h2>
              {h && <p className="relative mt-6 max-w-[62ch] text-[15px] leading-relaxed text-cream/65 md:text-base">{writeUp.conclusion}</p>}
            </Reveal>
          </section>
        </div>
      </div>
    </div>
  );
}

/* Sticky chapter list with a reading-progress rail; desktop only. */
function SectionNav({
  sections,
  articleRef,
}: {
  sections: ReadonlyArray<{ id: string; label: string }>;
  articleRef: React.RefObject<HTMLDivElement | null>;
}) {
  const [active, setActive] = useState<string>(sections[0]?.id ?? "");
  const barRef = useRef<HTMLSpanElement>(null);
  const key = sections.map((s) => s.id).join("|");

  useEffect(() => {
    const els = key
      .split("|")
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id);
      },
      { rootMargin: "-35% 0px -60% 0px" },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [key]);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const el = articleRef.current;
      const bar = barRef.current;
      if (!el || !bar) return;
      const rect = el.getBoundingClientRect();
      const span = rect.height - window.innerHeight * 0.6;
      const progress = span > 0 ? Math.min(1, Math.max(0, (window.innerHeight * 0.4 - rect.top) / span)) : 0;
      bar.style.transform = `scaleY(${progress})`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [articleRef]);

  return (
    <nav aria-label="Case study sections" className="hidden lg:block">
      <div className="sticky top-32">
        <p className="text-[11px] font-semibold tracking-[0.14em] text-grey uppercase">On this page</p>
        <div className="relative mt-5 pl-5">
          <span aria-hidden className="absolute inset-y-0 left-0 w-px bg-ink/10" />
          <span
            ref={barRef}
            aria-hidden
            className="absolute inset-y-0 left-0 w-px origin-top bg-emerald"
            style={{ transform: "scaleY(0)" }}
          />
          <ol className="flex flex-col gap-1">
            {sections.map((section) => {
              const isActive = section.id === active;
              return (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    aria-current={isActive ? "location" : undefined}
                    className={`block py-1.5 text-sm transition-colors duration-300 ${
                      isActive ? "font-medium text-emerald" : "text-ink/50 hover:text-ink"
                    }`}
                  >
                    {section.label}
                  </a>
                </li>
              );
            })}
          </ol>
        </div>
        <Link
          href="/contact-us"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2.5 text-sm font-medium text-cream transition-colors hover:bg-emerald"
        >
          Plan yours
          <ArrowRight className="size-3.5" />
        </Link>
      </div>
    </nav>
  );
}

/* ───────────────────────────── Building blocks ───────────────────────────── */

function Chapter({
  id,
  n,
  label,
  title,
  children,
}: {
  id: string;
  n: string;
  label: string;
  title: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-28">
      <Reveal className="mb-8 md:mb-10">
        <p className="flex items-center gap-3 text-xs font-semibold tracking-[0.14em] text-emerald uppercase">
          <span className="font-display text-ink/30 tabular-nums">{n}</span>
          <span aria-hidden className="h-px w-8 bg-emerald/30" />
          {label}
        </p>
        <h2 id={`${id}-title`} className="mt-4 font-display text-[clamp(1.9rem,3.6vw,3rem)] leading-[1.05] font-light tracking-tight text-balance">
          {title}
        </h2>
      </Reveal>
      {children}
    </section>
  );
}

function GlanceCard({ step, label, text, dark = false }: { step: string; label: string; text: string; dark?: boolean }) {
  return (
    <li
      className={`relative flex flex-col gap-4 rounded-[1.75rem] p-6 md:p-7 ${
        dark ? "bg-ink text-cream" : "bg-white text-ink shadow-float ring-1 ring-ink/6"
      }`}
    >
      <span className="flex items-center justify-between">
        <span className={`text-[11px] font-semibold tracking-[0.14em] uppercase ${dark ? "text-mint" : "text-emerald"}`}>{label}</span>
        <span className={`font-display text-sm tabular-nums ${dark ? "text-cream/35" : "text-ink/25"}`}>{step}</span>
      </span>
      <span className="font-display text-[clamp(1.1rem,1.5vw,1.3rem)] leading-snug font-light tracking-tight">{text}</span>
    </li>
  );
}

function PhotoDuo({ photos }: { photos: Media[] }) {
  if (photos.length === 0) return null;
  if (photos.length === 1) return <PhotoWide photo={photos[0]} />;
  return (
    <Reveal stagger={0.08} className="grid grid-cols-2 gap-3 md:gap-4">
      {photos.map((photo, i) => (
        <Photo key={photo.src} photo={photo} sizes="(min-width: 1024px) 480px, 50vw" className={`aspect-[4/5] ${i === 1 ? "mt-8 md:mt-14" : ""}`} />
      ))}
    </Reveal>
  );
}

function PhotoWide({ photo }: { photo: Media }) {
  return (
    <Reveal>
      <Photo photo={photo} sizes="(min-width: 1024px) 960px, 100vw" className="aspect-[4/3] md:aspect-[16/9]" />
    </Reveal>
  );
}

function PhotoTrio({ photos }: { photos: Media[] }) {
  if (photos.length === 0) return null;
  if (photos.length === 1) return <PhotoWide photo={photos[0]} />;
  if (photos.length === 2) return <PhotoDuo photos={photos} />;
  return (
    <Reveal stagger={0.08} className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
      {photos.map((photo, i) => (
        <Photo
          key={photo.src}
          photo={photo}
          sizes="(min-width: 768px) 33vw, 50vw"
          className={i === 0 ? "col-span-2 aspect-[16/10] md:col-span-1 md:aspect-[3/4]" : "aspect-[3/4]"}
        />
      ))}
    </Reveal>
  );
}

function Photo({ photo, sizes, className = "" }: { photo: Media; sizes: string; className?: string }) {
  return (
    <figure className={`relative overflow-hidden rounded-[1.5rem] bg-mint-wash ring-1 ring-ink/6 md:rounded-[2rem] ${className}`}>
      <Image src={photo.src} alt={photo.alt} fill sizes={sizes} className="object-cover" />
    </figure>
  );
}

function VideoCard({ video, client }: { video: NonNullable<CaseStudy["video"]>; client: string }) {
  return (
    <Reveal className="mx-auto w-full max-w-[15rem] md:mx-0 md:self-start">
      <p className="mb-3 text-[11px] font-semibold tracking-[0.14em] text-grey uppercase">Watch the day</p>
      <div className="overflow-hidden rounded-[1.75rem] bg-ink shadow-lift ring-1 ring-ink/10">
        <video
          src={video.src}
          poster={video.poster}
          controls
          playsInline
          preload="none"
          aria-label={`Video from the ${client} event`}
          className="aspect-[9/16] w-full object-cover"
        >
          <track kind="captions" />
        </video>
      </div>
    </Reveal>
  );
}

/* Masonry of photos (plus the video, when there is one) — the whole page for studies without
   a write-up, and the overflow gallery after the story for those with one. */
function DayGallery({ study, photos, lead, accent }: { study: CaseStudy; photos: Media[]; lead: string; accent: string }) {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto w-full max-w-[1240px] px-5 md:px-8">
        <Reveal className="mb-8 md:mb-10">
          <h2 className="font-display text-[clamp(1.8rem,3.6vw,3rem)] leading-none font-light tracking-tight">
            {lead} <span className="font-serif text-emerald italic">{accent}</span>
          </h2>
        </Reveal>
        <div className={`grid gap-8 ${study.video && photos.length > 0 ? "md:grid-cols-[15rem_minmax(0,1fr)] md:gap-10" : ""}`}>
          {study.video && <VideoCard video={study.video} client={study.client} />}
          {photos.length > 0 && (
            <Reveal stagger={0.06} className="min-w-0 columns-2 gap-3 md:gap-4 lg:columns-3 [&>*]:mb-3 md:[&>*]:mb-4">
              {photos.map((photo) => (
                <div key={photo.src} className="relative break-inside-avoid overflow-hidden rounded-[1.25rem] ring-1 ring-ink/6">
                  <Image src={photo.src} alt={photo.alt} width={800} height={1000} sizes="(min-width: 1024px) 33vw, 50vw" className="h-auto w-full" />
                </div>
              ))}
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}

function Accent({ children }: { children: React.ReactNode }) {
  return <span className="font-serif text-emerald italic">{children}</span>;
}

/* Highlighter-pen underline for the key sentence in a block. */
function Mark({ children }: { children: React.ReactNode }) {
  return (
    <span className="box-decoration-clone bg-[linear-gradient(transparent_62%,var(--mint-soft)_62%)] px-0.5">{children}</span>
  );
}

function Check() {
  return (
    <svg viewBox="0 0 24 24" className="size-3.5" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="m5 12.5 4.5 4.5L19 7.5" />
    </svg>
  );
}

/* First sentence as the lead, the rest as body copy. */
function splitLead(text: string): [string, string] {
  const match = text.match(/^(.+?[.!?])\s+(?=[A-Z"“])/);
  if (!match) return [text, ""];
  return [match[1], text.slice(match[0].length)];
}

function Crumb({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li className="flex items-center gap-1.5">
      <span aria-hidden className="text-ink/25">/</span>
      <Link href={href} className="transition-colors hover:text-emerald">
        {children}
      </Link>
    </li>
  );
}

function NeighbourLink({ study, direction }: { study: CaseStudy; direction: "prev" | "next" }) {
  const isNext = direction === "next";
  return (
    <Link
      href={caseStudyHref(study.id)}
      className={`group flex items-center gap-4 rounded-[1.75rem] bg-white p-3 ring-1 ring-ink/6 transition-shadow duration-500 hover:shadow-float ${
        isNext ? "flex-row-reverse text-right" : ""
      }`}
    >
      <span className="relative size-20 shrink-0 overflow-hidden rounded-[1.25rem] md:size-24">
        <CaseCover study={study} sizes="96px" decorative className="transition-transform duration-700 group-hover:scale-110" />
      </span>
      <span className="min-w-0 flex-1">
        <span className={`flex items-center gap-1.5 text-xs font-semibold tracking-[0.14em] text-grey uppercase ${isNext ? "justify-end" : ""}`}>
          {isNext ? null : <ArrowLeft className="size-3.5" />}
          {isNext ? "Next case" : "Previous case"}
          {isNext ? <ArrowRight className="size-3.5" /> : null}
        </span>
        <span className="mt-1.5 block font-display text-xl font-light tracking-tight md:text-2xl">{study.client}</span>
        <span className="mt-0.5 block truncate text-sm text-ink/60">{study.activity ?? "Case study"}</span>
      </span>
    </Link>
  );
}
