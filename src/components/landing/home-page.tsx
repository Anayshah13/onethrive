"use client";

import { About } from "./about";
import { Destinations } from "./destinations";
import { Squiggle } from "./decor";
import { Faqs } from "./faqs";
import { Footer } from "./footer";
import { Header } from "./header";
import { Hero } from "./hero";
import { Offer } from "./offer";
import { Testimonials } from "./testimonials";
import { TalkDrawer, TalkProvider } from "./talk";

export function HomePage() {
  return (
    <TalkProvider>
      <div id="top" className="relative min-h-full bg-[#f4fbf7] text-[#122018]">
        <Header />
        <div id="story" className="relative">
          <Squiggle />
          <Hero />
          <About />
          <Offer />
        </div>
        <Destinations />
        <Testimonials />
        <Faqs />
        <Footer />
      </div>
      <TalkDrawer />
    </TalkProvider>
  );
}
