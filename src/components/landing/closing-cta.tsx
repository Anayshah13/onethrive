"use client";

import Image from "next/image";
import { useRef } from "react";
import { contact } from "@/data/content";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";
import { ctaCurve } from "./curves";
import { FlowLine, PixelCluster } from "./decor";
import { Reveal } from "./reveal";
import { TalkButton } from "./talk";

const PHOTOS = [
  { src: "/photos/beach-team.jpg", className: "top-10 left-[5%] -rotate-6", speed: -36 },
  { src: "/photos/pottery.jpg", className: "top-12 right-[6%] rotate-5", speed: 46 },
  { src: "/photos/champions.jpg", className: "bottom-10 left-[10%] -rotate-3", speed: -26 },
] as const;

export function ClosingCta() {
  const panelRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const panel = panelRef.current;
      if (!panel || prefersReducedMotion()) return;
      const photos = panel.querySelectorAll<HTMLElement>("[data-photo]");
      photos.forEach((photo) => {
        const speed = Number(photo.dataset.speed ?? 0);
        gsap.to(photo, {
          y: speed,
          ease: "none",
          scrollTrigger: {
            trigger: panel,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });
    },
    { scope: panelRef },
  );

  return (
    <section className="px-2 py-8 md:px-3 md:py-12" aria-labelledby="cta-title">
      <div
        ref={panelRef}
        className="relative mx-auto max-w-[1400px] overflow-hidden rounded-[2.25rem] bg-ink px-6 py-20 text-center md:rounded-[2.75rem] md:py-32"
      >
        <div aria-hidden className="absolute -top-24 -left-16 size-80 rounded-full bg-mint/20 blur-3xl" />
        <div aria-hidden className="absolute -right-20 -bottom-28 size-96 rounded-full bg-emerald/60 blur-3xl" />

        <PixelCluster cols={14} rows={8} seed={61} className="absolute top-6 right-[22%] opacity-20" />
        <PixelCluster cols={12} rows={6} seed={67} className="absolute bottom-8 left-[30%] hidden opacity-15 md:block" />

        <FlowLine
          curve={ctaCurve}
          start="top 85%"
          end="center 45%"
          className="z-0"
        />

        {PHOTOS.map((photo) => (
          <div
            key={photo.src}
            data-photo
            data-speed={photo.speed}
            className={`pointer-events-none absolute hidden h-[190px] w-[150px] overflow-hidden rounded-2xl opacity-80 md:block ${photo.className}`}
          >
            <Image src={photo.src} alt="" fill className="object-cover" sizes="150px" />
          </div>
        ))}

        <Reveal stagger={0.1} className="relative z-10 flex flex-col items-center">
          <span className="text-xs uppercase tracking-[0.2em] text-mint">Your next offsite</span>
          <h2
            id="cta-title"
            className="font-display mx-auto mt-5 max-w-[18ch] text-balance text-[clamp(2.3rem,5.5vw,5rem)] leading-[1.02] font-light tracking-tight text-cream"
          >
            Let&apos;s plan something your team will{" "}
            <span className="font-serif text-mint italic">talk about.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-md text-cream/60">
            Group size, city, and what you want the day to change. We&apos;ll take it from there.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-6">
            <TalkButton size="lg" />
            <a
              href={`mailto:${contact.email}`}
              className="text-sm text-cream/70 transition-colors hover:text-mint"
            >
              {contact.email}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
