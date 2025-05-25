import React from 'react';

export function AchievementsModalListSkeleton() {
  return (
    <div className="w-full">
      {Array.from({ length: 5 }).map((_, idx) => (
        <div
          key={idx}
          className="bg-muted/10 mb-4 flex min-h-[64px] animate-pulse items-center gap-4 rounded-lg p-3"
        >
          <div className="bg-muted/40 h-10 w-10 rounded border" />
          <div className="flex-1 space-y-2">
            <div className="bg-muted/40 h-4 w-1/2 rounded" />
            <div className="bg-muted/20 h-3 w-2/3 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}
