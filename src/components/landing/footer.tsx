"use client";

import Image from "next/image";
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
  { label: "Moments", href: "#moments" },
  { label: "FAQs", href: "#faqs" },
] as const;

const POLICIES = ["Privacy Policy", "Cancellation & Refund", "Terms & Conditions"] as const;

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
    <footer id="contact" className="px-2 pb-2 md:px-3 md:pb-3">
      <style>{FOOTER_CSS}</style>
      <div className="ot-foot relative overflow-hidden rounded-[28px] bg-mint-wash text-ink shadow-float ring-1 ring-emerald/10 md:rounded-[36px]">
        <PixelCluster
          cols={12}
          rows={6}
          cell={14}
          seed={7}
          className="absolute -top-6 right-4 hidden opacity-80 sm:block md:right-10"
        />

        {/* ---------- Top: brand + boarding pass ---------- */}
        <div className="relative grid gap-8 px-5 pt-8 sm:px-6 md:px-10 md:pt-12 lg:grid-cols-[1fr_minmax(0,1.35fr)] lg:gap-12">
          <div className="min-w-0">
            <a href="#top" onClick={(e) => jump(e, "#top")} aria-label="OneThrive home" className="inline-block">
              <Image src="/brand/logo-green.png" alt="OneThrive" width={1280} height={800} className="h-12 w-auto md:h-14" />
            </a>
            <p className="mt-4 max-w-sm font-display text-2xl leading-tight font-medium tracking-tight text-ink md:text-[28px]">
              Your team&apos;s next good day out{" "}
              <span className="font-serif font-normal text-emerald italic">starts here.</span>
            </p>
            <p className="mt-3 max-w-xs text-sm leading-6 text-ink/55">
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
                <button type="button" onClick={() => setOpen(true)} className={`${pillClass} cursor-pointer`}>
                  Contact Us
                </button>
              </li>
            </ul>
          </nav>

          <div>
            <p className="ot-label">Policies</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {POLICIES.map((label) => (
                <li key={label}>
                  {/* TODO: link to real policy page */}
                  <a href="#" className={pillClass}>
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="ot-label">Follow along</p>
            <div className="mt-3 flex gap-2">
              {SOCIALS.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={`OneThrive on ${label}`}
                  className="grid size-10 place-items-center rounded-full bg-white/70 text-emerald ring-1 ring-emerald/10 transition-colors duration-300 hover:bg-mint hover:text-ink"
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* ---------- Bottom: the wordmark as a horizon ---------- */}
        <div ref={horizonRef} className="ot-horizon relative mt-8 md:mt-10" aria-hidden>
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

        <div className="relative flex flex-wrap items-center justify-between gap-x-4 gap-y-1 bg-[#d9f9ec] px-5 pt-1 pb-4 text-[11px] text-emerald-deep/70 sm:px-6 md:px-10">
          <p>© {new Date().getFullYear()} OneThrive. All rights reserved.</p>
          <p>Designed &amp; Developed by OneThrive Team</p>
        </div>
      </div>
    </footer>
  );
}

/**
 * The contact CTA as a boarding pass: from your desk to a team that thrives.
 * The stub (with a decorative barcode) holds the primary action.
 */
function BoardingPass({ onPlan }: { onPlan: () => void }) {
  return (
    <div className="ot-ticket relative flex min-w-0 flex-col rounded-[22px] bg-white text-ink shadow-float ring-1 ring-emerald/10 sm:flex-row">
      <div className="min-w-0 flex-1 p-5 md:p-6">
        <div className="flex items-center justify-between gap-3">
          <p className="ot-label">Boarding pass</p>
          <p className="rounded-full bg-mint-wash px-2.5 py-1 font-mono text-[10px] tracking-[0.14em] text-emerald uppercase">
            Next offsite
          </p>
        </div>

        <div className="mt-4 flex items-end justify-between gap-2">
          <div className="min-w-0">
            <p className="font-display text-[34px] leading-none font-semibold tracking-tight md:text-[40px]">DSK</p>
            <p className="mt-1 truncate text-xs text-ink/50">Your desk</p>
          </div>
          <div className="relative mb-5 h-px min-w-8 flex-1 border-t-2 border-dashed border-line/60">
            <span className="ot-plane absolute -top-[7px] left-0 block size-3 rounded-full bg-line ring-4 ring-mint/25" />
          </div>
          <div className="min-w-0 text-right">
            <p className="font-display text-[34px] leading-none font-semibold tracking-tight text-emerald md:text-[40px]">
              THR
            </p>
            <p className="mt-1 truncate text-xs text-ink/50">A team that thrives</p>
          </div>
        </div>

        <dl className="mt-5 grid grid-cols-2 gap-x-4 gap-y-3 border-t border-ink/8 pt-4 text-sm">
          <div className="min-w-0">
            <dt className="ot-mini">Call the crew</dt>
            <dd className="mt-1">
              <a href={contact.phoneHref} className="inline-flex items-center gap-1.5 text-ink/80 transition-colors hover:text-emerald">
                <Phone className="size-3.5 shrink-0 text-emerald" />
                <span className="truncate">{contact.phone}</span>
              </a>
            </dd>
          </div>
          <div className="min-w-0">
            <dt className="ot-mini">Write to us</dt>
            <dd className="mt-1">
              <a
                href={`mailto:${contact.email}`}
                className="inline-flex max-w-full items-center gap-1.5 text-ink/80 transition-colors hover:text-emerald"
              >
                <Mail className="size-3.5 shrink-0 text-emerald" />
                <span className="truncate">{contact.email}</span>
              </a>
            </dd>
          </div>
          <div>
            <dt className="ot-mini">Group</dt>
            <dd className="mt-1 text-ink/80">10 to 2,000+</dd>
          </div>
          <div>
            <dt className="ot-mini">Gate</dt>
            <dd className="mt-1 text-ink/80">Anywhere in India &amp; beyond</dd>
          </div>
        </dl>
      </div>

      {/* Perforation with punched notches (horizontal on mobile, vertical from sm) */}
      <div className="ot-perf relative" aria-hidden />

      <div className="flex shrink-0 flex-col items-stretch justify-between gap-4 p-5 sm:w-44 md:p-6">
        <div className="flex h-10 items-stretch gap-[2px] overflow-hidden text-ink/80 sm:h-12" aria-hidden>
          {BARS.map((w, i) => (
            <span key={i} className="bg-current" style={{ width: `${w}px`, opacity: i % 5 === 2 ? 0.35 : 1 }} />
          ))}
        </div>
        <button
          type="button"
          onClick={onPlan}
          className="group inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-full bg-ink px-4 py-3 text-sm font-medium text-cream transition-colors duration-300 hover:bg-emerald"
        >
          Plan my offsite
          <span className="grid size-6 place-items-center rounded-full bg-mint text-ink transition-transform duration-300 group-hover:rotate-45">
            <ArrowUpRight className="size-3.5" />
          </span>
        </button>
      </div>
    </div>
  );
}

const FOOTER_CSS = `
.ot-foot .ot-label {
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--emerald);
}
.ot-foot .ot-mini {
  font-size: 10px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: color-mix(in oklab, var(--ink) 45%, transparent);
}

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

/* A small dot that travels the route from DSK to THR. */
@keyframes ot-fly {
  0% { left: 0; }
  100% { left: calc(100% - 12px); }
}
.ot-plane { animation: ot-fly 3.6s var(--ease-spring) infinite alternate; }

/* Horizon: sun, wordmark and rolling hills. */
.ot-horizon {
  height: clamp(118px, 22vw, 320px);
  overflow: hidden;
}
.ot-word {
  font-size: clamp(60px, 19.5vw, 300px);
  letter-spacing: -0.045em;
  line-height: 0.9;
  padding-top: clamp(14px, 3vw, 40px);
  background: linear-gradient(180deg, var(--emerald) 30%, var(--emerald-deep) 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  white-space: nowrap;
}
.ot-sun {
  position: absolute;
  left: 50%;
  top: 8%;
  width: clamp(120px, 26vw, 380px);
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
  .ot-hill, .ot-plane { animation: none !important; }
  .ot-plane { left: calc(50% - 6px); }
  .ot-sun { transition: none; transform: translate(-50%, 0); opacity: 0.9; }
}
`;
