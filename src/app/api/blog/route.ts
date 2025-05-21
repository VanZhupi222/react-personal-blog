import { dbConnect } from '@/lib/db';
import Blog from '@/models/Blog';

export async function GET() {
  await dbConnect();
  const blogs = await Blog.find().sort({ date: -1 });
  return Response.json(blogs);
}
