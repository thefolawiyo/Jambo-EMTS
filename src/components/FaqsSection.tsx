import { useState } from 'react';
import { FAQS_DATA } from '../data/jamboData';

export function FaqsSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faqs" className="bg-white py-20">
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 items-start gap-12 px-6 lg:grid-cols-2 lg:gap-6 lg:px-[120px]">
        {/* Left Header */}
        <div className="max-w-[588px]">
          <h2 className="font-serif-display text-[44px] font-normal leading-[1.12] text-[#2e2e2e] sm:text-[64px] sm:leading-[72px]">
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
                  className="flex w-full cursor-pointer items-center justify-between gap-4 p-6 text-left transition-colors hover:bg-[#fafafa]"
                >
                  <span className="font-serif-display text-[20px] leading-[28px] text-[#2e2e2e]">
                    {faq.question}
                  </span>
                  <img
                    src="/assets/70303.svg"
                    alt=""
                    className={`size-6 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-45' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-6 pb-6 pt-0 text-[14px] leading-[22px] text-[#807e7e]">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
