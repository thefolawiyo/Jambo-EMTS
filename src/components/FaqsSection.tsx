import { useState } from 'react';
import { FAQS_DATA } from '../data/jamboData';

export function FaqsSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faqs" className="bg-white py-20">
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 items-start gap-12 px-6 lg:grid-cols-2 lg:gap-6 lg:px-[120px]">
        {/* Left Header */}
        <div className="max-w-[588px]">
          <h2 className="font-display text-[34px] font-bold leading-[1.12] tracking-[-0.03em] text-[#2e2e2e] sm:text-[48px] sm:leading-[1.08] sm:tracking-[-0.035em]">
            <span className="block">Good questions,</span>
            <span className="block">
              <span className="text-[#ff5200]">straight</span> answers.
            </span>
          </h2>
          <p className="mt-4 text-[16px] leading-[24px] text-[#807e7e]">
            Can&apos;t find what you&apos;re looking for? Our team replies to every email within the
            hour on working days.
          </p>
        </div>

        {/* Right Accordion Card (Figma 97:1038) */}
        <div className="w-full overflow-hidden rounded-[24px] border-[0.5px] border-[#e7e5e5] bg-white">
          {FAQS_DATA.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={faq.question}
                className={idx < FAQS_DATA.length - 1 ? 'border-b-[0.5px] border-[#e7e5e5]' : ''}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  aria-expanded={isOpen}
                  className="flex w-full cursor-pointer items-center justify-between gap-4 p-6 text-left transition-colors duration-200 hover:bg-[#fafafa]"
                >
                  <span className="font-display text-[16px] font-semibold leading-[24px] tracking-[-0.01em] text-[#2e2e2e] sm:text-[18px] sm:leading-[26px]">
                    {faq.question}
                  </span>
                  <img
                    src="/assets/70303.svg"
                    alt=""
                    className={`size-6 shrink-0 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                      isOpen ? 'rotate-45' : 'rotate-0'
                    }`}
                  />
                </button>
                <div
                  className={`grid transition-[grid-template-rows,opacity] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <div
                      className={`px-6 pb-6 pt-0 text-[14px] leading-[22px] text-[#807e7e] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                        isOpen ? 'translate-y-0' : '-translate-y-1.5'
                      }`}
                    >
                      {faq.answer}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
