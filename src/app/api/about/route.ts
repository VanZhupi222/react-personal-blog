import { dbConnect } from '@/lib/db';
import Skills from '@/models/Skills';
import Experiences from '@/models/Experiences';

export async function GET() {
  await dbConnect();

  const [skills, experiences] = await Promise.all([Skills.find(), Experiences.find()]);

  return Response.json({
    skills,
    experiences,
  });
}
