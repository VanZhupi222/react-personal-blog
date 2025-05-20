'use client';

import { useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Clock, ExternalLink, Trophy, Gamepad } from 'lucide-react';
import { Loader } from '@/components/ui/Loader';
import { useSteamStore } from '@/store/steam';
import { useTranslations } from '@/lib/hooks/useTranslations';
import Link from 'next/link';
import type { ParsedGame } from '@/lib/steam/parse';
import { RefreshButton } from '@/components/ui/RefreshButton';

function formatPlaytime(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  if (hours < 1) {
    return `${minutes}m`;
  }
  return `${hours}h`;
}

export function SteamCard() {
  const { t } = useTranslations();
  const { profile, recentGames, ownedGamesLoading, fetchOwnedGames, totalPlaytime } =
    useSteamStore();

  useEffect(() => {
    if (!profile) fetchOwnedGames();
  }, [profile, fetchOwnedGames]);

  const handleGameClick = (appid: number) => {
    window.open(`https://steamcommunity.com/app/${appid}`, '_blank');
  };

  return (
    <Card>
      <CardContent className="relative flex h-full min-h-[320px] flex-col pt-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="flex items-center gap-2 text-xl font-semibold">
            <Gamepad className="h-5 w-5" />
            {t.home.activity.steam.title}
          </h2>
          <RefreshButton onClick={fetchOwnedGames} isLoading={ownedGamesLoading} />
        </div>
        {ownedGamesLoading ? (
          <div className="flex min-h-[200px] items-center justify-center">
            <Loader size="lg" />
          </div>
        ) : profile ? (
          <div className="flex flex-1 flex-col space-y-6">
            {/* Profile Section */}
            <div className="flex items-center gap-4">
              <img
                src={profile.avatar}
                alt={profile.personaname}
                className="h-12 w-12 rounded-full"
              />
              <div>
                <h3 className="font-semibold">{profile.personaname}</h3>
                <p className="text-muted-foreground text-sm">
                  {profile.personastate === 1 ? 'Online' : 'Offline'}
                </p>
              </div>
              <div className="ml-auto text-right">
                <div className="text-muted-foreground flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span className="text-sm">Total Playtime</span>
                </div>
                <p className="font-semibold">{formatPlaytime(totalPlaytime)}</p>
              </div>
            </div>

            {/* Recent Games Section */}
            {recentGames.length > 0 && (
              <div>
                <h4 className="text-muted-foreground mb-4 text-sm font-medium">Recent Games</h4>
                <div className="space-y-4">
                  {recentGames.map((game: ParsedGame) => (
                    <div
                      key={game.appid}
                      className="hover:bg-muted/50 flex cursor-pointer items-center gap-3 rounded-lg p-2 transition-colors"
                      onClick={() => handleGameClick(game.appid)}
                    >
                      <img
                        src={`https://media.steampowered.com/steamcommunity/public/images/apps/${game.appid}/${game.logo}.jpg`}
                        alt={game.name}
                        className="h-10 w-auto max-w-[64px]"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = `https://media.steampowered.com/steamcommunity/public/images/apps/${game.appid}/${game.icon}.jpg`;
                        }}
                      />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1">
                          <p className="truncate font-medium">{game.name}</p>
                          <ExternalLink className="text-muted-foreground h-3 w-3" />
                        </div>
                      </div>
                      <p className="text-sm font-medium">{formatPlaytime(game.playtime)}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div className="mt-2 flex justify-center">
              <Link
                href="/achievements"
                className="bg-background text-muted-foreground hover:text-foreground flex items-center gap-1 rounded-full border px-4 py-2 shadow-md transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
              >
                <Trophy className="h-4 w-4" />
                <span className="text-sm">{t.home.activity.steam.viewAchievements}</span>
              </Link>
            </div>
          </div>
        ) : (
          <p className="text-muted-foreground">{t.home.activity.steam.placeholder}</p>
        )}
      </CardContent>
    </Card>
  );
}
