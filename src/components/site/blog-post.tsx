"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { formatDate, headingId, readingTime, relatedPosts, type BlogBlock, type BlogPost } from "@/data/blogs";
import { Glow, PixelCluster } from "@/components/landing/decor";
import { ArrowLeft, ArrowRight } from "@/components/landing/icons";
import { Reveal } from "@/components/landing/reveal";
import { PillButton } from "@/components/landing/ui";
import { PostCard } from "@/components/site/blogs-page";

/* A single post at /blogs/{slug}: hero with the post's meta, the cover, then the body beside a
   sticky "On this page" list built from its headings, and related posts to finish. */
export function BlogPostPage({ post }: { post: BlogPost }) {
  const articleRef = useRef<HTMLDivElement>(null);
  const sections = post.body
    .filter((block): block is Extract<BlogBlock, { type: "heading" }> => block.type === "heading")
    .map((block) => ({ id: headingId(block.text), label: block.text }));
  const related = relatedPosts(post);

  return (
    <>
      <section className="relative isolate overflow-x-clip pt-32 pb-10 md:pt-44 md:pb-14">
        <Glow className="-z-10 -top-20 right-[8%] size-[30rem]" />
        <Glow tone="soft" className="-z-10 top-40 -left-32 size-[26rem]" />
        <PixelCluster cols={14} rows={8} seed={53} className="absolute top-24 right-0 -z-0 hidden opacity-70 md:block" />

        <div className="relative mx-auto w-full max-w-[1240px] px-5 md:px-8">
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-1.5 text-[13px] text-grey">
              <li>
                <Link href="/" className="transition-colors hover:text-emerald">
                  Home
                </Link>
              </li>
              <li className="flex items-center gap-1.5">
                <span aria-hidden className="text-ink/25">/</span>
                <Link href="/blogs" className="transition-colors hover:text-emerald">
                  Blogs
                </Link>
              </li>
              <li className="flex min-w-0 items-center gap-1.5">
                <span aria-hidden className="text-ink/25">/</span>
                <span aria-current="page" className="truncate text-ink">
                  {post.title} {post.accent}
                </span>
              </li>
            </ol>
          </nav>

          <Reveal className="mt-10 flex flex-col gap-7 md:mt-14">
            <span className="eyebrow">{post.category}</span>
            <h1 className="max-w-[20ch] font-display text-[clamp(2.4rem,6vw,5.25rem)] leading-[1] font-light tracking-tight text-balance">
              {post.title} <span className="font-serif text-emerald italic">{post.accent}</span>
            </h1>
            <p className="max-w-[56ch] text-[clamp(1rem,1.4vw,1.2rem)] leading-relaxed text-ink/70">{post.excerpt}</p>
            <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-grey">
              <span className="font-medium text-ink">{post.author}</span>
              <span aria-hidden className="text-ink/25">·</span>
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              <span aria-hidden className="text-ink/25">·</span>
              {readingTime(post)} min read
            </p>
          </Reveal>
        </div>
      </section>

      <section className="px-2 md:px-3">
        <Reveal className="relative mx-auto aspect-[4/3] max-w-[1400px] overflow-hidden rounded-[2.25rem] bg-mint-wash md:aspect-[21/9] md:rounded-[2.75rem]">
          <Image src={post.cover.src} alt={post.cover.alt} fill sizes="100vw" preload className="object-cover" />
        </Reveal>
      </section>

      <div ref={articleRef} className="relative isolate overflow-x-clip py-16 md:py-24">
        <div className="mx-auto w-full max-w-[1240px] px-5 md:px-8 lg:grid lg:grid-cols-[11rem_minmax(0,1fr)] lg:gap-14 xl:gap-20">
          {sections.length > 0 ? <SectionNav sections={sections} articleRef={articleRef} /> : <span />}

          <article className="flex max-w-[68ch] min-w-0 flex-col gap-6">
            {post.body.map((block, i) => (
              <Block key={i} block={block} />
            ))}

            <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-ink/8 pt-8">
              <Link
                href="/blogs"
                className="inline-flex items-center gap-2 text-sm font-medium text-ink/70 transition-colors hover:text-emerald"
              >
                <ArrowLeft className="size-4" />
                All posts
              </Link>
              <PillButton href="/contact-us" size="md">
                Plan your event
              </PillButton>
            </div>
          </article>
        </div>
      </div>

      {related.length > 0 && (
        <section className="pb-16 md:pb-24">
          <div className="mx-auto w-full max-w-[1240px] px-5 md:px-8">
            <Reveal className="mb-8 flex items-end justify-between gap-4 md:mb-10">
              <h2 className="font-display text-[clamp(1.8rem,3.6vw,3rem)] leading-none font-light tracking-tight">
                Keep <span className="font-serif text-emerald italic">reading.</span>
              </h2>
              <Link href="/blogs" className="hidden items-center gap-2 text-sm font-medium text-ink/70 transition-colors hover:text-emerald sm:inline-flex">
                All posts
                <ArrowRight className="size-4" />
              </Link>
            </Reveal>
            <div className="grid gap-5 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
              {related.map((p) => (
                <PostCard key={p.slug} post={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

/* ───────────────────────────── Body blocks ───────────────────────────── */

const bodyText = "text-[16px] leading-[1.75] text-ink/75 md:text-[17px]";

function Block({ block }: { block: BlogBlock }) {
  switch (block.type) {
    case "paragraph":
      return <p className={bodyText}>{block.text}</p>;
    case "heading": {
      const id = headingId(block.text);
      return (
        <h2 id={id} className="mt-8 scroll-mt-28 font-display text-[clamp(1.6rem,2.8vw,2.3rem)] leading-[1.1] font-light tracking-tight text-balance text-ink">
          {block.text}
        </h2>
      );
    }
    case "list": {
      const Tag = block.ordered ? "ol" : "ul";
      return (
        <Tag className="flex flex-col gap-2.5">
          {block.items.map((item, i) => (
            <li key={item} className={`flex gap-3 ${bodyText}`}>
              <span
                aria-hidden
                className={`mt-[0.35em] grid shrink-0 place-items-center rounded-full ${
                  block.ordered ? "size-6 bg-ink font-display text-xs text-mint tabular-nums" : "size-2 translate-y-[0.4em] bg-emerald"
                }`}
              >
                {block.ordered ? i + 1 : null}
              </span>
              <span>{item}</span>
            </li>
          ))}
        </Tag>
      );
    }
    case "quote":
      return (
        <blockquote className="my-4 border-l-2 border-mint pl-5 md:pl-8">
          <p className="font-serif text-[clamp(1.4rem,2.4vw,1.9rem)] leading-[1.3] text-ink italic">{block.text}</p>
        </blockquote>
      );
    case "callout":
      return (
        <aside className="relative my-2 overflow-hidden rounded-[1.75rem] bg-mint-wash p-6 md:p-8">
          <p className="text-[11px] font-semibold tracking-[0.14em] text-emerald uppercase">{block.title}</p>
          <p className="mt-3 text-[16px] leading-relaxed font-medium text-ink md:text-[17px]">{block.text}</p>
        </aside>
      );
    case "image":
      return (
        <figure className="my-4">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] bg-mint-wash ring-1 ring-ink/6 md:rounded-[2rem]">
            <Image src={block.image.src} alt={block.image.alt} fill sizes="(min-width: 1024px) 720px, 100vw" className="object-cover" />
          </div>
          {block.caption && <figcaption className="mt-3 text-sm text-grey">{block.caption}</figcaption>}
        </figure>
      );
  }
}

/* Sticky heading list with a reading-progress rail; desktop only. */
function SectionNav({
  sections,
  articleRef,
}: {
  sections: ReadonlyArray<{ id: string; label: string }>;
  articleRef: React.RefObject<HTMLDivElement | null>;
}) {
  const [active, setActive] = useState<string>(sections[0]?.id ?? "");
  const barRef = useRef<HTMLSpanElement>(null);
  const key = sections.map((s) => s.id).join("|");

  useEffect(() => {
    const els = key
      .split("|")
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id);
      },
      { rootMargin: "-20% 0px -70% 0px" },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [key]);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const el = articleRef.current;
      const bar = barRef.current;
      if (!el || !bar) return;
      const rect = el.getBoundingClientRect();
      const span = rect.height - window.innerHeight * 0.6;
      const progress = span > 0 ? Math.min(1, Math.max(0, (window.innerHeight * 0.4 - rect.top) / span)) : 0;
      bar.style.transform = `scaleY(${progress})`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [articleRef]);

  return (
    <nav aria-label="Post sections" className="hidden lg:block">
      <div className="sticky top-32">
        <p className="text-[11px] font-semibold tracking-[0.14em] text-grey uppercase">On this page</p>
        <div className="relative mt-5 pl-5">
          <span aria-hidden className="absolute inset-y-0 left-0 w-px bg-ink/10" />
          <span ref={barRef} aria-hidden className="absolute inset-y-0 left-0 w-px origin-top bg-emerald" style={{ transform: "scaleY(0)" }} />
          <ol className="flex flex-col gap-1">
            {sections.map((section) => {
              const isActive = section.id === active;
              return (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    aria-current={isActive ? "location" : undefined}
                    className={`block py-1.5 text-sm leading-snug transition-colors duration-300 ${
                      isActive ? "font-medium text-emerald" : "text-ink/50 hover:text-ink"
                    }`}
                  >
                    {section.label}
                  </a>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </nav>
  );
}
