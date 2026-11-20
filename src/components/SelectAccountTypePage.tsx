import { useState } from 'react';

export type AccountTypeId = 'solo-planner' | 'company-agency';

interface SelectAccountTypePageProps {
  onBack: () => void;
  onSignIn: () => void;
  onContinue?: (accountType: AccountTypeId) => void;
}

const ACCOUNT_TYPES: Array<{
  id: AccountTypeId;
  title: string;
  description: string;
  icon: string;
}> = [
  {
    id: 'solo-planner',
    title: 'Solo Planner',
    description: 'Host private events, intimate gatherings, or personal celebrations.',
    icon: '/assets/e77a4.svg',
  },
  {
    id: 'company-agency',
    title: 'Company or Agency',
    description: 'Host large-scale events, manage multi-member teams, and scale ticket sales.',
    icon: '/assets/5c0e0.svg',
  },
];

export function SelectAccountTypePage({
  onBack,
  onSignIn,
  onContinue,
}: SelectAccountTypePageProps) {
  const [selectedType, setSelectedType] = useState<AccountTypeId | null>(null);
  const [showError, setShowError] = useState(false);
  const [continued, setContinued] = useState(false);

  const handleContinue = () => {
    if (!selectedType) {
      setShowError(true);
      return;
    }
    setShowError(false);
    if (onContinue) {
      onContinue(selectedType);
    } else {
      setContinued(true);
    }
  };

  return (
    <div className="grid min-h-screen w-full grid-cols-1 bg-white lg:grid-cols-2">
      {/* Left Column: Account Type Selection (Figma 290:2001) */}
      <div className="flex flex-col justify-center px-6 py-12 sm:px-12 lg:px-20 xl:pl-[120px] xl:pr-16">
        <div className="mx-auto w-full max-w-[580px] lg:mx-0">
          {/* Back Button */}
          <button
            type="button"
            onClick={onBack}
            className="-ml-2 inline-flex min-h-[44px] cursor-pointer items-center gap-3 rounded-lg px-2 text-[16px] font-medium leading-[24px] text-black transition-opacity hover:opacity-70"
          >
            <img src="/assets/c5d14.svg" alt="" className="size-6 rotate-90" />
            <span>Back</span>
          </button>

          {/* Heading & Subtitle */}
          <div className="mt-10 flex flex-col gap-2">
            <h1 className="font-display text-[28px] font-bold leading-[1.2] tracking-[-0.025em] text-[#2e2e2e] sm:text-[32px]">
              Select Account Type
            </h1>
            <p className="text-[16px] font-normal leading-[24px] text-[#807e7e]">
              Select an option to continue and help us streamline your experience
            </p>
          </div>

          {/* Account Type Cards */}
          <div className="mt-12 flex flex-col gap-6">
            {ACCOUNT_TYPES.map((option) => {
              const isSelected = selectedType === option.id;
              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => {
                    setSelectedType(option.id);
                    setShowError(false);
                    setContinued(false);
                  }}
                  aria-pressed={isSelected}
                  className={`flex w-full cursor-pointer flex-col items-start gap-6 rounded-[15px] px-6 py-5 text-left transition-all ${
                    isSelected
                      ? 'border border-[#ff5200] bg-[#fff8f5] shadow-[0_6px_20px_-10px_rgba(255,82,0,0.28)]'
                      : 'border-[0.5px] border-[#e7e5e5] bg-white hover:border-[#d4d2d2] hover:bg-[#fafafa]'
                  }`}
                >
                  <div className="flex w-full items-center justify-between">
                    <img src={option.icon} alt="" className="size-6 shrink-0" />
                    <span
                      className={`flex size-5 items-center justify-center rounded-full border transition-colors ${
                        isSelected
                          ? 'border-[#ff5200] bg-[#ff5200]'
                          : 'border-[#d4d2d2] bg-white'
                      }`}
                    >
                      {isSelected && <span className="size-2 rounded-full bg-white" />}
                    </span>
                  </div>

                  <div className="flex flex-col gap-2">
                    <span className="text-[16px] font-semibold leading-[24px] text-[#2e2e2e]">
                      {option.title}
                    </span>
                    <span className="text-[14px] font-normal leading-[20px] text-[#807e7e]">
                      {option.description}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {showError && (
            <p className="mt-3 text-[13px] font-medium text-[#d80027]">
              Please select an account type to continue.
            </p>
          )}

          {continued && selectedType && (
            <div className="mt-4 rounded-xl border border-[#16a571]/30 bg-[#e6faf6] px-4 py-3 text-[14px] text-[#0c5c54]">
              Selected{' '}
              <strong>
                {ACCOUNT_TYPES.find((t) => t.id === selectedType)?.title}
              </strong>
              — account setup flow coming next!
            </div>
          )}

          {/* Continue CTA & Sign In Link */}
          <div className="mt-10 flex flex-col items-center gap-4">
            <button
              type="button"
              onClick={handleContinue}
              className="btn-jambo-primary flex h-[48px] w-full cursor-pointer items-center justify-center gap-2 rounded-[15px] px-[18px] text-[14px] font-semibold leading-[20px] text-white"
            >
              <span>Continue</span>
              <img src="/assets/b9518.svg" alt="" className="size-4" />
            </button>

            <p className="text-center text-[14px] leading-[20px] text-[#807e7e]">
              Already have an account?{' '}
              <button
                type="button"
                onClick={onSignIn}
                className="inline-flex min-h-[44px] cursor-pointer items-center px-1.5 text-[16px] font-semibold leading-[24px] text-[#ff5200] hover:underline"
              >
                Sign in
              </button>
            </p>
          </div>
        </div>
      </div>

      {/* Right Column: Full-Height Rounded Concert Stage Photo */}
      <div className="hidden p-6 lg:block">
        <div className="sticky top-6 h-[calc(100vh-48px)] w-full overflow-hidden rounded-[20px] bg-[#e3e3e3]">
          <img
            src="/assets/97a51.png"
            alt="Crowd enjoying a live concert under stage lights"
            className="h-full w-full object-cover object-center"
          />
        </div>
      </div>
    </div>
  );
}
