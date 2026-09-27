"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/* Shared easing tokens so GSAP and CSS motion feel like one system. */
export const EASE = {
  out: "expo.out",
  soft: "power3.out",
  inOut: "power2.inOut",
} as const;

/* Framer Motion equivalents of --ease-out / --ease-spring. */
export const EASE_OUT = [0.16, 1, 0.3, 1] as const;
export const EASE_SPRING = [0.32, 0.72, 0, 1] as const;

export { gsap, ScrollTrigger, useGSAP };
