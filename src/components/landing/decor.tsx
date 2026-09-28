"use client";

import { useEffect, useId, useRef, useState } from "react";
import { gsap, prefersReducedMotion, ScrollTrigger, useGSAP } from "@/lib/gsap";

type Point = readonly [number, number];

/**
 * A curve in pixel space: given t in [0, 1] and the host's size, return a point.
 * Lines are defined as smooth parametric functions (sines, trochoids) rather than
 * hand-placed points, so they stay mathematically clean at every viewport size.
 */
export type Curve = (t: number, w: number, h: number) => Point;

const SAMPLES = 180;

/* Sample the curve densely and join the samples with Catmull-Rom cubics. */
function pathFor(curve: Curve, w: number, h: number) {
  const pts: Point[] = [];
  for (let i = 0; i <= SAMPLES; i++) pts.push(curve(i / SAMPLES, w, h));
  const f = (n: number) => n.toFixed(1);
  let d = `M${f(pts[0][0])} ${f(pts[0][1])}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] ?? p2;
    d += ` C${f(p1[0] + (p2[0] - p0[0]) / 6)} ${f(p1[1] + (p2[1] - p0[1]) / 6)} ${f(p2[0] - (p3[0] - p1[0]) / 6)} ${f(p2[1] - (p3[1] - p1[1]) / 6)} ${f(p2[0])} ${f(p2[1])}`;
  }
  return d;
}

/**
 * A thick brand-green line that draws itself, either on load (`intro = 1`), on scroll
 * (`intro = 0`), or a mix. It is fully opaque at the host's centre and fades toward the
 * edges through a radial mask.
 */
export function FlowLine({
  curve,
  mobileCurve,
  start = "top 80%",
  end = "bottom 55%",
  intro = 0,
  introDelay = 0.5,
  showHead = true,
  className = "",
}: {
  curve: Curve;
  mobileCurve?: Curve;
  start?: string;
  end?: string;
  /** Fraction of the line drawn on load, before any scrolling. */
  intro?: number;
  introDelay?: number;
  showHead?: boolean;
  className?: string;
}) {
  const svgRef = useRef<SVGSVGElement>(null);
  const maskId = useId().replace(/:/g, "");
  const [geo, setGeo] = useState<{ w: number; h: number; d: string; stroke: number } | null>(null);

  useEffect(() => {
    const host = svgRef.current?.parentElement;
    if (!host) return;
    const measure = () => {
      const w = host.offsetWidth;
      const h = host.offsetHeight;
      const d = pathFor(w < 768 && mobileCurve ? mobileCurve : curve, w, h);
      const stroke = Math.round(Math.min(34, Math.max(16, w * 0.022)));
      setGeo((prev) => (prev && prev.d === d ? prev : { w, h, d, stroke }));
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(host);
    return () => observer.disconnect();
  }, [curve, mobileCurve]);

  useGSAP(
    () => {
      const svg = svgRef.current;
      const path = svg?.querySelector<SVGPathElement>("[data-line]");
      const head = svg?.querySelector<SVGCircleElement>("[data-head]");
      if (!svg || !path || !head || !geo) return;

      const length = path.getTotalLength();
      path.style.strokeDasharray = `${length}`;

      if (prefersReducedMotion()) {
        path.style.strokeDashoffset = "0";
        head.style.opacity = "0";
        return;
      }

      const state = { intro: 0, scroll: 0 };
      const render = () => {
        const progress = Math.min(1, state.intro * intro + (1 - intro) * state.scroll);
        path.style.strokeDashoffset = `${length * (1 - progress)}`;
        if (showHead) {
          const tip = path.getPointAtLength(length * progress);
          head.setAttribute("cx", `${tip.x}`);
          head.setAttribute("cy", `${tip.y}`);
          head.style.opacity = progress > 0.004 && progress < 0.996 ? "1" : "0";
        }
      };
      render();

      if (intro > 0) {
        gsap.to(state, { intro: 1, duration: 2.4, delay: introDelay, ease: "power2.inOut", onUpdate: render });
      }

      if (intro < 1) {
        ScrollTrigger.create({
          trigger: svg.parentElement,
          start,
          end,
          onUpdate: (self) => {
            state.scroll = self.progress;
            render();
          },
        });
      }
    },
    { dependencies: [geo], revertOnUpdate: true },
  );

  return (
    <svg
      ref={svgRef}
      aria-hidden
      className={`pointer-events-none absolute inset-0 h-full w-full overflow-visible ${className}`}
      viewBox={geo ? `0 0 ${geo.w} ${geo.h}` : undefined}
    >
      {geo && (
        <>
          <defs>
            <radialGradient
              id={`${maskId}-g`}
              gradientUnits="userSpaceOnUse"
              cx={geo.w / 2}
              cy={geo.h / 2}
              r={Math.hypot(geo.w, geo.h) / 2}
            >
              <stop offset="0" stopColor="#fff" stopOpacity="1" />
              <stop offset="0.45" stopColor="#fff" stopOpacity="1" />
              <stop offset="0.8" stopColor="#fff" stopOpacity="0.6" />
              <stop offset="1" stopColor="#fff" stopOpacity="0.2" />
            </radialGradient>
            <mask id={`${maskId}-m`} maskUnits="userSpaceOnUse" x={-geo.w} y={-geo.h} width={geo.w * 3} height={geo.h * 3}>
              <rect x={-geo.w} y={-geo.h} width={geo.w * 3} height={geo.h * 3} fill={`url(#${maskId}-g)`} />
            </mask>
          </defs>
          <g mask={`url(#${maskId}-m)`}>
            <path
              data-line
              d={geo.d}
              fill="none"
              stroke="var(--line)"
              strokeWidth={geo.stroke}
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ strokeDashoffset: 99999 }}
            />
            <circle data-head r={geo.stroke * 0.24} fill="var(--cream)" style={{ opacity: 0 }} />
          </g>
        </>
      )}
    </svg>
  );
}

/* Deterministic pseudo-random (integer hash) so server and client render identical pixels;
   Math.sin-based noise can differ in the last bits between Node and the browser. */
function rand(seed: number) {
  let t = Math.imul(seed | 0, 0x9e3779b1);
  t = Math.imul(t ^ (t >>> 15), 0x2c1b3c6d);
  t = Math.imul(t ^ (t >>> 12), 0x297a2d39);
  return ((t ^ (t >>> 15)) >>> 0) / 4294967296;
}

const PIXEL_TONES = ["var(--mint-soft)", "#b2f0d5", "#d2f7e7", "#8fe9c3"];

/**
 * The mint "pixel cloud" from the brand mock: grid squares that thin out toward
 * the edges of an ellipse, a few of them softly twinkling.
 */
export function PixelCluster({
  cols = 14,
  rows = 8,
  seed = 1,
  cell = 18,
  className = "",
}: {
  cols?: number;
  rows?: number;
  seed?: number;
  cell?: number;
  className?: string;
}) {
  /* Chunky squares: blow each cell up while shrinking the grid, so the cloud keeps
     roughly the footprint that `cols * cell` by `rows * cell` describes. */
  const scale = 2;
  cell *= scale;
  cols = Math.max(3, Math.round(cols / scale));
  rows = Math.max(3, Math.round(rows / scale));
  const squares: Array<{ x: number; y: number; o: number; t: boolean; d: number; c: string }> = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const dx = (c + 0.5) / cols - 0.5;
      const dy = (r + 0.5) / rows - 0.5;
      const falloff = 1 - Math.min(1, Math.sqrt(dx * dx + dy * dy) * 2);
      const n = rand(seed * 1000 + r * cols + c);
      if (n < falloff * 1.05) {
        const tone = rand(seed * 31 + r * 17 + c * 5);
        squares.push({
          x: c * cell,
          y: r * cell,
          o: Math.round((0.45 + falloff * 0.55 * rand(seed + r * 7 + c * 13)) * 100) / 100,
          t: n < 0.2,
          d: Math.round((3 + rand(seed + c) * 5) * 10) / 10,
          c: PIXEL_TONES[Math.floor(tone * PIXEL_TONES.length)],
        });
      }
    }
  }

  return (
    <svg
      aria-hidden
      className={`pointer-events-none ${className}`}
      width={cols * cell}
      height={rows * cell}
      viewBox={`0 0 ${cols * cell} ${rows * cell}`}
    >
      {squares.map((s, i) => (
        <rect
          key={i}
          x={s.x}
          y={s.y}
          width={cell}
          height={cell}
          fill={s.c}
          className={s.t ? "pixel" : undefined}
          style={{ opacity: s.o, ["--o" as string]: s.o, ["--d" as string]: `${s.d}s` }}
        />
      ))}
    </svg>
  );
}

/* A soft, slowly drifting mint glow, the same wash that sits behind the FAQs wordmark. */
export function Glow({ className = "", tone = "mint" }: { className?: string; tone?: "mint" | "emerald" | "soft" }) {
  const color = tone === "mint" ? "bg-mint/30" : tone === "emerald" ? "bg-emerald/25" : "bg-mint-soft/80";
  return <div aria-hidden className={`glow pointer-events-none absolute rounded-full blur-3xl ${color} ${className}`} />;
}
