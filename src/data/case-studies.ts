/* Case studies: built only from what's documented elsewhere in the repo (content.ts, /public
   photos). No invented client quotes or numbers — outcomes stay qualitative until real
   metrics are supplied. */

export type CaseCategory = "Foundation Day" | "Offsite" | "Creative Workshop" | "Wellness";

export type CaseStudy = {
  slug: string;
  client: string;
  title: string;
  category: CaseCategory;
  format: string;
  tags: string[];
  summary: string;
  challenge: string;
  approach: string[];
  outcome: string;
  quote?: { text: string; name: string; role: string };
  cover: { src: string; alt: string };
  gallery: Array<{ src: string; alt: string }>;
};

export const caseCategories: CaseCategory[] = ["Foundation Day", "Offsite", "Creative Workshop", "Wellness"];

export const caseStudies: CaseStudy[] = [
  {
    slug: "happi-planet-foundation-day",
    client: "Happi Planet",
    title: "A fifth anniversary that felt like one long celebration",
    category: "Foundation Day",
    format: "Foundation Day · Stage production",
    tags: ["Comedy set", "Live music", "Cake cutting", "After-party"],
    summary:
      "A full-day Foundation Day production for Happi Planet's fifth anniversary — stage, sound, a comedy set, live music, the cake, and a party that ran into the night.",
    challenge:
      "A milestone anniversary needed to feel bigger than a normal office party, but still like one continuous day rather than a string of separately booked acts.",
    approach: [
      "Built and ran the stage, sound and lighting for the full day under one production crew",
      "Booked and hosted a stand-up comedy set to open the evening",
      "Brought in a live acoustic act to carry the room between the comedy set and dinner",
      "Produced the cake-cutting moment around a giant illuminated number 5",
      "Kept the same crew on through the after-party so the handoff between segments was seamless",
    ],
    outcome:
      "The day moved from stage show to cake to dance floor without a single change of vendor or crew — the kind of continuity that's hard to get when each segment is booked separately.",
    // TODO: add real metrics (attendance, feedback score, repeat-booking rate)
    cover: {
      src: "/photos/foundation-group.jpg",
      alt: "The Happi Planet team gathered on stage beside a giant illuminated 5 at their fifth Foundation Day",
    },
    gallery: [
      { src: "/photos/foundation-group.jpg", alt: "The Happi Planet team gathered on stage beside a giant illuminated 5" },
      { src: "/event-photos/Foundation Day/Copy of Copy of 1E4A7384.JPG", alt: "Two-tier Happi Planet anniversary cake topped with gold spheres and a number 5 candle" },
      { src: "/event-photos/Foundation Day/Copy of Copy of 1E4A7261.JPG", alt: "Stand-up comedian performing in front of the Happi Planet 5th Foundation Day backdrop" },
      { src: "/event-photos/Foundation Day/Copy of Copy of 1E4A7313.JPG", alt: "Musician with an acoustic guitar singing on the Foundation Day stage" },
      { src: "/event-photos/Foundation Day/Copy of Copy of 1E4A7411.JPG", alt: "Colleagues crowding around the table and cheering as the Foundation Day cake is cut" },
      { src: "/event-photos/Foundation Day/Copy of Copy of 1E4A7508.JPG", alt: "Guests throwing their hands up on the dance floor at the Foundation Day after-party" },
    ],
  },
  {
    slug: "happi-planet-beach-offsite",
    client: "Happi Planet",
    title: "A beach offsite built around sport, not sightseeing",
    category: "Offsite",
    format: "Multi-day offsite · Beach",
    tags: ["Cricket", "Beach games", "Team offsite"],
    summary:
      "A beach offsite for Happi Planet centred on cricket and outdoor team games, run from a shared base rather than a loose day-trip itinerary.",
    challenge:
      "Taking a team out of the office for a beach offsite risks turning into unstructured downtime unless the days have a real spine to them.",
    approach: [
      "Anchored the offsite around a full cricket match on the sand as the shared, competitive centrepiece",
      "Ran the group as bibbed teams so the banner and colours carried through every activity",
      "Timed key group moments for the golden-hour light at dusk",
      "Kept the same crew present across the sport, the downtime and the group photography",
    ],
    outcome:
      "The offsite gave the team a single throughline — the match, the colours, the crew — instead of a checklist of separately arranged beach activities.",
    // TODO: add real metrics (participation numbers, satisfaction score)
    cover: { src: "/photos/beach-dusk.jpg", alt: "Team in orange and yellow bibs holding a Happi Planet banner on the beach at dusk" },
    gallery: [
      { src: "/photos/beach-dusk.jpg", alt: "Team in orange and yellow bibs holding a Happi Planet banner on the beach at dusk" },
      { src: "/photos/beach-cricket.jpg", alt: "Colleagues playing a game of cricket on the beach" },
      { src: "/photos/beach-sand.jpg", alt: "Happi Planet written in the sand at the water's edge" },
      { src: "/photos/beach-team.jpg", alt: "Team on the beach during an offsite" },
    ],
  },
  {
    slug: "mystique-ai-creative-workshop",
    client: "Mystique AI",
    title: "Pottery and tote painting, run as one seamless afternoon",
    category: "Creative Workshop",
    format: "Half-day · Creative workshop",
    tags: ["Pottery", "Tote painting", "Team building"],
    summary:
      "A team-building afternoon for Mystique AI combining a pottery-wheel session with hand-painted tote bags, coordinated as a single program rather than two vendor bookings.",
    challenge:
      "Creative workshops can feel disjointed when the wheel session and the painting session come from different suppliers with different pacing.",
    approach: [
      "Sequenced the pottery wheel and tote-painting stations so the group moved through both without idle time",
      "Kept one OneThrive team present throughout for coordination and materials",
      "Left the format loose enough for colleagues to work at their own pace and compare pieces at the end",
    ],
    outcome:
      "Mystique AI's own leadership called out the coordination and the positive presence of the crew as what made the session land — see their quote below.",
    quote: {
      text: "The OneThrive team delivered an exceptionally well-executed team-building program featuring pottery making and tote bag painting, with seamless coordination and a positive team presence that strengthened collaboration, creativity, and overall team morale.",
      name: "Santosh Gopalkrishnan",
      role: "Co-Founder & COO, Mystique AI",
    },
    // TODO: add real metrics
    cover: { src: "/photos/pottery.jpg", alt: "Pottery wheel workshop" },
    gallery: [
      { src: "/photos/pottery.jpg", alt: "Pottery wheel workshop" },
      { src: "/photos/pottery-smile.jpg", alt: "Participant smiling at the pottery wheel" },
      { src: "/photos/tote-line.jpg", alt: "Workshop participants lined up outdoors holding the tote bags they hand-painted" },
    ],
  },
  {
    slug: "in-office-wellness-program",
    client: "In-office wellness program",
    title: "Wellness that came to the desk, not the other way round",
    category: "Wellness",
    format: "In-office · Recurring wellness",
    tags: ["Laughter yoga", "Desk yoga", "Meditation"],
    summary:
      "A rotating in-office wellness program mixing laughter yoga, desk yoga and guided meditation, run in the conference room and at people's own desks.",
    challenge:
      "Wellness sessions are easy to skip when they mean leaving the building or blocking out a big chunk of the day.",
    approach: [
      "Ran laughter yoga sessions in the office to break tension in a low-pressure, group format",
      "Brought desk yoga and stretching directly to people's workstations",
      "Closed sessions with guided meditation and breathing exercises for a calmer reset before the next meeting",
    ],
    outcome:
      "Sessions happened without anyone leaving the building for long, and the desk-side format meant people who'd normally skip a wellness break stayed in the room.",
    // TODO: add real metrics (attendance rate, before/after stress survey)
    cover: {
      src: "/event-photos/Wellness/Laughter Yoga/Copy of IMG_7917.PNG",
      alt: "Colleagues throwing their arms wide and bursting out laughing during a laughter yoga session",
    },
    gallery: [
      { src: "/event-photos/Wellness/Laughter Yoga/Copy of IMG_7917.PNG", alt: "Colleagues throwing their arms wide and bursting out laughing during a laughter yoga session" },
      { src: "/event-photos/Wellness/Laughter Yoga/Copy of IMG_7922.PNG", alt: "Team members in their office chairs cracking up mid laughter yoga exercise" },
      { src: "/photos/desk-yoga.jpg", alt: "Desk yoga session in the office" },
      { src: "/event-photos/Wellness/Meditation/Copy of IMG_0073.PNG", alt: "Woman in a white kurta meditating with her eyes closed at her desk" },
      { src: "/event-photos/Wellness/Meditation/Copy of IMG_7938.PNG", alt: "Group palming their eyes together during a desk meditation break" },
    ],
  },
];
