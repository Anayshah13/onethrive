"use client";

import Image from "next/image";
import { useRef } from "react";
import { activityCount, crew, rating, stats } from "@/data/content";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";
import { Glow, PixelCluster } from "./decor";
import { Reveal } from "./reveal";

/* Collage placement per photo (same order as crew.photos). Speed is the scrubbed parallax in px. */
const FRAMES = [
  { className: "left-0 top-0 z-10 w-[64%] -rotate-3", speed: -40, sizes: "(min-width: 768px) 30vw, 64vw" },
  { className: "right-0 top-[12%] z-20 w-[44%] rotate-[5deg]", speed: 56, sizes: "(min-width: 768px) 21vw, 44vw" },
  { className: "bottom-0 left-[26%] z-30 w-[42%] -rotate-2", speed: 24, sizes: "(min-width: 768px) 20vw, 42vw" },
] as const;

const figures = [
  ...stats.map((s) => ({ value: s.value, suffix: s.suffix, label: s.label, decimals: 0 })),
  { value: activityCount, suffix: "+", label: "activities in the playbook", decimals: 0 },
  { value: Number(rating.score), suffix: "/5", label: "average rating on Google", decimals: 1 },
];

const format = (value: number, decimals: number) =>
  decimals ? value.toFixed(decimals) : Math.round(value).toLocaleString("en-IN");

export function Crew() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el || prefersReducedMotion()) return;
      const q = gsap.utils.selector(el);

      /* Photos drift at different speeds as the section passes. */
      q<HTMLElement>("[data-photo]").forEach((photo) => {
        gsap.to(photo, {
          y: Number(photo.dataset.speed ?? 0),
          ease: "none",
          scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
        });
      });

      /* The sticker keeps turning with the scroll. */
      gsap.to(q("[data-sticker]"), {
        rotation: 200,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 0.8 },
      });

      /* Numbers count up once when the stats row enters. */
      const row = q<HTMLElement>("[data-stats]")[0];
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
    { scope: root },
  );

  return (
    <section ref={root} id="crew" aria-labelledby="crew-title" className="relative isolate overflow-x-clip py-14 md:py-20">
      <Glow className="-z-10 top-20 -left-24 size-[26rem]" />
      <Glow tone="soft" className="-z-10 right-0 bottom-10 size-[28rem]" />
      <PixelCluster cols={14} rows={7} seed={41} className="absolute top-8 right-4 hidden opacity-70 md:block" />

      <div className="mx-auto grid w-full max-w-[1240px] items-center gap-16 px-5 md:grid-cols-[1fr_1fr] md:gap-12 md:px-8 lg:gap-20">
        {/* Collage */}
        <div className="relative mx-auto aspect-[1/1.12] w-full max-w-[560px]">
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

          {/* Rotating "Gen Z-led" sticker */}
          <div className="absolute right-[4%] bottom-[8%] z-40 grid size-24 place-items-center rounded-full bg-ink text-mint shadow-float md:size-28">
            <svg data-sticker viewBox="0 0 100 100" aria-hidden className="absolute inset-0 size-full">
              <defs>
                <path id="crew-sticker-ring" d="M50 50 m-37 0 a37 37 0 1 1 74 0 a37 37 0 1 1 -74 0" />
              </defs>
              <text className="fill-mint text-[9px] font-medium uppercase">
                <textPath href="#crew-sticker-ring" textLength={228} lengthAdjust="spacing">
                  Gen Z-led · one team · end to end ·
                </textPath>
              </text>
            </svg>
            <div className="relative size-10 md:size-11">
              <Image src="/brand/logo-green.png" alt="" fill sizes="44px" className="object-contain" />
            </div>
          </div>
        </div>

        {/* Copy */}
        <div className="min-w-0">
          <Reveal stagger={0.1}>
            <span className="eyebrow">{crew.eyebrow}</span>
            <h2
              id="crew-title"
              className="mt-6 max-w-[16ch] font-display text-[clamp(2.2rem,4.6vw,4rem)] leading-[1.04] font-light tracking-tight text-balance text-ink"
            >
              {crew.heading.lead} <span className="font-serif text-emerald italic">{crew.heading.accent}</span>
            </h2>
            <p className="mt-5 max-w-md leading-7 text-grey">{crew.intro}</p>
          </Reveal>

          <Reveal as="ul" stagger={0.1} className="mt-10 flex flex-col gap-3">
            {crew.principles.map((item, i) => (
              <li key={item.title} className="flex gap-4 rounded-2xl bg-white/70 p-4 ring-1 ring-ink/5 md:p-5">
                <span className="grid size-9 shrink-0 place-items-center rounded-full bg-mint-soft font-display text-sm font-medium text-emerald">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="min-w-0">
                  <p className="font-display text-lg font-medium tracking-tight text-ink">{item.title}</p>
                  <p className="mt-1 text-sm leading-6 text-grey">{item.body}</p>
                </div>
              </li>
            ))}
          </Reveal>

          <dl data-stats className="mt-10 grid grid-cols-2 gap-x-6 gap-y-6 border-t border-ink/10 pt-8 sm:grid-cols-4">
            {figures.map((figure) => (
              <div key={figure.label} className="flex flex-col">
                <dt className="order-2 mt-1 text-xs leading-snug text-grey">{figure.label}</dt>
                <dd className="order-1 font-display text-[clamp(1.9rem,3vw,2.5rem)] leading-none font-medium tracking-tight text-ink tabular-nums">
                  <span data-count={figure.value} data-decimals={figure.decimals}>
                    {format(figure.value, figure.decimals)}
                  </span>
                  <span className="ml-0.5 font-light text-emerald">{figure.suffix}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
