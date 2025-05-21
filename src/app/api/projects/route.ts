import { dbConnect } from '@/lib/db';
import Project from '@/models/Project';

export async function GET() {
  await dbConnect();
  const projects = await Project.find().sort({ title: 1 });
  return Response.json(projects);
}
