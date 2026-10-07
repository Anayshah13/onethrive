import type { Metadata } from "next";
import { ServicesOverview } from "@/components/site/service-page";

export const metadata: Metadata = {
  title: "Services — OneThrive",
  description:
    "Team building, offsites, wellness, creative workshops, sports tournaments and virtual formats — all run by one OneThrive crew.",
};

export default function ServicesPage() {
  return <ServicesOverview />;
}
