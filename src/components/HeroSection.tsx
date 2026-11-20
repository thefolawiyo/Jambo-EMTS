import { useState } from 'react';
import { Navbar } from './Navbar';

interface HeroSectionProps {
  searchQuery: string;
  onSearchQueryChange: (val: string) => void;
  selectedScope: string;
  onSelectedScopeChange: (val: string) => void;
  onSearchSubmit: () => void;
  onNavigateHome: (sectionId?: string) => void;
  onNavigateExplore: () => void;
  onNavigateAbout?: () => void;
  onOpenCreateModal: () => void;
  onOpenSignInModal: () => void;
}

const SEARCH_SCOPES = ['All events', 'Concerts', 'Conferences', 'Festivals', 'Workshops', 'Free events'];

export function HeroSection({
  searchQuery,
  onSearchQueryChange,
  selectedScope,
  onSelectedScopeChange,
  onSearchSubmit,
  onNavigateHome,
  onNavigateExplore,
  onNavigateAbout,
  onOpenCreateModal,
  onOpenSignInModal,
}: HeroSectionProps) {
  const [scopeOpen, setScopeOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchSubmit();
  };

  return (
    <section className="relative overflow-hidden bg-white pb-14">
      {/* Ambient Radial Blur Orbs matching Figma 30:4367 */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        {/* Left warm peach orb */}
        <div
          className="absolute -left-[220px] -top-[72px] h-[604px] w-[640px] rounded-full blur-[22px]"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(255,217,194,1) 0%, rgba(255,217,194,0) 62%)',
          }}
        />
        {/* Right soft sage green orb */}
        <div
          className="absolute -right-[138px] top-[144px] h-[460px] w-[460px] rounded-full blur-[18px]"
          style={{
            background:
              'radial-gradient(circle at center, rgba(207,231,214,1) 0%, rgba(207,231,214,0) 62%)',
          }}
        />
        {/* Bottom-center soft periwinkle blue orb */}
        <div
          className="absolute bottom-[90px] left-1/2 h-[417px] w-[695px] -translate-x-1/2 rounded-full blur-[28px]"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(216,228,255,0.95) 0%, rgba(216,228,255,0) 62%)',
          }}
        />
      </div>

      {/* Top Navigation Bar (Figma 36:247) */}
      <Navbar
        activePage="home"
        onNavigateHome={onNavigateHome}
        onNavigateExplore={onNavigateExplore}
        onNavigateAbout={onNavigateAbout}
        onOpenCreateModal={onOpenCreateModal}
        onOpenSignInModal={onOpenSignInModal}
      />

      {/* Main Hero Copy & Interactive Search */}
      <div className="relative z-10 mx-auto mt-[88px] flex max-w-[740px] flex-col items-center px-6 text-center md:mt-[120px]">
        {/* Live Pill */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-[20px] px-4 py-2">
          <span className="flex size-2 items-center justify-center rounded-full bg-[#fff2eb]">
            <span className="size-1 rounded-full bg-[#ff5200]" />
          </span>
          <span className="text-[13px] font-normal uppercase leading-[20px] tracking-[0.02em] text-[#807e7e]">
            NOW LIVE IN 20+ CITIES WORLDWIDE
          </span>
        </div>

        {/* Display Headline (Figma 30:4368 — Vend Sans Bold + Instrument Serif Italic accent) */}
        <h1 className="font-display text-[44px] font-bold leading-[1.08] tracking-[-0.72px] text-[#2e2e2e] sm:text-[60px] md:text-[72px] md:leading-[80px]">
          <span className="block">
            Where{' '}
            <em className="font-serif-brand font-normal italic text-[#ff5200]">great</em>
          </span>
          <span className="block">events come to life</span>
        </h1>

        {/* Subtitle (Figma 30:4369) */}
        <p className="mt-6 max-w-[687px] text-[16px] font-normal leading-[24px] text-[#807e7e]">
          Jambo is the all-in-one ticketing and event platform built for the moments people
          remember. Discover what&apos;s on, book in seconds, and run shows your audience will rave
          about.
        </p>

        {/* Search Bar (Figma 30:4458) */}
        <form
          onSubmit={handleSubmit}
          className="relative mt-10 flex w-full max-w-[680px] flex-col gap-2 rounded-[16px] border-[0.5px] border-[#e7e5e5] bg-white p-2 shadow-[0px_8px_24px_0px_rgba(46,46,46,0.1)] sm:h-[62px] sm:flex-row sm:items-center sm:gap-0 sm:p-0 sm:pl-4 sm:pr-[7px]"
        >
          {/* Category Scope Dropdown */}
          <div className="relative shrink-0">
            <button
              type="button"
              onClick={() => setScopeOpen((prev) => !prev)}
              className="flex cursor-pointer items-center gap-2 py-2 text-left sm:py-0"
            >
              <img src="/assets/eedfb.svg" alt="" className="size-6 shrink-0" />
              <span className="whitespace-nowrap text-[14px] font-semibold leading-[20px] text-[#2e2e2e]">
                {selectedScope}
              </span>
              <img
                src="/assets/ce1e2.svg"
                alt=""
                className={`size-4 shrink-0 transition-transform ${scopeOpen ? 'rotate-180' : ''}`}
              />
            </button>
            {scopeOpen && (
              <div className="absolute left-0 top-11 z-30 w-44 rounded-xl border border-[#e7e5e5] bg-white p-1.5 text-left shadow-lg">
                {SEARCH_SCOPES.map((scope) => (
                  <button
                    key={scope}
                    type="button"
                    onClick={() => {
                      onSelectedScopeChange(scope);
                      setScopeOpen(false);
                    }}
                    className={`block w-full cursor-pointer rounded-lg px-3 py-2 text-left text-[13px] transition-colors ${
                      selectedScope === scope
                        ? 'bg-[#fff2eb] font-medium text-[#ff5200]'
                        : 'text-[#2e2e2e] hover:bg-[#f4f3f3]'
                    }`}
                  >
                    {scope}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Vertical Divider */}
          <div className="mx-4 hidden h-6 w-px shrink-0 sm:block">
            <img src="/assets/83d43.svg" alt="" className="h-full w-full" />
          </div>

          {/* Search Input */}
          <div className="flex flex-1 items-center gap-3.5 pr-2">
            <img src="/assets/bc567.svg" alt="" className="size-6 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchQueryChange(e.target.value)}
              placeholder="Search by event name, venues, artists…"
              className="w-full bg-transparent text-[14px] leading-[20px] text-[#2e2e2e] placeholder:text-[#807e7e] focus:outline-none"
            />
          </div>

          {/* Search Submit Button */}
          <button
            type="submit"
            className="btn-jambo-primary flex h-[48px] shrink-0 cursor-pointer items-center justify-center gap-2 rounded-[12px] px-[18px] text-[14px] font-semibold leading-[20px] text-white"
          >
            <span>Search</span>
            <img src="/assets/b9518.svg" alt="" className="size-4" />
          </button>
        </form>

        {/* Secondary CTA Row */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <button
            type="button"
            onClick={onNavigateExplore}
            className="btn-jambo-primary flex h-[48px] cursor-pointer items-center justify-center gap-2 rounded-[12px] px-[18px] text-[14px] font-semibold leading-[20px] text-white"
          >
            <span>Explore events</span>
            <img src="/assets/b9518.svg" alt="" className="size-4" />
          </button>
          <button
            type="button"
            onClick={onOpenCreateModal}
            className="btn-jambo-interactive flex h-[48px] cursor-pointer items-center justify-center rounded-[12px] bg-white px-[18px] text-[14px] font-semibold leading-[20px] text-[#2e2e2e] hover:bg-[#f4f3f3]"
          >
            <span>Create event</span>
          </button>
        </div>
      </div>

      {/* Floating "Dancing Snippets" Cards (Figma 30:5577) */}
      <div className="relative z-10 mx-auto mt-16 max-w-[960px] px-6">
        {/* Top Row: Tickets Sold, Group Therapy Ticket, Events Hosted */}
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row md:gap-6">
          {/* Card 1: Tickets sold */}
          <div className="animate-float-slow -rotate-4" style={{ animationDelay: '0s' }}>
            <div className="flex w-[178px] items-center gap-3 rounded-[24px] bg-white px-4 py-3 shadow-[0px_0px_0px_1px_#e7e5e5,0px_8px_24px_-8px_rgba(46,46,46,0.12)]">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-[12px] bg-[#fff2eb]">
                <img src="/assets/add3f.svg" alt="" className="size-6" />
              </div>
              <div className="text-left">
                <p className="text-[13px] leading-[20px] text-[#807e7e]">Tickets sold</p>
                <p className="font-display text-[18px] font-bold leading-[26px] tracking-[-0.02em] text-[#2e2e2e]">
                  250K+
                </p>
              </div>
            </div>
          </div>

          {/* Card 2: Center Event Ticket (Group Therapy) */}
          <div className="animate-float-slow -rotate-[5.8deg]" style={{ animationDelay: '1.2s' }}>
            <div className="flex w-[280px] flex-col gap-3 rounded-[24px] bg-white p-4 shadow-[0px_0px_0px_1px_#e7e5e5,0px_12px_28px_-10px_rgba(46,46,46,0.14)]">
              <div className="flex items-start justify-between">
                <div className="text-left">
                  <p className="text-[13px] leading-[20px] text-[#807e7e]">Rave · LAGOS</p>
                  <p className="font-display text-[18px] font-bold leading-[26px] tracking-[-0.02em] text-[#2e2e2e]">
                    Group Therapy
                  </p>
                  <p className="text-[12px] leading-[16px] text-[#807e7e]">
                    Sat, Jul 18th · 08:00 PM
                  </p>
                </div>
                <span className="rounded-[12px] bg-[#fff2eb] px-2 py-1 text-[14px] font-medium leading-[20px] text-[#ff5200]">
                  ₦25K
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="size-2 shrink-0 rounded-full bg-[#0fb5a0]" />
                <span className="h-px flex-1 border-t border-dashed border-[#807e7e]" />
                <span className="size-2 shrink-0 rounded-full bg-[#0fb5a0]" />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-[11px] leading-[16px] text-[#807e7e]">
                  Woodland Forest Park · Lagos
                </span>
                <span className="font-mono text-[11px] leading-[16px] text-[#2e2e2e]">
                  #JMB-04812
                </span>
              </div>
            </div>
          </div>

          {/* Card 3: Events hosted */}
          <div className="animate-float-slow rotate-2" style={{ animationDelay: '0.6s' }}>
            <div className="flex w-[188px] items-center gap-3 rounded-[24px] bg-white px-4 py-3 shadow-[0px_0px_0px_1px_#e7e5e5,0px_8px_24px_-8px_rgba(46,46,46,0.12)]">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-[12px] bg-[#fff2eb]">
                <img src="/assets/96766.svg" alt="" className="size-6" />
              </div>
              <div className="text-left">
                <p className="text-[13px] leading-[20px] text-[#807e7e]">Events hosted</p>
                <p className="font-display text-[18px] font-bold leading-[26px] tracking-[-0.02em] text-[#2e2e2e]/75">
                  317
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Row: +372 just booked & Verified Check-in 0.4s */}
        <div className="mt-12 flex flex-col items-center justify-center gap-8 md:mt-16 md:flex-row md:gap-40">
          {/* Pill: +372 just booked */}
          <div className="rotate-2">
            <div className="flex items-center gap-3 rounded-full bg-white py-2 pl-2 pr-4 shadow-[0px_0px_0px_1px_#e7e5e5,0px_8px_24px_-8px_rgba(46,46,46,0.12)]">
              <div className="flex items-center">
                <span className="relative -mr-1.5 flex size-7 items-end justify-center overflow-hidden rounded-full border border-white bg-[#fceeeb]">
                  <img src="/assets/369f0.png" alt="" className="size-[22px] object-cover" />
                </span>
                <span className="relative -mr-1.5 flex size-7 items-end justify-center overflow-hidden rounded-full border border-white bg-[#eaf0fd]">
                  <img src="/assets/fab70.png" alt="" className="size-[20px] object-cover" />
                </span>
                <span className="relative -mr-1.5 flex size-7 items-end justify-center overflow-hidden rounded-full border border-white bg-[#eaf5f0]">
                  <img src="/assets/fd2f4.png" alt="" className="size-[20px] object-cover" />
                </span>
                <span className="relative flex size-7 items-end justify-center overflow-hidden rounded-full border border-white bg-[#f6eefe]">
                  <img src="/assets/c0ab7.png" alt="" className="size-[22px] object-cover" />
                </span>
              </div>
              <p className="text-[14px] leading-[20px] whitespace-nowrap">
                <span className="font-medium text-[#2e2e2e]">+372 just booked</span>{' '}
                <span className="font-normal text-[#807e7e]">in your city</span>
              </p>
            </div>
          </div>

          {/* Card: Verified Check-in · 0.4s */}
          <div className="-rotate-3">
            <div className="flex items-center gap-3 rounded-[24px] bg-white px-4 py-3 shadow-[0px_0px_0px_1px_#e7e5e5,0px_8px_24px_-8px_rgba(46,46,46,0.12)]">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-[10px] bg-[#2e2e2e]">
                <img src="/assets/bf0f9.svg" alt="" className="size-11" />
              </div>
              <div className="text-left">
                <p className="text-[13px] leading-[20px] text-[#807e7e]">Verified</p>
                <p className="whitespace-nowrap text-[14px] font-medium leading-[20px] text-[#2e2e2e]">
                  Check-in · 0.4s
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
