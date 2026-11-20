import { useState } from 'react';
import { Navbar } from './Navbar';
import { FooterSection } from './FooterSection';
import { COOKIE_CONSENT_STORAGE_KEY } from './CookieConsentBanner';

interface CookiePolicyPageProps {
  onBack: () => void;
  onNavigateHome: (sectionId?: string) => void;
  onNavigateExplore: () => void;
  onNavigateAbout: () => void;
  onOpenCreateModal: () => void;
  onOpenSignInModal: () => void;
}

const COOKIE_CATEGORIES = [
  {
    id: 'essential',
    title: 'Strictly Necessary Cookies',
    badge: 'Always Active',
    description:
      'Required for core Jambo functionality including ticket checkout sessions, QR pass delivery, fraud prevention, and secure payment processing via Paystack and Flutterwave.',
    examples: 'Session ID, CSRF protection token, checkout cart state, cookie consent preference.',
  },
  {
    id: 'analytics',
    title: 'Analytics & Performance Cookies',
    badge: 'Optional',
    description:
      'Help us understand how attendees discover events, which cities and genres are trending, and where checkout or page speed can be improved.',
    examples: 'Page views, search filter usage, load-time diagnostics, aggregated funnel metrics.',
  },
  {
    id: 'personalization',
    title: 'Personalization & Discovery Cookies',
    badge: 'Optional',
    description:
      'Remember your preferred city (such as Lagos, Abuja, Accra, or Nairobi), favorite event categories, and recently viewed shows so recommendations feel relevant.',
    examples: 'Preferred city filter, recently browsed categories, saved organizer follows.',
  },
];

export function CookiePolicyPage({
  onBack,
  onNavigateHome,
  onNavigateExplore,
  onNavigateAbout,
  onOpenCreateModal,
  onOpenSignInModal,
}: CookiePolicyPageProps) {
  const [analyticsEnabled, setAnalyticsEnabled] = useState(true);
  const [personalizationEnabled, setPersonalizationEnabled] = useState(true);
  const [savedNotice, setSavedNotice] = useState(false);

  const handleSavePreferences = () => {
    try {
      window.localStorage.setItem(
        COOKIE_CONSENT_STORAGE_KEY,
        analyticsEnabled || personalizationEnabled ? 'accepted' : 'essential-only',
      );
    } catch {
      // Ignore storage errors
    }
    setSavedNotice(true);
    window.setTimeout(() => setSavedNotice(false), 3000);
  };

  return (
    <div className="min-h-screen bg-white text-[#2e2e2e]">
      <Navbar
        activePage="home"
        onNavigateHome={onNavigateHome}
        onNavigateExplore={onNavigateExplore}
        onNavigateAbout={onNavigateAbout}
        onOpenCreateModal={onOpenCreateModal}
        onOpenSignInModal={onOpenSignInModal}
      />

      <main className="mx-auto max-w-[920px] px-6 pb-24 pt-10 lg:pt-16">
        {/* Back button */}
        <button
          type="button"
          onClick={onBack}
          className="-ml-2 inline-flex min-h-[44px] cursor-pointer items-center gap-3 rounded-lg px-2 text-[15px] font-medium leading-[24px] text-[#2e2e2e] transition-opacity hover:opacity-70"
        >
          <img src="/assets/c5d14.svg" alt="" className="size-5 rotate-90" />
          <span>Back</span>
        </button>

        {/* Header */}
        <div className="mt-6 border-b border-[#e7e5e5] pb-8">
          <span className="inline-flex items-center rounded-full border border-[#ff5200]/20 bg-[#fff3ec] px-3.5 py-1 text-[12px] font-semibold uppercase tracking-[0.06em] text-[#ff5200]">
            Legal &amp; Privacy
          </span>
          <h1 className="mt-4 font-display text-[32px] font-bold leading-[1.15] tracking-[-0.03em] text-[#2e2e2e] sm:text-[44px]">
            Cookie Policy
          </h1>
          <p className="mt-3 text-[15px] leading-[1.65] text-[#807e7e] sm:text-[16px]">
            Last updated: November 2026 · Jambo Technologies Ltd., Lagos, Nigeria.
          </p>
        </div>

        {/* Intro */}
        <section className="mt-8 space-y-4 text-[15px] leading-[1.7] text-[#5c5a5a] sm:text-[16px]">
          <p>
            This Cookie Policy explains how <strong className="font-semibold text-[#2e2e2e]">Jambo</strong>{' '}
            uses cookies and similar local-storage technologies when you browse events, purchase
            tickets, or manage shows on our platform.
          </p>
          <p>
            Cookies are small text files stored on your device that keep your checkout session
            secure, remember your city preferences, and help us keep ticket drops fast and reliable
            across Nigeria and Africa.
          </p>
        </section>

        {/* Cookie Categories + Interactive Preferences */}
        <section className="mt-10">
          <h2 className="font-display text-[22px] font-bold leading-[1.25] tracking-[-0.02em] text-[#2e2e2e] sm:text-[26px]">
            Types of Cookies We Use
          </h2>
          <div className="mt-5 space-y-4">
            {COOKIE_CATEGORIES.map((cat) => {
              const isEssential = cat.id === 'essential';
              const checked = isEssential
                ? true
                : cat.id === 'analytics'
                  ? analyticsEnabled
                  : personalizationEnabled;

              const toggle = () => {
                if (cat.id === 'analytics') setAnalyticsEnabled((prev) => !prev);
                if (cat.id === 'personalization') setPersonalizationEnabled((prev) => !prev);
              };

              return (
                <div
                  key={cat.id}
                  className="rounded-[20px] border border-[#e7e5e5] bg-white p-5 sm:p-6"
                >
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div className="max-w-[640px]">
                      <div className="flex flex-wrap items-center gap-2.5">
                        <h3 className="font-display text-[18px] font-semibold leading-[26px] tracking-[-0.015em] text-[#2e2e2e]">
                          {cat.title}
                        </h3>
                        <span
                          className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${
                            isEssential
                              ? 'bg-[#e6faf6] text-[#0c5c54]'
                              : 'bg-[#f4f3f3] text-[#807e7e]'
                          }`}
                        >
                          {cat.badge}
                        </span>
                      </div>
                      <p className="mt-2 text-[14px] leading-[1.65] text-[#5c5a5a]">
                        {cat.description}
                      </p>
                      <p className="mt-2.5 text-[13px] leading-[1.5] text-[#807e7e]">
                        <span className="font-medium text-[#2e2e2e]">Examples:</span> {cat.examples}
                      </p>
                    </div>

                    <button
                      type="button"
                      role="switch"
                      aria-checked={checked}
                      aria-label={`Toggle ${cat.title}`}
                      disabled={isEssential}
                      onClick={toggle}
                      className={`relative mt-1 inline-flex h-7 w-12 shrink-0 items-center rounded-full transition-colors ${
                        checked ? 'bg-[#ff5200]' : 'bg-[#d4d2d2]'
                      } ${isEssential ? 'cursor-not-allowed opacity-75' : 'cursor-pointer'}`}
                    >
                      <span
                        className={`inline-block size-5 transform rounded-full bg-white shadow transition-transform ${
                          checked ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={handleSavePreferences}
              className="btn-jambo-primary inline-flex h-[46px] cursor-pointer items-center justify-center rounded-[15px] px-6 text-[14px] font-semibold text-white"
            >
              <span>Save cookie preferences</span>
            </button>
            {savedNotice && (
              <span className="text-[14px] font-medium text-[#16a571]">
                Preferences saved!
              </span>
            )}
          </div>
        </section>

        {/* Browser Controls & Contact */}
        <section className="mt-12 space-y-6 border-t border-[#e7e5e5] pt-8 text-[15px] leading-[1.7] text-[#5c5a5a]">
          <div>
            <h2 className="font-display text-[20px] font-bold tracking-[-0.02em] text-[#2e2e2e]">
              Managing Cookies in Your Browser
            </h2>
            <p className="mt-2">
              You can clear or block cookies at any time through your browser settings (Chrome,
              Safari, Firefox, or Edge). Please note that disabling strictly necessary cookies may
              affect ticket checkout and pass retrieval.
            </p>
          </div>

          <div>
            <h2 className="font-display text-[20px] font-bold tracking-[-0.02em] text-[#2e2e2e]">
              Questions?
            </h2>
            <p className="mt-2">
              If you have questions about how Jambo handles cookies or privacy under the Nigeria
              Data Protection Act (NDPA), reach out to{' '}
              <a
                href="mailto:privacy@jambo.events"
                className="font-medium text-[#ff5200] underline underline-offset-2 hover:opacity-80"
              >
                privacy@jambo.events
              </a>
              .
            </p>
          </div>
        </section>
      </main>

      <FooterSection onNavigateAbout={onNavigateAbout} />
    </div>
  );
}
