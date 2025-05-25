import React, { useState } from 'react';

interface PaginationMobileProps {
  currentPage: number;
  total: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  disabled?: boolean;
  labels?: {
    prev: string;
    next: string;
    goTo?: string;
  };
}

export const PaginationMobile: React.FC<PaginationMobileProps> = ({
  currentPage,
  total,
  pageSize,
  onPageChange,
  disabled = false,
  labels = { prev: 'Prev', next: 'Next', goTo: 'Go to' },
}) => {
  const totalPages = Math.ceil(total / pageSize) || 1;
  const [input, setInput] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/[^\d]/g, '');
    setInput(val);
  };
  const handleInputGo = () => {
    const num = Number(input);
    if (num >= 1 && num <= totalPages && num !== currentPage) {
      onPageChange(num);
    }
    setInput('');
  };

  return (
    <div className="flex w-full flex-row items-center justify-center gap-2">
      <button
        className={`rounded border px-2 py-1 text-sm transition-colors duration-150 ${
          currentPage === 1 || disabled
            ? 'border-muted bg-muted text-muted-foreground cursor-not-allowed'
            : 'border-border bg-background text-foreground hover:border-primary-hover hover:text-primary-hover hover:bg-muted cursor-pointer'
        } `}
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1 || disabled}
        aria-label={labels.prev}
      >
        &lt;
      </button>
      <input
        type="text"
        className="focus:text-primary-foreground mx-2 w-12 rounded border px-2 py-1 text-sm focus:outline-none"
        value={input}
        onChange={handleInputChange}
        onBlur={handleInputGo}
        onKeyDown={(e) => {
          if (e.key === 'Enter') handleInputGo();
        }}
        disabled={disabled}
        placeholder={currentPage.toString()}
        style={{ textAlign: 'center' }}
      />
      <button
        className={`rounded border px-2 py-1 text-sm transition-colors duration-150 ${
          currentPage === totalPages || disabled
            ? 'border-muted bg-muted text-muted-foreground cursor-not-allowed'
            : 'border-border bg-background text-foreground hover:border-primary-hover hover:text-primary-hover hover:bg-muted cursor-pointer'
        } `}
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages || disabled}
        aria-label={labels.next}
      >
        &gt;
      </button>
    </div>
  );
};
