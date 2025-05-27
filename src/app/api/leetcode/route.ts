import { NextResponse } from 'next/server';
import { request } from '@/api/axios';
import { API_CONFIG, API_ERROR_MESSAGES, HTTP_STATUS } from '@/api/config';
import type { NextRequest } from 'next/server';

export async function POST(requestObj: NextRequest) {
  try {
    const body = await requestObj.json();
    const data = await request.post(API_CONFIG.LEETCODE.BASE, body);
    return NextResponse.json(data);
  } catch (error) {
    console.error('LeetCode API Error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : API_ERROR_MESSAGES.SERVER_ERROR },
      { status: HTTP_STATUS.INTERNAL_SERVER_ERROR }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { error: API_ERROR_MESSAGES.FORBIDDEN },
    { status: HTTP_STATUS.FORBIDDEN }
  );
}

export async function PUT() {
  return NextResponse.json(
    { error: API_ERROR_MESSAGES.FORBIDDEN },
    { status: HTTP_STATUS.FORBIDDEN }
  );
}

export async function DELETE() {
  return NextResponse.json(
    { error: API_ERROR_MESSAGES.FORBIDDEN },
    { status: HTTP_STATUS.FORBIDDEN }
  );
}
