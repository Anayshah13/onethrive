"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { destinations, regions, type Region } from "@/data/content";
import { prefersReducedMotion } from "@/lib/gsap";
import { PixelField } from "./decor";
import { Reveal } from "./reveal";

const washes: Record<Region, string> = {
  "East India": "#0f6b4c",
  "North India": "#1c4d3c",
  "West India": "#b8612d",
  "South India": "#0f7484",
  International: "#163e78",
};

export function Destinations() {
  const scroller = useRef<HTMLDivElement>(null);
  const [region, setRegion] = useState<(typeof regions)[number]>("All");

  const items = useMemo(
    () => (region === "All" ? destinations : destinations.filter((place) => place.region === region)),
    [region],
  );

  useEffect(() => {
    const el = scroller.current;
    if (!el || prefersReducedMotion() || items.length < 2) return;
    let paused = false;
    const pause = () => {
      paused = true;
    };
    const play = () => {
      paused = false;
    };
    el.addEventListener("pointerenter", pause);
    el.addEventListener("pointerleave", play);
    const id = window.setInterval(() => {
      if (paused) return;
      const step = 266;
      const max = el.scrollWidth - el.clientWidth;
      const next = el.scrollLeft + step;
      el.scrollTo({ left: next >= max - 4 ? 0 : next, behavior: "smooth" });
    }, 4200);
    return () => {
      window.clearInterval(id);
      el.removeEventListener("pointerenter", pause);
      el.removeEventListener("pointerleave", play);
    };
  }, [region, items.length]);

  const nudge = (direction: number) => {
    scroller.current?.scrollBy({ left: direction * 266, behavior: "smooth" });
  };

  return (
    <section id="destinations" className="relative overflow-hidden py-16 md:py-24">
      <PixelField className="opacity-80" />
      <div className="relative mx-auto w-full max-w-[1240px] px-5 md:px-8">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 className="font-display text-4xl md:text-5xl">Offsite Destinations</h2>
            <div className="flex gap-2">
              <CarouselButton label="Previous destinations" onClick={() => nudge(-1)}>
                ←
              </CarouselButton>
              <CarouselButton label="Next destinations" onClick={() => nudge(1)}>
                →
              </CarouselButton>
            </div>
          </div>
        </Reveal>

        <div className="mt-6 flex gap-2 overflow-x-auto pb-2 [scrollbar-width:none]">
          {regions.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => {
                setRegion(item);
                if (scroller.current) scroller.current.scrollLeft = 0;
              }}
              className={`shrink-0 rounded-full px-4 py-2 text-sm transition ${
                region === item ? "bg-[#122018] text-white" : "bg-white/80 text-[#122018]/70"
              }`}
            >
              {item === "All" ? "All" : item.replace(" India", "")}
            </button>
          ))}
        </div>

        <div
          ref={scroller}
          className="mt-6 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 [scrollbar-width:none]"
        >
          {items.map((place, index) => (
            <motion.article
              key={place.name}
              layout
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: Math.min(index, 8) * 0.04 }}
              whileHover={{ y: -8 }}
              className="relative h-[340px] w-[220px] shrink-0 snap-start overflow-hidden rounded-[26px] md:h-[390px] md:w-[250px]"
              style={{ background: washes[place.region] }}
            >
              {place.image ? (
                <Image src={place.image} alt="" fill className="object-cover" sizes="250px" />
              ) : (
                <div className="absolute inset-0 opacity-40">
                  <PixelField />
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/5 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-4 text-white">
                <p className="text-[11px] tracking-[0.14em] uppercase opacity-80">{place.region}</p>
                <h3 className="font-display mt-1 text-2xl">{place.name}</h3>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function CarouselButton({
  children,
  label,
  onClick,
}: {
  children: React.ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="grid size-11 place-items-center rounded-full border border-black/10 bg-white text-lg"
    >
      {children}
    </button>
  );
}
