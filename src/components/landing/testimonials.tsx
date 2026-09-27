"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { gallery, testimonials } from "@/data/content";
import { EASE_OUT, gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";
import { PixelCluster } from "./decor";
import { ArrowLeft, ArrowRight, Star } from "./icons";
import { Reveal } from "./reveal";
import { scrollToHash } from "./smooth-scroll";
import { TextLink } from "./ui";

/* Cylinder geometry for the curved gallery, viewed from inside the cylinder. */
const RADIUS = 640; // px, cylinder radius
const STEP = 19; // deg between panels
const PUSH_BACK = 220; // px the front panel sits behind the screen plane
const ROT_FROM = 16; // deg, ring rotation at section start
const ROT_TO = -24; // deg, ring rotation at section end
const CENTER = (gallery.length - 1) / 2;
const panelAngle = (i: number) => (CENTER - i) * STEP; // positive = left side, facing right

const ringTransform = (rot: number) => `translateZ(${RADIUS - PUSH_BACK}px) rotateY(${rot}deg)`;
const panelOpacity = (angle: number) => Math.max(0, Math.min(1, 1 - (Math.abs(angle) - 42) / 36));

export function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const section = sectionRef.current;
      if (!section) return;

      /* Asterisks: staggered scale-in on entry, rotation scrubbed with the section. */
      const wraps = gsap.utils.toArray<HTMLElement>("[data-aster-wrap]");
      const stars = gsap.utils.toArray<HTMLElement>("[data-aster]");
      gsap.from(wraps, {
        scale: 0.3,
        autoAlpha: 0,
        duration: 1,
        ease: "back.out(1.6)",
        stagger: 0.12,
        scrollTrigger: { trigger: wraps[0], start: "top 90%", once: true },
      });
      const turns = [180, -120, 240];
      stars.forEach((star, i) => {
        gsap.fromTo(
          star,
          { rotation: 0 },
          {
            rotation: turns[i % turns.length],
            ease: "none",
            scrollTrigger: { trigger: section, start: "top bottom", end: "bottom top", scrub: 0.8 },
          },
        );
      });

      /* Curved gallery: the ring turns so the panels glide sideways along the wall. */
      const ring = section.querySelector<HTMLElement>("[data-ring]");
      const panels = gsap.utils.toArray<HTMLElement>("[data-panel]");
      if (!ring) return;
      const state = { rot: ROT_FROM };
      const render = () => {
        ring.style.transform = ringTransform(state.rot);
        panels.forEach((panel, i) => {
          panel.style.opacity = `${panelOpacity(panelAngle(i) + state.rot)}`;
        });
      };
      render();
      gsap.to(state, {
        rot: ROT_TO,
        ease: "none",
        onUpdate: render,
        scrollTrigger: { trigger: section, start: "top bottom", end: "bottom top", scrub: 1 },
      });
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} id="testimonials" className="relative py-24 md:py-36">
      <PixelCluster cols={14} rows={8} seed={7} className="absolute top-10 left-0 -z-0 hidden md:block" />
      <PixelCluster cols={12} rows={7} seed={19} className="absolute top-1/2 right-0 -z-0 hidden md:block" />

      <div className="relative mx-auto w-full max-w-[1240px] px-5 md:px-8">
        <div className="flex items-start justify-between gap-6">
          <Reveal>
            <h2 className="font-display text-[clamp(3rem,7vw,6.5rem)] leading-none font-light tracking-tight">
              Testimonials
            </h2>
          </Reveal>
          <div aria-hidden className="flex shrink-0 gap-3 pt-2 text-line">
            {[0, 1, 2].map((i) => (
              <span key={i} data-aster-wrap className="block">
                <Asterisk />
              </span>
            ))}
          </div>
        </div>

        <div className="mt-16 grid items-center gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <Reveal>
            <Carousel />
          </Reveal>

          <div className="min-w-0">
            <CurvedGallery />
            <MobileGallery />
            <Reveal className="mt-10">
              <p className="max-w-[46ch] text-[clamp(1rem,1.4vw,1.2rem)] leading-relaxed text-ink/75">
                Trusted across the industry, our aim is to make workplace culture not just about deadlines and
                meetings. From team-building activities to wellness initiatives, we create moments that make the
                team <strong className="font-semibold text-ink">one.</strong>
              </p>
              {/* TODO: link to a testimonials page */}
              <TextLink className="mt-5 min-h-11" onClick={() => scrollToHash("#testimonials")}>
                explore all testimonials
              </TextLink>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* Chunky six-armed asterisk: three rounded bars crossing at 60 degrees. */
function Asterisk() {
  return (
    <svg data-aster viewBox="0 0 100 100" className="block size-10 md:size-[72px]" fill="currentColor">
      {[0, 60, 120].map((deg) => (
        <rect key={deg} x="39" y="4" width="22" height="92" rx="11" transform={`rotate(${deg} 50 50)`} />
      ))}
    </svg>
  );
}

function Carousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const active = testimonials[index];
  const count = testimonials.length;

  const go = useCallback((delta: number) => setIndex((current) => (current + delta + count) % count), [count]);

  useEffect(() => {
    if (paused || prefersReducedMotion()) return;
    const id = window.setTimeout(() => go(1), 7000);
    return () => window.clearTimeout(id);
  }, [paused, index, go]);

  return (
    <div
      className="mx-auto w-full max-w-[520px]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setPaused(false);
      }}
    >
      <div aria-live="polite">
        <AnimatePresence mode="wait" initial={false}>
          <motion.figure
            key={index}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.6, ease: EASE_OUT }}
          >
            <div className="relative z-10 mx-auto grid w-max place-items-center">
              <span aria-hidden className="absolute inset-0 -m-4 rounded-full bg-mint/40 blur-2xl" />
              <span className="relative grid size-24 place-items-center rounded-full bg-emerald ring-4 ring-mint/50">
                <span aria-hidden className="font-display text-2xl text-mint">
                  {active.initials}
                </span>
              </span>
            </div>

            <div className="-mt-12 rounded-[2rem] bg-white/50 p-1.5 ring-1 ring-ink/5">
              <div className="rounded-[calc(2rem-0.375rem)] bg-white px-7 pt-16 pb-8 shadow-float">
                <div className="flex justify-center gap-1 text-ink" role="img" aria-label="Rated 5 out of 5">
                  {Array.from({ length: 5 }, (_, star) => (
                    <Star key={star} className="size-4" />
                  ))}
                </div>
                <blockquote className="mt-6 min-h-[8.75rem] text-[15px] leading-7 text-ink/80">
                  &ldquo;{active.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-6 text-right">
                  <p className="font-semibold text-ink">&mdash; {active.name}</p>
                  <p className="mt-0.5 text-sm text-grey">{active.role}</p>
                </figcaption>
              </div>
            </div>
          </motion.figure>
        </AnimatePresence>
      </div>

      <div className="mt-6 flex items-center justify-between gap-4">
        <div className="flex gap-2">
          <button
            type="button"
            aria-label="Previous testimonial"
            onClick={() => go(-1)}
            className="grid size-11 cursor-pointer place-items-center rounded-full bg-white text-ink ring-1 ring-ink/10 transition-[transform,background-color,color] duration-500 ease-spring hover:bg-ink hover:text-mint active:scale-95"
          >
            <ArrowLeft />
          </button>
          <button
            type="button"
            aria-label="Next testimonial"
            onClick={() => go(1)}
            className="grid size-11 cursor-pointer place-items-center rounded-full bg-ink text-mint transition-[transform,background-color] duration-500 ease-spring hover:bg-ink-soft active:scale-95"
          >
            <ArrowRight />
          </button>
        </div>
        <div className="flex items-center">
          {testimonials.map((item, i) => (
            <button
              key={item.name}
              type="button"
              aria-label={`Show testimonial ${i + 1}`}
              aria-current={i === index ? "true" : undefined}
              onClick={() => setIndex(i)}
              className="grid h-11 cursor-pointer place-items-center px-1.5"
            >
              <span className="block h-1.5 w-8 overflow-hidden rounded-full">
                <span
                  className={`block h-full w-full origin-left rounded-full transition-[transform,background-color] duration-500 ease-out ${
                    i === index ? "scale-x-100 bg-ink" : "scale-x-[0.25] bg-ink/20"
                  }`}
                />
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* Tall portrait panels on the inside of a curved wall: edge panels angle toward the viewer. */
function CurvedGallery() {
  return (
    <div
      aria-hidden
      className="relative hidden h-[380px] overflow-hidden [perspective:1100px] [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)] md:block md:h-[460px]"
    >
      <div
        data-ring
        className="absolute inset-0 [transform-style:preserve-3d]"
        style={{ transform: ringTransform(0) }}
      >
        {gallery.map((photo, i) => {
          const angle = panelAngle(i);
          return (
            <div
              key={photo.src}
              data-panel
              className="absolute top-1/2 left-1/2 -mt-[170px] -ml-[100px] h-[340px] w-[200px] overflow-hidden rounded-2xl ring-1 ring-white/10 [backface-visibility:hidden]"
              style={{ transform: `rotateY(${angle}deg) translateZ(-${RADIUS}px)`, opacity: panelOpacity(angle) }}
            >
              <Image src={photo.src} alt="" fill className="object-cover" sizes="220px" />
              <span className="absolute inset-0 bg-gradient-to-t from-ink/25 to-transparent" />
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* Below md: a contained horizontal snap scroller instead of the 3D wall. */
function MobileGallery() {
  return (
    <div className="-mx-5 snap-x snap-mandatory scroll-px-5 overflow-x-auto px-5 pb-2 [scrollbar-width:none] md:hidden">
      <ul className="flex w-max gap-3">
        {gallery.slice(0, 5).map((photo) => (
          <li
            key={photo.src}
            className="relative h-[300px] w-[190px] shrink-0 snap-center overflow-hidden rounded-2xl ring-1 ring-ink/5"
          >
            <Image src={photo.src} alt={photo.alt} fill className="object-cover" sizes="190px" />
          </li>
        ))}
      </ul>
    </div>
  );
}
