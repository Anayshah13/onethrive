import type { Metadata } from "next";
import { AboutOverview } from "@/components/site/about-overview";

export const metadata: Metadata = {
  title: "About Us — OneThrive",
  description:
    "OneThrive is India's first Gen Z-led employee engagement company: the crew, the numbers, and how we bring sports, wellness, workshops and the party after under one roof.",
};

export default function AboutUsPage() {
  return <AboutOverview />;
}
