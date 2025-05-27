import type {
  SteamGameStats,
  SteamProfile,
  SteamStats,
  SteamAchievement,
  SteamAchievementSchema,
} from '@/lib/steam/types';
import { request } from '@/api/axios';
import { API_CONFIG, API_TIMEOUT } from './config';
import { CONFIG_ERRORS, API_ERRORS } from '@/lib/constants/errors';

export class SteamAPI {
  private readonly baseUrl = API_CONFIG.STEAM.BASE;
  private readonly apiKey: string;
  private readonly steamId: string;
  private readonly timeout = API_TIMEOUT.LONG;

  constructor() {
    const apiKey = process.env.STEAM_API_KEY;
    const steamId = process.env.STEAM_ID;

    if (!apiKey) {
      throw new Error(CONFIG_ERRORS.STEAM_API_KEY_MISSING);
    }

    if (!steamId) {
      throw new Error(CONFIG_ERRORS.STEAM_ID_MISSING);
    }

    this.apiKey = apiKey;
    this.steamId = steamId;
  }

  async getPlayerProfile(): Promise<SteamProfile> {
    const endpoint = API_CONFIG.STEAM.ENDPOINTS.PLAYER_SUMMARIES(this.apiKey, this.steamId);
    const data = await request.get<{
      response: {
        players: SteamProfile[];
      };
    }>(`${this.baseUrl}${endpoint}`, { timeout: this.timeout });

    const profile = data.response.players[0];
    if (!profile) {
      throw new Error(API_ERRORS.STEAM_PROFILE_NOT_FOUND);
    }

    return profile;
  }

  async getRecentGames(): Promise<SteamGameStats[]> {
    const endpoint = API_CONFIG.STEAM.ENDPOINTS.RECENT_GAMES(this.apiKey, this.steamId);
    const data = await request.get<{
      response: {
        total_count: number;
        games: SteamGameStats[];
      };
    }>(`${this.baseUrl}${endpoint}`, { timeout: this.timeout });

    return data.response.games || [];
  }

  async getOwnedGames(): Promise<SteamGameStats[]> {
    const endpoint = API_CONFIG.STEAM.ENDPOINTS.OWNED_GAMES(this.apiKey, this.steamId);
    const data = await request.get<{
      response: {
        game_count: number;
        games: SteamGameStats[];
      };
    }>(`${this.baseUrl}${endpoint}`, { timeout: this.timeout });

    return data.response.games || [];
  }

  async getPlayerAchievements(
    appid: number,
    lang: string = 'english'
  ): Promise<SteamAchievement[]> {
    const endpoint = API_CONFIG.STEAM.ENDPOINTS.PLAYER_ACHIEVEMENTS(
      this.apiKey,
      this.steamId,
      appid,
      lang
    );
    try {
      const data = await request.get<{
        playerstats: {
          steamID: string;
          gameName: string;
          achievements: SteamAchievement[];
          success: boolean;
        };
      }>(`${this.baseUrl}${endpoint}`, { timeout: this.timeout });

      const achievements = data.playerstats.achievements || [];
      return achievements.map((achievement) => ({
        ...achievement,
        gameName: data.playerstats.gameName,
      }));
    } catch (error) {
      console.warn(`${API_ERRORS.STEAM_ACHIEVEMENTS_FETCH_FAILED} ${appid}:`, error);
      throw error;
    }
  }

  async getGameSchema(appid: number, lang: string = 'english'): Promise<SteamAchievementSchema[]> {
    const endpoint = API_CONFIG.STEAM.ENDPOINTS.GAME_SCHEMA(this.apiKey, appid, lang);
    try {
      const data = await request.get<{
        game: {
          availableGameStats: {
            achievements: SteamAchievementSchema[];
          };
        };
      }>(`${this.baseUrl}${endpoint}`, { timeout: this.timeout });
      return data.game.availableGameStats.achievements || [];
    } catch (error) {
      console.warn(`${API_ERRORS.STEAM_SCHEMA_FETCH_FAILED} ${appid}:`, error);
      throw error;
    }
  }

  async getGlobalAchievementRarity(appid: number): Promise<Record<string, number>> {
    const endpoint = API_CONFIG.STEAM.ENDPOINTS.GLOBAL_ACHIEVEMENTS(appid);
    try {
      const data = await request.get<{
        achievementpercentages: {
          achievements: { name: string; percent: number }[];
        };
      }>(`${this.baseUrl}${endpoint}`, { timeout: this.timeout });
      const result: Record<string, number> = {};
      data.achievementpercentages.achievements.forEach((a) => {
        result[a.name] = a.percent;
      });
      return result;
    } catch (error) {
      console.warn(`${API_ERRORS.STEAM_GLOBAL_ACHIEVEMENTS_FETCH_FAILED} ${appid}:`, error);
      throw error;
    }
  }

  async getUserStats(): Promise<SteamStats> {
    try {
      const [profile, recentGames, ownedGames] = await Promise.all([
        this.getPlayerProfile(),
        this.getRecentGames(),
        this.getOwnedGames(),
      ]);

      const totalPlaytime = ownedGames.reduce((total, game) => total + game.playtime_forever, 0);

      return {
        profile,
        recentGames,
        totalPlaytime,
        ownedGames: ownedGames.filter((game) => game.playtime_forever > 0),
      };
    } catch (error) {
      console.error(API_ERRORS.STEAM_USER_STATS_FETCH_FAILED + ':', error);
      throw error;
    }
  }
}
