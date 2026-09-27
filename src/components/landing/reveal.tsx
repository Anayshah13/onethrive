"use client";

import { useRef } from "react";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";

/**
 * Heavy fade-up with a blur that resolves as the block enters the viewport.
 * With `stagger`, each direct child animates in turn instead of the block as one.
 */
export function Reveal({
  children,
  className = "",
  stagger,
  y = 48,
  delay = 0,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  y?: number;
  delay?: number;
  as?: "div" | "ul" | "header";
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || prefersReducedMotion()) return;
      const targets = stagger ? Array.from(el.children) : el;
      gsap.from(targets, {
        y,
        autoAlpha: 0,
        filter: "blur(10px)",
        duration: 1.1,
        delay,
        ease: "expo.out",
        stagger,
        clearProps: "filter",
        scrollTrigger: { trigger: el, start: "top 88%", once: true },
      });
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref as React.Ref<never>} className={className}>
      {children}
    </Tag>
  );
}
