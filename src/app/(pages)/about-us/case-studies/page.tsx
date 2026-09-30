import type { Metadata } from "next";
import { CaseStudies } from "@/components/site/case-studies";

export const metadata: Metadata = {
  title: "Case studies — OneThrive",
  description:
    "Real events for Zilo, Awfis, DJSCE, BDO India, Draeger, IIFL Capital and Prisma AI — the brief, what OneThrive built, and how the day landed.",
};

export default function Page() {
  return <CaseStudies />;
}
