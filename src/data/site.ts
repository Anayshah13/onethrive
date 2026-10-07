/* Site-wide navigation: in-page anchors on the home page plus the standalone routes. */

import { serviceHref, services, servicesRoot } from "./services";

export type NavLink = { label: string; href: string };

/* An entry inside a header dropdown. */
export type SubLink = NavLink & { blurb: string; index: string; image?: string };

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

export const aboutRoot = { label: "About Us", href: "/about-us" } as const;

export const contactRoute = { label: "Contact", href: "/contact-us" } as const;

export const galleryRoute = { label: "Gallery", href: "/gallery" } as const;

export const blogsRoute = { label: "Blogs", href: "/blogs" } as const;

export { servicesRoot };

export const serviceSections: SubLink[] = services.map((service) => ({
  label: service.label,
  href: serviceHref(service.slug),
  blurb: service.blurb,
  index: service.index,
  image: service.image.src,
}));

/* Header order. `children` turns an item into a dropdown. */
export const headerNav: Array<NavLink & { children?: ReadonlyArray<SubLink> }> = [
  { ...aboutRoot, children: aboutSections },
  { ...servicesRoot, children: serviceSections },
  { label: "Destinations", href: "#destinations" },
  galleryRoute,
  blogsRoute,
];

export const isHash = (href: string) => href.startsWith("#");
