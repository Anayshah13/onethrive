"use client";

import Image from "next/image";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { activities, activityCount, offers } from "@/data/content";
import { EASE_OUT, EASE_SPRING } from "@/lib/gsap";
import { Glow } from "./decor";
import { Close } from "./icons";
import { Reveal } from "./reveal";
import { lockScroll } from "./smooth-scroll";
import { TextLink } from "./ui";

type Service = (typeof offers)[number];

const total = String(offers.length).padStart(2, "0");
const num = (i: number) => String(i + 1).padStart(2, "0");

const KICKER = "text-[0.7rem] font-medium tracking-[0.18em] uppercase tabular-nums";

function Tags({ tags, tone }: { tags: Service["tags"]; tone: "light" | "dark" }) {
  const chip =
    tone === "dark" ? "border-cream/25 text-cream/85" : "border-emerald/15 bg-mint-wash text-emerald-deep";
  return (
    <ul className="flex flex-wrap gap-2" aria-label="Includes">
      {tags.map((tag) => (
        <li key={tag} className={`rounded-full border px-3 py-1 text-xs font-medium ${chip}`}>
          {tag}
        </li>
      ))}
    </ul>
  );
}

/*
 * Desktop: five full-height photo panels in a row. The active one widens to
 * reveal its copy; hover, focus or click selects it, arrow keys move between panels.
 */
function ServicePanels() {
  const [active, setActive] = useState(0);
  const baseId = useId();
  const buttons = useRef<Array<HTMLButtonElement | null>>([]);

  const onKeyDown = (event: React.KeyboardEvent<HTMLUListElement>) => {
    const steps: Record<string, number> = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 };
    let next: number | undefined;
    if (event.key in steps) next = (active + steps[event.key] + offers.length) % offers.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = offers.length - 1;
    if (next === undefined) return;
    event.preventDefault();
    setActive(next);
    buttons.current[next]?.focus();
  };

  return (
    <ul onKeyDown={onKeyDown} className="hidden h-[clamp(30rem,64vh,36rem)] gap-3 lg:flex">
      {offers.map((offer, i) => {
        const on = i === active;
        const detailsId = `${baseId}-${i}`;
        return (
          <li
            key={offer.title}
            onMouseEnter={() => setActive(i)}
            style={{ flexGrow: on ? 4.2 : 1 }}
            className="relative min-w-0 basis-0 overflow-hidden rounded-[1.5rem] bg-ink shadow-float transition-[flex-grow] duration-700 ease-spring motion-reduce:transition-none"
          >
            <Image
              src={offer.image}
              alt=""
              fill
              sizes="(min-width: 1280px) 600px, 50vw"
              className={`object-cover transition-transform duration-1000 ease-spring motion-reduce:transition-none ${on ? "scale-100" : "scale-110"}`}
            />
            <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/35 to-ink/10" />
            <div
              aria-hidden
              className={`absolute inset-0 bg-ink/45 transition-opacity duration-700 ${on ? "opacity-0" : "opacity-100"}`}
            />

            <h3>
              <button
                ref={(el) => {
                  buttons.current[i] = el;
                }}
                type="button"
                aria-expanded={on}
                aria-controls={detailsId}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
                className="absolute inset-0 z-20 cursor-pointer rounded-[1.5rem] focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-mint"
              >
                <span className="sr-only">{offer.title}</span>
              </button>
            </h3>

            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 z-10 flex items-center p-6 text-cream/80"
            >
              <span className={`${KICKER} shrink-0`}>
                {num(i)}
                <span className={`transition-opacity duration-500 ${on ? "opacity-60" : "opacity-0"}`}> / {total}</span>
              </span>
              <span
                className={`ml-4 h-px flex-1 bg-cream/25 transition-opacity duration-500 ${on ? "opacity-100" : "opacity-0"}`}
              />
            </div>

            <span
              aria-hidden
              className={`pointer-events-none absolute bottom-6 left-1/2 z-10 -translate-x-1/2 rotate-180 font-display text-lg font-medium whitespace-nowrap text-cream [writing-mode:vertical-rl] transition-opacity duration-300 ${on ? "opacity-0" : "opacity-100 delay-200"}`}
            >
              {offer.title}
            </span>

            <div
              id={detailsId}
              aria-hidden={!on}
              className={`pointer-events-none absolute bottom-0 left-0 z-10 w-[24rem] p-7 transition-[opacity,transform] duration-500 ease-out motion-reduce:transition-none xl:w-[30rem] xl:p-8 ${on ? "translate-y-0 opacity-100 delay-200" : "translate-y-3 opacity-0"}`}
            >
              <p
                aria-hidden
                className="font-display text-[2.25rem] leading-[1.05] font-semibold tracking-tight text-cream xl:text-[2.6rem]"
              >
                {offer.title}
              </p>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-cream/75">{offer.blurb}</p>
              <div className="mt-5">
                <Tags tags={offer.tags} tone="dark" />
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

/* Below lg: a clean stack of photo cards. */
function ServiceCards() {
  return (
    <Reveal as="ul" stagger={0.08} className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:hidden">
      {offers.map((offer, i) => {
        const wide = i === offers.length - 1;
        return (
          <li
            key={offer.title}
            className={`flex min-w-0 flex-col overflow-hidden rounded-[1.5rem] bg-white shadow-float ring-1 ring-ink/5 ${wide ? "sm:col-span-2" : ""}`}
          >
            <div className={`relative aspect-[16/10] bg-mint-wash ${wide ? "sm:aspect-[21/9]" : ""}`}>
              <Image
                src={offer.image}
                alt=""
                fill
                sizes={wide ? "(min-width: 640px) 90vw, 100vw" : "(min-width: 640px) 45vw, 100vw"}
                className="object-cover"
              />
              <span
                className={`absolute top-4 left-4 rounded-full bg-cream/90 px-2.5 py-1 text-ink backdrop-blur-sm ${KICKER}`}
              >
                {num(i)} / {total}
              </span>
            </div>
            <div className="flex flex-1 flex-col p-6">
              <h3 className="font-display text-2xl leading-tight font-semibold tracking-tight text-ink">
                {offer.title}
              </h3>
              <p className="mt-2 text-[0.95rem] leading-relaxed text-grey">{offer.blurb}</p>
              <div className="mt-auto pt-5">
                <Tags tags={offer.tags} tone="light" />
              </div>
            </div>
          </li>
        );
      })}
    </Reveal>
  );
}

function ActivitiesSheet({ open, onClose }: { open: boolean; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    lockScroll(true);
    const previous = document.activeElement as HTMLElement | null;
    const t = window.setTimeout(() => closeRef.current?.focus(), 30);
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener("keydown", onKey);
      lockScroll(false);
      previous?.focus?.();
    };
  }, [open, onClose]);

  let chipIndex = 0;

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="backdrop"
            aria-hidden
            onClick={onClose}
            className="fixed inset-0 z-[70] bg-ink/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE_OUT }}
          />
          <motion.div
            key="panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="activities-title"
            data-lenis-prevent
            className="fixed inset-x-0 bottom-0 z-[80] max-h-[88dvh] overflow-y-auto overscroll-contain rounded-t-[28px] bg-cream shadow-lift md:inset-x-auto md:top-2 md:right-2 md:bottom-2 md:max-h-none md:w-[min(640px,calc(100%-1rem))] md:rounded-[28px]"
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 60, opacity: 0 }}
            transition={{ duration: 0.6, ease: EASE_SPRING }}
          >
            <div className="sticky top-0 z-10 flex items-start justify-between gap-4 bg-cream/90 px-5 pt-6 pb-4 backdrop-blur-md md:px-8 md:pt-8">
              <div>
                <p className="eyebrow">The shelf</p>
                <h2 id="activities-title" className="mt-3 font-display text-3xl font-light tracking-tight md:text-4xl">
                  <span className="font-semibold">{activityCount}</span> activities
                </h2>
              </div>
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="grid size-11 shrink-0 cursor-pointer place-items-center rounded-full bg-white ring-1 ring-ink/10 transition-transform duration-500 ease-spring hover:rotate-90 active:scale-95"
              >
                <Close className="size-4" />
              </button>
            </div>
            <div className="flex flex-col gap-8 px-5 pt-4 pb-10 md:px-8 md:pb-12">
              {activities.map((group) => (
                <section key={group.category}>
                  <h3 className="font-display text-lg font-semibold text-emerald">{group.category}</h3>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {group.items.map((item) => {
                      const i = chipIndex++;
                      return (
                        <motion.li
                          key={item}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, ease: EASE_OUT, delay: 0.15 + Math.min(i * 0.012, 0.7) }}
                          className="rounded-full bg-white px-3 py-1.5 text-sm text-ink/80 ring-1 ring-ink/5"
                        >
                          {item}
                        </motion.li>
                      );
                    })}
                  </ul>
                </section>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export function Offer() {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);

  return (
    <section id="offer" className="relative isolate overflow-x-clip py-16 md:py-20">
      <Glow tone="soft" className="-z-10 top-10 -right-24 size-[30rem]" />
      <div className="relative z-10 mx-auto w-full max-w-[1240px] px-4 sm:px-5 md:px-8">
        <Reveal
          as="header"
          className="grid gap-6 border-b border-ink/10 pb-8 md:pb-10 lg:grid-cols-[1.2fr_1fr] lg:items-end lg:gap-12"
        >
          <div>
            <p className="eyebrow">Services</p>
            <h2 className="mt-5 font-display text-[clamp(2.5rem,5vw,4.25rem)] leading-[0.95] font-semibold tracking-tight text-ink">
              What we <span className="font-serif font-normal text-emerald italic">do</span>
            </h2>
          </div>
          <div className="lg:justify-self-end">
            <p className="max-w-md text-[1.05rem] leading-relaxed text-balance text-grey">
              Five disciplines, one partner. Every programme is designed around your people, your goals and your
              calendar, then delivered end to end by our team.
            </p>
            <TextLink onClick={() => setOpen(true)} className="mt-4">
              Browse all {activityCount}+ activities
            </TextLink>
          </div>
        </Reveal>

        <Reveal className="mt-10 md:mt-12">
          <ServicePanels />
        </Reveal>
        <ServiceCards />
      </div>

      <ActivitiesSheet open={open} onClose={close} />
    </section>
  );
}
