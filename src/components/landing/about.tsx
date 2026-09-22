"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { aboutCopy, clients } from "@/data/content";
import { Reveal } from "./reveal";

const faces = [
  "/event-photos/Wellness/Laughter Yoga/Copy of IMG_7922.PNG",
  "/event-photos/Team Building/Copy of IMG_1939.PNG",
  "/event-photos/Group Photo/Copy of 221357c4-5df5-434e-b884-e7a59659d0df.jpg",
];

export function About() {
  const loop = [...clients, ...clients];

  return (
    <section id="about" className="relative mx-auto w-full max-w-[1240px] px-5 py-20 md:px-8 md:py-28">
      <div className="grid items-end gap-10 md:grid-cols-[1.3fr_0.7fr]">
        <Reveal>
          <p className="text-xs font-semibold tracking-[0.2em] text-[#14914a] uppercase">The OneThrive way</p>
          <p className="font-display mt-4 max-w-xl text-[clamp(1.7rem,3vw,2.5rem)] leading-[1.15] text-[#122018]">
            {aboutCopy}
          </p>
        </Reveal>
        <Reveal className="md:justify-self-end">
          <div className="flex items-center gap-4">
            <div className="flex -space-x-3">
              {faces.map((src) => (
                <span key={src} className="relative size-12 overflow-hidden rounded-full border-2 border-[#f4fbf7]">
                  <Image src={src} alt="" fill className="object-cover" sizes="48px" />
                </span>
              ))}
            </div>
            <div>
              <p className="text-sm font-semibold">Teams across India</p>
              <p className="text-xs text-[#122018]/60">In the office, offsite, and online</p>
            </div>
          </div>
        </Reveal>
      </div>

      <div id="team" className="mt-14 scroll-mt-24">
        <p className="text-xs font-semibold tracking-[0.16em] text-[#122018]/45 uppercase">Teams we&apos;ve hosted</p>
        <div className="marquee-mask mt-5 overflow-hidden">
          <motion.div
            className="flex w-max items-center gap-14 pr-14"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 36, ease: "linear", repeat: Infinity }}
          >
            {loop.map((client, index) => (
              <div key={`${client.alt}-${index}`} className="relative h-12 w-28 shrink-0">
                <Image
                  src={client.src}
                  alt={index < clients.length ? client.alt : ""}
                  fill
                  className="object-contain grayscale opacity-70"
                  sizes="112px"
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
