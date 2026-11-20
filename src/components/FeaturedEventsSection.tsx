import { useState } from 'react';
import { CATEGORY_PILLS, CITIES, EVENTS_DATA, type EventItem } from '../data/jamboData';

interface FeaturedEventsSectionProps {
  searchQuery: string;
  selectedScope: string;
  onClearSearch: () => void;
  onSelectEvent: (event: EventItem) => void;
  onBrowseAllEvents: () => void;
}

export function FeaturedEventsSection({
  searchQuery,
  selectedScope,
  onClearSearch,
  onSelectEvent,
  onBrowseAllEvents,
}: FeaturedEventsSectionProps) {
  const [activeCategory, setActiveCategory] = useState<string>('Featured');
  const [selectedCity, setSelectedCity] = useState<string>('Lagos');
  const [cityOpen, setCityOpen] = useState(false);
  const [showAllCities, setShowAllCities] = useState(true);

  const filteredEvents = EVENTS_DATA.filter((evt) => {
    const matchesCategory =
      activeCategory === 'Featured' || evt.categories.includes(activeCategory);

    const matchesScope =
      selectedScope === 'All events' ||
      (selectedScope === 'Free events'
        ? evt.priceValue === 0
        : evt.categories.includes(selectedScope));

    const matchesCity =
      showAllCities || selectedCity === 'All cities' || evt.city === selectedCity;

    const q = searchQuery.trim().toLowerCase();
    const matchesQuery =
      !q ||
      evt.title.toLowerCase().includes(q) ||
      evt.venue.toLowerCase().includes(q) ||
      evt.city.toLowerCase().includes(q);

    return matchesCategory && matchesScope && matchesCity && matchesQuery;
  });

  const handleCitySelect = (city: string) => {
    setSelectedCity(city);
    setShowAllCities(city === 'All cities');
    setCityOpen(false);
  };

  const handleResetFilters = () => {
    setActiveCategory('Featured');
    setSelectedCity('Lagos');
    setShowAllCities(true);
    onClearSearch();
  };

  return (
    <section id="featured-events" className="bg-white py-20">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-[120px]">
        {/* Section Header Row */}
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-[588px]">
            <h2 className="font-display text-[34px] font-bold leading-[1.12] tracking-[-0.03em] text-[#2e2e2e] sm:text-[48px] sm:leading-[1.08] sm:tracking-[-0.035em]">
              Find the rooms your people are dancing in.
            </h2>
            <p className="mt-2 text-[16px] leading-[24px] text-[#807e7e]">
              Fresh drops, fast-selling shows and the experiences everyone&apos;s talking about —
              updated in real time.
            </p>
          </div>

          {/* City Selector + Browse All Button (Figma 42:2271) */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="relative">
              <button
                type="button"
                onClick={() => setCityOpen((prev) => !prev)}
                className="btn-smooth-corner flex h-[46px] cursor-pointer items-center justify-center gap-2 rounded-[20px] border border-[#d4d2d2] bg-white px-[18px] text-[14px] font-medium leading-[20px] text-[#2e2e2e] transition-colors hover:bg-[#f4f3f3]"
              >
                <img src="/assets/aea1a.svg" alt="" className="size-5" />
                <span>{selectedCity}</span>
                <img
                  src="/assets/ce1e2.svg"
                  alt=""
                  className={`size-4 transition-transform ${cityOpen ? 'rotate-180' : ''}`}
                />
              </button>
              {cityOpen && (
                <div className="absolute right-0 top-12 z-30 w-44 rounded-xl border border-[#e7e5e5] bg-white p-1.5 shadow-lg">
                  {CITIES.map((city) => (
                    <button
                      key={city}
                      type="button"
                      onClick={() => handleCitySelect(city)}
                      className={`block w-full cursor-pointer rounded-lg px-3 py-2 text-left text-[13px] transition-colors ${
                        selectedCity === city && !showAllCities
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

            <button
              type="button"
              onClick={onBrowseAllEvents}
              className="btn-jambo-interactive flex h-[46px] cursor-pointer items-center justify-center gap-2 rounded-[20px] bg-white px-[18px] text-[14px] font-semibold leading-[20px] text-[#2e2e2e] hover:bg-[#f4f3f3]"
            >
              <span>Browse all events</span>
              <img src="/assets/5fa6b.svg" alt="" className="size-4" />
            </button>
          </div>
        </div>

        {/* Category Filter Pills (Figma 42:1325) with right-edge scroll fade affordance */}
        <div className="relative mt-10">
          <div className="no-scrollbar flex items-center gap-2.5 overflow-x-auto pb-2 pr-10 sm:gap-3 sm:pr-0">
            {CATEGORY_PILLS.map((pill) => {
              const isActive = activeCategory === pill.id;
              return (
                <button
                  key={pill.id}
                  type="button"
                  onClick={() => setActiveCategory(pill.id)}
                  className={`btn-smooth-corner flex h-[46px] shrink-0 cursor-pointer items-center gap-2 rounded-[20px] px-4 text-[14px] font-medium leading-[20px] transition-all ${
                    isActive
                      ? 'btn-jambo-primary text-white'
                      : 'border-[0.5px] border-[#d4d2d2] bg-white text-[#2e2e2e] hover:border-[#2e2e2e]/40 hover:bg-[#fafafa]'
                  }`}
                >
                  <img
                    src={pill.icon}
                    alt=""
                    className={`size-4 shrink-0 ${
                      isActive && pill.id !== 'Featured'
                        ? 'brightness-0 invert'
                        : !isActive && pill.id === 'Featured'
                          ? 'invert'
                          : ''
                    }`}
                  />
                  <span className="whitespace-nowrap">{pill.label}</span>
                </button>
              );
            })}
          </div>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-white to-transparent sm:hidden"
          />
        </div>

        {/* Active Search Indicator */}
        {(searchQuery.trim() !== '' || selectedScope !== 'All events' || !showAllCities) && (
          <div className="mt-4 flex flex-wrap items-center justify-between gap-2 rounded-xl bg-[#fafafa] px-4 py-2.5 text-[13px] text-[#807e7e]">
            <span>
              Showing <strong className="font-medium text-[#2e2e2e]">{filteredEvents.length}</strong>{' '}
              event{filteredEvents.length === 1 ? '' : 's'}
              {searchQuery.trim() ? ` matching “${searchQuery.trim()}”` : ''}
              {!showAllCities ? ` in ${selectedCity}` : ''}
            </span>
            <button
              type="button"
              onClick={handleResetFilters}
              className="cursor-pointer font-medium text-[#ff5200] hover:underline"
            >
              Reset filters
            </button>
          </div>
        )}

        {/* 3-Column Event Cards Grid (Figma 42:964) */}
        {filteredEvents.length > 0 ? (
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredEvents.map((evt) => (
              <article
                key={evt.id}
                onClick={() => onSelectEvent(evt)}
                className="group flex cursor-pointer flex-col overflow-hidden rounded-[24px] border-[0.5px] border-[#e7e5e5] bg-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0px_14px_30px_-14px_rgba(46,46,46,0.14)]"
              >
                {/* Cover Image */}
                <div className="relative h-[192px] w-full overflow-hidden bg-[#f4f3f3]">
                  <img
                    src={evt.image}
                    alt={evt.title}
                    className={`h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03] ${
                      evt.imageOffsetClass ?? 'object-center'
                    }`}
                  />
                </div>

                {/* Card Body (Figma 95:720) */}
                <div className="flex flex-1 flex-col p-4 pb-5 pt-6">
                  <h3
                    title={evt.title}
                    className="truncate font-display text-[20px] font-medium leading-[28px] tracking-[-0.015em] text-[#2e2e2e]"
                  >
                    {evt.title}
                  </h3>

                  <div className="mt-6 flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <img src="/assets/a4515.svg" alt="" className="size-6 shrink-0" />
                      <span className="truncate text-[14px] font-normal leading-[20px] text-[#807e7e]">
                        {evt.date}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <img src="/assets/ab538.svg" alt="" className="size-6 shrink-0" />
                      <span className="truncate text-[14px] font-normal leading-[20px] text-[#807e7e]">
                        {evt.venue}
                      </span>
                    </div>
                  </div>

                  {/* Divider & Price / CTA */}
                  <div className="mt-6 border-t border-[#e7e5e5] pt-4">
                    <div className="flex items-center justify-between">
                      <p className="text-[14px] leading-[20px] text-[#2e2e2e]">
                        {evt.pricePrefix && (
                          <span className="font-normal text-[#807e7e]">{evt.pricePrefix} </span>
                        )}
                        <span className="font-medium">{evt.priceLabel}</span>
                      </p>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectEvent(evt);
                        }}
                        className="-my-2 -mr-2.5 flex min-h-[44px] cursor-pointer items-center gap-2 rounded-lg px-2.5 text-[14px] font-medium leading-[20px] text-[#ff5200] transition-colors hover:bg-[#fff2eb]"
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
          <div className="mt-10 flex flex-col items-center justify-center rounded-[24px] border border-dashed border-[#d4d2d2] py-16 text-center">
            <p className="font-display text-[22px] font-bold tracking-[-0.02em] text-[#2e2e2e]">No events found</p>
            <p className="mt-2 max-w-md text-[14px] text-[#807e7e]">
              Try switching your category or city filter to discover more upcoming events on Jambo.
            </p>
            <button
              type="button"
              onClick={handleResetFilters}
              className="btn-jambo-primary mt-5 inline-flex h-[46px] cursor-pointer items-center justify-center rounded-[20px] px-5 text-[14px] font-semibold text-white"
            >
              <span>Show all featured events</span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
