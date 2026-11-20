import { useEffect, useState } from 'react';

export const COOKIE_CONSENT_STORAGE_KEY = 'jambo_cookie_consent';

interface CookieConsentBannerProps {
  onOpenCookiePolicy: () => void;
  hideOnCookiePolicyPage?: boolean;
}

export function CookieConsentBanner({
  onOpenCookiePolicy,
  hideOnCookiePolicyPage = false,
}: CookieConsentBannerProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const existing = window.localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY);
      if (existing) return;
    } catch {
      // Ignore storage access errors in restricted browsing modes
    }

    const timer = window.setTimeout(() => {
      setVisible(true);
    }, 10_000);

    return () => window.clearTimeout(timer);
  }, []);

  if (!visible || hideOnCookiePolicyPage) return null;

  const handleChoice = (choice: 'accepted' | 'dismissed') => {
    try {
      window.localStorage.setItem(COOKIE_CONSENT_STORAGE_KEY, choice);
    } catch {
      // Ignore storage errors
    }
    setVisible(false);
  };

  return (
    <div
      role="region"
      aria-label="Cookie consent"
      className="fixed bottom-4 left-1/2 z-50 w-[calc(100%-32px)] max-w-[660px] -translate-x-1/2 sm:bottom-10 sm:w-auto sm:max-w-none"
    >
      <div className="animate-cookie-enter flex flex-col gap-3 rounded-[16px] border-[0.5px] border-[#e7e5e5] bg-white p-4 shadow-[0px_8px_50px_40px_rgba(186,186,186,0.1)] sm:flex-row sm:items-center sm:gap-6 sm:py-2 sm:pl-4 sm:pr-2">
        <p className="text-[14px] font-normal leading-[20px] text-[#807e7e] sm:whitespace-nowrap">
          <span>By using this website, you agree to our </span>
          <button
            type="button"
            onClick={onOpenCookiePolicy}
            className="cursor-pointer font-medium text-[#2e2e2e] underline decoration-from-font underline-offset-2 transition-colors hover:text-[#ff5200]"
          >
            cookie policy.
          </button>
        </p>

        <div className="flex items-center justify-end gap-3 sm:gap-4">
          <button
            type="button"
            onClick={() => handleChoice('dismissed')}
            className="btn-jambo-interactive flex min-h-[42px] cursor-pointer items-center justify-center rounded-[12px] px-[18px] py-[11px] text-[14px] font-semibold leading-[20px] text-[#ff5200] hover:bg-[#fff2eb]"
          >
            <span>Dismiss</span>
          </button>
          <button
            type="button"
            onClick={() => handleChoice('accepted')}
            className="btn-jambo-primary flex min-h-[42px] cursor-pointer items-center justify-center rounded-[12px] px-[18px] py-[11px] text-[14px] font-semibold leading-[20px] text-white"
          >
            <span>Accept all</span>
          </button>
        </div>
      </div>
    </div>
  );
}
