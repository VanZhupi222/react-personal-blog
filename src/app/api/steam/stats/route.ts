import { NextResponse } from 'next/server';
import { steamAPI } from '@/api/steam';

export async function GET() {
  const stats = await steamAPI.getUserStats();
  return NextResponse.json(stats);
}
