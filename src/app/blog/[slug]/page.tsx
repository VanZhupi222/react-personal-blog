import { notFound } from 'next/navigation';
import { getBlogBySlug, getAllBlogSlugs } from '@/lib/blog/server';
import { BlogDetailContent } from '@/components/blog/detailPage';
import { getServerLocale } from '@/lib/utils/getServerLocale';

// 标记为动态渲染
export const dynamic = 'force-dynamic';

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const slugs = await getAllBlogSlugs();
  return slugs.map(({ slug }) => ({ slug }));
}

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const locale = await getServerLocale();

  const blog = await getBlogBySlug(slug, locale);
  if (!blog) return notFound();
  return <BlogDetailContent blog={blog} />;
}
