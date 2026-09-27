"use client";

import Image from "next/image";
import { useRef } from "react";
import { heroSlides, stats } from "@/data/content";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";
import { heroCurve, heroCurveMobile } from "./curves";
import { FlowLine } from "./decor";

const DWELL = 6;
const FADE = 1.2;

export function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      const q = gsap.utils.selector(el);

      if (prefersReducedMotion()) {
        q<HTMLElement>("[data-count]").forEach((node) => {
          node.textContent = Number(node.dataset.count).toLocaleString("en-IN");
        });
        return;
      }

            const slides = q<HTMLElement>(".hero-slide");
      const kb = q<HTMLElement>(".hero-kb");
      const bars = q<HTMLElement>(".hero-bar");
      const n = slides.length;

      /* Intro */
      const intro = gsap.timeline({ defaults: { ease: "expo.out" } });
      intro
        .from(
          ".hero-screen",
          {
            rotateX: 34,
            scale: 0.84,
            yPercent: 8,
            transformPerspective: 1600,
            transformOrigin: "50% 100%",
            duration: 2,
            ease: "expo.out",
          },
          0,
        )
        .from(".hero-intro", { scale: 1.25, duration: 2.4 }, 0)
        .from(".hero-line", { yPercent: 110, duration: 1.4, stagger: 0.12 }, 0.2)
        .from(".hero-stat", { y: 28, autoAlpha: 0, duration: 1.2, stagger: 0.12 }, 0.5)
        .from(".hero-meta", { autoAlpha: 0, duration: 1 }, 0.9);

      q<HTMLElement>("[data-count]").forEach((node) => {
        const target = Number(node.dataset.count);
        const counter = { v: 0 };
        node.textContent = "0";
        gsap.to(counter, {
          v: target,
          duration: 2.6,
          delay: 0.7,
          ease: "expo.out",
          onUpdate: () => {
            node.textContent = Math.round(counter.v).toLocaleString("en-IN");
          },
        });
      });

      /* Slideshow: crossfade + Ken Burns, looping */
      if (n > 1) {
        gsap.set(slides, { autoAlpha: 0 });
        gsap.set(slides[0], { autoAlpha: 1 });
        gsap.set(bars, { scaleX: 0 });

        const show = gsap.timeline({ repeat: -1 });
        for (let i = 0; i < n; i++) {
          const next = (i + 1) % n;
          const start = i * DWELL;
          const out = start + DWELL - FADE;

          show.fromTo(kb[i], { scale: 1.12 }, { scale: 1, duration: DWELL + FADE, ease: "none" }, i === 0 ? 0 : start - FADE);
          show.fromTo(bars[i], { scaleX: 0 }, { scaleX: 1, duration: DWELL, ease: "none" }, start);
          show.set(bars[i], { scaleX: 0 }, start + DWELL);

          if (next !== 0) {
            show.to(slides[next], { autoAlpha: 1, duration: FADE, ease: "power1.inOut" }, out);
            show.set(slides[i], { autoAlpha: 0 }, out + FADE);
          } else {
            show.set(kb[0], { scale: 1.12 }, out);
            show.set(slides[0], { autoAlpha: 1 }, out);
            show.to(slides[i], { autoAlpha: 0, duration: FADE, ease: "power1.inOut" }, out);
          }
        }
      }

      /* On scroll the screen keeps tipping toward the viewer: its lower edge swings out of the monitor */
      gsap.to(".hero-tilt", {
        rotateX: 16,
        scale: 0.92,
        transformPerspective: 1600,
        transformOrigin: "50% 0%",
        ease: "none",
        scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true },
      });

      /* Scroll parallax (only on the image layer and the z-20 headline itself) */
      gsap.to(".hero-parallax", {
        yPercent: 12,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true },
      });
      gsap.to(".hero-headline", {
        y: -60,
        autoAlpha: 0.3,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true },
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} aria-label="Intro" className="px-2 pt-2 md:px-3 md:pt-3">
      <div className="hero-tilt will-change-transform">
      <div className="hero-screen relative h-[100svh] max-h-[980px] min-h-[640px] overflow-hidden rounded-[28px] bg-ink md:rounded-[36px]">
        {/* Photo layer (no z-index so the squiggle can pass over it) */}
        <div className="hero-parallax absolute inset-x-0 -top-[14%] bottom-0">
          <div className="hero-intro absolute inset-0">
            {heroSlides.map((slide, index) => (
              <div
                key={slide.src}
                className="hero-slide absolute inset-0"
                style={{ opacity: index === 0 ? 1 : 0 }}
                aria-hidden={index === 0 ? undefined : true}
              >
                <div className="hero-kb absolute inset-0">
                  <Image
                    src={slide.src}
                    alt={index === 0 ? slide.alt : ""}
                    fill
                    preload={index === 0}
                    sizes="100vw"
                    className="object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Legibility overlays */}
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-2/5 bg-gradient-to-b from-ink/70 via-ink/25 to-transparent" />
        <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-ink/85 via-ink/35 to-transparent" />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(120% 90% at 50% 45%, transparent 55%, rgba(21,23,23,0.55) 100%)" }}
        />

        {/* The squiggle lives inside the screen so it is fully drawn on load and tilts with it */}
        <FlowLine curve={heroCurve} mobileCurve={heroCurveMobile} intro={1} introDelay={0.6} className="z-10" />

        {/* Stats */}
        <dl className="absolute right-6 top-[34%] z-20 flex flex-col items-end gap-4 text-cream md:right-[14%] md:top-[30%] md:gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="hero-stat flex flex-col items-end gap-2">
              <dt className="order-2 text-xs tracking-[0.14em] text-cream/75 uppercase md:text-[13px]">{stat.label}</dt>
              <dd className="order-1 font-display text-[clamp(2.6rem,5vw,4.5rem)] font-medium leading-none tracking-tight tabular-nums">
                <span data-count={stat.value}>0</span>
                <span className="ml-1 font-light text-mint">{stat.suffix}</span>
              </dd>
            </div>
          ))}
        </dl>

        {/* Headline */}
        <h1 className="hero-headline absolute bottom-10 left-6 right-6 z-20 font-display text-[clamp(2.5rem,6.2vw,5.75rem)] leading-[0.98] tracking-tight text-cream md:bottom-16 md:left-12 md:right-auto">
          <span className="block overflow-hidden pb-[0.08em]">
            <span className="hero-line block font-light">Teams That Connect.</span>
          </span>
          <span className="block overflow-hidden pb-[0.08em] md:pl-[10%]">
            <span className="hero-line block font-light">
              Workplaces That <span className="font-semibold">Thrive.</span>
            </span>
          </span>
        </h1>

        {/* Slide progress */}
        <div aria-hidden className="hero-meta absolute bottom-16 right-24 z-20 hidden gap-2 lg:flex">
          {heroSlides.map((slide) => (
            <span key={slide.src} className="h-0.5 w-8 overflow-hidden rounded-full bg-cream/25">
              <span className="hero-bar block h-full w-full origin-left bg-mint" />
            </span>
          ))}
        </div>

        {/* Scroll cue */}
        <div
          aria-hidden
          className="hero-meta absolute bottom-3 left-1/2 z-20 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex"
        >
          <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-cream/70">Scroll</span>
          <span className="relative block h-6 w-px overflow-hidden bg-cream/20">
            <span className="hero-cue absolute inset-0 bg-mint" />
          </span>
        </div>
      </div>
      </div>
      <style>{`
        @keyframes hero-cue { 0% { transform: translateY(-100%); } 60%, 100% { transform: translateY(100%); } }
        .hero-cue { animation: hero-cue 2s cubic-bezier(0.16,1,0.3,1) infinite; }
        @media (prefers-reduced-motion: reduce) { .hero-cue { animation: none; } }
      `}</style>
    </section>
  );
}
