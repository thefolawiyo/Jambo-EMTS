import { useState } from 'react';
import type { EventItem } from '../data/jamboData';

interface TicketModalProps {
  event: EventItem | null;
  onClose: () => void;
}

export function TicketModal({ event, onClose }: TicketModalProps) {
  const [qty, setQty] = useState(1);
  const [email, setEmail] = useState('');
  const [booked, setBooked] = useState(false);

  if (!event) return null;

  const total = event.priceValue * qty;

  const handleBook = (e: React.FormEvent) => {
    e.preventDefault();
    setBooked(true);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Get tickets for ${event.title}`}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md overflow-hidden rounded-[24px] border border-[#e7e5e5] bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative h-40 w-full bg-[#f4f3f3]">
          <img src={event.image} alt={event.title} className="h-full w-full object-cover" />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="absolute right-3 top-3 flex size-11 cursor-pointer items-center justify-center rounded-full bg-white/95 text-[20px] text-[#2e2e2e] shadow hover:bg-white"
          >
            ×
          </button>
        </div>

        <div className="p-6">
          {booked ? (
            <div className="py-4 text-center">
              <span className="mx-auto flex size-12 items-center justify-center rounded-full bg-[#e6faf6] text-[22px] text-[#16a571]">
                ✓
              </span>
              <h3 className="mt-4 font-serif-display text-[28px] leading-[34px] text-[#2e2e2e]">
                Tickets confirmed!
              </h3>
              <p className="mt-2 text-[14px] leading-[20px] text-[#807e7e]">
                {qty} ticket{qty > 1 ? 's' : ''} for <strong className="text-[#2e2e2e]">{event.title}</strong> sent to{' '}
                <strong className="text-[#2e2e2e]">{email}</strong>.
              </p>
              <button
                type="button"
                onClick={onClose}
                className="btn-jambo-primary mt-6 w-full cursor-pointer rounded-[12px] py-3 text-[14px] font-semibold text-white"
              >
                Done
              </button>
            </div>
          ) : (
            <form onSubmit={handleBook}>
              <h3 className="font-serif-display text-[24px] leading-[30px] text-[#2e2e2e]">
                {event.title}
              </h3>
              <p className="mt-1 text-[13px] text-[#807e7e]">
                {event.date} · {event.venue}
              </p>

              <div className="mt-5 flex items-center justify-between rounded-xl border border-[#e7e5e5] p-3">
                <div>
                  <p className="text-[13px] font-medium text-[#2e2e2e]">General Admission</p>
                  <p className="text-[12px] text-[#807e7e]">
                    {event.priceValue === 0 ? 'Free' : `₦${event.priceValue.toLocaleString()}`}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    aria-label="Decrease ticket quantity"
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    className="flex size-11 cursor-pointer items-center justify-center rounded-xl border border-[#d4d2d2] text-[18px] text-[#2e2e2e] hover:bg-[#f4f3f3]"
                  >
                    −
                  </button>
                  <span className="w-6 text-center text-[15px] font-medium">{qty}</span>
                  <button
                    type="button"
                    aria-label="Increase ticket quantity"
                    onClick={() => setQty((q) => Math.min(10, q + 1))}
                    className="flex size-11 cursor-pointer items-center justify-center rounded-xl border border-[#d4d2d2] text-[18px] text-[#2e2e2e] hover:bg-[#f4f3f3]"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-[12px] font-medium text-[#2e2e2e]">
                  Delivery email
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="mt-1.5 w-full rounded-xl border border-[#d4d2d2] px-3.5 py-2.5 text-[14px] text-[#2e2e2e] focus:border-[#ff5200] focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="btn-jambo-primary mt-6 w-full cursor-pointer rounded-[12px] py-3 text-[14px] font-semibold text-white"
              >
                {total === 0
                  ? `Reserve ${qty} Free Ticket${qty > 1 ? 's' : ''}`
                  : `Checkout · ₦${total.toLocaleString()}`}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

interface ActionModalProps {
  mode: 'create' | 'signin' | null;
  onClose: () => void;
}

export function ActionModal({ mode, onClose }: ActionModalProps) {
  const [submitted, setSubmitted] = useState(false);

  if (!mode) return null;

  const isCreate = mode === 'create';

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={isCreate ? 'Create your event' : 'Sign in to Jambo'}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-[24px] border border-[#e7e5e5] bg-white p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-serif-display text-[28px] leading-[34px] text-[#2e2e2e]">
              {isCreate ? 'Create your event' : 'Welcome back to Jambo'}
            </h3>
            <p className="mt-1 text-[14px] text-[#807e7e]">
              {isCreate
                ? 'Launch your event page and start selling tickets in minutes.'
                : 'Sign in to view your tickets or manage your shows.'}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-full text-[20px] text-[#807e7e] hover:bg-[#f4f3f3] hover:text-[#2e2e2e]"
          >
            ×
          </button>
        </div>

        {submitted ? (
          <div className="py-6 text-center">
            <p className="font-serif-display text-[24px] text-[#2e2e2e]">
              {isCreate ? 'Draft created!' : 'Check your inbox'}
            </p>
            <p className="mt-2 text-[14px] text-[#807e7e]">
              {isCreate
                ? 'Your event workspace is ready to customize.'
                : 'We sent a magic sign-in link to your email.'}
            </p>
            <button
              type="button"
              onClick={onClose}
              className="btn-jambo-primary mt-6 w-full cursor-pointer rounded-[12px] py-3 text-[14px] font-semibold text-white"
            >
              Continue
            </button>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true);
            }}
            className="mt-5 flex flex-col gap-4"
          >
            {isCreate && (
              <div>
                <label className="block text-[12px] font-medium text-[#2e2e2e]">Event name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Lagos Alté Night Live"
                  className="mt-1.5 w-full rounded-xl border border-[#d4d2d2] px-3.5 py-2.5 text-[14px] focus:border-[#ff5200] focus:outline-none"
                />
              </div>
            )}
            <div>
              <label className="block text-[12px] font-medium text-[#2e2e2e]">Email address</label>
              <input
                type="email"
                required
                placeholder="you@jambo.events"
                className="mt-1.5 w-full rounded-xl border border-[#d4d2d2] px-3.5 py-2.5 text-[14px] focus:border-[#ff5200] focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="btn-jambo-primary mt-2 w-full cursor-pointer rounded-[12px] py-3 text-[14px] font-semibold text-white"
            >
              {isCreate ? 'Start for free' : 'Continue with Email'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
