import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Outfit, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const heading = Outfit({
  variable: "--font-heading",
  subsets: ["latin"],
});

const body = Plus_Jakarta_Sans({
  variable: "--font-body",
  subsets: ["latin"],
});

const accent = Instrument_Serif({
  variable: "--font-accent",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "OneThrive — Teams That Connect. Workplaces That Thrive.",
  description:
    "OneThrive designs offsites, team building, wellness and corporate events shaped around your team's context, goals and dynamics.",
};

export const viewport: Viewport = {
  themeColor: "#f4fffb",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${heading.variable} ${body.variable} ${accent.variable} antialiased`}>
      <body className="min-h-dvh bg-cream font-sans text-ink">{children}</body>
    </html>
  );
}
