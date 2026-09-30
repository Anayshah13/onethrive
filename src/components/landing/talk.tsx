"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { contact } from "@/data/content";
import { EASE_OUT } from "@/lib/gsap";
import { Close, Mail, Phone } from "./icons";
import { lockScroll } from "./smooth-scroll";
import { PillButton } from "./ui";

type TalkValue = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

const TalkContext = createContext<TalkValue | null>(null);

export function TalkProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return <TalkContext.Provider value={{ open, setOpen }}>{children}</TalkContext.Provider>;
}

export function useTalk() {
  const value = useContext(TalkContext);
  if (!value) throw new Error("useTalk must be used inside TalkProvider");
  return value;
}

export function TalkButton({
  className = "",
  children = "Plan your event",
  variant = "mint",
  size = "md",
}: {
  className?: string;
  children?: React.ReactNode;
  variant?: "mint" | "ink" | "light";
  size?: "sm" | "md" | "lg";
}) {
  const { setOpen } = useTalk();
  return (
    <PillButton onClick={() => setOpen(true)} variant={variant} size={size} className={className}>
      {children}
    </PillButton>
  );
}

/* The floating mail button from the mock: always one tap away from a brief. */
export function ContactFab() {
  const { open, setOpen } = useTalk();
  return (
    <motion.div
      initial={{ y: 24, opacity: 0 }}
      animate={{ y: open ? 12 : 0, opacity: open ? 0 : 1 }}
      transition={{ delay: open ? 0 : 1.4, type: "spring", stiffness: 240, damping: 24 }}
      className={`fixed right-4 bottom-4 z-40 md:right-8 md:bottom-8 ${open ? "pointer-events-none" : ""}`}
    >
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Plan your event with OneThrive"
        className="group flex cursor-pointer items-center gap-3 fab-gold rounded-full p-1.5 shadow-[0_20px_44px_-16px_rgba(21,23,23,0.45),0_0_18px_-6px_rgba(212,175,55,0.6)] ring-1 ring-[#8a6a1f]/40 transition-transform duration-500 ease-spring hover:-translate-y-0.5 active:scale-[0.97]"
      >
        <span className="flex items-center gap-3 rounded-full bg-ink py-1.5 pr-1.5 pl-1.5 text-cream sm:pl-5">
          <span className="hidden flex-col items-start leading-none sm:flex">
            <span className="text-[10px] font-medium tracking-[0.2em] text-mint/80 uppercase">Say hello</span>
            <span className="mt-1 font-display text-[15px] font-medium tracking-tight">Plan your event</span>
          </span>
          <span className="relative grid size-11 place-items-center rounded-full bg-mint text-ink transition-transform duration-500 ease-spring group-hover:rotate-[-8deg] group-hover:scale-105 md:size-12">
            <span aria-hidden className="pulse-ring absolute inset-0 rounded-full bg-mint" />
            <Mail className="relative size-5" />
          </span>
        </span>
      </button>
      <style>{`
        .fab-gold {
          background: linear-gradient(120deg, #8a6a1f 0%, #d4af37 22%, #fff3c4 38%, #e6c35c 52%, #a67c2e 70%, #f5d77a 86%, #8a6a1f 100%);
          background-size: 250% 100%;
          animation: fab-gold 5s linear infinite;
        }
        @keyframes fab-gold { from { background-position: 0% 50%; } to { background-position: 166.667% 50%; } }
        @media (prefers-reduced-motion: reduce) { .fab-gold { animation: none; } }
      `}</style>
    </motion.div>
  );
}

export function TalkDrawer() {
  const { open, setOpen } = useTalk();
  const [sent, setSent] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    lockScroll(open);
    if (!open) return;
    closeRef.current?.focus();
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, setOpen]);

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const get = (key: string) => String(data.get(key) ?? "").trim();
    const body = [
      `Name: ${get("name")}`,
      `Company: ${get("company")}`,
      `Work email: ${get("email")}`,
      `Team size: ${get("size") || "Not sure yet"}`,
      "",
      get("message"),
    ].join("\n");
    const subject = `Offsite brief from ${get("company") || get("name")}`;
    window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.button
            type="button"
            aria-label="Close dialog"
            tabIndex={-1}
            className="fixed inset-0 z-[70] cursor-default bg-ink/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          />
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-labelledby="talk-title"
            data-lenis-prevent
            className="fixed top-2 right-2 bottom-2 z-[80] flex w-[calc(100%-1rem)] max-w-[480px] flex-col overflow-y-auto rounded-[28px] bg-cream p-2 shadow-[0_40px_80px_-20px_rgba(18,63,48,0.45)] ring-1 ring-ink/5"
            initial={{ x: "105%" }}
            animate={{ x: 0 }}
            exit={{ x: "105%" }}
            transition={{ type: "spring", stiffness: 260, damping: 32 }}
          >
            <div className="relative overflow-hidden rounded-[22px] bg-ink px-6 pt-6 pb-8 text-cream sm:px-8">
              <div className="absolute -top-16 -right-10 size-56 rounded-full bg-mint/25 blur-3xl" aria-hidden />
              <div className="relative flex items-start justify-between gap-4">
                <span className="text-[11px] font-medium tracking-[0.2em] text-mint uppercase">Let&apos;s talk</span>
                <button
                  ref={closeRef}
                  type="button"
                  onClick={() => setOpen(false)}
                  className="grid size-10 cursor-pointer place-items-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
                  aria-label="Close"
                >
                  <Close className="size-4" />
                </button>
              </div>
              <h2 id="talk-title" className="relative mt-6 font-display text-4xl leading-[1.05] font-light tracking-tight">
                Tell us about <span className="font-serif text-mint italic">your team.</span>
              </h2>
              <p className="relative mt-3 max-w-sm text-sm leading-6 text-cream/65">
                Group size, city, and what you want the day to change. We&apos;ll shape the format around that.
              </p>
            </div>

            <div className="px-4 pt-6 pb-4 sm:px-6">
              <AnimatePresence mode="wait">
                {sent ? (
                  <motion.div
                    key="sent"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6, ease: EASE_OUT }}
                    className="rounded-3xl bg-white p-6 ring-1 ring-ink/5"
                  >
                    <p className="font-display text-2xl">Your brief is ready to send.</p>
                    <p className="mt-2 text-sm leading-6 text-grey">
                      We opened your email app with everything filled in. If nothing opened, write to{" "}
                      <a className="font-semibold text-emerald underline underline-offset-4" href={`mailto:${contact.email}`}>
                        {contact.email}
                      </a>{" "}
                      or call {contact.phone}.
                    </p>
                    <button
                      type="button"
                      className="mt-5 cursor-pointer text-sm font-semibold text-emerald"
                      onClick={() => setSent(false)}
                    >
                      Edit the brief
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.15 }}
                    className="flex flex-col gap-4"
                    onSubmit={submit}
                  >
                    <div className="grid gap-4 sm:grid-cols-2">
                      <Field label="Name" name="name" autoComplete="name" required />
                      <Field label="Company" name="company" autoComplete="organization" required />
                    </div>
                    <Field label="Work email" name="email" type="email" autoComplete="email" required />
                    <Field label="Team size" name="size" inputMode="numeric" placeholder="e.g. 40" />
                    <label className="flex flex-col gap-1.5 text-sm font-medium">
                      What should the day do?
                      <textarea
                        name="message"
                        required
                        rows={4}
                        placeholder="An offsite in Goa for 60, focused on cross-team trust…"
                        className="rounded-2xl bg-white px-4 py-3 font-normal ring-1 ring-ink/10 transition-shadow outline-none placeholder:text-grey/60 focus:ring-2 focus:ring-emerald"
                      />
                    </label>
                    <div className="mt-2 flex flex-wrap items-center justify-between gap-4">
                      <button
                        type="submit"
                        className="group inline-flex cursor-pointer items-center gap-3 rounded-full bg-ink py-1.5 pr-1.5 pl-5 text-sm font-semibold text-cream transition-transform duration-500 ease-spring active:scale-[0.97]"
                      >
                        Send the brief
                        <span className="grid size-9 place-items-center rounded-full bg-mint text-ink transition-transform duration-500 ease-spring group-hover:translate-x-0.5 group-hover:scale-105">
                          <Mail className="size-4" />
                        </span>
                      </button>
                      <a href={contact.phoneHref} className="inline-flex items-center gap-2 text-sm text-grey hover:text-emerald">
                        <Phone className="size-4" />
                        {contact.phone}
                      </a>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

function Field({
  label,
  ...input
}: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="flex flex-col gap-1.5 text-sm font-medium">
      <span>
        {label}
        {input.required && <span className="text-emerald"> *</span>}
      </span>
      <input
        type="text"
        {...input}
        className="h-12 rounded-2xl bg-white px-4 font-normal ring-1 ring-ink/10 transition-shadow outline-none placeholder:text-grey/60 focus:ring-2 focus:ring-emerald"
      />
    </label>
  );
}
