import type { Metadata } from "next";
import { PrivacyPolicyPage } from "@/components/site/privacy-policy";

export const metadata: Metadata = {
  title: "Privacy Policy — OneThrive",
  description:
    "How OneThrive collects, uses and protects information you share with us.",
};

export default function PrivacyPolicy() {
  return <PrivacyPolicyPage />;
}
