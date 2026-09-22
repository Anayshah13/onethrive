"use client";

import Image from "next/image";
import { nav } from "@/data/content";
import { TalkButton } from "./talk";

export function Footer() {
  return (
    <footer id="contact" className="mt-10 border-t border-black/5">
      <div className="mx-auto grid w-full max-w-[1240px] gap-10 px-5 py-14 md:grid-cols-[1.3fr_0.7fr_0.8fr] md:px-8">
        <div>
          <a href="#top" className="relative block h-12 w-[160px]" aria-label="OneThrive home">
            <Image src="/brand/logo-green.png" alt="OneThrive" fill className="object-contain object-left" sizes="160px" />
          </a>
          <p className="mt-4 max-w-sm text-sm leading-6 text-[#122018]/70">
            India&apos;s first Gen Z-led employee engagement company. The activity is the start. The point is a
            workplace people don&apos;t want to leave.
          </p>
          <TalkButton className="mt-6 inline-block" />
        </div>

        <div>
          <p className="text-xs font-semibold tracking-[0.16em] text-[#122018]/45 uppercase">Quick links</p>
          <ul className="mt-4 flex flex-col gap-2 text-sm">
            {nav.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="hover:text-[#14914a]">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold tracking-[0.16em] text-[#122018]/45 uppercase">Our policies</p>
          <ul className="mt-4 flex flex-col gap-2 text-sm text-[#122018]/75">
            <li>Privacy</li>
            <li>Terms</li>
          </ul>
          <p className="mt-6 text-xs font-semibold tracking-[0.16em] text-[#122018]/45 uppercase">Find us</p>
          <div className="mt-3 flex gap-3 text-sm">
            <span className="rounded-full border border-black/10 px-3 py-1.5">Instagram</span>
            <span className="rounded-full border border-black/10 px-3 py-1.5">LinkedIn</span>
          </div>
        </div>
      </div>
      <div className="border-t border-black/5">
        <div className="mx-auto flex w-full max-w-[1240px] flex-wrap items-center justify-between gap-3 px-5 py-5 text-xs text-[#122018]/50 md:px-8">
          <p>© {new Date().getFullYear()} OneThrive. All rights reserved.</p>
          <p>Offsites, in-office sessions, and virtual rooms.</p>
        </div>
      </div>
    </footer>
  );
}
