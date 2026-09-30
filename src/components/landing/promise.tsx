"use client";

import Image from "next/image";
import { useRef } from "react";
import { aboutCopy, clients, rating } from "@/data/content";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";
import { promiseCurve } from "./curves";
import { FlowLine, Glow, PixelCluster } from "./decor";
import { GoogleMark, Star } from "./icons";
import { Reveal } from "./reveal";
import { scrollToHash } from "./smooth-scroll";
import { TextLink, Words } from "./ui";

const avatars = ["/photos/laughter.jpg", "/photos/pottery-smile.jpg", "/photos/caricature.jpg"];

const half = Math.ceil(clients.length / 2);
const rows = [clients.slice(0, half), clients.slice(half)];

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

export function PromiseSection() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el || prefersReducedMotion()) return;
      const statement = el.querySelector<HTMLElement>(".promise-statement");
      if (!statement) return;
      gsap.fromTo(
        statement.querySelectorAll(".word"),
        { opacity: 0.14 },
        {
          opacity: 1,
          ease: "none",
          stagger: 0.1,
          scrollTrigger: { trigger: statement, start: "top 80%", end: "bottom 50%", scrub: true },
        },
      );
    },
    { scope: root },
  );

  return (
    <section ref={root} id="promise" className="relative isolate py-16 md:py-24 lg:py-28">
      <Glow className="-z-10 top-16 right-[8%] size-[26rem]" />
      <Glow tone="soft" className="-z-10 bottom-0 -left-24 size-[30rem]" />
      <FlowLine curve={promiseCurve} start="top 70%" end="bottom 60%" showHead={false} className="z-10" />
      <PixelCluster cols={16} rows={7} seed={3} className="absolute left-0 top-10 md:left-6" />
      <PixelCluster cols={12} rows={8} seed={7} className="absolute bottom-24 right-4 hidden md:block" />
      <PixelCluster cols={8} rows={6} seed={23} cell={14} className="absolute top-24 left-[52%] hidden lg:block" />

      <div className="mx-auto grid w-full max-w-[1320px] items-end gap-20 px-5 md:px-10 lg:grid-cols-[1.35fr_0.65fr] lg:gap-24">
        <div className="relative z-20">
          <span className="eyebrow">The OneThrive Promise</span>
          <p className="promise-statement mt-10 max-w-[22ch] font-display text-[clamp(2.1rem,4.4vw,4rem)] font-light leading-[1.12] tracking-tight text-ink">
            <Words text={aboutCopy} />
          </p>
          <TextLink onClick={() => scrollToHash("#testimonials")} className="mt-12">
            explore more client stories
          </TextLink>
        </div>

        <Reveal stagger={0.12} className="relative z-20 flex min-w-0 flex-col gap-12">
          <div className="w-fit max-w-full rounded-[2rem] bg-white/50 p-1.5 ring-1 ring-ink/5">
            <div className="flex items-center gap-4 rounded-[calc(2rem-0.375rem)] bg-white px-5 py-4 shadow-float">
              <div className="flex shrink-0 -space-x-3">
                {avatars.map((src) => (
                  <span key={src} className="relative size-11 overflow-hidden rounded-full ring-2 ring-white">
                    <Image src={src} alt="" fill sizes="44px" className="object-cover" />
                  </span>
                ))}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-ink">
                  Excellent <span className="font-display text-base">{rating.score}</span> out of 5
                </p>
                <div className="mt-1 flex items-center gap-2">
                  <span className="flex text-[#F5B301]" aria-label={`Rated ${rating.score} out of 5`}>
                    {Array.from({ length: 5 }, (_, i) => (
                      <Star key={i} className="size-3.5" />
                    ))}
                  </span>
                  <span className="flex items-center gap-1 text-xs font-medium text-ink/70">
                    <GoogleMark className="size-3.5" />
                    Google
                  </span>
                </div>
                <p className="mt-1 text-xs text-grey">{rating.label}</p>
              </div>
            </div>
          </div>

          <div className="min-w-0">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-grey">Teams we&apos;ve hosted</p>
            <div className="flex flex-col gap-3">
              <LogoRow items={rows[0]} />
              <LogoRow items={rows[1]} reverse />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
