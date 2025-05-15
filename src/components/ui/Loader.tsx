import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface LoaderProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const sizes = {
  sm: 'size-4',
  md: 'size-8',
  lg: 'size-12',
};

export function Loader({ className, size = 'md' }: LoaderProps) {
  return (
    <div className={cn('flex items-center justify-center', className)}>
      <motion.div
        className={cn(
          'border-t-primary border-l-primary/30 border-b-primary/30 border-r-primary/30 rounded-full border-[3px]',
          sizes[size]
        )}
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          ease: 'linear',
          repeat: Infinity,
        }}
      />
    </div>
  );
}
