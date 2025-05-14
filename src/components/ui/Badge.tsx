import { Tag } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  icon?: boolean;
  className?: string;
}

export function Badge({ children, icon = false, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'bg-secondary text-secondary-foreground inline-flex items-center gap-1 rounded-full px-3 py-1 text-sm',
        className
      )}
    >
      {icon && <Tag className="h-3 w-3" />}
      {children}
    </span>
  );
}
