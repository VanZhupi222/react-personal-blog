export interface AchievementGame {
  appid: number;
  name: string;
  playtime: number;
  icon: string;
  logo: string;
}

export interface AchievementStats {
  totalPlaytime: number;
  totalAchievements: number;
  achievedAchievements: number;
  achievementPercentage: number;
}
