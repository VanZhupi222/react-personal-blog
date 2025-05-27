import { dbConnect } from '@/lib/db';
import BlogModel from '@/models/Blog';
import type { Blog } from './types';
import { Locale } from '@/i18n/types';

export async function getBlogBySlug(slug: string, locale?: Locale): Promise<Blog | null> {
  await dbConnect();
  const query = locale ? { slug, language: locale } : { slug };
  return (await BlogModel.findOne(query).lean()) as Blog | null;
}

export async function getAllBlogSlugs() {
  await dbConnect();
  const blogs = await BlogModel.find({}, { slug: 1, _id: 0 }).lean();
  return blogs.map((b) => ({ slug: b.slug as string }));
}
