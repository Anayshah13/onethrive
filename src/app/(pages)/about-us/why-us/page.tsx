import type { Metadata } from "next";
import { WhyUs } from "@/components/site/why-us";

export const metadata: Metadata = {
  title: "Why us — OneThrive",
  description:
    "One Gen Z-led crew for offsites, team building, wellness and events — not five separate vendors. See what makes OneThrive different.",
};

export default function WhyUsPage() {
  return <WhyUs />;
}
