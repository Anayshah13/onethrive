import Image from "next/image";
import Link from "next/link";
import { caseStudies, caseStudyHref, type CaseStudy } from "@/data/case-studies";
import { Glow, PixelCluster } from "@/components/landing/decor";
import { ArrowLeft, ArrowRight } from "@/components/landing/icons";
import { Reveal } from "@/components/landing/reveal";
import { PillButton } from "@/components/landing/ui";
import { CaseCover } from "@/components/site/case-cover";

/* Full write-up of a single case study at /about-us/case-studies/{id}. */
export function CaseStudyDetail({ study }: { study: CaseStudy }) {
  const index = caseStudies.findIndex((s) => s.id === study.id);
  const prev = caseStudies[(index - 1 + caseStudies.length) % caseStudies.length];
  const next = caseStudies[(index + 1) % caseStudies.length];
  const number = String(study.id).padStart(2, "0");

  const { writeUp } = study;
  const story = writeUp
    ? [
        { label: "Client background", body: writeUp.background },
        { label: "Client briefing", body: writeUp.briefing },
        { label: "Solution provided", body: writeUp.solution },
        { label: "Implementation", body: writeUp.implementation },
        { label: "Results & impact", body: writeUp.results },
      ]
    : [];
  const facts = (
    [
      ["Participants", study.participants],
      ["Activity", study.activity],
      ["Location", study.location],
      ["Objective", study.objective],
    ] as Array<[string, string | undefined]>
  ).filter((fact): fact is [string, string] => Boolean(fact[1]));

  return (
    <>
      <section className="relative isolate overflow-x-clip pt-32 pb-12 md:pt-44 md:pb-16">
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
              <Crumb href="/about-us">About us</Crumb>
              <Crumb href="/about-us/case-studies">Case studies</Crumb>
              <li className="flex items-center gap-1.5">
                <span aria-hidden className="text-ink/25">/</span>
                <span aria-current="page" className="text-ink">
                  {study.client}
                </span>
              </li>
            </ol>
          </nav>

          <Reveal className="mt-10 flex flex-col gap-8 md:mt-14">
            <div className="flex flex-wrap items-center gap-4">
              <span className="grid h-16 w-28 place-items-center rounded-2xl bg-white p-2.5 shadow-float ring-1 ring-ink/6">
                <Image src={study.logo.src} alt={study.logo.alt} width={200} height={100} className="max-h-11 w-auto object-contain" priority />
              </span>
              <span className="eyebrow">Case {number}</span>
            </div>
            <h1 className="max-w-[18ch] font-display text-[clamp(2.6rem,6.4vw,5.75rem)] leading-[0.98] font-light tracking-tight text-balance">
              {study.client}{" "}
              {study.activity && <span className="font-serif text-emerald italic">{study.activity}</span>}
            </h1>
          </Reveal>

          {facts.length > 0 && (
          <Reveal
            delay={0.1}
            className={`mt-10 grid gap-px overflow-hidden rounded-[1.75rem] bg-ink/8 ring-1 ring-ink/8 md:mt-14 ${
              facts.length === 1 ? "max-w-sm" : facts.length === 2 ? "max-w-2xl grid-cols-2" : "grid-cols-2 lg:grid-cols-4"
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
          </Reveal>
        </section>
      )}

      {(writeUp || study.video) && (
      <section className="relative isolate overflow-x-clip py-16 md:py-28">
        <div
          className={`mx-auto grid w-full max-w-[1240px] gap-12 px-5 md:px-8 ${
            writeUp && study.video ? "lg:grid-cols-[1fr_20rem] lg:gap-16" : ""
          }`}
        >
          {writeUp && (
          <div className="flex min-w-0 flex-col gap-12 md:gap-16">
            {story.map((part, i) => (
              <Reveal key={part.label} className="grid gap-4 md:grid-cols-[12rem_1fr] md:gap-10">
                <p className="flex items-baseline gap-3 text-xs font-semibold tracking-[0.14em] text-emerald uppercase">
                  <span className="font-display text-ink/30 tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                  {part.label}
                </p>
                <p className="max-w-[62ch] text-[clamp(1.02rem,1.3vw,1.15rem)] leading-relaxed text-ink/75">{part.body}</p>
              </Reveal>
            ))}
          </div>
          )}

          {study.video && (
            <aside className="lg:sticky lg:top-28 lg:self-start">
              <Reveal className="mx-auto w-full max-w-[20rem]">
                <p className="mb-4 text-xs font-semibold tracking-[0.14em] text-grey uppercase">Watch the day</p>
                <div className="overflow-hidden rounded-[1.75rem] bg-ink shadow-lift ring-1 ring-ink/10">
                  <video
                    src={study.video.src}
                    poster={study.video.poster}
                    controls
                    playsInline
                    preload="none"
                    className="aspect-[9/16] w-full object-cover"
                  >
                    <track kind="captions" />
                  </video>
                </div>
              </Reveal>
            </aside>
          )}
        </div>
      </section>
      )}

      {writeUp && (
      <section className="px-2 md:px-3">
        <Reveal className="relative mx-auto max-w-[1400px] overflow-hidden rounded-[2.25rem] bg-ink px-6 py-14 text-cream md:rounded-[2.75rem] md:px-16 md:py-20">
          <span aria-hidden className="absolute -top-24 -right-16 size-80 rounded-full bg-mint/20 blur-3xl" />
          <p className="relative text-xs font-medium tracking-[0.2em] text-mint uppercase">Conclusion</p>
          <p className="relative mt-6 max-w-[40ch] font-display text-[clamp(1.5rem,2.8vw,2.4rem)] leading-[1.2] font-light tracking-tight">
            {writeUp.conclusion}
          </p>
        </Reveal>
      </section>
      )}

      {study.photos.length > 0 && (
        <section className="py-16 md:py-24">
          <div className="mx-auto w-full max-w-[1240px] px-5 md:px-8">
            <Reveal className="mb-8 flex items-end justify-between gap-4 md:mb-10">
              <h2 className="font-display text-[clamp(1.8rem,3.6vw,3rem)] leading-none font-light tracking-tight">
                From the <span className="font-serif text-emerald italic">day itself.</span>
              </h2>
            </Reveal>
            <Reveal stagger={0.06} className="columns-2 gap-3 md:columns-3 md:gap-4 [&>*]:mb-3 md:[&>*]:mb-4">
              {study.photos.map((photo) => (
                <div key={photo.src} className="relative break-inside-avoid overflow-hidden rounded-[1.25rem] ring-1 ring-ink/6">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    width={800}
                    height={1000}
                    sizes="(min-width: 768px) 33vw, 50vw"
                    className="h-auto w-full"
                  />
                </div>
              ))}
            </Reveal>
          </div>
        </section>
      )}

      <section className="pb-16 md:pb-24">
        <div className="mx-auto grid w-full max-w-[1240px] gap-4 px-5 sm:grid-cols-2 md:px-8">
          <NeighbourLink study={prev} direction="prev" />
          <NeighbourLink study={next} direction="next" />
        </div>
        <div className="mt-12 flex justify-center">
          <PillButton href="/contact-us" size="lg">
            Plan your event
          </PillButton>
        </div>
      </section>
    </>
  );
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
