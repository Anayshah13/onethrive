import type { Metadata } from "next";
import { BlogsPage } from "@/components/site/blogs-page";

export const metadata: Metadata = {
  title: "Blogs — OneThrive",
  description:
    "Ideas for better team days from the OneThrive crew: planning offsites, workplace wellness, icebreakers, remote team engagement and festive celebrations.",
};

export default function Page() {
  return <BlogsPage />;
}
