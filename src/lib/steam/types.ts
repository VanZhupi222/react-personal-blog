export interface SteamGameStats {
  appid: number;
  name: string;
  playtime_forever: number; // in minutes
  playtime_2weeks?: number; // in minutes
  img_icon_url: string;
  img_logo_url: string;
  achievements?: SteamAchievement[];
}

export interface SteamAchievement {
  apiname: string;
  achieved: number;
  unlocktime: number;
  name: string;
  description: string;
  gameName?: string;
}

export interface SteamAchievementSchema {
  name: string;
  defaultvalue: number;
  displayName: string;
  hidden: number;
  description: string;
  icon: string;
  icongray: string;
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
  ownedGames: SteamGameStats[];
  totalPlaytime: number; // in minutes
  achievements?: {
    [appid: string]: {
      total: number;
      achieved: number;
      percentage: number;
      gameName: string;
    };
  };
}
