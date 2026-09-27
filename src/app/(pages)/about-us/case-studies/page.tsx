import type { Metadata } from "next";
import { CaseStudies } from "@/components/site/case-studies";

export const metadata: Metadata = {
  title: "Case studies — OneThrive",
  description:
    "Real briefs from Happi Planet, Mystique AI and more — the formats OneThrive built and what changed for each team.",
};

export default function Page() {
  return <CaseStudies />;
}
