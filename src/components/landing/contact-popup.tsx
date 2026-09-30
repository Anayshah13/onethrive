"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { contact } from "@/data/content";
import { EASE_OUT, EASE_SPRING, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { Close, Mail, Phone } from "./icons";

export function ContactPopup() {
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const shownRef = useRef(false);
  const closeRef = useRef<HTMLButtonElement>(null);

  useGSAP(() => {
    const st = ScrollTrigger.create({
      trigger: "#offer",
      start: "bottom 70%",
      onLeave: () => {
        if (!shownRef.current) {
          shownRef.current = true;
          setOpen(true);
        }
      },
    });
    return () => st.kill();
  });

  useEffect(() => {
    if (!open) return;
    const t = window.setTimeout(() => closeRef.current?.focus(), 30);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const get = (k: string) => String(data.get(k) ?? "").trim();
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
          {/* Semi-blur backdrop — onClick closes; wheel events propagate to window so Lenis scroll stays live */}
          <motion.div
            key="backdrop"
            aria-hidden
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-[70] bg-ink/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE_OUT }}
          />

          {/* Centering wrapper — pointer-events-none so wheel events fall through; card re-enables them */}
          <div className="pointer-events-none fixed inset-0 z-[80] flex items-center justify-center p-4">
            <motion.div
              key="card"
              role="dialog"
              aria-modal="true"
              aria-labelledby="contact-popup-title"
              data-lenis-prevent
              className="pointer-events-auto w-full max-w-[480px] overflow-y-auto overscroll-contain rounded-[28px] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden bg-cream shadow-[0_40px_80px_-20px_rgba(18,63,48,0.45)] ring-1 ring-ink/5"
              style={{ maxHeight: "90dvh" }}
              initial={{ opacity: 0, scale: 0.94, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 24 }}
              transition={{ duration: 0.5, ease: EASE_SPRING }}
            >
              {/* Dark header band */}
              <div className="relative overflow-hidden rounded-t-[26px] bg-ink px-6 pt-6 pb-8 text-cream sm:px-8">
                <div aria-hidden className="absolute -top-16 -right-10 size-56 rounded-full bg-mint/25 blur-3xl" />
                <div className="relative flex items-start justify-between gap-4">
                  <span className="text-[11px] font-medium tracking-[0.2em] text-mint uppercase">Let&apos;s talk</span>
                  <button
                    ref={closeRef}
                    type="button"
                    onClick={() => setOpen(false)}
                    aria-label="Close"
                    className="grid size-10 cursor-pointer place-items-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
                  >
                    <Close className="size-4" />
                  </button>
                </div>
                <h2
                  id="contact-popup-title"
                  className="relative mt-6 font-display text-4xl leading-[1.05] font-light tracking-tight"
                >
                  Tell us about{" "}
                  <span className="font-serif text-mint italic">your team.</span>
                </h2>
                <p className="relative mt-3 max-w-sm text-sm leading-6 text-cream/65">
                  Group size, city, and what you want the day to change. We&apos;ll shape the format around that.
                </p>
              </div>

              {/* Form body */}
              <div className="px-4 pt-6 pb-6 sm:px-6">
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
                        <a
                          className="font-semibold text-emerald underline underline-offset-4"
                          href={`mailto:${contact.email}`}
                        >
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
                        <a
                          href={contact.phoneHref}
                          className="inline-flex items-center gap-2 text-sm text-grey hover:text-emerald"
                        >
                          <Phone className="size-4" />
                          {contact.phone}
                        </a>
                      </div>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

function Field({ label, ...input }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
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
