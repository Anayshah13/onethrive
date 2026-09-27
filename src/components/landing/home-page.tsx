"use client";

import { ClosingCta } from "./closing-cta";
import { FlowLine } from "./decor";
import { Destinations } from "./destinations";
import { Faqs } from "./faqs";
import { Footer } from "./footer";
import { Header } from "./header";
import { Hero } from "./hero";
import { Offer } from "./offer";
import { PromiseSection } from "./promise";
import { SmoothScroll } from "./smooth-scroll";
import { ContactFab, TalkDrawer, TalkProvider } from "./talk";
import { Testimonials } from "./testimonials";

/* The hero-to-promise squiggle: enters mid-hero, curls at the hero's lower edge, exits right. */
const STORY_LINE = [
  [-0.05, 0.3], [0.08, 0.36], [0.2, 0.47], [0.34, 0.44], [0.44, 0.33], [0.56, 0.3],
  [0.62, 0.4], [0.56, 0.52], [0.5, 0.6], [0.52, 0.67], [0.575, 0.66], [0.565, 0.61],
  [0.53, 0.63], [0.55, 0.69], [0.66, 0.72], [0.8, 0.7], [0.92, 0.62], [1.05, 0.66],
] as const;

const STORY_LINE_MOBILE = [
  [-0.1, 0.22], [0.35, 0.3], [0.75, 0.26], [0.9, 0.34], [0.6, 0.4], [0.45, 0.445],
  [0.5, 0.49], [0.64, 0.48], [0.6, 0.44], [0.5, 0.465], [0.66, 0.505], [1.1, 0.49],
] as const;

export function HomePage() {
  return (
    <TalkProvider>
      <SmoothScroll />
      <div id="top" className="relative overflow-x-clip bg-cream text-ink">
        <Header />
        <main>
          <div className="relative">
            <FlowLine
              points={[...STORY_LINE]}
              mobilePoints={[...STORY_LINE_MOBILE]}
              intro={0.3}
              start="top top"
              end="bottom 70%"
              className="z-10"
            />
            <Hero />
            <PromiseSection />
          </div>
          <Offer />
          <Destinations />
          <Testimonials />
          <Faqs />
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
