"use client";

import { ClosingCta } from "./closing-cta";
import { Crew } from "./crew";
import { Destinations } from "./destinations";
import { Faqs } from "./faqs";
import { Footer } from "./footer";
import { Header } from "./header";
import { Hero } from "./hero";
import { Moments } from "./moments";
import { Offer } from "./offer";
import { PromiseSection } from "./promise";
import { SmoothScroll } from "./smooth-scroll";
import { ContactFab, TalkDrawer, TalkProvider } from "./talk";
import { Testimonials } from "./testimonials";

export function HomePage() {
  return (
    <TalkProvider>
      <SmoothScroll />
      <div id="top" className="relative overflow-x-clip bg-cream text-ink">
        <Header />
        <main>
          <Hero />
          <PromiseSection />
          <Offer />
          <Destinations />
          <Testimonials />
          <Faqs />
          <Moments />
          <Crew />
          <ClosingCta />
        </main>
        <Footer />
      </div>
      <ContactFab />
      <TalkDrawer />
      <div className="grain" aria-hidden />
    </TalkProvider>
  );
}
