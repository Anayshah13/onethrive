"use client";

import { useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { faqs } from "@/data/content";
import { EASE_OUT, gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";
import { Chevron } from "./icons";
import { Reveal } from "./reveal";
import { TalkButton } from "./talk";
import { TextLink } from "./ui";

const VISIBLE_COUNT = 6;

type Faq = (typeof faqs)[number];

export function Faqs() {
  const [openIndex, setOpenIndex] = useState(0);
  const [showAll, setShowAll] = useState(false);
  const uid = useId();

  const firstSix = faqs.slice(0, VISIBLE_COUNT);
  const rest = faqs.slice(VISIBLE_COUNT);

  const toggle = (index: number) => setOpenIndex((current) => (current === index ? -1 : index));

  return (
    <section id="faqs" className="relative py-24 md:py-36">
      <div className="mx-auto grid w-full max-w-[1240px] items-start gap-12 px-5 md:px-8 lg:grid-cols-[1.35fr_0.65fr] lg:gap-20">
        <div>
          <Reveal as="div" stagger={0.06} className="flex flex-col gap-3">
            {firstSix.map((item, index) => (
              <FaqItem
                key={item.q}
                item={item}
                idPrefix={uid}
                index={index}
                isOpen={openIndex === index}
                onToggle={() => toggle(index)}
              />
            ))}
          </Reveal>

          <AnimatePresence initial={false}>
            {showAll && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.5, ease: EASE_OUT }}
                className="overflow-hidden"
              >
                <div className="mt-3 flex flex-col gap-3">
                  {rest.map((item, offset) => {
                    const index = VISIBLE_COUNT + offset;
                    return (
                      <motion.div
                        key={item.q}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: offset * 0.05, ease: EASE_OUT }}
                      >
                        <FaqItem
                          item={item}
                          idPrefix={uid}
                          index={index}
                          isOpen={openIndex === index}
                          onToggle={() => toggle(index)}
                        />
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {rest.length > 0 && (
            <div className="mt-6">
              <TextLink onClick={() => setShowAll((current) => !current)}>
                {showAll ? "Show fewer" : `Show all ${faqs.length} questions`}
              </TextLink>
            </div>
          )}
        </div>

        <div className="relative lg:sticky lg:top-32">
          <GlowBlob />
          <h2 className="font-display relative text-[clamp(5rem,12vw,10rem)] leading-none font-light tracking-tight">
            FAQs
          </h2>
          <p className="relative mt-6 text-grey">Still curious?</p>
          <TalkButton variant="ink" size="sm" className="relative mt-4">
            Ask us anything
          </TalkButton>
        </div>
      </div>
    </section>
  );
}

function FaqItem({
  item,
  idPrefix,
  index,
  isOpen,
  onToggle,
}: {
  item: Faq;
  idPrefix: string;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const headerId = `${idPrefix}-faq-header-${index}`;
  const panelId = `${idPrefix}-faq-panel-${index}`;

  return (
    <div className="rounded-2xl bg-ink text-cream ring-1 ring-white/5 shadow-[0_18px_40px_-24px_rgba(34,36,36,0.55)]">
      <button
        type="button"
        id={headerId}
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={onToggle}
        className="flex min-h-14 w-full cursor-pointer items-center justify-between gap-4 px-5 py-4 text-left text-[15px] font-semibold md:px-6"
      >
        <span>{item.q}</span>
        <Chevron
          className={`size-5 shrink-0 text-mint transition-transform duration-500 ease-spring ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        id={panelId}
        role="region"
        aria-labelledby={headerId}
        className={`grid transition-[grid-template-rows] duration-500 ease-out ${
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <p className="px-5 pb-5 text-sm leading-7 text-cream/70 md:px-6">{item.a}</p>
        </div>
      </div>
    </div>
  );
}

/* A soft mint glow that drifts slowly behind the "FAQs" wordmark. */
function GlowBlob() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || prefersReducedMotion()) return;
      gsap.to(el, {
        x: 26,
        y: -20,
        duration: 6,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
    },
    { scope: ref },
  );

  return <div ref={ref} aria-hidden className="absolute -top-10 -left-6 size-72 rounded-full bg-mint/35 blur-3xl" />;
}
