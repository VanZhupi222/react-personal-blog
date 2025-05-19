import { NextResponse } from 'next/server';
import type { SteamGameStats, SteamProfile, SteamStats, SteamAchievement, SteamAchievementSchema } from '@/lib/steam/types';

class SteamAPI {
  private readonly baseUrl = 'https://api.steampowered.com';
  private readonly apiKey: string;
  private readonly steamId: string;

  constructor() {
    const apiKey = process.env.STEAM_API_KEY;
    const steamId = process.env.STEAM_ID;

    console.log('apiKey', apiKey);
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
      throw new Error(`Steam API error: ${response.status} ${response.statusText}`);
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

    const profile = data.response.players[0];
    if (!profile) {
      throw new Error('Steam profile not found');
    }

    return profile;
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

  async getPlayerAchievements(appid: number): Promise<SteamAchievement[]> {
    const endpoint = `/ISteamUserStats/GetPlayerAchievements/v1/?key=${this.apiKey}&steamid=${this.steamId}&appid=${appid}&l=english`;
    try {
      const data = await this.fetchJson<{
        playerstats: {
          steamID: string;
          gameName: string;
          achievements: SteamAchievement[];
          success: boolean;
        };
      }>(endpoint);

      // 确保返回的成就数组中包含游戏名称
      const achievements = data.playerstats.achievements || [];
      return achievements.map(achievement => ({
        ...achievement,
        gameName: data.playerstats.gameName // 添加游戏名称
      }));
    } catch (error) {
      console.warn(`Failed to fetch achievements for app ${appid}:`, error);
      return [];
    }
  }

  async getGameSchema(appid: number): Promise<SteamAchievementSchema[]> {
    const endpoint = `/ISteamUserStats/GetSchemaForGame/v2/?key=${this.apiKey}&appid=${appid}&l=english`;
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

    // 获取所有游戏的成就信息
    const achievements: SteamStats['achievements'] = {};

    // 首先处理最近玩过的游戏
    const recentGameIds = new Set(recentGames.map(game => game.appid));
    await Promise.all(
      recentGames.map(async (game) => {
        try {
          const [playerAchievements, gameSchema] = await Promise.all([
            this.getPlayerAchievements(game.appid),
            this.getGameSchema(game.appid),
          ]);

          if (gameSchema.length > 0) {  // 移除 playerAchievements.length > 0 的检查
            const achieved = playerAchievements.filter(a => a.achieved === 1).length;
            achievements[game.appid] = {
              total: gameSchema.length,
              achieved,
              percentage: (achieved / gameSchema.length) * 100,
              gameName: game.name,
            };
            game.achievements = playerAchievements;
          }
        } catch (error) {
          console.warn(`Failed to process achievements for game ${game.appid}:`, error);
        }
      })
    );

    // 然后处理其他有游戏时间的游戏
    await Promise.all(
      ownedGames
        .filter(game => game.playtime_forever > 0 && !recentGameIds.has(game.appid))
        .map(async (game) => {
          try {
            const [playerAchievements, gameSchema] = await Promise.all([
              this.getPlayerAchievements(game.appid),
              this.getGameSchema(game.appid),
            ]);

            if (gameSchema.length > 0) {  // 移除 playerAchievements.length > 0 的检查
              const achieved = playerAchievements.filter(a => a.achieved === 1).length;
              achievements[game.appid] = {
                total: gameSchema.length,
                achieved,
                percentage: (achieved / gameSchema.length) * 100,
                gameName: game.name,
              };
            }
          } catch (error) {
            console.warn(`Failed to process achievements for game ${game.appid}:`, error);
          }
        })
    );

    // 确保至少返回一个空对象
    return {
      profile,
      recentGames,
      totalPlaytime,
      achievements: Object.keys(achievements).length > 0 ? achievements : {},
      ownedGames: ownedGames.filter(game => game.playtime_forever > 0),
    };
  }
}

export async function GET() {
  try {
    const steamAPI = new SteamAPI();
    const stats = await steamAPI.getUserStats();
    return NextResponse.json(stats);
  } catch (error) {
    console.error('Steam API Error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
