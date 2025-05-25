import React from 'react';

export function AchievementsCardSkeleton() {
  return (
    <div className="mx-auto w-full max-w-3xl">
      {/* 标题骨架 */}
      <div className="bg-muted/40 mb-4 h-6 w-32 animate-pulse rounded" />
      {/* 成就列表骨架 */}
      <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-x-10">
        {Array.from({ length: 8 }).map((_, idx) => (
          <li
            key={idx}
            className="bg-muted/10 flex min-h-[80px] animate-pulse items-center gap-4 rounded-lg p-4 shadow"
          >
            <div className="bg-muted/40 h-12 w-12 rounded border" />
            <div className="flex-1 space-y-3">
              <div className="bg-muted/40 h-4 w-1/2 rounded" />
              <div className="bg-muted/20 h-3 w-2/3 rounded" />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
