import { useState, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface CollapsibleCardProps {
  header: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
  className?: string;
}

export function CollapsibleCard({
  header,
  children,
  defaultOpen = false,
  className = '',
}: CollapsibleCardProps) {
  const [open, setOpen] = useState(defaultOpen);
  const cardRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const shouldScrollRef = useRef(false);

  // 标记本次是展开
  const handleToggle = () => {
    setOpen((v) => {
      if (!v) shouldScrollRef.current = true;
      return !v;
    });
  };

  // 动画完成时滚动
  const handleAnimationComplete = () => {
    if (open && shouldScrollRef.current && contentRef.current) {
      contentRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
      shouldScrollRef.current = false;
    }
  };

  return (
    <div ref={cardRef} className={`bg-card rounded-lg border shadow-lg ${className}`}>
      <div
        className="flex cursor-pointer items-center justify-between px-4 pt-4 pb-2"
        onClick={handleToggle}
      >
        <div className="min-w-0 flex-1">{header}</div>
        <button className="hover:bg-accent/30 ml-2 rounded p-1" aria-label="Expand/Collapse">
          {open ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>
      </div>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            ref={contentRef}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden px-4 pb-4"
            onAnimationComplete={handleAnimationComplete}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
