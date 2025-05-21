import { dbConnect } from '@/lib/db';
import About from '@/models/About';

export async function GET() {
  await dbConnect();
  const about = await About.findOne();
  return Response.json(about);
}
