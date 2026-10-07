import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { blogPosts, getPost } from "@/data/blogs";
import { BlogPostPage } from "@/components/site/blog-post";

export const dynamicParams = false;

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps<"/blogs/[slug]">): Promise<Metadata> {
  const post = getPost((await params).slug);
  if (!post) return {};
  const title = `${post.title} ${post.accent}`;
  return {
    title: `${title} — OneThrive blog`,
    description: post.excerpt,
    openGraph: {
      type: "article",
      title,
      description: post.excerpt,
      publishedTime: post.date,
      authors: [post.author],
    },
  };
}

export default async function Page({ params }: PageProps<"/blogs/[slug]">) {
  const post = getPost((await params).slug);
  if (!post) notFound();
  return <BlogPostPage post={post} />;
}
