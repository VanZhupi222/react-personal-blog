import { Card, CardContent } from '@/components/ui/Card';
import type { ParsedGame } from '@/lib/steam/parser';
import Image from 'next/image';

interface Translations {
  formatPlaytime: (playtime: number) => string;
}

interface AchievementsGameCardProps {
  item: ParsedGame;
  isHovered: boolean;
  isMobile?: boolean;
  t: Translations;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onClick?: () => void;
}

export function AchievementsGameCard({
  item,
  isHovered,
  isMobile = false,
  t,
  onMouseEnter,
  onMouseLeave,
  onClick,
}: AchievementsGameCardProps) {
  return (
    <Card
      className={`min-h-[138px] cursor-pointer transition-all duration-300 ${!isMobile && isHovered ? 'ring-primary bg-accent/80 scale-105 ring-2' : ''}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
    >
      <CardContent className="pt-6">
        <div className="flex items-start gap-4">
          <div className="relative h-16 w-32">
            <Image
              src={`https://cdn.cloudflare.steamstatic.com/steam/apps/${item.appid}/header.jpg`}
              alt={item.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="rounded-md object-cover object-center"
              priority={false}
            />
          </div>
          <div className="min-w-0 flex-1">
            <div className="mb-3 flex items-center gap-2">
              <h2 className="truncate text-lg font-semibold">{item.name}</h2>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-4">
                  <span className="text-muted-foreground">{t.formatPlaytime(item.playtime)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
