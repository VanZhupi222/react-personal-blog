import { useEffect, useState } from 'react';
import { AchievementsStatsCard } from './AchievementsStatsCard';
import { AchievementsGameCard } from './AchievementsGameCard';
import { CardImage } from '@/components/ui/Card';
import { Trophy, ChevronLeft, ChevronRight, Medal } from 'lucide-react';
import { useSteamStore } from '@/store/steam';
import { Button } from '@/components/ui/button';
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
import { AchievementsCardSkeleton } from '@/components/skeleton/AchievementsCardSkeleton';
import { useFetchOnClick } from '@/lib/hooks/useFetchOnClick';

export function AchievementsPage() {
  const { t } = useTranslations();
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
    if (!ownedGames.length) fetchOwnedGames();
  }, [ownedGames.length, fetchOwnedGames]);

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
            <div className="mb-2 text-center text-sm text-gray-500">点击游戏卡片可查看成就</div>
            {currentItems.map((item) => {
              const isHovered = hoveredAppId === item.appid;
              const isSelected = selectedAppId === item.appid;
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
                    achievements={achievementDetail}
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
          <div className="mt-8 flex items-center justify-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm">
              {t.achievements.pagination.page
                .replace('{current}', currentPage.toString())
                .replace('{total}', totalPages.toString())}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
