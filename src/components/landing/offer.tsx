"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { activities, activityCount, offers } from "@/data/content";
import { EASE_OUT, EASE_SPRING, gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";
import { offerCurve } from "./curves";
import { FlowLine, Glow, PixelCluster } from "./decor";
import { Close } from "./icons";
import { Reveal } from "./reveal";
import { lockScroll } from "./smooth-scroll";

type P = readonly [number, number];

/* Polygon with softened corners, in objectBoundingBox units (0..1). */
function roundedPoly(points: P[], r: number) {
  const f = (n: number) => n.toFixed(3);
  const n = points.length;
  const toward = (a: P, b: P, d: number): P => {
    const dx = b[0] - a[0];
    const dy = b[1] - a[1];
    const len = Math.hypot(dx, dy) || 1;
    const k = Math.min(d, len / 2) / len;
    return [a[0] + dx * k, a[1] + dy * k];
  };
  let d = "";
  for (let i = 0; i < n; i++) {
    const prev = points[(i - 1 + n) % n];
    const cur = points[i];
    const next = points[(i + 1) % n];
    const a = toward(cur, prev, r);
    const b = toward(cur, next, r);
    d += `${i === 0 ? "M" : "L"}${f(a[0])} ${f(a[1])} Q${f(cur[0])} ${f(cur[1])} ${f(b[0])} ${f(b[1])} `;
  }
  return `${d}Z`;
}

const SHAPES: Array<React.ReactNode> = [
  // 0: tilted poster
  <path key="0" d={roundedPoly([[0.05, 0.1], [0.93, 0.02], [0.97, 0.9], [0.03, 0.98]], 0.07)} />,
  // 1: infinity / two overlapping circles
  // (<clipPath> rejects <g>, so the two lobes are one path of two ellipse arcs)
  <path
    key="1"
    d="M0.01 0.5 A0.3 0.46 0 1 0 0.61 0.5 A0.3 0.46 0 1 0 0.01 0.5 Z M0.39 0.5 A0.3 0.46 0 1 0 0.99 0.5 A0.3 0.46 0 1 0 0.39 0.5 Z"
  />,
  // 2: ticket with a diagonal cut corner
  <path key="2" d={roundedPoly([[0, 0.04], [0.74, 0.04], [1, 0.34], [1, 0.96], [0, 0.96]], 0.06)} />,
  // 3: slanted arrow with a notch on the left
  <path key="3" d={roundedPoly([[0.08, 0.02], [0.9, 0.02], [1, 0.5], [0.9, 0.98], [0.08, 0.98], [0.2, 0.5]], 0.05)} />,
  // 4: stepped top
  <path
    key="4"
    d={roundedPoly(
      [[0, 0.3], [0.33, 0.3], [0.33, 0.15], [0.66, 0.15], [0.66, 0], [1, 0], [1, 1], [0, 1]],
      0.05,
    )}
  />,
  // 5: organic cloud blob
  <path
    key="5"
    d="M0.5 0.03 C0.68 0 0.8 0.08 0.84 0.2 C0.97 0.22 1 0.4 0.97 0.52 C1 0.7 0.9 0.88 0.74 0.9 C0.66 1 0.4 1 0.32 0.93 C0.14 0.96 0 0.82 0.03 0.64 C-0.01 0.48 0.04 0.3 0.18 0.24 C0.22 0.08 0.36 0 0.5 0.03 Z"
  />,
];

function ShapeDefs() {
  return (
    <svg width="0" height="0" aria-hidden className="absolute">
      <defs>
        {SHAPES.map((shape, i) => (
          <clipPath key={i} id={`offer-shape-${i}`} clipPathUnits="objectBoundingBox">
            {shape}
          </clipPath>
        ))}
      </defs>
    </svg>
  );
}

/* Chunky, blocky quote mark: a rounded block with a slanted tail, drawn twice. */
function QuoteMark({ closing = false, className = "" }: { closing?: boolean; className?: string }) {
  const glyph = (x: number) => (
    <g transform={`translate(${x} 0)`}>
      <rect x="0" y="24" width="42" height="36" rx="9" />
      <path d="M8 28 L26 3 L40 3 L30 28 Z" stroke="var(--line)" strokeWidth="6" strokeLinejoin="round" />
    </g>
  );
  return (
    <svg
      data-quote
      aria-hidden
      viewBox="-3 0 104 63"
      className={`pointer-events-none absolute z-20 w-14 md:w-[112px] ${className}`}
      fill="var(--line)"
    >
      <g transform={closing ? "rotate(180 50 31.5)" : undefined}>
        {glyph(0)}
        {glyph(54)}
      </g>
    </svg>
  );
}

function OfferCard({ offer, index }: { offer: (typeof offers)[number]; index: number }) {
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 180, damping: 18, mass: 0.4 });
  const sy = useSpring(py, { stiffness: 180, damping: 18, mass: 0.4 });
  const rotateY = useTransform(sx, [-0.5, 0.5], [-6, 6]);
  const rotateX = useTransform(sy, [-0.5, 0.5], [6, -6]);

  const onMove = (event: React.PointerEvent<HTMLElement>) => {
    if (event.pointerType !== "mouse" || !window.matchMedia("(pointer: fine)").matches) return;
    if (prefersReducedMotion()) return;
    const r = event.currentTarget.getBoundingClientRect();
    px.set((event.clientX - r.left) / r.width - 0.5);
    py.set((event.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => {
    px.set(0);
    py.set(0);
  };

  return (
    <div className="[perspective:1000px]">
      <motion.article
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="group rounded-[1.75rem] outline-none focus-visible:ring-2 focus-visible:ring-line focus-visible:ring-offset-4 focus-visible:ring-offset-cream"
      >
        <div className="h-full rounded-[1.75rem] bg-ink p-3 pb-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] ring-1 ring-white/5 transition-[transform,box-shadow] duration-500 ease-out group-hover:-translate-y-1.5 group-hover:shadow-lift">
          <div className="relative aspect-[16/11]" style={{ clipPath: `url(#offer-shape-${index})` }}>
            <Image
              src={offer.image}
              alt=""
              fill
              sizes="(min-width: 1024px) 340px, (min-width: 640px) 45vw, 90vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.08] group-focus-visible:scale-[1.08]"
            />
          </div>
          <h3 className="mt-4 text-center font-display text-lg font-semibold text-mint">{offer.title}</h3>
          <p className="mx-auto mt-1.5 max-w-[30ch] text-center text-sm leading-relaxed text-cream/60 transition-[opacity,transform] duration-500 ease-out lg:translate-y-2 lg:opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100 lg:group-focus-visible:translate-y-0 lg:group-focus-visible:opacity-100">
            {offer.blurb}
          </p>
        </div>
      </motion.article>
    </div>
  );
}

function ActivitiesSheet({ open, onClose }: { open: boolean; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    lockScroll(true);
    const previous = document.activeElement as HTMLElement | null;
    const t = window.setTimeout(() => closeRef.current?.focus(), 30);
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener("keydown", onKey);
      lockScroll(false);
      previous?.focus?.();
    };
  }, [open, onClose]);

  let chipIndex = 0;

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="backdrop"
            aria-hidden
            onClick={onClose}
            className="fixed inset-0 z-[70] bg-ink/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE_OUT }}
          />
          <motion.div
            key="panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="activities-title"
            data-lenis-prevent
            className="fixed inset-x-0 bottom-0 z-[80] max-h-[88dvh] overflow-y-auto overscroll-contain rounded-t-[28px] bg-cream shadow-lift md:inset-x-auto md:top-2 md:right-2 md:bottom-2 md:max-h-none md:w-[min(640px,calc(100%-1rem))] md:rounded-[28px]"
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 60, opacity: 0 }}
            transition={{ duration: 0.6, ease: EASE_SPRING }}
          >
            <div className="sticky top-0 z-10 flex items-start justify-between gap-4 bg-cream/90 px-5 pt-6 pb-4 backdrop-blur-md md:px-8 md:pt-8">
              <div>
                <p className="eyebrow">The shelf</p>
                <h2 id="activities-title" className="mt-3 font-display text-3xl font-light tracking-tight md:text-4xl">
                  <span className="font-semibold">{activityCount}</span> activities
                </h2>
              </div>
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="grid size-11 shrink-0 cursor-pointer place-items-center rounded-full bg-white ring-1 ring-ink/10 transition-transform duration-500 ease-spring hover:rotate-90 active:scale-95"
              >
                <Close className="size-4" />
              </button>
            </div>
            <div className="flex flex-col gap-8 px-5 pt-4 pb-10 md:px-8 md:pb-12">
              {activities.map((group) => (
                <section key={group.category}>
                  <h3 className="font-display text-lg font-semibold text-emerald">{group.category}</h3>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {group.items.map((item) => {
                      const i = chipIndex++;
                      return (
                        <motion.li
                          key={item}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, ease: EASE_OUT, delay: 0.15 + Math.min(i * 0.012, 0.7) }}
                          className="rounded-full bg-white px-3 py-1.5 text-sm text-ink/80 ring-1 ring-ink/5"
                        >
                          {item}
                        </motion.li>
                      );
                    })}
                  </ul>
                </section>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export function Offer() {
  const [open, setOpen] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);
  const close = useCallback(() => setOpen(false), []);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const grid = gridRef.current;
      if (!grid) return;
      gsap.fromTo(
        grid.querySelectorAll("[data-quote]"),
        { scale: 0.6, rotate: -12 },
        {
          scale: 1,
          rotate: 0,
          ease: "none",
          scrollTrigger: { trigger: grid, start: "top 90%", end: "top 35%", scrub: 0.6 },
        },
      );
    },
    { scope: gridRef },
  );

  return (
    <section id="offer" className="relative isolate py-24 md:py-36">
      <Glow className="-z-10 top-24 -left-20 size-[28rem]" />
      <Glow tone="soft" className="-z-10 bottom-10 -right-24 size-[32rem]" />
      <PixelCluster cols={12} rows={7} seed={11} className="absolute top-16 right-4 md:right-10" />
      <PixelCluster cols={10} rows={6} seed={29} className="absolute bottom-20 left-2 hidden md:block" />
      <FlowLine
        className="z-0"
        start="top 75%"
        end="bottom 70%"
        curve={offerCurve}
      />
      <ShapeDefs />

      <div className="relative z-10 mx-auto w-full max-w-[1240px] px-5 md:px-8">
        <Reveal as="header" className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-[clamp(2.5rem,5.5vw,4.75rem)] leading-[1.02] font-light tracking-tight text-ink">
            What We <span className="font-serif italic">Offer</span>
          </h2>
          <p className="mx-auto mt-4 max-w-md text-grey text-balance">
            Six ways we bring a team together — each one shaped around yours.
          </p>
        </Reveal>

        <div ref={gridRef} className="relative mx-auto mt-16 max-w-[1080px] md:mt-24">
          <QuoteMark className="-top-9 -left-1 origin-bottom-right md:-top-16 md:-left-12" />
          <QuoteMark closing className="-right-1 -bottom-9 origin-top-left md:-right-12 md:-bottom-16" />

          <Reveal stagger={0.08} className="relative z-10 grid gap-4 sm:grid-cols-2 md:gap-5 lg:grid-cols-3">
            {offers.map((offer, index) => (
              <OfferCard key={offer.title} offer={offer} index={index} />
            ))}
          </Reveal>
        </div>

        <div className="mt-14 text-center md:mt-20">
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-haspopup="dialog"
            className="inline-flex min-h-11 cursor-pointer items-center rounded-full px-5 text-sm font-semibold text-ink underline decoration-line decoration-2 underline-offset-4 transition-colors duration-500 hover:bg-mint-wash hover:text-emerald"
          >
            {activityCount}+ activities available
          </button>
        </div>
      </div>

      <ActivitiesSheet open={open} onClose={close} />
    </section>
  );
}
