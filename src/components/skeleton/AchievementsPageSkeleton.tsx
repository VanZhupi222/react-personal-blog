import React from 'react';

export function AchievementsPageSkeleton() {
  return (
    <div className="space-y-4">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="h-20 w-full animate-pulse rounded bg-gray-200" />
      ))}
    </div>
  );
}
