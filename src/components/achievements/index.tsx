import { useEffect, useState } from 'react';
import { AchievementsStatsCard } from './AchievementsStatsCard';
import { AchievementsGameCard } from './AchievementsGameCard';
import { Trophy, Medal } from 'lucide-react';
import { useSteamStore } from '@/store/steam';
import { useTranslations } from '@/lib/hooks/useTranslations';
import type { ParsedGame } from '@/lib/steam/parser';
import {
  filterGamesByPlaytime,
  paginateGames,
  MIN_PLAYTIME_HOURS,
  ITEMS_PER_PAGE,
} from '@/lib/achievements/parser';
import { formatPlaytime } from '@/lib/utils/format';
import { motion, AnimatePresence } from 'framer-motion';
import { AchievementsPageSkeleton } from '@/components/skeleton/AchievementsPageSkeleton';
import { ErrorFunc } from '@/components/features/Error';
import { AchievementsListCard } from './AchievementsListCard';
import { useFetchOnClick } from '@/lib/hooks/useFetchOnClick';
import { Pagination } from '@/components/features/Pagination';

export function AchievementsPage() {
  const { t, locale } = useTranslations();
  const { ownedGames, ownedGamesLoading, fetchOwnedGames, error } = useSteamStore();
  const [currentPage, setCurrentPage] = useState(1);
  const [direction, setDirection] = useState(1);
  const [hoveredAppId, setHoveredAppId] = useState<number | null>(null);
  const [selectedAppId, setSelectedAppId] = useState<number | null>(null);
  const {
    achievementDetail,
    achievementDetailLoading,
    achievementDetailError,
    fetchAchievementDetail,
  } = useSteamStore();

  const { handleClick: fetchAchievementOnClick } = useFetchOnClick({
    fetchData: fetchAchievementDetail,
    loading: achievementDetailLoading,
    error: achievementDetailError,
  });

  useEffect(() => {
    if (!ownedGames.length) fetchOwnedGames();
  }, [ownedGames.length, fetchOwnedGames]);

  useEffect(() => {
    if (selectedAppId) {
      fetchAchievementOnClick(selectedAppId);
    }
  }, [locale, selectedAppId, fetchAchievementOnClick]);

  if (ownedGamesLoading) {
    return <AchievementsPageSkeleton />;
  }
  if (error) {
    return <ErrorFunc onRetry={fetchOwnedGames} />;
  }

  const filteredGames: ParsedGame[] = filterGamesByPlaytime(ownedGames);
  const totalPages = Math.ceil(filteredGames.length / ITEMS_PER_PAGE);
  const currentItems = paginateGames(filteredGames, currentPage, ITEMS_PER_PAGE);

  const hoveredGame = currentItems.find((g) => g.appid === hoveredAppId);
  const selectedGame = selectedAppId ? currentItems.find((g) => g.appid === selectedAppId) : null;

  const achievements = selectedGame
    ? achievementDetail[`${selectedGame.appid}_${locale}`] || []
    : [];

  const handleGameClick = (appid: number) => {
    setSelectedAppId(appid === selectedAppId ? null : appid);
    setHoveredAppId(appid);
    if (appid !== selectedAppId) {
      fetchAchievementOnClick(appid);
    }
  };

  const handlePageChange = (newPage: number) => {
    setDirection(newPage > currentPage ? 1 : -1);
    setCurrentPage(newPage);
  };

  return (
    <div className="relative container mx-auto py-8">
      {/* 背景层 */}
      <AnimatePresence mode="wait">
        {hoveredGame && (
          <motion.div
            key={hoveredGame.appid}
            className="pointer-events-none fixed inset-0 z-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            style={{
              backgroundImage: `url(https://cdn.cloudflare.steamstatic.com/steam/apps/${hoveredGame.appid}/library_hero.jpg)`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: 'blur(8px) brightness(0.6)',
            }}
          />
        )}
      </AnimatePresence>

      {/* 内容区 */}
      <div className="relative z-10">
        {/* 高斯模糊毛玻璃标题条 */}
        <div className="relative mb-6 w-fit">
          <div className="bg-card-30 absolute inset-0 rounded-lg backdrop-blur" />
          <h1 className="relative z-10 px-6 py-2 text-3xl font-bold">{t.achievements.title}</h1>
        </div>
        <div className="mb-8 grid grid-cols-3 gap-4">
          <AchievementsStatsCard
            icon={<Trophy className="h-4 w-4 text-yellow-500" />}
            title={t.achievements.stats.totalGames.title}
            value={filteredGames.length}
            subtitle={t.achievements.stats.totalGames.subtitle.replace(
              '{hours}',
              MIN_PLAYTIME_HOURS.toString()
            )}
          />
          <AchievementsStatsCard
            icon={<Medal className="h-4 w-4 text-yellow-500" />}
            title={t.achievements.stats.totalPlaytime.title}
            value={formatPlaytime(filteredGames.reduce((sum, g) => sum + g.playtime, 0))}
            subtitle={t.achievements.stats.totalPlaytime.subtitle}
          />
        </div>

        <div className="flex min-h-[340px] w-full">
          {/* 左侧：游戏列表 */}
          <div className="mx-auto w-1/2 space-y-4">
            <div className="mb-2 text-center text-sm text-gray-500">
              {t.achievements.clickToView}
            </div>
            {currentItems.map((item) => {
              const isHovered = hoveredAppId === item.appid;
              return (
                <div key={item.appid}>
                  <AchievementsGameCard
                    item={item}
                    isHovered={isHovered}
                    t={{
                      ...t,
                      formatPlaytime,
                    }}
                    onMouseEnter={() => setHoveredAppId(item.appid)}
                    onMouseLeave={() => setHoveredAppId(null)}
                    onClick={() => handleGameClick(item.appid)}
                  />
                </div>
              );
            })}
            {/* 占位补齐，保证高度一致，避免最后一页高度跳变 */}
            {Array.from({ length: Math.max(0, 5 - currentItems.length) }).map((_, idx) => (
              <div key={`placeholder-${idx}`} className="h-[138px] md:h-[138px]" />
            ))}
          </div>
          {/* 右侧：大图展示区+成就内容 */}
          <div className="relative mt-6 flex min-h-[340px] w-1/2 flex-col items-start justify-start">
            <AnimatePresence mode="wait">
              {selectedGame && (
                <motion.div
                  key={selectedGame.appid}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.04 }}
                  transition={{ duration: 0.5, ease: 'easeInOut' }}
                  className="flex h-full w-full justify-center"
                >
                  <AchievementsListCard
                    selectedGame={selectedGame}
                    achievements={achievements}
                    loading={achievementDetailLoading}
                    error={achievementDetailError}
                    onRetry={() => fetchAchievementOnClick(selectedGame.appid)}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {totalPages > 1 && (
          <div className="mt-8 flex items-center justify-center">
            <Pagination
              currentPage={currentPage}
              total={filteredGames.length}
              pageSize={ITEMS_PER_PAGE}
              onPageChange={handlePageChange}
              direction={direction}
              labels={{
                prev: t.achievements.pagination.prev,
                next: t.achievements.pagination.next,
                goTo: t.achievements.pagination.goTo,
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
