"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { activities, destinations } from "@/data/content";
import { caseStudies, caseStudyHref, type CaseStudy } from "@/data/case-studies";
import { gallery } from "@/data/gallery";
import { serviceHref, services, servicesRoot, type Service } from "@/data/services";
import { Glow, PixelCluster } from "@/components/landing/decor";
import { ArrowUpRight } from "@/components/landing/icons";
import { Reveal } from "@/components/landing/reveal";
import { TalkButton } from "@/components/landing/talk";
import { PillButton } from "@/components/landing/ui";
import { CaseCover } from "@/components/site/case-cover";
import { PageHero } from "@/components/site/page-kit";

const SHELL = "mx-auto w-full max-w-[1240px] px-5 md:px-8";

/* Everything a service page shows, resolved from the references in services.ts. */
function mediaFor(service: Service) {
  const photos = gallery.filter((photo) => service.galleryFolders.some((folder) => photo.src.startsWith(`/gallery/${folder}/`)));
  const groups = activities.filter((group) => service.activityGroups.includes(group.category));
  const studies = service.caseStudyIds
    .map((id) => caseStudies.find((study) => study.id === id))
    .filter((study): study is CaseStudy => Boolean(study));
  return { photos, groups, studies, activityTotal: groups.reduce((sum, group) => sum + group.items.length, 0) };
}

/* ---------- /services/[slug] ---------- */

export function ServicePage({ service }: { service: Service }) {
  const { photos, groups, studies, activityTotal } = mediaFor(service);

  return (
    <>
      <PageHero
        eyebrow={`Service ${service.index}`}
        lead={service.lead}
        accent={service.accent}
        intro={service.intro}
        crumbs={[{ label: servicesRoot.label, href: servicesRoot.href }, { label: service.label }]}
      >
        <div className="flex flex-col gap-8">
          <div className="flex flex-wrap items-center gap-4">
            <TalkButton size="lg">Plan a {service.label.toLowerCase()} day</TalkButton>
            <ul className="flex flex-wrap gap-2" aria-label="Includes">
              {service.tags.map((tag) => (
                <li key={tag} className="rounded-full border border-emerald/15 bg-mint-wash px-3 py-1 text-xs font-medium text-emerald-deep">
                  {tag}
                </li>
              ))}
            </ul>
          </div>
          <ServiceTabs />
        </div>
      </PageHero>

      <Cover service={service} />
      {groups.length > 0 && <Playbook groups={groups} total={activityTotal} />}
      {studies.length > 0 && <Proof studies={studies} />}
      {photos.length > 0 && <Photos photos={photos} label={service.label} />}
      {service.destinations && <Destinations />}
      <ClosingCta label={service.label} />
      <ServiceNext />
    </>
  );
}

function Cover({ service }: { service: Service }) {
  return (
    <section className="px-2 md:px-3">
      <Reveal className="relative mx-auto aspect-[4/3] max-w-[1400px] overflow-hidden rounded-[2.25rem] bg-ink sm:aspect-[21/9] md:rounded-[2.75rem]">
        <Image src={service.image.src} alt={service.image.alt} fill preload sizes="100vw" className="object-cover" />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent" />
      </Reveal>
    </section>
  );
}

function SectionHead({ eyebrow, lead, accent, aside }: { eyebrow: string; lead: string; accent: string; aside?: React.ReactNode }) {
  return (
    <Reveal className="mb-10 flex flex-col gap-6 md:mb-14 md:flex-row md:items-end md:justify-between">
      <div>
        <span className="eyebrow">{eyebrow}</span>
        <h2 className="mt-5 max-w-[18ch] font-display text-[clamp(2rem,4.4vw,3.75rem)] leading-[1.02] font-light tracking-tight">
          {lead} <span className="font-serif text-emerald italic">{accent}</span>
        </h2>
      </div>
      {aside}
    </Reveal>
  );
}

/* The named formats on the shelf for this service, grouped as in the activities catalogue. */
function Playbook({ groups, total }: { groups: typeof activities; total: number }) {
  return (
    <section className="relative isolate overflow-x-clip py-20 md:py-28">
      <Glow tone="soft" className="-z-10 top-10 -right-20 size-[26rem]" />
      <div className={SHELL}>
        <SectionHead
          eyebrow="The playbook"
          lead={`${total} formats,`}
          accent="ready to run."
          aside={<p className="max-w-sm text-ink/65">Every one is facilitated by our crew and shaped around your team&apos;s size and space.</p>}
        />
        <div className="grid gap-5 md:grid-cols-2">
          {groups.map((group) => (
            <Reveal key={group.category} className="rounded-[1.75rem] bg-white p-6 shadow-float ring-1 ring-ink/5 md:p-8">
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="font-display text-2xl font-semibold tracking-tight">{group.category}</h3>
                <span className="text-sm text-grey tabular-nums">{group.items.length}</span>
              </div>
              <ul className="mt-5 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li key={item} className="rounded-full bg-cream px-3 py-1.5 text-sm text-ink/80 ring-1 ring-ink/5">
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* Case studies for this service: the event reel when there is one, otherwise the cover. */
function Proof({ studies }: { studies: CaseStudy[] }) {
  return (
    <section className="bg-ink py-20 text-cream md:py-28">
      <div className={SHELL}>
        <Reveal className="mb-10 md:mb-14">
          <span className="text-xs font-medium tracking-[0.2em] text-mint uppercase">Proof, on camera</span>
          <h2 className="mt-5 max-w-[18ch] font-display text-[clamp(2rem,4.4vw,3.75rem)] leading-[1.02] font-light tracking-tight">
            Days we&apos;ve <span className="font-serif text-mint italic">already run.</span>
          </h2>
        </Reveal>
        <Reveal stagger={0.08} className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {studies.map((study) => (
            <article key={study.id} className="flex flex-col overflow-hidden rounded-[1.75rem] bg-cream/5 ring-1 ring-cream/10">
              <div className="relative aspect-[4/5] bg-ink">
                {study.video ? (
                  <video
                    src={study.video.src}
                    poster={study.video.poster}
                    controls
                    playsInline
                    preload="none"
                    aria-label={`Video from the ${study.client} event`}
                    className="absolute inset-0 size-full object-cover"
                  >
                    <track kind="captions" />
                  </video>
                ) : (
                  <CaseCover study={study} sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" />
                )}
              </div>
              <div className="flex flex-1 flex-col p-6">
                <p className="text-xs tracking-[0.18em] text-mint uppercase">{study.client}</p>
                <h3 className="mt-2 font-display text-xl leading-tight font-semibold">{study.activity}</h3>
                <p className="mt-2 text-sm text-cream/60">{[study.participants, study.location].filter(Boolean).join(" · ")}</p>
                <Link
                  href={caseStudyHref(study.id)}
                  className="group mt-auto inline-flex items-center gap-2 pt-5 text-sm font-medium text-cream/80 transition-colors hover:text-mint"
                >
                  Read the case study
                  <ArrowUpRight className="size-4 transition-transform duration-500 ease-spring group-hover:rotate-45" />
                </Link>
              </div>
            </article>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

function Photos({ photos, label }: { photos: typeof gallery; label: string }) {
  return (
    <section className="py-20 md:py-28">
      <div className={SHELL}>
        <SectionHead
          eyebrow="From the floor"
          lead={`${label},`}
          accent="as it happened."
          aside={
            <PillButton href="/gallery" variant="light" size="md">
              Full gallery
            </PillButton>
          }
        />
        <Reveal stagger={0.05} className="columns-2 gap-3 md:gap-4 lg:columns-3 [&>*]:mb-3 md:[&>*]:mb-4">
          {photos.slice(0, 12).map((photo) => (
            <div key={photo.src} className="relative break-inside-avoid overflow-hidden rounded-[1.25rem] ring-1 ring-ink/6">
              <Image src={photo.src} alt={photo.alt} width={photo.width} height={photo.height} sizes="(min-width: 1024px) 33vw, 50vw" className="h-auto w-full" />
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

function Destinations() {
  const pictured = destinations.filter((place) => place.image);
  return (
    <section className="py-20 md:py-28">
      <div className={SHELL}>
        <SectionHead eyebrow="Where we go" lead={`${destinations.length}+ destinations,`} accent="in India and abroad." />
        <Reveal stagger={0.05} className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {pictured.map((place) => (
            <figure key={place.name} className="relative aspect-[3/4] overflow-hidden rounded-[1.5rem] bg-ink">
              <Image src={place.image!} alt={place.name} fill sizes="(min-width: 768px) 25vw, 50vw" className="object-cover" />
              <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent" />
              <figcaption className="absolute bottom-4 left-4 text-cream">
                <span className="block font-display text-xl font-semibold">{place.name}</span>
                <span className="text-xs text-cream/70">{place.region}</span>
              </figcaption>
            </figure>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

function ClosingCta({ label }: { label?: string }) {
  return (
    <section className="relative isolate overflow-x-clip px-2 py-16 md:px-3 md:py-24">
      <Reveal className="mx-auto flex max-w-[1240px] flex-col items-center gap-6 rounded-[2.25rem] bg-mint-wash px-6 py-14 text-center md:rounded-[2.75rem] md:px-12 md:py-20">
        <span className="eyebrow">Your team, next</span>
        <h2 className="max-w-[18ch] font-display text-[clamp(2.2rem,5vw,4rem)] leading-[1.02] font-light tracking-tight">
          {label ? `Tell us about your ${label.toLowerCase()} brief.` : "Tell us what the day should change."}{" "}
          <span className="font-serif text-emerald italic">We&apos;ll shape the rest.</span>
        </h2>
        <TalkButton className="mt-4" size="lg">
          Plan your event
        </TalkButton>
      </Reveal>
    </section>
  );
}

/* ---------- shared navigation ---------- */

/* Pill switcher across the service pages, with a sliding mint indicator. */
export function ServiceTabs({ className = "" }: { className?: string }) {
  const pathname = usePathname();
  const items = [{ label: "All", href: servicesRoot.href }, ...services.map((s) => ({ label: s.label, href: serviceHref(s.slug) }))];

  return (
    <nav aria-label="Services" className={`-mx-5 overflow-x-auto px-5 [scrollbar-width:none] ${className}`}>
      <ul className="inline-flex gap-1 rounded-full bg-white/70 p-1.5 shadow-float ring-1 ring-ink/6 backdrop-blur">
        {items.map((item) => {
          const here = pathname === item.href;
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={here ? "page" : undefined}
                className={`relative block rounded-full px-4 py-2.5 text-[13.5px] font-medium whitespace-nowrap transition-colors duration-300 ${
                  here ? "text-ink" : "text-ink/60 hover:text-ink"
                }`}
              >
                {here && (
                  <motion.span
                    layoutId="service-tab"
                    className="absolute inset-0 rounded-full bg-mint shadow-[0_8px_20px_-10px_rgba(0,255,171,0.8)]"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative">{item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

/* Closing link to the next service, so the pages read as one tour. */
function ServiceNext() {
  const pathname = usePathname();
  const i = services.findIndex((s) => serviceHref(s.slug) === pathname);
  const next = services[(i + 1) % services.length];

  return (
    <section className="px-2 pb-6 md:px-3 md:pb-10">
      <Link
        href={serviceHref(next.slug)}
        className="group relative mx-auto flex max-w-[1400px] flex-col gap-8 overflow-hidden rounded-[2.25rem] bg-ink px-6 py-12 text-cream md:flex-row md:items-end md:justify-between md:rounded-[2.75rem] md:px-12 md:py-16"
      >
        <Image src={next.image.src} alt="" fill sizes="100vw" className="object-cover opacity-25 transition-transform duration-1000 ease-out group-hover:scale-105" />
        <span aria-hidden className="absolute inset-0 bg-gradient-to-r from-ink via-ink/80 to-ink/30" />
        <PixelCluster cols={12} rows={6} seed={41} className="absolute bottom-4 left-[40%] hidden opacity-20 md:block" />
        <span className="relative">
          <span className="text-xs tracking-[0.2em] text-mint uppercase">Next service · {next.index}</span>
          <span className="mt-4 block font-display text-[clamp(2.4rem,6vw,5rem)] leading-none font-light tracking-tight">{next.label}</span>
          <span className="mt-4 block max-w-md text-cream/60">{next.blurb}</span>
        </span>
        <span className="relative grid size-16 shrink-0 place-items-center rounded-full bg-mint text-ink transition-transform duration-700 ease-spring group-hover:scale-110 group-hover:rotate-45 md:size-20">
          <ArrowUpRight className="size-6" />
        </span>
      </Link>
    </section>
  );
}

/* ---------- /services ---------- */

export function ServicesOverview() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        lead="One crew for"
        accent="every kind of team day."
        intro="Sports in the morning, a studio after lunch, the offsite next quarter. Pick a format, or tell us the outcome and we'll pick for you."
        crumbs={[{ label: servicesRoot.label }]}
      >
        <ServiceTabs />
      </PageHero>

      <section className="pb-12 md:pb-20">
        <div className={SHELL}>
          <Reveal stagger={0.08} className="grid gap-5 md:grid-cols-2">
            {services.map((service) => {
              const { activityTotal, studies } = mediaFor(service);
              return (
                <Link
                  key={service.slug}
                  href={serviceHref(service.slug)}
                  className="group relative flex aspect-[4/5] flex-col justify-end overflow-hidden rounded-[2rem] bg-ink p-6 text-cream sm:aspect-[5/4] md:p-8"
                >
                  <Image
                    src={service.image.src}
                    alt=""
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-1000 ease-spring group-hover:scale-105"
                  />
                  <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/30 to-transparent" />
                  <span className="absolute top-6 left-6 rounded-full bg-cream/90 px-2.5 py-1 text-[0.7rem] font-medium tracking-[0.18em] text-ink tabular-nums md:top-8 md:left-8">
                    {service.index}
                  </span>
                  <span className="absolute top-5 right-5 grid size-12 place-items-center rounded-full bg-mint text-ink transition-transform duration-700 ease-spring group-hover:rotate-45 md:top-7 md:right-7">
                    <ArrowUpRight className="size-5" />
                  </span>
                  <span className="relative">
                    <span className="block font-display text-[clamp(2rem,3.6vw,3rem)] leading-none font-semibold tracking-tight">{service.label}</span>
                    <span className="mt-3 block max-w-md text-cream/75">{service.intro}</span>
                    <span className="mt-4 block text-xs tracking-[0.16em] text-mint uppercase">
                      {activityTotal} formats{studies.length > 0 && ` · ${studies.length} case ${studies.length === 1 ? "study" : "studies"}`}
                    </span>
                  </span>
                </Link>
              );
            })}
          </Reveal>
        </div>
      </section>

      <ClosingCta />
    </>
  );
}
