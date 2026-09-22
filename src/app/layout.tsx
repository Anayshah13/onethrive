import type { Metadata } from "next";
import { Bricolage_Grotesque, Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const display = Bricolage_Grotesque({
  variable: "--font-display-family",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "OneThrive — Teams that connect",
  description:
    "OneThrive designs employee engagement, from a one-hour session to a multi-day offsite, shaped around your team.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${outfit.variable} ${display.variable} h-full antialiased`}>
      <body className="min-h-full bg-[#f4fbf7] font-sans text-[#122018]">{children}</body>
    </html>
  );
}
