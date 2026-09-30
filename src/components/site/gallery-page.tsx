"use client";

import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, LayoutGroup, MotionConfig, motion } from "framer-motion";
import { gallery, galleryCategories, type GalleryCategory } from "@/data/gallery";
import { EASE_OUT } from "@/lib/gsap";
import { Glow, PixelCluster } from "@/components/landing/decor";
import { Lightbox } from "@/components/landing/moments";
import { Reveal } from "@/components/landing/reveal";
import { TalkButton } from "@/components/landing/talk";
import { TextLink } from "@/components/landing/ui";
import { PageHero } from "@/components/site/page-kit";

type Filter = "All" | GalleryCategory;

const filters: Filter[] = ["All", ...galleryCategories];
const PAGE_SIZE = 24;

const photosFor = (filter: Filter) => (filter === "All" ? gallery : gallery.filter((p) => p.category === filter));

export function GalleryPage() {
  const [filter, setFilter] = useState<Filter>("All");
  const [count, setCount] = useState(PAGE_SIZE);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  const photos = photosFor(filter);
  const visible = photos.slice(0, count);
  const hiddenCount = photos.length - visible.length;

  const selectFilter = (next: Filter) => {
    setFilter(next);
    setCount(PAGE_SIZE);
  };

  const close = useCallback(() => {
    setOpenIndex(null);
    triggerRef.current?.focus();
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <PageHero
        eyebrow="Gallery"
        lead="Proof it"
        accent="happened."
        intro="Real photos from real events: foundation days, carnivals, cricket leagues, desk yoga, garba and a few very loud evenings."
        crumbs={[{ label: "Gallery" }]}
      />

      <section className="relative isolate overflow-x-clip pb-20 md:pb-28">
        <Glow className="-z-10 top-1/3 -right-24 size-[30rem]" />
        <Glow tone="soft" className="-z-10 bottom-40 -left-24 size-[26rem]" />
        <PixelCluster cols={10} rows={6} seed={37} className="absolute -z-10 top-[60%] left-4 hidden md:block" />

        <div className="mx-auto w-full max-w-[1400px] px-5 md:px-8">
          <div
            role="group"
            aria-label="Filter photos by event type"
            className="relative z-20 -mx-5 flex gap-2 overflow-x-auto px-5 py-3 [scrollbar-width:none] md:top-24 md:mx-0 md:flex-wrap md:justify-center md:overflow-visible md:px-0 [&::-webkit-scrollbar]:hidden"
          >
            <LayoutGroup id="gallery-filter">
              {filters.map((item) => {
                const active = item === filter;
                return (
                  <button
                    key={item}
                    type="button"
                    aria-pressed={active}
                    onClick={() => selectFilter(item)}
                    className={`relative inline-flex shrink-0 cursor-pointer items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium whitespace-nowrap shadow-float transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-emerald/40 focus-visible:outline-none ${
                      active ? "text-cream" : "bg-white text-ink ring-1 ring-ink/5 hover:ring-ink/15"
                    }`}
                  >
                    {active && (
                      <motion.span
                        layoutId="gallery-pill"
                        aria-hidden
                        transition={{ type: "spring", stiffness: 380, damping: 34 }}
                        className="absolute inset-0 rounded-full bg-ink"
                      />
                    )}
                    <span className="relative">{item}</span>
                    <span className={`relative text-xs tabular-nums ${active ? "text-mint" : "text-grey"}`}>
                      {photosFor(item).length}
                    </span>
                  </button>
                );
              })}
            </LayoutGroup>
          </div>

          <p className="sr-only" aria-live="polite">
            {`Showing ${visible.length} of ${photos.length} ${filter === "All" ? "" : filter} photos`}
          </p>

          {/* Masonry: CSS columns keep each photo at its natural aspect ratio. */}
          <ul key={filter} className="mt-8 columns-2 gap-3 sm:columns-3 md:mt-10 md:gap-4 xl:columns-4">
            <AnimatePresence initial={false}>
              {visible.map((photo, index) => (
                <motion.li
                  key={photo.src}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: EASE_OUT, delay: (index % PAGE_SIZE) * 0.025 }}
                  className="mb-3 break-inside-avoid md:mb-4"
                >
                  <button
                    type="button"
                    onClick={(event) => {
                      triggerRef.current = event.currentTarget;
                      setOpenIndex(index);
                    }}
                    aria-label={`Enlarge photo: ${photo.alt}`}
                    className="group relative block w-full cursor-zoom-in overflow-hidden rounded-2xl bg-ink/5 ring-1 ring-ink/5 focus-visible:ring-2 focus-visible:ring-emerald focus-visible:outline-none md:rounded-[1.4rem]"
                  >
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      width={photo.width}
                      height={photo.height}
                      sizes="(min-width: 1280px) 25vw, (min-width: 640px) 33vw, 50vw"
                      className="h-auto w-full transition-transform duration-700 ease-out group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                    />
                    <span className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-ink/60 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100" />
                    <span className="absolute bottom-3 left-3 translate-y-1 rounded-full bg-cream/90 px-3 py-1 text-[11px] font-semibold tracking-[0.14em] text-ink uppercase opacity-0 backdrop-blur transition-[opacity,transform] duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
                      {photo.category}
                    </span>
                  </button>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>

          {hiddenCount > 0 && (
            <div className="mt-12 flex justify-center">
              <TextLink onClick={() => setCount((value) => value + PAGE_SIZE)}>
                {`Show ${Math.min(hiddenCount, PAGE_SIZE)} more of ${hiddenCount}`}
              </TextLink>
            </div>
          )}
        </div>
      </section>

      <section className="relative isolate overflow-x-clip px-2 pb-16 md:px-3 md:pb-24">
        <Reveal className="mx-auto flex max-w-[1240px] flex-col items-center gap-6 rounded-[2.25rem] bg-ink px-6 py-14 text-center text-cream md:rounded-[2.75rem] md:px-12 md:py-20">
          <span className="text-xs font-medium tracking-[0.2em] text-mint uppercase">Your team, next</span>
          <h2 className="max-w-[18ch] font-display text-[clamp(2.2rem,5vw,4rem)] leading-[1.02] font-light tracking-tight">
            Let&apos;s put your team <span className="font-serif text-mint italic">in the next album.</span>
          </h2>
          <TalkButton className="mt-4" size="lg">
            Plan your event
          </TalkButton>
        </Reveal>
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
