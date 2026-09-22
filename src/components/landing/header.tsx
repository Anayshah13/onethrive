"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { nav } from "@/data/content";
import { useGSAP } from "@/lib/gsap";
import { TalkButton } from "./talk";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);

  useGSAP(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  });

  return (
    <header
      className={`sticky top-0 z-50 transition ${
        scrolled ? "border-b border-black/5 bg-[#f4fbf7]/85 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-[76px] w-full max-w-[1240px] items-center justify-between px-5 md:px-8">
        <a href="#top" className="relative block h-10 w-[132px]" aria-label="OneThrive home">
          <Image
            src="/brand/logo-green.png"
            alt="OneThrive"
            fill
            priority
            className="object-contain object-left"
            sizes="132px"
          />
        </a>

        <nav className="hidden items-center gap-8 text-sm text-[#122018]/80 md:flex">
          {nav.map((item) => (
            <a key={item.href} href={item.href} className="transition hover:text-[#122018]">
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <TalkButton />
        </div>

        <button
          type="button"
          className="grid size-11 place-items-center rounded-full border border-black/10 md:hidden"
          aria-expanded={menu}
          aria-label={menu ? "Close menu" : "Open menu"}
          onClick={() => setMenu((value) => !value)}
        >
          <span className="flex w-4 flex-col gap-1.5">
            <span className={`h-px bg-[#122018] transition ${menu ? "translate-y-[3.5px] rotate-45" : ""}`} />
            <span className={`h-px bg-[#122018] transition ${menu ? "-translate-y-[3.5px] -rotate-45" : ""}`} />
          </span>
        </button>
      </div>

      <AnimatePresence>
        {menu && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-black/5 bg-[#f4fbf7] md:hidden"
          >
            <div className="flex flex-col gap-1 px-5 py-4">
              {nav.map((item, index) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenu(false)}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.04 }}
                  className="rounded-xl px-2 py-3 text-base"
                >
                  {item.label}
                </motion.a>
              ))}
              <TalkButton className="mt-2 w-fit" />
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
