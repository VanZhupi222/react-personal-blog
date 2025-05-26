import { useState, useEffect } from 'react';
import { AchievementsStatsCard } from '../AchievementsStatsCard';
import { Trophy, Medal } from 'lucide-react';
import {
  MIN_PLAYTIME_HOURS,
  ITEMS_PER_PAGE,
  filterGamesByPlaytime,
  paginateGames,
} from '@/lib/achievements/parser';
import { formatPlaytime } from '@/lib/utils/format';
import { useTranslations } from '@/lib/hooks/useTranslations';
import { useSteamStore } from '@/store/steam';
import { useFetchOnClick } from '@/lib/hooks/useFetchOnClick';
import { AchievementsPageSkeleton } from '@/components/skeleton/AchievementsPageSkeleton';
import { ErrorFunc } from '@/components/features/Error';
import 'swiper/css';
import 'swiper/css/pagination';
import { AchievementsGameSwiper } from '../AchievementsGameSwiper';
import { AchievementsModal } from '../AchievementsModal';

export function AchievementsPageMobile() {
  const { t, locale } = useTranslations();
  const { ownedGames, ownedGamesLoading, fetchOwnedGames, error, achievementDetail } =
    useSteamStore();
  const [currentPage, setCurrentPage] = useState(1);
  const [hoveredAppId, setHoveredAppId] = useState<number | null>(null);
  const [selectedAppId, setSelectedAppId] = useState<number | null>(null);
  const { achievementDetailLoading, achievementDetailError, fetchAchievementDetail } =
    useSteamStore();
  const { handleClick: fetchAchievementOnClick } = useFetchOnClick({
    fetchData: fetchAchievementDetail,
    loading: achievementDetailLoading,
    error: achievementDetailError,
  });
  const [modalPage, setModalPage] = useState(1);

  useEffect(() => {
    if (!ownedGames.length && !ownedGamesLoading) fetchOwnedGames();
  }, [ownedGames.length, ownedGamesLoading, fetchOwnedGames]);

  useEffect(() => {
    if (selectedAppId && !achievementDetailLoading) {
      fetchAchievementOnClick(selectedAppId);
    }
  }, [locale, selectedAppId, fetchAchievementOnClick, achievementDetailLoading]);

  useEffect(() => {
    setModalPage(1);
  }, [selectedAppId]);

  const filteredGames = filterGamesByPlaytime(ownedGames);
  const totalPages = Math.ceil(filteredGames.length / ITEMS_PER_PAGE);
  const currentItems = paginateGames(filteredGames, currentPage, ITEMS_PER_PAGE);

  const selectedGame = selectedAppId ? currentItems.find((g) => g.appid === selectedAppId) : null;
  const achievements = selectedGame
    ? achievementDetail[`${selectedGame.appid}_${locale}`] || []
    : [];
  const MODAL_PAGE_SIZE = 4;
  const modalTotalPages = Math.ceil(achievements.length / MODAL_PAGE_SIZE);

  if (ownedGamesLoading) {
    return <AchievementsPageSkeleton />;
  }
  if (error) {
    return <ErrorFunc onRetry={fetchOwnedGames} />;
  }

  return (
    <div className="relative container mx-auto py-8">
      <div className="relative z-10">
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
        <div className="flex w-full flex-col">
          <div className="mx-auto w-full space-y-4 px-2">
            <div className="mb-2 text-center text-sm text-gray-500">
              {t.achievements.clickToView}
            </div>
            <AchievementsGameSwiper
              games={filteredGames}
              pageSize={ITEMS_PER_PAGE}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              hoveredAppId={hoveredAppId}
              setHoveredAppId={setHoveredAppId}
              setSelectedAppId={setSelectedAppId}
              fetchAchievementOnClick={fetchAchievementOnClick}
              t={t}
              formatPlaytime={formatPlaytime}
            />
          </div>
          {/* 弹窗成就列表 */}
          <AchievementsModal
            open={!!selectedGame}
            onClose={() => setSelectedAppId(null)}
            selectedGame={selectedGame ?? undefined}
            achievements={achievements.map((a) => ({
              ...a,
              achieved: !!a.achieved,
            }))}
            modalPage={modalPage}
            modalTotalPages={modalTotalPages}
            setModalPage={setModalPage}
            loading={achievementDetailLoading}
            error={achievementDetailError}
            onRetry={() => selectedGame && fetchAchievementOnClick(selectedGame.appid)}
            t={t}
            MODAL_PAGE_SIZE={MODAL_PAGE_SIZE}
          />
        </div>
      </div>
    </div>
  );
}
