import { useState } from 'react';
import { ATTENDEE_STEPS, ORGANIZER_STEPS } from '../data/jamboData';

export function StepsSection() {
  const [audience, setAudience] = useState<'attendees' | 'organizers'>('attendees');
  const steps = audience === 'attendees' ? ATTENDEE_STEPS : ORGANIZER_STEPS;

  return (
    <section id="steps" className="bg-white py-20">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-[120px]">
        {/* Header */}
        <div className="mx-auto max-w-[588px] text-center">
          <h2 className="font-serif-display text-[44px] font-normal leading-[1.12] text-[#2e2e2e] sm:text-[64px] sm:leading-[72px]">
            Three Steps. <span className="text-[#ff5200]">Zero Friction.</span>
          </h2>
          <p className="mt-2 text-[16px] leading-[24px] text-[#807e7e]">
            See how our all-in-one platform simplifies event planning, ticketing, and management in
            three easy steps.
          </p>

          {/* Toggle Pills */}
          <div className="mt-10 inline-flex items-center gap-3">
            <button
              type="button"
              onClick={() => setAudience('attendees')}
              className={`flex h-[40px] cursor-pointer items-center justify-center rounded-[12px] px-4 py-2 text-[14px] font-medium leading-[20px] transition-all ${
                audience === 'attendees'
                  ? 'btn-jambo-primary text-white'
                  : 'border-[0.5px] border-[#d4d2d2] bg-white text-[#2e2e2e] hover:bg-[#fafafa]'
              }`}
            >
              For Attendees
            </button>
            <button
              type="button"
              onClick={() => setAudience('organizers')}
              className={`flex h-[40px] cursor-pointer items-center justify-center rounded-[12px] px-4 py-2 text-[14px] font-medium leading-[20px] transition-all ${
                audience === 'organizers'
                  ? 'btn-jambo-primary text-white'
                  : 'border-[0.5px] border-[#d4d2d2] bg-white text-[#2e2e2e] hover:bg-[#fafafa]'
              }`}
            >
              For Organizers
            </button>
          </div>
        </div>

        {/* 3 Step Cards */}
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {steps.map((step) => (
            <div
              key={`${audience}-${step.number}`}
              className="flex min-h-[222px] flex-col justify-between rounded-[24px] border-[0.5px] border-[#e7e5e5] bg-white p-6"
            >
              <span className="font-serif-display text-[64px] leading-[72px] text-[#ff5200]">
                {step.number}
              </span>
              <div className="mt-6 flex flex-col gap-2">
                <h3 className="font-serif-display text-[24px] leading-[30px] tracking-[-0.24px] text-[#2e2e2e]">
                  {step.title}
                </h3>
                <p className="text-[14px] leading-[20px] text-[#807e7e]">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
