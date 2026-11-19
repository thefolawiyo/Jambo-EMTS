import { useEffect, useState } from 'react';
import { HeroSection } from './components/HeroSection';
import { FeaturedEventsSection } from './components/FeaturedEventsSection';
import { StepsSection } from './components/StepsSection';
import { BuiltInNaijaSection } from './components/BuiltInNaijaSection';
import { ProducersSection } from './components/ProducersSection';
import { ToolkitBentoSection } from './components/ToolkitBentoSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { FaqsSection } from './components/FaqsSection';
import { FooterSection } from './components/FooterSection';
import { ExploreEventsPage } from './components/ExploreEventsPage';
import { EventDetailsPage } from './components/EventDetailsPage';
import { SelectAccountTypePage } from './components/SelectAccountTypePage';
import { AboutPage } from './components/AboutPage';
import { ActionModal, TicketModal } from './components/Modals';
import {
  EXPLORE_ALL_EVENTS,
  SPOTLIGHT_EVENTS,
  getRandomEventDetailsVariant,
  type EventDetailsVariantId,
  type EventItem,
} from './data/jamboData';

type PageRoute = 'home' | 'explore' | 'event-details' | 'get-started' | 'about';

const ALL_CATALOG_EVENTS: EventItem[] = [...SPOTLIGHT_EVENTS, ...EXPLORE_ALL_EVENTS];

function findEventById(id: string): EventItem | null {
  return ALL_CATALOG_EVENTS.find((e) => e.id === id) ?? null;
}

function getInitialRoute(): { page: PageRoute; event: EventItem | null } {
  const hash = window.location.hash;
  if (hash === '#/get-started') {
    return { page: 'get-started', event: null };
  }
  if (hash === '#/about') {
    return { page: 'about', event: null };
  }
  if (hash.startsWith('#/event/')) {
    const id = hash.slice('#/event/'.length);
    const found = findEventById(id);
    if (found) return { page: 'event-details', event: found };
  }
  if (hash === '#/explore') {
    return { page: 'explore', event: null };
  }
  return { page: 'home', event: null };
}

export default function App() {
  const initial = getInitialRoute();
  const [page, setPage] = useState<PageRoute>(initial.page);
  const [previousPage, setPreviousPage] = useState<'home' | 'explore' | 'event-details' | 'about'>(
    'home',
  );
  const [activeEvent, setActiveEvent] = useState<EventItem | null>(initial.event);
  const [activeDetailsVariant, setActiveDetailsVariant] = useState<EventDetailsVariantId>(() =>
    initial.event?.detailsVariant ?? getRandomEventDetailsVariant(),
  );

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedScope, setSelectedScope] = useState('All events');
  const [ticketModalEvent, setTicketModalEvent] = useState<EventItem | null>(null);
  const [actionModal, setActionModal] = useState<'create' | 'signin' | null>(null);

  useEffect(() => {
    const onHashChange = () => {
      const next = getInitialRoute();
      setPage(next.page);
      if (next.event) {
        setActiveEvent(next.event);
        setActiveDetailsVariant(next.event.detailsVariant ?? getRandomEventDetailsVariant());
      }
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const navigateToExplore = () => {
    if (window.location.hash !== '#/explore') {
      window.location.hash = '#/explore';
    }
    setPage('explore');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToHome = (sectionId?: string) => {
    if (window.location.hash !== '#/') {
      window.location.hash = '#/';
    }
    setPage('home');
    if (sectionId) {
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
      }, 60);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const navigateToAbout = () => {
    if (window.location.hash !== '#/about') {
      window.location.hash = '#/about';
    }
    setPage('about');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToGetStarted = () => {
    if (page !== 'get-started') {
      setPreviousPage(page);
    }
    if (window.location.hash !== '#/get-started') {
      window.location.hash = '#/get-started';
    }
    setPage('get-started');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openEventDetails = (evt: EventItem) => {
    if (page === 'home' || page === 'explore') {
      setPreviousPage(page);
    }
    setActiveEvent(evt);
    // Use organizer-selected variant if set, otherwise pick randomly for now
    setActiveDetailsVariant(evt.detailsVariant ?? getRandomEventDetailsVariant());
    window.location.hash = `#/event/${evt.id}`;
    setPage('event-details');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackFromEvent = () => {
    if (previousPage === 'explore') {
      navigateToExplore();
    } else {
      navigateToHome();
    }
  };

  const handleBackFromGetStarted = () => {
    if (previousPage === 'explore') {
      navigateToExplore();
    } else if (previousPage === 'about') {
      navigateToAbout();
    } else if (previousPage === 'event-details' && activeEvent) {
      window.location.hash = `#/event/${activeEvent.id}`;
      setPage('event-details');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigateToHome();
    }
  };

  const handleSearchSubmit = () => {
    navigateToExplore();
  };

  return (
    <div className="min-h-screen bg-white text-[#2e2e2e]">
      {page === 'get-started' ? (
        <SelectAccountTypePage
          onBack={handleBackFromGetStarted}
          onSignIn={() => setActionModal('signin')}
        />
      ) : page === 'about' ? (
        <AboutPage
          onNavigateHome={navigateToHome}
          onNavigateExplore={navigateToExplore}
          onNavigateAbout={navigateToAbout}
          onOpenCreateModal={navigateToGetStarted}
          onOpenSignInModal={() => setActionModal('signin')}
        />
      ) : page === 'event-details' && activeEvent ? (
        <EventDetailsPage
          event={activeEvent}
          variant={activeDetailsVariant}
          onBack={handleBackFromEvent}
          onNavigateHome={navigateToHome}
          onNavigateExplore={navigateToExplore}
          onNavigateAbout={navigateToAbout}
          onOpenCreateModal={navigateToGetStarted}
          onOpenSignInModal={() => setActionModal('signin')}
          onGetTicket={(evt) => setTicketModalEvent(evt)}
        />
      ) : page === 'explore' ? (
        <ExploreEventsPage
          initialSearchQuery={searchQuery}
          initialScope={selectedScope}
          onNavigateHome={navigateToHome}
          onNavigateExplore={navigateToExplore}
          onNavigateAbout={navigateToAbout}
          onOpenCreateModal={navigateToGetStarted}
          onOpenSignInModal={() => setActionModal('signin')}
          onSelectEvent={openEventDetails}
        />
      ) : (
        <>
          <HeroSection
            searchQuery={searchQuery}
            onSearchQueryChange={setSearchQuery}
            selectedScope={selectedScope}
            onSelectedScopeChange={setSelectedScope}
            onSearchSubmit={handleSearchSubmit}
            onNavigateHome={navigateToHome}
            onNavigateExplore={navigateToExplore}
            onNavigateAbout={navigateToAbout}
            onOpenCreateModal={navigateToGetStarted}
            onOpenSignInModal={() => setActionModal('signin')}
          />

          <main>
            <FeaturedEventsSection
              searchQuery={searchQuery}
              selectedScope={selectedScope}
              onClearSearch={() => {
                setSearchQuery('');
                setSelectedScope('All events');
              }}
              onSelectEvent={openEventDetails}
              onBrowseAllEvents={navigateToExplore}
            />

            <StepsSection />

            <BuiltInNaijaSection />

            <ProducersSection onOpenCreateModal={navigateToGetStarted} />

            <ToolkitBentoSection />

            <TestimonialsSection />

            <FaqsSection />
          </main>

          <FooterSection onNavigateAbout={navigateToAbout} />
        </>
      )}

      <TicketModal
        key={ticketModalEvent?.id ?? 'none'}
        event={ticketModalEvent}
        onClose={() => setTicketModalEvent(null)}
      />

      <ActionModal
        key={actionModal ?? 'closed'}
        mode={actionModal}
        onClose={() => setActionModal(null)}
      />
    </div>
  );
}
