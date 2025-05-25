import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface PaginationProps {
  currentPage: number;
  total: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  disabled?: boolean;
  className?: string;
  labels?: {
    prev: string;
    next: string;
    goTo?: string;
  };
}

function getPageList(current: number, total: number) {
  const pages: (number | string)[] = [];
  if (total <= 7) {
    for (let i = 1; i <= total; i++) pages.push(i);
    return pages;
  }
  if (current <= 4) {
    pages.push(1, 2, 3, 4, 5, '...', total);
  } else if (current >= total - 3) {
    pages.push(1, '...', total - 4, total - 3, total - 2, total - 1, total);
  } else {
    pages.push(1, '...', current - 1, current, current + 1, '...', total);
  }
  return pages;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  total,
  pageSize,
  onPageChange,
  disabled = false,
  className = '',
  labels = { prev: 'Prev', next: 'Next', goTo: 'Go to' },
}) => {
  const totalPages = Math.ceil(total / pageSize) || 1;
  const [input, setInput] = useState('');

  const pages = getPageList(currentPage, totalPages);

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
    <div className={`flex items-center gap-2 ${className}`}>
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
      <span className="relative flex gap-1">
        {pages.map((p, idx) =>
          p === '...' ? (
            <motion.span
              key={`ellipsis-${idx}`}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="text-muted-foreground mx-1 select-none"
            >
              ...
            </motion.span>
          ) : (
            <motion.button
              key={`page-${p}`}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.18 }}
              className={`mx-0.5 h-8 w-8 rounded-full border text-sm font-medium transition-colors duration-150 ${
                currentPage === p
                  ? 'border-primary bg-primary-hover text-white'
                  : 'border-border bg-background text-foreground hover:border-primary-hover hover:text-primary-hover hover:bg-muted cursor-pointer'
              } `}
              onClick={() => onPageChange(Number(p))}
              disabled={currentPage === p || disabled}
              style={{ cursor: currentPage === p || disabled ? 'default' : 'pointer' }}
            >
              {p}
            </motion.button>
          )
        )}
      </span>
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
      <span className="ml-2 text-sm text-gray-500">{labels.goTo || 'Go to'}</span>
      <input
        type="text"
        className="focus:text-primary-foreground w-12 rounded border px-2 py-1 text-sm focus:outline-none"
        value={input}
        onChange={handleInputChange}
        onBlur={handleInputGo}
        onKeyDown={(e) => {
          if (e.key === 'Enter') handleInputGo();
        }}
        disabled={disabled}
        placeholder={currentPage.toString()}
      />
    </div>
  );
};
