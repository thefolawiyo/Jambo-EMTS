import { BUILT_IN_NAIJA_FEATURES } from '../data/jamboData';

export function BuiltInNaijaSection() {
  return (
    <section id="built-in-naija" className="bg-white py-20">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-[120px]">
        {/* Header */}
        <div className="max-w-[588px]">
          <h2 className="font-display text-[34px] font-bold leading-[1.12] tracking-[-0.03em] text-[#2e2e2e] sm:text-[48px] sm:leading-[1.08] sm:tracking-[-0.035em]">
            <span className="block">
              Built in <span className="text-[#ff5200]">Naija.</span>
            </span>
            <span className="block">Tuned for the culture.</span>
          </h2>
          <p className="mt-2 text-[16px] leading-[24px] text-[#807e7e]">
            Every detail, from the Paystack checkout to the payout into your bank was obsessed over
            by a team that stood in your queue, ran your door and counted your float.
          </p>
        </div>

        {/* 3x2 Bordered Features Grid (Figma 52:599) */}
        <div className="mt-10 overflow-hidden rounded-[24px] border-[0.5px] border-[#e7e5e5] bg-white">
          <div className="grid grid-cols-1 divide-y divide-[#e7e5e5] sm:grid-cols-2 lg:grid-cols-3 lg:divide-y-0">
            {BUILT_IN_NAIJA_FEATURES.map((feat, idx) => (
              <div
                key={feat.title}
                className={`flex min-h-[198px] flex-col justify-between p-6 transition-colors duration-200 hover:bg-[#fff2eb] ${
                  idx % 3 !== 2 ? 'lg:border-r lg:border-[#e7e5e5]' : ''
                } ${idx < 3 ? 'lg:border-b lg:border-[#e7e5e5]' : ''}`}
              >
                <div className="flex size-10 items-center justify-center rounded-[12px] bg-[#fff2eb]">
                  <img src={feat.icon} alt="" className="size-5" />
                </div>

                <div className="mt-8 flex flex-col gap-2">
                  <h3 className="font-display text-[19px] font-semibold leading-[26px] tracking-[-0.02em] text-[#2e2e2e] sm:text-[20px] sm:leading-[28px]">
                    {feat.title}
                  </h3>
                  <p className="text-[13px] leading-[20px] text-[#807e7e]">{feat.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
