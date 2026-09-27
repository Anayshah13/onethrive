"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, prefersReducedMotion, ScrollTrigger, useGSAP } from "@/lib/gsap";

type Point = readonly [number, number];

/* Smooth curve through every point (Catmull-Rom converted to cubic Béziers). */
function curveThrough(points: Point[]) {
  const f = (n: number) => n.toFixed(1);
  let d = `M${f(points[0][0])} ${f(points[0][1])}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] ?? points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2] ?? p2;
    const c1x = p1[0] + (p2[0] - p0[0]) / 6;
    const c1y = p1[1] + (p2[1] - p0[1]) / 6;
    const c2x = p2[0] - (p3[0] - p1[0]) / 6;
    const c2y = p2[1] - (p3[1] - p1[1]) / 6;
    d += ` C${f(c1x)} ${f(c1y)} ${f(c2x)} ${f(c2y)} ${f(p2[0])} ${f(p2[1])}`;
  }
  return d;
}

/**
 * A thick brand-green line that draws itself as its parent scrolls through the viewport.
 * Points are fractions of the parent's width and height, so the curve is rebuilt for any
 * viewport size instead of being stretched (which would distort the stroke).
 */
export function FlowLine({
  points,
  mobilePoints,
  start = "top 80%",
  end = "bottom 55%",
  intro = 0,
  className = "",
}: {
  points: Point[];
  mobilePoints?: Point[];
  start?: string;
  end?: string;
  /** Fraction of the line drawn on load, before any scrolling. */
  intro?: number;
  className?: string;
}) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [geo, setGeo] = useState<{ w: number; h: number; d: string; stroke: number } | null>(null);

  useEffect(() => {
    const host = svgRef.current?.parentElement;
    if (!host) return;
    const measure = () => {
      const w = host.offsetWidth;
      const h = host.offsetHeight;
      const set = w < 768 && mobilePoints ? mobilePoints : points;
      const d = curveThrough(set.map(([x, y]) => [x * w, y * h] as const));
      const stroke = Math.round(Math.min(30, Math.max(13, w * 0.019)));
      setGeo((prev) => (prev && prev.d === d ? prev : { w, h, d, stroke }));
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(host);
    return () => observer.disconnect();
  }, [points, mobilePoints]);

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
        const tip = path.getPointAtLength(length * progress);
        head.setAttribute("cx", `${tip.x}`);
        head.setAttribute("cy", `${tip.y}`);
        head.style.opacity = progress > 0.004 && progress < 0.996 ? "1" : "0";
      };
      render();

      if (intro > 0) {
        gsap.to(state, { intro: 1, duration: 2.2, delay: 0.5, ease: "power3.inOut", onUpdate: render });
      }

      ScrollTrigger.create({
        trigger: svg.parentElement,
        start,
        end,
        onUpdate: (self) => {
          state.scroll = self.progress;
          render();
        },
      });
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
          <circle data-head r={geo.stroke * 0.26} fill="var(--cream)" style={{ opacity: 0 }} />
        </>
      )}
    </svg>
  );
}

/* Deterministic pseudo-random so server and client render the same pixels. */
function rand(seed: number) {
  const x = Math.sin(seed * 9301 + 49297) * 233280;
  return x - Math.floor(x);
}

/**
 * The pale mint "pixel cloud" from the brand mock: grid squares that thin out toward
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
  const squares: Array<{ x: number; y: number; o: number; t: boolean; d: number }> = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const dx = (c + 0.5) / cols - 0.5;
      const dy = (r + 0.5) / rows - 0.5;
      const falloff = 1 - Math.min(1, Math.sqrt(dx * dx + dy * dy) * 2);
      const n = rand(seed * 1000 + r * cols + c);
      if (n < falloff * 0.95) {
        squares.push({
          x: c * cell,
          y: r * cell,
          o: 0.25 + falloff * 0.55 * rand(seed + r * 7 + c * 13),
          t: n < 0.12,
          d: 4 + rand(seed + c) * 5,
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
          fill={i % 3 === 0 ? "var(--mint-soft)" : "#d7f5e6"}
          className={s.t ? "pixel" : undefined}
          style={{ opacity: s.o, ["--o" as string]: s.o, ["--d" as string]: `${s.d}s` }}
        />
      ))}
    </svg>
  );
}
