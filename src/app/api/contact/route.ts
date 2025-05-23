import { dbConnect } from '@/lib/db';
import Contact from '@/models/Contact';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  await dbConnect();
  const doc = await Contact.findOne();
  if (!doc) {
    return Response.json({ error: 'No contact info found' }, { status: 404 });
  }
  return Response.json(doc);
}
