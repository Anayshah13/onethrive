import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { caseStudies, getCaseStudy } from "@/data/case-studies";
import { CaseStudyDetail } from "@/components/site/case-study-detail";

export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudies.map((study) => ({ id: String(study.id) }));
}

export async function generateMetadata({ params }: PageProps<"/about-us/case-studies/[id]">): Promise<Metadata> {
  const study = getCaseStudy((await params).id);
  if (!study) return {};
  return {
    title: `${study.client}${study.activity ? `: ${study.activity}` : ""} — OneThrive case study`,
    description: study.writeUp?.briefing ?? `How OneThrive worked with ${study.client}.`,
  };
}

export default async function Page({ params }: PageProps<"/about-us/case-studies/[id]">) {
  const study = getCaseStudy((await params).id);
  if (!study) notFound();
  return <CaseStudyDetail study={study} />;
}
