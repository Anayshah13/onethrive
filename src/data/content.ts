export const nav = [
  { label: "Why OneThrive", href: "#promise" },
  { label: "Services", href: "#offer" },
  { label: "Destinations", href: "#destinations" },
  { label: "Gallery", href: "#moments" },
] as const;

export const contact = {
  phone: "+91 88502 10248",
  phoneHref: "tel:+918850210248",
  email: "info@onethrive.in",
} as const;

export const stats = [
  { value: 50, suffix: "+", label: "events curated" },
  { value: 2000, suffix: "+", label: "participants engaged" },
] as const;

export const rating = { score: "4.9", label: "Trusted by teams across all sectors" } as const;

export const aboutCopy =
  "We design offsites that improve how teams work together. Each one is shaped around your team's context, goals, and dynamics.";

/* "The crew" section: the Gen Z team behind OneThrive. */
export const crew = {
  eyebrow: "The crew",
  heading: { lead: "Young team. Serious about how", accent: "your team works." },
  intro:
    "We're India's first Gen Z-led employee engagement company. The people who plan your day are the ones who show up and run it.",
  principles: [
    {
      title: "One team, not five vendors",
      body: "Sports, wellness, workshops and the party after. One relationship, one standard.",
    },
    {
      title: "Built around your goals",
      body: "No templates. Every format is shaped around your team's size, context and what the day should change.",
    },
    {
      title: "In the room, start to finish",
      body: "Planning, logistics and the day itself. We take it off your plate so you're not stitching it together.",
    },
  ],
  photos: [
    {
      src: "/photos/onethrive-crew.jpg",
      alt: "Five OneThrive team members in black branded tees beside the OneThrive banner at a turf",
    },
    {
      src: "/photos/onethrive-duo.jpg",
      alt: "Two OneThrive team members with arms crossed beside the OneThrive banner",
    },
    {
      src: "/photos/happi-planet-wall.jpg",
      alt: "The Happi Planet team with the mural they painted together at a OneThrive workshop",
    },
  ],
} as const;

export const heroSlides = [
  { src: "/photos/stage-artist.jpg", alt: "A performer on stage at a client foundation day" },
  { src: "/photos/offsite-group.jpg", alt: "A full offsite group gathered on a lawn" },
  { src: "/photos/party.jpg", alt: "Colleagues dancing at an evening celebration" },
  { src: "/photos/champions.jpg", alt: "A corporate cricket league's winning team with the trophy" },
] as const;

export const clients = [
  { src: "/clients/Mystique AI_Logo.png", alt: "Mystique AI" },
  { src: "/clients/BDO_Logo.png", alt: "BDO" },
  { src: "/clients/Awfis_Logo.png", alt: "Awfis" },
  { src: "/clients/IIFL Capital_Logo.png", alt: "IIFL Capital" },
  { src: "/clients/Draeger_Logo.png", alt: "Draeger" },
  { src: "/clients/Happi Planet Logo_Green.PNG", alt: "Happi Planet" },
  { src: "/clients/VGuard Logo.png", alt: "V-Guard" },
  { src: "/clients/Prisma Ai_Logo.png", alt: "Prisma AI" },
  { src: "/clients/Glide Tech Logo.png", alt: "Glide Tech" },
  { src: "/clients/Zilo_Logo.png", alt: "Zilo" },
  { src: "/clients/SalesDuo_Logo.png", alt: "SalesDuo" },
  { src: "/clients/Ingenero Technologies_Logo.png", alt: "Ingenero" },
  { src: "/clients/Laxmi Dental Limited_Logo.png", alt: "Laxmi Dental" },
  { src: "/clients/Infytrix Logo.png", alt: "Infytrix" },
  { src: "/clients/Konsultera_Logo.png", alt: "Konsultera" },
  { src: "/clients/SF Edu Logo.png", alt: "Silver Fern Education" },
  { src: "/clients/EDS Intenational_Logo.png", alt: "EDS International" },
  { src: "/clients/DJSCE_Logo.png", alt: "DJSCE" },
] as const;

/* Services, in display order. Rendered by the landing "Services" section (offer.tsx). */
export const offers = [
  {
    title: "Team Building",
    image: "/photos/balloon-build.jpg",
    blurb: "Facilitated challenges that sharpen collaboration, trust and communication across teams.",
    tags: ["Indoor & outdoor", "Problem solving", "Leadership"],
  },
  {
    title: "Offsite",
    image: "/photos/offsite-group.jpg",
    blurb: "End-to-end retreats and conferences, planned around your agenda and run on the ground by us.",
    tags: ["Retreats", "Conferences", "Destination planning"],
  },
  {
    title: "Wellness",
    image: "/photos/desk-yoga.jpg",
    blurb: "Guided sessions that help people reset, recharge and return to work with clearer focus.",
    tags: ["Yoga", "Meditation", "Mental wellbeing"],
  },
  {
    title: "Creative Workshops",
    image: "/photos/tote-line.jpg",
    blurb: "Hands-on, expert-led workshops where every participant leaves with something they made.",
    tags: ["Pottery", "Art & craft", "Painting"],
  },
  {
    title: "Sports Tournaments",
    image: "/photos/champions.jpg",
    blurb: "Fully managed leagues and tournaments, from fixtures and venues to referees and trophies.",
    tags: ["Cricket", "Football", "Multi-sport leagues"],
  },
] as const;

export type Region =
  | "East India"
  | "North India"
  | "West India"
  | "South India"
  | "International";

export const regions: Array<"All" | Region> = [
  "All",
  "East India",
  "North India",
  "West India",
  "South India",
  "International",
];

export const destinations: Array<{
  name: string;
  region: Region;
  image?: string;
}> = [
  { name: "Goa", region: "South India", image: "/destinations/goa.jpg" },
  { name: "Kerala", region: "South India", image: "/destinations/kerala.jpg" },
  { name: "Thailand", region: "International", image: "/destinations/thailand-longtail.jpg" },
  { name: "Jaipur", region: "West India", image: "/destinations/jaipur.jpg" },
  { name: "Udaipur", region: "West India", image: "/destinations/udaipur-lake.jpg" },
  { name: "Dubai", region: "International", image: "/destinations/dubai.jpg" },
  { name: "Manali", region: "North India", image: "/destinations/manali.jpg" },
  { name: "Bali", region: "International", image: "/destinations/bali.jpg" },
  { name: "Leh Ladakh", region: "North India", image: "/destinations/leh.jpg" },
  { name: "Singapore", region: "International", image: "/destinations/singapore.jpg" },
  { name: "Andaman & Nicobar", region: "South India", image: "/destinations/andaman.jpg" },
  { name: "Vietnam", region: "International", image: "/destinations/vietnam.jpg" },
  { name: "Kolkata", region: "East India" },
  { name: "Sohna / Manesar", region: "North India" },
  { name: "Jim Corbett", region: "North India" },
  { name: "Nainital", region: "North India" },
  { name: "Mussoorie", region: "North India" },
  { name: "Shimla", region: "North India" },
  { name: "Dehradun", region: "North India" },
  { name: "Palampur", region: "North India" },
  { name: "Ranthambore", region: "West India" },
  { name: "Sariska", region: "West India" },
  { name: "Jaisalmer", region: "West India" },
  { name: "Jodhpur", region: "West India" },
  { name: "Alibaug", region: "West India" },
  { name: "Karjat", region: "West India" },
  { name: "Bengaluru", region: "South India" },
  { name: "Coorg", region: "South India" },
  { name: "Kochi", region: "South India" },
  { name: "Chennai", region: "South India" },
  { name: "Hyderabad", region: "South India" },
  { name: "Pondicherry", region: "South India" },
  { name: "Sri Lanka", region: "International" },
];

export const activities: Array<{ category: string; items: string[] }> = [
  {
    category: "Office Olympics",
    items: [
      "Fastest Finger First",
      "Chain Reaction",
      "Stationery Sprint",
      "The Flight Club",
      "The Straw-lympics",
      "Chair Force One",
      "The Tug Life",
      "Sticky Situation",
    ],
  },
  {
    category: "Wellness",
    items: [
      "Mat Yoga",
      "Chair/Desk Yoga",
      "Stress Management",
      "Dance Fitness",
      "Zumba",
      "Aerobics",
      "Sound Healing",
      "Yoga for Good Sleep",
      "Yoga + Art Therapy",
      "Yogic Games",
      "Mindful Meditation",
      "Nutrition Guidance",
      "Laughter Yoga",
      "Yoga Katha",
      "Face Yoga",
    ],
  },
  {
    category: "Ice Breakers",
    items: [
      "Human Bingo",
      "Speed Networking",
      "One Word Story",
      "The Quiet Queue",
      "Storytelling Circle",
      "The Number Game",
    ],
  },
  {
    category: "Team Building",
    items: [
      "Down To Earth",
      "Human Knot",
      "Paper Tower Build",
      "The Great Inflation",
      "Chopsticks Relay",
      "Flip The Cups",
      "Flying Fox",
      "Bridge The Gap",
      "Human Ladder",
      "Minefield",
      "The Order Disorder",
      "Fast & Curious",
      "Sync Or Swim",
      "Board Of Directors",
      "The Domino Effect",
      "Chain Reaction",
      "Puzzle Hustle",
      "Shape Shifters",
      "Tied Together",
      "Motion Potion",
      "Mini Metropolis",
      "The Missing CEO",
      "Sheep & Shepherd",
      "Frostbite",
      "The Da Vinci Code",
      "The Search Warrant",
      "Trivia",
      "Blind Drawing",
      "Caught in Transit",
      "Game Of Throws",
      "Record Breakers",
      "The Great Eggscape",
      "Giant Board Game",
      "Giant Dare Jenga",
      "Cricket Auction",
    ],
  },
  {
    category: "Creative Workshop",
    items: [
      "Clayground",
      "The Wheel Deal",
      "Pottery In Motion",
      "Art Attack",
      "Stroke Of Genius",
      "Tote-ally Artsy",
      "Connect The Dots",
      "The Big Picture",
      "Wall Of Fame",
      "Paint the Town Red",
      "Bubble Trouble",
      "Scents of Success",
      "Brace Yourselves",
      "Shiny Side Up",
      "Boogie Woogie",
    ],
  },
  {
    category: "Sports Events",
    items: [
      "Power Play",
      "Pitch Perfect",
      "Work Hard, Play Messi",
      "Net Flicks & Chill",
      "The Pickle Punch",
      "Net Positive",
      "Shoot Your Shot",
      "The Dart Knight Rises",
      "KPIs To KMs",
      "Ctrl + Alt + Defeat",
      "Suits To Sneakers",
    ],
  },
  {
    category: "Virtual Activities",
    items: [
      "The Classic Trivia",
      "Corporate Royale",
      "Agent Intel",
      "Action! The Game",
      "The Traitors",
      "Jeoparty",
      "The Digital Decathlon",
      "The Hot Seat",
      "Corporate Feud",
      "The Canvas Challenge",
      "The Wheel of Fortune",
    ],
  },
  {
    category: "Entertainment",
    items: [
      "The Winning Edge",
      "Sing It Out!",
      "Mic Check",
      "Office Unplugged",
      "The Office Gig",
      "Carnival",
      "Movie Screening",
    ],
  },
  {
    category: "Festive Celebrations",
    items: [
      "Tiny Tree Takeover",
      "Raise Your Spirits",
      "Merry Whisk-mas",
      "Ink Outside the Box",
      "Glow With The Flow",
      "The Ring Masters",
      "Santa's Soundcheck",
    ],
  },
];

export const activityCount = activities.reduce((sum, group) => sum + group.items.length, 0);

export const testimonials = [
  {
    quote:
      "The OneThrive team delivered an exceptionally well-executed team-building program featuring pottery making and tote bag painting, with seamless coordination and a positive team presence that strengthened collaboration, creativity, and overall team morale.",
    name: "Santosh Gopalkrishnan",
    role: "Co-Founder & COO, Mystique AI",
    initials: "SG",
  },
  // TODO: placeholder quotes; replace with real client testimonials before launch.
  {
    quote:
      "Sports in the morning, a studio after lunch, one team running both. We stopped juggling five vendors.",
    name: "HR Lead",
    role: "Growing startup",
    initials: "HR",
  },
  {
    quote:
      "They shaped the offsite around our goals, not a template. The room felt like ours from the first hour.",
    name: "Founder's Office",
    role: "Multi-city team",
    initials: "FO",
  },
] as const;

export const gallery = [
  { src: "/photos/pottery.jpg", alt: "Pottery wheel workshop" },
  { src: "/photos/beach-team.jpg", alt: "Team on the beach during an offsite" },
  { src: "/photos/tug-of-war.jpg", alt: "Tug of war on the lawn" },
  { src: "/photos/laughter.jpg", alt: "Laughter yoga in the office" },
  { src: "/photos/navratri.jpg", alt: "Navratri celebration at the office" },
  { src: "/photos/trophies.jpg", alt: "Trophies lined up for a cricket league" },
  { src: "/photos/net-lift.jpg", alt: "Team carrying a colleague in a cargo net" },
  { src: "/photos/caricature.jpg", alt: "Guest holding a live caricature" },
] as const;

export const momentCategories = [
  "Foundation Day",
  "Team Building",
  "Wellness",
  "Festive & Craft",
  "Offsites",
  "Sports",
  "Virtual",
] as const;

export type MomentCategory = (typeof momentCategories)[number];

/* Tile shape in the bento grid: tall spans two rows, wide spans two columns. */
export type MomentShape = "tall" | "wide" | "square";

/* Photos from past events. The `featured` ones make up the curated "All" view. */
export const moments: Array<{
  src: string;
  alt: string;
  category: MomentCategory;
  shape: MomentShape;
  featured?: boolean;
}> = [
  // Foundation Day
  { src: "/photos/foundation-group.jpg", alt: "The Happi Planet team gathered on stage beside a giant illuminated 5 at their fifth Foundation Day", category: "Foundation Day", shape: "wide", featured: true },
  { src: "/event-photos/Foundation Day/Copy of Copy of 1E4A7384.JPG", alt: "Two-tier Happi Planet anniversary cake topped with gold spheres and a number 5 candle", category: "Foundation Day", shape: "tall", featured: true },
  { src: "/event-photos/Foundation Day/Copy of Copy of 1E4A7268.JPG", alt: "Two colleagues at a dinner table doubled over laughing during a comedy set", category: "Foundation Day", shape: "wide", featured: true },
  { src: "/event-photos/Foundation Day/Copy of Copy of 1E4A7261.JPG", alt: "Stand-up comedian performing in front of the Happi Planet 5th Foundation Day backdrop", category: "Foundation Day", shape: "square" },
  { src: "/event-photos/Foundation Day/Copy of Copy of 1E4A7313.JPG", alt: "Musician with an acoustic guitar singing on the Foundation Day stage", category: "Foundation Day", shape: "tall" },
  { src: "/event-photos/Foundation Day/Copy of Copy of 1E4A7411.JPG", alt: "Colleagues crowding around the table and cheering as the Foundation Day cake is cut", category: "Foundation Day", shape: "wide" },
  { src: "/event-photos/Foundation Day/Copy of Copy of 1E4A7508.JPG", alt: "Guests throwing their hands up on the dance floor at the Foundation Day after-party", category: "Foundation Day", shape: "square" },

  // Foundation Day: carnival
  { src: "/event-photos/Carnival/Copy of Copy of 1E4A7342.JPG", alt: "Guest swinging a mallet at a high-striker strength game at an indoor carnival", category: "Foundation Day", shape: "wide", featured: true },
  { src: "/event-photos/Carnival/Copy of Copy of 1E4A7185.JPG", alt: "Smiling guest showing off red and white face paint", category: "Foundation Day", shape: "tall" },
  { src: "/event-photos/Carnival/Copy of Copy of 1E4A7164.JPG", alt: "Grinning guest mid-throw at a carnival game stall under bright hanging lights", category: "Foundation Day", shape: "wide" },
  { src: "/event-photos/Carnival/Copy of Copy of 1E4A7341.JPG", alt: "Guest holding up her freshly drawn live caricature", category: "Foundation Day", shape: "tall" },
  { src: "/photos/cotton-candy.jpg", alt: "Two colleagues biting into pink cotton candy", category: "Foundation Day", shape: "tall" },
  { src: "/event-photos/Carnival/Copy of Copy of 1E4A7536.JPG", alt: "Printed photo-booth strips laid out on a table for guests to collect", category: "Foundation Day", shape: "wide" },

  // Team Building
  { src: "/photos/net-lift-2.jpg", alt: "Teammates carrying a colleague across the turf in a green cargo net", category: "Team Building", shape: "tall", featured: true },
  { src: "/event-photos/Team Building/Copy of IMG_9784.JPG", alt: "Colleagues holding up balloons under a festive canopy at an outdoor team day", category: "Team Building", shape: "wide", featured: true },
  { src: "/event-photos/Team Building/Copy of IMG_1939.PNG", alt: "Team leaning back and hauling on the rope in an outdoor tug of war", category: "Team Building", shape: "square" },
  { src: "/photos/cup-game.jpg", alt: "Two teammates tilting their heads back to balance a red cup in a relay game", category: "Team Building", shape: "tall" },
  { src: "/event-photos/Team Building/Copy of IMG_7912.PNG", alt: "Team huddled over a pile of green balloons, racing to finish a balloon build", category: "Team Building", shape: "tall" },
  { src: "/event-photos/Team Building/IMG_1970.PNG", alt: "Players bent over a table, racing to blow letter tiles into place in an office word game", category: "Team Building", shape: "square" },
  { src: "/event-photos/Team Building/Copy of Copy of Team 1 Group Photo.JPG", alt: "Team posing with the newspaper tower they built during a build challenge", category: "Team Building", shape: "tall" },

  // Wellness
  { src: "/event-photos/Wellness/Laughter Yoga/Copy of IMG_7917.PNG", alt: "Colleagues throwing their arms wide and bursting out laughing during a laughter yoga session", category: "Wellness", shape: "tall", featured: true },
  { src: "/event-photos/Wellness/Copy of 1db73692-5982-4444-9bc5-99d083fff72f.jpg", alt: "Employees at their desks with hands on their chests during a guided breathing session", category: "Wellness", shape: "tall", featured: true },
  { src: "/event-photos/Wellness/Laughter Yoga/Copy of IMG_7922.PNG", alt: "Team members in their office chairs cracking up mid laughter yoga exercise", category: "Wellness", shape: "tall" },
  { src: "/event-photos/Wellness/Copy of IMG_7940.PNG", alt: "Employees stretching their arms overhead from their office chairs", category: "Wellness", shape: "tall" },
  { src: "/event-photos/Wellness/Meditation/Copy of IMG_0073.PNG", alt: "Woman in a white kurta meditating with her eyes closed at her desk", category: "Wellness", shape: "tall" },
  { src: "/event-photos/Wellness/Meditation/Copy of IMG_7938.PNG", alt: "Group palming their eyes together during a desk meditation break", category: "Wellness", shape: "tall" },

  // Festive & Craft
  { src: "/photos/navratri-dance.jpg", alt: "Colleagues in chaniya cholis and kurtas dancing garba across the office floor for Navratri", category: "Festive & Craft", shape: "wide", featured: true },
  { src: "/event-photos/Creative Workshop/Pottery/Copy of IMG_8981.PNG", alt: "Smiling participant holding up a clay diya at a pottery workshop", category: "Festive & Craft", shape: "tall", featured: true },
  { src: "/event-photos/Festive Celebration/Navratri/Copy of Mirror Decoration(1).JPG", alt: "Colleague decorating a dandiya stick with ribbons and mirror work at her desk", category: "Festive & Craft", shape: "tall" },
  { src: "/event-photos/Festive Celebration/Navratri/Copy of IMG_20251001_165001284_HDR.jpg", alt: "Colleagues wrapping dandiya sticks in coloured ribbon ahead of Navratri", category: "Festive & Craft", shape: "tall" },
  { src: "/event-photos/Creative Workshop/Big Picture/Copy of IMG_5062.JPG", alt: "Participant painting a canvas at an art workshop", category: "Festive & Craft", shape: "tall" },
  { src: "/photos/tote-line.jpg", alt: "Workshop participants lined up outdoors holding the tote bags they hand-painted", category: "Festive & Craft", shape: "wide" },

  // Offsites
  { src: "/photos/beach-dusk.jpg", alt: "Team in orange and yellow bibs holding a Happi Planet banner on the beach at dusk", category: "Offsites", shape: "tall", featured: true },
  { src: "/photos/beach-cricket.jpg", alt: "Colleagues playing a game of cricket on the beach", category: "Sports", shape: "wide", featured: true },
  { src: "/photos/cricket-bat.jpg", alt: "Batter mid-swing in a box cricket match under the nets", category: "Sports", shape: "tall" },
  { src: "/photos/beach-sand.jpg", alt: "Happi Planet written in the sand at the water's edge", category: "Offsites", shape: "tall" },
  { src: "/photos/offsite-talk.jpg", alt: "Speaker presenting to the team during an offsite session", category: "Offsites", shape: "tall" },
  { src: "/event-photos/Team Building/Copy of IMG_1907.PNG", alt: "Colleagues gathered on an artificial turf ground under the nets before a sports-day game", category: "Sports", shape: "tall" },

  // Virtual
  { src: "/event-photos/Virtual/Copy of IMG_010.png", alt: "Video call grid of remote employees raising their arms during a virtual yoga session", category: "Virtual", shape: "wide", featured: true },
  { src: "/event-photos/Virtual/Copy of IMG_023.png", alt: "Instructor in a OneThrive tee leading a virtual session while the team follows on camera", category: "Virtual", shape: "wide" },
  { src: "/event-photos/Virtual/Copy of IMG_029.png", alt: "Remote team members gesturing along with the host on a video call", category: "Virtual", shape: "wide" },
  { src: "/event-photos/Virtual/Copy of IMG_038.png", alt: "Host with hands folded in namaste closing a virtual wellness session", category: "Virtual", shape: "wide" },
];

export const faqs = [
  {
    q: "What does OneThrive do?",
    a: "OneThrive is India's first Gen Z-led employee engagement company, delivering experiences that drive real outcomes, better retention and stronger team cohesion. The activity is just the starting point; what we're really building is a workplace people don't want to leave.",
  },
  {
    q: "What kind of activities do you offer?",
    a: "We cover the full spectrum of employee engagement, from a one-hour team building session to a multi-day offsite. Whatever your team is looking for, there's a good chance we've already built something for it.",
  },
  {
    q: "What makes OneThrive different from other team-building companies?",
    a: "Most companies in this space offer just one thing, so you end up juggling a different vendor for sports, another for wellness, and so on. We bring all of that under one roof, so you're managing one relationship instead of five, and everything stays consistent because it's coming from the same place.",
  },
  {
    q: "Which cities do you operate in?",
    a: "We are active across most major cities in India, and we've handled programs running simultaneously across multiple locations too. Wherever your teams sit, we can reach them.",
  },
  {
    q: "What group sizes do you work with?",
    a: "From a tight team of ten to an enterprise-wide gathering of thousands, our formats scale without losing their intent. Just let us know your headcount and we'll design accordingly.",
  },
  {
    q: "Can you conduct sessions at our office?",
    a: "Absolutely. We're built to work within your existing space just as well as outside it. Some of our most effective sessions have happened in ordinary conference rooms.",
  },
  {
    q: "Do you also offer virtual options for remote teams?",
    a: "Distance doesn't have to mean disconnection. We've built formats specifically for remote and hybrid teams that create the same sense of belonging as an in-person room.",
  },
  {
    q: "How much do your programs cost?",
    a: "There's no fixed price tag. Pricing generally depends on the group size, location, duration and how much customization goes in. Share your requirements and we'll put together a tailored quote for you.",
  },
  {
    q: "How far in advance should we book?",
    a: "We recommend booking at least 2-3 weeks ahead to ensure availability and proper planning. For larger initiatives or customized programs, bringing us in earlier only makes the outcome stronger.",
  },
  {
    q: "Can you customize the activities for our team?",
    a: "Always. A generic program can't solve a specific problem, so we shape every engagement around your team's size, context, and objectives.",
  },
  {
    q: "Can you handle the entire event, end-to-end?",
    a: "Yes, that's really the point of working with us. From planning and logistics to execution on the day, we take it off your plate entirely so you're not stitching things together yourself.",
  },
  {
    q: "How do you measure the success of a program?",
    a: "We combine participant feedback and engagement data with post-event insights to evaluate what the experience achieved and identify opportunities to improve future programs.",
  },
] as const;
