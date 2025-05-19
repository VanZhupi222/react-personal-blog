import { NextResponse } from 'next/server';
import { steamAPI } from '@/api/steam';

export async function GET() {
  const profile = await steamAPI.getPlayerProfile();
  return NextResponse.json(profile);
}
