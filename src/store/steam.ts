import { create } from 'zustand';
import type { SteamStats, SteamGameStats } from '@/lib/steam/types';
import type { ParsedGame } from '@/lib/steam/parse';
import { request } from '@/api/axios';

interface SteamState {
  profile: SteamStats['profile'] | null;
  recentGames: ParsedGame[];
  ownedGames: ParsedGame[];
  ownedGamesLoading: boolean;
  error: string | null;
  achievements: {
    [appid: string]: {
      total: number;
      achieved: number;
      percentage: number;
      gameName: string;
    };
  };
  totalPlaytime: number;
  fetchOwnedGames: () => Promise<void>;
}

export const useSteamStore = create<SteamState>((set) => ({
  profile: null,
  recentGames: [],
  ownedGames: [],
  ownedGamesLoading: false,
  error: null,
  achievements: {},
  totalPlaytime: 0,
  fetchOwnedGames: async () => {
    set({ ownedGamesLoading: true, error: null });
    try {
      const stats = await request.get('/api/steam/stats') as SteamStats;
      const ownedGames = stats.ownedGames.map((game: SteamGameStats) => ({
        appid: game.appid,
        name: game.name,
        playtime: game.playtime_forever,
        icon: game.img_icon_url,
        logo: game.img_logo_url,
      }));
      const totalPlaytime = ownedGames.reduce((sum, g) => sum + g.playtime, 0);
      set({
        profile: stats.profile,
        recentGames: stats.recentGames.map((game: SteamGameStats) => ({
          appid: game.appid,
          name: game.name,
          playtime: game.playtime_forever,
          icon: game.img_icon_url,
          logo: game.img_logo_url,
        })),
        ownedGames,
        achievements: stats.achievements || {},
        totalPlaytime,
        ownedGamesLoading: false,
        error: null,
      });
    } catch (error) {
      console.error('Failed to fetch Steam games:', error);
      set({
        ownedGamesLoading: false,
        error: 'Failed to load Steam data. Please try again later.'
      });
    }
  },
}));
