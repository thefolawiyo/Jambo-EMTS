import { useEffect, useRef, useState } from 'react';

const FOOTER_LINKS = [
  { label: 'Pricing', href: '#producers' },
  { label: 'About', href: '#built-in-naija' },
  { label: 'Contact', href: '#footer' },
  { label: 'Help Center', href: '#faqs', hasChevron: true },
  { label: 'Privacy', href: '#footer' },
  { label: 'Terms', href: '#footer' },
  { label: 'Refunds', href: '#faqs' },
  { label: 'Security', href: '#built-in-naija' },
];

interface FooterSectionProps {
  onNavigateAbout?: () => void;
}

export function FooterSection({ onNavigateAbout }: FooterSectionProps = {}) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [inView, setInView] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setInView(true);
      setScrollProgress(1);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.12 },
    );
    observer.observe(el);

    let rafId = 0;
    const updateParallax = () => {
      rafId = 0;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      // 0 when footer top hits bottom of viewport, 1 when footer has scrolled well into view
      const raw = (vh - rect.top) / Math.min(vh * 0.85, rect.height || vh);
      const clamped = Math.max(0, Math.min(1, raw));
      setScrollProgress(clamped);
    };

    const onScroll = () => {
      if (!rafId) {
        rafId = window.requestAnimationFrame(updateParallax);
      }
    };

    updateParallax();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail('');
  };

  // Multi-layer parallax on the giant Jambo watermark
  const watermarkY = (1 - scrollProgress) * -72;
  const watermarkScale = 0.96 + scrollProgress * 0.04;

  return (
    <div ref={wrapperRef} className="relative z-20 -mt-8 bg-[#2e2e2e]">
      <footer
        id="footer"
        className="relative overflow-hidden bg-[#2e2e2e] text-white shadow-[0_-24px_60px_-12px_rgba(0,0,0,0.22)]"
      >
        {/* Giant "Jambo" Watermark SVG with independent depth parallax (Figma 70:713) */}
        <div
          className="pointer-events-none mx-auto max-w-[1200px] px-6 pt-0 will-change-transform"
          style={{
            transform: `translate3d(0, ${watermarkY.toFixed(1)}px, 0) scale(${watermarkScale.toFixed(4)})`,
          }}
        >
          <img
            src="/assets/01eed.svg"
            alt="Jambo"
            className="h-auto w-full select-none"
          />
        </div>

        {/* Newsletter & Socials Block with Staggered Cascade Entrance (Figma 70:750) */}
        <div className="relative z-10 mx-auto mt-10 flex max-w-[680px] flex-col items-center gap-10 px-6 text-center">
          <p
            className={`text-[16px] leading-[24px] text-white transition-all duration-700 ease-out ${
              inView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
            style={{ transitionDelay: '40ms' }}
          >
            Built in Lagos. Tuned for Africa. The ticketing and event platform for the moments the
            continent never forgets.
          </p>

          {/* Email Subscription Form */}
          <form
            onSubmit={handleSubscribe}
            className={`flex h-[62px] w-full items-center justify-between rounded-[16px] border-[0.5px] border-[#e7e5e5] bg-white pl-6 pr-[7px] shadow-[0px_8px_24px_0px_rgba(46,46,46,0.1)] transition-all duration-700 ease-out ${
              inView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
            style={{ transitionDelay: '150ms' }}
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (subscribed) setSubscribed(false);
              }}
              placeholder="Your email address"
              aria-label="Your email address"
              className="w-full bg-transparent pr-3 text-[14px] leading-[20px] text-[#2e2e2e] placeholder:text-[#807e7e] focus:outline-none"
            />
            <button
              type="submit"
              className="btn-jambo-interactive flex h-[48px] shrink-0 cursor-pointer items-center justify-center gap-2 rounded-[15px] bg-[#2e2e2e] px-[18px] text-[14px] font-semibold leading-[20px] text-white hover:bg-[#1f1f1f]"
            >
              <span>{subscribed ? 'Subscribed' : 'Subscribe'}</span>
              <img src="/assets/b9518.svg" alt="" className="size-4" />
            </button>
          </form>

          {subscribed && (
            <p className="-mt-6 text-[13px] text-[#16a571]">
              You&apos;re on the list! Watch your inbox for upcoming Lagos &amp; global drops.
            </p>
          )}

          {/* Connect With Us */}
          <div
            className={`flex flex-col items-center gap-4 transition-all duration-700 ease-out ${
              inView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
            style={{ transitionDelay: '260ms' }}
          >
            <p className="text-[16px] font-medium leading-[24px] text-[#807e7e]">
              Connect with us:
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://x.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Jambo on X"
                className="flex size-11 items-center justify-center rounded-[12px] border border-[#4a4a4a] bg-[#383838] transition-colors hover:border-[#807e7e]"
              >
                <img src="/assets/baeb6.svg" alt="" className="size-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Jambo on Instagram"
                className="flex size-11 items-center justify-center rounded-[12px] border border-[#4a4a4a] bg-[#383838] transition-colors hover:border-[#807e7e]"
              >
                <img src="/assets/0f7a2.svg" alt="" className="size-5" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Jambo on YouTube"
                className="flex size-11 items-center justify-center rounded-[12px] border border-[#4a4a4a] bg-[#383838] transition-colors hover:border-[#807e7e]"
              >
                <img src="/assets/9d03e.svg" alt="" className="size-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Legal & Navigation Row (Figma 71:888) */}
        <div
          className={`relative z-10 mx-auto mt-20 max-w-[1440px] px-6 pb-20 transition-all duration-700 ease-out lg:px-[120px] ${
            inView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
          style={{ transitionDelay: '360ms' }}
        >
          <img src="/assets/f579f.svg" alt="" className="mb-10 w-full" />
          <div className="flex flex-col items-center justify-between gap-6 lg:flex-row">
            <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-1 sm:gap-x-8">
              {FOOTER_LINKS.map((link) =>
                link.label === 'About' && onNavigateAbout ? (
                  <button
                    key={link.label}
                    type="button"
                    onClick={onNavigateAbout}
                    className="flex min-h-[44px] cursor-pointer items-center gap-2 py-2.5 text-[14px] font-medium leading-[20px] text-[#807e7e] transition-colors hover:text-white"
                  >
                    <span>{link.label}</span>
                  </button>
                ) : (
                  <a
                    key={link.label}
                    href={link.href}
                    className="flex min-h-[44px] items-center gap-2 py-2.5 text-[14px] font-medium leading-[20px] text-[#807e7e] transition-colors hover:text-white"
                  >
                    <span>{link.label}</span>
                    {link.hasChevron && (
                      <img src="/assets/ce1e2.svg" alt="" className="size-4 opacity-70" />
                    )}
                  </a>
                ),
              )}
            </nav>

            <p className="text-[14px] font-medium leading-[20px] text-[#807e7e]">
              © 2026 Jambo Technologies Ltd. Lagos, Nigeria.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
