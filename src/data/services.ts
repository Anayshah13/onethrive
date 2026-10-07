/* Service pages: one entry per route under /services. Copy reuses the landing "Services" blurbs and
   tags (content.ts `offers`); media is pulled by reference — gallery folders, activity groups and
   case-study ids — so new photos, activities or studies show up here without editing this file. */

export type Service = {
  slug: string;
  label: string;
  index: string;
  /** One line for the header dropdown and the next-service card. */
  blurb: string;
  /** Hero heading: plain lead, then the serif accent. */
  lead: string;
  accent: string;
  intro: string;
  tags: string[];
  image: { src: string; alt: string };
  /** Folders under /public/gallery whose photos belong to this service. */
  galleryFolders: string[];
  /** `activities[].category` names from content.ts. */
  activityGroups: string[];
  /** Case-study ids; their reels and covers become this page's proof. */
  caseStudyIds: number[];
  /** Show the destinations grid (offsites only). */
  destinations?: boolean;
};

export const services: Service[] = [
  {
    slug: "team-building",
    label: "Team Building",
    index: "01",
    blurb: "Facilitated challenges for collaboration and trust.",
    lead: "Games with",
    accent: "a point to them.",
    intro: "Facilitated challenges that sharpen collaboration, trust and communication across teams.",
    tags: ["Indoor & outdoor", "Problem solving", "Leadership"],
    image: { src: "/photos/balloon-build.jpg", alt: "Team racing to finish a balloon build" },
    galleryFolders: ["team-building"],
    activityGroups: ["Team Building", "Office Olympics", "Ice Breakers"],
    caseStudyIds: [1, 2, 11],
  },
  {
    slug: "offsites",
    label: "Offsites",
    index: "02",
    blurb: "Retreats and conferences, run on the ground by us.",
    lead: "Offsites that",
    accent: "feel like yours.",
    intro: "End-to-end retreats and conferences, planned around your agenda and run on the ground by us.",
    tags: ["Retreats", "Conferences", "Destination planning"],
    image: { src: "/photos/offsite-group.jpg", alt: "A full offsite group gathered on a lawn" },
    galleryFolders: ["offsite", "group-photo"],
    activityGroups: ["Entertainment"],
    caseStudyIds: [8],
    destinations: true,
  },
  {
    slug: "wellness",
    label: "Wellness",
    index: "03",
    blurb: "Yoga, meditation and sessions that help people reset.",
    lead: "A reset,",
    accent: "built into the workday.",
    intro: "Guided sessions that help people reset, recharge and return to work with clearer focus.",
    tags: ["Yoga", "Meditation", "Mental wellbeing"],
    image: { src: "/photos/desk-yoga.jpg", alt: "Colleagues following a desk yoga session" },
    galleryFolders: ["wellness", "wellness-laughter-yoga", "wellness-meditation"],
    activityGroups: ["Wellness"],
    caseStudyIds: [3, 9],
  },
  {
    slug: "creative-workshops",
    label: "Creative Workshops",
    index: "04",
    blurb: "Pottery, painting and craft, led by experts.",
    lead: "Everyone leaves",
    accent: "with something they made.",
    intro: "Hands-on, expert-led workshops where every participant leaves with something they made.",
    tags: ["Pottery", "Art & craft", "Painting"],
    image: { src: "/photos/tote-line.jpg", alt: "Participants holding up the tote bags they hand-painted" },
    galleryFolders: [
      "creative-workshop-pottery",
      "creative-workshop-big-picture",
      "creative-workshop-tote-bag-painting",
      "festive-celebration-navratri",
    ],
    activityGroups: ["Creative Workshop", "Festive Celebrations"],
    caseStudyIds: [7, 12],
  },
  {
    slug: "sports-tournaments",
    label: "Sports Tournaments",
    index: "05",
    blurb: "Leagues and tournaments, fixtures to trophies.",
    lead: "Leagues run",
    accent: "like the real thing.",
    intro: "Fully managed leagues and tournaments, from fixtures and venues to referees and trophies.",
    tags: ["Cricket", "Football", "Multi-sport leagues"],
    image: { src: "/photos/champions.jpg", alt: "A corporate cricket league's winning team with the trophy" },
    galleryFolders: ["sports"],
    activityGroups: ["Sports Events"],
    caseStudyIds: [4, 5],
  },
  {
    slug: "virtual",
    label: "Virtual",
    index: "06",
    blurb: "Formats built for remote and hybrid teams.",
    lead: "Distance without",
    accent: "the disconnect.",
    intro:
      "Formats built specifically for remote and hybrid teams that create the same sense of belonging as an in-person room.",
    tags: ["Remote teams", "Hybrid", "Live-hosted"],
    image: { src: "/gallery/virtual/virtual-01.jpg", alt: "Video call grid of remote employees raising their arms" },
    galleryFolders: ["virtual"],
    activityGroups: ["Virtual Activities"],
    caseStudyIds: [],
  },
];

export const servicesRoot = { label: "Services", href: "/services" } as const;

export const serviceHref = (slug: string) => `${servicesRoot.href}/${slug}`;

export const getService = (slug: string) => services.find((service) => service.slug === slug);
