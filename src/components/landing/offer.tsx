"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { activities, activityCount, offers } from "@/data/content";
import { Reveal } from "./reveal";

export function Offer() {
  const [open, setOpen] = useState(false);

  return (
    <section id="offer" className="relative mx-auto w-full max-w-[1240px] px-5 py-8 md:px-8 md:py-16">
      <Reveal>
        <h2 className="font-display text-center text-4xl text-[#122018] md:text-5xl">What We Offer</h2>
      </Reveal>

      <div className="relative mt-12">
        <span
          aria-hidden
          className="font-display pointer-events-none absolute -top-8 -left-2 text-7xl leading-none text-[#3ddc84] md:-left-6 md:text-8xl"
        >
          “
        </span>
        <span
          aria-hidden
          className="font-display pointer-events-none absolute -right-1 -bottom-10 text-7xl leading-none text-[#3ddc84] md:-right-4 md:text-8xl"
        >
          ”
        </span>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {offers.map((offer, index) => (
            <motion.article
              key={offer.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: index * 0.06, duration: 0.55 }}
              whileHover={{ y: -6 }}
              className="group relative h-52 overflow-hidden rounded-[22px] bg-[#102018] sm:h-56"
            >
              <Image
                src={offer.image}
                alt=""
                fill
                className="object-cover transition duration-700 group-hover:scale-105"
                sizes="(min-width: 1024px) 360px, 100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/10" />
              <div className="absolute inset-x-0 bottom-0 p-4">
                <h3 className="font-display text-xl text-white drop-shadow-sm">{offer.title}</h3>
                <p className="mt-1 max-h-0 overflow-hidden text-sm text-white/80 transition-all duration-300 group-hover:max-h-16">
                  {offer.blurb}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      <div className="mt-8 text-center">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="text-sm font-semibold text-[#122018]/80 underline decoration-[#3ddc84] decoration-2 underline-offset-4"
        >
          {activityCount}+ activities available
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <>
            <motion.button
              type="button"
              aria-label="Close activities"
              className="fixed inset-0 z-[70] bg-[#062214]/45"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.div
              role="dialog"
              aria-labelledby="activities-title"
              className="fixed inset-x-0 bottom-0 z-[80] max-h-[86vh] overflow-y-auto rounded-t-[28px] bg-[#f7fbf8] px-5 pt-6 pb-10 md:inset-x-auto md:top-8 md:right-8 md:bottom-8 md:w-[min(640px,calc(100%-4rem))] md:rounded-[28px] md:px-8"
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold tracking-[0.18em] text-[#14914a] uppercase">The shelf</p>
                  <h2 id="activities-title" className="font-display mt-2 text-3xl">
                    {activityCount} activities
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="grid size-10 place-items-center rounded-full border border-black/10"
                  aria-label="Close"
                >
                  ×
                </button>
              </div>
              <div className="mt-8 flex flex-col gap-8">
                {activities.map((group) => (
                  <section key={group.category}>
                    <h3 className="font-display text-xl">{group.category}</h3>
                    <ul className="mt-3 flex flex-wrap gap-2">
                      {group.items.map((item) => (
                        <li key={item} className="rounded-full bg-white px-3 py-1.5 text-sm text-[#122018]/80">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </section>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
