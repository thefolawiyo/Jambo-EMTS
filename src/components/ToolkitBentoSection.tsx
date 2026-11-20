import { useState } from 'react';

const TEAM_ROLES = [
  { name: 'Producers', bg: '#8a38f5' },
  { name: 'Promoter', bg: '#0fb5a0' },
  { name: 'Door', bg: '#e64a00' },
  { name: 'Finance', bg: '#2f6fed' },
  { name: 'Support', bg: '#0c5c54' },
];

const ANALYTICS_BARS = [
  { heightPct: 72, label: 'Jan', value: '$14.2k' },
  { heightPct: 91, label: 'Feb', value: '$18.4k' },
  { heightPct: 97, label: 'Mar', value: '$19.6k' },
  { heightPct: 76, label: 'Apr', value: '$15.1k' },
  { heightPct: 33, label: 'May', value: '$6.8k' },
  { heightPct: 90, label: 'Jun', value: '$18.1k' },
  { heightPct: 100, label: 'Jul', value: '$21.4k' },
  { heightPct: 83, label: 'Aug', value: '$16.9k' },
  { heightPct: 57, label: 'Sep', value: '$11.7k' },
  { heightPct: 93, label: 'Oct', value: '$18.8k' },
  { heightPct: 75, label: 'Nov', value: '$15.0k' },
  { heightPct: 50, label: 'Dec', value: '$10.2k' },
];

export function ToolkitBentoSection() {
  const [activeRole, setActiveRole] = useState<string | null>(null);
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);

  return (
    <section id="toolkit" className="bg-white py-20">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-[120px]">
        {/* Centered Header */}
        <div className="mx-auto max-w-[588px] text-center">
          <h2 className="font-serif-display text-[44px] font-normal leading-[1.12] text-[#2e2e2e] sm:text-[64px] sm:leading-[72px]">
            <span className="block">Everything you need to</span>
            <span className="block">
              run a <span className="text-[#ff5200]">flawless</span> event
            </span>
          </h2>
          <p className="mt-2 text-[16px] leading-[24px] text-[#807e7e]">
            Simplify your process, reach your audience, and deliver flawless events every time with
            our comprehensive, all-in-one event toolkit.
          </p>
        </div>

        {/* Bento Grid (Figma 62:1181) */}
        <div className="mt-12 flex flex-col gap-6">
          {/* Top Row: Left 690px (58%) + Right 486px (42%) */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
            {/* Card 1: Sales, as they happen */}
            <div className="relative flex min-h-[508px] flex-col justify-between overflow-hidden rounded-[24px] border-[0.5px] border-[#e7e5e5] bg-white p-6 lg:col-span-7">
              <div className="max-w-[368px]">
                <div className="inline-flex items-center gap-2 rounded-[20px] px-2 py-1">
                  <span className="flex size-2 items-center justify-center rounded-full bg-[#fff2eb]">
                    <span className="size-1 rounded-full bg-[#ff5200]" />
                  </span>
                  <span className="text-[12px] font-medium leading-[16px] text-[#807e7e]">
                    LIVE
                  </span>
                </div>
                <h3 className="mt-4 font-serif-display text-[24px] leading-[32px] text-[#2e2e2e]">
                  Sales, as they happen
                </h3>
                <p className="mt-2 text-[13px] leading-[20px] text-[#807e7e]">
                  Watch revenue stream in, sliced by tier, source and door.
                </p>
              </div>

              {/* Live Chart Surface (Figma 77:894) */}
              <div className="mt-6 rounded-2xl bg-white pt-4">
                <div className="flex items-center gap-14 text-[#2b3037]">
                  <div>
                    <p className="text-[13px] leading-[20px]">Events</p>
                    <p className="font-serif-display text-[20px] leading-[28px]">8</p>
                  </div>
                  <div>
                    <p className="text-[13px] leading-[20px]">Total Sales</p>
                    <p className="font-serif-display text-[20px] leading-[28px]">93.07%</p>
                  </div>
                </div>

                {/* Exact Chart Graphic Composition */}
                <div className="relative mt-2 h-[268px] w-full">
                  {/* Area backdrop */}
                  <img
                    src="/assets/d5aac.svg"
                    alt=""
                    className="absolute inset-x-0 top-[2px] h-[238px] w-full"
                  />
                  {/* Curve line */}
                  <img
                    src="/assets/94355.svg"
                    alt=""
                    className="absolute left-[0.67%] top-[3px] h-[174px] w-[98.66%]"
                  />
                  {/* Highlight column + triangle indicator */}
                  <div className="absolute left-[72.86%] top-[76px] flex w-[7.29%] flex-col items-center gap-3">
                    <img
                      src="/assets/c6abf.svg"
                      alt=""
                      className="h-[165px] w-9 mix-blend-multiply"
                    />
                    <img src="/assets/0c7b2.svg" alt="" className="size-3.5" />
                  </div>
                  {/* Hover pill ₦600K */}
                  <div className="absolute left-[69.38%] top-[21px] rounded-full bg-[#ff5200] px-3 py-1 text-[14px] font-medium leading-[20px] text-white shadow-sm">
                    ₦600K
                  </div>
                  {/* Data dots */}
                  <img src="/assets/68e70.svg" alt="" className="absolute left-0 top-[159px] h-[6.4px] w-[8px]" />
                  <img src="/assets/68e70.svg" alt="" className="absolute left-[17.11%] top-[173px] h-[6.4px] w-[8px]" />
                  <img src="/assets/68e70.svg" alt="" className="absolute left-[28.02%] top-[100px] h-[6.4px] w-[8px]" />
                  <img src="/assets/68e70.svg" alt="" className="absolute left-[53.02%] top-[162px] h-[6.4px] w-[8px]" />
                  <img src="/assets/68e70.svg" alt="" className="absolute left-[75.84%] top-[73px] h-[6.4px] w-[8px]" />
                  <img src="/assets/68e70.svg" alt="" className="absolute left-[98.66%] top-0 h-[6.4px] w-[8px]" />
                  {/* Bottom gradient spectrum bar */}
                  <img
                    src="/assets/61e2b.png"
                    alt=""
                    className="absolute bottom-[5px] left-0 h-[5px] w-full rounded-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Right Stack: QR in 0.4s + Wallet ready */}
            <div className="flex flex-col gap-6 lg:col-span-5">
              {/* Card 2: QR in 0.4s */}
              <div className="relative flex min-h-[242px] flex-col justify-between overflow-hidden rounded-[24px] border-[0.5px] border-[#e7e5e5] bg-white p-6">
                {/* Soft blue corner glow */}
                <div
                  className="pointer-events-none absolute -bottom-24 -right-24 h-[340px] w-[420px] rounded-full blur-[26px]"
                  style={{
                    background:
                      'radial-gradient(ellipse at center, rgba(216,228,255,0.95) 0%, rgba(216,228,255,0) 65%)',
                  }}
                />

                <div className="relative z-10 max-w-[368px]">
                  <div className="inline-flex items-center gap-2 rounded-[20px] px-2 py-1">
                    <span className="flex size-2 items-center justify-center rounded-full bg-[#fff2eb]">
                      <span className="size-1 rounded-full bg-[#ff5200]" />
                    </span>
                    <span className="text-[12px] font-medium leading-[16px] text-[#807e7e]">
                      CHECK-IN
                    </span>
                  </div>
                  <h3 className="mt-4 font-serif-display text-[24px] leading-[32px] text-[#2e2e2e]">
                    QR in 0.4s
                  </h3>
                  <p className="mt-2 text-[13px] leading-[20px] text-[#807e7e]">
                    Scans in under a second, even when the venue Wi-Fi gives up on you.
                  </p>
                </div>

                <div className="relative z-10 mt-6 flex items-center gap-4">
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-[10px] bg-[#2e2e2e]">
                    <img src="/assets/cff68.svg" alt="" className="size-11" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="font-mono text-[12px] leading-[20px] text-[#2e2e2e]">
                      #JMB-04812
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="flex size-2 items-center justify-center rounded-full bg-[#e6faf6]">
                        <span className="size-1 rounded-full bg-[#16a571]" />
                      </span>
                      <span className="text-[14px] font-semibold leading-[20px] text-[#16a571]">
                        Admitted
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 3: Wallet ready */}
              <div className="relative flex min-h-[242px] flex-col justify-between overflow-hidden rounded-[24px] border-[0.5px] border-[#e7e5e5] bg-white p-6">
                <div className="max-w-[368px]">
                  <div className="inline-flex items-center gap-2 rounded-[20px] px-2 py-1">
                    <span className="flex size-2 items-center justify-center rounded-full bg-[#fff2eb]">
                      <span className="size-1 rounded-full bg-[#ff5200]" />
                    </span>
                    <span className="text-[12px] font-medium leading-[16px] text-[#807e7e]">
                      REVENUE
                    </span>
                  </div>
                  <h3 className="mt-4 font-serif-display text-[24px] leading-[32px] text-[#2e2e2e]">
                    Wallet ready
                  </h3>
                  <p className="mt-2 text-[13px] leading-[20px] text-[#807e7e]">
                    Tickets sync to Apple &amp; Google Wallet automatically.
                  </p>
                </div>

                <div className="mt-6 flex items-center gap-2">
                  <span className="inline-flex h-8 items-center gap-2 rounded-full border-[0.5px] border-[#d4d2d2] px-3 text-[13px] leading-[20px] text-[#2e2e2e]">
                    <img src="/assets/825b4.svg" alt="" className="size-4" />
                    <span>Wallet</span>
                  </span>
                  <span className="inline-flex h-8 items-center gap-2 rounded-full border-[0.5px] border-[#d4d2d2] px-3 text-[13px] leading-[20px] text-[#2e2e2e]">
                    <img src="/assets/30402.png" alt="" className="size-4" />
                    <span>Pay</span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Row: 50% / 50% */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Card 4: Dark Analytics Dashboard */}
            <div className="flex min-h-[508px] flex-col justify-between overflow-hidden rounded-[24px] border-[0.5px] border-[#e7e5e5] bg-[#2e2e2e] p-6 text-white">
              <div>
                <div className="inline-flex items-center gap-2 rounded-[20px] px-2 py-1">
                  <span className="size-2 rounded-full bg-[#d4d2d2]" />
                  <span className="text-[12px] font-medium leading-[16px] text-[#d4d2d2]">
                    ANALYTICS
                  </span>
                </div>
                <h3 className="mt-4 font-serif-display text-[24px] leading-[32px] text-white">
                  A dashboard that briefs you in 10 seconds
                </h3>
                <p className="mt-2 max-w-[368px] text-[13px] leading-[20px] text-[#d4d2d2]">
                  Revenue, conversion and door flow — visualised the moment they happen.
                </p>

                {/* 3 KPI Boxes */}
                <div className="mt-6 grid grid-cols-3 gap-2">
                  <div className="min-w-0 rounded-[16px] border-[0.5px] border-[#807e7e] px-2.5 py-2.5 sm:px-4 sm:py-2">
                    <p className="text-[10px] leading-[16px] text-[#d4d2d2]">REVENUE</p>
                    <p className="mt-1 truncate font-serif-display text-[18px] leading-[24px] text-white sm:text-[24px] sm:leading-[32px]">
                      $184,210
                    </p>
                  </div>
                  <div className="min-w-0 rounded-[16px] border-[0.5px] border-[#807e7e] px-2.5 py-2.5 sm:px-4 sm:py-2">
                    <p className="text-[10px] leading-[16px] text-[#d4d2d2]">SOLD</p>
                    <p className="mt-1 truncate font-serif-display text-[18px] leading-[24px] text-white sm:text-[24px] sm:leading-[32px]">
                      4,128
                    </p>
                  </div>
                  <div className="min-w-0 rounded-[16px] border-[0.5px] border-[#807e7e] px-2.5 py-2.5 sm:px-4 sm:py-2">
                    <p className="text-[10px] leading-[16px] text-[#d4d2d2]">CONVERSION</p>
                    <p className="mt-1 truncate font-serif-display text-[18px] leading-[24px] text-white sm:text-[24px] sm:leading-[32px]">
                      38%
                    </p>
                  </div>
                </div>
              </div>

              {/* 12 Interactive Vertical Bars */}
              <div className="mt-8 flex h-[205px] items-end justify-between gap-2.5 sm:gap-3.5">
                {ANALYTICS_BARS.map((bar, idx) => {
                  const isHovered = hoveredBar === idx;
                  return (
                    <div
                      key={bar.label}
                      onMouseEnter={() => setHoveredBar(idx)}
                      onMouseLeave={() => setHoveredBar(null)}
                      className="relative flex h-full flex-1 flex-col items-center justify-end"
                    >
                      {isHovered && (
                        <span className="absolute -top-7 rounded-md bg-white px-2 py-0.5 text-[11px] font-medium text-[#2e2e2e] shadow">
                          {bar.value}
                        </span>
                      )}
                      <div
                        className={`w-full rounded-[10px] transition-colors duration-200 ${
                          isHovered ? 'bg-[#ff5200]' : 'bg-[#474646]'
                        }`}
                        style={{ height: `${bar.heightPct}%` }}
                      />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Card 5: Team Collaboration */}
            <div className="relative flex min-h-[508px] flex-col justify-between overflow-hidden rounded-[24px] border-[0.5px] border-[#e7e5e5] bg-white p-6">
              {/* Top Soft Warm Peach + Sage Glows */}
              <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
                <div
                  className="absolute -left-8 -top-44 h-[460px] w-[520px] rounded-full blur-[20px]"
                  style={{
                    background:
                      'radial-gradient(ellipse at center, rgba(255,217,194,0.95) 0%, rgba(255,217,194,0) 62%)',
                  }}
                />
                <div
                  className="absolute -right-24 -top-16 h-[380px] w-[380px] rounded-full blur-[16px]"
                  style={{
                    background:
                      'radial-gradient(circle at center, rgba(207,231,214,0.95) 0%, rgba(207,231,214,0) 62%)',
                  }}
                />
              </div>

              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 rounded-[20px] px-2 py-1">
                  <span className="flex size-2 items-center justify-center rounded-full bg-[#fff2eb]">
                    <span className="size-1 rounded-full bg-[#ff5200]" />
                  </span>
                  <span className="text-[12px] font-medium leading-[16px] text-[#807e7e]">
                    TEAM
                  </span>
                </div>
                <h3 className="mt-4 font-serif-display text-[24px] leading-[32px] text-[#2e2e2e]">
                  Collaborate without the chaos
                </h3>
                <p className="mt-2 max-w-[368px] text-[13px] leading-[20px] text-[#807e7e]">
                  Roles, permissions and a single source of truth for organizers, promoters and door
                  staff.
                </p>

                {/* Role Pills */}
                <div className="mt-6 flex flex-wrap items-center gap-2">
                  {TEAM_ROLES.map((role) => {
                    const isSelected = activeRole === role.name;
                    return (
                      <button
                        key={role.name}
                        type="button"
                        onClick={() => setActiveRole(isSelected ? null : role.name)}
                        style={{ backgroundColor: role.bg }}
                        className={`flex h-8 cursor-pointer items-center justify-center rounded-[30px] border-[0.5px] border-[#d4d2d2] px-3 text-[12px] font-medium leading-[16px] text-[#fafafa] transition-transform ${
                          isSelected ? 'scale-105 ring-2 ring-[#2e2e2e]/20' : 'hover:scale-105'
                        }`}
                      >
                        {role.name}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Team Photo (Figma 89:678) */}
              <div className="relative z-10 mt-6 h-[252px] w-full overflow-hidden rounded-[20px] border-[0.5px] border-[#e7e5e5] bg-[#fafafa]">
                <img
                  src="/assets/team_photo.png"
                  alt="Event organizers collaborating together"
                  className="h-full w-full object-cover object-center"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
