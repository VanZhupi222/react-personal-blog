'use client';

import { useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Gamepad } from 'lucide-react';
import { useSteamStore } from '@/store/steam';
import { useTranslations } from '@/lib/hooks/useTranslations';
import { RefreshButton } from '@/components/ui/RefreshButton';
import { SteamCardSkeleton } from './Skeleton';
import { ErrorFunc } from '@/components/features/Error';
import { ProfileSection } from './ProfileSection';
import { RecentGamesSection } from './RecentGamesSection';
import { AchievementsLink } from './AchievementsLink';

function formatPlaytime(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  if (hours < 1) {
    return `${minutes}m`;
  }
  return `${hours}h`;
}

export function SteamCard() {
  const { t } = useTranslations();
  const { profile, recentGames, ownedGamesLoading, fetchOwnedGames, totalPlaytime, error } =
    useSteamStore();

  useEffect(() => {
    if (!profile && !ownedGamesLoading) {
      console.log('fetching owned games');
      fetchOwnedGames();
    }
  }, [profile, fetchOwnedGames, ownedGamesLoading]);

  const handleGameClick = (appid: number) => {
    window.open(`https://steamcommunity.com/app/${appid}`, '_blank');
  };

  if (ownedGamesLoading) {
    return <SteamCardSkeleton />;
  }

  return (
    <Card className="bg-card text-card-foreground border-border border shadow-lg">
      <CardContent className="relative flex h-full min-h-[320px] flex-col pt-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-primary-foreground flex items-center gap-2 text-2xl font-bold">
            <Gamepad className="text-primary-foreground h-5 w-5" />
            {t.home.activity.steam.title}
          </h2>
          {!error && <RefreshButton onClick={fetchOwnedGames} isLoading={ownedGamesLoading} />}
        </div>
        {error && <ErrorFunc onRetry={fetchOwnedGames} />}
        {!error &&
          (profile ? (
            <div className="flex flex-1 flex-col space-y-6">
              <ProfileSection
                profile={profile}
                totalPlaytime={totalPlaytime}
                formatPlaytime={formatPlaytime}
                t={{
                  totalPlaytime: t.home.activity.steam.totalPlaytime,
                  online: t.home.activity.steam.online,
                  offline: t.home.activity.steam.offline,
                }}
              />
              <RecentGamesSection
                recentGames={recentGames}
                formatPlaytime={formatPlaytime}
                onGameClick={handleGameClick}
                t={{
                  recentGames: t.home.activity.steam.recentGames,
                }}
              />
              <AchievementsLink text={t.home.activity.steam.viewAchievements} />
            </div>
          ) : (
            <p className="text-muted-foreground">{t.home.activity.steam.placeholder}</p>
          ))}
      </CardContent>
    </Card>
  );
}
