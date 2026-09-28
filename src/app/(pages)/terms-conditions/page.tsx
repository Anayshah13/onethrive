import type { Metadata } from "next";
import { TermsConditionsPage } from "@/components/site/terms-conditions";

export const metadata: Metadata = {
  title: "Terms & Conditions — OneThrive",
  description:
    "The agreement that governs every engagement between your team and OneThrive.",
};

export default function TermsConditions() {
  return <TermsConditionsPage />;
}
