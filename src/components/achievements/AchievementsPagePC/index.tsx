import { useEffect, useState } from 'react';
import { AchievementsStatsCard } from '../AchievementsStatsCard';
import { AchievementsGameCard } from '../AchievementsGameCard';
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
import { AchievementsListCard } from '../AchievementsListCard';
import { useFetchOnClick } from '@/lib/hooks/useFetchOnClick';
import { Pagination } from '@/components/features/Pagination';

export function AchievementsPagePC() {
  const { t, locale } = useTranslations();
  const { ownedGames, ownedGamesLoading, fetchOwnedGames, error } = useSteamStore();
  const [currentPage, setCurrentPage] = useState(1);
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
    if (!ownedGames.length && !ownedGamesLoading) fetchOwnedGames();
  }, [ownedGames.length, ownedGamesLoading, fetchOwnedGames]);

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
        <div className="mb-8 grid w-full grid-cols-1 gap-6 md:grid-cols-2">
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

        <div className="flex min-h-[340px] w-full flex-col md:flex-row">
          {/* 左侧：游戏列表 */}
          <div className="mx-auto w-full space-y-4 px-2 md:w-1/2">
            <div className="mb-2 text-center text-sm text-gray-500">
              {t.achievements.clickToView}
            </div>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={currentPage}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.35, ease: 'easeInOut' }}
              >
                {currentItems.map((item) => {
                  const isHovered = hoveredAppId === item.appid;
                  return (
                    <div key={item.appid} className="mb-4 w-full">
                      <AchievementsGameCard
                        item={item}
                        isHovered={isHovered}
                        isMobile={false}
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
              </motion.div>
            </AnimatePresence>
            {/* 占位补齐，保证高度一致，避免最后一页高度跳变（仅PC端） */}
            {Array.from({ length: Math.max(0, 5 - currentItems.length) }).map((_, idx) => (
              <div key={`placeholder-${idx}`} className="h-[137.5px] md:h-[137.5px]" />
            ))}
          </div>
          {/* 右侧：大图展示区+成就内容（仅桌面端） */}
          <div className="relative mt-6 flex min-h-[340px] w-full flex-col items-start justify-start md:w-1/2">
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
                    onRetry={() => selectedGame && fetchAchievementOnClick(selectedGame.appid)}
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
              onPageChange={setCurrentPage}
              isMobile={false}
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
