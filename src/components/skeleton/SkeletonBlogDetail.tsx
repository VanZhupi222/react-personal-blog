import React from 'react';

export default function SkeletonBlogDetail() {
  return (
    <div className="bg-background flex min-h-[100dvh] justify-center px-2 py-8">
      <div className="bg-card dark:bg-card w-full max-w-3xl animate-pulse rounded-2xl p-6 shadow-xl sm:p-10">
        {/* 标题骨架 */}
        <div className="bg-muted mx-auto mb-2 h-10 w-2/3 rounded" />
        {/* 元信息骨架 */}
        <div className="mb-6 flex flex-wrap items-center justify-center gap-3 text-xs sm:text-sm">
          <div className="bg-muted h-5 w-20 rounded" />
          <div className="bg-muted h-5 w-16 rounded" />
          <div className="bg-muted h-5 w-10 rounded" />
          <div className="bg-muted h-5 w-14 rounded" />
        </div>
        {/* 描述骨架 */}
        <div className="bg-muted mx-auto mb-8 h-6 w-3/4 rounded" />
        {/* 分割线骨架 */}
        <div className="border-border mb-8 border-b border-dashed" />
        {/* 正文骨架 */}
        <div className="space-y-4">
          <div className="bg-muted h-5 w-5/6 rounded" />
          <div className="bg-muted h-5 w-2/3 rounded" />
          <div className="bg-muted h-5 w-3/4 rounded" />
          <div className="bg-muted h-5 w-1/2 rounded" />
          <div className="bg-muted/70 h-40 w-full rounded" />
          <div className="bg-muted h-5 w-2/3 rounded" />
          <div className="bg-muted h-5 w-1/2 rounded" />
        </div>
      </div>
    </div>
  );
}
