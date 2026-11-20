export type EventDetailsVariantId =
  | 'editorial-banner'
  | 'split-showcase'
  | 'full-bleed-tickets';

export interface EventDetailsVariantMeta {
  id: EventDetailsVariantId;
  name: string;
  description: string;
}

export const EVENT_DETAILS_VARIANTS: Record<EventDetailsVariantId, EventDetailsVariantMeta> = {
  'editorial-banner': {
    id: 'editorial-banner',
    name: 'Editorial Banner',
    description:
      'Classic full-width hero banner above a two-column layout with event story, host info, and venue map.',
  },
  'split-showcase': {
    id: 'split-showcase',
    name: 'Split Showcase',
    description:
      'Full-bleed 50/50 split screen with a sticky left event poster and a scrollable right details & checkout panel.',
  },
  'full-bleed-tickets': {
    id: 'full-bleed-tickets',
    name: 'Full-Bleed Tickets',
    description:
      'Edge-to-edge hero banner above a two-column layout with event story & map on the left and tiered ticket selection on the right.',
  },
};

export const EVENT_DETAILS_VARIANT_LIST: EventDetailsVariantMeta[] = Object.values(
  EVENT_DETAILS_VARIANTS,
);

export function getRandomEventDetailsVariant(): EventDetailsVariantId {
  const variants = EVENT_DETAILS_VARIANT_LIST;
  return variants[Math.floor(Math.random() * variants.length)].id;
}

export interface EventItem {
  id: string;
  title: string;
  date: string;
  venue: string;
  city: string;
  priceLabel: string;
  pricePrefix?: string;
  priceValue: number;
  image: string;
  wideImage?: string;
  imageOffsetClass?: string;
  categories: string[];
  organizerName?: string;
  fullAddress?: string;
  description?: string[];
  extendedDescription?: string;
  detailsVariant?: EventDetailsVariantId;
}

export interface CategoryPill {
  id: string;
  label: string;
  icon: string;
}

export interface StepItem {
  number: string;
  title: string;
  description: string;
}

export interface FeatureItem {
  title: string;
  description: string;
  icon: string;
}

export interface TestimonialItem {
  quote: string;
  name: string;
  role: string;
  avatar: string;
  avatarBg: string;
  avatarSize?: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export const CATEGORY_PILLS: CategoryPill[] = [
  { id: 'Featured', label: 'Featured', icon: '/assets/21f17.svg' },
  { id: 'Today', label: 'Today', icon: '/assets/8dcaa.svg' },
  { id: 'This Weekend', label: 'This Weekend', icon: '/assets/a6699.svg' },
  { id: 'Concerts', label: 'Concerts', icon: '/assets/8b89a.svg' },
  { id: 'Festivals', label: 'Festivals', icon: '/assets/ca191.svg' },
  { id: 'Conferences', label: 'Conferences', icon: '/assets/3aba3.svg' },
  { id: 'Workshops', label: 'Workshops', icon: '/assets/b0f03.svg' },
  { id: 'Networking', label: 'Networking', icon: '/assets/b770c.svg' },
  { id: 'Sports', label: 'Sports', icon: '/assets/675cb.svg' },
  { id: 'Technology', label: 'Technology', icon: '/assets/54a2b.svg' },
  { id: 'Charity', label: 'Charity', icon: '/assets/365b0.svg' },
  { id: 'Fashion', label: 'Fashion', icon: '/assets/220be.svg' },
  { id: 'Automobile', label: 'Automobile', icon: '/assets/0021d.svg' },
  { id: 'Community', label: 'Community', icon: '/assets/5a08a.svg' },
];

export const CITIES = ['All cities', 'Lagos', 'California', 'Berlin', 'Geneva', 'New York'];

export const EVENTS_DATA: EventItem[] = [
  {
    id: 'evt-1',
    title: 'Termii Elevate 5.0: The Global Link-Powering the Next Billion Conversations',
    date: 'Sat, Jul 12 · 7:30 PM',
    venue: 'The Zone Tech Park, Lagos',
    city: 'Lagos',
    priceLabel: 'Free',
    priceValue: 0,
    image: '/assets/76b9b.png',
    categories: ['Featured', 'This Weekend', 'Conferences', 'Technology', 'Networking'],
  },
  {
    id: 'evt-2',
    title: "Innovate AI Summit 2024: Shaping Tomorrow's Tech Landscape",
    date: 'Mon, Aug 5 · 9:00 AM',
    venue: 'Silicon Valley Conference Center, CA',
    city: 'California',
    pricePrefix: 'From',
    priceLabel: '₦40,000',
    priceValue: 40000,
    image: '/assets/38427.png',
    categories: ['Featured', 'Conferences', 'Technology', 'Workshops'],
  },
  {
    id: 'evt-3',
    title: 'Green Energy Expo: Powering a Sustainable Future',
    date: 'Thu, Sep 14 · 10:00 AM',
    venue: 'Eco Convention Hall, Berlin',
    city: 'Berlin',
    priceLabel: 'Free',
    priceValue: 0,
    image: '/assets/c8a99.png',
    categories: ['Featured', 'Today', 'Conferences', 'Community'],
  },
  {
    id: 'evt-4',
    title: 'Africa Real Estate Certificate Masterclass, Lagos 2026',
    date: 'Wed, Nov 20 · 1:00 PM',
    venue: 'International Convention Center, Geneva',
    city: 'Geneva',
    pricePrefix: 'From',
    priceLabel: '₦25,000',
    priceValue: 25000,
    image: '/assets/0bb50.png',
    imageOffsetClass: 'object-[50%_20%]',
    categories: ['Featured', 'Workshops', 'Networking', 'Conferences'],
  },
  {
    id: 'evt-5',
    title: 'Silent Book Club Victoria Island Lagos (July Edition)',
    date: 'Fri, Oct 6 · 8:00 AM',
    venue: 'Startup Hub, New York',
    city: 'New York',
    pricePrefix: 'From',
    priceLabel: '₦7,000',
    priceValue: 7000,
    image: '/assets/6f6b4.png',
    categories: ['Featured', 'This Weekend', 'Community', 'Networking'],
  },
  {
    id: 'evt-6',
    title: 'Lagos International Crypto Summit',
    date: 'Tue, Dec 10 · 11:00 AM',
    venue: 'Landmark Centre, Lagos',
    city: 'Lagos',
    priceLabel: 'Free',
    priceValue: 0,
    image: '/assets/45a9b.png',
    categories: ['Featured', 'Today', 'Conferences', 'Technology'],
  },
  {
    id: 'evt-7',
    title: "Innovate AI Summit 2024: Shaping Tomorrow's Tech Landscape",
    date: 'Mon, Aug 5 · 9:00 AM',
    venue: 'Silicon Valley Conference Center, CA',
    city: 'California',
    pricePrefix: 'From',
    priceLabel: '₦25,000',
    priceValue: 25000,
    image: '/assets/38427.png',
    categories: ['Featured', 'Conferences', 'Technology'],
  },
  {
    id: 'evt-8',
    title: 'Termii Elevate 5.0: The Global Link-Powering the Next Billion Conversations',
    date: 'Sat, Jul 12 · 7:30 PM',
    venue: 'The Zone Tech Park, Lagos',
    city: 'Lagos',
    priceLabel: 'Free',
    priceValue: 0,
    image: '/assets/76b9b.png',
    categories: ['Featured', 'This Weekend', 'Concerts', 'Technology'],
  },
  {
    id: 'evt-9',
    title: 'Africa Real Estate Certificate Masterclass, Lagos 2026',
    date: 'Wed, Nov 20 · 1:00 PM',
    venue: 'International Convention Center, Geneva',
    city: 'Geneva',
    pricePrefix: 'From',
    priceLabel: '₦15,000',
    priceValue: 15000,
    image: '/assets/0bb50.png',
    imageOffsetClass: 'object-[50%_20%]',
    categories: ['Featured', 'Workshops', 'Networking'],
  },
  {
    id: 'evt-10',
    title: 'Green Energy Expo: Powering a Sustainable Future',
    date: 'Thu, Sep 14 · 10:00 AM',
    venue: 'Eco Convention Hall, Berlin',
    city: 'Berlin',
    priceLabel: 'Free',
    priceValue: 0,
    image: '/assets/c8a99.png',
    categories: ['Featured', 'Festivals', 'Charity', 'Community'],
  },
  {
    id: 'evt-11',
    title: 'Lagos International Crypto Summit',
    date: 'Tue, Dec 10 · 11:00 AM',
    venue: 'Landmark Centre, Lagos',
    city: 'Lagos',
    priceLabel: 'Free',
    priceValue: 0,
    image: '/assets/45a9b.png',
    categories: ['Featured', 'Technology', 'Conferences', 'Fashion'],
  },
  {
    id: 'evt-12',
    title: 'Silent Book Club Victoria Island Lagos (July Edition)',
    date: 'Fri, Oct 6 · 8:00 AM',
    venue: 'Startup Hub, New York',
    city: 'New York',
    pricePrefix: 'From',
    priceLabel: '₦7,000',
    priceValue: 7000,
    image: '/assets/6f6b4.png',
    categories: ['Featured', 'Community', 'Sports', 'Automobile'],
  },
];

export const SPOTLIGHT_EVENTS: EventItem[] = [
  {
    id: 'spot-1',
    title: 'Lagos Trivia Night',
    date: 'Sun, Jul 26 · 5:00 PM',
    venue: 'Bature Brewery, 256 Etim Inyang Cres, Lagos',
    city: 'Lagos',
    pricePrefix: 'From',
    priceLabel: '₦10,000',
    priceValue: 10000,
    image: '/assets/615cc.png',
    wideImage: '/assets/e6e1c.png',
    categories: ['Featured', 'This Weekend', 'Community', 'Networking'],
  },
  {
    id: 'spot-2',
    title: 'Daddy Showkey: The Journey',
    date: 'Sun, Aug 9 · 6:00 PM',
    venue: 'Eko Hotels & Suites',
    city: 'Lagos',
    pricePrefix: 'From',
    priceLabel: '₦10,000',
    priceValue: 10000,
    image: '/assets/5767e.png',
    wideImage: '/assets/031a4.png',
    imageOffsetClass: 'object-top',
    categories: ['Featured', 'Concerts', 'Festivals'],
  },
  {
    id: 'spot-3',
    title: 'The Rarity Experience',
    date: 'Sat, Oct 9 · 6:00 PM',
    venue: 'CURATE, Landmark Village, Oniru, VI, Lagos',
    city: 'Lagos',
    pricePrefix: 'From',
    priceLabel: '₦15,000',
    priceValue: 15000,
    image: '/assets/296aa.png',
    wideImage: '/assets/031a4.png',
    categories: ['Featured', 'Concerts', 'This Weekend'],
  },
];

export const TWO_UP_SPOTLIGHT_EVENTS: EventItem[] = [
  {
    id: 'spot-wide-1',
    title: 'Lagos Trivia Night',
    date: 'Sun, Jul 26 · 5:00 PM',
    venue: 'Bature Brewery, 256 Etim Inyang Cres, Lagos',
    city: 'Lagos',
    pricePrefix: 'From',
    priceLabel: '₦10,000',
    priceValue: 10000,
    image: '/assets/e6e1c.png',
    wideImage: '/assets/e6e1c.png',
    categories: ['Featured', 'This Weekend', 'Community', 'Networking'],
  },
  {
    id: 'spot-wide-2',
    title: 'Bnxn Live In Concert',
    date: 'Sat, Oct 9 · 6:00 PM',
    venue: 'CURATE, Landmark Village, Oniru, VI, Lagos',
    city: 'Lagos',
    pricePrefix: 'From',
    priceLabel: '₦25,000',
    priceValue: 25000,
    image: '/assets/031a4.png',
    wideImage: '/assets/031a4.png',
    categories: ['Featured', 'Concerts', 'This Weekend'],
  },
];

export const EXPLORE_ALL_EVENTS: EventItem[] = [
  ...EVENTS_DATA,
  {
    id: 'evt-13',
    title: 'Termii Elevate 5.0: The Global Link-Powering the Next Billion Conversations',
    date: 'Sat, Jul 12 · 7:30 PM',
    venue: 'The Zone Tech Park, Lagos',
    city: 'Lagos',
    priceLabel: 'Free',
    priceValue: 0,
    image: '/assets/76b9b.png',
    categories: ['Featured', 'This Weekend', 'Conferences', 'Technology'],
  },
  {
    id: 'evt-14',
    title: "Innovate AI Summit 2024: Shaping Tomorrow's Tech Landscape",
    date: 'Mon, Aug 5 · 9:00 AM',
    venue: 'Silicon Valley Conference Center, CA',
    city: 'California',
    pricePrefix: 'From',
    priceLabel: '₦40,000',
    priceValue: 40000,
    image: '/assets/38427.png',
    categories: ['Featured', 'Conferences', 'Technology', 'Workshops'],
  },
  {
    id: 'evt-15',
    title: 'Privacy Conference (PrivCon) 2026',
    date: 'Tue, Sep 1 · 9:00 AM',
    venue: 'The Civic Centre, Lagos',
    city: 'Lagos',
    priceLabel: 'Free',
    priceValue: 0,
    image: '/assets/9a653.png',
    wideImage: '/assets/9a653.png',
    categories: ['Featured', 'Conferences', 'Technology', 'Networking'],
    organizerName: 'PrivCon Nigeria',
    fullAddress: '1415 Adetokunbo Ademola Street, Victoria Island, Lagos 106104, Lagos, Nigeria',
    description: [
      'Join us at PrivCon 2026 to learn about the latest trends and strategies in privacy protection! Nigeria’s biggest convening on data privacy and protection is back! PrivCon 2026 returns with a bold and timely theme: Privacy Architecture: #EveryBlockCounts.',
      'Privacy is no longer a layer added at the end—it is the foundation of modern cybersecurity architecture. In an era of rapidly evolving digital threats, secure systems must be designed with privacy at their core, not treated as an afterthought.',
      "This year's theme reinforces a critical truth: every decision in system design has a direct impact on data protection, user trust, regulatory compliance, and long-term resilience.",
    ],
    extendedDescription:
      'Featuring keynote addresses from regulators, CISOs, legal experts, and privacy engineers across Africa, plus hands-on workshops on NDPA compliance, privacy-by-design frameworks, and AI governance.',
  },
];

export const ATTENDEE_STEPS: StepItem[] = [
  {
    number: '01',
    title: "Discover events you'll love",
    description:
      'Personalized picks across concerts, talks, festivals and more — filtered by city, vibe and date.',
  },
  {
    number: '02',
    title: 'Book in seconds',
    description:
      'Card, transfer, USSD, Apple or Google Pay. Your ticket lands in your inbox before your phone hits the table.',
  },
  {
    number: '03',
    title: 'Attend & enjoy!',
    description:
      'Flash your QR pass at the door in under a second — offline-ready, no printing, just straight into the room.',
  },
];

export const ORGANIZER_STEPS: StepItem[] = [
  {
    number: '01',
    title: 'Launch your event page',
    description:
      'Publish a high-converting event page with tiered tickets, promo codes, and custom branding in under 5 minutes.',
  },
  {
    number: '02',
    title: 'Sell & scan at the door',
    description:
      'Track live revenue by channel and check guests in at 0.4s per scan — even when venue Wi-Fi drops.',
  },
  {
    number: '03',
    title: 'Get paid in 48 hours',
    description:
      'Automatic payouts straight to your local bank account after doors close. Zero hidden holds, full transparency.',
  },
];

export const BUILT_IN_NAIJA_FEATURES: FeatureItem[] = [
  {
    title: 'Secure Payment Gateway',
    description: 'Bank-grade encryption with 3D Secure on every checkout.',
    icon: '/assets/4dde0.svg',
  },
  {
    title: 'Tickets that just land',
    description: "Tickets land in the attendee's inbox in seconds. No waiting, no wahala.",
    icon: '/assets/da2dc.svg',
  },
  {
    title: 'QR Check-in',
    description: 'Scans in under a second, even when the venue Wi-Fi gives up on you.',
    icon: '/assets/c4f97.svg',
  },
  {
    title: 'Real-time Analytics',
    description: 'Watch sales, sources and seat maps update as they happen.',
    icon: '/assets/bd469.svg',
  },
  {
    title: 'Built-in Promo Tools',
    description: 'Discount codes, affiliate links, email campaigns — built in and tracked in one place',
    icon: '/assets/f432f.svg',
  },
  {
    title: 'Fast & Easy Payouts',
    description: 'Get paid direct to your local bank after the doors close. No surprises, no holds.',
    icon: '/assets/60d9a.svg',
  },
];

export const PRODUCER_HIGHLIGHTS = [
  'Keep more of your gate — flat 2.5% + ₦100 per paid ticket',
  'Sell more with built-in promo & email tools',
  'Get paid to your local bank within 48 hours of the doors closing',
  'Beautiful event pages — no designer required',
];

export const TESTIMONIALS_ROW_1: TestimonialItem[] = [
  {
    quote: '"Every detail was seamless, from registration to closing remarks. Truly impressive!"',
    name: 'Ali Iwobi',
    role: 'Event Coordinator, TechTomorrow',
    avatar: '/assets/369f0.png',
    avatarBg: '#fceeeb',
  },
  {
    quote: `"The team made sure every attendee felt welcome and valued. Can't wait for next year!"`,
    name: 'Amaka Okafor',
    role: 'PR Strategist, Creative Minds Expo',
    avatar: '/assets/fab70.png',
    avatarBg: '#eaf0fd',
  },
  {
    quote: '"From logistics to guest experience, everything was flawless. Highly recommend their services."',
    name: 'Bukola Adeyemi',
    role: 'Director, Future Innovators Con',
    avatar: '/assets/fd2f4.png',
    avatarBg: '#eaf5f0',
  },
  {
    quote: '"Professional and efficient—our attendees kept praising how smooth the event was."',
    name: 'Kola Martins',
    role: 'Founder, Men in Tech Network',
    avatar: '/assets/c0ab7.png',
    avatarBg: '#f6eefe',
  },
  {
    quote: '"Their attention to detail transformed our conference into an unforgettable experience."',
    name: 'Tunde Balogun',
    role: 'Chief Organizer, Lag-Startup Forum',
    avatar: '/assets/369f0.png',
    avatarBg: '#fceeeb',
  },
  {
    quote: '"Exceptional service and a passionate team made our workshop a huge success."',
    name: 'Ifunanya Eze',
    role: 'Facilitator, LST Skills Workshop',
    avatar: '/assets/fab70.png',
    avatarBg: '#eaf0fd',
  },
  {
    quote: '"Innovative solutions and flawless execution kept our attendees engaged throughout."',
    name: 'Kelechi Ndukwe',
    role: 'Event Manager, Digital Futures Expo',
    avatar: '/assets/fd2f4.png',
    avatarBg: '#eaf5f0',
  },
  {
    quote: '"The seamless coordination allowed us to focus on content while they handled the rest."',
    name: 'Peters Umeh',
    role: 'Director, Health Tech Symposium',
    avatar: '/assets/c0ab7.png',
    avatarBg: '#f6eefe',
  },
];

export const TESTIMONIALS_ROW_2: TestimonialItem[] = [
  {
    quote: '"Detailed planning and real-time adjustments ensured no hiccups throughout the event."',
    name: 'Saint Maduka',
    role: 'Event Director, GreenTech Forum',
    avatar: '/assets/fd2f4.png',
    avatarBg: '#eaf5f0',
  },
  {
    quote: '"The energy and enthusiasm of the team were contagious, setting the tone for an inspiring event."',
    name: 'Dare Balogun',
    role: 'Community Lead, Impact Summit',
    avatar: '/assets/369f0.png',
    avatarBg: '#fceeeb',
  },
  {
    quote: '"A flawless blend of professionalism and warmth that made every participant feel special."',
    name: 'Ayodele Olatunji',
    role: 'Producer, Youth Empowerment Expo',
    avatar: '/assets/c0ab7.png',
    avatarBg: '#f6eefe',
  },
  {
    quote: `"Their meticulous attention to attendee feedback enhanced every session's impact."`,
    name: 'Eze Onosa',
    role: 'Producer, Afro Fest',
    avatar: '/assets/fd2f4.png',
    avatarBg: '#eaf5f0',
  },
  {
    quote: '"Their creative approach to problem-solving made all the difference during tight schedules."',
    name: 'Sade Williams',
    role: 'Operations Head, InnovateNow',
    avatar: '/assets/fab70.png',
    avatarBg: '#eaf0fd',
  },
  {
    quote: '"Their dedication to sustainability made our eco-conference truly stand out."',
    name: 'Ibrahim Musa',
    role: 'Coordinator, Clean Energy Summit',
    avatar: '/assets/369f0.png',
    avatarBg: '#fceeeb',
  },
  {
    quote: '"The team’s passion translated into an event that was both inspiring and smoothly run."',
    name: 'Oluwaseun Ade',
    role: 'Founder, Creative Leaders Forum',
    avatar: '/assets/c0ab7.png',
    avatarBg: '#f6eefe',
  },
  {
    quote: '"Impressed by their ability to integrate technology seamlessly into the event experience."',
    name: 'Fatimah Suleiman',
    role: 'Tech Lead, SmartCity Conference',
    avatar: '/assets/fab70.png',
    avatarBg: '#eaf0fd',
  },
];

export const FAQS_DATA: FaqItem[] = [
  {
    question: 'How do tickets work?',
    answer:
      'Once you complete checkout, your digital ticket with a unique encrypted QR code is delivered instantly to your email and can be added to Apple Wallet or Google Wallet with one tap.',
  },
  {
    question: 'What payment options do you support?',
    answer:
      'We support debit/credit cards (Verve, Visa, Mastercard), bank transfers, USSD, Paystack, Apple Pay, and Google Pay so attendees can pay however they prefer.',
  },
  {
    question: 'Can I get a refund?',
    answer:
      'Refund policies are set by each event organizer and clearly displayed on the event page before checkout. If an event is cancelled or rescheduled, Jambo automatically processes your refund.',
  },
  {
    question: 'How do organizers get paid?',
    answer:
      'Payouts are settled directly to your verified local bank account within 48 hours after your event doors close — with real-time payout tracking in your organizer dashboard.',
  },
  {
    question: 'Is check-in secure?',
    answer:
      'Yes. Every QR code is cryptographically signed and validated in 0.4 seconds via our door-staff scanner app, with offline mode built in so duplicate or forged tickets are blocked even without Wi-Fi.',
  },
  {
    question: 'What does Jambo charge?',
    answer:
      'Free events are 100% free to host. For paid tickets, Jambo charges a flat 2.5% + ₦100 per ticket — and you can choose to absorb the fee or pass it to the buyer at checkout.',
  },
  {
    question: 'Can I bring my existing audience?',
    answer:
      'Absolutely. Import your CSV mailing list in seconds, send branded email blasts, generate affiliate links for promoters, and track conversions per channel.',
  },
];
