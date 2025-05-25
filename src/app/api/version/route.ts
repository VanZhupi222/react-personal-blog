import { NextResponse } from 'next/server';
import { APP_VERSION } from '@/config/app';

export async function GET() {
  return NextResponse.json({ version: APP_VERSION });
}
