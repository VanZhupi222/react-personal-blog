import { NextResponse } from 'next/server';
import { SteamAPI } from '@/api/steam';

export async function GET() {
  try {
    const steamAPI = new SteamAPI();
    const stats = await steamAPI.getUserStats();
    return NextResponse.json(stats);
  } catch (error) {
    console.error('Steam API Error:', error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}
