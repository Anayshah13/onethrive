"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { ScrollTrigger } from "@/lib/gsap";
import { Footer } from "@/components/landing/footer";
import { Header } from "@/components/landing/header";
import { resetScroll, SmoothScroll } from "@/components/landing/smooth-scroll";
import { ContactFab, TalkDrawer, TalkProvider } from "@/components/landing/talk";

/* Chrome shared by every standalone page: header, footer, contact drawer, smooth scroll, grain. */
export function PageShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // The shell persists across client navigations, so reset scroll and triggers per page.
  useEffect(() => {
    resetScroll();
    const id = window.requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => window.cancelAnimationFrame(id);
  }, [pathname]);

  return (
    <TalkProvider>
      <SmoothScroll />
      <div className="relative overflow-x-clip bg-cream text-ink">
        <Header />
        <main>{children}</main>
        <Footer />
      </div>
      <ContactFab />
      <TalkDrawer />
      <div className="grain" aria-hidden />
    </TalkProvider>
  );
}
