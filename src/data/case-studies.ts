/* Case studies: copy is taken verbatim from OneThrive_Case_Studies_README.md (sourced from the
   CASE STUDIES PDF). Entries 8–14 are only headings in the source, so they carry no write-up
   (`writeUp` is absent) and the UI simply omits those sections. Fill in the fields once the
   real copy exists; don't invent it. Photos and videos are matched to each event by venue and
   what's visible in them; each study is routed by its number, e.g. /about-us/case-studies/1. */

export type Media = { src: string; alt: string };

export type WriteUp = {
  background: string;
  briefing: string;
  solution: string;
  implementation: string;
  results: string;
  conclusion: string;
};

/* Skimmable digest of a write-up, used by the detail page. Every line is lifted or condensed
   from that study's own `writeUp` copy; nothing here adds facts the write-up doesn't state. */
export type Highlights = {
  /** One line each: the problem, what OneThrive did, how it landed. */
  glance: { challenge: string; approach: string; outcome: string };
  /** The flow of the day / programme, in order. */
  steps: string[];
  /** Everything OneThrive took off the client's plate. */
  handled: string[];
  /** Short result bullets. */
  takeaways: string[];
  /** Reported client feedback, as written in the results copy. */
  feedback: string;
  /** The single line worth remembering, from the conclusion. */
  statement: string;
};

export type CaseStudy = {
  id: number;
  client: string;
  logo: Media;
  activity?: string;
  participants?: string;
  location?: string;
  objective?: string;
  writeUp?: WriteUp;
  highlights?: Highlights;
  cover?: Media;
  photos: Media[];
  video?: { src: string; poster: string };
};

const g = (folder: string, n: string) => `/gallery/${folder}/${folder}-${n}.jpg`;

export const caseStudies: CaseStudy[] = [
  {
    id: 1,
    client: "Zilo",
    logo: { src: "/clients/Zilo_Logo.png", alt: "Zilo" },
    participants: "80 employees",
    activity: "Team Building, Karaoke & DJ Night",
    location: "Sakawar, Maharashtra",
    objective: "Cross-Team Collaboration at One Day Team Outing",
    writeUp: {
      background:
        "ZILO is a Mumbai-based startup that delivers apparel from top brands to customers' doorsteps in under 60 minutes, combining fashion, technology and rapid delivery to create a new-age shopping experience. The platform curates a handpicked selection from over 100 leading national and international brands, blending the speed of instant delivery with the depth of offline collections through home trials, instant returns, and city-specific edits.",
      briefing:
        "The Zilo team wanted the outing to feel like more than just a staycation, while also creating opportunities for employees from different departments to spend time and have fun together.",
      solution:
        "We built a tailored itinerary around the available schedule, filling the gaps with a mix of high-energy activities. For the team building session, we deliberately mixed employees from different departments into teams so that collaboration happened beyond their usual work circles. The intention was to turn the existing stay into a complete one-day team experience.",
      implementation:
        "Team OneThrive handled the entire day on ground; planning the itinerary and activity flow, arranging equipment, and running expert facilitation throughout. We also set up the Karaoke session and brought in a Bolly Techno DJ Night to close out the day before everyone headed home, managing all logistics for both from start to finish.",
      results:
        "The outing gave Zilo's team a chance to step away from their usual work environment and simply enjoy being together. Employees from different departments got to interact through the team activities, while the Karaoke and DJ experiences gave the day a more celebratory finish. The HR team described the experience as both \"memorable\" and \"well organized,\" reflecting how smoothly the day came together despite the packed schedule.",
      conclusion:
        "Zilo already had the destination, travel and stay figured out. OneThrive filled in everything that happened in between into a day packed with interaction, entertainment and shared experiences. It's a good example of how the right activities, placed at the right moments, can turn dead time between meals into the best part of the trip.",
    },
    highlights: {
      glance: {
        challenge: "Make a staycation feel like more than a staycation, and get departments spending time together.",
        approach: "A tailored itinerary of team building, Karaoke and a Bolly Techno DJ Night, with mixed-department teams.",
        outcome: "A packed, celebratory day the HR team called “memorable” and “well organized.”",
      },
      steps: [
        "Built a tailored itinerary around the available schedule",
        "Mixed employees from different departments into teams for team building",
        "Set up a Karaoke session for the team",
        "Closed out the day with a Bolly Techno DJ Night before everyone headed home",
      ],
      handled: [
        "Itinerary & activity flow",
        "Equipment",
        "Expert facilitation",
        "Karaoke setup",
        "Bolly Techno DJ Night",
        "End-to-end logistics",
      ],
      takeaways: [
        "Employees from different departments interacted through the team activities",
        "Karaoke and the DJ gave the day a more celebratory finish",
        "The day came together smoothly despite the packed schedule",
      ],
      feedback: "The HR team described the experience as both “memorable” and “well organized.”",
      statement: "The right activities, placed at the right moments, can turn dead time between meals into the best part of the trip.",
    },
    cover: { src: "/photos/offsite-group.jpg", alt: "The Zilo team gathered on the lawn for a group photo during their outing" },
    photos: [
      { src: g("team-building", "11"), alt: "Zilo team posing behind the balloon shape they built" },
      { src: g("team-building", "17"), alt: "Team leaning back and hauling on the rope in a tug of war" },
      { src: g("team-building", "15"), alt: "Colleagues singing into microphones during the karaoke session" },
      { src: g("team-building", "21"), alt: "Teammates carrying a colleague across the lawn in a net" },
      { src: g("team-building", "13"), alt: "Two colleagues tilting their heads back to balance a red cup" },
      { src: g("team-building", "09"), alt: "Team crouched over a spread of balloons during a building challenge" },
      { src: g("team-building", "16"), alt: "Colleague belting out a song while teammates look on" },
      { src: g("team-building", "08"), alt: "Colleagues gathered round a balloon heart laid out on the lawn" },
    ],
  },
  {
    id: 2,
    client: "Awfis",
    logo: { src: "/clients/Awfis_Logo.png", alt: "Awfis" },
    participants: "20 members",
    activity: "Team Building Session",
    location: "Awfis R City, Ghatkopar",
    objective: "Boost cross-member engagement",
    writeUp: {
      background:
        "Awfis Space Solutions is one of India's leading flexible workspace providers and describes itself as India's largest flexible workspace solutions platform. With 250+ centres across 18 cities and 3,500+ clients, Awfis offers coworking, enterprise and other workplace solutions for businesses and professionals.",
      briefing:
        "Since so many separate companies work out of the same space, the Awfis team felt people mostly stuck to their own teams and rarely interacted with anyone outside it. There was also a history of low interest in events at this location, which made the team cautious about trying something new.",
      solution:
        "OneThrive designed a high-engagement team building session specifically around the participation challenge. Instead of relying on a conventional workshop format, we built an energetic mix of games that encouraged participants to meet, collaborate and compete with people they would not usually interact with.",
      implementation:
        "From planning the event flow and preparing the required equipment to facilitating the activities on-ground, OneThrive managed the session end-to-end. OneThrive also supported Awfis with the marketing and communication, helping spread the word within the space.",
      results:
        "People started joining in steadily as the session went on, with members from several companies taking part by the end. A good number of them were trying a Team Building activity for the very first time, and many said they'd happily come back for another one. The success also gave the Awfis Community team a format they could confidently consider replicating across other centres.",
      conclusion:
        "What started as a one-off session turned into proof of concept. Awfis is now working with OneThrive to bring the same energy to its other coworking spaces nationwide, backed by a session that fixed a turnout problem they had struggled with for a while.",
    },
    highlights: {
      glance: {
        challenge: "Members from many companies rarely mixed, and past events at this location had drawn low interest.",
        approach: "A high-engagement session: an energetic mix of games to meet, collaborate and compete across companies.",
        outcome: "Members from several companies joined in, and Awfis is taking the format to its other spaces.",
      },
      steps: [
        "Designed the session specifically around the participation challenge",
        "Swapped a conventional workshop for an energetic mix of games",
        "Helped spread the word within the space through marketing and communication",
        "Facilitated the activities on-ground",
      ],
      handled: [
        "Event flow",
        "Equipment",
        "On-ground facilitation",
        "Marketing & communication support",
      ],
      takeaways: [
        "People started joining in steadily as the session went on",
        "A good number were trying a Team Building activity for the very first time",
        "Many said they'd happily come back for another one",
      ],
      feedback: "The success gave the Awfis Community team a format they could confidently consider replicating across other centres.",
      statement: "What started as a one-off session turned into proof of concept.",
    },
    cover: { src: "/photos/office-game.jpg", alt: "Awfis members in a circle as a OneThrive host briefs the next game" },
    photos: [
      { src: g("team-building", "38"), alt: "Member balancing a red cup on his forehead during a coworking game" },
      { src: g("team-building", "40"), alt: "Members bent over a table racing to arrange letter cards" },
      { src: g("team-building", "41"), alt: "Participant blowing letter cards across a table in the Awfis lounge" },
    ],
  },
  {
    id: 3,
    client: "DJSCE",
    logo: { src: "/clients/DJSCE_Logo.png", alt: "SVKM's Dwarkadas J. Sanghvi College of Engineering" },
    participants: "50 professors",
    activity: "Stress Management Workshop",
    location: "Vile Parle, Mumbai",
    objective: "Wellness & Rejuvenation for faculty members",
    writeUp: {
      background:
        "SVKM's Dwarkadas J. Sanghvi College of Engineering is one of India's leading engineering institutions, based in Mumbai. Affiliated with the University of Mumbai, DJSCE has consistently been ranked among the top private engineering colleges in the country, known for its strong academics and experienced faculty.",
      briefing:
        "DJSCE wanted us to create a dedicated wellness experience for their faculty and staff to help them de-stress from their everyday academic responsibilities, giving them a chance to step away from the demands of their daily routine. The idea was to offer something practical and refreshing that could help them manage everyday stress and simply slow down.",
      solution:
        "OneThrive put together a Stress Management Workshop that combined movement, mindfulness and relaxation in one flowing experience. The session was led by a facilitator with over 16 years of experience in the space, ensuring the pacing and instructions were well-suited to a room full of first-timers.",
      implementation:
        "OneThrive managed the entire flow of the session on campus. The workshop began with an icebreaker activity to get everyone involved and create a fun atmosphere before moving into desk stretches aimed at releasing physical tension. The pace then gradually shifted towards relaxation, with guided meditation and breathing exercises bringing the session to a calm close. The structure was kept simple and low-pressure, making it easy for faculty members to participate fully without feeling out of their comfort zone.",
      results:
        "The professors engaged actively through every part of the session and left feeling noticeably lighter than when they walked in. Beyond the immediate effect, many found the breathing and stretching exercises useful enough to carry into their daily routine. The Principal, Vice Principal, and TPO all described the session as refreshing, calling it an enjoyable experience for the faculty.",
      conclusion:
        "By bringing together movement, breathing and mindfulness in a single experience, OneThrive created a practical wellness intervention that left the faculty feeling lighter, calmer and better equipped to handle the everyday pressures of work.",
    },
    highlights: {
      glance: {
        challenge: "Help faculty and staff de-stress from everyday academic responsibilities and simply slow down.",
        approach: "A Stress Management Workshop combining movement, mindfulness and relaxation, led by a facilitator with 16+ years of experience.",
        outcome: "Professors left noticeably lighter, with exercises to carry into their daily routine.",
      },
      steps: [
        "An icebreaker to get everyone involved",
        "Desk stretches to release physical tension",
        "Guided meditation",
        "Breathing exercises to bring the session to a calm close",
      ],
      handled: [
        "Full session flow on campus",
        "Facilitator with 16+ years of experience",
        "Simple, low-pressure structure for first-timers",
      ],
      takeaways: [
        "Professors engaged actively through every part of the session",
        "They left feeling noticeably lighter than when they walked in",
        "Many found the breathing and stretching exercises useful enough to carry into their daily routine",
      ],
      feedback: "The Principal, Vice Principal, and TPO all described the session as refreshing, calling it an enjoyable experience for the faculty.",
      statement: "A practical wellness intervention that left the faculty feeling lighter, calmer and better equipped to handle the everyday pressures of work.",
    },
    cover: { src: g("wellness", "14"), alt: "DJSCE faculty reaching overhead in a stretch around the boardroom table" },
    photos: [
      { src: g("wellness", "05"), alt: "Professors standing at the boardroom table for a guided arm stretch" },
      { src: g("wellness", "14"), alt: "Faculty stretching overhead during the stress management workshop" },
    ],
    video: { src: "/vids/DJ Sanghvi Stress Management.mp4", poster: "/case-studies/djsce-poster.jpg" },
  },
  {
    id: 4,
    client: "BDO India",
    logo: { src: "/clients/BDO_Logo.png", alt: "BDO" },
    participants: "850 players (106 teams)",
    activity: "Box Cricket Tournament",
    location: "Mumbai (Goregaon & Lower Parel)",
    objective: "End-to-end sports tournament management",
    writeUp: {
      background:
        "With offices across 14 cities in India, BDO is the world's fifth-largest international professional services network, operating in 166 countries with over 119,000 professionals globally, providing audit, tax, advisory and business services through a global network of member firms.",
      briefing:
        "BDO India wanted to bring its Mumbai teams together through a large-scale Box Cricket Tournament, but the size of the event came with its own set of challenges. With 850+ players participating, the tournament had to be conducted across two locations within just six days, making coordination, scheduling and on-ground execution particularly critical.",
      solution:
        "OneThrive took on complete ownership of the tournament, designing a structure that could handle 100+ teams across two venues without compromising on pace or fairness. We built the tournament structure around the 100+ teams and brought together the vendors, officials and resources needed to run the event effortlessly.",
      implementation:
        "Every moving part of the tournament was managed by OneThrive. This includes venue bookings, team registrations, fixtures and brackets, trophies, professional umpiring and scoring, equipment sourcing, catering, hydration, and full event logistics. Our on-site crew immediately adjusted to last-minute requirements to ensure that the tournament proceeded without any noticeable interruptions.",
      results:
        "The event ran seamlessly across both locations, with no mismanagement despite the colossal scale. BDO's HR team specifically appreciated not having to worry about the operational details themselves, something they'd typically have to manage internally, and called the event excellently coordinated from start to finish.",
      conclusion:
        "Managing a large-scale tournament of this magnitude left very little room for things to go wrong. OneThrive's end-to-end ownership kept the tournament moving smoothly, giving BDO a well-managed sporting experience while taking the load completely off its HR team.",
    },
    highlights: {
      glance: {
        challenge: "850+ players across two locations in just six days, so coordination and scheduling were critical.",
        approach: "Complete ownership: a tournament structure for 100+ teams, plus every vendor, official and resource.",
        outcome: "Ran seamlessly across both locations, with the operational load off BDO's HR team.",
      },
      steps: [
        "Designed a structure to handle 100+ teams across two venues",
        "Brought together the vendors, officials and resources needed",
        "Ran registrations, fixtures and brackets",
        "Adjusted on-site to last-minute requirements without interruptions",
      ],
      handled: [
        "Venue bookings",
        "Team registrations",
        "Fixtures & brackets",
        "Trophies",
        "Professional umpiring & scoring",
        "Equipment sourcing",
        "Catering & hydration",
        "Full event logistics",
      ],
      takeaways: [
        "The event ran seamlessly across both locations",
        "No mismanagement despite the colossal scale",
        "HR didn't have to worry about the operational details themselves",
      ],
      feedback: "BDO's HR team called the event excellently coordinated from start to finish.",
      statement: "End-to-end ownership kept the tournament moving smoothly while taking the load completely off BDO's HR team.",
    },
    cover: { src: g("group-photo", "08"), alt: "A BDO team lined up on the rooftop turf with the Mumbai skyline behind" },
    photos: [
      { src: g("sports", "10"), alt: "Batter taking guard in front of the stumps" },
      { src: g("sports", "03"), alt: "Registration desk and food counter set up beside the turf" },
      { src: g("sports", "16"), alt: "Batter and wicketkeeper mid-match on the turf" },
      { src: g("group-photo", "11"), alt: "BDO team in blue posing under the nets" },
      { src: g("sports", "22"), alt: "View down the pitch as the bowler runs in" },
      { src: g("sports", "15"), alt: "Umpire watching the batter from square leg" },
      { src: g("group-photo", "18"), alt: "Squad kneeling together with their bats" },
      { src: g("sports", "13"), alt: "Two players walking off the field after an innings" },
    ],
    video: { src: "/vids/BDO Cricket Tournament.mp4", poster: "/case-studies/bdo-poster.jpg" },
  },
  {
    id: 5,
    client: "Draeger",
    logo: { src: "/clients/Draeger_Logo.png", alt: "Dräger" },
    participants: "150 players",
    activity: "Annual Sports Day",
    location: "Mumbai (Vasai & Goregaon)",
    objective: "End-to-end sports management",
    writeUp: {
      background:
        "Draeger India is the Indian arm of Dräger, a German multinational that manufactures medical and safety technology products used across healthcare, industry and emergency response. Founded in 1889, Dräger has grown into a worldwide, listed enterprise, with more than 16,000 employees globally and a presence in over 190 countries.",
      briefing:
        "For over a decade, the Draeger team had been organising its Annual Sports Day in-house. This year, the HR team wanted to hand over the execution while retaining the warmth and familiarity that had become part of the event. With activities spread across two locations and two consecutive days, they were looking for a partner who would work alongside them like an extension of the team, rather than operate like an external vendor.",
      solution:
        "OneThrive took on the complete sporting experience across both days. Day 1 at Draeger's Vasai facility covered indoor and outdoor sports including Carrom, Chess, Table Tennis, Badminton and Volleyball, while Day 2 moved to Goregaon for a Box Cricket Tournament. We also looked beyond the players themselves, creating an Engagement Zone for visiting families so that the event remained enjoyable even for those who were not participating in the competitions.",
      implementation:
        "We ran the event end-to-end across both days, including scoring the indoor games, bringing in professional umpires, tracking a live leaderboard across all sports, and managing the full tournament format and match brackets. On the operations side, the team handled turf booking, trophies and equipment, jersey printing and F&B. At the cricket venue, we also created a shaded, well-ventilated seating area to make the summer conditions more comfortable, while the Carnival Zone featured games and stalls that kept the audience entertained. A DJ kept the atmosphere lively throughout, with pyro celebrations adding a finale for the winners.",
      results:
        "The HR team appreciated the management and coordination throughout the event, particularly noting that several elements they had felt were missing from previous editions were successfully addressed this time. The experience allowed Draeger to hand over the operational load without losing the warmth they wanted the Sports Day to retain.",
      conclusion:
        "For a team that had run this event internally for over 10 years, having an external partner not just match but improve on their own standard was a clear marker of how the event landed. OneThrive became an extension of the Draeger team, managing the complexity behind the scenes while adding new layers of engagement that made their Annual Sports Day feel bigger, smoother and more inclusive.",
    },
    highlights: {
      glance: {
        challenge: "Hand over a Sports Day run in-house for over a decade, across two locations and two days, without losing its warmth.",
        approach: "The complete sporting experience, from indoor and outdoor sports to box cricket, plus an Engagement Zone for families.",
        outcome: "Elements missing from previous editions were addressed, and the warmth stayed.",
      },
      steps: [
        "Day 1 at Vasai: Carrom, Chess, Table Tennis, Badminton and Volleyball",
        "Day 2 at Goregaon: a Box Cricket Tournament",
        "An Engagement Zone and Carnival Zone for visiting families",
        "A DJ throughout, with pyro celebrations for the winners",
      ],
      handled: [
        "Indoor game scoring",
        "Professional umpires",
        "Live leaderboard",
        "Tournament format & brackets",
        "Turf booking",
        "Trophies & equipment",
        "Jersey printing",
        "F&B",
        "Shaded seating area",
      ],
      takeaways: [
        "HR appreciated the management and coordination throughout",
        "Several elements missing from previous editions were successfully addressed",
        "Draeger handed over the operational load without losing the warmth",
      ],
      feedback: "The HR team appreciated the management and coordination throughout the event.",
      statement: "For a team that had run this event internally for over 10 years, having an external partner not just match but improve on their own standard was a clear marker of how the event landed.",
    },
    cover: { src: g("sports", "33"), alt: "Winning Draeger team holding a Champions banner under the nets" },
    photos: [
      { src: g("sports", "36"), alt: "Winners receiving the trophy in front of the Draeger Premier League banner" },
      { src: g("sports", "24"), alt: "Shaded seating area under a colourful canopy beside the turf" },
      { src: g("sports", "26"), alt: "Table of trophies lined up for the Sports Day winners" },
      { src: g("carnival", "12"), alt: "Cotton candy being spun at the Carnival Zone" },
      { src: g("carnival", "15"), alt: "Participant holding up his caricature at the turf" },
      { src: g("sports", "30"), alt: "Team kneeling with their trophies after the final" },
      { src: g("group-photo", "19"), alt: "Team in matching orange jerseys before the tournament" },
      { src: g("sports", "34"), alt: "Team in pink jerseys posing with their trophies" },
    ],
    video: { src: "/vids/Draeger Sports Tournament.mp4", poster: "/case-studies/draeger-poster.jpg" },
  },
  {
    id: 6,
    client: "IIFL Capital",
    logo: { src: "/clients/IIFL Capital_Logo.png", alt: "IIFL Capital" },
    participants: "100+ employees",
    activity: "Christmas Carnival",
    location: "Mumbai (Andheri)",
    objective: "Festive Celebration for Christmas",
    writeUp: {
      background:
        "IIFL Capital Services Limited is one of India's leading independent full-service broking houses. The company offers a wide range of financial services, including brokerage, wealth management, and financial product distribution, with assets under management exceeding ₹2,205 billion, serving over 3 million customers in India.",
      briefing:
        "The IIFL Capital team wanted to do something festive without splitting employees into different batches or activities. The brief was to create an engaging Christmas experience where a large number of employees could participate at their Andheri office at the same time, while keeping the atmosphere lively and distinctly different from a regular office day.",
      solution:
        "OneThrive turned the celebration into a 5-hour Carnival, bringing together multiple games, interactive stalls and entertainment under one roof. The mix was designed to give employees the freedom to move between activities at their own pace, with something to appeal to both the competitive and creative sides of the team. We also took care of the venue décor to give the space a proper Christmas feel.",
      implementation:
        "The carnival featured Cotton Candy, Balloon Shooting, Catch the Sticks, Buzz Wire and a Live Caricature Artist, with the different attractions running throughout the entire experience. We managed the complete setup, on-ground coordination and vendor management, ensuring the activities remained accessible to employees while the venue itself was transformed for the occasion.",
      results:
        "The HR team found the event very well managed, with the setup allowing all employees to be engaged simultaneously. Attendees devoured the candy floss, took home their caricatures as keepsakes, and got competitive across the various games, turning a single afternoon into a memorable, office-wide celebration.",
      conclusion:
        "A large single-location celebration can easily turn into a logistical headache if not planned right. Instead, IIFL's Christmas Carnival became a smooth, high-energy event that brought their entire Andheri office together in one go. It's a strong example of how the right mix of activities can make a large-scale office celebration feel effortless.",
    },
    highlights: {
      glance: {
        challenge: "A festive Christmas experience for a large number of employees at the same time, without splitting them into batches.",
        approach: "A 5-hour Carnival of games, interactive stalls and entertainment, with Christmas décor, under one roof.",
        outcome: "All employees engaged simultaneously in one office-wide celebration.",
      },
      steps: [
        "Transformed the venue with Christmas décor",
        "Set up multiple games and interactive stalls",
        "Let employees move between activities at their own pace",
        "Kept every attraction running for the full 5 hours",
      ],
      handled: [
        "Cotton Candy",
        "Balloon Shooting",
        "Catch the Sticks",
        "Buzz Wire",
        "Live Caricature Artist",
        "Venue décor",
        "Vendor management",
        "On-ground coordination",
      ],
      takeaways: [
        "Attendees devoured the candy floss",
        "They took home their caricatures as keepsakes",
        "Everyone got competitive across the various games",
      ],
      feedback: "The HR team found the event very well managed, with the setup allowing all employees to be engaged simultaneously.",
      statement: "The right mix of activities can make a large-scale office celebration feel effortless.",
    },
    cover: { src: g("carnival", "21"), alt: "Office corridor dressed for Christmas with balloons, stars and a Merry Christmas banner" },
    photos: [
      { src: g("carnival", "24"), alt: "Two colleagues biting into cotton candy" },
      { src: g("carnival", "23"), alt: "Colleague aiming at the balloon shooting board" },
      { src: g("carnival", "22"), alt: "Employee steadying the loop on the buzz wire game" },
      { src: g("carnival", "25"), alt: "Employee holding up his live caricature" },
      { src: g("carnival", "17"), alt: "Colleagues watching a round of catch the sticks" },
      { src: g("carnival", "27"), alt: "Employee showing off his caricature beside the Christmas balloons" },
      { src: g("carnival", "18"), alt: "Colleagues gathered in the decorated office during the carnival" },
    ],
    video: { src: "/vids/IIFL Capital Christmas Carnival.mp4", poster: "/case-studies/iifl-poster.jpg" },
  },
  {
    id: 7,
    client: "Prisma AI",
    logo: { src: "/clients/Prisma Ai_Logo.png", alt: "Prisma AI" },
    participants: "110+ employees",
    activity: "Dandiya Decoration & Garba WS",
    location: "Mumbai",
    objective: "Festive Celebration for Navratri",
    writeUp: {
      background:
        "Prisma AI is a global visual AI company developing computer vision and AI-powered solutions for applications across mobility, security and other industries. With a strong focus on innovation and creativity, the company brings the same energy into how it engages its own workforce, through initiatives that feel as original as its technology.",
      briefing:
        "The Prisma AI team wanted to celebrate Navratri at their workplace in a way that engaged all employees at once, but had little interest in the usual formula of putting on a Garba playlist and letting people figure it out themselves. They were looking for something genuinely original, while also making sure employees who did not know how to play Garba could participate instead of becoming spectators.",
      solution:
        "OneThrive curated a two-part experience built around creativity and participation. The celebration began with a Dandiya Decoration Workshop, where each employee could personalise their own pair of sticks and take them home as a souvenir. This was followed by a high-energy guided Garba Workshop, designed to teach even complete beginners the basics before bringing everyone together for the dance.",
      implementation:
        "We brought the entire concept to life, from sourcing the Dandiya sticks, decorative materials and craft supplies to arranging the professional facilitator and prizes for their winners. The Garba segment was structured so that beginners could follow along without feeling out of place.",
      results:
        "The HR team found the session highly energetic and a clear departure from their usual celebrations. The overall response was strong enough that the HR team said they'd readily recommend the format to others.",
      conclusion:
        "The format gave employees two very different ways to participate. Some got creative with their Dandiya, others discovered they could actually pull off a few Garba steps, and eventually the audience became part of the dance floor. Everyone had something to do, something to learn or something to take home.",
    },
    highlights: {
      glance: {
        challenge: "Celebrate Navratri in a genuinely original way, without leaving people who didn't know Garba as spectators.",
        approach: "A two-part experience: a Dandiya Decoration Workshop, then a guided Garba Workshop for complete beginners.",
        outcome: "A highly energetic departure from the usual, which HR would readily recommend.",
      },
      steps: [
        "Dandiya Decoration Workshop: everyone personalised their own pair of sticks",
        "The sticks went home as a souvenir",
        "A guided Garba Workshop taught complete beginners the basics",
        "Everyone came together for the dance",
      ],
      handled: [
        "Dandiya sticks",
        "Decorative materials & craft supplies",
        "Professional facilitator",
        "Prizes for the winners",
      ],
      takeaways: [
        "A clear departure from their usual celebrations",
        "Beginners could follow along without feeling out of place",
        "The response was strong enough that HR would readily recommend the format",
      ],
      feedback: "The HR team found the session highly energetic and a clear departure from their usual celebrations.",
      statement: "Everyone had something to do, something to learn or something to take home.",
    },
    cover: { src: g("festive-celebration-navratri", "10"), alt: "Prisma AI colleagues in chaniya cholis dancing garba across the office floor" },
    photos: [
      { src: g("festive-celebration-navratri", "01"), alt: "Colleagues decorating dandiya sticks with ribbon at their desks" },
      { src: g("festive-celebration-navratri", "08"), alt: "Two colleagues holding up their finished dandiyas" },
      { src: g("festive-celebration-navratri", "11"), alt: "Colleagues clapping along to garba between the desks" },
      { src: g("festive-celebration-navratri", "03"), alt: "Employees choosing ribbons and trims from the craft table" },
      { src: g("festive-celebration-navratri", "12"), alt: "Colleagues in kurtas dancing with their hands in the air" },
      { src: g("festive-celebration-navratri", "14"), alt: "Colleague in yellow holding up a pair of decorated dandiyas" },
      { src: g("festive-celebration-navratri", "13"), alt: "The whole Prisma AI office gathered for a Navratri group photo" },
    ],
    video: { src: "/vids/Prisma AI Navratri.mp4", poster: "/case-studies/prisma-poster.jpg" },
  },
  {
    id: 8,
    client: "Happi Planet",
    logo: { src: "/clients/Happi Planet Logo_Green.PNG", alt: "Happi Planet" },
    activity: "Team Offsite",
    location: "Goa",
    cover: { src: "/photos/beach-dusk.jpg", alt: "Happi Planet team in bibs holding their banner on the beach at dusk" },
    photos: [
      { src: "/photos/beach-cricket.jpg", alt: "Colleagues playing cricket on the beach" },
      { src: g("offsite", "02"), alt: "Welcome hampers with handwritten notes waiting in guests' rooms" },
      { src: "/photos/beach-sand.jpg", alt: "Happi Planet written in the sand at the water's edge" },
      { src: g("team-building", "31"), alt: "Team games laid out with cones on the sand" },
      { src: g("creative-workshop-big-picture", "11"), alt: "The Happi Planet mural the team painted together" },
      { src: g("offsite", "12"), alt: "Offsite roastbook slide: every team member was respectfully disrespected" },
      { src: g("team-building", "35"), alt: "Teammates carrying a colleague across the sand in a net" },
      { src: g("group-photo", "23"), alt: "Offsite group holding the Happi Planet banner in the hotel ballroom" },
      { src: g("offsite", "15"), alt: "Dance floor lit red at the offsite party" },
    ],
    video: { src: "/vids/Happi Planet Goa Offsite.mp4", poster: "/case-studies/happi-offsite-poster.jpg" },
  },
  {
    id: 9,
    client: "Infytrix",
    logo: { src: "/clients/Infytrix Logo.png", alt: "Infytrix" },
    activity: "Yoga Day",
    cover: { src: g("wellness-laughter-yoga", "04"), alt: "Infytrix colleagues throwing their arms wide during laughter yoga" },
    photos: [
      { src: g("wellness-laughter-yoga", "06"), alt: "Colleagues raising their hands overhead at their desks" },
      { src: g("wellness-meditation", "08"), alt: "Team palming their eyes together during a desk meditation" },
      { src: g("team-building", "30"), alt: "Colleague crouched over a cluster of blue balloons" },
      { src: g("wellness-laughter-yoga", "05"), alt: "Team members in their office chairs cracking up mid laughter yoga" },
      { src: g("wellness-meditation", "04"), alt: "Colleagues sitting with their eyes closed during meditation" },
      { src: g("team-building", "29"), alt: "Colleagues working a pile of green balloons in a team game" },
    ],
    video: { src: "/vids/Infytrix Yoga Day.mp4", poster: "/case-studies/infytrix-poster.jpg" },
  },
  {
    id: 10,
    client: "Ingenero Technologies",
    logo: { src: "/clients/Ingenero Technologies_Logo.png", alt: "Ingenero Technologies" },
    photos: [],
  },
  {
    id: 11,
    client: "SalesDuo",
    logo: { src: "/clients/SalesDuo_Logo.png", alt: "SalesDuo" },
    activity: "Team Building Session",
    cover: { src: g("team-building", "25"), alt: "SalesDuo colleagues passing a ball along a chute in the hotel ballroom" },
    photos: [
      { src: g("team-building", "23"), alt: "Colleague with sticky notes on his back during a collaboration challenge" },
      { src: g("team-building", "22"), alt: "Blindfolded colleagues waiting for their turn in the ballroom" },
    ],
    video: { src: "/vids/SalesDuo.mp4", poster: "/case-studies/salesduo-poster.jpg" },
  },
  {
    id: 12,
    client: "Laxmi Dental Limited",
    logo: { src: "/clients/Laxmi Dental Limited_Logo.png", alt: "Laxmi Dental Limited" },
    activity: "Pottery, Tote Painting & Team Games",
    cover: { src: "/photos/tote-line.jpg", alt: "Laxmi Dental team lined up outdoors holding the tote bags they painted" },
    photos: [
      { src: "/photos/pottery-smile.jpg", alt: "Participant smiling at the pottery wheel" },
      { src: g("creative-workshop-tote-bag-painting", "07"), alt: "Two colleagues showing off their painted tote bags" },
      { src: g("team-building", "36"), alt: "Team building a balloon figure under the canopy" },
      { src: "/photos/pottery.jpg", alt: "Pottery wheel session under the tent" },
      { src: g("creative-workshop-tote-bag-painting", "03"), alt: "Participant holding the clay pot she shaped" },
      { src: g("team-building", "37"), alt: "Colleagues cheering together under the canopy" },
      { src: g("creative-workshop-pottery", "07"), alt: "Participant proudly holding up her finished pot" },
    ],
    video: { src: "/vids/Laxmi Dental Limited.mp4", poster: "/case-studies/laxmi-poster.jpg" },
  },
  {
    id: 13,
    client: "Ingenero Technologies",
    logo: { src: "/clients/Ingenero Technologies_Logo.png", alt: "Ingenero Technologies" },
    photos: [],
  },
  {
    id: 14,
    client: "Happi Planet",
    logo: { src: "/clients/Happi Planet Logo_Green.PNG", alt: "Happi Planet" },
    activity: "Foundation Day Celebration",
    cover: { src: "/photos/foundation-group.jpg", alt: "The Happi Planet team on stage beside a giant illuminated 5 at their Foundation Day" },
    photos: [
      { src: g("foundation-day", "14"), alt: "Two-tier Happi Planet anniversary cake with a number 5 topper" },
      { src: g("foundation-day", "07"), alt: "Stand-up comedian performing in front of the Foundation Day backdrop" },
      { src: g("foundation-day", "10"), alt: "Two colleagues doubled over laughing during the comedy set" },
      { src: g("foundation-day", "13"), alt: "Musician with an acoustic guitar on the Foundation Day stage" },
      { src: g("foundation-day", "15"), alt: "Colleagues crowding around the table as the cake is cut" },
      { src: g("foundation-day", "18"), alt: "Guests on the dance floor at the after-party" },
      { src: g("foundation-day", "01"), alt: "Banquet hall set up for the Foundation Day celebration" },
      { src: g("foundation-day", "20"), alt: "Colleague throwing his hands up at the after-party" },
    ],
    video: { src: "/vids/Happi Planet Foundation Day.mp4", poster: "/photos/foundation-group.jpg" },
  },
];

export const caseStudyHref = (id: number) => `/about-us/case-studies/${id}`;

export const getCaseStudy = (id: string) => caseStudies.find((study) => String(study.id) === id);
