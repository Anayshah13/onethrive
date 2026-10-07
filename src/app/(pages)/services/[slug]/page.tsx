import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getService, services } from "@/data/services";
import { ServicePage } from "@/components/site/service-page";

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: PageProps<"/services/[slug]">): Promise<Metadata> {
  const service = getService((await params).slug);
  if (!service) return {};
  return { title: `${service.label} — OneThrive`, description: service.intro };
}

export default async function Page({ params }: PageProps<"/services/[slug]">) {
  const service = getService((await params).slug);
  if (!service) notFound();
  return <ServicePage service={service} />;
}
