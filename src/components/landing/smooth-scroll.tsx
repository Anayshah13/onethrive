"use client";

import Lenis from "lenis";
import { useEffect } from "react";
import { gsap, prefersReducedMotion, ScrollTrigger } from "@/lib/gsap";

let lenis: Lenis | null = null;

/* Scroll to an in-page anchor, through Lenis when it is running. */
export function scrollToHash(hash: string) {
  const target = document.querySelector<HTMLElement>(hash);
  if (!target) return;
  if (lenis) lenis.scrollTo(target, { offset: -24, duration: 1.4 });
  else target.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth" });
}

export function lockScroll(locked: boolean) {
  if (!lenis) return;
  if (locked) lenis.stop();
  else lenis.start();
}

export function SmoothScroll() {
  useEffect(() => {
    if (prefersReducedMotion()) return;

    const instance = new Lenis({ lerp: 0.09, wheelMultiplier: 0.95 });
    lenis = instance;

    instance.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => instance.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // Images and fonts change section heights after first paint.
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    document.fonts?.ready.then(refresh);

    return () => {
      gsap.ticker.remove(tick);
      window.removeEventListener("load", refresh);
      instance.destroy();
      lenis = null;
    };
  }, []);

  return null;
}
