"use client";

import Image from "next/image";
import { useRef } from "react";
import { contact } from "@/data/content";
import { gsap, prefersReducedMotion, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { Instagram, LinkedIn, Mail, Phone, YouTube } from "./icons";
import { scrollToHash } from "./smooth-scroll";
import { useTalk } from "./talk";

const QUICK_LINKS = [
  { label: "Home", href: "#top" },
  { label: "About Us", href: "#promise" },
  { label: "Services", href: "#offer" },
  { label: "Destinations", href: "#destinations" },
] as const;

const POLICIES = ["Privacy Policy", "Cancellation & Refund", "Terms & Conditions"] as const;

export function Footer() {
  const { setOpen } = useTalk();

  return (
    <footer id="contact" className="relative overflow-hidden pt-20 md:pt-28">
      <div className="mx-auto w-full max-w-[1240px] px-5 md:px-8">
        <div className="grid gap-12 md:grid-cols-[1.4fr_0.8fr_0.8fr]">
          <div>
            <a href="#top" onClick={(event) => { event.preventDefault(); scrollToHash("#top"); }} aria-label="OneThrive home">
              <Image src="/brand/logo-green.png" alt="OneThrive" width={629} height={396} className="h-16 w-auto" />
            </a>
            <p className="mt-5 max-w-sm text-sm leading-7 text-grey">
              Empowering workplaces through engaging experiences, wellness initiatives, and curated employee
              programs.
            </p>

            <div className="mt-6 flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <span className="grid size-9 shrink-0 place-items-center rounded-full bg-mint-soft text-emerald">
                  <Phone className="size-4" />
                </span>
                <a href={contact.phoneHref} className="text-sm text-ink transition-colors hover:text-emerald">
                  {contact.phone}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <span className="grid size-9 shrink-0 place-items-center rounded-full bg-mint-soft text-emerald">
                  <Mail className="size-4" />
                </span>
                <a href={`mailto:${contact.email}`} className="text-sm text-ink transition-colors hover:text-emerald">
                  {contact.email}
                </a>
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              {/* TODO: real Instagram profile URL */}
              <a
                href="#"
                aria-label="OneThrive on Instagram"
                className="grid size-11 place-items-center rounded-xl bg-mint-soft text-emerald transition-colors duration-500 ease-spring hover:bg-mint"
              >
                <Instagram className="size-5" />
              </a>
              {/* TODO: real LinkedIn profile URL */}
              <a
                href="#"
                aria-label="OneThrive on LinkedIn"
                className="grid size-11 place-items-center rounded-xl bg-mint-soft text-emerald transition-colors duration-500 ease-spring hover:bg-mint"
              >
                <LinkedIn className="size-5" />
              </a>
              {/* TODO: real YouTube channel URL */}
              <a
                href="#"
                aria-label="OneThrive on YouTube"
                className="grid size-11 place-items-center rounded-xl bg-mint-soft text-emerald transition-colors duration-500 ease-spring hover:bg-mint"
              >
                <YouTube className="size-5" />
              </a>
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold text-emerald">Quick Links</p>
            <ul className="mt-5 flex flex-col gap-3">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(event) => {
                      event.preventDefault();
                      scrollToHash(link.href);
                    }}
                    className="group inline-flex text-sm text-grey transition-colors hover:text-ink"
                  >
                    <span className="inline-block transition-transform duration-500 ease-spring group-hover:translate-x-1">
                      {link.label}
                    </span>
                  </a>
                </li>
              ))}
              <li>
                <button
                  type="button"
                  onClick={() => setOpen(true)}
                  className="group inline-flex cursor-pointer text-sm text-grey transition-colors hover:text-ink"
                >
                  <span className="inline-block transition-transform duration-500 ease-spring group-hover:translate-x-1">
                    Contact Us
                  </span>
                </button>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold text-emerald">Our Policies</p>
            <ul className="mt-5 flex flex-col gap-3">
              {POLICIES.map((label) => (
                <li key={label}>
                  {/* TODO: link to real policy page */}
                  <a href="#" className="group inline-flex text-sm text-grey transition-colors hover:text-ink">
                    <span className="inline-block transition-transform duration-500 ease-spring group-hover:translate-x-1">
                      {label}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-wrap justify-between gap-3 border-t border-ink/10 py-6 pb-24 text-xs text-grey md:pb-6">
          <p>
            © {new Date().getFullYear()} <span className="font-semibold text-emerald">OneThrive</span>. All rights
            reserved.
          </p>
          <p>
            Designed &amp; Developed by <span className="font-semibold text-emerald">OneThrive Team</span>
          </p>
        </div>
      </div>

      <Wordmark />
    </footer>
  );
}

/* Giant clipped wordmark: each letter rises into place once the footer enters view. */
function Wordmark() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      const letters = el?.querySelectorAll<HTMLElement>("[data-letter]");
      if (!el || !letters?.length) return;

      if (prefersReducedMotion()) {
        gsap.set(letters, { yPercent: 0 });
        return;
      }

      gsap.set(letters, { yPercent: 100 });
      ScrollTrigger.create({
        trigger: el,
        start: "top 90%",
        once: true,
        onEnter: () => {
          gsap.to(letters, { yPercent: 0, duration: 1, ease: "expo.out", stagger: 0.04 });
        },
      });
    },
    { scope: ref },
  );

  return (
    <div ref={ref} aria-hidden className="-mb-[4vw] flex justify-center select-none">
      <div className="font-display flex text-[21vw] leading-[0.8] font-semibold tracking-[-0.04em] text-mint-soft">
        {"OneThrive".split("").map((char, index) => (
          <span key={index} className="inline-block overflow-hidden">
            <span data-letter className="inline-block">
              {char}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
