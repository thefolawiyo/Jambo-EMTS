import { useState } from 'react';
import {
  EVENT_DETAILS_VARIANTS,
  type EventDetailsVariantId,
  type EventItem,
} from '../data/jamboData';
import { Navbar } from './Navbar';
import { FooterSection } from './FooterSection';

interface EventDetailsPageProps {
  event: EventItem;
  variant: EventDetailsVariantId;
  onBack: () => void;
  onNavigateHome: (sectionId?: string) => void;
  onNavigateExplore: () => void;
  onNavigateAbout?: () => void;
  onOpenCreateModal: () => void;
  onOpenSignInModal: () => void;
  onGetTicket: (event: EventItem) => void;
}

function getDefaultDescription(event: EventItem): {
  paragraphs: string[];
  more: string;
} {
  if (event.description && event.description.length > 0) {
    return {
      paragraphs: event.description,
      more:
        event.extendedDescription ??
        'Attendees will enjoy curated sessions, live Q&A, networking lounges, and exclusive digital perks delivered straight to their Jambo pass.',
    };
  }

  return {
    paragraphs: [
      `Join us at ${event.title} for an unforgettable experience in ${event.city}!`,
      `Hosted at ${event.venue}, this gathering brings together creators, builders, and community leaders for an inspiring program crafted to spark meaningful conversations and lasting memories.`,
      'Expect seamless 0.4s QR check-in at the door, curated experiences throughout the venue, and instant ticket delivery straight to your inbox and mobile wallet.',
    ],
    more:
      'Doors open 45 minutes before the scheduled start time. Bring your Jambo QR pass (email, Apple Wallet, or Google Wallet) for express admission and access to all event zones.',
  };
}

function OrganizerSocials() {
  const socials = [
    { label: 'Facebook', icon: '/assets/311e6.svg', size: 'size-5', href: 'https://facebook.com' },
    { label: 'X', icon: '/assets/0887e.svg', size: 'size-4', href: 'https://x.com' },
    { label: 'Instagram', icon: '/assets/960e8.svg', size: 'size-5', href: 'https://instagram.com' },
    { label: 'WhatsApp', icon: '/assets/19f16.svg', size: 'size-5', href: 'https://whatsapp.com' },
  ];

  return (
    <div className="flex items-center gap-3">
      {socials.map((s) => (
        <a
          key={s.label}
          href={s.href}
          target="_blank"
          rel="noreferrer"
          aria-label={s.label}
          className="flex size-11 items-center justify-center rounded-[12px] bg-[#f4f3f3] transition-colors hover:bg-[#ffe8db]"
        >
          <img src={s.icon} alt="" className={s.size} />
        </a>
      ))}
    </div>
  );
}

function DirectionMapCard({ address }: { address: string }) {
  const encodedAddress = encodeURIComponent(address);
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
  const embedUrl = `https://maps.google.com/maps?q=${encodedAddress}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="font-serif-display text-[24px] font-normal leading-[32px] text-[#2e2e2e]">
          Direction
        </h2>
        <a
          href={mapsUrl}
          target="_blank"
          rel="noreferrer"
          className="-my-2 -mr-2 flex min-h-[44px] items-center gap-2 rounded-lg px-2 text-[14px] font-medium leading-[20px] text-[#ff5200] transition-colors hover:bg-[#fff2eb]"
        >
          <img src="/assets/4933e.svg" alt="" className="size-4" />
          <span>Open on Google Map</span>
        </a>
      </div>

      {/* Live Interactive Google Map Embed for the Event's Real Address */}
      <div className="relative h-[296px] w-full overflow-hidden rounded-[24px] border-[0.5px] border-[#e7e5e5] bg-[#f4f3f3]">
        <iframe
          title={`Map of ${address}`}
          src={embedUrl}
          className="h-full w-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </div>
    </div>
  );
}

function HostedByBlock({ organizerName }: { organizerName: string }) {
  const initial = organizerName.trim().charAt(0).toUpperCase() || 'J';

  return (
    <div className="flex w-full flex-col gap-4">
      <h2 className="font-serif-display text-[24px] font-normal leading-[32px] text-[#2e2e2e]">
        Hosted by
      </h2>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#e68c25] text-[16px] font-semibold leading-[24px] text-[#fafafa]">
            {initial}
          </span>
          <div className="flex flex-col gap-0.5">
            <span className="text-[14px] font-semibold leading-[20px] text-[#2e2e2e]">
              {organizerName}
            </span>
            <span className="text-[12px] font-medium leading-[16px] text-[#807e7e]">
              Organizer
            </span>
          </div>
        </div>

        <OrganizerSocials />
      </div>
    </div>
  );
}

export function EventDetailsPage({
  event,
  variant,
  onBack,
  onNavigateHome,
  onNavigateExplore,
  onNavigateAbout,
  onOpenCreateModal,
  onOpenSignInModal,
  onGetTicket,
}: EventDetailsPageProps) {
  const [expanded, setExpanded] = useState(false);
  const [reported, setReported] = useState(false);

  const { paragraphs, more } = getDefaultDescription(event);
  const organizerName = event.organizerName ?? 'Jambo Events Collective';
  const fullAddress =
    event.fullAddress ??
    `${event.venue}, ${event.city}`;

  const variantMeta = EVENT_DETAILS_VARIANTS[variant];

  const reportButton = (
    <button
      type="button"
      onClick={() => setReported(true)}
      className="flex min-h-[44px] cursor-pointer items-center gap-2 rounded-lg px-2.5 py-2 text-[14px] font-medium leading-[20px] text-[#d80027] transition-colors hover:bg-[#d80027]/5"
    >
      <img src="/assets/261e8.svg" alt="" className="size-6 shrink-0" />
      <span>{reported ? 'Event reported' : 'Report this event'}</span>
    </button>
  );

  const backButton = (
    <button
      type="button"
      onClick={onBack}
      className="-ml-2 inline-flex min-h-[44px] cursor-pointer items-center gap-3 rounded-lg px-2 text-[16px] font-medium leading-[24px] text-black transition-opacity hover:opacity-70"
    >
      <img src="/assets/c5d14.svg" alt="" className="size-6 rotate-90" />
      <span>Back</span>
    </button>
  );

  const descriptionBlock = (
    <div className="space-y-4 text-[16px] leading-[24px] text-[#807e7e]">
      {paragraphs.map((p, idx) => (
        <p key={idx}>{p}</p>
      ))}
      {expanded && <p>{more}</p>}
      <button
        type="button"
        onClick={() => setExpanded((prev) => !prev)}
        className="-ml-2 inline-flex min-h-[44px] cursor-pointer items-center rounded-lg px-2 text-[16px] font-medium leading-[24px] text-[#ff5200] hover:underline"
      >
        {expanded ? 'Show less' : 'Show more...'}
      </button>
    </div>
  );

  const getTicketCta = (
    <button
      type="button"
      onClick={() => onGetTicket(event)}
      className="btn-jambo-primary flex h-[48px] w-full cursor-pointer items-center justify-center gap-2 rounded-[12px] px-[18px] text-[14px] font-semibold leading-[20px] text-white"
    >
      <span>Get ticket</span>
      <img src="/assets/b9518.svg" alt="" className="size-4" />
    </button>
  );

  return (
    <div
      className="min-h-screen bg-white text-[#2e2e2e]"
      data-event-details-variant={variantMeta.id}
    >
      <Navbar
        activePage="explore"
        onNavigateHome={onNavigateHome}
        onNavigateExplore={onNavigateExplore}
        onNavigateAbout={onNavigateAbout}
        onOpenCreateModal={onOpenCreateModal}
        onOpenSignInModal={onOpenSignInModal}
      />

      {variant === 'editorial-banner' ? (
        /* Variant 1: Editorial Banner (Figma 212:1980) */
        <main className="mx-auto max-w-[1440px] px-6 pb-24 pt-12 lg:px-[120px] lg:pt-20">
          <div>{backButton}</div>

          {/* Title + Meta + Report Row */}
          <div className="mt-10 flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
            <div className="flex flex-col gap-2">
              <h1 className="font-serif-display text-[36px] font-normal leading-[44px] text-[#2e2e2e] sm:text-[40px] sm:leading-[48px]">
                {event.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2">
                  <img src="/assets/2a40f.svg" alt="" className="size-6 shrink-0" />
                  <span className="text-[13px] leading-[20px] text-[#807e7e]">{event.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <img src="/assets/1ea76.svg" alt="" className="size-6 shrink-0" />
                  <span className="text-[13px] leading-[20px] text-[#807e7e]">{event.venue}</span>
                </div>
              </div>
            </div>

            {reportButton}
          </div>

          {/* Full-Width 1200x500 Hero Banner */}
          <div className="mt-8 h-[320px] w-full overflow-hidden rounded-[24px] bg-[#f4f3f3] sm:h-[420px] lg:h-[500px]">
            <img
              src={event.wideImage ?? event.image}
              alt={event.title}
              className="h-full w-full object-cover object-center"
            />
          </div>

          {/* 2-Column Content Row */}
          <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-6">
            {/* Left: About this event + Get ticket */}
            <div className="flex flex-col gap-10">
              <div className="flex flex-col gap-4">
                <h2 className="font-serif-display text-[24px] font-normal leading-[32px] text-[#2e2e2e]">
                  About this event
                </h2>
                {descriptionBlock}
              </div>
              {getTicketCta}
            </div>

            {/* Right: Hosted by + Direction Map */}
            <div className="flex flex-col gap-10">
              <HostedByBlock organizerName={organizerName} />
              <DirectionMapCard address={fullAddress} />
            </div>
          </div>
        </main>
      ) : (
        /* Variant 2: Split Showcase (Figma 223:2878) — full-bleed left edge & viewport-height banner */
        <main className="grid w-full grid-cols-1 lg:grid-cols-[46%_54%]">
          {/* Left Panel: Full-bleed Event Poster touching left edge & filling viewport height */}
          <div className="relative h-[70vh] min-h-[460px] w-full overflow-hidden bg-[#1a1a1a] lg:sticky lg:top-0 lg:h-[calc(100vh-82px)]">
            <img
              src={event.wideImage ?? event.image}
              alt={event.title}
              className="h-full w-full object-cover object-center"
            />

            {/* Top scrim so upper-banner controls stay legible on any poster */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 h-[150px]"
              style={{
                background:
                  'linear-gradient(to bottom, rgba(0,0,0,0.68) 0%, rgba(0,0,0,0) 100%)',
              }}
            />

            {/* Upper Banner Overlay: Back (mobile + desktop) & Report this event (mobile only) */}
            <div className="absolute inset-x-4 top-4 z-10 flex items-center justify-between gap-3 lg:inset-x-12 lg:top-10 xl:left-16">
              <button
                type="button"
                onClick={onBack}
                className="inline-flex min-h-[44px] cursor-pointer items-center gap-2 rounded-full bg-black/35 px-3.5 text-[15px] font-medium leading-[24px] text-[#fafafa] backdrop-blur-md transition-colors hover:bg-black/55 lg:bg-black/25 lg:px-4 lg:text-[16px]"
              >
                <img
                  src="/assets/c5d14.svg"
                  alt=""
                  className="size-5 rotate-90 brightness-0 invert lg:size-6"
                />
                <span>Back</span>
              </button>

              <button
                type="button"
                onClick={() => setReported(true)}
                className="inline-flex min-h-[44px] cursor-pointer items-center gap-2 rounded-full bg-white/92 px-3.5 text-[13px] font-medium leading-[20px] text-[#d80027] shadow-sm backdrop-blur-md transition-colors hover:bg-white lg:hidden"
              >
                <img src="/assets/261e8.svg" alt="" className="size-5 shrink-0" />
                <span>{reported ? 'Event reported' : 'Report this event'}</span>
              </button>
            </div>

            <div
              className="pointer-events-none absolute inset-x-0 bottom-0 h-[320px]"
              style={{
                background:
                  'linear-gradient(to top, rgba(0,0,0,0.88) 28%, rgba(0,0,0,0) 100%)',
              }}
            />
            <div className="absolute inset-x-6 bottom-8 flex flex-col gap-3 lg:inset-x-12 lg:bottom-12">
              <h1 className="font-serif-display text-[36px] font-normal leading-[44px] text-white sm:text-[40px] sm:leading-[48px]">
                {event.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2">
                  <img src="/assets/b9c47.svg" alt="" className="size-6 shrink-0" />
                  <span className="text-[13px] leading-[20px] text-[#e7e5e5]">{event.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <img src="/assets/53a02.svg" alt="" className="size-6 shrink-0" />
                  <span className="text-[13px] leading-[20px] text-[#e7e5e5]">{event.venue}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel: Scrollable Details, CTA, Map, Host */}
          <div className="flex flex-col gap-10 px-6 py-8 lg:py-12 lg:pl-16 lg:pr-12 xl:pl-20 xl:pr-16">
            {/* Desktop Top Bar: Report this event aligned right (Figma 223:3412) */}
            <div className="hidden items-center justify-end lg:flex">{reportButton}</div>

            {/* About + CTA */}
            <div className="flex flex-col gap-6">
              {descriptionBlock}
              {getTicketCta}
            </div>

            {/* Direction Map */}
            <DirectionMapCard address={fullAddress} />

            {/* Hosted by */}
            <div className="pb-6">
              <HostedByBlock organizerName={organizerName} />
            </div>
          </div>
        </main>
      )}

      <FooterSection onNavigateAbout={onNavigateAbout} />
    </div>
  );
}
