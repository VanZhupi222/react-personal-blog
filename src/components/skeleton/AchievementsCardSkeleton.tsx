import React from 'react';

export function AchievementsCardSkeleton() {
  return (
    <div className="flex h-full w-[90%] flex-col">
      {/* 标题骨架 */}
      <div className="bg-muted/40 mb-2 h-6 w-32 rounded" />
      {/* 成就列表骨架 */}
      <ul className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {Array.from({ length: 10 }).map((_, idx) => (
          <li key={idx} className="bg-muted/10 flex h-17.5 items-center gap-3 rounded-lg p-2">
            <span className="bg-muted h-10 w-10 rounded border" />
            <div className="min-w-0 flex-1 space-y-2">
              <div className="bg-muted/40 h-4 w-24 rounded" />
              <div className="bg-muted/20 h-3 w-32 rounded" />
              <div className="bg-muted/20 h-3 w-20 rounded" />
            </div>
          </li>
        ))}
      </ul>
      <div className="flex-1" />
      {/* 分页按钮骨架 */}
      <div className="mt-4 flex items-center justify-center gap-2 opacity-60">
        <button className="bg-muted rounded px-3 py-1 text-sm text-gray-600" disabled>
          上一页
        </button>
        <span className="text-xs text-gray-500">1 / 1</span>
        <button className="bg-muted rounded px-3 py-1 text-sm text-gray-600" disabled>
          下一页
        </button>
      </div>
    </div>
  );
}
