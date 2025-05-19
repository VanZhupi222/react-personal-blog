import { NextResponse } from 'next/server';
import { getOwnedGames } from '@/api/steam';

export async function GET() {
  const games = await getOwnedGames();
  return NextResponse.json(games);
}
