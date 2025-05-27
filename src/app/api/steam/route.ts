import { NextResponse } from 'next/server';
import { SteamAPI } from '@/api/steam';
import { API_ERROR_MESSAGES, HTTP_STATUS } from '@/api/config';

export async function GET() {
  try {
    const steamAPI = new SteamAPI();
    const stats = await steamAPI.getUserStats();
    return NextResponse.json(stats);
  } catch (error) {
    console.error('Steam API Error:', error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : API_ERROR_MESSAGES.UNKNOWN_ERROR,
        timestamp: new Date().toISOString(),
      },
      { status: HTTP_STATUS.INTERNAL_SERVER_ERROR }
    );
  }
}
