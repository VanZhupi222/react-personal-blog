import type {
  SteamGameStats,
  SteamProfile,
  SteamStats,
  SteamAchievement,
  SteamAchievementSchema,
} from '@/lib/steam/types';

class SteamAPI {
  private readonly baseUrl = 'https://api.steampowered.com';
  private readonly apiKey: string;
  private readonly steamId: string;

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

  private async fetchJson<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`);
    if (!response.ok) {
      throw new Error(`Steam API error: ${response.statusText}`);
    }
    return response.json();
  }

  async getPlayerProfile(): Promise<SteamProfile> {
    const endpoint = `/ISteamUser/GetPlayerSummaries/v2/?key=${this.apiKey}&steamids=${this.steamId}`;
    const data = await this.fetchJson<{
      response: {
        players: SteamProfile[];
      };
    }>(endpoint);
    return data.response.players[0];
  }

  async getRecentGames(): Promise<SteamGameStats[]> {
    const endpoint = `/IPlayerService/GetRecentlyPlayedGames/v1/?key=${this.apiKey}&steamid=${this.steamId}&count=5`;
    const data = await this.fetchJson<{
      response: {
        total_count: number;
        games: SteamGameStats[];
      };
    }>(endpoint);
    return data.response.games || [];
  }

  async getOwnedGames(): Promise<SteamGameStats[]> {
    const endpoint = `/IPlayerService/GetOwnedGames/v1/?key=${this.apiKey}&steamid=${this.steamId}&include_appinfo=true&include_played_free_games=true`;
    const data = await this.fetchJson<{
      response: {
        game_count: number;
        games: SteamGameStats[];
      };
    }>(endpoint);
    return data.response.games || [];
  }

  async getPlayerAchievements(
    appid: number,
    lang: string = 'english'
  ): Promise<SteamAchievement[]> {
    const endpoint = `/ISteamUserStats/GetPlayerAchievements/v1/?key=${this.apiKey}&steamid=${this.steamId}&appid=${appid}&l=${lang}`;
    try {
      const data = await this.fetchJson<{
        playerstats: {
          steamID: string;
          gameName: string;
          achievements: SteamAchievement[];
          success: boolean;
        };
      }>(endpoint);
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
      const data = await this.fetchJson<{
        game: {
          availableGameStats: {
            achievements: SteamAchievementSchema[];
          };
        };
      }>(endpoint);
      return data.game.availableGameStats.achievements || [];
    } catch (error) {
      console.warn(`Failed to fetch schema for app ${appid}:`, error);
      return [];
    }
  }

  async getUserStats(): Promise<SteamStats> {
    const [profile, recentGames, ownedGames] = await Promise.all([
      this.getPlayerProfile(),
      this.getRecentGames(),
      this.getOwnedGames(),
    ]);

    const totalPlaytime = ownedGames.reduce((total, game) => total + game.playtime_forever, 0);

    // 只统计成就总数，不请求具体成就内容
    const achievements: SteamStats['achievements'] = {};
    await Promise.all(
      ownedGames
        .filter((game) => game.playtime_forever > 0)
        .map(async (game) => {
          try {
            const gameSchema = await this.getGameSchema(game.appid);
            if (gameSchema.length > 0) {
              achievements[game.appid] = {
                total: gameSchema.length,
                gameName: game.name,
              };
            }
          } catch (error) {
            console.warn(`Failed to process achievements for game ${game.appid}:`, error);
          }
        })
    );

    return {
      profile,
      recentGames,
      totalPlaytime,
      achievements,
      ownedGames: ownedGames.filter((game) => game.playtime_forever > 0),
    };
  }

  /**
   * 获取全局成就稀有度
   * https://partner.steamgames.com/doc/webapi/ISteamUserStats#GetGlobalAchievementPercentagesForApp
   */
  async getGlobalAchievementPercentagesForApp(
    appid: number
  ): Promise<{ name: string; percent: number }[]> {
    const endpoint = `/ISteamUserStats/GetGlobalAchievementPercentagesForApp/v1/?gameid=${appid}`;
    try {
      const data = await this.fetchJson<{
        achievementpercentages: {
          achievements: { name: string; percent: number }[];
        };
      }>(endpoint);
      return data.achievementpercentages.achievements || [];
    } catch (error) {
      console.warn(`Failed to fetch global achievement percentages for app ${appid}:`, error);
      return [];
    }
  }
}

export const steamAPI = new SteamAPI();
export const getOwnedGames = () => steamAPI.getOwnedGames();
