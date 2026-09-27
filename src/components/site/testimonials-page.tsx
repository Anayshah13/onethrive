"use client";

import Image from "next/image";
import { clients, moments, rating, testimonials } from "@/data/content";
import { Glow, PixelCluster } from "@/components/landing/decor";
import { GoogleMark, Star } from "@/components/landing/icons";
import { Reveal } from "@/components/landing/reveal";
import { TalkButton } from "@/components/landing/talk";
import { AboutNext, AboutTabs, PageHero } from "@/components/site/page-kit";

/* NOTE: two of the three quotes below are placeholders carried over from content.ts
   (see the TODO there) — only the Mystique AI quote is a real, attributed testimonial.
   Replace the others before launch; nothing here invents a new named quote. */

const featured = testimonials[0];
const rest = testimonials.slice(1);
const featuredMoments = moments.filter((moment) => moment.featured).slice(0, 6);

export function TestimonialsPage() {
  return (
    <>
      <PageHero
        eyebrow="Testimonials"
        lead="Heard after"
        accent="the day."
        crumbs={[{ label: "About us", href: "/about-us" }, { label: "Testimonials" }]}
      >
        <AboutTabs />
      </PageHero>

      <Featured />
      <Wall />
      <RatingBlock />
      <ClientLogos />

      <section className="relative isolate overflow-x-clip px-2 py-16 md:px-3 md:py-24">
        <Reveal className="mx-auto flex max-w-[1240px] flex-col items-center gap-6 rounded-[2.25rem] bg-ink px-6 py-14 text-center text-cream md:rounded-[2.75rem] md:px-12 md:py-20">
          <span className="text-xs font-medium tracking-[0.2em] text-mint uppercase">Your team, next</span>
          <h2 className="max-w-[18ch] font-display text-[clamp(2.2rem,5vw,4rem)] leading-[1.02] font-light tracking-tight">
            Give your team a day <span className="font-serif text-mint italic">worth talking about.</span>
          </h2>
          <TalkButton className="mt-4" size="lg">
            Plan your offsite
          </TalkButton>
        </Reveal>
      </section>

      <AboutNext />
    </>
  );
}

/* A large featured quote card for the real, attributed testimonial. */
function Featured() {
  return (
    <section className="relative isolate overflow-x-clip py-20 md:py-28">
      <Glow className="-z-10 top-0 right-[10%] size-[26rem]" />
      <div className="mx-auto w-full max-w-[1240px] px-5 md:px-8">
        <Reveal>
          <figure className="relative mx-auto max-w-[900px] rounded-[2.25rem] bg-white p-8 shadow-lift ring-1 ring-ink/6 sm:p-12 md:rounded-[2.75rem] md:p-16">
            <div className="flex items-center gap-4">
              <span className="relative grid size-16 shrink-0 place-items-center rounded-full bg-emerald ring-4 ring-mint/50">
                <span aria-hidden className="font-display text-xl text-mint">
                  {featured.initials}
                </span>
              </span>
              <div className="flex gap-1 text-ink" role="img" aria-label="Rated 5 out of 5">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star key={i} className="size-4" />
                ))}
              </div>
            </div>
            <blockquote className="mt-8 font-display text-[clamp(1.3rem,2.6vw,2rem)] leading-[1.35] font-light tracking-tight text-ink">
              &ldquo;{featured.quote}&rdquo;
            </blockquote>
            <figcaption className="mt-8">
              <p className="font-semibold text-ink">{featured.name}</p>
              <p className="mt-0.5 text-sm text-grey">{featured.role}</p>
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}

/* Bento wall mixing the remaining testimonials with featured event photos. */
function Wall() {
  return (
    <section className="relative isolate overflow-x-clip py-20 md:py-32">
      <PixelCluster cols={14} rows={8} seed={53} className="absolute top-10 left-0 -z-0 hidden opacity-60 md:block" />
      <div className="mx-auto w-full max-w-[1240px] px-5 md:px-8">
        <Reveal as="header" className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">More from the room</span>
          <h2 className="mt-6 font-display text-[clamp(2.2rem,5vw,4rem)] leading-[1.02] font-light tracking-tight">
            What it looked <span className="font-serif text-emerald italic">and sounded like.</span>
          </h2>
        </Reveal>

        <Reveal stagger={0.08} className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 md:mt-20 md:gap-6">
          {rest.map((item) => (
            <figure
              key={item.name}
              className="col-span-2 flex flex-col justify-between rounded-[1.75rem] bg-white p-6 ring-1 ring-ink/6 sm:col-span-1 md:p-7"
            >
              <div>
                <div className="flex gap-1 text-ink" role="img" aria-label="Rated 5 out of 5">
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star key={i} className="size-3.5" />
                  ))}
                </div>
                <blockquote className="mt-4 text-[15px] leading-7 text-ink/80">&ldquo;{item.quote}&rdquo;</blockquote>
              </div>
              <figcaption className="mt-6 flex items-center gap-3">
                <span className="grid size-10 shrink-0 place-items-center rounded-full bg-mint-soft text-sm font-semibold text-emerald-deep">
                  {item.initials}
                </span>
                <span>
                  <p className="text-sm font-semibold text-ink">{item.name}</p>
                  <p className="text-xs text-grey">{item.role}</p>
                </span>
              </figcaption>
            </figure>
          ))}

          {featuredMoments.map((moment) => (
            <div
              key={moment.src}
              className={`relative col-span-1 overflow-hidden rounded-[1.75rem] ring-1 ring-ink/6 ${
                moment.shape === "wide" ? "col-span-2 aspect-[16/10]" : "aspect-square"
              }`}
            >
              <Image src={moment.src} alt={moment.alt} fill sizes="(min-width: 768px) 33vw, 50vw" className="object-cover" />
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

/* Google rating block, mirroring the promise section's rating card at page scale. */
function RatingBlock() {
  return (
    <section className="relative isolate overflow-x-clip bg-mint-wash py-16 md:py-24">
      <div className="mx-auto w-full max-w-[1240px] px-5 md:px-8">
        <Reveal className="mx-auto flex max-w-xl flex-col items-center gap-3 text-center">
          <span className="flex items-center gap-2 text-xs font-medium text-ink/70">
            <GoogleMark className="size-4" />
            Google reviews
          </span>
          <p className="font-display text-[clamp(3rem,7vw,5.5rem)] leading-none font-light tracking-tight">
            {rating.score}
          </p>
          <div className="flex gap-1 text-[#F5B301]" aria-label={`Rated ${rating.score} out of 5`}>
            {Array.from({ length: 5 }, (_, i) => (
              <Star key={i} className="size-5" />
            ))}
          </div>
          <p className="text-ink/65">average rating on Google</p>
          <p className="mt-1 text-sm text-grey">{rating.label}</p>
        </Reveal>
      </div>
    </section>
  );
}

/* Client logo grid: grayscale at rest, colour on hover, matching the marquee treatment. */
function ClientLogos() {
  return (
    <section className="relative isolate overflow-x-clip py-20 md:py-28">
      <div className="mx-auto w-full max-w-[1240px] px-5 md:px-8">
        <Reveal as="header" className="text-center">
          <span className="eyebrow">Teams we&apos;ve hosted</span>
        </Reveal>

        <Reveal stagger={0.03} className="mt-10 grid grid-cols-3 gap-3 sm:grid-cols-4 md:mt-14 md:grid-cols-6 md:gap-4">
          {clients.map((client) => (
            <div
              key={client.src}
              className="grid aspect-[3/2] place-items-center rounded-2xl bg-white/70 p-4 ring-1 ring-ink/5"
            >
              <div className="relative h-full w-full">
                <Image
                  src={client.src}
                  alt={client.alt}
                  fill
                  sizes="140px"
                  className="object-contain opacity-70 grayscale transition duration-500 hover:opacity-100 hover:grayscale-0"
                />
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
