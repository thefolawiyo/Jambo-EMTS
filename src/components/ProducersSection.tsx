import { PRODUCER_HIGHLIGHTS } from '../data/jamboData';

interface ProducersSectionProps {
  onOpenCreateModal: () => void;
}

export function ProducersSection({ onOpenCreateModal }: ProducersSectionProps) {
  return (
    <section id="producers" className="bg-white py-20">
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 items-center gap-12 px-6 lg:grid-cols-2 lg:gap-6 lg:px-[120px]">
        {/* Left Column */}
        <div className="flex max-w-[588px] flex-col items-start gap-12">
          <div className="flex flex-col gap-4">
            <h2 className="font-display text-[34px] font-bold leading-[1.12] tracking-[-0.03em] text-[#2e2e2e] sm:text-[48px] sm:leading-[1.08] sm:tracking-[-0.035em]">
              The platform your <em className="italic text-[#ff5200]">producers</em> have been asking
              for.
            </h2>
            <p className="text-[16px] leading-[24px] text-[#807e7e]">
              From your first 50 tickets to your 50,000th, Jambo grows with the show. Built with
              input from independent promoters and the venues that host them.
            </p>
          </div>

          <ul className="flex w-full flex-col gap-6">
            {PRODUCER_HIGHLIGHTS.map((item) => (
              <li key={item} className="flex items-start gap-2.5">
                <img src="/assets/70c04.svg" alt="" className="size-6 shrink-0" />
                <span className="text-[16px] font-medium leading-[24px] text-[#2e2e2e]">
                  {item}
                </span>
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={onOpenCreateModal}
            className="btn-jambo-primary flex h-[48px] cursor-pointer items-center justify-center gap-2 rounded-[15px] px-[18px] text-[14px] font-semibold leading-[20px] text-white"
          >
            <span>Create events for free</span>
            <img src="/assets/b9518.svg" alt="" className="size-4" />
          </button>
        </div>

        {/* Right Column Portrait Video (Figma 52:995) */}
        <div className="h-[520px] w-full overflow-hidden rounded-[24px] bg-[#f4f3f3] lg:h-[700px]">
          <video
            src="/assets/producer_video.mp4"
            poster="/assets/producer_photo.png"
            autoPlay
            loop
            muted
            playsInline
            aria-label="Event producer reviewing live event metrics on a tablet"
            className="h-full w-full object-cover object-center"
          />
        </div>
      </div>
    </section>
  );
}
