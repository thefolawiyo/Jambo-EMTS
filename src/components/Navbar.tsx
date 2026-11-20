import { useEffect, useRef, useState } from 'react';

interface NavbarProps {
  activePage: 'home' | 'explore' | 'about';
  variant?: 'light' | 'dark';
  onNavigateHome: (sectionId?: string) => void;
  onNavigateExplore: () => void;
  onNavigateAbout?: () => void;
  onOpenCreateModal: () => void;
  onOpenSignInModal: () => void;
}

export function Navbar({
  activePage,
  variant = 'light',
  onNavigateHome,
  onNavigateExplore,
  onNavigateAbout,
  onOpenCreateModal,
  onOpenSignInModal,
}: NavbarProps) {
  const [platformOpen, setPlatformOpen] = useState(false);
  const [mobilePlatformOpen, setMobilePlatformOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const lastScrollY = useRef(0);
  const navRef = useRef<HTMLElement>(null);

  const isDark = variant === 'dark';

  useEffect(() => {
    lastScrollY.current = window.scrollY;
    setIsScrolled(window.scrollY > 20);

    let rafId = 0;
    const handleScroll = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(() => {
        rafId = 0;
        const currentY = Math.max(0, window.scrollY);
        const delta = currentY - lastScrollY.current;

        setIsScrolled(currentY > 20);

        if (currentY <= 24) {
          setIsVisible(true);
        } else if (delta < -6) {
          // Scrolling up -> reveal sticky navbar
          setIsVisible(true);
        } else if (delta > 8 && currentY > 88) {
          // Scrolling down past header -> hide navbar cleanly
          setIsVisible(false);
          setPlatformOpen(false);
          setHelpOpen(false);
          setMobileMenuOpen(false);
        }

        lastScrollY.current = currentY;
      });
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setPlatformOpen(false);
        setHelpOpen(false);
        setMobileMenuOpen(false);
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setPlatformOpen(false);
        setHelpOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, []);

  const navLinkClass = (isActive: boolean) => {
    if (isDark) {
      return `cursor-pointer text-[14px] font-medium leading-[20px] transition-colors ${
        isActive ? 'text-white' : 'text-white/65 hover:text-white'
      }`;
    }
    return `cursor-pointer text-[14px] font-medium leading-[20px] transition-colors ${
      isActive ? 'text-[#2e2e2e]' : 'text-[#807e7e] hover:text-[#2e2e2e]'
    }`;
  };

  const mobileLinkClass = (isActive: boolean) => {
    if (isDark) {
      return `flex min-h-[44px] w-full cursor-pointer items-center justify-between rounded-xl px-3.5 py-2.5 text-left text-[15px] font-medium transition-colors ${
        isActive ? 'bg-white/12 text-white' : 'text-white/80 hover:bg-white/8 hover:text-white'
      }`;
    }
    return `flex min-h-[44px] w-full cursor-pointer items-center justify-between rounded-xl px-3.5 py-2.5 text-left text-[15px] font-medium transition-colors ${
      isActive ? 'bg-[#fff2eb] text-[#ff5200]' : 'text-[#2e2e2e] hover:bg-[#f4f3f3]'
    }`;
  };

  const barSurfaceClass =
    isScrolled || mobileMenuOpen
      ? isDark
        ? 'border-b border-white/10 bg-[#181717]/95 backdrop-blur-xl shadow-[0_12px_32px_-16px_rgba(0,0,0,0.45)]'
        : 'border-b border-[#e7e5e5] bg-white/97 backdrop-blur-xl shadow-[0_10px_28px_-16px_rgba(0,0,0,0.12)]'
      : 'border-b border-transparent bg-transparent';

  return (
    <>
      {/* In-flow spacer matching header height so there is zero layout shift */}
      <div className="h-[86px]" aria-hidden="true" />

      <div
        className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ease-out ${barSurfaceClass} ${
          isVisible || mobileMenuOpen
            ? 'translate-y-0 opacity-100'
            : '-translate-y-full opacity-0 pointer-events-none'
        }`}
      >
        <header className="mx-auto flex max-w-[1440px] items-center justify-between px-4 py-4 sm:px-6 sm:py-5 lg:px-[120px]">
          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen(false);
              onNavigateHome();
            }}
            className="flex min-h-[44px] cursor-pointer items-center gap-2 pr-2"
          >
            <span className="flex size-8 items-center justify-center rounded-2xl bg-[#ff5200] font-serif-brand text-[18px] font-normal leading-[18px] tracking-[-0.18px] text-white">
              J
            </span>
            <span
              className={`font-serif-brand text-[20px] font-normal leading-[28px] tracking-[-0.5px] ${
                isDark ? 'text-white' : 'text-[#2e2e2e]'
              }`}
            >
              Jambo
            </span>
          </button>

          <nav
            ref={navRef}
            className="hidden items-center gap-8 md:flex"
            aria-label="Primary navigation"
          >
            <button
              type="button"
              onClick={() => {
                setPlatformOpen(false);
                setHelpOpen(false);
                onNavigateExplore();
              }}
              className={navLinkClass(activePage === 'explore')}
            >
              Explore Events
            </button>

            {/* Platform Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setHelpOpen(false);
                  setPlatformOpen((prev) => !prev);
                }}
                aria-expanded={platformOpen}
                className={`flex cursor-pointer items-center gap-2 text-[14px] font-medium leading-[20px] transition-colors ${
                  isDark ? 'text-white/65 hover:text-white' : 'text-[#807e7e] hover:text-[#2e2e2e]'
                }`}
              >
                <span>Platform</span>
                <img
                  src="/assets/ce1e2.svg"
                  alt=""
                  className={`size-4 transition-transform ${isDark ? 'invert opacity-75' : ''} ${
                    platformOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {platformOpen && (
                <div className="absolute left-0 top-9 z-30 w-48 rounded-xl border border-[#e7e5e5] bg-white p-1.5 shadow-lg">
                  <button
                    type="button"
                    onClick={() => {
                      setPlatformOpen(false);
                      onNavigateHome('producers');
                    }}
                    className="block w-full cursor-pointer rounded-lg px-3 py-2 text-left text-[13px] font-medium text-[#2e2e2e] transition-colors hover:bg-[#fff2eb] hover:text-[#ff5200]"
                  >
                    Organizers
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setPlatformOpen(false);
                      onNavigateHome('toolkit');
                    }}
                    className="block w-full cursor-pointer rounded-lg px-3 py-2 text-left text-[13px] font-medium text-[#2e2e2e] transition-colors hover:bg-[#fff2eb] hover:text-[#ff5200]"
                  >
                    Vendors
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setPlatformOpen(false);
                      onNavigateHome('producers');
                    }}
                    className="block w-full cursor-pointer rounded-lg px-3 py-2 text-left text-[13px] font-medium text-[#2e2e2e] transition-colors hover:bg-[#fff2eb] hover:text-[#ff5200]"
                  >
                    Pricing
                  </button>
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={() => {
                setPlatformOpen(false);
                setHelpOpen(false);
                onNavigateHome('steps');
              }}
              className={navLinkClass(false)}
            >
              Find my ticket
            </button>
            <button
              type="button"
              onClick={() => {
                setPlatformOpen(false);
                setHelpOpen(false);
                if (onNavigateAbout) {
                  onNavigateAbout();
                } else {
                  onNavigateHome('built-in-naija');
                }
              }}
              className={navLinkClass(activePage === 'about')}
            >
              About
            </button>
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setPlatformOpen(false);
                  setHelpOpen((prev) => !prev);
                }}
                aria-expanded={helpOpen}
                className={`flex cursor-pointer items-center gap-2 text-[14px] font-medium leading-[20px] transition-colors ${
                  isDark ? 'text-white/65 hover:text-white' : 'text-[#807e7e] hover:text-[#2e2e2e]'
                }`}
              >
                <span>Help Center</span>
                <img
                  src="/assets/ce1e2.svg"
                  alt=""
                  className={`size-4 transition-transform ${isDark ? 'invert opacity-75' : ''} ${
                    helpOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {helpOpen && (
                <div className="absolute right-0 top-9 z-30 w-44 rounded-xl border border-[#e7e5e5] bg-white p-1.5 shadow-lg">
                  <button
                    type="button"
                    onClick={() => {
                      setHelpOpen(false);
                      onNavigateHome('faqs');
                    }}
                    className="block w-full cursor-pointer rounded-lg px-3 py-2 text-left text-[13px] text-[#2e2e2e] hover:bg-[#f4f3f3]"
                  >
                    FAQs
                  </button>
                  <a
                    href="#footer"
                    onClick={() => setHelpOpen(false)}
                    className="block rounded-lg px-3 py-2 text-left text-[13px] text-[#2e2e2e] hover:bg-[#f4f3f3]"
                  >
                    Contact Support
                  </a>
                </div>
              )}
            </div>
          </nav>

          <div className="flex items-center gap-2.5 sm:gap-4">
            <button
              type="button"
              onClick={onOpenSignInModal}
              className={`btn-jambo-interactive hidden h-[46px] cursor-pointer items-center justify-center rounded-[15px] px-[18px] text-[14px] font-semibold leading-[20px] sm:inline-flex ${
                isDark
                  ? 'bg-white/10 text-white backdrop-blur-sm hover:bg-white/15'
                  : 'bg-white text-[#2e2e2e] hover:bg-[#f4f3f3]'
              }`}
            >
              <span>Sign in</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCreateModal();
              }}
              className="btn-jambo-primary flex h-[46px] cursor-pointer items-center justify-center gap-2 rounded-[15px] px-4 text-[14px] font-semibold leading-[20px] text-white sm:px-[18px]"
            >
              <span>Create event</span>
              <img src="/assets/b9518.svg" alt="" className="size-4" />
            </button>

            {/* Mobile Menu Toggle (< md) */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
              className={`btn-smooth-corner flex size-[46px] cursor-pointer items-center justify-center rounded-[15px] border transition-colors md:hidden ${
                isDark
                  ? 'border-white/15 bg-white/10 text-white hover:bg-white/15'
                  : 'border-[#e7e5e5] bg-white text-[#2e2e2e] hover:bg-[#f4f3f3]'
              }`}
            >
              {mobileMenuOpen ? (
                <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              ) : (
                <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M4 7h16" />
                  <path d="M4 12h16" />
                  <path d="M4 17h16" />
                </svg>
              )}
            </button>
          </div>
        </header>

        {/* Mobile Navigation Drawer (< md) */}
        {mobileMenuOpen && (
          <div
            className={`border-t px-4 pb-6 pt-3 md:hidden ${
              isDark ? 'border-white/10 bg-[#181717]' : 'border-[#e7e5e5] bg-white'
            }`}
          >
            <nav className="flex flex-col gap-1" aria-label="Mobile navigation">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onNavigateExplore();
                }}
                className={mobileLinkClass(activePage === 'explore')}
              >
                <span>Explore Events</span>
                <span aria-hidden="true" className="text-xs opacity-60">→</span>
              </button>

              {/* Mobile Platform Expandable Group */}
              <div>
                <button
                  type="button"
                  onClick={() => setMobilePlatformOpen((prev) => !prev)}
                  aria-expanded={mobilePlatformOpen}
                  className={mobileLinkClass(false)}
                >
                  <span>Platform</span>
                  <img
                    src="/assets/ce1e2.svg"
                    alt=""
                    className={`size-4 transition-transform ${isDark ? 'invert opacity-75' : ''} ${
                      mobilePlatformOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {mobilePlatformOpen && (
                  <div
                    className={`ml-3 mt-1 flex flex-col gap-0.5 border-l pl-3 ${
                      isDark ? 'border-white/15' : 'border-[#e7e5e5]'
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => {
                        setMobileMenuOpen(false);
                        setMobilePlatformOpen(false);
                        onNavigateHome('producers');
                      }}
                      className={mobileLinkClass(false)}
                    >
                      <span>Organizers</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setMobileMenuOpen(false);
                        setMobilePlatformOpen(false);
                        onNavigateHome('toolkit');
                      }}
                      className={mobileLinkClass(false)}
                    >
                      <span>Vendors</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setMobileMenuOpen(false);
                        setMobilePlatformOpen(false);
                        onNavigateHome('producers');
                      }}
                      className={mobileLinkClass(false)}
                    >
                      <span>Pricing</span>
                    </button>
                  </div>
                )}
              </div>

              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onNavigateHome('steps');
                }}
                className={mobileLinkClass(false)}
              >
                <span>Find my ticket</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onNavigateAbout) {
                    onNavigateAbout();
                  } else {
                    onNavigateHome('built-in-naija');
                  }
                }}
                className={mobileLinkClass(activePage === 'about')}
              >
                <span>About</span>
                <span aria-hidden="true" className="text-xs opacity-60">→</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onNavigateHome('faqs');
                }}
                className={mobileLinkClass(false)}
              >
                <span>Help Center &amp; FAQs</span>
              </button>
            </nav>

            <div
              className={`mt-4 flex flex-col gap-2.5 border-t pt-4 sm:hidden ${
                isDark ? 'border-white/10' : 'border-[#e7e5e5]'
              }`}
            >
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenSignInModal();
                }}
                className={`btn-jambo-interactive flex h-[46px] w-full cursor-pointer items-center justify-center rounded-[15px] border text-[14px] font-semibold transition-colors ${
                  isDark
                    ? 'border-white/15 bg-white/10 text-white hover:bg-white/15'
                    : 'border-[#d4d2d2] bg-white text-[#2e2e2e] hover:bg-[#f4f3f3]'
                }`}
              >
                <span>Sign in</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
