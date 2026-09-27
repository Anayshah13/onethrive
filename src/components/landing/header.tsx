"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { contact, nav } from "@/data/content";
import { EASE_OUT, gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { lockScroll, scrollToHash } from "./smooth-scroll";
import { TalkButton, useTalk } from "./talk";

export function Header() {
  const bar = useRef<HTMLDivElement>(null);
  const [menu, setMenu] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const { setOpen } = useTalk();

  useGSAP(() => {
    const el = bar.current;
    if (!el) return;

    // Slide away while reading down, return the moment the reader scrolls up.
    const hide = gsap.to(el, { yPercent: -160, duration: 0.5, ease: "power3.out", paused: true });
    ScrollTrigger.create({
      start: 120,
      end: "max",
      onUpdate: (self) => (self.direction === 1 ? hide.play() : hide.reverse()),
      onLeaveBack: () => hide.reverse(),
    });

    nav.forEach((item) => {
      const section = document.querySelector(item.href);
      if (!section) return;
      ScrollTrigger.create({
        trigger: section,
        start: "top 45%",
        end: "bottom 45%",
        onToggle: (self) => {
          if (self.isActive) setActive(item.href);
          else setActive((current) => (current === item.href ? null : current));
        },
      });
    });
  });

  const go = (href: string) => (event: React.MouseEvent) => {
    event.preventDefault();
    setMenu(false);
    lockScroll(false);
    scrollToHash(href);
  };

  const toggleMenu = () => {
    setMenu((value) => {
      lockScroll(!value);
      return !value;
    });
  };

  const highlight = hovered ?? active;

  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-6 md:pt-5">
        <div
          ref={bar}
          className="pointer-events-auto mx-auto flex h-16 w-full max-w-295 items-center justify-between rounded-full bg-white/75 py-2 pr-2 pl-5 shadow-float ring-1 ring-ink/6 backdrop-blur-xl md:h-17 md:pl-6"
        >
          <a href="#top" onClick={go("#top")} className="flex items-center gap-2" aria-label="OneThrive home">
            <Image
              src="/assets/OneThrive Logo_Black.png"
              alt="OneThrive"
              width={629}
              height={396}
              preload
              className="h-9 w-auto md:h-10"
            />
          </a>

          <nav className="hidden items-center lg:flex" onMouseLeave={() => setHovered(null)} aria-label="Primary">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={go(item.href)}
                onMouseEnter={() => setHovered(item.href)}
                aria-current={active === item.href ? "true" : undefined}
                className={`relative rounded-full px-4 py-2 text-[13.5px] font-medium transition-colors duration-300 ${
                  active === item.href ? "text-ink" : "text-ink/65 hover:text-ink"
                }`}
              >
                {highlight === item.href && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-mint-wash ring-1 ring-emerald/10"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative">{item.label}</span>
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <TalkButton size="sm" className="hidden sm:inline-flex" />
            <button
              type="button"
              className="relative grid size-12 cursor-pointer place-items-center rounded-full bg-ink text-cream lg:hidden"
              aria-expanded={menu}
              aria-controls="mobile-menu"
              aria-label={menu ? "Close menu" : "Open menu"}
              onClick={toggleMenu}
            >
              <span
                className={`absolute h-[1.5px] w-5 rounded-full bg-current transition-transform duration-500 ease-spring ${
                  menu ? "rotate-45" : "-translate-y-1"
                }`}
              />
              <span
                className={`absolute h-[1.5px] w-5 rounded-full bg-current transition-transform duration-500 ease-spring ${
                  menu ? "-rotate-45" : "translate-y-1"
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menu && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-40 flex flex-col bg-cream/90 px-6 pt-28 pb-10 backdrop-blur-2xl lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
          >
            <nav className="flex flex-col" aria-label="Mobile">
              {nav.map((item, index) => (
                <div key={item.href} className="overflow-hidden border-b border-ink/10">
                  <motion.a
                    href={item.href}
                    onClick={go(item.href)}
                    className="flex items-baseline justify-between py-4 font-display text-4xl font-light tracking-tight"
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "100%" }}
                    transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.08 + index * 0.06 }}
                  >
                    {item.label}
                    <span className="font-sans text-xs text-grey">0{index + 1}</span>
                  </motion.a>
                </div>
              ))}
            </nav>
            <motion.div
              className="mt-auto flex flex-col gap-4"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.45 }}
            >
              <button
                type="button"
                onClick={() => {
                  toggleMenu();
                  setOpen(true);
                }}
                className="h-14 cursor-pointer rounded-full bg-mint font-semibold text-ink"
              >
                Plan your offsite
              </button>
              <a href={`mailto:${contact.email}`} className="text-center text-sm text-grey">
                {contact.email}
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
