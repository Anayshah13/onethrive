/* Blog posts at /blogs/{slug}. Starter articles are written only from OneThrive's own material:
   the activity catalogue (activities.txt), destinations (locations.txt) and FAQs (faqs.txt).
   They carry no statistics, client names or quotes the source doesn't state; review the copy
   before launch and add new posts to the top of `blogPosts` (newest first). */

export type Media = { src: string; alt: string };

export const blogCategories = ["Planning", "Wellness", "Team Building", "Remote Teams", "Celebrations"] as const;

export type BlogCategory = (typeof blogCategories)[number];

/* The body is a list of blocks so the post page can style each one. Every `heading` becomes an
   entry in the post's "On this page" list. */
export type BlogBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "list"; items: string[]; ordered?: boolean }
  | { type: "quote"; text: string }
  | { type: "callout"; title: string; text: string }
  | { type: "image"; image: Media; caption?: string };

export type BlogPost = {
  slug: string;
  title: string;
  /** Trailing words of the title, set in the serif accent on the post hero. */
  accent: string;
  excerpt: string;
  category: BlogCategory;
  /** ISO date, YYYY-MM-DD. */
  date: string;
  author: string;
  cover: Media;
  body: BlogBlock[];
};

const AUTHOR = "The OneThrive crew";

export const blogPosts: BlogPost[] = [
  {
    slug: "plan-a-team-offsite-people-remember",
    title: "How to plan a team offsite",
    accent: "people actually remember",
    excerpt:
      "Start with the outcome, not the venue. A practical planning order for offsites, from the brief to the last bus home.",
    category: "Planning",
    date: "2026-09-24",
    author: AUTHOR,
    cover: { src: "/gallery/offsite/offsite-14.jpg", alt: "Colleagues dancing at the offsite night" },
    body: [
      {
        type: "paragraph",
        text: "Most offsites are planned backwards. Someone picks a resort, someone else books a DJ, and the agenda gets filled in the week before. The day happens, the photos look nice, and nothing about how the team works together changes. It doesn't have to go that way.",
      },
      { type: "heading", text: "Start with the outcome" },
      {
        type: "paragraph",
        text: "Before you look at a single venue, write down what should be different after the offsite. New teams that need to trust each other? A leadership group that needs to align on the year? A team that's simply tired and needs a reset? Each of those is a different day, and the activity is just the starting point.",
      },
      {
        type: "callout",
        title: "A one-line brief",
        text: "Finish this sentence before anything else: \"After this offsite, our team will...\" If you can't, the venue doesn't matter yet.",
      },
      { type: "heading", text: "Pick a destination that fits the headcount" },
      {
        type: "paragraph",
        text: "Distance is a trade-off between novelty and travel fatigue. A one-day outing works best within driving range of the office; a multi-day offsite earns a flight. A few options we run across India and abroad:",
      },
      {
        type: "list",
        items: [
          "Close to the city: Alibaug and Karjat near Mumbai, Sohna and Manesar near Delhi",
          "Hills and forests: Jim Corbett, Nainital, Mussoorie, Manali, Shimla, Coorg",
          "Heritage and desert: Udaipur, Jaipur, Jaisalmer, Jodhpur",
          "Coast: Goa, Kochi, Pondicherry, Andaman & Nicobar",
          "International: Dubai, Thailand, Sri Lanka, Singapore, Vietnam, Bali",
        ],
      },
      { type: "heading", text: "Build the day around energy, not a timetable" },
      {
        type: "paragraph",
        text: "A good programme rises and falls. Open with a light icebreaker so people from different teams actually talk, put the high-energy team building in the middle of the day, slow down with something reflective or creative, and save the party for the night.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Arrival and an icebreaker that mixes teams",
          "Team building challenges while energy is highest",
          "A slower block: a workshop, a wellness session or open time",
          "An evening of entertainment: karaoke, a DJ, a live act",
        ],
      },
      {
        type: "image",
        image: { src: "/gallery/offsite/offsite-15.jpg", alt: "Dance floor lit red at the offsite party" },
        caption: "Save the loudest part of the day for last.",
      },
      { type: "heading", text: "Give yourself enough lead time" },
      {
        type: "paragraph",
        text: "We recommend booking at least two to three weeks ahead so there's time for proper planning and availability. For larger or customised programmes, bringing a partner in earlier only makes the outcome stronger: more venue options, better rates and room to tailor the format.",
      },
      { type: "heading", text: "Hand off the logistics" },
      {
        type: "paragraph",
        text: "The person organising the offsite should get to enjoy it too. Travel, stay, food, facilitation, sound and the schedule on the day are a lot to stitch together across five vendors. Working with one partner end to end means one relationship, one plan and one number to call.",
      },
      {
        type: "quote",
        text: "The activity is just the starting point. What you're really building is a workplace people don't want to leave.",
      },
    ],
  },
  {
    slug: "workplace-wellness-beyond-the-yoga-mat",
    title: "Workplace wellness,",
    accent: "beyond the yoga mat",
    excerpt:
      "Wellness at work doesn't need a studio or a day off. Formats that fit inside an office, a conference room or a regular workday.",
    category: "Wellness",
    date: "2026-09-10",
    author: AUTHOR,
    cover: { src: "/gallery/wellness/wellness-14.jpg", alt: "Boardroom full of employees reaching overhead in a desk yoga session" },
    body: [
      {
        type: "paragraph",
        text: "When companies think about wellness, they often picture a once-a-year yoga session on a lawn. That's a nice day, but wellbeing is built in small, regular moments that fit into the week people already have. Some of our most effective sessions have happened in ordinary conference rooms.",
      },
      { type: "heading", text: "Start where people already sit" },
      {
        type: "paragraph",
        text: "Chair and desk yoga is the easiest entry point: no mats, no change of clothes, no one has to leave the floor. A short session of stretches and breathing between meetings is something people can repeat on their own afterwards.",
      },
      {
        type: "image",
        image: { src: "/gallery/wellness/wellness-13.jpg", alt: "Colleagues standing for a stretch between their desks" },
        caption: "A stretch break, right between the desks.",
      },
      { type: "heading", text: "Laughter counts as wellness" },
      {
        type: "paragraph",
        text: "Laughter yoga sounds odd until you're in the room. It starts with deliberate, playful laughter exercises and usually turns into the real thing within minutes. It's one of the quickest ways to change the mood of a team, and it needs nothing but space to stand.",
      },
      { type: "heading", text: "Make room for slower formats" },
      {
        type: "paragraph",
        text: "Not every session needs to be high energy. Guided meditation, sound healing and yoga for better sleep give people a skill to take home, which matters more than a single good afternoon.",
      },
      { type: "heading", text: "What a wellness calendar can include" },
      {
        type: "list",
        items: [
          "Chair or desk yoga and mat yoga",
          "Mindful meditation and stress management",
          "Laughter yoga and yogic games",
          "Sound healing and yoga for good sleep",
          "Dance fitness, Zumba and aerobics",
          "Yoga with art therapy, face yoga and nutrition guidance",
        ],
      },
      {
        type: "callout",
        title: "Make it a rhythm",
        text: "A monthly rotation of short formats tends to do more than one big wellness day. Mix active sessions with calmer ones so different people find something that fits.",
      },
    ],
  },
  {
    slug: "icebreakers-that-dont-make-people-cringe",
    title: "Icebreakers that don't",
    accent: "make people cringe",
    excerpt:
      "The first ten minutes decide how the rest of the session goes. How to choose an icebreaker that gets people talking instead of checking their phones.",
    category: "Team Building",
    date: "2026-08-27",
    author: AUTHOR,
    cover: { src: "/gallery/team-building/team-building-11.jpg", alt: "Team posing behind the balloon wall they built" },
    body: [
      {
        type: "paragraph",
        text: "Everyone has sat through an icebreaker that made the room colder. The usual culprit is asking people to perform before they feel safe: share a personal fact with forty strangers, or do something silly with no warm-up. A good icebreaker lowers the stakes instead of raising them.",
      },
      { type: "heading", text: "What makes an icebreaker work" },
      {
        type: "list",
        items: [
          "Everyone takes part at once, so no one is put on the spot alone",
          "It mixes teams that don't usually talk",
          "It has a clear, simple goal people grasp in seconds",
          "It's short, and it leads into whatever comes next",
        ],
      },
      { type: "heading", text: "Formats we reach for" },
      {
        type: "paragraph",
        text: "Human Bingo gets people moving around the room looking for colleagues who match a square, which turns small talk into a game. Speed Networking pairs people up for quick rounds, ideal when new joiners and old hands are in the same room. One Word Story and the Storytelling Circle build something together, one contribution at a time, so the group finishes with a shared joke.",
      },
      {
        type: "image",
        image: { src: "/gallery/team-building/team-building-13.jpg", alt: "Two colleagues tilting their heads back to balance a red cup" },
        caption: "Silly is fine once the room is warm.",
      },
      { type: "heading", text: "Then move into team building" },
      {
        type: "paragraph",
        text: "An icebreaker is the warm-up, not the workout. Once people are talking, move straight into challenges that need the group to plan and cooperate, like building a paper tower, untangling a human knot or guiding a blindfolded teammate through a minefield. The trust built in the first ten minutes is what makes those work.",
      },
      {
        type: "callout",
        title: "Read the room",
        text: "Pick the icebreaker for the group you have, not the one you wish you had. A quiet team needs a gentler start than a sales floor.",
      },
    ],
  },
  {
    slug: "remote-team-engagement-that-works",
    title: "Remote team engagement",
    accent: "that actually works",
    excerpt:
      "Distance doesn't have to mean disconnection. What makes a virtual session feel like a room, and the formats that get cameras switched on.",
    category: "Remote Teams",
    date: "2026-08-13",
    author: AUTHOR,
    cover: { src: "/gallery/virtual/virtual-01.jpg", alt: "Video call grid of remote employees raising their arms in a virtual session" },
    body: [
      {
        type: "paragraph",
        text: "Remote and hybrid teams lose the small, unplanned moments that build connection in an office: the chat by the coffee machine, the lunch that runs long. A virtual session can't replace all of that, but a well-run one creates the same sense of belonging as an in-person room.",
      },
      { type: "heading", text: "Why most virtual events fall flat" },
      {
        type: "paragraph",
        text: "The common failure is treating a virtual event like a webinar: one host talking, everyone else on mute with cameras off. People engage when they have something to do, a team to do it with and a reason to speak.",
      },
      { type: "heading", text: "What works on a video call" },
      {
        type: "list",
        items: [
          "Small teams in breakout rooms, so everyone has a role",
          "Competition with a visible scoreboard",
          "Short rounds that keep the pace up",
          "A host who calls on people by name and keeps the energy going",
        ],
      },
      {
        type: "image",
        image: { src: "/gallery/virtual/virtual-03.jpg", alt: "Remote team waving along with the host on a video call" },
        caption: "Cameras on, because there's a reason to be.",
      },
      { type: "heading", text: "Formats built for remote teams" },
      {
        type: "paragraph",
        text: "Quiz-style games like trivia and game-show formats work well because teams can confer in breakout rooms. Social deduction games, where some players are secretly working against the group, get people talking and accusing each other in the best way. Creative challenges on a shared canvas give quieter people a way to shine without speaking much.",
      },
      {
        type: "callout",
        title: "Remember wellness",
        text: "Virtual sessions don't have to be games. A guided wellness session on camera gives a remote team a shared break in the middle of the workday.",
      },
    ],
  },
  {
    slug: "festive-celebrations-at-the-office",
    title: "Festive celebrations",
    accent: "at the office",
    excerpt:
      "Navratri, Diwali, Christmas and everything between. How to celebrate festivals at work so everyone feels included.",
    category: "Celebrations",
    date: "2026-07-30",
    author: AUTHOR,
    cover: {
      src: "/gallery/festive-celebration-navratri/festive-celebration-navratri-10.jpg",
      alt: "Colleagues in chaniya cholis dancing garba across the office floor",
    },
    body: [
      {
        type: "paragraph",
        text: "Festivals are one of the easiest times to bring a team together, because the reason to celebrate already exists. Done well, a festive day at the office feels like a small holiday. Done badly, it's a cake in the pantry and an email.",
      },
      { type: "heading", text: "Plan around the festival, not the calendar invite" },
      {
        type: "paragraph",
        text: "Give people a reason to dress up and something to do once they arrive. A garba session for Navratri, a decoration workshop before Diwali or a themed Christmas afternoon gives the day a shape.",
      },
      {
        type: "image",
        image: {
          src: "/gallery/festive-celebration-navratri/festive-celebration-navratri-11.jpg",
          alt: "Colleagues clapping along to garba between the desks",
        },
        caption: "Garba, right between the desks.",
      },
      { type: "heading", text: "Make it hands-on" },
      {
        type: "paragraph",
        text: "Creative workshops work especially well around festivals: everyone makes something, and they take it home. Painting, pottery, candle and scent making, and decorating together are calm enough for those who don't want to dance, and still social.",
      },
      { type: "heading", text: "Keep it inclusive" },
      {
        type: "list",
        items: [
          "Invite everyone, and make clear that joining in is optional",
          "Mix activities: some loud, some quiet, some creative",
          "Celebrate a range of festivals across the year, not just one",
          "Keep the food simple and suited to different diets",
        ],
      },
      {
        type: "callout",
        title: "Book early in festive season",
        text: "Festive weeks fill up quickly. Bring your partner in a few weeks ahead so the day is planned, not improvised.",
      },
    ],
  },
  {
    slug: "one-engagement-partner-instead-of-five",
    title: "Why one engagement partner",
    accent: "beats five vendors",
    excerpt:
      "Sports, wellness, workshops, offsites and parties usually mean a different vendor for each. What changes when it all comes from one place.",
    category: "Planning",
    date: "2026-07-16",
    author: AUTHOR,
    cover: { src: "/gallery/foundation-day/foundation-day-12.jpg", alt: "Guests at round tables applauding the performers" },
    body: [
      {
        type: "paragraph",
        text: "Most companies in the employee engagement space offer one thing. So HR teams end up with one vendor for the sports league, another for wellness, a third for the offsite and a fourth for the annual party. Each one has its own contract, its own quality bar and its own way of working.",
      },
      { type: "heading", text: "The hidden cost of many vendors" },
      {
        type: "list",
        items: [
          "More briefs, more calls and more invoices for the same team",
          "Inconsistent experiences that don't feel like one programme",
          "Nobody with the full picture of what's working and what isn't",
          "Gaps on the day when one vendor's part ends and another's begins",
        ],
      },
      { type: "heading", text: "What one partner changes" },
      {
        type: "paragraph",
        text: "With one partner, you manage one relationship instead of five, and everything stays consistent because it comes from the same place. The same crew that ran your cricket league knows your team when it's time to plan the offsite.",
      },
      {
        type: "image",
        image: { src: "/gallery/foundation-day/foundation-day-13.jpg", alt: "Musician with an acoustic guitar on the Foundation Day stage" },
        caption: "From the stage to the sports field, one crew.",
      },
      { type: "heading", text: "End to end means end to end" },
      {
        type: "paragraph",
        text: "From planning and logistics to execution on the day, the whole thing comes off your plate. You aren't stitching things together yourself, and you get to be a guest at your own event.",
      },
      { type: "heading", text: "Measure what it did" },
      {
        type: "paragraph",
        text: "One partner can also tell you what the year of events achieved. Combining participant feedback and engagement data with post-event insights shows what landed and what to improve in the next programme.",
      },
      {
        type: "quote",
        text: "A generic programme can't solve a specific problem, so every engagement should be shaped around your team's size, context and objectives.",
      },
    ],
  },
];

export const blogHref = (slug: string) => `/blogs/${slug}`;

export const getPost = (slug: string) => blogPosts.find((post) => post.slug === slug);

/** Same-category posts first, then the most recent of the rest. */
export function relatedPosts(post: BlogPost, count = 3) {
  const others = blogPosts.filter((p) => p.slug !== post.slug);
  const same = others.filter((p) => p.category === post.category);
  const rest = others.filter((p) => p.category !== post.category);
  return [...same, ...rest].slice(0, count);
}

/** Minutes to read at ~220 words a minute, never less than one. */
export function readingTime(post: BlogPost) {
  const text = post.body
    .map((block) =>
      block.type === "list" ? block.items.join(" ") : block.type === "image" ? (block.caption ?? "") : `${"title" in block ? block.title : ""} ${block.text}`,
    )
    .join(" ");
  return Math.max(1, Math.round(text.split(/\s+/).filter(Boolean).length / 220));
}

export const formatDate = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });

/** Stable anchor id for a heading block. */
export const headingId = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
