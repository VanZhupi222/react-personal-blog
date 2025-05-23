import { dbConnect } from '@/lib/db';
import Contact from '@/models/Contact';

export async function GET() {
  await dbConnect();
  const doc = await Contact.findOne();
  if (!doc) {
    return Response.json({ error: 'No contact info found' }, { status: 404 });
  }
  return Response.json(doc);
}
