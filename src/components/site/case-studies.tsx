"use client";

import Image from "next/image";
import Link from "next/link";
import { caseStudies, caseStudyHref, type CaseStudy } from "@/data/case-studies";
import { Glow, PixelCluster } from "@/components/landing/decor";
import { ArrowUpRight } from "@/components/landing/icons";
import { Reveal } from "@/components/landing/reveal";
import { PillButton } from "@/components/landing/ui";
import { CaseCover } from "@/components/site/case-cover";
import { AboutNext, AboutTabs, PageHero } from "@/components/site/page-kit";

const [featuredCase, ...restCases] = caseStudies;

export function CaseStudies() {
  return (
    <>
      <PageHero
        eyebrow="Case studies"
        lead="Real briefs."
        accent="Real rooms."
        intro="Real events, told the way they happened: who the client was, what they asked for, what we built, and how the day landed."
        crumbs={[{ label: "About us", href: "/about-us" }, { label: "Case studies" }]}
      >
        <AboutTabs />
      </PageHero>

      <section className="relative isolate overflow-x-clip pb-16 md:pb-24">
        <Glow className="-z-10 top-0 right-[8%] size-[26rem]" />
        <PixelCluster cols={12} rows={7} seed={61} className="absolute top-6 left-0 -z-0 hidden opacity-60 md:block" />
        <div className="mx-auto grid w-full max-w-[1240px] gap-5 px-5 md:grid-cols-2 md:gap-6 md:px-8">
          <CaseCard study={featuredCase} featured />
          {restCases.map((study) => (
            <CaseCard key={study.id} study={study} />
          ))}
        </div>
      </section>

      <section className="relative isolate overflow-x-clip px-2 pb-16 md:px-3 md:pb-24">
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

/* One case study: cover, client logo, the snapshot, the brief, and a "Read full" link to its page. */
function CaseCard({ study, featured = false }: { study: CaseStudy; featured?: boolean }) {
  const href = caseStudyHref(study.id);
  const number = String(study.id).padStart(2, "0");

  return (
    <Reveal
      className={`group relative flex flex-col overflow-hidden rounded-[2rem] bg-white shadow-float ring-1 ring-ink/6 md:rounded-[2.5rem] ${
        featured ? "md:col-span-2 lg:grid lg:grid-cols-[1.1fr_1fr]" : ""
      }`}
    >
      <Link
        href={href}
        tabIndex={-1}
        aria-hidden
        className={`relative block overflow-hidden ${featured ? "aspect-[4/3] lg:aspect-auto lg:min-h-[30rem]" : "aspect-[16/10]"}`}
      >
        <CaseCover
          study={study}
          decorative
          sizes={featured ? "(min-width: 1024px) 55vw, 100vw" : "(min-width: 768px) 45vw, 100vw"}
          className="transition-transform duration-[1.4s] ease-out group-hover:scale-105"
          priority={featured}
        />
        <span className="absolute inset-0 bg-gradient-to-t from-ink/35 via-transparent to-transparent" />
        <span className="absolute top-4 right-4 rounded-full bg-ink/70 px-3 py-1.5 font-display text-xs tracking-[0.14em] text-mint tabular-nums backdrop-blur md:top-5 md:right-5">
          CASE {number}
        </span>
      </Link>

      <div className={`flex flex-1 flex-col gap-5 p-6 sm:p-8 ${featured ? "lg:p-12" : ""}`}>
        <div className="flex items-center gap-4">
          <span className="grid h-14 w-24 shrink-0 place-items-center rounded-2xl bg-white p-2 ring-1 ring-ink/8">
            <Image src={study.logo.src} alt={study.logo.alt} width={160} height={80} className="max-h-10 w-auto object-contain" />
          </span>
          <span className="text-xs font-semibold tracking-[0.14em] text-grey uppercase">{study.client}</span>
        </div>

        <h2
          className={`font-display leading-[1.05] font-light tracking-tight ${
            featured ? "text-[clamp(1.9rem,3.4vw,2.9rem)]" : "text-[clamp(1.6rem,2.6vw,2.2rem)]"
          }`}
        >
          {study.activity ?? study.client}
        </h2>

        {study.writeUp && (
          <p className={`leading-relaxed text-ink/70 ${featured ? "line-clamp-4" : "line-clamp-3"}`}>{study.writeUp.briefing}</p>
        )}

        {(study.participants || study.location) && (
          <dl className="grid grid-cols-2 gap-4 border-t border-ink/8 pt-5">
            {study.participants && <Fact label="Participants" value={study.participants} />}
            {study.location && <Fact label="Location" value={study.location} />}
          </dl>
        )}

        <div className="mt-auto flex items-end justify-between gap-4 pt-2">
          <p className="max-w-[26ch] text-[13px] leading-snug text-emerald-deep">{study.objective}</p>
          <Link
            href={href}
            aria-label={`Read the full ${study.client}${study.activity ? ` ${study.activity}` : ""} case study`}
            className="group/btn inline-flex shrink-0 items-center gap-3 rounded-full bg-ink py-1.5 pr-1.5 pl-5 text-sm font-semibold text-cream transition-transform duration-500 ease-spring active:scale-[0.97]"
          >
            Read full
            <span className="grid size-9 place-items-center rounded-full bg-mint text-ink transition-transform duration-500 ease-spring group-hover/btn:rotate-45">
              <ArrowUpRight className="size-4" />
            </span>
          </Link>
        </div>
      </div>
    </Reveal>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0">
      <dt className="text-[11px] font-semibold tracking-[0.14em] text-emerald uppercase">{label}</dt>
      <dd className="mt-1 text-sm font-medium text-ink">{value}</dd>
    </div>
  );
}
