"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { contact } from "@/data/content";
import { prefersReducedMotion } from "@/lib/gsap";
import { Instagram, LinkedIn, Mail, Phone, YouTube } from "./icons";
import { scrollToHash } from "./smooth-scroll";
import { useTalk } from "./talk";

const QUICK_LINKS = [
  { label: "Home", href: "#top" },
  { label: "About Us", href: "#promise" },
  { label: "Services", href: "#offer" },
  { label: "Destinations", href: "#destinations" },
] as const;

const POLICIES = ["Privacy Policy", "Cancellation & Refund", "Terms & Conditions"] as const;

/* TODO: real Instagram / LinkedIn / YouTube URLs */
const SOCIALS = [
  { label: "Instagram", href: "#", Icon: Instagram },
  { label: "LinkedIn", href: "#", Icon: LinkedIn },
  { label: "YouTube", href: "#", Icon: YouTube },
] as const;

const linkClass = "text-sm text-cream/60 transition-colors duration-300 hover:text-mint";

export function Footer() {
  const { setOpen } = useTalk();

  return (
    <footer id="contact" className="px-2 pb-2 md:px-3 md:pb-3">
      <div className="relative overflow-hidden rounded-[28px] bg-ink-deep text-cream md:rounded-[36px]">
        <div className="grid gap-10 px-6 pt-10 pb-8 md:grid-cols-[1.4fr_auto_auto_auto] md:gap-14 md:px-10 md:pt-12">
          <div>
            <a
              href="#top"
              onClick={(event) => {
                event.preventDefault();
                scrollToHash("#top");
              }}
              aria-label="OneThrive home"
            >
              <Image src="/brand/logo-white.png" alt="OneThrive" width={1280} height={800} className="h-14 w-auto" />
            </a>
            <p className="mt-4 max-w-xs text-sm leading-6 text-cream/50">
              Engaging experiences, wellness initiatives and curated programs for workplaces that thrive.
            </p>
          </div>

          <nav aria-label="Quick links">
            <p className="text-xs font-medium tracking-[0.18em] text-mint uppercase">Explore</p>
            <ul className="mt-4 flex flex-col gap-2.5">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(event) => {
                      event.preventDefault();
                      scrollToHash(link.href);
                    }}
                    className={linkClass}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <button type="button" onClick={() => setOpen(true)} className={`${linkClass} cursor-pointer`}>
                  Contact Us
                </button>
              </li>
            </ul>
          </nav>

          <div>
            <p className="text-xs font-medium tracking-[0.18em] text-mint uppercase">Policies</p>
            <ul className="mt-4 flex flex-col gap-2.5">
              {POLICIES.map((label) => (
                <li key={label}>
                  {/* TODO: link to real policy page */}
                  <a href="#" className={linkClass}>
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-medium tracking-[0.18em] text-mint uppercase">Say hello</p>
            <div className="mt-4 flex flex-col gap-2.5">
              <a href={contact.phoneHref} className={`${linkClass} inline-flex items-center gap-2`}>
                <Phone className="size-4 text-mint" />
                {contact.phone}
              </a>
              <a href={`mailto:${contact.email}`} className={`${linkClass} inline-flex items-center gap-2`}>
                <Mail className="size-4 text-mint" />
                {contact.email}
              </a>
            </div>
            <div className="mt-4 flex gap-2">
              {SOCIALS.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={`OneThrive on ${label}`}
                  className="grid size-9 place-items-center rounded-lg bg-white/5 text-cream/70 ring-1 ring-white/10 transition-colors duration-300 hover:bg-mint hover:text-ink"
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mx-6 flex flex-wrap justify-between gap-2 border-t border-white/10 py-4 text-[11px] text-cream/40 md:mx-10">
          <p>© {new Date().getFullYear()} OneThrive. All rights reserved.</p>
          <p>Designed &amp; Developed by OneThrive Team</p>
        </div>

        <DitherWordmark />
      </div>
    </footer>
  );
}

/* 8×8 Bayer matrix, normalised to thresholds in (0, 1). */
const BAYER = [
  0, 32, 8, 40, 2, 34, 10, 42, 48, 16, 56, 24, 50, 18, 58, 26, 12, 44, 4, 36, 14, 46, 6, 38, 60, 28, 52, 20, 62, 30,
  54, 22, 3, 35, 11, 43, 1, 33, 9, 41, 51, 19, 59, 27, 49, 17, 57, 25, 15, 47, 7, 39, 13, 45, 5, 37, 63, 31, 55, 23,
  61, 29, 53, 21,
].map((v) => (v + 0.5) / 64);

/* Palette as little-endian RGBA words: transparent, emerald-deep, emerald, tropical mint. */
const rgba = (r: number, g: number, b: number, a = 255) => ((a << 24) | (b << 16) | (g << 8) | r) >>> 0;
const TONES = [rgba(0, 0, 0, 0), rgba(0x12, 0x3f, 0x30), rgba(0x1b, 0x61, 0x48), rgba(0x00, 0xff, 0xab)];
const LEVELS = TONES.length - 1;

const CELL = 4; // CSS pixels per dither pixel

/**
 * The footer's signature: the OneThrive wordmark rendered through an ordered (Bayer) dither
 * over a slow plasma field. It develops left to right when it scrolls into view, and the
 * cursor acts as a torch that brightens the dither and sends ripples through it.
 */
function DitherWordmark() {
  const hostRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!host || !canvas || !ctx) return;

    const still = prefersReducedMotion();
    let cols = 0;
    let rows = 0;
    let mask = new Float32Array(0);
    let image: ImageData | null = null;
    let words = new Uint32Array(0);

    const buildMask = () => {
      cols = Math.max(1, Math.ceil(host.offsetWidth / CELL));
      rows = Math.max(1, Math.ceil(host.offsetHeight / CELL));
      canvas.width = cols;
      canvas.height = rows;
      image = ctx.createImageData(cols, rows);
      words = new Uint32Array(image.data.buffer);

      const off = document.createElement("canvas");
      off.width = cols;
      off.height = rows;
      const o = off.getContext("2d", { willReadFrequently: true });
      if (!o) return;
      const family = getComputedStyle(document.documentElement).getPropertyValue("--font-heading").trim() || "sans-serif";
      const text = "OneThrive";
      o.font = `600 100px ${family}`;
      const size = Math.min((100 * cols * 0.94) / o.measureText(text).width, rows * 1.02);
      o.font = `600 ${size}px ${family}`;
      o.textAlign = "center";
      o.textBaseline = "alphabetic";
      o.fillStyle = "#fff";

      const draw = (blur: number) => {
        o.clearRect(0, 0, cols, rows);
        o.filter = blur ? `blur(${blur}px)` : "none";
        o.fillText(text, cols / 2, rows * 0.9);
        return o.getImageData(0, 0, cols, rows).data;
      };
      const halo = draw(4);
      const crisp = draw(0);
      mask = new Float32Array(cols * rows);
      for (let i = 0; i < mask.length; i++) {
        mask[i] = Math.max(crisp[i * 4 + 3] / 255, (halo[i * 4 + 3] / 255) * 0.5);
      }
    };

    const pointer = { x: -999, y: -999, power: 0, target: 0 };
    let reveal = still ? 1 : 0;
    let visible = false;
    let raf = 0;
    let last = 0;

    const render = (time: number) => {
      if (!image) return;
      const t = time / 1000;
      const front = reveal * (cols + 60);
      for (let y = 0; y < rows; y++) {
        const vy = y / rows;
        const rowBase = 0.06 + vy * vy * 0.22;
        for (let x = 0; x < cols; x++) {
          const i = y * cols + x;
          const sweep = Math.min(1, Math.max(0, (front - x) / 60));
          if (sweep === 0) {
            words[i] = TONES[0];
            continue;
          }
          const plasma =
            0.5 + 0.5 * Math.sin(x * 0.055 + t * 0.7 + Math.sin(y * 0.08 + t * 0.45) * 1.6) * Math.cos(y * 0.045 - t * 0.5);
          let f = rowBase + plasma * 0.26 + mask[i] * (0.62 + plasma * 0.38);
          if (pointer.power > 0.01) {
            const dx = x - pointer.x;
            const dy = y - pointer.y;
            const d = Math.sqrt(dx * dx + dy * dy);
            f += pointer.power * (Math.exp(-(d * d) / 420) * 0.7 + Math.sin(d * 0.4 - t * 6) * Math.exp(-d / 28) * 0.22);
          }
          // A thin scanline at the developing edge gives the reveal its "printing" feel.
          if (sweep < 1) f = f * sweep + (sweep > 0.96 ? 0.9 : 0);
          const v = Math.min(LEVELS, Math.max(0, f * LEVELS));
          const base = Math.floor(v);
          const level = base + (v - base > BAYER[(y & 7) * 8 + (x & 7)] ? 1 : 0);
          words[i] = TONES[Math.min(LEVELS, level)];
        }
      }
      ctx.putImageData(image, 0, 0);
    };

    const loop = (time: number) => {
      raf = requestAnimationFrame(loop);
      if (time - last < 33) return; // ~30fps is plenty for a dither
      const dt = last ? (time - last) / 1000 : 0;
      last = time;
      if (reveal < 1) reveal = Math.min(1, reveal + dt / 1.6);
      pointer.power += (pointer.target - pointer.power) * 0.12;
      render(time);
    };

    const start = () => {
      if (!raf && !still) {
        last = 0;
        raf = requestAnimationFrame(loop);
      }
    };
    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };

    buildMask();
    render(0);
    document.fonts?.ready.then(() => {
      buildMask();
      render(performance.now());
    });

    const resize = new ResizeObserver(() => {
      buildMask();
      render(performance.now());
    });
    resize.observe(host);

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
      else stop();
    });
    io.observe(host);

    const move = (event: PointerEvent) => {
      const rect = host.getBoundingClientRect();
      pointer.x = (event.clientX - rect.left) / CELL;
      pointer.y = (event.clientY - rect.top) / CELL;
      pointer.target = 1;
    };
    const leave = () => {
      pointer.target = 0;
    };
    host.addEventListener("pointermove", move);
    host.addEventListener("pointerleave", leave);

    return () => {
      stop();
      resize.disconnect();
      io.disconnect();
      host.removeEventListener("pointermove", move);
      host.removeEventListener("pointerleave", leave);
    };
  }, []);

  return (
    <div ref={hostRef} aria-hidden className="relative h-[clamp(140px,19vw,280px)] cursor-crosshair select-none">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full [image-rendering:pixelated]" />
    </div>
  );
}
