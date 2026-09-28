"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, LayoutGroup, MotionConfig, motion } from "framer-motion";
import { momentCategories, moments, type MomentCategory, type MomentShape } from "@/data/content";
import { EASE_OUT } from "@/lib/gsap";
import { Glow, PixelCluster } from "./decor";
import { ArrowLeft, ArrowRight, Close } from "./icons";
import { Reveal } from "./reveal";
import { TextLink } from "./ui";

type Filter = "All" | MomentCategory;
type Moment = (typeof moments)[number];

const filters: Filter[] = ["All", ...momentCategories];
const INITIAL_COUNT = 8;

/* "All" is a curated mix: featured shots, interleaved so no category clumps together. */
const featuredMix: Moment[] = (() => {
  const buckets = momentCategories.map((category) => moments.filter((m) => m.featured && m.category === category));
  const rounds = Math.max(...buckets.map((bucket) => bucket.length));
  const mix: Moment[] = [];
  for (let round = 0; round < rounds; round++) {
    for (const bucket of buckets) {
      if (bucket[round]) mix.push(bucket[round]);
    }
  }
  return mix;
})();

const photosFor = (filter: Filter) => (filter === "All" ? featuredMix : moments.filter((m) => m.category === filter));
const countFor = (filter: Filter) => photosFor(filter).length;

const shapeClass: Record<MomentShape, string> = {
  tall: "row-span-2",
  wide: "col-span-2",
  square: "",
};

const sizesFor: Record<MomentShape, string> = {
  tall: "(min-width: 768px) 25vw, 50vw",
  wide: "(min-width: 768px) 50vw, 100vw",
  square: "(min-width: 768px) 25vw, 50vw",
};

export function Moments() {
  const [filter, setFilter] = useState<Filter>("All");
  const [expanded, setExpanded] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  const photos = photosFor(filter);
  const visible = expanded ? photos : photos.slice(0, INITIAL_COUNT);
  const hiddenCount = photos.length - visible.length;

  const selectFilter = (next: Filter) => {
    setFilter(next);
    setExpanded(false);
  };

  const openAt = (index: number, trigger: HTMLElement) => {
    triggerRef.current = trigger;
    setOpenIndex(index);
  };

  const close = useCallback(() => {
    setOpenIndex(null);
    triggerRef.current?.focus();
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <section id="moments" className="relative isolate overflow-hidden py-24 md:py-36">
        <Glow className="-z-10 top-1/4 -right-24 size-[30rem]" />
        <Glow tone="soft" className="-z-10 bottom-10 -left-24 size-[26rem]" />
        <PixelCluster cols={10} rows={6} seed={61} className="absolute -z-10 top-16 left-4 hidden md:block" />

        <div className="mx-auto w-full max-w-[1240px] px-5 md:px-8">
          <Reveal as="header" className="relative mx-auto max-w-3xl text-center">
            <p className="text-xs font-medium tracking-[0.18em] text-emerald uppercase">From the archive</p>
            <h2 className="mt-4 font-display text-[clamp(2.5rem,5.5vw,4.75rem)] leading-[1.02] font-light tracking-tight text-balance text-ink">
              Moments we&rsquo;ve <span className="font-serif italic">made</span>
            </h2>
            <p className="mx-auto mt-5 max-w-md text-base text-balance text-grey">
              Real photos from real events: carnivals, offsites, calm mornings and very loud evenings.
            </p>
          </Reveal>

          <Reveal className="mt-10 md:mt-12">
            <div
              role="group"
              aria-label="Filter photos by event type"
              className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-2 [scrollbar-width:none] md:mx-0 md:flex-wrap md:justify-center md:overflow-visible md:px-0 [&::-webkit-scrollbar]:hidden"
            >
              <LayoutGroup id="moments-filter">
                {filters.map((item) => {
                  const active = item === filter;
                  return (
                    <button
                      key={item}
                      type="button"
                      aria-pressed={active}
                      onClick={() => selectFilter(item)}
                      className={`relative inline-flex shrink-0 cursor-pointer items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium whitespace-nowrap transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-emerald/40 focus-visible:outline-none ${
                        active ? "text-cream" : "bg-white/70 text-ink ring-1 ring-ink/5 hover:bg-white hover:ring-ink/10"
                      }`}
                    >
                      {active && (
                        <motion.span
                          layoutId="moments-pill"
                          aria-hidden
                          transition={{ type: "spring", stiffness: 380, damping: 34 }}
                          className="absolute inset-0 rounded-full bg-ink"
                        />
                      )}
                      <span className="relative">{item}</span>
                      <span className={`relative text-xs tabular-nums ${active ? "text-mint" : "text-grey"}`}>
                        {countFor(item)}
                      </span>
                    </button>
                  );
                })}
              </LayoutGroup>
            </div>
          </Reveal>

          <p className="sr-only" aria-live="polite">
            {`Showing ${visible.length} of ${photos.length} ${filter === "All" ? "highlight" : filter} photos`}
          </p>

          <Reveal className="mt-8 md:mt-10">
            <motion.ul
              layout
              className="grid grid-flow-dense auto-rows-[150px] grid-cols-2 gap-3 sm:auto-rows-[190px] md:auto-rows-[210px] md:grid-cols-4 md:gap-4"
            >
              <AnimatePresence mode="popLayout" initial={false}>
                {visible.map((photo, index) => (
                  <motion.li
                    key={photo.src}
                    layout
                    initial={{ opacity: 0, scale: 0.94 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.94 }}
                    transition={{ duration: 0.55, ease: EASE_OUT }}
                    className={shapeClass[photo.shape]}
                  >
                    <button
                      type="button"
                      onClick={(event) => openAt(index, event.currentTarget)}
                      aria-label={`Enlarge photo: ${photo.alt}`}
                      className="group relative block size-full cursor-zoom-in overflow-hidden rounded-2xl bg-ink/5 ring-1 ring-ink/5 focus-visible:ring-2 focus-visible:ring-emerald focus-visible:outline-none md:rounded-[1.6rem]"
                    >
                      <Image
                        src={photo.src}
                        alt={photo.alt}
                        fill
                        sizes={sizesFor[photo.shape]}
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                      />
                      <span className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink/55 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100" />
                      <span className="absolute bottom-3 left-3 translate-y-1 rounded-full bg-cream/90 px-3 py-1 text-[11px] font-semibold tracking-[0.14em] text-ink uppercase opacity-0 backdrop-blur transition-[opacity,transform] duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
                        {photo.category}
                      </span>
                    </button>
                  </motion.li>
                ))}
              </AnimatePresence>
            </motion.ul>
          </Reveal>

          {(hiddenCount > 0 || expanded) && (
            <div className="mt-10 flex justify-center">
              <TextLink onClick={() => setExpanded((value) => !value)}>
                {expanded ? "Show fewer" : `Show ${hiddenCount} more`}
              </TextLink>
            </div>
          )}
        </div>

      </section>

      {/* Portalled so the section's stacking context (isolate) can't trap it under the nav. */}
      {openIndex !== null &&
        createPortal(
          <MotionConfig reducedMotion="user">
            <Lightbox photos={visible} index={openIndex} onIndexChange={setOpenIndex} onClose={close} />
          </MotionConfig>,
          document.body,
        )}
    </MotionConfig>
  );
}

function Lightbox({
  photos,
  index,
  onIndexChange,
  onClose,
}: {
  photos: Moment[];
  index: number;
  onIndexChange: (index: number) => void;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const total = photos.length;
  const photo = photos[index];

  const go = useCallback((step: number) => onIndexChange((index + step + total) % total), [index, total, onIndexChange]);

  useEffect(() => {
    closeRef.current?.focus();
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = overflow;
    };
  }, []);

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Escape") {
      event.preventDefault();
      onClose();
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      go(1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      go(-1);
    } else if (event.key === "Tab") {
      /* Keep focus cycling inside the dialog. */
      const focusable = dialogRef.current?.querySelectorAll<HTMLElement>("button");
      if (!focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  };

  if (!photo) return null;

  return (
    <motion.div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={`Photo ${index + 1} of ${total}: ${photo.category}`}
      onKeyDown={onKeyDown}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: EASE_OUT }}
      className="fixed inset-0 z-[100] flex flex-col bg-ink/92 backdrop-blur-md"
    >
      <div className="flex items-center justify-between gap-4 px-5 pt-5 md:px-8 md:pt-6">
        <p className="text-xs font-medium tracking-[0.18em] text-mint uppercase">
          {photo.category}
          <span className="ml-3 text-cream/60 tabular-nums">
            {index + 1} / {total}
          </span>
        </p>
        <button
          ref={closeRef}
          type="button"
          aria-label="Close photo"
          onClick={onClose}
          className="grid size-11 cursor-pointer place-items-center rounded-full bg-white/10 text-cream ring-1 ring-white/15 transition-colors hover:bg-white/20 focus-visible:ring-2 focus-visible:ring-mint focus-visible:outline-none"
        >
          <Close className="size-5" />
        </button>
      </div>

      {/* Clicking the backdrop around the photo closes the dialog. */}
      <div className="relative min-h-0 flex-1 px-5 pt-5 pb-24 md:px-24 md:py-8" onClick={onClose}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.figure
            key={photo.src}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.35, ease: EASE_OUT }}
            className="relative flex size-full flex-col"
          >
            <div className="relative min-h-0 flex-1">
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(min-width: 768px) 85vw, 100vw"
                className="object-contain"
                onClick={(event) => event.stopPropagation()}
              />
            </div>
            <figcaption className="mx-auto mt-4 max-w-xl text-center text-sm text-balance text-cream/80">
              {photo.alt}
            </figcaption>
          </motion.figure>
        </AnimatePresence>
      </div>

      {total > 1 && (
        <>
          <button
            type="button"
            aria-label="Previous photo"
            onClick={() => go(-1)}
            className="absolute bottom-6 left-5 grid size-12 cursor-pointer place-items-center rounded-full bg-white/90 text-ink shadow-float ring-1 ring-ink/10 transition-transform duration-500 ease-spring hover:scale-105 focus-visible:ring-2 focus-visible:ring-mint focus-visible:outline-none active:scale-95 md:top-1/2 md:bottom-auto md:left-6 md:-translate-y-1/2"
          >
            <ArrowLeft className="size-5" />
          </button>
          <button
            type="button"
            aria-label="Next photo"
            onClick={() => go(1)}
            className="absolute right-5 bottom-6 grid size-12 cursor-pointer place-items-center rounded-full bg-white/90 text-ink shadow-float ring-1 ring-ink/10 transition-transform duration-500 ease-spring hover:scale-105 focus-visible:ring-2 focus-visible:ring-mint focus-visible:outline-none active:scale-95 md:top-1/2 md:right-6 md:bottom-auto md:-translate-y-1/2"
          >
            <ArrowRight className="size-5" />
          </button>
        </>
      )}
    </motion.div>
  );
}
