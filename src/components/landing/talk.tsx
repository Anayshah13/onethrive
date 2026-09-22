"use client";

import { createContext, useContext, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

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
  children = "Let's Talk",
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  const { setOpen } = useTalk();
  return (
    <button
      type="button"
      onClick={() => setOpen(true)}
      className={`rounded-full bg-[#3ddc84] px-5 py-2.5 text-sm font-semibold text-[#062214] transition hover:bg-[#2ecf76] ${className}`}
    >
      {children}
    </button>
  );
}

export function TalkDrawer() {
  const { open, setOpen } = useTalk();
  const [sent, setSent] = useState(false);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.button
            type="button"
            aria-label="Close dialog"
            className="fixed inset-0 z-[70] bg-[#062214]/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          />
          <motion.aside
            role="dialog"
            aria-labelledby="talk-title"
            className="fixed top-0 right-0 z-[80] flex h-full w-full max-w-md flex-col overflow-y-auto bg-[#f7fbf8] px-6 py-7 shadow-2xl sm:px-8"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 34 }}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold tracking-[0.18em] text-[#14914a] uppercase">
                  Let&apos;s talk
                </p>
                <h2 id="talk-title" className="font-display mt-2 text-3xl leading-tight text-[#122018]">
                  Tell us about the team.
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="grid size-10 place-items-center rounded-full border border-black/10 text-lg"
                aria-label="Close"
              >
                ×
              </button>
            </div>
            <p className="mt-3 text-sm leading-6 text-[#122018]/70">
              Group size, city, and what you want the day to change. We&apos;ll shape the format around that.
            </p>

            {sent ? (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 rounded-3xl bg-white p-6"
              >
                <p className="font-display text-2xl">Noted.</p>
                <p className="mt-2 text-sm leading-6 text-[#122018]/70">
                  This preview keeps the note on this page only. Share the inbox you want enquiries to reach and
                  I&apos;ll wire the form to it.
                </p>
                <button
                  type="button"
                  className="mt-5 text-sm font-semibold text-[#14914a]"
                  onClick={() => setSent(false)}
                >
                  Write another
                </button>
              </motion.div>
            ) : (
              <form
                className="mt-8 flex flex-col gap-4"
                onSubmit={(event) => {
                  event.preventDefault();
                  setSent(true);
                }}
              >
                <Field label="Name" name="name" required />
                <Field label="Work email" name="email" type="email" required />
                <Field label="Company" name="company" required />
                <Field label="Team size" name="size" placeholder="e.g. 40" />
                <label className="flex flex-col gap-1.5 text-sm font-medium">
                  What should the day do?
                  <textarea
                    name="message"
                    required
                    rows={4}
                    className="rounded-2xl border border-black/10 bg-white px-4 py-3 font-normal outline-none focus:border-[#3ddc84]"
                  />
                </label>
                <button
                  type="submit"
                  className="mt-2 rounded-full bg-[#122018] px-5 py-3 text-sm font-semibold text-white"
                >
                  Send the brief
                </button>
              </form>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <label className="flex flex-col gap-1.5 text-sm font-medium">
      {label}
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="rounded-2xl border border-black/10 bg-white px-4 py-3 font-normal outline-none focus:border-[#3ddc84]"
      />
    </label>
  );
}
