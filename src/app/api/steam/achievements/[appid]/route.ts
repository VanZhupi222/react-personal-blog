import { NextRequest, NextResponse } from 'next/server';
import { steamAPI } from '@/api/steam';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ appid: string }> }
) {
  try {
    const { appid } = await params;
    const appidNum = parseInt(appid, 10);
    if (isNaN(appidNum)) {
      return NextResponse.json({ error: 'Invalid appid' }, { status: 400 });
    }

    const url = new URL(request.url);
    const lang = url.searchParams.get('language') || 'english';

    const [playerAchievements, gameSchema] = await Promise.all([
      steamAPI.getPlayerAchievements(appidNum, lang),
      steamAPI.getGameSchema(appidNum, lang),
    ]);

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
