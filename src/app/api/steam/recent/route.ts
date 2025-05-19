import { NextResponse } from 'next/server';
import { steamAPI } from '@/api/steam';

export async function GET() {
  const games = await steamAPI.getRecentGames();
  return NextResponse.json(games);
}
