import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

interface PaginationMobileProps {
  currentPage: number;
  total: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  labels?: {
    prev?: string;
    next?: string;
    goTo?: string;
  };
  disabled?: boolean;
}

export function PaginationMobile({
  currentPage,
  total,
  pageSize,
  onPageChange,
  labels = { prev: '<', next: '>', goTo: 'Go' },
  disabled = false,
}: PaginationMobileProps) {
  const totalPages = Math.ceil(total / pageSize);
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value.replace(/[^0-9]/g, ''));
  };

  const handleInputGo = () => {
    const p = Number(inputValue);
    if (p >= 1 && p <= totalPages) {
      onPageChange(p);
      setInputValue('');
    }
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleInputGo();
  };

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-center gap-2 py-2">
        <button
          className="rounded px-2 py-1 text-lg font-bold disabled:opacity-50"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={disabled || currentPage === 1}
          aria-label="Previous page"
        >
          {labels.prev}
        </button>
        <span className="mx-2 text-base">
          {currentPage} / {totalPages}
        </span>
        <button
          className="rounded px-2 py-1 text-lg font-bold disabled:opacity-50"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={disabled || currentPage === totalPages}
          aria-label="Next page"
        >
          {labels.next}
        </button>
        <input
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          className="ml-4 w-12 rounded border px-1 py-0.5 text-center text-base outline-none"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
          disabled={disabled}
          placeholder={labels.goTo || 'Go'}
          aria-label="Go to page"
        />
        <button
          className="bg-primary ml-1 rounded px-2 py-1 text-white disabled:opacity-50"
          onClick={handleInputGo}
          disabled={
            disabled || !inputValue || Number(inputValue) < 1 || Number(inputValue) > totalPages
          }
        >
          {labels.goTo || 'Go'}
        </button>
      </div>
      <Swiper
        modules={[Pagination]}
        spaceBetween={0}
        slidesPerView={1}
        pagination={{
          clickable: true,
          type: 'progressbar',
        }}
        onSlideChange={(swiper) => onPageChange(swiper.activeIndex + 1)}
        initialSlide={currentPage - 1}
        className="mt-2 h-1 w-full"
      >
        {Array.from({ length: totalPages }).map((_, index) => (
          <SwiperSlide key={index} />
        ))}
      </Swiper>
    </div>
  );
}
