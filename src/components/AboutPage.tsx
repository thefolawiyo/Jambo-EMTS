import { useEffect, useRef, useState } from 'react';
import { Navbar } from './Navbar';
import { FooterSection } from './FooterSection';

interface AboutPageProps {
  onNavigateHome: (sectionId?: string) => void;
  onNavigateExplore: () => void;
  onNavigateAbout: () => void;
  onOpenCreateModal: () => void;
  onOpenSignInModal: () => void;
}

const CULTURE_TAGS = [
  'Afrobeats',
  'Owambe',
  'Detty December',
  'Alté',
  'Amapiano',
  'Suya & Stout',
  'Lagos at 3AM',
  'Ìjó',
  'Eko for show',
  'Sound system',
  'Coupé-décalé',
  'Asoebi',
  'Jollof Wars',
  'Highlife',
];

const HERO_FRAMES = [
  {
    src: '/assets/97a51.png',
    alt: 'Mainstage lights at a Lagos concert',
    posClass: '-left-10 top-24 rotate-[-9deg] hidden lg:block',
    delay: '0s',
  },
  {
    src: '/assets/031a4.png',
    alt: 'Live performance in Lagos',
    posClass: '-right-8 top-28 rotate-[8deg] hidden lg:block',
    delay: '1.8s',
  },
  {
    src: '/assets/296aa.png',
    alt: 'The Rarity Experience crowd',
    posClass: '-left-6 bottom-12 rotate-[7deg] hidden xl:block',
    delay: '3.2s',
  },
  {
    src: '/assets/5767e.png',
    alt: 'Festival energy on stage',
    posClass: '-right-6 bottom-14 rotate-[-7deg] hidden xl:block',
    delay: '4.5s',
  },
];

const ORIGIN_CARDS = [
  {
    src: '/assets/97a51.png',
    caption: 'DJ set, Hard Rock Lagos — Dec 2023',
    timecode: '00:01 · REC',
    tilt: -1.5,
  },
  {
    src: '/assets/031a4.png',
    caption: 'Landmark Beach mainstage — Aug 2024',
    timecode: '00:02 · REC',
    tilt: 1.5,
  },
  {
    src: '/assets/9a653.png',
    caption: 'Moonshot Conference, Eko Hotel — Oct 2024',
    timecode: '00:03 · REC',
    tilt: -1.5,
  },
  {
    src: '/assets/producer_photo.png',
    caption: 'Asoebi crew, Lekki — Nov 2024',
    timecode: '00:04 · REC',
    tilt: 1.5,
  },
];

const JOURNEY_MILESTONES = [
  {
    year: '2021',
    title: 'Sketched on a recharge card',
    description:
      'Three founders, one printer that jammed at a Surulere house party. The first prototype shipped six weeks later.',
  },
  {
    year: '2022',
    title: 'Our first 10,000 tickets',
    description:
      "Native Land's first-ever festival ran on Jambo. We learnt what 'live ops' really meant at 11pm on a Saturday.",
  },
  {
    year: '2023',
    title: 'Naira-first checkout',
    description:
      'Integrated Paystack, Flutterwave, USSD and bank transfer. Average checkout dropped from 90 to 17 seconds.',
  },
  {
    year: '2024',
    title: 'Across the continent',
    description:
      'Live in Accra, Nairobi, Joburg, Kigali and Dakar. Our Lagos team grew to 42. Detty December moved 600,000 tickets.',
  },
  {
    year: '2026',
    title: 'The next chapter',
    description:
      "Building the artist-to-fan tools we always wanted: smart drops, fan IDs and venue intelligence. You're early.",
  },
];

interface StatSpec {
  target: number;
  label: string;
  format: (v: number) => string;
}

const RECEIPT_STATS: StatSpec[] = [
  {
    target: 3.2,
    label: 'Tickets moved',
    format: (v) => `${v.toFixed(1)}M`,
  },
  {
    target: 12480,
    label: 'Events powered',
    format: (v) => Math.round(v).toLocaleString('en-US'),
  },
  {
    target: 42,
    label: 'African cities',
    format: (v) => `${Math.round(v)}`,
  },
  {
    target: 600000,
    label: "Detty December '24",
    format: (v) => Math.round(v).toLocaleString('en-US'),
  },
];

const FILMSTRIP_FRAMES = [
  { src: '/assets/97a51.png', code: 'REC · F001', label: 'Soundcheck · Eko Centre' },
  { src: '/assets/031a4.png', code: 'REC · F002', label: 'DJ Obi backstage' },
  { src: '/assets/296aa.png', code: 'REC · F003', label: 'Mainstage · Landmark' },
  { src: '/assets/9a653.png', code: 'REC · F004', label: 'Moonshot keynote' },
  { src: '/assets/team_photo.png', code: 'REC · F005', label: 'Ops room · Yaba HQ' },
  { src: '/assets/76b9b.png', code: 'REC · F006', label: 'Workshop · Surulere' },
  { src: '/assets/5767e.png', code: 'REC · F007', label: 'Asake live · 23:48' },
  { src: '/assets/e6e1c.png', code: 'REC · F008', label: 'Owambe · Lekki' },
];

const COFOUNDERS = [
  {
    initials: 'TA',
    name: 'Tomiwa Ade',
    role: 'CO-FOUNDER · CEO',
    bio: 'Ex-promoter. Spent five years filling rooms before deciding to build the room itself.',
    tileBg: '#ffe2d1',
    accentColor: '#ff5200',
    tag: 'Lagos · Door #1',
  },
  {
    initials: 'CO',
    name: 'Chinedu Okafor',
    role: 'CO-FOUNDER · CTO',
    bio: 'Former Paystack engineer. Believes a 0.4-second check-in is a moral position.',
    tileBg: '#d8efe0',
    accentColor: '#1f7a4c',
    tag: '0.4s scan speed',
  },
  {
    initials: 'AI',
    name: 'Adesuwa Idahosa',
    role: 'CO-FOUNDER · COO',
    bio: "Ran events at Eko Hotel. Now runs the ops team that keeps the continent's nights on time.",
    tileBg: '#e4ebff',
    accentColor: '#3658c8',
    tag: 'Live Ops Lead',
  },
];

function useInViewOnce(threshold = 0.14) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setInView(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}

function SprocketRow({ count = 10, dark = true }: { count?: number; dark?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-1.5 px-2.5 py-1.5" aria-hidden="true">
      {Array.from({ length: count }).map((_, idx) => (
        <span
          key={idx}
          className={`h-1.5 w-2.5 rounded-[2px] ${dark ? 'bg-white/20' : 'bg-[#2e2e2e]/20'}`}
        />
      ))}
    </div>
  );
}

export function AboutPage({
  onNavigateHome,
  onNavigateExplore,
  onNavigateAbout,
  onOpenCreateModal,
  onOpenSignInModal,
}: AboutPageProps) {
  const [heroScroll, setHeroScroll] = useState(0);
  const [manifestoShift, setManifestoShift] = useState(0);
  const [statProgress, setStatProgress] = useState(0);
  const [coordsCopied, setCoordsCopied] = useState(false);

  const heroRef = useRef<HTMLElement>(null);
  const manifestoRef = useRef<HTMLElement>(null);

  const originReveal = useInViewOnce(0.1);
  const journeyReveal = useInViewOnce(0.12);
  const statsReveal = useInViewOnce(0.22);
  const reelReveal = useInViewOnce(0.12);
  const peopleReveal = useInViewOnce(0.14);
  const ctaReveal = useInViewOnce(0.18);

  // Scroll-linked parallax for Hero & horizontal drift for Manifesto
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let rafId = 0;
    const update = () => {
      rafId = 0;
      const vh = window.innerHeight || 1;

      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        const raw = Math.max(0, Math.min(1, -rect.top / Math.max(rect.height, 1)));
        setHeroScroll(raw);
      }

      if (manifestoRef.current) {
        const rect = manifestoRef.current.getBoundingClientRect();
        const progress = Math.max(0, Math.min(1, (vh - rect.top) / (vh + rect.height)));
        // Drift smoothly from +2% to -4.5% as user scrolls through manifesto
        setManifestoShift(2 - progress * 6.5);
      }
    };

    const onScroll = () => {
      if (!rafId) rafId = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, []);

  // Count-up animation when Receipts section enters viewport
  useEffect(() => {
    if (!statsReveal.inView) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setStatProgress(1);
      return;
    }

    const duration = 1400;
    let startTime = 0;
    let rafId = 0;

    const tick = (now: number) => {
      if (!startTime) startTime = now;
      const t = Math.min(1, (now - startTime) / duration);
      // Cubic ease-out
      const eased = 1 - Math.pow(1 - t, 3);
      setStatProgress(eased);
      if (t < 1) {
        rafId = window.requestAnimationFrame(tick);
      }
    };

    rafId = window.requestAnimationFrame(tick);
    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, [statsReveal.inView]);

  const handleCopyCoords = () => {
    navigator.clipboard?.writeText('6.5244° N, 3.3792° E — Yaba, Lagos').catch(() => {});
    setCoordsCopied(true);
    window.setTimeout(() => setCoordsCopied(false), 2000);
  };

  const scrollToStory = () => {
    document.getElementById('story')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white text-[#2e2e2e]">
      {/* SECTION 1: CINEMATIC HERO */}
      <section
        ref={heroRef}
        className="relative flex min-h-[100svh] flex-col overflow-hidden bg-[#181717] text-white"
      >
        {/* Cinema letterbox bars that open smoothly on mount */}
        <div
          aria-hidden="true"
          className="animate-letterbox-top pointer-events-none absolute inset-x-0 top-0 z-30 h-[10vh] bg-[#181717]"
        />
        <div
          aria-hidden="true"
          className="animate-letterbox-bottom pointer-events-none absolute inset-x-0 bottom-0 z-30 h-[10vh] bg-[#181717]"
        />

        {/* Warm ambient glows matching Jambo brand */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-32 left-1/2 h-[540px] w-[760px] -translate-x-1/2 rounded-full opacity-25 blur-[130px]"
          style={{
            background:
              'radial-gradient(circle, rgba(255,122,51,0.9) 0%, rgba(240,62,46,0.45) 45%, transparent 72%)',
          }}
        />
        <div
          aria-hidden="true"
          className="about-film-grain pointer-events-none absolute inset-0 opacity-60"
        />

        {/* Floating angled film-sprocket frames around edges */}
        {HERO_FRAMES.map((frame, i) => (
          <div
            key={frame.src + i}
            aria-hidden="true"
            className={`pointer-events-none absolute z-[2] w-[220px] overflow-hidden rounded-2xl border border-white/15 bg-[#232222]/90 shadow-2xl xl:w-[250px] ${frame.posClass}`}
            style={{
              opacity: Math.max(0.18, 0.52 - heroScroll * 0.35),
            }}
          >
            <SprocketRow count={8} />
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src={frame.src}
                alt={frame.alt}
                className="animate-hero-breathe size-full object-cover"
                style={{ animationDelay: frame.delay }}
              />
            </div>
            <SprocketRow count={8} />
          </div>
        ))}

        {/* Radial dark vignette so center copy stays ultra-legible */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[3]"
          style={{
            background:
              'radial-gradient(circle at 50% 48%, rgba(24,23,23,0.45) 0%, rgba(24,23,23,0.88) 70%, rgba(24,23,23,0.98) 100%)',
          }}
        />

        {/* Navbar in dark mode over the dark hero */}
        <div className="relative z-20">
          <Navbar
            activePage="about"
            variant="dark"
            onNavigateHome={onNavigateHome}
            onNavigateExplore={onNavigateExplore}
            onNavigateAbout={onNavigateAbout}
            onOpenCreateModal={onOpenCreateModal}
            onOpenSignInModal={onOpenSignInModal}
          />
        </div>

        {/* Center hero narrative with scroll-linked parallax + subtle zoom */}
        <div
          className="relative z-10 mx-auto flex flex-1 max-w-[960px] flex-col items-center justify-center px-6 pb-20 pt-10 text-center"
          style={{
            transform: `translate3d(0, ${-heroScroll * 90}px, 0) scale(${1 + heroScroll * 0.06})`,
            opacity: Math.max(0.15, 1 - heroScroll * 0.9),
            willChange: 'transform, opacity',
          }}
        >
          {/* Chapter One pill */}
          <div className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 backdrop-blur-md">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#ff5200] opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-[#ff7a33]" />
            </span>
            <span className="font-mono text-[12px] tracking-[0.04em] text-white/90">
              Chapter One · Lagos, 2021
            </span>
          </div>

          <h1 className="mt-7 font-display text-[clamp(2.5rem,6.5vw,5rem)] font-bold leading-[1.03] tracking-[-0.035em] text-white">
            We grew up where the music{' '}
            <span className="bg-gradient-to-r from-[#ff944d] via-[#ff6a2b] to-[#f03e2e] bg-clip-text italic text-transparent">
              never stops.
            </span>
          </h1>

          <p className="mt-7 max-w-[640px] text-[17px] leading-[1.6] text-white/75 sm:text-[18px]">
            Jambo was born in a third-mainland traffic jam in Lagos, on the way back from another
            sold-out show that couldn&apos;t quite get its tickets right. We thought Africa deserved
            better. So we built it.
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-3.5">
            <button
              type="button"
              onClick={scrollToStory}
              className="btn-jambo-primary group inline-flex cursor-pointer items-center gap-2.5 rounded-[14px] px-6 py-3.5 text-[15px] font-semibold text-white"
            >
              <span>Read our story</span>
              <span
                aria-hidden="true"
                className="transition-transform duration-200 group-hover:translate-x-1"
              >
                →
              </span>
            </button>
            <button
              type="button"
              onClick={onNavigateExplore}
              className="btn-jambo-interactive btn-jambo-tilt-right inline-flex cursor-pointer items-center gap-2 rounded-[14px] border border-white/20 bg-white/5 px-6 py-3.5 text-[15px] font-semibold text-white backdrop-blur-sm hover:border-white/35 hover:bg-white/12"
            >
              <span>See what&apos;s on</span>
            </button>
          </div>
        </div>

        {/* Bottom GPS coordinate badge */}
        <div className="relative z-10 flex justify-center pb-7">
          <button
            type="button"
            onClick={handleCopyCoords}
            title="Copy Lagos coordinates"
            className="group inline-flex min-h-[44px] cursor-pointer items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2.5 font-mono text-[11px] tracking-[0.08em] text-white/70 transition-all hover:border-[#ff5200]/50 hover:bg-white/10 hover:text-white"
          >
            <svg
              className="size-3.5 text-[#ff7a33] transition-transform group-hover:scale-110"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <span>{coordsCopied ? 'Copied · Yaba, Lagos' : '6.5244° N · 3.3792° E'}</span>
          </button>
        </div>
      </section>

      {/* SECTION 2: CULTURE MARQUEE */}
      <section
        aria-label="African event culture"
        className="about-marquee-wrap border-y border-white/10 bg-[#141313] py-5 text-white"
      >
        <div className="about-marquee-mask overflow-hidden">
          <div className="animate-about-marquee flex w-max items-center gap-8">
            {[...CULTURE_TAGS, ...CULTURE_TAGS].map((tag, idx) => (
              <div key={`${tag}-${idx}`} className="flex items-center gap-8">
                <span className="cursor-default font-display text-[20px] font-semibold tracking-[-0.02em] text-white/80 transition-colors duration-200 hover:text-[#ff7a33] sm:text-[24px]">
                  {tag}
                </span>
                <span className="text-[14px] text-[#ff5200]" aria-hidden="true">
                  ✦
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: THE ORIGIN */}
      <section id="story" className="mx-auto max-w-[1440px] px-6 py-24 lg:px-[120px] lg:py-32">
        <div
          ref={originReveal.ref}
          className="grid items-start gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-16"
        >
          {/* Sticky left narrative */}
          <div
            className="transition-all duration-700 ease-out lg:sticky lg:top-24"
            style={{
              opacity: originReveal.inView ? 1 : 0,
              transform: originReveal.inView ? 'translate3d(0, 0, 0)' : 'translate3d(0, 28px, 0)',
            }}
          >
            <span className="inline-flex items-center rounded-full border border-[#ff5200]/20 bg-[#fff3ec] px-3.5 py-1 text-[12px] font-semibold uppercase tracking-[0.08em] text-[#ff5200]">
              The origin
            </span>

            <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3.25rem)] font-bold leading-[1.08] tracking-[-0.03em] text-[#2e2e2e]">
              It started on a <span className="italic text-[#ff5200]">Friday night</span> in
              Surulere.
            </h2>

            <div className="mt-6 space-y-5 text-[16px] leading-[1.7] text-[#5c5a5a] sm:text-[17px]">
              <p>
                Three friends. A house party that turned into a 400-person rave. A printer that
                jammed. A bouncer counting tickets on his fingers. And one stubborn thought:{' '}
                <em className="font-medium text-[#2e2e2e]">this should not be this hard</em>.
              </p>
              <p>
                By the time the sun came up over Bode Thomas, we had sketched what would become
                Jambo on the back of a Glo recharge card. Four years later, we power the gates of
                some of Africa&apos;s biggest stages — from Eko Hotel to Cape Town Stadium.
              </p>
            </div>

            {/* Metadata chips */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#e7e5e5] bg-[#faf9f9] px-3.5 py-2 text-[13px] font-medium text-[#2e2e2e]">
                <span className="size-2 rounded-full bg-[#ff5200]" />
                <span>HQ · Yaba, Lagos</span>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#e7e5e5] bg-[#faf9f9] px-3.5 py-2 text-[13px] font-medium text-[#2e2e2e]">
                <span className="size-2 rounded-full bg-[#16a34a]" />
                <span>Team of 42</span>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#e7e5e5] bg-[#faf9f9] px-3.5 py-2 text-[13px] font-medium text-[#2e2e2e]">
                <span className="size-2 rounded-full bg-[#f59e0b]" />
                <span>Across 11 countries</span>
              </div>
            </div>
          </div>

          {/* Right stacked tilted LIVE photo cards */}
          <div className="space-y-8">
            {ORIGIN_CARDS.map((card, idx) => (
              <figure
                key={card.timecode}
                className="group relative overflow-hidden rounded-[24px] border border-[#e7e5e5] bg-[#181717] shadow-[0_18px_40px_-20px_rgba(0,0,0,0.28)] transition-all duration-500 ease-out hover:rotate-0 hover:-translate-y-1.5 hover:shadow-[0_26px_54px_-18px_rgba(255,82,0,0.25)]"
                style={{
                  transform: originReveal.inView
                    ? `rotate(${card.tilt}deg)`
                    : `translate3d(0, 40px, 0) rotate(${card.tilt}deg)`,
                  opacity: originReveal.inView ? 1 : 0,
                  transitionDelay: `${idx * 90}ms`,
                }}
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={card.src}
                    alt={card.caption}
                    className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />

                  {/* Top-right LIVE badge */}
                  <div className="absolute right-4 top-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/60 px-3 py-1 backdrop-blur-md">
                    <span className="size-2 animate-pulse rounded-full bg-[#ef4444]" />
                    <span className="font-mono text-[11px] font-semibold tracking-[0.1em] text-white">
                      LIVE
                    </span>
                  </div>
                </div>

                {/* Dedicated dark cinema caption strip — zero text-on-text collision */}
                <figcaption className="flex items-center justify-between gap-4 border-t border-white/10 bg-[#141313] px-5 py-4 text-white">
                  <span className="text-[14px] font-medium leading-snug text-white/95 sm:text-[15px]">
                    {card.caption}
                  </span>
                  <span className="shrink-0 rounded-md border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-[11px] tracking-[0.06em] text-white/80">
                    {card.timecode}
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: OUR MANIFESTO */}
      <section
        ref={manifestoRef}
        className="relative overflow-hidden border-y border-[#e7e5e5] bg-[#faf6f3] py-24 lg:py-32"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 h-[380px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-45 blur-[110px]"
          style={{
            background:
              'radial-gradient(circle, rgba(255,122,51,0.32) 0%, rgba(255,196,153,0.18) 55%, transparent 75%)',
          }}
        />
        <div className="relative mx-auto max-w-[1440px] px-6 text-center lg:px-[120px]">
          <span className="inline-flex items-center rounded-full border border-[#ff5200]/20 bg-white/80 px-3.5 py-1 text-[12px] font-semibold uppercase tracking-[0.08em] text-[#ff5200] backdrop-blur-sm">
            Our manifesto
          </span>

          <div
            className="mx-auto mt-8 max-w-[1040px]"
            style={{
              transform: `translate3d(${manifestoShift}%, 0, 0)`,
              willChange: 'transform',
            }}
          >
            <h2 className="font-display text-[clamp(1.9rem,4.4vw,3.6rem)] font-semibold leading-[1.12] tracking-[-0.03em] text-[#2e2e2e]/90">
              We believe the continent throws the loudest nights on earth — and deserves{' '}
              <span className="italic text-[#ff5200]">tools that match</span> the energy.
            </h2>
          </div>
        </div>
      </section>

      {/* SECTION 5: THE JOURNEY / TIMELINE */}
      <section className="mx-auto max-w-[1440px] px-6 py-24 lg:px-[120px] lg:py-32">
        <div ref={journeyReveal.ref}>
          <div className="max-w-[680px]">
            <span className="inline-flex items-center rounded-full border border-[#e7e5e5] bg-[#f4f3f3] px-3.5 py-1 text-[12px] font-semibold uppercase tracking-[0.08em] text-[#2e2e2e]">
              The journey
            </span>
            <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3.25rem)] font-bold leading-[1.08] tracking-[-0.03em] text-[#2e2e2e]">
              Five years. <span className="italic text-[#ff5200]">Eleven countries.</span> One
              stubborn idea.
            </h2>
          </div>

          <div className="mt-12 grid gap-px overflow-hidden rounded-[28px] border border-[#e7e5e5] bg-[#e7e5e5] sm:grid-cols-2 lg:grid-cols-5">
            {JOURNEY_MILESTONES.map((item, idx) => (
              <article
                key={item.year}
                className="group relative flex flex-col justify-between bg-white p-6 transition-colors duration-300 hover:bg-[#fffaf7] lg:p-7"
                style={{
                  opacity: journeyReveal.inView ? 1 : 0,
                  transform: journeyReveal.inView
                    ? 'translate3d(0, 0, 0)'
                    : 'translate3d(0, 24px, 0)',
                  transition: `opacity 600ms cubic-bezier(0.22,1,0.36,1) ${idx * 75}ms, transform 600ms cubic-bezier(0.22,1,0.36,1) ${idx * 75}ms, background-color 250ms ease`,
                }}
              >
                <div>
                  <span className="block font-display text-[40px] font-bold leading-none tracking-[-0.035em] text-[#ff5200] transition-transform duration-300 group-hover:translate-x-0.5">
                    {item.year}
                  </span>
                  <h3 className="mt-5 text-[16px] font-semibold leading-snug text-[#2e2e2e]">
                    {item.title}
                  </h3>
                  <p className="mt-2.5 text-[14px] leading-[1.6] text-[#807e7e]">
                    {item.description}
                  </p>
                </div>

                {/* Expanding bottom progress bar on hover */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-[3px] origin-left scale-x-0 bg-gradient-to-r from-[#ff7a33] to-[#f03e2e] transition-transform duration-500 ease-out group-hover:scale-x-100"
                />
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6: RECEIPTS / STATS */}
      <section className="relative overflow-hidden bg-[#1c1b1b] py-24 text-white lg:py-32">
        <div
          aria-hidden="true"
          className="about-film-grain pointer-events-none absolute inset-0 opacity-50"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-0 top-0 h-[420px] w-[520px] rounded-full opacity-20 blur-[130px]"
          style={{
            background: 'radial-gradient(circle, rgba(255,122,51,0.85) 0%, transparent 70%)',
          }}
        />

        <div
          ref={statsReveal.ref}
          className="relative mx-auto max-w-[1440px] px-6 lg:px-[120px]"
        >
          <span className="inline-flex items-center rounded-full border border-white/15 bg-white/10 px-3.5 py-1 text-[12px] font-semibold uppercase tracking-[0.08em] text-[#ff944d]">
            Receipts
          </span>
          <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3.25rem)] font-bold leading-[1.08] tracking-[-0.03em] text-white">
            The numbers we&apos;re{' '}
            <span className="italic text-[#ff8a47]">proud</span> of.
          </h2>

          <div className="mt-12 grid gap-px overflow-hidden rounded-[28px] border border-white/12 bg-white/12 sm:grid-cols-2 lg:grid-cols-4">
            {RECEIPT_STATS.map((stat, idx) => (
              <div
                key={stat.label}
                className="group bg-[#1c1b1b] p-8 transition-colors duration-300 hover:bg-[#242222] lg:p-10"
                style={{
                  opacity: statsReveal.inView ? 1 : 0,
                  transform: statsReveal.inView
                    ? 'translate3d(0, 0, 0)'
                    : 'translate3d(0, 20px, 0)',
                  transition: `opacity 600ms ease ${idx * 80}ms, transform 600ms ease ${idx * 80}ms, background-color 250ms ease`,
                }}
              >
                <div className="font-display text-[clamp(2.4rem,4vw,3.5rem)] font-bold leading-none tracking-[-0.035em] text-white tabular-nums transition-colors duration-300 group-hover:text-[#ff8a47]">
                  {stat.format(stat.target * statProgress)}
                </div>
                <p className="mt-3 text-[14px] font-medium text-white/60">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7: BEHIND THE SCENES / FILMSTRIP REEL */}
      <section className="overflow-hidden bg-[#f4f3f3] py-24 lg:py-32">
        <div
          ref={reelReveal.ref}
          className="mx-auto flex max-w-[1440px] flex-col justify-between gap-6 px-6 md:flex-row md:items-end lg:px-[120px]"
        >
          <div>
            <span className="inline-flex items-center rounded-full border border-[#e7e5e5] bg-white px-3.5 py-1 text-[12px] font-semibold uppercase tracking-[0.08em] text-[#ff5200]">
              Behind the scenes
            </span>
            <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3.25rem)] font-bold leading-[1.08] tracking-[-0.03em] text-[#2e2e2e]">
              A reel from <span className="italic text-[#ff5200]">last weekend.</span>
            </h2>
          </div>
          <p className="max-w-[360px] text-[15px] leading-[1.6] text-[#807e7e] md:text-right">
            Frames captured by our ops team across the continent. Every single one ran on Jambo.
          </p>
        </div>

        {/* Continuous horizontal filmstrip (pauses smoothly on hover) */}
        <div className="about-filmstrip-wrap mt-12 overflow-hidden py-3">
          <div className="animate-about-filmstrip flex w-max gap-5">
            {[...FILMSTRIP_FRAMES, ...FILMSTRIP_FRAMES].map((frame, idx) => (
              <figure
                key={`${frame.code}-${idx}`}
                className="group w-[300px] shrink-0 overflow-hidden rounded-[20px] border border-[#2e2e2e]/15 bg-[#1b1a1a] text-white shadow-md transition-transform duration-300 hover:-translate-y-2 sm:w-[370px]"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={frame.src}
                    alt={frame.label}
                    className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/80 to-transparent" />
                  <div className="absolute left-3.5 top-3.5 rounded-md bg-black/55 px-2 py-0.5 font-mono text-[10px] tracking-[0.08em] text-white/85 backdrop-blur-sm">
                    {frame.code}
                  </div>
                  <figcaption className="absolute bottom-3 left-3.5 right-3.5 text-[14px] font-medium text-white">
                    {frame.label}
                  </figcaption>
                </div>
                <SprocketRow count={12} dark />
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 8: THE PEOPLE / TEAM */}
      <section className="mx-auto max-w-[1440px] px-6 py-24 lg:px-[120px] lg:py-32">
        <div ref={peopleReveal.ref}>
          <div className="max-w-[660px]">
            <span className="inline-flex items-center rounded-full border border-[#e7e5e5] bg-[#f4f3f3] px-3.5 py-1 text-[12px] font-semibold uppercase tracking-[0.08em] text-[#2e2e2e]">
              The people
            </span>
            <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3.25rem)] font-bold leading-[1.08] tracking-[-0.03em] text-[#2e2e2e]">
              The team in the <span className="italic text-[#ff5200]">ops room.</span>
            </h2>
            <p className="mt-4 text-[16px] leading-[1.65] text-[#807e7e]">
              42 people across Lagos, Accra and Nairobi. Promoters, engineers, designers and door
              staff — all of us obsessed with the night running on time.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {COFOUNDERS.map((person, idx) => (
              <article
                key={person.name}
                className="group rounded-[26px] border border-[#e7e5e5] bg-white p-5 transition-all duration-300 hover:-translate-y-1.5 hover:border-[#d4d2d2] hover:shadow-[0_20px_40px_-24px_rgba(0,0,0,0.18)]"
                style={{
                  opacity: peopleReveal.inView ? 1 : 0,
                  transform: peopleReveal.inView
                    ? 'translate3d(0, 0, 0)'
                    : 'translate3d(0, 26px, 0)',
                  transition: `opacity 650ms cubic-bezier(0.22,1,0.36,1) ${idx * 100}ms, transform 650ms cubic-bezier(0.22,1,0.36,1) ${idx * 100}ms, box-shadow 250ms ease, border-color 250ms ease`,
                }}
              >
                {/* Pastel avatar tile with radial white highlight */}
                <div
                  className="relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-[20px] transition-transform duration-300 group-hover:scale-[1.015]"
                  style={{ backgroundColor: person.tileBg }}
                >
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0"
                    style={{
                      background:
                        'radial-gradient(circle at 30% 25%, rgba(255,255,255,0.75) 0%, transparent 62%)',
                    }}
                  />
                  <span className="relative font-display text-[60px] font-bold leading-none tracking-[-0.04em] text-[#2e2e2e] transition-transform duration-300 group-hover:-rotate-3 group-hover:scale-105">
                    {person.initials}
                  </span>
                  <span
                    className="absolute bottom-3.5 right-3.5 rounded-full bg-white/85 px-3 py-1 font-mono text-[11px] font-medium backdrop-blur-sm"
                    style={{ color: person.accentColor }}
                  >
                    {person.tag}
                  </span>
                </div>

                <div className="mt-5 px-1">
                  <p className="font-mono text-[11px] font-semibold tracking-[0.1em] text-[#807e7e]">
                    {person.role}
                  </p>
                  <h3 className="mt-1.5 font-display text-[22px] font-bold leading-tight tracking-[-0.02em] text-[#2e2e2e]">
                    {person.name}
                  </h3>
                  <p className="mt-2.5 text-[14px] leading-[1.6] text-[#807e7e]">{person.bio}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 9: CHAPTER TWO CTA */}
      <section className="mx-auto max-w-[1440px] px-6 pb-24 lg:px-[120px] lg:pb-28">
        <div
          ref={ctaReveal.ref}
          className="relative overflow-hidden rounded-[32px] bg-[#2e2e2e] px-6 py-20 text-center text-white sm:px-12 lg:py-24"
          style={{
            opacity: ctaReveal.inView ? 1 : 0,
            transform: ctaReveal.inView ? 'translate3d(0, 0, 0)' : 'translate3d(0, 28px, 0)',
            transition: 'opacity 700ms cubic-bezier(0.22,1,0.36,1), transform 700ms cubic-bezier(0.22,1,0.36,1)',
          }}
        >
          {/* Dual ambient glows in Jambo palette */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-24 left-1/2 h-[320px] w-[520px] -translate-x-1/2 rounded-full opacity-35 blur-[110px]"
            style={{
              background: 'radial-gradient(circle, rgba(255,122,51,0.95) 0%, transparent 70%)',
            }}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-24 right-0 h-[300px] w-[400px] rounded-full opacity-30 blur-[110px]"
            style={{
              background: 'radial-gradient(circle, rgba(240,62,46,0.9) 0%, transparent 70%)',
            }}
          />

          <div className="relative z-10 mx-auto max-w-[740px]">
            <span className="inline-flex items-center rounded-full border border-white/15 bg-white/10 px-4 py-1.5 font-mono text-[12px] tracking-[0.04em] text-[#ffb085]">
              Chapter Two starts now
            </span>

            <h2 className="mt-6 font-display text-[clamp(2.1rem,4.5vw,3.5rem)] font-bold leading-[1.08] tracking-[-0.03em] text-white">
              Throw the night{' '}
              <span className="italic text-[#ff8a47]">the continent will talk about.</span>
            </h2>

            <div className="mt-9 flex flex-wrap items-center justify-center gap-3.5">
              <button
                type="button"
                onClick={onNavigateExplore}
                className="btn-jambo-primary group inline-flex cursor-pointer items-center gap-2.5 rounded-[14px] px-6 py-3.5 text-[15px] font-semibold text-white"
              >
                <span>Find an event tonight</span>
                <span
                  aria-hidden="true"
                  className="transition-transform duration-200 group-hover:translate-x-1"
                >
                  →
                </span>
              </button>
              <button
                type="button"
                onClick={onOpenCreateModal}
                className="btn-jambo-interactive btn-jambo-tilt-right inline-flex cursor-pointer items-center gap-2 rounded-[14px] border border-white/20 bg-white/5 px-6 py-3.5 text-[15px] font-semibold text-white hover:border-white/35 hover:bg-white/12"
              >
                <span>Host on Jambo</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      <FooterSection onNavigateAbout={onNavigateAbout} />
    </div>
  );
}
