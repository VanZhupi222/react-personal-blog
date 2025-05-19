'use client';

import { useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Clock, ExternalLink, Trophy } from 'lucide-react';
import { Loader } from '@/components/ui/Loader';
import { useSteamStore } from '@/store/steam';
import { useTranslations } from '@/lib/hooks/useTranslations';
import Link from 'next/link';
import type { ParsedGame } from '@/lib/steam/parse';

function formatPlaytime(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  if (hours < 1) {
    return `${minutes}m`;
  }
  return `${hours}h`;
}

export function SteamStatsCard() {
  const { t } = useTranslations();
  const { profile, recentGames, ownedGamesLoading, fetchOwnedGames, totalPlaytime } = useSteamStore();

  useEffect(() => {
    if (!profile) fetchOwnedGames();
  }, [profile, fetchOwnedGames]);

  const handleGameClick = (appid: number) => {
    window.open(`https://steamcommunity.com/app/${appid}`, '_blank');
  };

  return (
    <Card>
      <CardContent className="pt-6 flex flex-col h-full min-h-[320px]">
        {ownedGamesLoading ? (
          <div className="flex min-h-[200px] items-center justify-center">
            <Loader size="lg" />
          </div>
        ) : profile ? (
          <div className="flex flex-col flex-1 space-y-6">
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
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span className="text-sm">Total Playtime</span>
                </div>
                <p className="font-semibold">{formatPlaytime(totalPlaytime)}</p>
              </div>
            </div>

            {/* Recent Games Section */}
            {recentGames.length > 0 && (
              <div>
                <h4 className="mb-4 text-sm font-medium text-muted-foreground">Recent Games</h4>
                <div className="space-y-4">
                  {recentGames.map((game: ParsedGame) => (
                    <div
                      key={game.appid}
                      className="flex items-center gap-3 cursor-pointer hover:bg-muted/50 p-2 rounded-lg transition-colors"
                      onClick={() => handleGameClick(game.appid)}
                    >
                      <img
                        src={`https://media.steampowered.com/steamcommunity/public/images/apps/${game.appid}/${game.logo}.jpg`}
                        alt={game.name}
                        className="h-10 w-auto max-w-[64px]"
                        onError={e => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = `https://media.steampowered.com/steamcommunity/public/images/apps/${game.appid}/${game.icon}.jpg`;
                        }}
                      />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1">
                          <p className="truncate font-medium">{game.name}</p>
                          <ExternalLink className="h-3 w-3 text-muted-foreground" />
                        </div>
                      </div>
                      <p className="text-sm font-medium">
                        {formatPlaytime(game.playtime)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div className="flex-1" />
            <Link
              href="/achievements"
              className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors mt-6 self-end"
            >
              <Trophy className="h-4 w-4" />
              <span className="text-sm">View Achievements</span>
            </Link>
          </div>
        ) : (
          <p className="text-muted-foreground">{t.home.activity.steam.placeholder}</p>
        )}
      </CardContent>
    </Card>
  );
}
