export interface SteamGameStats {
  appid: number;
  name: string;
  playtime_forever: number; // in minutes
  playtime_2weeks?: number; // in minutes
  img_icon_url: string;
  img_logo_url: string;
}

export interface SteamProfile {
  steamid: string;
  personaname: string;
  profileurl: string;
  avatar: string;
  avatarmedium: string;
  avatarfull: string;
  personastate: number; // 0: Offline, 1: Online, 2: Busy, 3: Away, 4: Snooze, 5: Looking to trade, 6: Looking to play
  lastlogoff: number;
}

export interface SteamStats {
  profile: SteamProfile;
  recentGames: SteamGameStats[];
  totalPlaytime: number; // in minutes
}
