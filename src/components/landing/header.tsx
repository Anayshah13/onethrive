"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { contact } from "@/data/content";
import { aboutRoot, aboutSections, headerNav, isHash } from "@/data/site";
import { EASE_OUT, gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { ArrowUpRight, Chevron } from "./icons";
import { lockScroll, scrollToHash } from "./smooth-scroll";
import { TalkButton, useTalk } from "./talk";

export function Header() {
  const bar = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const onHome = pathname === "/";
  const [menu, setMenu] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [mobileAbout, setMobileAbout] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const closeTimer = useRef<number | undefined>(undefined);
  const { setOpen } = useTalk();

  useGSAP(
    () => {
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

      headerNav.forEach((item) => {
        if (!isHash(item.href)) return;
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
    },
    { dependencies: [pathname], revertOnUpdate: true },
  );

  // Close everything when the route changes (covers back/forward, not just clicks).
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setMenu(false);
    setAboutOpen(false);
  }
  useEffect(() => lockScroll(false), [pathname]);

  const closeMenu = () => {
    setMenu(false);
    lockScroll(false);
  };

  const go = (href: string) => (event: React.MouseEvent) => {
    closeMenu();
    if (!onHome) return; // let the link take the reader to the home page section
    event.preventDefault();
    scrollToHash(href);
  };

  const toggleMenu = () => {
    setMenu((value) => {
      lockScroll(!value);
      return !value;
    });
  };

  const openAbout = () => {
    window.clearTimeout(closeTimer.current);
    setAboutOpen(true);
  };
  const closeAboutSoon = () => {
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setAboutOpen(false), 140);
  };

  /* Hash links become home-page links off the home page. */
  const hrefFor = (href: string) => (isHash(href) && !onHome ? `/${href}` : href);
  const isCurrent = (href: string) =>
    isHash(href) ? onHome && active === href : pathname === href || pathname.startsWith(`${href}/`);

  const current = headerNav.find((item) => isCurrent(item.href))?.href ?? null;
  const highlight = hovered ?? current;
  const linkClass = (href: string) =>
    `relative inline-flex items-center gap-1 rounded-full px-3.5 py-2 text-[13.5px] font-medium transition-colors duration-300 xl:px-4 ${
      isCurrent(href) ? "text-ink" : "text-ink/65 hover:text-ink"
    }`;
  const pill = (href: string) =>
    highlight === href && (
      <motion.span
        layoutId="nav-pill"
        className="absolute inset-0 rounded-full bg-mint-wash ring-1 ring-emerald/10"
        transition={{ type: "spring", stiffness: 380, damping: 32 }}
      />
    );

  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-6 md:pt-5">
        <div
          ref={bar}
          className="pointer-events-auto mx-auto flex h-16 w-full max-w-295 items-center justify-between rounded-full bg-white/75 py-2 pr-2 pl-5 shadow-float ring-1 ring-ink/6 backdrop-blur-xl md:h-17 md:pl-6"
        >
          <Link
            href={onHome ? "#top" : "/"}
            onClick={onHome ? go("#top") : closeMenu}
            className="flex items-center gap-2"
            aria-label="OneThrive home"
          >
            <Image
              src="/assets/OneThrive Logo_Black.png"
              alt="OneThrive"
              width={629}
              height={396}
              preload
              className="h-9 w-auto md:h-10"
            />
          </Link>

          <nav className="hidden items-center lg:flex" onMouseLeave={() => setHovered(null)} aria-label="Primary">
            {headerNav.map((item) =>
              item.children ? (
                <div
                  key={item.href}
                  className="relative"
                  onMouseEnter={() => {
                    setHovered(item.href);
                    openAbout();
                  }}
                  onMouseLeave={closeAboutSoon}
                  onFocus={openAbout}
                  onBlur={(event) => {
                    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setAboutOpen(false);
                  }}
                  onKeyDown={(event) => event.key === "Escape" && setAboutOpen(false)}
                >
                  <Link
                    href={item.href}
                    aria-haspopup="true"
                    aria-expanded={aboutOpen}
                    aria-current={isCurrent(item.href) ? "page" : undefined}
                    className={linkClass(item.href)}
                  >
                    {pill(item.href)}
                    <span className="relative">{item.label}</span>
                    <Chevron
                      className={`relative size-3.5 transition-transform duration-500 ease-spring ${aboutOpen ? "rotate-180" : ""}`}
                    />
                  </Link>
                  <AboutMenu open={aboutOpen} pathname={pathname} onNavigate={() => setAboutOpen(false)} />
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={hrefFor(item.href)}
                  onClick={isHash(item.href) ? go(item.href) : undefined}
                  onMouseEnter={() => setHovered(item.href)}
                  aria-current={isCurrent(item.href) ? (isHash(item.href) ? "true" : "page") : undefined}
                  className={linkClass(item.href)}
                >
                  {pill(item.href)}
                  <span className="relative">{item.label}</span>
                </Link>
              ),
            )}
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
            data-lenis-prevent
            className="fixed inset-0 z-40 flex flex-col overflow-y-auto bg-cream/90 px-6 pt-28 pb-10 backdrop-blur-2xl lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
          >
            <nav className="flex flex-col" aria-label="Mobile">
              {headerNav.map((item, index) => (
                <div key={item.href} className="overflow-hidden border-b border-ink/10">
                  <motion.div
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "100%" }}
                    transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.08 + index * 0.06 }}
                  >
                    {item.children ? (
                      <>
                        <button
                          type="button"
                          aria-expanded={mobileAbout}
                          aria-controls="mobile-about"
                          onClick={() => setMobileAbout((value) => !value)}
                          className="flex w-full cursor-pointer items-center justify-between py-4 text-left font-display text-4xl font-light tracking-tight"
                        >
                          <span className="flex items-center gap-3">
                            {item.label}
                            <Chevron
                              className={`size-6 text-emerald transition-transform duration-500 ease-spring ${
                                mobileAbout ? "rotate-180" : ""
                              }`}
                            />
                          </span>
                          <span className="font-sans text-xs text-grey">0{index + 1}</span>
                        </button>
                        <AnimatePresence initial={false}>
                          {mobileAbout && (
                            <motion.ul
                              id="mobile-about"
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.5, ease: EASE_OUT }}
                              className="overflow-hidden"
                            >
                              {[{ ...aboutRoot, index: "00" }, ...aboutSections].map((sub) => (
                                <li key={sub.href}>
                                  <Link
                                    href={sub.href}
                                    onClick={closeMenu}
                                    aria-current={pathname === sub.href ? "page" : undefined}
                                    className={`flex items-center justify-between py-2.5 pl-1 text-lg ${
                                      pathname === sub.href ? "text-emerald" : "text-ink/75"
                                    }`}
                                  >
                                    {sub.href === aboutRoot.href ? "Overview" : sub.label}
                                    <ArrowUpRight className="size-4 text-grey" />
                                  </Link>
                                </li>
                              ))}
                              <li className="h-3" aria-hidden />
                            </motion.ul>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <Link
                        href={hrefFor(item.href)}
                        onClick={isHash(item.href) ? go(item.href) : closeMenu}
                        className="flex items-baseline justify-between py-4 font-display text-4xl font-light tracking-tight"
                      >
                        {item.label}
                        <span className="font-sans text-xs text-grey">0{index + 1}</span>
                      </Link>
                    )}
                  </motion.div>
                </div>
              ))}
            </nav>
            <motion.div
              className="mt-auto flex flex-col gap-4 pt-10"
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

/* Desktop dropdown: the four About sections as cards, with the overview as a dark feature tile. */
function AboutMenu({ open, pathname, onNavigate }: { open: boolean; pathname: string; onNavigate: () => void }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="absolute top-full left-1/2 w-[560px] -translate-x-1/2 pt-4"
          initial={{ opacity: 0, y: 10, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: 6, filter: "blur(4px)", transition: { duration: 0.18 } }}
          transition={{ duration: 0.45, ease: EASE_OUT }}
        >
          <div className="rounded-[26px] bg-white/60 p-1.5 shadow-lift ring-1 ring-ink/6 backdrop-blur-xl">
            <div className="grid grid-cols-[0.9fr_1.1fr] gap-1.5">
              <Link
                href={aboutRoot.href}
                onClick={onNavigate}
                aria-current={pathname === aboutRoot.href ? "page" : undefined}
                className="group relative flex flex-col justify-between overflow-hidden rounded-[20px] bg-ink p-5 text-cream"
              >
                <span aria-hidden className="absolute -top-10 -right-10 size-36 rounded-full bg-mint/25 blur-2xl" />
                <span className="relative text-[10.5px] font-medium tracking-[0.2em] text-mint uppercase">About us</span>
                <span className="relative mt-10 font-display text-2xl leading-tight font-light tracking-tight">
                  The people behind{" "}
                  <span className="font-serif text-mint italic">the day.</span>
                </span>
                <span className="relative mt-4 inline-flex items-center gap-2 text-[13px] text-cream/70 transition-colors group-hover:text-mint">
                  Overview
                  <ArrowUpRight className="size-3.5 transition-transform duration-500 ease-spring group-hover:rotate-45" />
                </span>
              </Link>
              <ul className="flex flex-col gap-1">
                {aboutSections.map((section) => {
                  const here = pathname === section.href;
                  return (
                    <li key={section.href}>
                      <Link
                        href={section.href}
                        onClick={onNavigate}
                        aria-current={here ? "page" : undefined}
                        className={`group flex items-start gap-3 rounded-2xl px-3.5 py-3 transition-colors duration-300 ${
                          here ? "bg-mint-wash" : "hover:bg-mint-wash/70"
                        }`}
                      >
                        <span className="mt-0.5 font-display text-[11px] text-emerald/70 tabular-nums">{section.index}</span>
                        <span className="min-w-0 flex-1">
                          <span className="flex items-center justify-between gap-2 text-sm font-semibold text-ink">
                            {section.label}
                            <ArrowUpRight className="size-3.5 -translate-x-1 opacity-0 transition-[opacity,transform] duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
                          </span>
                          <span className="mt-0.5 block text-[12.5px] leading-5 text-grey">{section.blurb}</span>
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
