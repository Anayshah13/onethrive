"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { activityCount, aboutCopy, clients, crew, rating, stats } from "@/data/content";
import { aboutSections } from "@/data/site";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";
import { Glow, PixelCluster } from "@/components/landing/decor";
import { ArrowUpRight } from "@/components/landing/icons";
import { Reveal } from "@/components/landing/reveal";
import { TalkButton } from "@/components/landing/talk";
import { PillButton } from "@/components/landing/ui";
import { AboutTabs, PageHero } from "@/components/site/page-kit";

/* Background art per hub card: a photo for a sense of place, plus a tone for the overlay. */
const CARD_ART: Record<string, { photo: string; alt: string }> = {
  "/about-us/our-story": { photo: "/photos/onethrive-crew.jpg", alt: "The OneThrive crew beside their banner" },
  "/about-us/why-us": { photo: "/photos/offsite-group.jpg", alt: "A full offsite group gathered on a lawn" },
  "/about-us/testimonials": { photo: "/photos/laughter.jpg", alt: "Laughter yoga session in the office" },
  "/about-us/case-studies": { photo: "/photos/champions.jpg", alt: "A winning team holding their trophy" },
};

const figures = [
  ...stats.map((s) => ({ value: s.value, suffix: s.suffix, label: s.label, decimals: 0 })),
  { value: activityCount, suffix: "+", label: "activities in the playbook", decimals: 0 },
  { value: Number(rating.score), suffix: "/5", label: "average rating on Google", decimals: 1 },
];

const format = (value: number, decimals: number) =>
  decimals ? value.toFixed(decimals) : Math.round(value).toLocaleString("en-IN");

const half = Math.ceil(clients.length / 2);
const logoRows = [clients.slice(0, half), clients.slice(half)];

function LogoRow({ items, reverse }: { items: ReadonlyArray<{ src: string; alt: string }>; reverse?: boolean }) {
  return (
    <div className="marquee-host marquee-mask overflow-hidden">
      <div
        className={`marquee flex w-max ${reverse ? "marquee-reverse" : ""}`}
        style={{ "--marquee-duration": reverse ? "46s" : "40s" } as React.CSSProperties}
      >
        {[0, 1].map((copy) =>
          items.map((client) => (
            <div
              key={`${copy}-${client.src}`}
              aria-hidden={copy === 1 ? true : undefined}
              className="mr-3 grid h-20 w-36 shrink-0 place-items-center rounded-2xl bg-white/70 ring-1 ring-ink/5"
            >
              <div className="relative h-10 w-24">
                <Image
                  src={client.src}
                  alt={copy === 1 ? "" : client.alt}
                  fill
                  sizes="96px"
                  className="object-contain opacity-70 grayscale transition duration-500 hover:opacity-100 hover:grayscale-0"
                />
              </div>
            </div>
          )),
        )}
      </div>
    </div>
  );
}

/* One card per About section: the hub's main job, so each is a big, obviously clickable tile. */
function SectionCard({ section, feature = false }: { section: (typeof aboutSections)[number]; feature?: boolean }) {
  const art = CARD_ART[section.href];
  return (
    <Link
      href={section.href}
      className={`group relative isolate flex min-h-[19rem] flex-col justify-end overflow-hidden rounded-[2rem] bg-ink p-7 shadow-float ring-1 ring-ink/5 transition-[transform,box-shadow] duration-500 ease-spring hover:-translate-y-1.5 hover:shadow-lift md:rounded-[2.25rem] md:p-9 ${
        feature ? "min-h-[22rem] md:col-span-2" : ""
      }`}
    >
      {art && (
        <Image
          src={art.photo}
          alt={art.alt}
          fill
          sizes={feature ? "(min-width: 768px) 60vw, 100vw" : "(min-width: 768px) 30vw, 100vw"}
          className="object-cover opacity-55 transition-transform duration-700 ease-out group-hover:scale-[1.06]"
        />
      )}
      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/10" />
      <span aria-hidden className="absolute -top-16 -right-10 size-56 rounded-full bg-mint/20 blur-3xl transition-transform duration-1000 ease-out group-hover:scale-125" />

      <div className="relative flex items-start justify-between gap-4">
        <span className="font-display text-sm font-medium tracking-tight text-mint">{section.index}</span>
        <span className="grid size-11 shrink-0 place-items-center rounded-full bg-mint text-ink transition-transform duration-500 ease-spring group-hover:scale-110 group-hover:rotate-45">
          <ArrowUpRight className="size-4" />
        </span>
      </div>
      <h3
        className={`relative mt-8 font-display leading-[0.98] font-light tracking-tight text-cream text-balance ${
          feature ? "text-[clamp(2rem,4.2vw,3.4rem)]" : "text-[clamp(1.7rem,3vw,2.5rem)]"
        }`}
      >
        {section.label}
      </h3>
      <p className="relative mt-3 max-w-[36ch] text-sm leading-relaxed text-cream/70">{section.blurb}</p>
    </Link>
  );
}

export function AboutOverview() {
  const statsRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const row = statsRef.current;
      if (!row || prefersReducedMotion()) return;
      const q = gsap.utils.selector(row);
      q<HTMLElement>("[data-count]").forEach((node) => {
        const target = Number(node.dataset.count);
        const decimals = Number(node.dataset.decimals ?? 0);
        const counter = { v: 0 };
        node.textContent = format(0, decimals);
        gsap.to(counter, {
          v: target,
          duration: 2.2,
          ease: "expo.out",
          onUpdate: () => {
            node.textContent = format(counter.v, decimals);
          },
          scrollTrigger: { trigger: row, start: "top 88%", once: true },
        });
      });
    },
    { scope: statsRef },
  );

  return (
    <>
      <PageHero
        eyebrow="About Us"
        lead="The crew that makes"
        accent="teams one."
        intro={`${crew.intro} ${aboutCopy}`}
        crumbs={[{ label: "About Us" }]}
      >
        <AboutTabs />
      </PageHero>

      {/* Hub grid: the primary navigation into the four About sections. */}
      <section className="relative isolate overflow-x-clip py-8 md:py-12">
        <div className="mx-auto w-full max-w-[1240px] px-5 md:px-8">
          <Reveal stagger={0.1} className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
            {aboutSections.map((section, i) => (
              <SectionCard key={section.href} section={section} feature={i === 0} />
            ))}
          </Reveal>
        </div>
      </section>

      {/* Stats band */}
      <section className="relative isolate overflow-x-clip py-20 md:py-32">
        <Glow className="-z-10 top-10 -left-24 size-[26rem]" />
        <Glow tone="soft" className="-z-10 right-0 bottom-0 size-[28rem]" />
        <PixelCluster cols={14} rows={7} seed={9} className="absolute top-8 right-4 hidden opacity-70 md:block" />
        <div className="mx-auto w-full max-w-[1240px] px-5 md:px-8">
          <Reveal>
            <span className="eyebrow">By the numbers</span>
          </Reveal>
          <div
            ref={statsRef}
            className="mt-10 grid grid-cols-2 gap-x-6 gap-y-10 border-t border-ink/10 pt-10 sm:grid-cols-4"
          >
            {figures.map((figure) => (
              <div key={figure.label} className="flex flex-col">
                <dt className="order-2 mt-2 text-sm leading-snug text-grey">{figure.label}</dt>
                <dd className="order-1 font-display text-[clamp(2.4rem,4.4vw,3.75rem)] leading-none font-medium tracking-tight text-ink tabular-nums">
                  <span data-count={figure.value} data-decimals={figure.decimals}>
                    {format(figure.value, figure.decimals)}
                  </span>
                  <span className="ml-0.5 font-light text-emerald">{figure.suffix}</span>
                </dd>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Client logo marquee */}
      <section className="relative isolate overflow-x-clip py-8 md:py-12">
        <div className="mx-auto w-full max-w-[1240px] px-5 md:px-8">
          <Reveal>
            <p className="eyebrow">Teams we&apos;ve hosted</p>
          </Reveal>
          <div className="mt-8 flex flex-col gap-3">
            <LogoRow items={logoRows[0]} />
            <LogoRow items={logoRows[1]} reverse />
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="relative isolate overflow-x-clip py-20 md:py-32">
        <div className="mx-auto w-full max-w-[1240px] px-5 md:px-8">
          <Reveal>
            <span className="eyebrow">How we work</span>
            <h2 className="mt-6 max-w-[18ch] font-display text-[clamp(2rem,4vw,3.2rem)] leading-[1.05] font-light tracking-tight text-balance text-ink">
              {crew.heading.lead} <span className="font-serif text-emerald italic">{crew.heading.accent}</span>
            </h2>
          </Reveal>
          <Reveal
            as="ul"
            stagger={0.1}
            className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-3"
          >
            {crew.principles.map((item, i) => (
              <li key={item.title} className="rounded-2xl bg-white/70 p-6 ring-1 ring-ink/5">
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

      {/* Closing CTA */}
      <section className="px-2 pb-12 md:px-3 md:pb-20">
        <div className="relative mx-auto max-w-[1400px] overflow-hidden rounded-[2.25rem] bg-ink px-6 py-20 text-center md:rounded-[2.75rem] md:py-28">
          <div aria-hidden className="absolute -top-24 -left-16 size-80 rounded-full bg-mint/20 blur-3xl" />
          <div aria-hidden className="absolute -right-20 -bottom-28 size-96 rounded-full bg-emerald/60 blur-3xl" />
          <PixelCluster cols={14} rows={8} seed={51} className="absolute top-6 right-[22%] opacity-20" />

          <Reveal stagger={0.1} className="relative z-10 flex flex-col items-center">
            <span className="text-xs uppercase tracking-[0.2em] text-mint">Meet the crew</span>
            <h2 className="font-display mx-auto mt-5 max-w-[18ch] text-balance text-[clamp(2.1rem,5vw,4.5rem)] leading-[1.05] font-light tracking-tight text-cream">
              Ready to see what one team{" "}
              <span className="font-serif text-mint italic">can build for yours?</span>
            </h2>
            <p className="mx-auto mt-5 max-w-md text-cream/60">
              Tell us your group size and city, and we&apos;ll shape a format around what the day needs to change.
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
              <TalkButton size="lg" />
              <PillButton href="/contact-us" variant="light" size="lg">
                Contact us
              </PillButton>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
