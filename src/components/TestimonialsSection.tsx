import { TESTIMONIALS_ROW_1, TESTIMONIALS_ROW_2, type TestimonialItem } from '../data/jamboData';

function TestimonialCard({ item }: { item: TestimonialItem }) {
  return (
    <div className="flex w-[282px] shrink-0 flex-col justify-between gap-4 rounded-[16px] border-[0.5px] border-[#e7e5e5] bg-white p-4">
      <p className="text-[14px] leading-[20px] text-[#807e7e]">{item.quote}</p>
      <div className="w-full border-t border-[#e7e5e5]" />
      <div className="flex items-center gap-2">
        <div
          className="flex size-10 shrink-0 -rotate-1 items-end justify-center overflow-hidden rounded-full border border-white"
          style={{ backgroundColor: item.avatarBg }}
        >
          <img src={item.avatar} alt={item.name} className="size-9 object-cover" />
        </div>
        <div className="min-w-0">
          <p className="truncate font-display text-[15px] font-semibold leading-[22px] tracking-[-0.01em] text-[#2e2e2e]">
            {item.name}
          </p>
          <p className="truncate text-[12px] leading-[16px] text-[#807e7e]">{item.role}</p>
        </div>
      </div>
    </div>
  );
}

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="bg-white py-20">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-[120px]">
        {/* Header */}
        <div className="mx-auto max-w-[588px] text-center">
          <h2 className="font-display text-[34px] font-bold leading-[1.12] tracking-[-0.03em] text-[#2e2e2e] sm:text-[48px] sm:leading-[1.08] sm:tracking-[-0.035em]">
            Don’t just take our word
          </h2>
          <p className="mt-2 text-[16px] leading-[24px] text-[#807e7e]">
            See what the people running the loudest shows and events on the continent are saying.
          </p>
        </div>

        {/* Marquee Container with Left & Right White Fade Masks */}
        <div className="marquee-wrapper relative mt-10 overflow-hidden">
          {/* Left fade */}
          <div
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24"
            style={{
              background:
                'linear-gradient(90deg, rgb(255,255,255) 0%, rgba(255,255,255,0) 100%)',
            }}
          />
          {/* Right fade */}
          <div
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24"
            style={{
              background:
                'linear-gradient(270deg, rgb(255,255,255) 0%, rgba(255,255,255,0) 100%)',
            }}
          />

          {/* Row 1 */}
          <div className="flex w-max gap-6 animate-marquee-left">
            {[...TESTIMONIALS_ROW_1, ...TESTIMONIALS_ROW_1].map((item, idx) => (
              <TestimonialCard key={`r1-${idx}-${item.name}`} item={item} />
            ))}
          </div>

          {/* Row 2 */}
          <div className="mt-6 flex w-max gap-6 animate-marquee-right">
            {[...TESTIMONIALS_ROW_2, ...TESTIMONIALS_ROW_2].map((item, idx) => (
              <TestimonialCard key={`r2-${idx}-${item.name}`} item={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
