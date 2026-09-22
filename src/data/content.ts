export const nav = [
  { label: "Offsites", href: "#destinations" },
  { label: "About", href: "#about" },
  { label: "Team", href: "#team" },
  { label: "Blog", href: "#journal" },
  { label: "Contact", href: "#contact" },
] as const;

export const stats = [
  { value: 50, suffix: "+", label: "cities covered" },
  { value: 2000, suffix: "+", label: "professionals" },
] as const;

export const aboutCopy =
  "We design offsites that improve how teams work together. Each one is shaped around your team's context, goals, and dynamics.";

export const clients = [
  { src: "/clients/BDO_Logo.png", alt: "BDO" },
  { src: "/clients/Awfis_Logo.png", alt: "Awfis" },
  { src: "/clients/IIFL Capital_Logo.png", alt: "IIFL Capital" },
  { src: "/clients/Draeger_Logo.png", alt: "Draeger" },
  { src: "/clients/Zilo_Logo.png", alt: "Zilo" },
  { src: "/clients/Prisma Ai_Logo.png", alt: "Prisma AI" },
  { src: "/clients/Glide Tech Logo.png", alt: "Glide Tech" },
  { src: "/clients/Happi Planet Logo_Green.PNG", alt: "Happi Planet" },
  { src: "/clients/SalesDuo_Logo.png", alt: "SalesDuo" },
  { src: "/clients/VGuard Logo.png", alt: "V-Guard" },
  { src: "/clients/Ingenero Technologies_Logo.png", alt: "Ingenero" },
  { src: "/clients/Laxmi Dental Limited_Logo.png", alt: "Laxmi Dental" },
  { src: "/clients/DJSCE_Logo.png", alt: "DJSCE" },
  { src: "/clients/Infytrix Logo.png", alt: "Infytrix" },
  { src: "/clients/Konsultera_Logo.png", alt: "Konsultera" },
  { src: "/clients/SF Edu Logo.png", alt: "SF Edu" },
  { src: "/clients/EDS Intenational_Logo.png", alt: "EDS International" },
] as const;

export const offers = [
  {
    title: "Offsites",
    image: "/destinations/goa.jpg",
    blurb: "Multi-day retreats shaped around how your team actually works.",
  },
  {
    title: "Team Building",
    image: "/event-photos/Team Building/Copy of IMG_7914.PNG",
    blurb: "Games and challenges that get a room moving in the same direction.",
  },
  {
    title: "Wellness",
    image: "/event-photos/Wellness/Meditation/Copy of IMG_7931.PNG",
    blurb: "Yoga, sound, and sessions people feel the next morning.",
  },
  {
    title: "Day Outs",
    image: "/event-photos/Carnival/Copy of Copy of 1E4A7342.JPG",
    blurb: "A single day, fully hosted, from the first icebreaker to the last photo.",
  },
  {
    title: "Event Production",
    image: "/event-photos/Foundation Day/Copy of Copy of 1E4A7061.JPG",
    blurb: "Foundation days, carnivals, and celebrations run end to end.",
  },
  {
    title: "Creative Workshops",
    image: "/event-photos/Creative Workshop/Pottery/Copy of IMG_8981.PNG",
    blurb: "Hands-on studios — clay, paint, and a wall everyone made together.",
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
      "The activity was just the starting point. We left with a team that actually talks to each other again.",
    name: "People partner",
    role: "Product company",
    image: "/event-photos/Group Photo/Copy of Copy of Group Photo.JPG",
    frames: [
      "/destinations/kerala.jpg",
      "/event-photos/Team Building/IMG_1973.PNG",
      "/destinations/manali.jpg",
    ],
  },
  {
    quote:
      "Sports in the morning, a studio after lunch, one team running both. We stopped juggling five vendors.",
    name: "HR lead",
    role: "Growing startup",
    image: "/event-photos/Wellness/Laughter Yoga/Copy of IMG_7922.PNG",
    frames: [
      "/event-photos/Creative Workshop/Big Picture/Copy of IMG_5062.JPG",
      "/destinations/jaipur.jpg",
      "/event-photos/Carnival/Copy of Copy of 1E4A7160.JPG",
    ],
  },
  {
    quote:
      "They shaped the offsite around our goals, not a template. The room felt like ours from the first hour.",
    name: "Founder's office",
    role: "Multi-city team",
    image: "/event-photos/Team Building/Copy of IMG_1939.PNG",
    frames: [
      "/destinations/udaipur.jpg",
      "/event-photos/Festive Celebration/Navratri/Copy of IMG_20251001_165001284_HDR.jpg",
      "/destinations/bali.jpg",
    ],
  },
] as const;

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

export const journal = [
  {
    title: "What a conference room can still do",
    caption: "Some of the sharpest sessions happen without leaving the building.",
    image: "/event-photos/Team Building/Copy of IMG_1940.PNG",
  },
  {
    title: "A foundation day, fully hosted",
    caption: "One relationship from the run of show to the last chair.",
    image: "/event-photos/Foundation Day/Copy of Copy of 1E4A7202.JPG",
  },
  {
    title: "Remote, and still in the room",
    caption: "Formats built so hybrid teams feel the same pull.",
    image: "/event-photos/Virtual/Copy of IMG_023.png",
  },
] as const;
