'use client';

import { toast } from 'sonner';

interface ToastProps {
  title: string;
  message: string;
  actionLabel?: string;
  onAction?: () => void;
  duration?: number;
}

export function Toast({ title, message, actionLabel, onAction, duration = 10000 }: ToastProps) {
  return (
    <div className="flex flex-col gap-1">
      <h4 className="font-semibold">{title}</h4>
      <p className="text-muted-foreground text-sm">{message}</p>
    </div>
  );
}

export function showToast({ title, message, actionLabel, onAction, duration }: ToastProps) {
  toast.info(
    <Toast
      title={title}
      message={message}
      actionLabel={actionLabel}
      onAction={onAction}
      duration={duration}
    />,
    {
      duration,
      action:
        actionLabel && onAction
          ? {
              label: actionLabel,
              onClick: onAction,
            }
          : undefined,
      className: 'bg-background border-border',
    }
  );
}
