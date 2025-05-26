import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { request } from '@/api/axios';

export async function POST(requestObj: NextRequest) {
  try {
    const body = await requestObj.json();
    const data = await request.post('https://leetcode.com/graphql', body);
    return NextResponse.json(data);
  } catch (error) {
    console.error('LeetCode API Error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch LeetCode data' },
      { status: 500 }
    );
  }
}

// 只允许 POST 方法，其他方法返回 405
export async function GET() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}

export async function PUT() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}

export async function DELETE() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}
