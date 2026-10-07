"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { LayoutGroup, motion } from "framer-motion";
import { blogCategories, blogHref, blogPosts, formatDate, readingTime, type BlogCategory, type BlogPost } from "@/data/blogs";
import { Glow, PixelCluster } from "@/components/landing/decor";
import { ArrowUpRight } from "@/components/landing/icons";
import { Reveal } from "@/components/landing/reveal";
import { PillButton } from "@/components/landing/ui";
import { PageHero } from "@/components/site/page-kit";

type Filter = "All" | BlogCategory;

const filters: Filter[] = ["All", ...blogCategories.filter((c) => blogPosts.some((p) => p.category === c))];

const postsFor = (filter: Filter) => (filter === "All" ? blogPosts : blogPosts.filter((p) => p.category === filter));

export function BlogsPage() {
  const [filter, setFilter] = useState<Filter>("All");
  const [featured, ...rest] = postsFor(filter);

  return (
    <>
      <PageHero
        eyebrow="Blogs"
        lead="Notes on"
        accent="better team days."
        intro="What we've learned running offsites, wellness sessions, team building and celebrations: practical ideas you can use for your next one."
        crumbs={[{ label: "Blogs" }]}
      />

      <section className="relative isolate overflow-x-clip pb-16 md:pb-24">
        <Glow className="-z-10 top-0 right-[8%] size-[26rem]" />
        <PixelCluster cols={12} rows={7} seed={47} className="absolute top-6 left-0 -z-0 hidden opacity-60 md:block" />

        <div className="mx-auto w-full max-w-[1240px] px-5 md:px-8">
          <div
            role="group"
            aria-label="Filter posts by topic"
            className="-mx-5 flex gap-2 overflow-x-auto px-5 py-3 [scrollbar-width:none] md:mx-0 md:flex-wrap md:overflow-visible md:px-0 [&::-webkit-scrollbar]:hidden"
          >
            <LayoutGroup id="blog-filter">
              {filters.map((item) => {
                const active = item === filter;
                return (
                  <button
                    key={item}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setFilter(item)}
                    className={`relative inline-flex shrink-0 cursor-pointer items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium whitespace-nowrap shadow-float transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-emerald/40 focus-visible:outline-none ${
                      active ? "text-cream" : "bg-white text-ink ring-1 ring-ink/5 hover:ring-ink/15"
                    }`}
                  >
                    {active && (
                      <motion.span
                        layoutId="blog-pill"
                        aria-hidden
                        transition={{ type: "spring", stiffness: 380, damping: 34 }}
                        className="absolute inset-0 rounded-full bg-ink"
                      />
                    )}
                    <span className="relative">{item}</span>
                    <span className={`relative text-xs tabular-nums ${active ? "text-mint" : "text-grey"}`}>{postsFor(item).length}</span>
                  </button>
                );
              })}
            </LayoutGroup>
          </div>

          <p className="sr-only" aria-live="polite">
            {`Showing ${postsFor(filter).length} ${filter === "All" ? "" : filter} posts`}
          </p>

          <div key={filter} className="mt-8 grid gap-5 md:mt-10 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
            {featured && <PostCard post={featured} featured />}
            {rest.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </section>

      <section className="relative isolate overflow-x-clip px-2 pb-16 md:px-3 md:pb-24">
        <Reveal className="mx-auto flex max-w-[1240px] flex-col items-center gap-6 rounded-[2.25rem] bg-ink px-6 py-14 text-center text-cream md:rounded-[2.75rem] md:px-12 md:py-20">
          <span className="text-xs font-medium tracking-[0.2em] text-mint uppercase">Enough reading</span>
          <h2 className="max-w-[20ch] font-display text-[clamp(2.2rem,5vw,4rem)] leading-[1.02] font-light tracking-tight">
            Let&apos;s plan your team&apos;s <span className="font-serif text-mint italic">next good day.</span>
          </h2>
          <PillButton href="/contact-us" size="lg">
            Plan your event
          </PillButton>
        </Reveal>
      </section>
    </>
  );
}

/* One post: cover, topic and date, title, excerpt. The featured card spans the full row. */
export function PostCard({ post, featured = false }: { post: BlogPost; featured?: boolean }) {
  const href = blogHref(post.slug);

  return (
    <Reveal
      className={`group relative flex flex-col overflow-hidden rounded-[2rem] bg-white shadow-float ring-1 ring-ink/6 md:rounded-[2.5rem] ${
        featured ? "md:col-span-2 lg:col-span-3 lg:grid lg:grid-cols-[1.2fr_1fr]" : ""
      }`}
    >
      <Link
        href={href}
        tabIndex={-1}
        aria-hidden
        className={`relative block overflow-hidden bg-mint-wash ${featured ? "aspect-[16/10] lg:aspect-auto lg:min-h-[28rem]" : "aspect-[16/11]"}`}
      >
        <Image
          src={post.cover.src}
          alt=""
          fill
          sizes={featured ? "(min-width: 1024px) 60vw, 100vw" : "(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"}
          className="object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-105"
          preload={featured}
        />
        <span className="absolute top-4 left-4 rounded-full bg-cream/90 px-3 py-1.5 text-[11px] font-semibold tracking-[0.14em] text-ink uppercase backdrop-blur md:top-5 md:left-5">
          {post.category}
        </span>
      </Link>

      <div className={`flex flex-1 flex-col gap-4 p-6 sm:p-8 ${featured ? "lg:justify-center lg:p-12" : ""}`}>
        <p className="flex items-center gap-2 text-[13px] text-grey">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span aria-hidden className="text-ink/25">·</span>
          {readingTime(post)} min read
        </p>
        <h2
          className={`font-display leading-[1.08] font-light tracking-tight text-balance ${
            featured ? "text-[clamp(1.9rem,3.4vw,3rem)]" : "text-[clamp(1.4rem,2.2vw,1.75rem)]"
          }`}
        >
          <Link href={href} className="after:absolute after:inset-0">
            {post.title} <span className="font-serif text-emerald italic">{post.accent}</span>
          </Link>
        </h2>
        <p className={`leading-relaxed text-ink/70 ${featured ? "line-clamp-4" : "line-clamp-3"}`}>{post.excerpt}</p>
        <span className="mt-auto inline-flex items-center gap-2 pt-2 text-sm font-semibold text-ink">
          Read post
          <span className="grid size-8 place-items-center rounded-full bg-mint transition-transform duration-500 ease-spring group-hover:rotate-45">
            <ArrowUpRight className="size-3.5" />
          </span>
        </span>
      </div>
    </Reveal>
  );
}
