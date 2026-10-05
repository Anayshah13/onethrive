/* Site-wide navigation: in-page anchors on the home page plus the standalone routes. */

export type NavLink = { label: string; href: string };

export const aboutSections = [
  {
    label: "Our story",
    href: "/about-us/our-story",
    blurb: "How a Gen Z crew set out to fix the team day.",
    index: "01",
  },
  {
    label: "Why us",
    href: "/about-us/why-us",
    blurb: "One partner for sports, wellness, workshops and the party after.",
    index: "02",
  },
  {
    label: "Testimonials",
    href: "/about-us/testimonials",
    blurb: "What HR leads and founders say after the day.",
    index: "03",
  },
  {
    label: "Case studies",
    href: "/about-us/case-studies",
    blurb: "Real briefs, the formats we built, and what changed.",
    index: "04",
  },
] as const;

export const aboutRoot = { label: "About us", href: "/about-us" } as const;

export const contactRoute = { label: "Contact", href: "/contact-us" } as const;

export const galleryRoute = { label: "Gallery", href: "/gallery" } as const;

/* Header order. `children` turns an item into a dropdown. */
export const headerNav: Array<NavLink & { children?: ReadonlyArray<(typeof aboutSections)[number]> }> = [
  { ...aboutRoot, children: aboutSections },
  { label: "Services", href: "#offer" },
  { label: "Destinations", href: "#destinations" },
  galleryRoute,
];

export const isHash = (href: string) => href.startsWith("#");
