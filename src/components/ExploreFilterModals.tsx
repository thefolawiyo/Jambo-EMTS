import { useEffect, useState } from 'react';

export type ExploreFilterModalType = 'scope' | 'location' | 'price' | 'date' | null;

export const FIGMA_LOCATIONS = ['Lagos', 'Abuja', 'Port-Harcourt', 'Ibadan', 'Abeokuta'];

export const FIGMA_PRICE_RANGES = [
  'Free',
  '₦0 - ₦5,000',
  '₦5,000 - ₦10,000',
  '₦10,000 - ₦50,000',
  '₦50,000 - ₦100,000',
  '₦100,000 - ₦150,000',
  '₦150,000 - ₦200,000',
  '₦200,000 upward',
];

export const FIGMA_CATEGORIES = [
  'Concerts',
  'Festivals',
  'Conferences',
  'Technology',
  'Workshops',
  'Networking',
  'Charity',
  'Sports',
];

const WEEKDAYS = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

interface ExploreFilterModalsProps {
  activeModal: ExploreFilterModalType;
  selectedScope: string;
  selectedLocation: string;
  selectedPrice: string;
  selectedDate: string;
  onClose: () => void;
  onApplyScope: (val: string) => void;
  onApplyLocation: (val: string) => void;
  onApplyPrice: (val: string) => void;
  onApplyDate: (val: string) => void;
}

function getMonthGrid(year: number, monthIndex: number) {
  const firstDay = new Date(year, monthIndex, 1);
  // Convert Sun=0..Sat=6 -> Mon=0..Sun=6
  const startOffset = (firstDay.getDay() + 6) % 7;
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, monthIndex, 0).getDate();

  const cells: Array<{ day: number; inMonth: boolean; dateKey: string }> = [];

  for (let i = startOffset - 1; i >= 0; i--) {
    const d = daysInPrevMonth - i;
    cells.push({ day: d, inMonth: false, dateKey: `prev-${d}` });
  }
  for (let d = 1; d <= daysInMonth; d++) {
    const label = `${MONTHS[monthIndex].slice(0, 3)} ${d}, ${year}`;
    cells.push({ day: d, inMonth: true, dateKey: label });
  }
  let nextDay = 1;
  while (cells.length < 42) {
    cells.push({ day: nextDay, inMonth: false, dateKey: `next-${nextDay}` });
    nextDay += 1;
  }

  return cells;
}

export function ExploreFilterModals({
  activeModal,
  selectedScope,
  selectedLocation,
  selectedPrice,
  selectedDate,
  onClose,
  onApplyScope,
  onApplyLocation,
  onApplyPrice,
  onApplyDate,
}: ExploreFilterModalsProps) {
  const [draftScope, setDraftScope] = useState(selectedScope);
  const [draftLocation, setDraftLocation] = useState(selectedLocation);
  const [draftPrice, setDraftPrice] = useState(selectedPrice);
  const [draftDate, setDraftDate] = useState(selectedDate);
  const [calYear, setCalYear] = useState(2026);
  const [calMonth, setCalMonth] = useState(6); // July 2026 (matches Figma 153:1584)

  useEffect(() => {
    setDraftScope(selectedScope);
    setDraftLocation(selectedLocation);
    setDraftPrice(selectedPrice);
    setDraftDate(selectedDate);
  }, [activeModal, selectedScope, selectedLocation, selectedPrice, selectedDate]);

  useEffect(() => {
    if (!activeModal) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [activeModal, onClose]);

  if (!activeModal) return null;

  const handlePrevMonth = () => {
    if (calMonth === 0) {
      setCalMonth(11);
      setCalYear((y) => y - 1);
    } else {
      setCalMonth((m) => m - 1);
    }
  };

  const handleNextMonth = () => {
    if (calMonth === 11) {
      setCalMonth(0);
      setCalYear((y) => y + 1);
    } else {
      setCalMonth((m) => m + 1);
    }
  };

  if (activeModal === 'date') {
    const cells = getMonthGrid(calYear, calMonth);
    return (
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Filter by date"
        onClick={onClose}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/35 p-4 backdrop-blur-[2px]"
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-[392px] rounded-[24px] border border-[#e7e5e5] bg-white p-6 shadow-[0px_20px_60px_-20px_rgba(46,46,46,0.22)] sm:p-7"
        >
          {/* Month Header (Figma 153:1584) */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-display text-[20px] font-semibold leading-[28px] text-[#2e2e2e]">
                {MONTHS[calMonth]} {calYear}
              </span>
              <svg
                className="size-4 text-[#ff5200]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </div>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={handlePrevMonth}
                aria-label="Previous month"
                className="flex size-10 cursor-pointer items-center justify-center rounded-xl text-[#ff5200] transition-colors hover:bg-[#fff2eb]"
              >
                <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m15 18-6-6 6-6" />
                </svg>
              </button>
              <button
                type="button"
                onClick={handleNextMonth}
                aria-label="Next month"
                className="flex size-10 cursor-pointer items-center justify-center rounded-xl text-[#ff5200] transition-colors hover:bg-[#fff2eb]"
              >
                <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </button>
            </div>
          </div>

          {/* Weekday labels */}
          <div className="mt-5 grid grid-cols-7 gap-2 text-center">
            {WEEKDAYS.map((day) => (
              <span key={day} className="text-[13px] font-medium text-[#2e2e2e]">
                {day}
              </span>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="mt-3 grid grid-cols-7 gap-2">
            {cells.map((cell) => {
              const isSelected = cell.inMonth && draftDate === cell.dateKey;
              return (
                <button
                  key={cell.dateKey}
                  type="button"
                  disabled={!cell.inMonth}
                  onClick={() => setDraftDate(cell.dateKey)}
                  className={`flex h-10 w-full items-center justify-center rounded-[10px] text-[14px] font-medium transition-colors ${
                    !cell.inMonth
                      ? 'cursor-default bg-[#f7f7f7] text-[#b5b3b3]'
                      : isSelected
                        ? 'border border-[#ff5200] bg-[#fff2eb] text-[#ff5200]'
                        : 'cursor-pointer border border-[#e7e5e5] bg-white text-[#2e2e2e] hover:border-[#ff5200]/50 hover:bg-[#fff8f5]'
                  }`}
                >
                  {cell.day}
                </button>
              );
            })}
          </div>

          {/* Footer: Clear + Apply */}
          <div className="mt-7 flex items-center justify-end gap-4">
            <button
              type="button"
              onClick={() => {
                setDraftDate('Any date');
                onApplyDate('Any date');
                onClose();
              }}
              className="btn-jambo-interactive flex h-[48px] cursor-pointer items-center justify-center rounded-[12px] bg-white px-6 text-[14px] font-semibold text-[#2e2e2e] hover:bg-[#f4f3f3]"
            >
              <span>Clear</span>
            </button>
            <button
              type="button"
              onClick={() => {
                onApplyDate(draftDate);
                onClose();
              }}
              className="btn-jambo-primary flex h-[48px] cursor-pointer items-center justify-center rounded-[12px] px-6 text-[14px] font-semibold text-white"
            >
              <span>Apply</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  const config =
    activeModal === 'location'
      ? {
          title: 'Location',
          options: FIGMA_LOCATIONS,
          draft: draftLocation,
          setDraft: setDraftLocation,
          clearValue: 'All cities',
          onApply: onApplyLocation,
        }
      : activeModal === 'price'
        ? {
            title: 'Price',
            options: FIGMA_PRICE_RANGES,
            draft: draftPrice,
            setDraft: setDraftPrice,
            clearValue: 'All prices',
            onApply: onApplyPrice,
          }
        : {
            title: 'Categories',
            options: FIGMA_CATEGORIES,
            draft: draftScope,
            setDraft: setDraftScope,
            clearValue: 'All events',
            onApply: onApplyScope,
          };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Filter by ${config.title}`}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/35 p-4 backdrop-blur-[2px]"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="flex max-h-[86vh] w-full max-w-[500px] flex-col rounded-[24px] border border-[#e7e5e5] bg-white p-6 shadow-[0px_20px_60px_-20px_rgba(46,46,46,0.22)] sm:p-9"
      >
        {/* Header (Figma 149:8642 / 151:1413 / 153:1551) */}
        <div className="flex items-center justify-between gap-4">
          <h2 className="font-display text-[24px] font-semibold leading-[32px] text-[#2e2e2e]">
            {config.title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label={`Close ${config.title} filter`}
            className="flex size-11 cursor-pointer items-center justify-center rounded-full text-[#2e2e2e] transition-colors hover:bg-[#f4f3f3]"
          >
            <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        </div>

        {/* Scrollable Filter List (Figma 153:1493 default & pressed/selected states) */}
        <div className="mt-6 flex flex-1 flex-col gap-3 overflow-y-auto pr-1">
          {config.options.map((opt) => {
            const isSelected = config.draft === opt;
            return (
              <button
                key={opt}
                type="button"
                onClick={() => config.setDraft(isSelected ? config.clearValue : opt)}
                className={`flex w-full cursor-pointer items-center rounded-[12px] p-4 text-left text-[16px] leading-[24px] transition-colors ${
                  isSelected
                    ? 'border border-[#ff5200] bg-white font-medium text-[#1c1c1c]'
                    : 'border border-transparent bg-white font-normal text-[#807e7e] hover:bg-[#fafafa] hover:text-[#2e2e2e]'
                }`}
              >
                {opt}
              </button>
            );
          })}
        </div>

        {/* Footer: Clear + Apply (48px buttons) */}
        <div className="mt-6 flex items-center justify-end gap-4 pt-2">
          <button
            type="button"
            onClick={() => {
              config.setDraft(config.clearValue);
              config.onApply(config.clearValue);
              onClose();
            }}
            className="btn-jambo-interactive flex h-[48px] cursor-pointer items-center justify-center rounded-[12px] bg-white px-6 text-[14px] font-semibold text-[#2e2e2e] hover:bg-[#f4f3f3]"
          >
            <span>Clear</span>
          </button>
          <button
            type="button"
            onClick={() => {
              config.onApply(config.draft);
              onClose();
            }}
            className="btn-jambo-primary flex h-[48px] cursor-pointer items-center justify-center rounded-[12px] px-6 text-[14px] font-semibold text-white"
          >
            <span>Apply</span>
          </button>
        </div>
      </div>
    </div>
  );
}
