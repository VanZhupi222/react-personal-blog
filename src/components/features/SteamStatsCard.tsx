'use client';

import { useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Gamepad, Clock, User } from 'lucide-react';
import { Loader } from '@/components/ui/Loader';
import { useSteamStore } from '@/store/steam';
import { useTranslations } from '@/lib/hooks/useTranslations';

function formatPlaytime(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  if (hours < 1) {
    return `${minutes}m`;
  }
  return `${hours}h`;
}

export function SteamStatsCard() {
  const { t } = useTranslations();
  const { stats, loading, error, fetchStats } = useSteamStore();

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  return (
    <Card>
      <CardContent className="pt-6">
        {loading ? (
          <div className="flex min-h-[200px] items-center justify-center">
            <Loader size="lg" />
          </div>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : stats ? (
          <div className="space-y-6">
            {/* Profile Section */}
            <div className="flex items-center gap-4">
              <img
                src={stats.profile.avatarmedium}
                alt={stats.profile.personaname}
                className="h-12 w-12 rounded-full"
              />
              <div>
                <h3 className="font-semibold">{stats.profile.personaname}</h3>
                <p className="text-muted-foreground text-sm">
                  {stats.profile.personastate === 1 ? 'Online' : 'Offline'}
                </p>
              </div>
              <div className="ml-auto text-right">
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span className="text-sm">Total Playtime</span>
                </div>
                <p className="font-semibold">{formatPlaytime(stats.totalPlaytime)}</p>
              </div>
            </div>

            {/* Recent Games Section */}
            {stats.recentGames.length > 0 && (
              <div>
                <h4 className="mb-4 text-sm font-medium text-muted-foreground">Recent Games</h4>
                <div className="space-y-4">
                  {stats.recentGames.map((game) => (
                    <div key={game.appid} className="flex items-center gap-3">
                      <img
                        src={`https://media.steampowered.com/steamcommunity/public/images/apps/${game.appid}/${game.img_icon_url}.jpg`}
                        alt={game.name}
                        className="h-8 w-8"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-medium">{game.name}</p>
                        <p className="text-muted-foreground text-sm">
                          {formatPlaytime(game.playtime_2weeks || 0)} past 2 weeks
                        </p>
                      </div>
                      <p className="text-sm font-medium">
                        {formatPlaytime(game.playtime_forever)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <p className="text-muted-foreground">{t.home.activity.steam.placeholder}</p>
        )}
      </CardContent>
    </Card>
  );
}
