import React, { useState, useMemo, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { AchievementsCardSkeleton } from '@/components/skeleton/AchievementsCardSkeleton';
import { ErrorFunc } from '@/components/features/Error';
import { AnimatePresence, motion } from 'framer-motion';
import { AchievementCard } from './AchievementCard';
import { useTranslations } from '@/lib/hooks/useTranslations';
import { Pagination } from '@/components/features/Pagination';
import type { ParsedGame } from '@/lib/steam/parser';

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
  selectedGame?: ParsedGame;
  achievements: Achievement[];
  loading?: boolean;
  error?: string | null;
  onRetry?: () => void;
}

function CardImage({ hoveredGame }: { hoveredGame: ParsedGame | undefined }) {
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

const PAGE_SIZE = 8;

export function AchievementsListCard({
  selectedGame,
  achievements,
  loading,
  error,
  onRetry,
}: AchievementsListCardProps) {
  const { t } = useTranslations();
  const [page, setPage] = useState(1);
  const [prevPage, setPrevPage] = useState(1);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const ulRef = useRef<HTMLUListElement>(null);
  const totalPages = Math.ceil(achievements.length / PAGE_SIZE) || 1;

  React.useEffect(() => {
    setPage(1);
    setPrevPage(1);
  }, [selectedGame]);

  const pagedAchievements = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return achievements.slice(start, start + PAGE_SIZE);
  }, [achievements, page]);

  const direction = page > prevPage ? 1 : -1;

  const handleSetPage = (newPage: number) => {
    setPrevPage(page);
    setPage(newPage);
  };

  if (!selectedGame) return null;
  return (
    <Card className="bg-card flex h-full min-h-[320px] w-[90%] flex-col rounded-lg p-6 shadow-lg transition-all">
      <CardContent className="flex h-full w-full flex-col">
        <div className="mx-auto mb-4 flex w-full max-w-3xl justify-center">
          <CardImage hoveredGame={selectedGame} />
        </div>
        {loading ? (
          <AchievementsCardSkeleton />
        ) : error ? (
          <ErrorFunc onRetry={onRetry} />
        ) : (
          <div className="relative mx-auto flex h-full w-full max-w-3xl flex-col">
            <h3 className="mb-2 text-lg font-bold">{t.achievements.title}</h3>
            <AnimatePresence mode="wait" initial={false}>
              <motion.ul
                key={page}
                className="relative grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-x-10"
                ref={ulRef}
                initial={{ opacity: 0, x: 40 * direction }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 * direction }}
                transition={{ duration: 0.35, ease: 'easeInOut' }}
              >
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
                          className="pointer-events-auto absolute top-0 left-0 z-30 w-max max-w-[600px] min-w-[320px] cursor-pointer"
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
              </motion.ul>
            </AnimatePresence>
          </div>
        )}
        <div className="mt-6 flex justify-center">
          {totalPages > 1 ? (
            <Pagination
              currentPage={page}
              total={achievements.length}
              pageSize={PAGE_SIZE}
              onPageChange={handleSetPage}
              disabled={loading}
              labels={{
                prev: t.achievements.pagination.prev,
                next: t.achievements.pagination.next,
              }}
            />
          ) : (
            <Pagination
              currentPage={1}
              total={achievements.length}
              pageSize={PAGE_SIZE}
              onPageChange={() => {}}
              disabled
              labels={{
                prev: t.achievements.pagination.prev,
                next: t.achievements.pagination.next,
              }}
            />
          )}
        </div>
      </CardContent>
    </Card>
  );
}
