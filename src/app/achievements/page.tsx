'use client';

import { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Trophy, ChevronLeft, ChevronRight, Clock, Medal, Gamepad2 } from 'lucide-react';
import { Loader } from '@/components/ui/Loader';
import { useSteamStore } from '@/store/steam';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import type { ParsedGame } from '@/lib/steam/parse';

const ITEMS_PER_PAGE = 5;
const MIN_PLAYTIME_HOURS = 2;

function formatPlaytime(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  if (hours < 1) {
    return `${minutes}m`;
  }
  return `${hours}h`;
}

function formatPercentage(value: number): string {
  return value.toFixed(1) + '%';
}

export default function AchievementsPage() {
  const { ownedGames, ownedGamesLoading, fetchOwnedGames, achievements } = useSteamStore();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (!ownedGames.length) fetchOwnedGames();
  }, [ownedGames.length, fetchOwnedGames]);

  if (ownedGamesLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader size="lg" />
      </div>
    );
  }

  // 只展示有一定游戏时长的游戏
  const filteredGames: ParsedGame[] = ownedGames.filter(g => g.playtime >= MIN_PLAYTIME_HOURS * 60);
  // 排序：优先成就百分比，其次游戏时长，最后首字母
  const sortedGames = filteredGames.sort((a, b) => {
    const aAch = achievements[a.appid]?.percentage ?? 0;
    const bAch = achievements[b.appid]?.percentage ?? 0;
    if (bAch !== aAch) return bAch - aAch;
    if (b.playtime !== a.playtime) return b.playtime - a.playtime;
    return a.name.localeCompare(b.name);
  });

  const totalPages = Math.ceil(sortedGames.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = sortedGames.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // 统计总时长和成就
  const totalPlaytime = sortedGames.reduce((sum, game) => sum + game.playtime, 0);
  const totalAchievements = Object.values(achievements).reduce((sum, game) => sum + game.total, 0);
  const achievedAchievements = Object.values(achievements).reduce((sum, game) => sum + game.achieved, 0);
  const achievementPercentage = totalAchievements > 0 ? (achievedAchievements / totalAchievements) * 100 : 0;

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Achievement Progress</h1>
      <div className="grid grid-cols-3 gap-4 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Trophy className="h-4 w-4 text-yellow-500" />
              Total Games
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{sortedGames.length}</div>
            <p className="text-xs text-muted-foreground">
              with &gt;= {MIN_PLAYTIME_HOURS}h playtime
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Medal className="h-4 w-4 text-yellow-500" />
              Total Playtime
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatPlaytime(totalPlaytime)}</div>
            <p className="text-xs text-muted-foreground">
              across all games
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Gamepad2 className="h-4 w-4 text-blue-500" />
              Achievements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{achievedAchievements}/{totalAchievements}</div>
            <p className="text-xs text-muted-foreground">
              {formatPercentage(achievementPercentage)} completed
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4 mb-6">
        {currentItems.map((item) => {
          const gameAchievements = achievements[item.appid];
          return (
            <Card key={item.appid}>
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <img
                    src={`https://media.steampowered.com/steamcommunity/public/images/apps/${item.appid}/${item.logo}.jpg`}
                    alt={item.name}
                    className="h-16 w-16 min-w-16 min-h-16 rounded-md bg-gray-100 object-cover"
                    onError={e => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = `https://media.steampowered.com/steamcommunity/public/images/apps/${item.appid}/${item.icon}.jpg`;
                    }}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-3">
                      <h2 className="font-semibold truncate text-lg">{item.name}</h2>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-4">
                          <span className="text-muted-foreground">
                            {formatPlaytime(item.playtime)}
                          </span>
                          {gameAchievements && (
                            <span className="text-muted-foreground">
                              {gameAchievements.achieved}/{gameAchievements.total} achievements
                            </span>
                          )}
                        </div>
                      </div>
                      {gameAchievements && (
                        <Progress value={gameAchievements.percentage} className="h-2" />
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
