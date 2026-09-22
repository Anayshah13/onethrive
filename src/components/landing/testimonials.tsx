"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { journal, testimonials } from "@/data/content";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";
import { Reveal } from "./reveal";

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const active = testimonials[index];

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % testimonials.length);
    }, 5200);
    return () => window.clearInterval(id);
  }, []);

  return (
    <section className="mx-auto w-full max-w-[1240px] px-5 py-16 md:px-8 md:py-24" id="testimonials">
      <Reveal>
        <div className="flex items-end justify-between">
          <h2 className="font-display text-4xl md:text-5xl">Testimonials</h2>
          <Asterisks />
        </div>
      </Reveal>

      <div className="mt-10 grid items-center gap-8 lg:grid-cols-[0.85fr_1.15fr]">
        <article className="rounded-[28px] border border-black/5 bg-white p-6 shadow-[0_20px_50px_-32px_rgba(18,32,24,0.45)] md:p-8">
          <div className="flex items-center gap-3">
            <span className="relative size-14 overflow-hidden rounded-2xl">
              <Image src={active.image} alt="" fill className="object-cover" sizes="56px" />
            </span>
            <div>
              <p className="font-semibold">{active.name}</p>
              <p className="text-sm text-[#122018]/55">{active.role}</p>
            </div>
          </div>
          <div className="mt-4 flex gap-1 text-[#3ddc84]" aria-label="5 stars">
            {Array.from({ length: 5 }, (_, star) => (
              <span key={star}>★</span>
            ))}
          </div>
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={active.quote}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
              className="font-display mt-5 min-h-28 text-2xl leading-snug"
            >
              “{active.quote}”
            </motion.blockquote>
          </AnimatePresence>
          <div className="mt-6 flex gap-2">
            {testimonials.map((item, itemIndex) => (
              <button
                key={item.name}
                type="button"
                aria-label={`Show testimonial ${itemIndex + 1}`}
                onClick={() => setIndex(itemIndex)}
                className={`h-2 rounded-full transition-all ${
                  itemIndex === index ? "w-8 bg-[#122018]" : "w-2 bg-[#122018]/20"
                }`}
              />
            ))}
          </div>
        </article>

        <div className="relative h-[360px] md:h-[420px]">
          {active.frames.map((src, frameIndex) => (
            <motion.div
              key={`${active.name}-${src}`}
              className="absolute top-6 overflow-hidden rounded-[28px] shadow-xl"
              style={{ width: "58%", height: "82%" }}
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: 1,
                y: 0,
                x: `${frameIndex * 22}%`,
                rotate: frameIndex === 0 ? -8 : frameIndex === 1 ? 0 : 7,
                zIndex: frameIndex === 1 ? 3 : 1,
              }}
              transition={{ type: "spring", stiffness: 220, damping: 24 }}
            >
              <Image src={src} alt="" fill className="object-cover" sizes="280px" />
            </motion.div>
          ))}
        </div>
      </div>

      <div id="journal" className="mt-20 scroll-mt-24">
        <Reveal>
          <p className="text-xs font-semibold tracking-[0.18em] text-[#14914a] uppercase">From the field</p>
          <h2 className="font-display mt-2 text-3xl md:text-4xl">Notes we&apos;d put on the journal</h2>
        </Reveal>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {journal.map((post, index) => (
            <motion.article
              key={post.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              whileHover={{ y: -6 }}
              className="overflow-hidden rounded-[24px] bg-white"
            >
              <div className="relative h-48">
                <Image src={post.image} alt="" fill className="object-cover" sizes="360px" />
              </div>
              <div className="p-5">
                <h3 className="font-display text-xl">{post.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#122018]/65">{post.caption}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Asterisks() {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.to(".aster", {
        rotate: (index) => (index % 2 === 0 ? 18 : -14),
        duration: 1.6,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
        stagger: 0.15,
      });
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className="hidden gap-1 text-5xl leading-none font-black text-[#3ddc84] md:flex" aria-hidden>
      <span className="aster">*</span>
      <span className="aster">*</span>
      <span className="aster">*</span>
    </div>
  );
}
