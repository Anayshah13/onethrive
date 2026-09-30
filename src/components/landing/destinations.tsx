"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { motion, type PanInfo } from "framer-motion";
import { destinations } from "@/data/content";
import { prefersReducedMotion } from "@/lib/gsap";
import { Glow, PixelCluster } from "./decor";
import { ArrowLeft, ArrowRight } from "./icons";
import { Reveal } from "./reveal";

const featured = destinations.filter((place) => place.image);
const others = destinations.filter((place) => !place.image);
const moreCount = Math.max(5, Math.floor(others.length / 5) * 5);
const rows = [others.filter((_, i) => i % 2 === 0), others.filter((_, i) => i % 2 === 1)];

const AUTOPLAY_MS = 4500;
const SPRING = { type: "spring", stiffness: 220, damping: 30, mass: 1 } as const;

/* Desktop breakpoint as an external store so SSR renders the mobile layout without a mismatch. */
const desktopQuery = "(min-width: 768px)";
function subscribeDesktop(onChange: () => void) {
  const mq = window.matchMedia(desktopQuery);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}
function useIsDesktop() {
  return useSyncExternalStore(
    subscribeDesktop,
    () => window.matchMedia(desktopQuery).matches,
    () => false,
  );
}

/* Shortest signed distance from the active index, wrapping around the ring. */
function circularOffset(index: number, active: number, total: number) {
  let o = (index - active) % total;
  if (o > total / 2) o -= total;
  if (o <= -total / 2) o += total;
  return o;
}

function Coverflow() {
  const total = featured.length;
  const isDesktop = useIsDesktop();
  const cardWidth = isDesktop ? 320 : 250;

  const stageRef = useRef<HTMLDivElement>(null);
  const panned = useRef(false);
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [inView, setInView] = useState(false);
  const [reduced, setReduced] = useState(true);

  const go = useCallback((step: number) => setActive((i) => (i + step + total) % total), [total]);

  useEffect(() => {
    const el = stageRef.current;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncReduced = () => setReduced(prefersReducedMotion());
    syncReduced();
    mq.addEventListener("change", syncReduced);
    const observer = el ? new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.25 }) : null;
    if (el) observer?.observe(el);
    return () => {
      mq.removeEventListener("change", syncReduced);
      observer?.disconnect();
    };
  }, []);

  const playing = !reduced && inView && !hovered && !focused && !dragging;

  useEffect(() => {
    if (!playing) return;
    const id = window.setInterval(() => go(1), AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [playing, go, active]);

  const onPanEnd = (_: PointerEvent | MouseEvent | TouchEvent, info: PanInfo) => {
    setDragging(false);
    if (info.offset.x <= -50) go(1);
    else if (info.offset.x >= 50) go(-1);
    window.setTimeout(() => {
      panned.current = false;
    }, 0);
  };

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      go(-1);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      go(1);
    }
  };

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setFocused(false);
      }}
    >
      <motion.div
        ref={stageRef}
        role="region"
        aria-roledescription="carousel"
        aria-label="Offsite destinations"
        tabIndex={0}
        onKeyDown={onKeyDown}
        onPanStart={() => {
          panned.current = true;
          setDragging(true);
        }}
        onPanEnd={onPanEnd}
        className="relative h-[420px] cursor-grab touch-pan-y overflow-hidden rounded-[2rem] outline-none select-none [perspective:1400px] focus-visible:ring-2 focus-visible:ring-emerald/40 active:cursor-grabbing md:h-[520px]"
      >
        <p className="sr-only" aria-live={playing ? "off" : "polite"} aria-atomic="true">
          {`${featured[active].name}, ${active + 1} of ${total}`}
        </p>

        {featured.map((place, index) => {
          const o = circularOffset(index, active, total);
          const abs = Math.abs(o);
          const isActive = o === 0;
          const hidden = abs > 2.5;
          return (
            <motion.div
              key={place.name}
              aria-hidden={!isActive}
              initial={false}
              animate={{
                x: o * cardWidth * 0.78,
                scale: 1 - abs * 0.14,
                rotateY: -o * 8,
                opacity: hidden ? 0 : 1,
              }}
              transition={SPRING}
              style={{ zIndex: 10 - abs, pointerEvents: hidden ? "none" : "auto" }}
              onClick={() => {
                if (panned.current || isActive) return;
                setActive(index);
              }}
              className={`absolute top-1/2 left-1/2 -mt-[170px] -ml-[125px] h-[340px] w-[250px] overflow-hidden rounded-[1.6rem] shadow-lift ring-1 ring-ink/5 md:-mt-[220px] md:-ml-[160px] md:h-[440px] md:w-[320px] ${
                isActive ? "" : "cursor-pointer"
              }`}
            >
              <Image
                src={place.image!}
                alt={isActive ? `${place.name}, ${place.region}` : ""}
                fill
                sizes="340px"
                draggable={false}
                className="pointer-events-none object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink/80 via-ink/30 to-transparent" />
              <motion.div
                aria-hidden
                initial={false}
                animate={{ opacity: Math.min(0.55, abs * 0.22) }}
                transition={SPRING}
                className="absolute inset-0 bg-ink"
              />

              <div
                className={`absolute inset-x-0 bottom-0 p-6 transition-opacity duration-500 ease-out md:p-7 ${
                  isActive ? "opacity-100" : "opacity-0"
                }`}
              >
                <p className="text-[11px] font-semibold tracking-[0.18em] text-cream/70 uppercase">{place.region}</p>
                <h3 className="mt-1.5 font-display text-2xl leading-tight font-medium text-cream md:text-3xl">{place.name}</h3>
              </div>
              <div
                className={`absolute inset-x-0 bottom-0 p-5 transition-opacity duration-500 ease-out ${
                  isActive || hidden ? "opacity-0" : "opacity-100"
                }`}
              >
                <p className="font-display text-lg leading-tight text-cream">{place.name}</p>
              </div>
            </motion.div>
          );
        })}

        <button
          type="button"
          aria-label="Previous destination"
          onClick={() => go(-1)}
          className="absolute top-1/2 left-2 z-30 grid size-12 -translate-y-1/2 cursor-pointer place-items-center rounded-full bg-white/90 text-ink shadow-float ring-1 ring-ink/10 backdrop-blur transition-transform duration-500 ease-spring hover:scale-105 active:scale-95 md:left-4"
        >
          <ArrowLeft className="size-5" />
        </button>
        <button
          type="button"
          aria-label="Next destination"
          onClick={() => go(1)}
          className="absolute top-1/2 right-2 z-30 grid size-12 -translate-y-1/2 cursor-pointer place-items-center rounded-full bg-white/90 text-ink shadow-float ring-1 ring-ink/10 backdrop-blur transition-transform duration-500 ease-spring hover:scale-105 active:scale-95 md:right-4"
        >
          <ArrowRight className="size-5" />
        </button>
      </motion.div>

      <div className="mt-6 flex items-center justify-center">
        {featured.map((place, index) => (
          <button
            key={place.name}
            type="button"
            aria-label={`Show ${place.name}`}
            aria-current={index === active ? "true" : undefined}
            onClick={() => setActive(index)}
            className="group grid h-11 w-6 cursor-pointer place-items-center md:w-8"
          >
            <span
              className={`block h-1.5 w-5 rounded-full transition-[transform,background-color] duration-500 ease-spring ${
                index === active ? "scale-x-100 bg-emerald" : "scale-x-[0.3] bg-ink/15 group-hover:bg-ink/35"
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
}

function Pill({ name, region }: { name: string; region: string }) {
  return (
    <li className="inline-flex shrink-0 items-center gap-2 rounded-full bg-white/70 px-4 py-2 text-sm whitespace-nowrap text-ink ring-1 ring-ink/5">
      <span aria-hidden className="size-1.5 rounded-full bg-line" />
      <span className="font-medium">{name}</span>
      <span className="text-grey">{region}</span>
    </li>
  );
}

function MarqueeRow({ items, reverse, duration }: { items: typeof others; reverse?: boolean; duration: string }) {
  return (
    <div
      className={`marquee flex w-max ${reverse ? "marquee-reverse" : ""}`}
      style={{ "--marquee-duration": duration } as React.CSSProperties}
    >
      {[0, 1].map((copy) => (
        <ul key={copy} aria-hidden={copy === 1 || undefined} className="flex shrink-0 gap-3 pr-3">
          {items.map((place) => (
            <Pill key={place.name} name={place.name} region={place.region} />
          ))}
        </ul>
      ))}
    </div>
  );
}

export function Destinations() {
  return (
    <section id="destinations" className="relative isolate py-14 md:py-20">
      <Glow className="-z-10 top-1/3 left-1/2 size-[34rem] -translate-x-1/2" />
      <Glow tone="soft" className="-z-10 bottom-0 -left-20 size-[26rem]" />
      <PixelCluster cols={10} rows={6} seed={41} className="absolute bottom-16 right-6 hidden md:block" />
      <div className="mx-auto w-full max-w-[1240px] px-5 md:px-8">
        <div className="relative">
          <PixelCluster cols={12} rows={7} seed={7} className="absolute -top-10 -left-6 -z-0" />
          <PixelCluster cols={12} rows={7} seed={19} className="absolute -top-4 -right-6 -z-0 hidden md:block" />
          <Reveal as="header" className="relative mx-auto max-w-3xl text-center">
            <h2 className="font-display text-[clamp(2.5rem,5.5vw,4.75rem)] leading-[1.02] font-light tracking-tight text-balance text-ink">
              Offsite <span className="font-serif italic">Destinations</span>
            </h2>
            <p className="mx-auto mt-5 max-w-md text-base text-grey text-balance">
              From a weekend in Alibaug to a week in Bali — we handle the whole trip.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 md:mt-16">
          <Coverflow />
        </div>

        <Reveal className="mt-16 md:mt-20">
          <h3 className="text-center font-display text-lg font-medium tracking-tight text-ink md:text-xl">
            And {moreCount}+ more across India and beyond
          </h3>
          <div className="marquee-host marquee-mask mt-6 flex flex-col gap-3 overflow-hidden">
            <MarqueeRow items={rows[0]} duration="46s" />
            <MarqueeRow items={rows[1]} duration="52s" reverse />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
