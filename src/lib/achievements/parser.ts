import type { ParsedGame } from '@/lib/steam/parser';

export const MIN_PLAYTIME_HOURS = 2;
export const ITEMS_PER_PAGE = 5;

export function filterGamesByPlaytime(
  games: ParsedGame[],
  minHours = MIN_PLAYTIME_HOURS
): ParsedGame[] {
  return games.filter((g) => g.playtime >= minHours * 60);
}

export function sortGamesByAchievementAndPlaytime(
  games: ParsedGame[],
  achievements: Record<number, { percentage?: number }>
): ParsedGame[] {
  return games.sort((a, b) => {
    const aAch = achievements[a.appid]?.percentage ?? 0;
    const bAch = achievements[b.appid]?.percentage ?? 0;
    if (bAch !== aAch) return bAch - aAch;
    if (b.playtime !== a.playtime) return b.playtime - a.playtime;
    return a.name.localeCompare(b.name);
  });
}

export function paginateGames(
  games: ParsedGame[],
  currentPage: number,
  itemsPerPage = ITEMS_PER_PAGE
): ParsedGame[] {
  const startIndex = (currentPage - 1) * itemsPerPage;
  return games.slice(startIndex, startIndex + itemsPerPage);
}
