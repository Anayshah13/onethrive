"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { faqs } from "@/data/content";
import { Reveal } from "./reveal";

export function Faqs() {
  const [open, setOpen] = useState(0);

  return (
    <section id="faqs" className="mx-auto w-full max-w-[1240px] px-5 py-8 md:px-8 md:py-16">
      <div className="grid items-start gap-10 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="flex flex-col gap-3">
          {faqs.map((item, index) => {
            const isOpen = open === index;
            return (
              <div key={item.q} className="overflow-hidden rounded-2xl bg-[#141816] text-white">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? -1 : index)}
                  className="flex w-full items-start justify-between gap-6 px-5 py-4 text-left"
                >
                  <span className="text-sm leading-6 md:text-base">{item.q}</span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    className="mt-0.5 grid size-6 shrink-0 place-items-center text-xl leading-none text-[#3ddc84]"
                    aria-hidden
                  >
                    +
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-5 text-sm leading-6 text-white/70">{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        <Reveal className="relative lg:sticky lg:top-28">
          <div className="absolute top-6 -left-6 size-56 rounded-full bg-[#b6f5cf] blur-3xl" aria-hidden />
          <h2 className="font-display relative text-[22vw] leading-none font-semibold tracking-tight text-[#122018] lg:text-[9rem]">
            FAQs
          </h2>
        </Reveal>
      </div>
    </section>
  );
}
