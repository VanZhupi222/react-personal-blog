import { NextResponse } from 'next/server';
import { steamAPI } from '@/api/steam';

export async function GET(request: Request, { params }: { params: { appid: string } }) {
  try {
    const appid = parseInt(params?.appid, 10);
    if (isNaN(appid)) {
      return NextResponse.json({ error: 'Invalid appid' }, { status: 400 });
    }

    // 获取语言参数
    const url = new URL(request.url);
    const lang = url.searchParams.get('language') || 'english';

    const [playerAchievements, gameSchema] = await Promise.all([
      steamAPI.getPlayerAchievements(appid, lang),
      steamAPI.getGameSchema(appid, lang),
    ]);

    // 合并玩家成就和游戏成就信息
    const achievements = gameSchema.map((schema) => {
      const playerAchievement = playerAchievements.find((pa) => pa.apiname === schema.name);

      return {
        ...schema,
        achieved: playerAchievement?.achieved || 0,
        unlocktime: playerAchievement?.unlocktime || 0,
      };
    });

    return NextResponse.json(achievements);
  } catch (error) {
    console.error('Failed to fetch achievements:', error);
    return NextResponse.json({ error: 'Failed to fetch achievements' }, { status: 500 });
  }
}
