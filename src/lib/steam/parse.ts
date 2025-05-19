import type { SteamProfile, SteamGameStats } from './types';

export interface ParsedProfile {
  id: string;
  name: string;
  avatar: string;
  isOnline: boolean;
}

export function parseProfile(raw: SteamProfile): ParsedProfile {
  return {
    id: raw.steamid,
    name: raw.personaname,
    avatar: raw.avatarfull,
    isOnline: raw.personastate === 1,
  };
}

export interface ParsedGame {
  appid: number;
  name: string;
  playtime: number;
  icon: string;
  logo: string;
}

export function parseGameStats(raw: SteamGameStats): ParsedGame {
  return {
    appid: raw.appid,
    name: raw.name,
    playtime: raw.playtime_forever,
    icon: raw.img_icon_url,
    logo: raw.img_logo_url,
  };
}

export function parseGamesArray(rawArr: SteamGameStats[]): ParsedGame[] {
  return Array.isArray(rawArr) ? rawArr.map(parseGameStats) : [];
}
