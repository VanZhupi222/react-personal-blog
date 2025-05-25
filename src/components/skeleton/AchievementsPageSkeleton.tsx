import React from 'react';

export function AchievementsPageSkeleton() {
  return (
    <div className="mx-auto w-full max-w-4xl px-2 py-8">
      {/* 标题骨架 */}
      <div className="bg-muted/40 mb-6 h-7 w-32 animate-pulse rounded" />
      {/* 统计卡片骨架 */}
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:gap-8">
        <div className="bg-muted/30 h-24 flex-1 animate-pulse rounded-xl" />
        <div className="bg-muted/30 h-24 flex-1 animate-pulse rounded-xl" />
      </div>
      {/* 提示骨架 */}
      <div className="bg-muted/30 mb-4 h-4 w-48 animate-pulse rounded" />
      {/* 游戏卡片骨架 */}
      <div className="flex flex-col gap-6">
        {Array.from({ length: 5 }).map((_, idx) => (
          <div
            key={idx}
            className="bg-muted/10 flex animate-pulse items-center gap-4 rounded-xl p-4 shadow"
          >
            <div className="bg-muted/30 h-20 w-36 rounded-lg" />
            <div className="flex-1 space-y-3">
              <div className="bg-muted/40 h-5 w-32 rounded" />
              <div className="bg-muted/20 h-4 w-20 rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
