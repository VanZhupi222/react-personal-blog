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
        "inline-flex items-center gap-1 px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm",
        className
      )}
    >
      {icon && <Tag className="w-3 h-3" />}
      {children}
    </span>
  );
} 