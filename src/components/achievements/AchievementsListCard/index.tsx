import React, { useState, useMemo, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { AchievementsCardSkeleton } from '@/components/skeleton/AchievementsCardSkeleton';
import { ErrorFunc } from '@/components/features/Error';
import { AnimatePresence, motion } from 'framer-motion';
import { AchievementCard } from './AchievementCard';

interface Achievement {
  name: string;
  displayName: string;
  description: string;
  achieved: number;
  unlocktime: number;
  icon: string;
  icongray: string;
}

interface AchievementsListCardProps {
  selectedGame?: any;
  achievements: Achievement[];
  loading?: boolean;
  error?: string | null;
  onRetry?: () => void;
}

function CardImage({ hoveredGame }: { hoveredGame: any }) {
  if (!hoveredGame) return null;
  return (
    <img
      src={`https://cdn.cloudflare.steamstatic.com/steam/apps/${hoveredGame.appid}/library_hero.jpg`}
      alt={hoveredGame.name}
      className="max-h-[70vh] rounded-2xl border-4 border-white/10 object-cover object-center shadow-2xl"
      style={{
        boxShadow: '0 8px 32px 0 rgba(0,0,0,0.35)',
        background: 'rgba(0,0,0,0.1)',
      }}
    />
  );
}

function formatUnlockTime(unlocktime: number) {
  if (!unlocktime) return '';
  const date = new Date(unlocktime * 1000);
  return date.toLocaleDateString();
}

const PAGE_SIZE = 10;

export function AchievementsListCard({
  selectedGame,
  achievements,
  loading,
  error,
  onRetry,
}: AchievementsListCardProps) {
  const [page, setPage] = useState(1);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const ulRef = useRef<HTMLUListElement>(null);
  const totalPages = Math.ceil(achievements.length / PAGE_SIZE) || 1;

  // 切换游戏时重置页码
  React.useEffect(() => {
    setPage(1);
  }, [selectedGame]);

  const pagedAchievements = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return achievements.slice(start, start + PAGE_SIZE);
  }, [achievements, page]);

  if (!selectedGame) return null;
  return (
    <Card className="bg-card flex h-full min-h-[320px] w-[90%] flex-col rounded-lg p-6 shadow-lg transition-all">
      <CardContent className="flex h-full w-full flex-col">
        <div className="mb-4 flex w-full justify-center">
          <CardImage hoveredGame={selectedGame} />
        </div>
        {loading ? (
          <AchievementsCardSkeleton />
        ) : error ? (
          <ErrorFunc onRetry={onRetry} />
        ) : (
          <div className="relative flex h-full w-[90%] flex-col">
            <h3 className="mb-2 text-lg font-bold">成就列表</h3>
            <ul className="relative grid grid-cols-1 gap-3 md:grid-cols-2" ref={ulRef}>
              {pagedAchievements.map((ach, idx) => (
                <li
                  key={idx}
                  className="relative overflow-visible"
                  onMouseEnter={() => setHoveredIdx(idx)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  style={{ zIndex: hoveredIdx === idx ? 20 : 1 }}
                >
                  <AnimatePresence initial={false}>
                    {hoveredIdx !== idx && (
                      <motion.div
                        key="normal"
                        initial={{ opacity: 1 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.18 }}
                      >
                        <AchievementCard achievement={ach} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                  {/* 浮层卡片 */}
                  <AnimatePresence initial={false}>
                    {hoveredIdx === idx && (
                      <motion.div
                        key="float"
                        initial={{ opacity: 0, scale: 0.96, top: -10, left: -10 }}
                        animate={{ opacity: 1, scale: 1, top: -10, left: -10 }}
                        exit={{ opacity: 0, scale: 0.96, top: -10, left: -10 }}
                        transition={{ duration: 0.3 }}
                        className="pointer-events-auto absolute top-0 left-0 z-30 w-max max-w-[500px] min-w-[300px] cursor-pointer"
                      >
                        <AchievementCard
                          achievement={ach}
                          isFloating
                          onMouseEnter={() => setHoveredIdx(idx)}
                          onMouseLeave={() => setHoveredIdx(null)}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              ))}
            </ul>
            <div className="flex-1" />
            {totalPages > 1 ? (
              <div className="mt-4 flex items-center justify-center gap-2">
                <button
                  className="bg-muted rounded px-3 py-1 text-sm text-gray-600 disabled:opacity-50"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                >
                  上一页
                </button>
                <span className="text-xs text-gray-500">
                  {page} / {totalPages}
                </span>
                <button
                  className="bg-muted rounded px-3 py-1 text-sm text-gray-600 disabled:opacity-50"
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                >
                  下一页
                </button>
              </div>
            ) : (
              <div className="mt-4 flex items-center justify-center gap-2 opacity-60">
                <button className="bg-muted rounded px-3 py-1 text-sm text-gray-600" disabled>
                  上一页
                </button>
                <span className="text-xs text-gray-500">1 / 1</span>
                <button className="bg-muted rounded px-3 py-1 text-sm text-gray-600" disabled>
                  下一页
                </button>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
