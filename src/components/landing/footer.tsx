"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { contact } from "@/data/content";
import { PixelCluster } from "./decor";
import { ArrowUpRight, Instagram, LinkedIn, Mail, Phone, YouTube } from "./icons";
import { scrollToHash } from "./smooth-scroll";
import { useTalk } from "./talk";

const QUICK_LINKS = [
  { label: "Home", href: "#top" },
  { label: "Why OneThrive", href: "#promise" },
  { label: "Services", href: "#offer" },
  { label: "Destinations", href: "#destinations" },
  { label: "Gallery", href: "#moments" },
  { label: "FAQs", href: "#faqs" },
] as const;

const POLICIES = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Cancellation & Refund", href: "/cancellation-refund" },
  { label: "Terms & Conditions", href: "/terms-conditions" },
] as const;

/* TODO: real Instagram / LinkedIn / YouTube URLs */
const SOCIALS = [
  { label: "Instagram", href: "#", Icon: Instagram },
  { label: "LinkedIn", href: "#", Icon: LinkedIn },
  { label: "YouTube", href: "#", Icon: YouTube },
] as const;

/* ---------- Deterministic geometry (module scope, rounded: hydration safe) ---------- */

const WAVE_W = 1440; // one period tile; the SVG is two tiles wide and drifts by one tile
const WAVE_H = 160;

/** A periodic hill line across two tiles, closed down to the bottom edge. */
function hill(base: number, amps: ReadonlyArray<readonly [number, number, number]>) {
  const steps = 96;
  let d = "";
  for (let i = 0; i <= steps; i++) {
    const x = (i / steps) * WAVE_W * 2;
    let y = base;
    for (const [amp, cycles, phase] of amps) y += amp * Math.sin((x / WAVE_W) * cycles * Math.PI * 2 + phase);
    d += `${i === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)} `;
  }
  return `${d}L${WAVE_W * 2} ${WAVE_H} L0 ${WAVE_H} Z`;
}

const HILLS = [
  { d: hill(62, [[14, 2, 0.4], [6, 5, 1.2]]), fill: "#c9f7e4", dur: "46s" },
  { d: hill(88, [[12, 3, 2.1], [5, 7, 0.3]]), fill: "#9eedcb", dur: "34s" },
  { d: hill(114, [[9, 2, 4.0], [4, 6, 2.6]]), fill: "#d9f9ec", dur: "26s" },
] as const;

/* Barcode on the ticket stub: fixed widths so every render matches. */
const BARS = [2, 1, 3, 1, 1, 2, 4, 1, 2, 1, 1, 3, 2, 1, 4, 2, 1, 1, 3, 1, 2, 2, 1, 3, 1, 1, 2, 4, 1, 2, 1, 3];

const pillClass =
  "inline-flex items-center rounded-full bg-white/70 px-3.5 py-1.5 text-[13px] text-ink/75 ring-1 ring-emerald/10 transition-[background-color,color,box-shadow] duration-300 hover:bg-mint hover:text-ink hover:ring-mint";

function jump(event: React.MouseEvent<HTMLAnchorElement>, href: string) {
  event.preventDefault();
  scrollToHash(href);
}

export function Footer() {
  const { setOpen } = useTalk();
  const horizonRef = useRef<HTMLDivElement>(null);

  /* The sun rises once the horizon scrolls into view. */
  useEffect(() => {
    const el = horizonRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.dataset.risen = "true";
          io.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <footer id="contact" className="mt-10 px-2 pb-2 md:mt-16 md:px-3 md:pb-3">
      <style>{FOOTER_CSS}</style>
      <div className="ot-foot relative flex min-h-[80vh] flex-col overflow-hidden rounded-[28px] bg-mint-wash text-ink shadow-float ring-1 ring-emerald/10 md:rounded-[36px]">
        <PixelCluster
          cols={12}
          rows={6}
          cell={14}
          seed={7}
          className="absolute top-0 right-0 hidden opacity-80 sm:block md:right-3"
        />
        <PixelCluster
          cols={8}
          rows={6}
          cell={14}
          seed={19}
          className="absolute top-1/2 left-0 hidden -translate-y-1/2 opacity-70 sm:block"
        />

        {/* ---------- Top: brand + boarding pass ---------- */}
        <div className="relative grid gap-8 px-5 pt-8 sm:px-6 md:px-10 md:pt-12 lg:grid-cols-[1fr_minmax(0,1.35fr)] lg:gap-12">
          <div className="min-w-0">
            <a
              href="#top"
              onClick={(e) => jump(e, "#top")}
              aria-label="OneThrive home"
              className="ot-badge relative grid size-40 place-items-center rounded-full bg-mint md:size-48"
            >
              <svg className="ot-badge-ring absolute inset-0 size-full" viewBox="0 0 200 200" aria-hidden>
                <defs>
                  <path id="ot-badge-path" d="M100,100 m-84,0 a84,84 0 1,1 168,0 a84,84 0 1,1 -168,0" />
                </defs>
                <text className="fill-ink font-mono text-[13px] font-medium tracking-[0.28em] uppercase">
                  <textPath href="#ot-badge-path" textLength="520">
                    Offsites • Team building • Wellness • Celebrations •
                  </textPath>
                </text>
              </svg>
              <Image
                src="/brand/logo-white.png"
                alt="OneThrive"
                width={1280}
                height={800}
                className="relative h-auto w-[62%] brightness-0"
              />
            </a>
            <p className="mt-6 max-w-md font-display text-2xl leading-tight font-medium tracking-tight text-ink md:text-[32px]">
              Your team&apos;s next good day out{" "}
              <span className="font-serif font-normal text-emerald italic">starts here.</span>
            </p>
            <p className="mt-3 max-w-sm text-base leading-7 text-ink/60">
              Offsites, team building, wellness and celebrations, run end to end by one crew.
            </p>
          </div>

          <BoardingPass onPlan={() => setOpen(true)} />
        </div>

        {/* ---------- Middle: links as pills ---------- */}
        <div className="relative grid gap-7 px-5 pt-10 sm:px-6 md:grid-cols-[1.4fr_1fr_auto] md:gap-10 md:px-10">
          <nav aria-label="Footer">
            <p className="ot-label">Explore</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href} onClick={(e) => jump(e, link.href)} className={pillClass}>
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <Link href="/contact-us" className={pillClass}>
                  Contact Us
                </Link>
              </li>
            </ul>
          </nav>

          <div>
            <p className="ot-label">Policies</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {POLICIES.map(({ label, href }) => (
                <li key={href}>
                  <Link href={href} className={pillClass}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="ot-label">Follow along</p>
            <div className="mt-3 flex gap-3">
              {SOCIALS.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={`OneThrive on ${label}`}
                  className="grid size-14 place-items-center rounded-full bg-ink text-mint shadow-float ring-2 ring-mint/40 transition-[background-color,color,transform,box-shadow] duration-300 hover:-translate-y-1 hover:scale-105 hover:bg-mint hover:text-ink hover:ring-ink/20"
                >
                  <Icon className="size-6" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="relative mt-auto flex flex-wrap items-center justify-between gap-x-4 gap-y-1 px-5 pt-10 text-xs text-emerald-deep/70 sm:px-6 md:px-10">
          <p>© {new Date().getFullYear()} OneThrive. All rights reserved.</p>
          <p>Designed &amp; Developed by Anay Shah</p>
        </div>

        {/* ---------- Bottom: the wordmark as a horizon ---------- */}
        <div ref={horizonRef} className="ot-horizon relative pt-6 md:pt-8" aria-hidden>
          <div className="ot-sun" />
          <p className="ot-word relative text-center font-display leading-none font-semibold select-none">OneThrive</p>
          <div className="ot-hills pointer-events-none absolute inset-x-0 bottom-0">
            {HILLS.map((h, i) => (
              <svg
                key={i}
                className="ot-hill absolute bottom-0 left-0 h-full"
                viewBox={`0 0 ${WAVE_W * 2} ${WAVE_H}`}
                preserveAspectRatio="none"
                style={{ animationDuration: h.dur, animationDirection: i === 1 ? "reverse" : "normal" }}
              >
                <path d={h.d} fill={h.fill} />
              </svg>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}

/**
 * The contact CTA as a boarding pass: the whole team flies from the office to an offsite.
 * Hovering tears the stub off along the perforation; the stub holds the primary action.
 */
function BoardingPass({ onPlan }: { onPlan: () => void }) {
  return (
    <div className="ot-ticket relative flex min-w-0 flex-col text-ink sm:flex-row">
      <div className="ot-ticket-main relative min-w-0 flex-1 rounded-t-[22px] bg-white px-6 pt-4 pb-6 ring-1 ring-emerald/10 sm:rounded-l-[22px] sm:rounded-tr-none md:px-7 md:pt-5 md:pb-7">
        <div className="flex items-center justify-between gap-3 border-b border-ink/8 pb-3">
          <div className="flex items-center gap-2.5">
            <span className="grid size-8 place-items-center rounded-full bg-mint text-ink">
              <PlaneIcon className="size-4" />
            </span>
            <p className="font-display text-lg leading-none font-semibold tracking-tight">OneThrive</p>
          </div>
          <p className="ot-label">Boarding pass</p>
        </div>

        <div className="mt-4 flex items-end justify-between gap-3">
          <div className="min-w-0">
            <p className="ot-mini">From</p>
            <p className="mt-1 font-display text-[44px] leading-none font-semibold tracking-tight md:text-[56px]">OFC</p>
            <p className="mt-1.5 truncate text-sm text-ink/60">Your office</p>
          </div>
          <div className="relative mb-9 h-px min-w-10 flex-1 border-t-2 border-dashed border-line/60">
            <PlaneIcon className="ot-plane absolute -top-[11px] left-0 size-5 text-emerald" />
          </div>
          <div className="min-w-0 text-right">
            <p className="ot-mini">To</p>
            <p className="mt-1 font-display text-[44px] leading-none font-semibold tracking-tight text-emerald md:text-[56px]">
              OFS
            </p>
            <p className="mt-1.5 truncate text-sm text-ink/60">Your team offsite</p>
          </div>
        </div>

        <dl className="mt-6 grid grid-cols-2 gap-x-5 gap-y-4 border-t border-ink/8 pt-5 text-base md:grid-cols-4">
          <div className="min-w-0">
            <dt className="ot-mini">Passenger</dt>
            <dd className="mt-1 font-medium text-ink/85">Your whole team</dd>
          </div>
          <div className="min-w-0">
            <dt className="ot-mini">Class</dt>
            <dd className="mt-1 font-medium text-ink/85">Fully hosted</dd>
          </div>
          <div className="min-w-0">
            <dt className="ot-mini">Seats</dt>
            <dd className="mt-1 font-medium text-ink/85">10 to 2,000+</dd>
          </div>
          <div className="min-w-0">
            <dt className="ot-mini">Gate</dt>
            <dd className="mt-1 font-medium text-ink/85">Pan-India</dd>
          </div>
        </dl>

        <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 border-t border-ink/8 pt-5 text-base">
          <a href={contact.phoneHref} className="inline-flex items-center gap-2 text-ink/80 transition-colors hover:text-emerald">
            <Phone className="size-4 shrink-0 text-emerald" />
            <span className="truncate">{contact.phone}</span>
          </a>
          <a
            href={`mailto:${contact.email}`}
            className="inline-flex max-w-full min-w-0 items-center gap-2 text-ink/80 transition-colors hover:text-emerald"
          >
            <Mail className="size-4 shrink-0 text-emerald" />
            <span className="truncate">{contact.email}</span>
          </a>
        </div>
      </div>

      {/* Perforation with punched notches (horizontal on mobile, vertical from sm) */}
      <div className="ot-perf relative z-10" aria-hidden />

      <div className="ot-ticket-stub relative flex shrink-0 flex-col items-stretch justify-between gap-5 rounded-b-[22px] bg-white px-6 pt-4 pb-6 ring-1 ring-emerald/10 sm:w-52 sm:rounded-r-[22px] sm:rounded-bl-none md:px-7 md:pt-5 md:pb-7">
        <div>
          <p className="ot-label">Stub</p>
          <p className="mt-2 font-display text-2xl leading-none font-semibold tracking-tight">
            OFC <span className="text-emerald">→</span> OFS
          </p>
          <p className="mt-2 text-sm text-ink/60">Boarding: whenever you&apos;re ready</p>
        </div>
        <div className="flex h-12 items-stretch gap-[2px] overflow-hidden text-ink/80 sm:h-14" aria-hidden>
          {BARS.map((w, i) => (
            <span key={i} className="bg-current" style={{ width: `${w}px`, opacity: i % 5 === 2 ? 0.35 : 1 }} />
          ))}
        </div>
        <button
          type="button"
          onClick={onPlan}
          className="group inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-full bg-ink px-4 py-3.5 text-base font-medium text-cream transition-colors duration-300 hover:bg-emerald"
        >
          Plan my offsite
          <span className="grid size-7 place-items-center rounded-full bg-mint text-ink transition-transform duration-300 group-hover:rotate-45">
            <ArrowUpRight className="size-4" />
          </span>
        </button>
      </div>
    </div>
  );
}

function PlaneIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" transform="rotate(90 12 12)" />
    </svg>
  );
}

const FOOTER_CSS = `
.ot-foot .ot-label {
  font-size: 13px;
  font-weight: 500;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--emerald);
}
.ot-foot .ot-mini {
  font-size: 12px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: color-mix(in oklab, var(--ink) 45%, transparent);
}

/* Logo badge: neon disc with a slowly spinning text ring. */
.ot-badge {
  box-shadow: 0 0 0 6px color-mix(in oklab, var(--mint) 25%, transparent), 0 18px 50px -12px color-mix(in oklab, var(--mint) 70%, transparent);
  transition: transform 0.5s var(--ease-spring);
}
.ot-badge:hover { transform: rotate(-6deg) scale(1.03); }
.ot-badge-ring { animation: ot-spin 18s linear infinite; }
@keyframes ot-spin { to { transform: rotate(360deg); } }

/* Ticket perforation: a dashed rule with two notches punched out in the panel colour. */
.ot-perf {
  height: 0;
  margin: 0 18px;
  border-top: 2px dashed color-mix(in oklab, var(--emerald) 22%, transparent);
}
.ot-perf::before,
.ot-perf::after {
  content: "";
  position: absolute;
  width: 22px;
  height: 22px;
  border-radius: 9999px;
  background: var(--mint-wash);
  box-shadow: inset 0 0 0 1px color-mix(in oklab, var(--emerald) 10%, transparent);
  top: -12px;
}
.ot-perf::before { left: -30px; }
.ot-perf::after { right: -30px; }
@media (min-width: 640px) {
  .ot-perf {
    width: 0;
    height: auto;
    margin: 18px 0;
    border-top: 0;
    border-left: 2px dashed color-mix(in oklab, var(--emerald) 22%, transparent);
  }
  .ot-perf::before,
  .ot-perf::after { left: -12px; right: auto; }
  .ot-perf::before { top: -30px; }
  .ot-perf::after { top: auto; bottom: -30px; }
}

/* A small plane that travels the route from OFC to OFS. */
@keyframes ot-fly {
  0% { left: 0; }
  100% { left: calc(100% - 20px); }
}

/* Hover: the stub tears off along the perforation. */
.ot-ticket-main,
.ot-ticket-stub {
  box-shadow: 0 18px 40px -18px color-mix(in oklab, var(--emerald-deep) 35%, transparent);
  transition: transform 0.7s var(--ease-spring);
}
.ot-ticket-main { transform-origin: 0% 100%; }
.ot-ticket-stub { transform-origin: 0% 0%; }
.ot-perf { transition: opacity 0.3s ease; }
.ot-ticket:hover .ot-perf { opacity: 0; }
.ot-ticket:hover .ot-ticket-main { transform: translateY(-4px) rotate(-0.6deg); }
.ot-ticket:hover .ot-ticket-stub { transform: translate(6px, 22px) rotate(4deg); }
@media (min-width: 640px) {
  .ot-ticket-stub { transform-origin: 0% 100%; }
  .ot-ticket:hover .ot-ticket-main { transform: translateX(-6px) rotate(-1deg); }
  .ot-ticket:hover .ot-ticket-stub { transform: translate(22px, 10px) rotate(6deg); }
}
.ot-plane { animation: ot-fly 3.6s var(--ease-spring) infinite alternate; }

/* Horizon: sun, wordmark and rolling hills. */
.ot-horizon {
  height: clamp(84px, 13vw, 200px);
  box-sizing: content-box;
  overflow: hidden;
}
.ot-word {
  font-size: clamp(44px, 12vw, 190px);
  letter-spacing: -0.045em;
  line-height: 0.9;
  padding-top: clamp(10px, 2vw, 26px);
  transform: translateY(-12%);
  background: linear-gradient(180deg, var(--emerald-deep) 20%, var(--ink) 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  white-space: nowrap;
}
.ot-sun {
  position: absolute;
  left: 50%;
  top: 8%;
  width: clamp(90px, 16vw, 240px);
  aspect-ratio: 1;
  border-radius: 9999px;
  background: radial-gradient(circle at 50% 50%, var(--mint) 0%, color-mix(in oklab, var(--mint) 55%, transparent) 42%, transparent 70%);
  filter: blur(6px);
  opacity: 0.55;
  transform: translate(-50%, 45%);
  transition: transform 1.8s var(--ease-out), opacity 1.8s var(--ease-out);
}
.ot-horizon[data-risen="true"] .ot-sun {
  transform: translate(-50%, 0);
  opacity: 0.9;
}
.ot-hills { height: 46%; }
.ot-hill {
  width: 200%;
  animation: ot-drift 40s linear infinite;
}
@keyframes ot-drift {
  from { transform: translate3d(0, 0, 0); }
  to { transform: translate3d(-50%, 0, 0); }
}

@media (prefers-reduced-motion: reduce) {
  .ot-hill, .ot-plane, .ot-badge-ring { animation: none !important; }
  .ot-ticket-main, .ot-ticket-stub { transition: none; transform: none !important; }
  .ot-plane { left: calc(50% - 6px); }
  .ot-sun { transition: none; transform: translate(-50%, 0); opacity: 0.9; }
}
`;
