"use client";

import { useRef } from "react";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";

export function Squiggle() {
  const pathRef = useRef<SVGPathElement>(null);

  useGSAP(() => {
    const path = pathRef.current;
    if (!path || prefersReducedMotion()) return;
    const length = path.getTotalLength();
    gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
    gsap.to(path, {
      strokeDashoffset: 0,
      ease: "none",
      scrollTrigger: {
        trigger: "#story",
        start: "top 70%",
        end: "bottom 40%",
        scrub: 0.6,
      },
    });
  });

  return (
    <svg
      aria-hidden
      className="pointer-events-none absolute top-0 left-0 z-20 hidden h-full w-[72px] min-[1400px]:block"
      viewBox="0 0 90 1680"
      fill="none"
      preserveAspectRatio="xMidYMin meet"
    >
      <path
        ref={pathRef}
        d="M46 70 C 70 220, 18 340, 48 520 C 74 700, 16 840, 50 1040 C 78 1220, 22 1360, 52 1540"
        stroke="#3ddc84"
        strokeWidth="14"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function PixelField({ className = "" }: { className?: string }) {
  const cells = Array.from({ length: 72 }, (_, index) => {
    const seed = (index * 97 + 13) % 997;
    return {
      x: (seed * 37) % 100,
      y: (seed * 19) % 100,
      s: 6 + (seed % 12),
      o: 0.18 + (seed % 5) * 0.08,
    };
  });

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden>
      {cells.map((cell, index) => (
        <span
          key={index}
          className="absolute bg-[#b7e7c8]"
          style={{
            left: `${cell.x}%`,
            top: `${cell.y}%`,
            width: cell.s,
            height: cell.s,
            opacity: cell.o,
          }}
        />
      ))}
    </div>
  );
}
