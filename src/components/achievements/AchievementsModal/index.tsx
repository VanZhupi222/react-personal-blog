import { Dialog, DialogPanel, Transition } from '@headlessui/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { AchievementsModalListSkeleton } from '@/components/skeleton/AchievementsModalListSkeleton';
import { ErrorFunc } from '@/components/features/Error';
import { useRef } from 'react';

interface Achievement {
  displayName?: string;
  name?: string;
  description?: string;
  icon?: string;
  rarity?: number;
  achieved?: boolean;
}

interface Game {
  appid: number;
  name: string;
}

interface AchievementsModalProps {
  open: boolean;
  onClose: () => void;
  selectedGame?: Game;
  achievements: Achievement[];
  modalPage: number;
  modalTotalPages: number;
  setModalPage: (page: number) => void;
  loading: boolean;
  error: string | null | undefined;
  onRetry: () => void;
  t: any;
  MODAL_PAGE_SIZE: number;
}

export function AchievementsModal({
  open,
  onClose,
  selectedGame,
  achievements,
  modalPage,
  modalTotalPages,
  setModalPage,
  loading,
  error,
  onRetry,
  t,
  MODAL_PAGE_SIZE,
}: AchievementsModalProps) {
  const swiperRef = useRef<any>(null);

  return (
    <Transition appear show={open} as="div">
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition
          as="div"
          show={open}
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
              show={open}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              {!!selectedGame && (
                <DialogPanel className="bg-card relative mx-auto flex max-h-[80vh] w-[95vw] max-w-sm transform flex-col overflow-hidden rounded-2xl p-4 text-left align-middle shadow-xl transition-all sm:max-w-md sm:p-6 md:max-w-lg">
                  {/* 顶部大图 */}
                  <img
                    src={`https://cdn.cloudflare.steamstatic.com/steam/apps/${selectedGame.appid}/library_hero.jpg`}
                    alt={selectedGame.name}
                    className="mb-4 h-32 w-full rounded-lg object-cover"
                  />
                  <div className="mb-2 text-lg font-bold">{selectedGame?.name}</div>
                  <div className="hide-scrollbar flex-1 overflow-y-auto">
                    {loading ? (
                      <AchievementsModalListSkeleton />
                    ) : error ? (
                      <ErrorFunc onRetry={onRetry} />
                    ) : achievements.length === 0 ? (
                      <div className="text-muted-foreground py-8 text-center">
                        {t.achievements.noAchievements}
                      </div>
                    ) : (
                      <>
                        <Swiper
                          modules={[Pagination]}
                          spaceBetween={16}
                          slidesPerView={1}
                          speed={300}
                          resistance={true}
                          resistanceRatio={0.85}
                          followFinger={true}
                          threshold={20}
                          touchRatio={1}
                          pagination={false}
                          onSwiper={(swiper) => (swiperRef.current = swiper)}
                          initialSlide={modalPage - 1}
                          onSlideChange={(swiper) => setModalPage(swiper.activeIndex + 1)}
                          className="w-full"
                        >
                          {Array.from({ length: modalTotalPages }).map((_, index) => (
                            <SwiperSlide key={index}>
                              <div className="space-y-4">
                                {achievements
                                  .slice(index * MODAL_PAGE_SIZE, (index + 1) * MODAL_PAGE_SIZE)
                                  .map((ach, idx) => (
                                    <div
                                      key={idx}
                                      className={`bg-muted mb-4 flex items-center gap-3 rounded p-3 ${ach.achieved ? 'border-achievement-green border-2' : ''}`}
                                    >
                                      {ach?.icon && (
                                        <img
                                          src={ach.icon}
                                          alt={ach.displayName || ach.name}
                                          className={`h-10 w-10 rounded object-cover ${typeof ach.rarity === 'number' && ach.rarity < 10 ? 'border-achievement-rare-glow border-3' : ''}`}
                                        />
                                      )}
                                      <div className="flex-1">
                                        <div
                                          className={`line-clamp-1 font-medium ${ach.achieved ? 'text-achievement-darkgreen' : 'text-achievement-gray'}`}
                                        >
                                          {ach?.displayName || ach?.name}
                                        </div>
                                        <div className="text-muted-foreground line-clamp-2 text-xs">
                                          {ach?.description}
                                        </div>
                                        {typeof ach.rarity === 'number' && (
                                          <div
                                            className={
                                              ach.rarity < 10
                                                ? 'text-achievement-rare-glow-strong mt-1 text-xs font-bold'
                                                : 'text-achievement-gray mt-1 text-xs'
                                            }
                                          >
                                            {t.achievements.ownedByPercent.replace(
                                              '{percent}',
                                              ach.rarity.toFixed(1)
                                            )}
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  ))}
                              </div>
                            </SwiperSlide>
                          ))}
                        </Swiper>
                        {modalTotalPages > 1 && (
                          <div className="mt-2 flex w-full items-center justify-center">
                            <input
                              type="range"
                              min={1}
                              max={modalTotalPages}
                              value={modalPage}
                              onChange={(e) => {
                                const page = Number(e.target.value);
                                if (swiperRef.current) {
                                  swiperRef.current.slideTo(page - 1);
                                }
                              }}
                              className="accent-primary w-3/4"
                              style={{
                                accentColor: 'var(--primary-hover)',
                                backgroundColor: 'var(--primary-muted)',
                              }}
                            />
                            <span className="text-muted-foreground ml-2 text-sm">
                              {modalPage}/{modalTotalPages}
                            </span>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </DialogPanel>
              )}
            </Transition>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
