import type {
  SteamGameStats,
  SteamProfile,
  SteamStats,
  SteamAchievement,
  SteamAchievementSchema,
} from '@/lib/steam/types';
import { request } from '@/api/axios';

export class SteamAPI {
  private readonly baseUrl = 'https://api.steampowered.com';
  private readonly apiKey: string;
  private readonly steamId: string;
  private readonly timeout = 15000; // 15 seconds timeout

  constructor() {
    const apiKey = process.env.STEAM_API_KEY;
    const steamId = process.env.STEAM_ID;

    if (!apiKey) {
      throw new Error('Steam API key is not configured');
    }

    if (!steamId) {
      throw new Error('Steam ID is not configured');
    }

    this.apiKey = apiKey;
    this.steamId = steamId;
  }

  async getPlayerProfile(): Promise<SteamProfile> {
    const endpoint = `/ISteamUser/GetPlayerSummaries/v2/?key=${this.apiKey}&steamids=${this.steamId}`;
    const data = await request.get<{
      response: {
        players: SteamProfile[];
      };
    }>(`${this.baseUrl}${endpoint}`, { timeout: this.timeout });

    const profile = data.response.players[0];
    if (!profile) {
      throw new Error('Steam profile not found');
    }

    return profile;
  }

  async getRecentGames(): Promise<SteamGameStats[]> {
    const endpoint = `/IPlayerService/GetRecentlyPlayedGames/v1/?key=${this.apiKey}&steamid=${this.steamId}&count=5`;
    const data = await request.get<{
      response: {
        total_count: number;
        games: SteamGameStats[];
      };
    }>(`${this.baseUrl}${endpoint}`, { timeout: this.timeout });

    return data.response.games || [];
  }

  async getOwnedGames(): Promise<SteamGameStats[]> {
    const endpoint = `/IPlayerService/GetOwnedGames/v1/?key=${this.apiKey}&steamid=${this.steamId}&include_appinfo=true&include_played_free_games=true`;
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
    const endpoint = `/ISteamUserStats/GetPlayerAchievements/v1/?key=${this.apiKey}&steamid=${this.steamId}&appid=${appid}&l=${lang}`;
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
      console.warn(`Failed to fetch achievements for app ${appid}:`, error);
      return [];
    }
  }

  async getGameSchema(appid: number, lang: string = 'english'): Promise<SteamAchievementSchema[]> {
    const endpoint = `/ISteamUserStats/GetSchemaForGame/v2/?key=${this.apiKey}&appid=${appid}&l=${lang}`;
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
      console.warn(`Failed to fetch schema for app ${appid}:`, error);
      return [];
    }
  }

  async getGlobalAchievementRarity(appid: number): Promise<Record<string, number>> {
    const endpoint = `/ISteamUserStats/GetGlobalAchievementPercentagesForApp/v2/?gameid=${appid}`;
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
      console.warn(`Failed to fetch global achievement rarity for app ${appid}:`, error);
      return {};
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
      console.error('Failed to get user stats:', error);
      throw error;
    }
  }
}
