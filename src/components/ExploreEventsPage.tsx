import { useState } from 'react';
import {
  CITIES,
  EXPLORE_ALL_EVENTS,
  SPOTLIGHT_EVENTS,
  type EventItem,
} from '../data/jamboData';
import { Navbar } from './Navbar';
import { FooterSection } from './FooterSection';

interface ExploreEventsPageProps {
  initialSearchQuery?: string;
  initialScope?: string;
  featuredEvents?: EventItem[];
  onNavigateHome: (sectionId?: string) => void;
  onNavigateExplore: () => void;
  onNavigateAbout?: () => void;
  onOpenCreateModal: () => void;
  onOpenSignInModal: () => void;
  onSelectEvent: (event: EventItem) => void;
}

const SCOPE_OPTIONS = [
  'All events',
  'Concerts',
  'Conferences',
  'Festivals',
  'Workshops',
  'Networking',
  'Technology',
  'Community',
];

const PRICE_OPTIONS = ['All prices', 'Free', 'Under ₦20,000', '₦20,000+'];
const DATE_OPTIONS = ['Any date', 'Today', 'This Weekend', 'Upcoming'];
const PAGE_NUMBERS: Array<number | 'ellipsis'> = [1, 2, 3, 'ellipsis', 12, 13, 14];

export function ExploreEventsPage({
  initialSearchQuery = '',
  initialScope = 'All events',
  featuredEvents = SPOTLIGHT_EVENTS,
  onNavigateHome,
  onNavigateExplore,
  onNavigateAbout,
  onOpenCreateModal,
  onOpenSignInModal,
  onSelectEvent,
}: ExploreEventsPageProps) {
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [selectedScope, setSelectedScope] = useState(initialScope);
  const [selectedLocation, setSelectedLocation] = useState('All cities');
  const [selectedPrice, setSelectedPrice] = useState('All prices');
  const [selectedDate, setSelectedDate] = useState('Any date');

  const [openDropdown, setOpenDropdown] = useState<
    null | 'scope' | 'location' | 'price' | 'date'
  >(null);

  const [spotlightOffset, setSpotlightOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(3);

  const toggleDropdown = (name: 'scope' | 'location' | 'price' | 'date') => {
    setOpenDropdown((prev) => (prev === name ? null : name));
  };

  const matchesFilters = (evt: EventItem) => {
    const matchesScope =
      selectedScope === 'All events' ||
      (selectedScope === 'Free events'
        ? evt.priceValue === 0
        : evt.categories.includes(selectedScope));

    const matchesLocation =
      selectedLocation === 'All cities' || evt.city === selectedLocation;

    const matchesPrice =
      selectedPrice === 'All prices' ||
      (selectedPrice === 'Free' && evt.priceValue === 0) ||
      (selectedPrice === 'Under ₦20,000' &&
        evt.priceValue > 0 &&
        evt.priceValue < 20000) ||
      (selectedPrice === '₦20,000+' && evt.priceValue >= 20000);

    const matchesDate =
      selectedDate === 'Any date' ||
      selectedDate === 'Upcoming' ||
      evt.categories.includes(selectedDate);

    const q = searchQuery.trim().toLowerCase();
    const matchesQuery =
      !q ||
      evt.title.toLowerCase().includes(q) ||
      evt.venue.toLowerCase().includes(q) ||
      evt.city.toLowerCase().includes(q);

    return (
      matchesScope &&
      matchesLocation &&
      matchesPrice &&
      matchesDate &&
      matchesQuery
    );
  };

  const filteredSpotlights = featuredEvents.filter(matchesFilters);
  const isTwoFeaturedLayout = filteredSpotlights.length === 2;

  const visibleSpotlights =
    filteredSpotlights.length > 2
      ? Array.from({ length: 3 }, (_, idx) => {
          const index = (spotlightOffset + idx) % filteredSpotlights.length;
          return filteredSpotlights[index];
        })
      : filteredSpotlights;

  const handleSpotlightPrev = () => {
    if (filteredSpotlights.length <= 2) return;
    setSpotlightOffset(
      (prev) => (prev - 1 + filteredSpotlights.length) % filteredSpotlights.length,
    );
  };

  const handleSpotlightNext = () => {
    if (filteredSpotlights.length <= 2) return;
    setSpotlightOffset((prev) => (prev + 1) % filteredSpotlights.length);
  };

  const filteredEvents = EXPLORE_ALL_EVENTS.filter(matchesFilters);

  const trimmedQuery = searchQuery.trim();
  const isSearchMode = trimmedQuery.length > 0;
  const searchableCatalog = [...featuredEvents, ...EXPLORE_ALL_EVENTS];
  const searchResults = isSearchMode ? searchableCatalog.filter(matchesFilters) : [];

  const hasActiveFilters =
    trimmedQuery !== '' ||
    selectedScope !== 'All events' ||
    selectedLocation !== 'All cities' ||
    selectedPrice !== 'All prices' ||
    selectedDate !== 'Any date';

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedScope('All events');
    setSelectedLocation('All cities');
    setSelectedPrice('All prices');
    setSelectedDate('Any date');
    setOpenDropdown(null);
  };

  return (
    <div className="min-h-screen bg-white text-[#2e2e2e]">
      <Navbar
        activePage="explore"
        onNavigateHome={onNavigateHome}
        onNavigateExplore={onNavigateExplore}
        onNavigateAbout={onNavigateAbout}
        onOpenCreateModal={onOpenCreateModal}
        onOpenSignInModal={onOpenSignInModal}
      />

      <main>
        {/* Top Search, Filters & Featured Spotlight Section (Figma 146:915) */}
        <section className="bg-white pb-12 pt-12 lg:pt-20">
          <div className="mx-auto max-w-[1440px] px-6 lg:px-[120px]">
            {/* Search + Filter Dropdowns Row (Figma 147:2748) */}
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              {/* Left Combined Search Bar (w-[640px] h-[48px]) */}
              <div className="flex h-[48px] w-full items-center rounded-[12px] border-[0.5px] border-[#e7e5e5] bg-white px-4 lg:max-w-[640px]">
                {/* Scope Dropdown */}
                <div className="relative shrink-0">
                  <button
                    type="button"
                    onClick={() => toggleDropdown('scope')}
                    className="flex cursor-pointer items-center gap-2"
                  >
                    <img src="/assets/f0b57.svg" alt="" className="size-5 shrink-0" />
                    <span className="whitespace-nowrap text-[14px] font-semibold leading-[20px] text-[#2e2e2e]">
                      {selectedScope}
                    </span>
                    <img
                      src="/assets/ce1e2.svg"
                      alt=""
                      className={`size-4 shrink-0 transition-transform ${
                        openDropdown === 'scope' ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {openDropdown === 'scope' && (
                    <div className="absolute left-0 top-10 z-30 w-44 rounded-xl border border-[#e7e5e5] bg-white p-1.5 shadow-lg">
                      {SCOPE_OPTIONS.map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => {
                            setSelectedScope(opt);
                            setOpenDropdown(null);
                          }}
                          className={`block w-full cursor-pointer rounded-lg px-3 py-2 text-left text-[13px] transition-colors ${
                            selectedScope === opt
                              ? 'bg-[#fff2eb] font-medium text-[#ff5200]'
                              : 'text-[#2e2e2e] hover:bg-[#f4f3f3]'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Vertical Divider */}
                <div className="mx-4 h-6 w-px shrink-0">
                  <img src="/assets/83d43.svg" alt="" className="h-full w-full" />
                </div>

                {/* Search Input */}
                <div className="flex flex-1 items-center gap-3">
                  <img src="/assets/2b194.svg" alt="" className="size-5 shrink-0" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by event name, venues, artists…"
                    className="w-full bg-transparent text-[14px] leading-[20px] text-[#2e2e2e] placeholder:text-[#807e7e] focus:outline-none"
                  />
                </div>
              </div>

              {/* Right Filter Controls: Location, Price, Date (Figma 147:2747) */}
              <div className="flex flex-wrap items-center gap-4">
                {/* Location Filter */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => toggleDropdown('location')}
                    className={`flex h-[48px] min-w-[144px] cursor-pointer items-center justify-between gap-2 rounded-[12px] border-[0.5px] bg-white px-4 text-[14px] leading-[20px] transition-colors hover:bg-[#fafafa] ${
                      selectedLocation !== 'All cities'
                        ? 'border-[#ff5200] text-[#2e2e2e]'
                        : 'border-[#e7e5e5] text-[#807e7e]'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <img src="/assets/0d2e0.svg" alt="" className="size-4 shrink-0" />
                      <span className="whitespace-nowrap">
                        {selectedLocation === 'All cities' ? 'Location' : selectedLocation}
                      </span>
                    </span>
                    <img
                      src="/assets/ce1e2.svg"
                      alt=""
                      className={`size-4 shrink-0 transition-transform ${
                        openDropdown === 'location' ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {openDropdown === 'location' && (
                    <div className="absolute right-0 top-13 z-30 w-44 rounded-xl border border-[#e7e5e5] bg-white p-1.5 shadow-lg">
                      {CITIES.map((city) => (
                        <button
                          key={city}
                          type="button"
                          onClick={() => {
                            setSelectedLocation(city);
                            setOpenDropdown(null);
                          }}
                          className={`block w-full cursor-pointer rounded-lg px-3 py-2 text-left text-[13px] transition-colors ${
                            selectedLocation === city
                              ? 'bg-[#fff2eb] font-medium text-[#ff5200]'
                              : 'text-[#2e2e2e] hover:bg-[#f4f3f3]'
                          }`}
                        >
                          {city}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Price Filter */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => toggleDropdown('price')}
                    className={`flex h-[48px] min-w-[136px] cursor-pointer items-center justify-between gap-2 rounded-[12px] border-[0.5px] bg-white px-4 text-[14px] leading-[20px] transition-colors hover:bg-[#fafafa] ${
                      selectedPrice !== 'All prices'
                        ? 'border-[#ff5200] text-[#2e2e2e]'
                        : 'border-[#e7e5e5] text-[#807e7e]'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <img src="/assets/f1448.svg" alt="" className="size-4 shrink-0" />
                      <span className="whitespace-nowrap">
                        {selectedPrice === 'All prices' ? 'Price' : selectedPrice}
                      </span>
                    </span>
                    <img
                      src="/assets/ce1e2.svg"
                      alt=""
                      className={`size-4 shrink-0 transition-transform ${
                        openDropdown === 'price' ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {openDropdown === 'price' && (
                    <div className="absolute right-0 top-13 z-30 w-44 rounded-xl border border-[#e7e5e5] bg-white p-1.5 shadow-lg">
                      {PRICE_OPTIONS.map((price) => (
                        <button
                          key={price}
                          type="button"
                          onClick={() => {
                            setSelectedPrice(price);
                            setOpenDropdown(null);
                          }}
                          className={`block w-full cursor-pointer rounded-lg px-3 py-2 text-left text-[13px] transition-colors ${
                            selectedPrice === price
                              ? 'bg-[#fff2eb] font-medium text-[#ff5200]'
                              : 'text-[#2e2e2e] hover:bg-[#f4f3f3]'
                          }`}
                        >
                          {price}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Date Filter */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => toggleDropdown('date')}
                    className={`flex h-[48px] min-w-[136px] cursor-pointer items-center justify-between gap-2 rounded-[12px] border-[0.5px] bg-white px-4 text-[14px] leading-[20px] transition-colors hover:bg-[#fafafa] ${
                      selectedDate !== 'Any date'
                        ? 'border-[#ff5200] text-[#2e2e2e]'
                        : 'border-[#e7e5e5] text-[#807e7e]'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <img src="/assets/adf22.svg" alt="" className="size-4 shrink-0" />
                      <span className="whitespace-nowrap">
                        {selectedDate === 'Any date' ? 'Date' : selectedDate}
                      </span>
                    </span>
                    <img
                      src="/assets/ce1e2.svg"
                      alt=""
                      className={`size-4 shrink-0 transition-transform ${
                        openDropdown === 'date' ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {openDropdown === 'date' && (
                    <div className="absolute right-0 top-13 z-30 w-44 rounded-xl border border-[#e7e5e5] bg-white p-1.5 shadow-lg">
                      {DATE_OPTIONS.map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => {
                            setSelectedDate(opt);
                            setOpenDropdown(null);
                          }}
                          className={`block w-full cursor-pointer rounded-lg px-3 py-2 text-left text-[13px] transition-colors ${
                            selectedDate === opt
                              ? 'bg-[#fff2eb] font-medium text-[#ff5200]'
                              : 'text-[#2e2e2e] hover:bg-[#f4f3f3]'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Search Results Display (Figma 153:2066 & 153:3198) */}
            {isSearchMode ? (
              searchResults.length > 0 ? (
                <div className="mt-10 min-h-[540px] pb-16">
                  <div className="flex flex-col gap-2">
                    <h1 className="font-serif-display text-[36px] font-normal leading-[44px] text-[#2e2e2e] sm:text-[40px] sm:leading-[48px]">
                      “{trimmedQuery}”
                    </h1>
                    <p className="text-[16px] leading-[24px] text-[#807e7e]">
                      Showing {searchResults.length}{' '}
                      {searchResults.length === 1 ? 'result' : 'results'}
                    </p>
                  </div>

                  <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {searchResults.map((evt) => (
                      <article
                        key={evt.id}
                        onClick={() => onSelectEvent(evt)}
                        className="group flex cursor-pointer flex-col overflow-hidden rounded-[24px] border-[0.5px] border-[#e7e5e5] bg-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0px_14px_30px_-14px_rgba(46,46,46,0.14)]"
                      >
                        <div className="relative h-[192px] w-full overflow-hidden bg-[#f4f3f3]">
                          <img
                            src={evt.image}
                            alt={evt.title}
                            className={`h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03] ${
                              evt.imageOffsetClass ?? 'object-center'
                            }`}
                          />
                        </div>

                        <div className="flex flex-1 flex-col p-4 pt-6">
                          <h3
                            title={evt.title}
                            className="truncate font-serif-display text-[24px] font-normal leading-[30px] tracking-[-0.24px] text-[#2e2e2e]"
                          >
                            {evt.title}
                          </h3>

                          <div className="mt-4 flex flex-col gap-2">
                            <div className="flex items-center gap-2">
                              <img src="/assets/a4515.svg" alt="" className="size-6 shrink-0" />
                              <span className="truncate text-[13px] leading-[20px] text-[#807e7e]">
                                {evt.date}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <img src="/assets/ab538.svg" alt="" className="size-6 shrink-0" />
                              <span className="truncate text-[13px] leading-[20px] text-[#807e7e]">
                                {evt.venue}
                              </span>
                            </div>
                          </div>

                          <div className="mt-6 pt-4">
                            <img src="/assets/d2a34.svg" alt="" className="mb-4 w-full" />
                            <div className="flex items-center justify-between">
                              <p className="text-[14px] leading-[20px] text-[#2e2e2e]">
                                {evt.pricePrefix && (
                                  <span className="font-normal text-[#807e7e]">
                                    {evt.pricePrefix}{' '}
                                  </span>
                                )}
                                <span className="font-medium">{evt.priceLabel}</span>
                              </p>

                              <button
                                type="button"
                                onClick={() => onSelectEvent(evt)}
                                className="flex cursor-pointer items-center gap-2 text-[14px] font-medium leading-[20px] text-[#ff5200] transition-opacity hover:opacity-80"
                              >
                                <span>Get ticket</span>
                                <img
                                  src="/assets/478cf.svg"
                                  alt=""
                                  className="size-4 rotate-180 -scale-y-100"
                                />
                              </button>
                            </div>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              ) : (
                /* Empty Search State (Figma 153:3198) */
                <div className="mx-auto flex min-h-[540px] max-w-[588px] flex-col items-center justify-center py-20 text-center">
                  <img
                    src="/assets/empty_search_state.png"
                    alt=""
                    className="size-[200px] object-contain"
                  />
                  <h1 className="mt-6 font-serif-display text-[36px] font-normal leading-[44px] text-[#2e2e2e] sm:text-[40px] sm:leading-[48px]">
                    No result found.
                  </h1>
                  <p className="mt-2 text-[16px] leading-[24px] text-[#807e7e]">
                    No event match your search keywords at the moment. Try a different keyword.
                  </p>
                </div>
              )
            ) : (
              /* Featured Events Spotlight Section */
              visibleSpotlights.length > 0 && (
                <>
                  <div className="mt-12 flex items-center justify-between">
                    <h1 className="font-serif-display text-[36px] font-normal leading-[44px] text-[#2e2e2e] sm:text-[40px] sm:leading-[48px]">
                      Featured Events
                    </h1>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={handleSpotlightPrev}
                        disabled={filteredSpotlights.length <= 2}
                        aria-label="Previous featured events"
                        className="flex size-9 cursor-pointer items-center justify-center rounded-full bg-white transition-colors hover:bg-[#f4f3f3] disabled:cursor-default disabled:opacity-45"
                      >
                        <img src="/assets/5d4f2.svg" alt="" className="size-5" />
                      </button>
                      <button
                        type="button"
                        onClick={handleSpotlightNext}
                        disabled={filteredSpotlights.length <= 2}
                        aria-label="Next featured events"
                        className="flex size-9 cursor-pointer items-center justify-center rounded-full bg-white transition-colors hover:bg-[#fff2eb] disabled:cursor-default disabled:opacity-45"
                      >
                        <img src="/assets/15709.svg" alt="" className="size-5" />
                      </button>
                    </div>
                  </div>

                  {isTwoFeaturedLayout ? (
                    /* 2-Card Wide Featured Layout (Figma 295:2458) */
                    <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                      {visibleSpotlights.map((evt) => (
                        <button
                          key={evt.id}
                          type="button"
                          onClick={() => onSelectEvent(evt)}
                          className="group relative h-[410px] w-full cursor-pointer overflow-hidden rounded-[24px] border-[0.5px] border-[#e7e5e5] bg-[#f4f4f4] text-left"
                        >
                          <img
                            src={evt.wideImage ?? evt.image}
                            alt={evt.title}
                            className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                          />
                          <div
                            className="pointer-events-none absolute inset-x-0 bottom-0 h-[256px]"
                            style={{
                              background:
                                'linear-gradient(to top, rgba(0,0,0,0.85) 25%, rgba(0,0,0,0) 94%)',
                            }}
                          />
                          <div className="absolute inset-x-6 bottom-6 flex items-end justify-between gap-4">
                            <div className="min-w-0 flex-1">
                              <h2 className="truncate font-serif-display text-[32px] font-normal leading-[40px] text-[#fafafa]">
                                {evt.title}
                              </h2>
                              <div className="mt-4 flex items-center gap-2">
                                <img src="/assets/8cd25.svg" alt="" className="size-6 shrink-0" />
                                <span className="truncate text-[14px] font-medium leading-[20px] text-[#e7e5e5]">
                                  {evt.date}
                                </span>
                              </div>
                            </div>

                            <div className="flex w-[192px] shrink-0 items-center justify-end gap-2">
                              <img src="/assets/6a1dc.svg" alt="" className="size-6 shrink-0" />
                              <p className="line-clamp-2 w-[160px] text-left text-[14px] font-medium leading-[20px] text-[#e7e5e5]">
                                {evt.venue}
                              </p>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  ) : (
                    /* 3+ Cards Centered-Overlay Poster Layout (Figma 146:915) */
                    <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
                      {visibleSpotlights.map((evt) => (
                        <button
                          key={evt.id}
                          type="button"
                          onClick={() => onSelectEvent(evt)}
                          className="group relative h-[410px] w-full cursor-pointer overflow-hidden rounded-[24px] border-[0.5px] border-[#e7e5e5] bg-[#1a1a1a] text-center"
                        >
                          <img
                            src={evt.image}
                            alt={evt.title}
                            className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                          />
                          <div
                            className="pointer-events-none absolute inset-x-0 bottom-0 h-[256px]"
                            style={{
                              background:
                                'linear-gradient(to top, rgba(0,0,0,0.88) 41%, rgba(0,0,0,0) 94%)',
                            }}
                          />
                          <div className="absolute inset-x-8 bottom-6 flex flex-col items-center gap-4">
                            <h2 className="w-full truncate font-serif-display text-[32px] font-normal leading-[40px] text-[#fafafa]">
                              {evt.title}
                            </h2>
                            <div className="flex items-center justify-center gap-2">
                              <img src="/assets/8cd25.svg" alt="" className="size-6 shrink-0" />
                              <span className="text-[13px] leading-[20px] text-[#e7e5e5]">
                                {evt.date}
                              </span>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </>
              )
            )}
          </div>
        </section>

        {/* All Events 5x3 Grid & Pagination Section (Figma 146:974) */}
        {!isSearchMode && (
          <section className="bg-white py-16">
            <div className="mx-auto max-w-[1440px] px-6 lg:px-[120px]">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <h2 className="font-serif-display text-[36px] font-normal leading-[44px] text-[#2e2e2e] sm:text-[40px] sm:leading-[48px]">
                  All Events
                </h2>
                {hasActiveFilters && (
                  <button
                    type="button"
                    onClick={handleResetFilters}
                    className="cursor-pointer text-[13px] font-medium text-[#ff5200] hover:underline"
                  >
                    Clear filters ({filteredEvents.length} shown)
                  </button>
                )}
              </div>

              {filteredEvents.length > 0 ? (
                <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {filteredEvents.map((evt) => (
                    <article
                      key={evt.id}
                      onClick={() => onSelectEvent(evt)}
                      className="group flex cursor-pointer flex-col overflow-hidden rounded-[24px] border-[0.5px] border-[#e7e5e5] bg-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0px_14px_30px_-14px_rgba(46,46,46,0.14)]"
                    >
                      <div className="relative h-[192px] w-full overflow-hidden bg-[#f4f3f3]">
                        <img
                          src={evt.image}
                          alt={evt.title}
                          className={`h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03] ${
                            evt.imageOffsetClass ?? 'object-center'
                          }`}
                        />
                      </div>

                      <div className="flex flex-1 flex-col p-4 pt-6">
                        <h3
                          title={evt.title}
                          className="truncate font-serif-display text-[24px] font-normal leading-[30px] tracking-[-0.24px] text-[#2e2e2e]"
                        >
                          {evt.title}
                        </h3>

                        <div className="mt-4 flex flex-col gap-2">
                          <div className="flex items-center gap-2">
                            <img src="/assets/a4515.svg" alt="" className="size-6 shrink-0" />
                            <span className="truncate text-[13px] leading-[20px] text-[#807e7e]">
                              {evt.date}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <img src="/assets/ab538.svg" alt="" className="size-6 shrink-0" />
                            <span className="truncate text-[13px] leading-[20px] text-[#807e7e]">
                              {evt.venue}
                            </span>
                          </div>
                        </div>

                        <div className="mt-6 pt-4">
                          <img src="/assets/d2a34.svg" alt="" className="mb-4 w-full" />
                          <div className="flex items-center justify-between">
                            <p className="text-[14px] leading-[20px] text-[#2e2e2e]">
                              {evt.pricePrefix && (
                                <span className="font-normal text-[#807e7e]">
                                  {evt.pricePrefix}{' '}
                                </span>
                              )}
                              <span className="font-medium">{evt.priceLabel}</span>
                            </p>

                            <button
                              type="button"
                              onClick={() => onSelectEvent(evt)}
                              className="flex cursor-pointer items-center gap-2 text-[14px] font-medium leading-[20px] text-[#ff5200] transition-opacity hover:opacity-80"
                            >
                              <span>Get ticket</span>
                              <img
                                src="/assets/478cf.svg"
                                alt=""
                                className="size-4 rotate-180 -scale-y-100"
                              />
                            </button>
                          </div>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              ) : (
                <div className="mt-8 flex flex-col items-center justify-center rounded-[24px] border border-dashed border-[#d4d2d2] py-16 text-center">
                  <p className="font-serif-display text-[28px] text-[#2e2e2e]">
                    No matching events
                  </p>
                  <p className="mt-2 max-w-md text-[14px] text-[#807e7e]">
                    Try adjusting your search term, location, price, or date filters.
                  </p>
                  <button
                    type="button"
                    onClick={handleResetFilters}
                    className="btn-jambo-primary mt-5 cursor-pointer rounded-[12px] px-5 py-2.5 text-[14px] font-semibold text-white"
                  >
                    Reset all filters
                  </button>
                </div>
              )}

              {/* Bottom Numbered Pagination (Figma 149:8559) */}
              <nav
                aria-label="Pagination"
                className="mt-14 flex items-center justify-center gap-2"
              >
                <button
                  type="button"
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  aria-label="Previous page"
                  className="flex size-9 cursor-pointer items-center justify-center rounded-full bg-white transition-colors hover:bg-[#f4f3f3]"
                >
                  <img src="/assets/5d4f2.svg" alt="" className="size-5" />
                </button>

                <div className="flex items-center gap-0.5">
                  {PAGE_NUMBERS.map((item, idx) =>
                    item === 'ellipsis' ? (
                      <span
                        key={`ellipsis-${idx}`}
                        className="flex size-9 items-center justify-center text-[14px] leading-[20px] text-[#807e7e]"
                      >
                        …
                      </span>
                    ) : (
                      <button
                        key={item}
                        type="button"
                        onClick={() => setCurrentPage(item)}
                        aria-current={currentPage === item ? 'page' : undefined}
                        className={`flex size-9 cursor-pointer items-center justify-center rounded-[6px] text-[14px] leading-[20px] transition-colors ${
                          currentPage === item
                            ? 'bg-[#fff2eb] font-medium text-[#ff5200]'
                            : 'bg-white text-[#807e7e] hover:bg-[#f4f3f3] hover:text-[#2e2e2e]'
                        }`}
                      >
                        {item}
                      </button>
                    ),
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => setCurrentPage((p) => Math.min(14, p + 1))}
                  aria-label="Next page"
                  className="flex size-9 cursor-pointer items-center justify-center rounded-full bg-white transition-colors hover:bg-[#f4f3f3]"
                >
                  <img src="/assets/2c00d.svg" alt="" className="size-5" />
                </button>
              </nav>
            </div>
          </section>
        )}
      </main>

      <FooterSection onNavigateAbout={onNavigateAbout} />
    </div>
  );
}
