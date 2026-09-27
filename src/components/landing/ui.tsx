"use client";

import { useRef } from "react";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";
import { ArrowUpRight } from "./icons";

const variants = {
  mint: "bg-mint text-ink shadow-[0_10px_30px_-10px_rgba(0,255,171,0.7)]",
  ink: "bg-ink text-cream",
  light: "bg-white text-ink ring-1 ring-ink/10",
} as const;

const iconVariants = {
  mint: "bg-ink text-mint",
  ink: "bg-mint text-ink",
  light: "bg-ink text-mint",
} as const;

/**
 * Pill CTA with its arrow nested in its own circle ("button-in-button").
 * The whole pill leans toward the pointer; the inner circle travels further for tension.
 */
export function PillButton({
  children,
  onClick,
  href,
  variant = "mint",
  size = "md",
  icon = <ArrowUpRight className="size-4" />,
  className = "",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  variant?: keyof typeof variants;
  size?: "sm" | "md" | "lg";
  icon?: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || prefersReducedMotion() || !window.matchMedia("(pointer: fine)").matches) return;
      const knob = el.querySelector<HTMLElement>("[data-knob]");
      const xTo = gsap.quickTo(el, "x", { duration: 0.6, ease: "elastic.out(1, 0.45)" });
      const yTo = gsap.quickTo(el, "y", { duration: 0.6, ease: "elastic.out(1, 0.45)" });
      const kxTo = knob && gsap.quickTo(knob, "x", { duration: 0.5, ease: "power3.out" });
      const kyTo = knob && gsap.quickTo(knob, "y", { duration: 0.5, ease: "power3.out" });

      const move = (event: PointerEvent) => {
        const r = el.getBoundingClientRect();
        const dx = event.clientX - (r.left + r.width / 2);
        const dy = event.clientY - (r.top + r.height / 2);
        xTo(dx * 0.18);
        yTo(dy * 0.28);
        kxTo?.(dx * 0.12);
        kyTo?.(dy * 0.18);
      };
      const leave = () => {
        xTo(0);
        yTo(0);
        kxTo?.(0);
        kyTo?.(0);
      };
      el.addEventListener("pointermove", move);
      el.addEventListener("pointerleave", leave);
      return () => {
        el.removeEventListener("pointermove", move);
        el.removeEventListener("pointerleave", leave);
      };
    },
    { scope: ref },
  );

  const pad = size === "sm" ? "py-1 pr-1 pl-4 text-[13px]" : size === "lg" ? "py-2 pr-2 pl-7 text-base" : "py-1.5 pr-1.5 pl-5 text-sm";
  const knobSize = size === "sm" ? "size-7" : size === "lg" ? "size-11" : "size-9";
  const classes = `group inline-flex cursor-pointer items-center gap-3 rounded-full font-semibold tracking-tight transition-[transform,box-shadow,background-color] duration-500 ease-spring active:scale-[0.97] ${pad} ${variants[variant]} ${className}`;

  const inner = (
    <>
      <span>{children}</span>
      <span
        data-knob
        className={`grid ${knobSize} place-items-center rounded-full transition-transform duration-500 ease-spring group-hover:scale-110 group-hover:rotate-45 ${iconVariants[variant]}`}
      >
        {icon}
      </span>
    </>
  );

  if (href) {
    return (
      <a ref={ref as React.Ref<HTMLAnchorElement>} href={href} onClick={onClick} className={classes}>
        {inner}
      </a>
    );
  }
  return (
    <button ref={ref as React.Ref<HTMLButtonElement>} type="button" onClick={onClick} className={classes}>
      {inner}
    </button>
  );
}

/* Text link with an underline that sweeps in and an arrow that nudges forward. */
export function TextLink({
  children,
  onClick,
  href,
  className = "",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  className?: string;
}) {
  const classes = `group inline-flex cursor-pointer items-center gap-1.5 text-sm font-medium text-ink/80 transition-colors hover:text-emerald ${className}`;
  const inner = (
    <>
      <span className="relative">
        {children}
        <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-current transition-transform duration-500 ease-out group-hover:scale-x-100" />
      </span>
      <span aria-hidden className="transition-transform duration-500 ease-out group-hover:translate-x-1">
        ›
      </span>
    </>
  );
  return href ? (
    <a href={href} onClick={onClick} className={classes}>
      {inner}
    </a>
  ) : (
    <button type="button" onClick={onClick} className={classes}>
      {inner}
    </button>
  );
}

/* Splits a sentence into word spans so it can be revealed word by word. */
export function Words({ text, className = "" }: { text: string; className?: string }) {
  return (
    <>
      {text.split(" ").map((word, index) => (
        <span key={index} className={`word inline-block ${className}`}>
          {word}
          {" "}
        </span>
      ))}
    </>
  );
}
