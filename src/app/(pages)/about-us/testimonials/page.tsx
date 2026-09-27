import type { Metadata } from "next";
import { TestimonialsPage } from "@/components/site/testimonials-page";

export const metadata: Metadata = {
  title: "Testimonials — OneThrive",
  description:
    "What HR leads and founders say after the day — client testimonials, our Google rating, and the teams we've worked with.",
};

export default function Page() {
  return <TestimonialsPage />;
}
