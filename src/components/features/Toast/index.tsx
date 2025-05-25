'use client';

import { toast } from 'sonner';

interface ToastProps {
  title: string;
  message: string;
}

export function Toast({ title, message }: ToastProps) {
  return (
    <div className="flex flex-col gap-1">
      <h4 className="font-semibold">{title}</h4>
      <p className="text-muted-foreground text-sm">{message}</p>
    </div>
  );
}

interface ShowToastProps extends ToastProps {
  actionLabel?: string;
  onAction?: () => void;
  duration?: number;
}

export function showToast({
  title,
  message,
  actionLabel,
  onAction,
  duration = 10000,
}: ShowToastProps) {
  toast.info(<Toast title={title} message={message} />, {
    duration,
    action:
      actionLabel && onAction
        ? {
            label: actionLabel,
            onClick: onAction,
          }
        : undefined,
    className: 'bg-background border-border',
  });
}
