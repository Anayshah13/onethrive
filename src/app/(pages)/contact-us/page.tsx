import type { Metadata } from "next";
import { ContactPage } from "@/components/site/contact-page";

export const metadata: Metadata = {
  title: "Contact us — OneThrive",
  description:
    "Tell us your group size, city and goals and we'll shape an offsite, team-building day or event around them. Reach OneThrive by phone, email or brief.",
};

export default function Page() {
  return <ContactPage />;
}
