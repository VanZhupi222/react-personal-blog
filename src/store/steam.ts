import { create } from 'zustand';
import type { SteamStats, AchievementDetail } from '@/lib/steam/types';
import type { ParsedGame } from '@/lib/steam/parser';
import { request } from '@/api/axios';
import { parseGamesArray, sortGamesByPlaytime } from '@/lib/steam/parser';
import { useTranslationsStore } from '@/store/translations';
import { sortAchievementsByStatusAndRarity } from '@/lib/achievements/parser';

interface SteamState {
  profile: SteamStats['profile'] | null;
  recentGames: ParsedGame[];
  ownedGames: ParsedGame[];
  ownedGamesLoading: boolean;
  error: string | null;
  totalPlaytime: number;
  fetchOwnedGames: () => Promise<void>;
  achievementDetail: { [appid_locale: string]: AchievementDetail[] };
  achievementDetailLoading: boolean;
  achievementDetailError: string | null;
  fetchAchievementDetail: (appid: number) => Promise<void>;
}

export const useSteamStore = create<SteamState>((set, get) => ({
  profile: null,
  recentGames: [],
  ownedGames: [],
  ownedGamesLoading: false,
  totalPlaytime: 0,
  error: null,
  achievementDetail: {},
  achievementDetailLoading: false,
  achievementDetailError: null,
  fetchOwnedGames: async () => {
    set({ ownedGamesLoading: true, error: null });
    try {
      const stats = (await request.get('/api/steam')) as SteamStats;
      set({
        profile: stats.profile,
        recentGames: sortGamesByPlaytime(parseGamesArray(stats.recentGames)),
        ownedGames: sortGamesByPlaytime(parseGamesArray(stats.ownedGames)),
        totalPlaytime: stats.totalPlaytime,
        ownedGamesLoading: false,
      });
    } catch (error: unknown) {
      set({
        ownedGamesLoading: false,
        error: error instanceof Error ? error.message : 'Failed to fetch Steam games',
      });
    }
  },
  fetchAchievementDetail: async (appid: number) => {
    set({ achievementDetailLoading: true, achievementDetailError: null });
    try {
      const locale = useTranslationsStore.getState().locale || 'en';
      const steamLangMap: Record<string, string> = {
        en: 'english',
        zh: 'schinese',
      };
      const steamLang = steamLangMap[locale] || 'english';
      const cacheKey = `${appid}_${locale}`;
      const achievementDetail = get().achievementDetail;
      if (achievementDetail[cacheKey]) {
        set({ achievementDetailLoading: false });
        return;
      }
      const data = (await request.get(
        `/api/steam/achievements/${appid}?language=${steamLang}`
      )) as AchievementDetail[];
      set({
        achievementDetail: {
          ...achievementDetail,
          [cacheKey]: sortAchievementsByStatusAndRarity(data),
        },
        achievementDetailLoading: false,
      });
    } catch (error: unknown) {
      set({
        achievementDetailLoading: false,
        achievementDetailError:
          error instanceof Error ? error.message : 'Error fetching achievements',
      });
    }
  },
}));
