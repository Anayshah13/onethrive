"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { activities, activityCount, offers } from "@/data/content";
import { EASE_OUT, EASE_SPRING, gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";
import { offerCurve } from "./curves";
import { FlowLine, Glow, PixelCluster } from "./decor";
import { Close } from "./icons";
import { Reveal } from "./reveal";
import { lockScroll } from "./smooth-scroll";

type Offer = (typeof offers)[number];

/* Bricolage Grotesque, pulled narrow and set at display optical size. */
const DISPLAY = "font-offer [font-variation-settings:'wdth'_80,'opsz'_96] tracking-[-0.025em]";
const KICKER = "font-offer text-[0.68rem] font-semibold tracking-[0.16em] uppercase";

const num = (i: number) => String(i + 1).padStart(2, "0");

/*
 * Puzzle piece in objectBoundingBox units: a socket bitten out of the top edge
 * and a tab pushing out of the right edge. Tuned for a 4:3 box.
 */
const PUZZLE =
  "M0 0.06 Q0 0 0.045 0 L0.37 0 A0.085 0.113 0 1 0 0.51 0 L0.815 0 Q0.86 0 0.86 0.06 L0.86 0.36 A0.1 0.14 0 1 1 0.86 0.6 L0.86 0.94 Q0.86 1 0.815 1 L0.045 1 Q0 1 0 0.94 Z";

function ShapeDefs() {
  return (
    <svg width="0" height="0" aria-hidden className="absolute">
      <defs>
        <clipPath id="offer-puzzle" clipPathUnits="objectBoundingBox">
          <path d={PUZZLE} />
        </clipPath>
      </defs>
    </svg>
  );
}

/* Perforated postage-stamp edge: half-circle bites every 3r around the border. */
const STAMP_R = 7;
const stampMask = `radial-gradient(${STAMP_R}px, #0000 98%, #000) round ${-1.5 * STAMP_R}px ${-1.5 * STAMP_R}px / ${3 * STAMP_R}px ${3 * STAMP_R}px, linear-gradient(#000 0 0) no-repeat 50% / calc(100% - ${3 * STAMP_R}px) calc(100% - ${3 * STAMP_R}px)`;

/* Ticket: two notches punched at the tear line (72% across). */
const ticketMask =
  "radial-gradient(circle at 72% 0, #0000 13px, #000 13.5px) top / 100% 51% no-repeat, radial-gradient(circle at 72% 100%, #0000 13px, #000 13.5px) bottom / 100% 51% no-repeat";

/* Pointer-driven 3D tilt shared by every card. */
function Tilt({ className = "", children }: { className?: string; children: React.ReactNode }) {
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
    <div className={`[perspective:1000px] ${className}`}>
      <motion.article
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="group h-full"
      >
        {children}
      </motion.article>
    </div>
  );
}

function Photo({ offer, sizes, className = "" }: { offer: Offer; sizes: string; className?: string }) {
  return (
    <Image
      src={offer.image}
      alt=""
      fill
      sizes={sizes}
      className={`object-cover transition-transform duration-700 ease-out group-hover:scale-[1.07] ${className}`}
    />
  );
}

/* 01 · Offsite & MICE: a perforated travel stamp with a round postmark. */
function StampCard({ offer, index }: { offer: Offer; index: number }) {
  return (
    <div className="drop-shadow-[0_18px_28px_rgba(27,97,72,0.18)] transition-transform duration-500 ease-out group-hover:-translate-y-1.5 sm:-rotate-2">
      <div className="relative bg-white p-5" style={{ mask: stampMask, WebkitMask: stampMask }}>
        <div className="relative aspect-[4/3] overflow-hidden ring-1 ring-ink/10">
          <Photo offer={offer} sizes="(min-width: 1024px) 420px, (min-width: 640px) 45vw, 90vw" />
          <span className={`absolute top-2 left-2 rounded-sm bg-cream/90 px-1.5 py-0.5 text-ink ${KICKER}`}>
            {num(index)}
          </span>
        </div>
        <svg
          aria-hidden
          viewBox="0 0 100 100"
          className="pointer-events-none absolute top-2 right-2 w-20 -rotate-12 text-emerald/80 mix-blend-multiply md:w-24"
        >
          <defs>
            <path id="offer-postmark-arc" d="M50 50 m-35 0 a35 35 0 1 1 70 0 a35 35 0 1 1 -70 0" />
          </defs>
          <circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" strokeWidth="2.5" />
          <circle cx="50" cy="50" r="27" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <text fill="currentColor" fontSize="10.5" fontWeight="700" letterSpacing="2.4">
            <textPath href="#offer-postmark-arc">ONETHRIVE · OFFSITE ·</textPath>
          </text>
          <path d="M34 46 q8 -6 16 0 t16 0 M34 54 q8 -6 16 0 t16 0" fill="none" stroke="currentColor" strokeWidth="2" />
        </svg>
        <div className="flex items-end justify-between gap-3 pt-4">
          <h3 className={`${DISPLAY} text-[1.9rem] leading-[0.95] font-bold text-ink md:text-4xl`}>{offer.title}</h3>
          <span className={`${KICKER} shrink-0 pb-1 text-emerald`}>{offer.kicker}</span>
        </div>
        <p className="mt-2 max-w-[38ch] text-sm leading-relaxed text-grey">{offer.blurb}</p>
      </div>
    </div>
  );
}

/* 02 · Team Building: a puzzle piece, because the team is the picture. */
function PuzzleCard({ offer, index }: { offer: Offer; index: number }) {
  return (
    <div className="h-full rounded-[2rem] bg-mint-soft p-4 pb-6 ring-1 ring-emerald/10 transition-[transform,box-shadow] duration-500 ease-out group-hover:-translate-y-1.5 group-hover:shadow-lift">
      <div className="relative aspect-[4/3]" style={{ clipPath: "url(#offer-puzzle)" }}>
        <Photo offer={offer} sizes="(min-width: 1024px) 320px, (min-width: 640px) 45vw, 90vw" />
      </div>
      <div className="mt-4 flex items-baseline gap-3 px-1">
        <span className={`${DISPLAY} text-5xl font-extrabold text-emerald/25`}>{num(index)}</span>
        <div>
          <p className={`${KICKER} text-emerald`}>{offer.kicker}</p>
          <h3 className={`${DISPLAY} mt-0.5 text-3xl leading-none font-bold text-ink`}>{offer.title}</h3>
        </div>
      </div>
      <p className="mt-3 px-1 text-sm leading-relaxed text-ink/70">{offer.blurb}</p>
    </div>
  );
}

/* 03 · Artist Booking: a proscenium arch with a string of stage bulbs. */
function ArchCard({ offer, index }: { offer: Offer; index: number }) {
  /* Bulbs ride just inside the photo's arch: centre (50%, 8.25rem), radii (50% - 1.45rem, 6.8rem). */
  const bulbs = Array.from({ length: 9 }, (_, i) => {
    const a = Math.PI - (Math.PI * i) / 8;
    const c = Math.round(Math.cos(a) * 1000) / 1000;
    const sn = Math.round(Math.sin(a) * 1000) / 1000;
    return { left: `calc(50% + ${c} * (50% - 1.45rem))`, top: `calc(8.25rem - ${sn} * 6.8rem)` };
  });
  return (
    <div className="flex h-full flex-col rounded-b-[1.75rem] bg-ink [border-top-left-radius:50%_8.5rem] [border-top-right-radius:50%_8.5rem] p-3 pb-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] transition-[transform,box-shadow] duration-500 ease-out group-hover:-translate-y-1.5 group-hover:shadow-lift">
      <div className="relative flex flex-1 flex-col">
        {bulbs.map((b, i) => (
          <span
            key={i}
            aria-hidden
            style={b}
            className={`pointer-events-none absolute z-10 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-mint shadow-[0_0_10px_2px_rgba(0,255,171,0.55)] transition-opacity duration-500 group-hover:opacity-100 ${i % 2 ? "opacity-50" : "opacity-95"}`}
          />
        ))}
        <div className="relative m-3 aspect-[3/4] overflow-hidden rounded-b-xl [border-top-left-radius:50%_7.5rem] [border-top-right-radius:50%_7.5rem] lg:aspect-auto lg:min-h-[22rem] lg:flex-1">
          <Photo offer={offer} sizes="(min-width: 1024px) 280px, (min-width: 640px) 45vw, 90vw" />
        </div>
      </div>
      <div className="mt-2 px-3 text-center">
        <p className={`${KICKER} text-mint/70`}>
          {num(index)} · {offer.kicker}
        </p>
        <h3 className={`${DISPLAY} mt-2 text-[2.1rem] leading-[0.95] font-bold text-mint`}>{offer.title}</h3>
        <p className="mx-auto mt-2 max-w-[28ch] text-sm leading-relaxed text-cream/65">{offer.blurb}</p>
      </div>
    </div>
  );
}

/* 04 · Day Outing: a taped polaroid, "to the last photo". */
function PolaroidCard({ offer, index }: { offer: Offer; index: number }) {
  return (
    <div className="relative transition-transform duration-500 ease-out group-hover:-translate-y-1.5 group-hover:rotate-0 sm:rotate-[2.5deg]">
      <span
        aria-hidden
        className="absolute -top-3 left-1/2 z-10 h-7 w-24 -translate-x-1/2 -rotate-3 bg-mint/45 shadow-sm backdrop-blur-[1px]"
      />
      <div className="bg-white p-3 pb-5 shadow-float ring-1 ring-ink/5">
        <div className="relative aspect-square overflow-hidden bg-mint-wash">
          <Photo offer={offer} sizes="(min-width: 1024px) 320px, (min-width: 640px) 45vw, 90vw" className="saturate-[1.1]" />
        </div>
        <div className="px-1 pt-4">
          <div className="flex items-baseline justify-between gap-2">
            <h3 className={`${DISPLAY} text-3xl leading-none font-bold text-ink`}>{offer.title}</h3>
            <span className="font-serif text-xl text-emerald italic">no. {num(index)}</span>
          </div>
          <p className="mt-2 font-serif text-lg leading-snug text-ink/70 italic">{offer.blurb}</p>
        </div>
      </div>
    </div>
  );
}

/* 05 · Event Production: an admit-one ticket with a tear-off stub. */
function TicketCard({ offer, index }: { offer: Offer; index: number }) {
  return (
    <div className="drop-shadow-[0_18px_28px_rgba(18,63,48,0.25)] transition-transform duration-500 ease-out group-hover:-translate-y-1.5">
      <div
        className="relative flex min-h-[15rem] overflow-hidden rounded-[1.4rem] bg-emerald-deep sm:min-h-[17rem]"
        style={{ mask: ticketMask, WebkitMask: ticketMask }}
      >
        <div className="relative w-[72%] overflow-hidden">
          <Photo offer={offer} sizes="(min-width: 1024px) 320px, (min-width: 640px) 60vw, 70vw" />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-emerald-deep via-emerald-deep/55 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
            <p className={`${KICKER} text-mint`}>{offer.kicker}</p>
            <h3 className={`${DISPLAY} mt-1 text-[1.75rem] leading-[0.95] font-bold text-cream sm:text-4xl`}>
              {offer.title}
            </h3>
            <p className="mt-2 max-w-[34ch] text-[0.8rem] leading-relaxed text-cream/75 sm:text-sm">{offer.blurb}</p>
          </div>
        </div>
        <div
          aria-hidden
          className="absolute inset-y-4 left-[72%] border-l-2 border-dashed border-cream/30"
        />
        <div className="flex flex-1 flex-col items-center justify-between py-5 text-mint">
          <span className={`${DISPLAY} text-3xl font-extrabold sm:text-4xl`}>{num(index)}</span>
          <span className={`${KICKER} [writing-mode:vertical-rl] rotate-180 text-cream/70`}>Admit the whole team</span>
          <span aria-hidden className="flex gap-[2px]">
            {[3, 1, 2, 1, 3, 2, 1].map((w, i) => (
              <span key={i} className="h-5 bg-mint/70" style={{ width: w }} />
            ))}
          </span>
        </div>
      </div>
    </div>
  );
}

/* 06 · Wellness: a slow, breathing pebble. */
const BREATH = [
  "58% 42% 46% 54% / 48% 56% 44% 52%",
  "44% 56% 58% 42% / 56% 44% 56% 44%",
  "52% 48% 40% 60% / 42% 58% 48% 52%",
  "58% 42% 46% 54% / 48% 56% 44% 52%",
];

function PebbleCard({ offer, index }: { offer: Offer; index: number }) {
  const reduce = useReducedMotion();
  const breathe = reduce ? undefined : { borderRadius: BREATH };
  const breatheT = { duration: 14, ease: "easeInOut" as const, repeat: Infinity };
  return (
    <motion.div
      style={{ borderRadius: BREATH[0] }}
      animate={breathe}
      transition={breatheT}
      className="bg-mint/90 px-7 py-10 transition-shadow duration-500 group-hover:shadow-lift sm:px-12 sm:py-12"
    >
      <div className="flex flex-col items-center gap-6 sm:flex-row sm:gap-8">
        <motion.div
          style={{ borderRadius: BREATH[2] }}
          animate={reduce ? undefined : { borderRadius: [BREATH[2], BREATH[0], BREATH[1], BREATH[2]] }}
          transition={breatheT}
          className="relative aspect-square w-40 shrink-0 overflow-hidden ring-4 ring-cream/60 sm:w-48"
        >
          <Photo offer={offer} sizes="200px" />
        </motion.div>
        <div className="text-center sm:text-left">
          <p className={`${KICKER} text-emerald-deep/70`}>
            {num(index)} · {offer.kicker}
          </p>
          <h3 className={`${DISPLAY} mt-1.5 text-[2.6rem] leading-[0.9] font-bold text-emerald-deep md:text-5xl`}>
            {offer.title}
          </h3>
          <p className="mx-auto mt-3 max-w-[36ch] text-sm leading-relaxed text-emerald-deep/80 sm:mx-0">{offer.blurb}</p>
        </div>
      </div>
    </motion.div>
  );
}

/* Each event gets its own silhouette and its own spot in the bento. */
const LAYOUT: Array<{ Card: (p: { offer: Offer; index: number }) => React.ReactNode; className: string }> = [
  { Card: StampCard, className: "lg:col-span-5 lg:col-start-1 lg:row-start-1" },
  { Card: PuzzleCard, className: "sm:mt-10 lg:col-span-4 lg:col-start-6 lg:row-start-1 lg:mt-16" },
  { Card: ArchCard, className: "lg:col-span-3 lg:col-start-10 lg:row-span-2 lg:row-start-1" },
  { Card: PolaroidCard, className: "sm:mt-10 lg:col-span-4 lg:col-start-1 lg:row-start-2 lg:-mt-2 lg:px-4" },
  { Card: TicketCard, className: "sm:col-span-2 lg:col-span-5 lg:col-start-5 lg:row-start-2 lg:mt-10 lg:self-start" },
  { Card: PebbleCard, className: "sm:col-span-2 lg:col-span-7 lg:col-start-2 lg:row-start-3 lg:-mt-6" },
];

/* Round, slowly spinning sticker that opens the activities sheet. */
function ActivitiesSticker({ onOpen }: { onOpen: () => void }) {
  const reduce = useReducedMotion();
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-haspopup="dialog"
      aria-label={`${activityCount}+ activities available`}
      className="group/sticker relative mx-auto grid size-44 cursor-pointer place-items-center rounded-full bg-ink text-mint shadow-lift transition-transform duration-500 ease-spring hover:scale-105 active:scale-95 md:size-52"
    >
      <motion.svg
        aria-hidden
        viewBox="0 0 100 100"
        className="absolute inset-0 size-full"
        animate={reduce ? undefined : { rotate: 360 }}
        transition={{ duration: 28, ease: "linear", repeat: Infinity }}
      >
        <defs>
          <path id="offer-sticker-arc" d="M50 50 m-39 0 a39 39 0 1 1 78 0 a39 39 0 1 1 -78 0" />
        </defs>
        <text fill="currentColor" fontSize="8.2" fontWeight="600" className="font-offer">
          <textPath href="#offer-sticker-arc" textLength="240" lengthAdjust="spacing">ACTIVITIES AVAILABLE · SEE THE SHELF ·</textPath>
        </text>
      </motion.svg>
      <span aria-hidden className="flex flex-col items-center">
        <span className={`${DISPLAY} text-5xl leading-none font-extrabold md:text-6xl`}>{activityCount}+</span>
        <span className="mt-1 text-[0.65rem] font-semibold tracking-[0.2em] text-cream/60 uppercase transition-colors group-hover/sticker:text-mint">
          open ↗
        </span>
      </span>
    </button>
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
          <h2 className="text-[clamp(2.75rem,6vw,5.25rem)] leading-[0.95] text-ink">
            <span className={`${DISPLAY} font-bold`}>What we</span>{" "}
            <span className="font-serif font-normal text-emerald italic">offer</span>
          </h2>
          <p className="mx-auto mt-5 max-w-md text-grey text-balance">
            Six ways we bring a team together — each one shaped around yours.
          </p>
        </Reveal>

        <div ref={gridRef} className="relative mx-auto mt-16 max-w-[1120px] md:mt-24">
          <QuoteMark className="-top-9 -left-1 origin-bottom-right md:-top-16 md:-left-12" />
          <QuoteMark closing className="-right-1 -bottom-9 origin-top-left md:-right-12 md:-bottom-16" />

          <Reveal
            stagger={0.08}
            className="relative z-10 grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-12 lg:gap-x-6 lg:gap-y-8"
          >
            {offers.map((offer, index) => {
              const { Card, className } = LAYOUT[index % LAYOUT.length];
              return (
                <Tilt key={offer.title} className={`min-w-0 ${className}`}>
                  <Card offer={offer} index={index} />
                </Tilt>
              );
            })}
            <div className="grid place-items-center py-4 sm:col-span-2 lg:col-span-3 lg:col-start-9 lg:row-start-3 lg:py-0">
              <ActivitiesSticker onOpen={() => setOpen(true)} />
            </div>
          </Reveal>
        </div>
      </div>

      <ActivitiesSheet open={open} onClose={close} />
    </section>
  );
}
