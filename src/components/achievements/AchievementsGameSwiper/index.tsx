import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { AchievementsGameCard } from '../AchievementsGameCard';
import type { ParsedGame } from '@/lib/steam/parser';

interface AchievementsGameSwiperProps {
  games: ParsedGame[];
  pageSize: number;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  hoveredAppId: number | null;
  setHoveredAppId: (id: number | null) => void;
  setSelectedAppId: (id: number) => void;
  fetchAchievementOnClick: (appid: number) => void;
  t: any;
  formatPlaytime: (playtime: number) => string;
}

export function AchievementsGameSwiper({
  games,
  pageSize,
  currentPage,
  totalPages,
  onPageChange,
  hoveredAppId,
  setHoveredAppId,
  setSelectedAppId,
  fetchAchievementOnClick,
  t,
  formatPlaytime,
}: AchievementsGameSwiperProps) {
  const swiperRef = useRef<any>(null);

  // 分页
  const paginateGames = (games: ParsedGame[], page: number, pageSize: number) => {
    const start = (page - 1) * pageSize;
    return games.slice(start, start + pageSize);
  };

  return (
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
        onSlideChange={(swiper) => onPageChange(swiper.activeIndex + 1)}
        initialSlide={currentPage - 1}
        className="w-full"
        onSwiper={(swiper) => (swiperRef.current = swiper)}
      >
        {Array.from({ length: totalPages }).map((_, index) => (
          <SwiperSlide key={index}>
            <div className="space-y-4">
              {paginateGames(games, index + 1, pageSize).map((item) => (
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
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      {totalPages > 1 && (
        <div className="mt-2 flex w-full items-center justify-center">
          <input
            type="range"
            min={1}
            max={totalPages}
            value={currentPage}
            onChange={(e) => {
              const page = Number(e.target.value);
              onPageChange(page);
              if (swiperRef.current) {
                swiperRef.current.slideTo(page - 1);
              }
            }}
            className="w-3/4"
            style={{ accentColor: 'var(--primary-hover)', backgroundColor: 'var(--primary-muted)' }}
          />
          <span className="text-muted-foreground ml-2 text-sm">
            {currentPage}/{totalPages}
          </span>
        </div>
      )}
    </>
  );
}
