import { dbConnect } from '@/lib/db';
import Translation, { TranslationDoc } from '@/models/Translation';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  await dbConnect();
  const { searchParams } = new URL(req.url);
  const lang = searchParams.get('lang');
  if (!lang) {
    return Response.json({ error: 'Missing lang param' }, { status: 400 });
  }
  // 用 model 查询并类型断言
  const doc = (await Translation.findOne({})) as TranslationDoc | null;
  if (!doc || !doc[lang]) {
    return Response.json({ error: 'No translations found for this lang' }, { status: 404 });
  }
  return Response.json(doc[lang]);
}
