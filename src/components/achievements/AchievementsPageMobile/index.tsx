import { useState, useEffect } from 'react';
import { AchievementsStatsCard } from '../AchievementsStatsCard';
import { AchievementsGameCard } from '../AchievementsGameCard';
import { Trophy, Medal } from 'lucide-react';
import { Dialog, DialogPanel, Transition } from '@headlessui/react';
import { PaginationMobile } from '@/components/features/Pagination/PaginationMobile';
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
import { AchievementsModalListSkeleton } from '@/components/skeleton/AchievementsModalListSkeleton';
import { AnimatePresence, motion } from 'framer-motion';

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
    if (!ownedGames.length) fetchOwnedGames();
  }, [ownedGames.length, fetchOwnedGames]);

  useEffect(() => {
    if (selectedAppId) {
      fetchAchievementOnClick(selectedAppId);
    }
  }, [locale, selectedAppId, fetchAchievementOnClick]);

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
  const MODAL_PAGE_SIZE = 5;
  const modalTotalPages = Math.ceil(achievements.length / MODAL_PAGE_SIZE);
  const modalCurrentItems = achievements.slice(
    (modalPage - 1) * MODAL_PAGE_SIZE,
    modalPage * MODAL_PAGE_SIZE
  );

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
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={currentPage}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.35, ease: 'easeInOut' }}
              >
                {currentItems.map((item) => (
                  <div key={item.appid} className="mb-4 w-full">
                    <AchievementsGameCard
                      item={item}
                      isHovered={hoveredAppId === item.appid}
                      isMobile={true}
                      t={{ ...t, formatPlaytime }}
                      onMouseEnter={() => setHoveredAppId(item.appid)}
                      onMouseLeave={() => setHoveredAppId(null)}
                      onClick={() => {
                        setSelectedAppId(item.appid);
                        setHoveredAppId(item.appid);
                        fetchAchievementOnClick(item.appid);
                      }}
                    />
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
          <Transition appear show={!!selectedGame} as="div">
            <Dialog as="div" className="relative z-50" onClose={() => setSelectedAppId(null)}>
              <Transition
                as="div"
                show={!!selectedGame}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-8"
                enterTo="opacity-100 translate-y-0"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-8"
              >
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" />
              </Transition>
              <div className="fixed inset-0 overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4">
                  <Transition
                    as="div"
                    show={!!selectedGame}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                  >
                    {!!selectedGame && (
                      <DialogPanel className="bg-card flex max-h-[80vh] w-full max-w-lg transform flex-col overflow-hidden rounded-2xl p-6 text-left align-middle shadow-xl transition-all">
                        {/* 顶部大图 */}
                        <img
                          src={`https://cdn.cloudflare.steamstatic.com/steam/apps/${selectedGame.appid}/library_hero.jpg`}
                          alt={selectedGame.name}
                          className="mb-4 h-32 w-full rounded-lg object-cover"
                        />
                        <div className="mb-2 text-lg font-bold">{selectedGame?.name}</div>
                        <div className="hide-scrollbar flex-1 overflow-y-auto">
                          {achievementDetailLoading ? (
                            <AchievementsModalListSkeleton />
                          ) : achievementDetailError ? (
                            <ErrorFunc
                              onRetry={() =>
                                selectedGame && fetchAchievementOnClick(selectedGame.appid)
                              }
                            />
                          ) : modalCurrentItems.length === 0 ? (
                            <div className="text-muted-foreground py-8 text-center">
                              {t.achievements.noAchievements}
                            </div>
                          ) : (
                            <AnimatePresence mode="wait" initial={false}>
                              <motion.div
                                key={modalPage}
                                initial={{ opacity: 0, x: 40 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -40 }}
                                transition={{ duration: 0.35, ease: 'easeInOut' }}
                              >
                                {modalCurrentItems.map(
                                  (
                                    ach: {
                                      apiname?: string;
                                      displayName?: string;
                                      name?: string;
                                      description?: string;
                                      icon?: string;
                                    },
                                    idx: number
                                  ) => (
                                    <div
                                      key={ach?.apiname || idx}
                                      className="bg-muted mb-4 flex items-center gap-3 rounded p-3"
                                    >
                                      {ach?.icon && (
                                        <img
                                          src={ach.icon}
                                          alt={ach.displayName || ach.name}
                                          className="h-10 w-10 rounded object-cover"
                                        />
                                      )}
                                      <div className="flex-1">
                                        <div className="font-medium">
                                          {ach?.displayName || ach?.name}
                                        </div>
                                        <div className="text-muted-foreground text-xs">
                                          {ach?.description}
                                        </div>
                                      </div>
                                    </div>
                                  )
                                )}
                              </motion.div>
                            </AnimatePresence>
                          )}
                        </div>
                        {modalTotalPages > 1 && (
                          <div className="mt-2">
                            <PaginationMobile
                              currentPage={modalPage}
                              total={achievements.length}
                              pageSize={MODAL_PAGE_SIZE}
                              onPageChange={setModalPage}
                              labels={{ prev: '<', next: '>' }}
                            />
                          </div>
                        )}
                      </DialogPanel>
                    )}
                  </Transition>
                </div>
              </div>
            </Dialog>
          </Transition>
        </div>
        {/* 手机端分页：只保留左右箭头和输入框 */}
        {totalPages > 1 && (
          <div className="mt-8 flex items-center justify-center">
            <PaginationMobile
              currentPage={currentPage}
              total={filteredGames.length}
              pageSize={ITEMS_PER_PAGE}
              onPageChange={setCurrentPage}
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
