import type { SteamGameStats, SteamProfile, SteamStats } from '@/lib/steam/types';

class SteamAPI {
  private readonly baseUrl = 'https://api.steampowered.com';
  private readonly apiKey: string;
  private readonly steamId: string;

  constructor() {
    const apiKey = process.env.NEXT_PUBLIC_STEAM_API_KEY;
    const steamId = process.env.NEXT_PUBLIC_STEAM_ID;

    console.log('Steam API Config:', {
      apiKey: apiKey ? '***' + apiKey.slice(-4) : undefined,
      steamId: steamId ? '***' + steamId.slice(-4) : undefined
    });

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

  async getUserStats(): Promise<SteamStats> {
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
    };
  }
}

export const steamAPI = new SteamAPI();
