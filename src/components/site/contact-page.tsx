"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Glow, PixelCluster } from "@/components/landing/decor";
import { Mail, Phone } from "@/components/landing/icons";
import { Reveal } from "@/components/landing/reveal";
import { PillButton } from "@/components/landing/ui";
import { contact, faqs } from "@/data/content";
import { EASE_OUT } from "@/lib/gsap";
import { PageHero } from "@/components/site/page-kit";

const TEAM_SIZES = ["10–25", "25–75", "75–200", "200+"] as const;

const ENGAGEMENTS = [
  "Offsite & MICE",
  "Team Building",
  "Wellness",
  "Day Outing",
  "Event Production",
  "Artist Booking",
  "Not sure yet",
] as const;

const CITIES = ["Mumbai", "Goa", "Bengaluru", "Delhi NCR", "Jaipur", "Dubai", "Bali", "Thailand"] as const;

const NEXT_STEPS = [
  { title: "We call you within a day", body: "A quick conversation to understand your team, timelines and budget." },
  { title: "We shape a format around your goals", body: "No templates. We design the day around what you want it to change." },
  { title: "We run it end to end", body: "Planning, logistics and the day itself, so it's off your plate entirely." },
] as const;

const FAQ_QUESTIONS = [
  "How much do your programs cost?",
  "How far in advance should we book?",
  "Which cities do you operate in?",
  "Can you customize the activities for our team?",
] as const;

export function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact us"
        lead="Let's plan a day your team"
        accent="will talk about."
        intro="Share your group size, city and goals, and we'll shape a format around them. If you'd rather talk it through, our number and email are one tap away."
        crumbs={[{ label: "Contact us" }]}
      />

      <section className="relative isolate pb-16 md:pb-24">
        <Glow tone="soft" className="-z-10 top-1/3 -right-32 size-[28rem]" />
        <div className="mx-auto grid w-full max-w-[1240px] gap-8 px-5 md:px-8 lg:grid-cols-[1.55fr_1fr] lg:items-start lg:gap-10">
          <Reveal>
            <BriefForm />
          </Reveal>

          <Reveal stagger={0.1} className="flex flex-col gap-6 lg:sticky lg:top-28">
            <ContactCard />
            <WhereWeWorkCard />
            <NextStepsCard />
          </Reveal>
        </div>
      </section>

      <FaqStrip />
      <AboutBanner />
    </>
  );
}

/* Double-bezel form card: an outer soft frame around the crisp white card, matching
   the rest of the site's "floating panel" language. */
function BriefForm() {
  const [sent, setSent] = useState(false);
  const [teamSize, setTeamSize] = useState<string | null>(null);
  const [engagements, setEngagements] = useState<string[]>([]);

  const toggleEngagement = (item: string) => {
    setEngagements((current) =>
      current.includes(item) ? current.filter((value) => value !== item) : [...current, item],
    );
  };

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const get = (key: string) => String(data.get(key) ?? "").trim();

    const body = [
      `Name: ${get("name")}`,
      `Company: ${get("company")}`,
      `Work email: ${get("email")}`,
      `Phone: ${get("phone") || "Not shared"}`,
      `Team size: ${teamSize ?? "Not sure yet"}`,
      `Engagement: ${engagements.length ? engagements.join(", ") : "Not sure yet"}`,
      `Preferred city/destination: ${get("city") || "Open to suggestions"}`,
      `Preferred month: ${get("month") || "Flexible"}`,
      "",
      get("message"),
    ].join("\n");
    const subject = `Contact page enquiry from ${get("company") || get("name")}`;
    window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  const reset = () => setSent(false);

  return (
    <div className="rounded-[2rem] bg-white/50 p-1.5 ring-1 ring-ink/5">
      <div className="rounded-[1.6rem] bg-white p-6 shadow-float sm:p-8 md:p-10">
        <AnimatePresence mode="wait">
          {sent ? (
            <motion.div
              key="sent"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.6, ease: EASE_OUT }}
              className="flex min-h-[420px] flex-col items-start justify-center"
            >
              <span className="eyebrow">Brief ready</span>
              <p className="mt-6 font-display text-3xl leading-[1.1] font-light tracking-tight sm:text-4xl">
                Your brief is ready to send.
              </p>
              <p className="mt-3 max-w-md text-sm leading-6 text-grey">
                We opened your email app with everything filled in. If nothing opened, write to{" "}
                <a className="font-semibold text-emerald underline underline-offset-4" href={`mailto:${contact.email}`}>
                  {contact.email}
                </a>{" "}
                or call{" "}
                <a className="font-semibold text-emerald underline underline-offset-4" href={contact.phoneHref}>
                  {contact.phone}
                </a>
                .
              </p>
              <button
                type="button"
                onClick={reset}
                className="mt-6 cursor-pointer text-sm font-semibold text-emerald transition-colors hover:text-emerald-deep"
              >
                Edit the brief
              </button>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.6, ease: EASE_OUT }}
              onSubmit={submit}
              className="flex flex-col gap-5"
            >
              <div>
                <span className="eyebrow">Tell us about your team</span>
                <h2 className="mt-4 font-display text-3xl leading-[1.08] font-light tracking-tight sm:text-4xl">
                  Share the brief.
                </h2>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Name" name="name" autoComplete="name" required />
                <Field label="Company" name="company" autoComplete="organization" required />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Work email" name="email" type="email" autoComplete="email" required />
                <Field label="Phone" name="phone" type="tel" autoComplete="tel" />
              </div>

              <ChipGroup
                label="Team size"
                options={TEAM_SIZES}
                mode="single"
                selected={teamSize ? [teamSize] : []}
                onToggle={(value) => setTeamSize((current) => (current === value ? null : value))}
              />

              <ChipGroup
                label="What kind of engagement?"
                options={ENGAGEMENTS}
                mode="multi"
                selected={engagements}
                onToggle={toggleEngagement}
              />

              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Preferred city/destination" name="city" placeholder="e.g. Goa" />
                <Field label="Preferred month" name="month" placeholder="e.g. January 2027" />
              </div>

              <label className="flex flex-col gap-1.5 text-sm font-medium">
                <span>
                  What should the day do?
                  <span className="text-emerald"> *</span>
                </span>
                <textarea
                  name="message"
                  required
                  rows={4}
                  placeholder="An offsite in Goa for 60, focused on cross-team trust…"
                  className="rounded-2xl bg-white px-4 py-3 font-normal ring-1 ring-ink/10 transition-shadow outline-none placeholder:text-grey/60 focus:ring-2 focus:ring-emerald"
                />
              </label>

              <div className="mt-2 flex flex-wrap items-center gap-4">
                <button
                  type="submit"
                  className="group inline-flex cursor-pointer items-center gap-3 rounded-full bg-ink py-1.5 pr-1.5 pl-5 text-sm font-semibold text-cream transition-transform duration-500 ease-spring active:scale-[0.97]"
                >
                  Send the brief
                  <span className="grid size-9 place-items-center rounded-full bg-mint text-ink transition-transform duration-500 ease-spring group-hover:translate-x-0.5 group-hover:scale-105">
                    <Mail className="size-4" />
                  </span>
                </button>
                <span className="text-xs text-grey">We reply within one working day.</span>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </div>
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

function ChipGroup({
  label,
  options,
  selected,
  onToggle,
  mode,
}: {
  label: string;
  options: ReadonlyArray<string>;
  selected: string[];
  onToggle: (value: string) => void;
  mode: "single" | "multi";
}) {
  return (
    <fieldset className="flex flex-col gap-2">
      <legend className="text-sm font-medium">{label}</legend>
      <div className="flex flex-wrap gap-2" role={mode === "single" ? "radiogroup" : "group"}>
        {options.map((option) => {
          const isOn = selected.includes(option);
          return (
            <button
              key={option}
              type="button"
              aria-pressed={isOn}
              onClick={() => onToggle(option)}
              className={`min-h-11 cursor-pointer rounded-full px-4 py-2 text-[13.5px] font-medium ring-1 transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-emerald ${
                isOn ? "bg-ink text-cream ring-ink" : "bg-white text-ink/70 ring-ink/10 hover:text-ink"
              }`}
            >
              {option}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

/* Dark card with a mint glow, echoing the ink panels used elsewhere on the site. */
function ContactCard() {
  return (
    <div className="relative overflow-hidden rounded-[1.75rem] bg-ink p-6 text-cream sm:p-8">
      <div aria-hidden className="absolute -top-16 -right-10 size-56 rounded-full bg-mint/25 blur-3xl" />
      <PixelCluster cols={10} rows={6} seed={41} className="absolute -bottom-2 -left-2 opacity-15" />

      <span className="relative text-[11px] font-medium tracking-[0.2em] text-mint uppercase">Reach us directly</span>

      <a
        href={`mailto:${contact.email}`}
        className="group relative mt-5 flex items-center gap-3 font-display text-xl font-light tracking-tight transition-colors hover:text-mint sm:text-2xl"
      >
        <span className="grid size-11 shrink-0 place-items-center rounded-full bg-white/10 transition-colors group-hover:bg-mint/20">
          <Mail className="size-5" />
        </span>
        {contact.email}
      </a>

      <a
        href={contact.phoneHref}
        className="group relative mt-4 flex items-center gap-3 font-display text-xl font-light tracking-tight transition-colors hover:text-mint sm:text-2xl"
      >
        <span className="grid size-11 shrink-0 place-items-center rounded-full bg-white/10 transition-colors group-hover:bg-mint/20">
          <Phone className="size-5" />
        </span>
        {contact.phone}
      </a>

      <div className="relative mt-6 flex items-center gap-2.5 text-sm text-cream/60">
        <span className="relative grid size-2.5 place-items-center">
          <span aria-hidden className="pulse-ring absolute inset-0 rounded-full bg-mint" />
          <span aria-hidden className="size-1.5 rounded-full bg-mint" />
        </span>
        Typically reply within one working day
      </div>
    </div>
  );
}

function WhereWeWorkCard() {
  return (
    <div className="rounded-[1.75rem] bg-white p-6 shadow-float ring-1 ring-ink/5 sm:p-8">
      <h3 className="font-display text-xl font-light tracking-tight">Where we work</h3>
      <p className="mt-2 text-sm leading-6 text-grey">
        Mumbai HQ, running programs across India and internationally.
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        {CITIES.map((city) => (
          <span
            key={city}
            className="rounded-full bg-mint-wash px-3.5 py-1.5 text-[12.5px] font-medium text-emerald-deep"
          >
            {city}
          </span>
        ))}
      </div>
    </div>
  );
}

function NextStepsCard() {
  return (
    <div className="rounded-[1.75rem] bg-white p-6 shadow-float ring-1 ring-ink/5 sm:p-8">
      <h3 className="font-display text-xl font-light tracking-tight">What happens next</h3>
      <ol className="mt-4 flex flex-col gap-4">
        {NEXT_STEPS.map((step, index) => (
          <li key={step.title} className="flex gap-3.5">
            <span className="grid size-7 shrink-0 place-items-center rounded-full bg-mint-wash text-[12.5px] font-semibold text-emerald-deep">
              {index + 1}
            </span>
            <span>
              <span className="block text-sm font-semibold text-ink">{step.title}</span>
              <span className="mt-1 block text-sm leading-6 text-grey">{step.body}</span>
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}

/* Compact FAQ accordion: one open at a time, animated with framer-motion height, styled
   like the site's rounded white cards rather than the dark FAQ panels on the home page. */
function FaqStrip() {
  const uid = useId();
  const [openIndex, setOpenIndex] = useState(0);
  const items = faqs.filter((item) => (FAQ_QUESTIONS as readonly string[]).includes(item.q));

  return (
    <section className="relative isolate py-16 md:py-24">
      <div className="mx-auto w-full max-w-[760px] px-5 md:px-8">
        <Reveal className="text-center">
          <span className="eyebrow">FAQs</span>
          <h2 className="mt-5 font-display text-[clamp(2rem,4.5vw,2.75rem)] leading-[1.05] font-light tracking-tight">
            A few things people ask <span className="font-serif text-emerald italic">before writing in.</span>
          </h2>
        </Reveal>

        <Reveal stagger={0.06} className="mt-10 flex flex-col gap-3">
          {items.map((item, index) => {
            const isOpen = openIndex === index;
            const headerId = `${uid}-faq-strip-header-${index}`;
            const panelId = `${uid}-faq-strip-panel-${index}`;
            return (
              <div key={item.q} className="rounded-2xl bg-white shadow-float ring-1 ring-ink/5">
                <button
                  type="button"
                  id={headerId}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  className="flex min-h-14 w-full cursor-pointer items-center justify-between gap-4 px-5 py-4 text-left text-[15px] font-semibold"
                >
                  <span>{item.q}</span>
                  <span className="relative grid size-7 shrink-0 place-items-center rounded-full bg-mint-wash text-emerald-deep">
                    <span
                      aria-hidden
                      className={`absolute h-[1.5px] w-3.5 rounded-full bg-current transition-transform duration-400 ease-spring ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                    <span
                      aria-hidden
                      className={`absolute h-[1.5px] w-3.5 rounded-full bg-current transition-transform duration-400 ease-spring ${
                        isOpen ? "rotate-0 scale-x-0" : "rotate-90"
                      }`}
                    />
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={panelId}
                      role="region"
                      aria-labelledby={headerId}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: EASE_OUT }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-5 text-sm leading-7 text-grey">{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}

/* Slim mint-wash banner pointing to the about page, closing the loop from "who do we call"
   to "who are these people". */
function AboutBanner() {
  return (
    <section className="pb-16 md:pb-24">
      <Reveal className="mx-auto w-full max-w-[1240px] px-5 md:px-8">
        <div className="flex flex-col items-center gap-5 rounded-[1.75rem] bg-mint-wash px-6 py-10 text-center sm:flex-row sm:justify-between sm:rounded-full sm:px-10 sm:py-6 sm:text-left">
          <p className="font-display text-xl leading-tight font-light tracking-tight text-ink sm:text-2xl">
            Want to know who you&apos;ll be working with?
          </p>
          <PillButton href="/about-us" variant="ink">
            Meet the crew
          </PillButton>
        </div>
      </Reveal>
    </section>
  );
}
