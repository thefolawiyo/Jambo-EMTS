import { useState } from 'react';

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
  const [helpOpen, setHelpOpen] = useState(false);
  const isDark = variant === 'dark';

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

  return (
    <header className="relative z-20 mx-auto flex max-w-[1440px] items-center justify-between px-6 py-5 lg:px-[120px]">
      <button
        type="button"
        onClick={() => onNavigateHome()}
        className="flex cursor-pointer items-center gap-2"
      >
        <span className="flex size-8 items-center justify-center rounded-2xl bg-[#ff5200] font-serif-display text-[18px] leading-[18px] tracking-[-0.18px] text-white">
          J
        </span>
        <span
          className={`font-serif-display text-[20px] leading-[28px] tracking-[-0.5px] ${
            isDark ? 'text-white' : 'text-[#2e2e2e]'
          }`}
        >
          Jambo
        </span>
      </button>

      <nav className="hidden items-center gap-8 md:flex" aria-label="Primary navigation">
        <button
          type="button"
          onClick={onNavigateExplore}
          className={navLinkClass(activePage === 'explore')}
        >
          Explore Events
        </button>
        <button
          type="button"
          onClick={() => onNavigateHome('producers')}
          className={navLinkClass(false)}
        >
          Organizers
        </button>
        <button
          type="button"
          onClick={() => onNavigateHome('steps')}
          className={navLinkClass(false)}
        >
          Find my ticket
        </button>
        <button
          type="button"
          onClick={() => onNavigateHome('producers')}
          className={navLinkClass(false)}
        >
          Pricing
        </button>
        <button
          type="button"
          onClick={() => (onNavigateAbout ? onNavigateAbout() : onNavigateHome('built-in-naija'))}
          className={navLinkClass(activePage === 'about')}
        >
          About
        </button>
        <div className="relative">
          <button
            type="button"
            onClick={() => setHelpOpen((prev) => !prev)}
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
                className="block rounded-lg px-3 py-2 text-[13px] text-[#2e2e2e] hover:bg-[#f4f3f3]"
              >
                Contact Support
              </a>
            </div>
          )}
        </div>
      </nav>

      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={onOpenSignInModal}
          className={`cursor-pointer rounded-[12px] px-[18px] py-[11px] text-[14px] font-semibold leading-[20px] transition-colors ${
            isDark
              ? 'bg-white/10 text-white backdrop-blur-sm hover:bg-white/15'
              : 'bg-white text-[#2e2e2e] hover:bg-[#f4f3f3]'
          }`}
        >
          Sign in
        </button>
        <button
          type="button"
          onClick={onOpenCreateModal}
          className="btn-jambo-primary flex cursor-pointer items-center justify-center gap-2 rounded-[12px] px-[18px] py-[11px] text-[14px] font-semibold leading-[20px] text-white"
        >
          <span>Create event</span>
          <img src="/assets/b9518.svg" alt="" className="size-4" />
        </button>
      </div>
    </header>
  );
}
