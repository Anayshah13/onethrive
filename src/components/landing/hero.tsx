"use client";

import Image from "next/image";
import { useRef } from "react";
import { stats } from "@/data/content";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";

export function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });
      timeline
        .from(".hero-photo", { scale: 1.08, duration: 1.5 }, 0)
        .from(".hero-line", { y: 36, opacity: 0, stagger: 0.12, duration: 0.9 }, 0.15)
        .from(".hero-stat", { y: 18, opacity: 0, stagger: 0.1, duration: 0.7 }, 0.35)
        .from(".hero-scroll", { scale: 0.6, opacity: 0, duration: 0.5 }, 0.7);

      stats.forEach((stat, index) => {
        const node = root.current?.querySelectorAll<HTMLElement>("[data-count]")[index];
        if (!node) return;
        const counter = { n: 0 };
        gsap.to(counter, {
          n: stat.value,
          duration: 1.5,
          delay: 0.45,
          ease: "power2.out",
          onUpdate: () => {
            node.textContent = `${Math.round(counter.n).toLocaleString("en-IN")}${stat.suffix}`;
          },
        });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="mx-auto w-full max-w-[1240px] px-5 pt-2 md:px-8">
      <div className="relative min-h-[78vh] overflow-hidden rounded-[32px] bg-[#102018]">
        <Image
          src="/event-photos/Group Photo/Copy of Copy of Group Photo.JPG"
          alt="OneThrive team with the people they just hosted"
          fill
          priority
          className="hero-photo object-cover object-[center_30%]"
          sizes="(min-width: 1240px) 1200px, 100vw"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,20,13,0.55)_0%,rgba(7,20,13,0.08)_34%,rgba(7,20,13,0.12)_58%,rgba(7,20,13,0.88)_100%)]" />

        <div className="absolute top-6 right-6 flex gap-8 text-white md:top-8 md:right-10">
          {stats.map((stat) => (
            <div key={stat.label} className="hero-stat text-right">
              <p data-count className="font-display text-4xl leading-none drop-shadow-[0_2px_10px_rgba(0,0,0,0.45)] md:text-5xl">
                {stat.value.toLocaleString("en-IN")}
                {stat.suffix}
              </p>
              <p className="mt-1 text-xs tracking-wide text-white/80 md:text-sm">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="absolute right-6 bottom-6 left-6 md:right-10 md:bottom-10 md:left-10">
          <h1 className="max-w-4xl text-white">
            <span className="hero-line font-display block text-[1.7rem] leading-[1.05] font-semibold tracking-tight drop-shadow-[0_2px_16px_rgba(0,0,0,0.55)] sm:text-[2.2rem] md:text-[clamp(2rem,3.5vw,3.35rem)] md:whitespace-nowrap">
              Teams That Connect.
            </span>
            <span className="hero-line font-display mt-1 block text-[1.7rem] leading-[1.05] font-semibold tracking-tight drop-shadow-[0_2px_16px_rgba(0,0,0,0.55)] sm:text-[2.2rem] md:text-[clamp(2rem,3.5vw,3.35rem)] md:whitespace-nowrap">
              Workplaces That Thrive.
            </span>
          </h1>
        </div>

        <a
          href="#about"
          className="hero-scroll absolute top-1/2 right-5 z-10 hidden size-12 -translate-y-1/2 place-items-center rounded-full bg-white/15 text-white backdrop-blur-md md:right-8 md:grid"
          aria-label="Scroll to the next section"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
            <path d="M9 3v12M4 10l5 5 5-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </a>
      </div>
    </section>
  );
}
