import type { Metadata } from "next";
import { OurStory } from "@/components/site/our-story";

export const metadata: Metadata = {
  title: "Our story — OneThrive",
  description:
    "How a Gen Z-led crew set out to fix the team day: from juggling five vendors to running sports, wellness, workshops and the party after, in one team, start to finish.",
};

export default function OurStoryPage() {
  return <OurStory />;
}
