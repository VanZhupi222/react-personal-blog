import { notFound } from 'next/navigation';
import { getBlogBySlug, getAllBlogSlugs } from '@/lib/blog/server';
import { BlogDetailContent } from '@/components/blog/detailPage';

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const slugs = await getAllBlogSlugs();
  return slugs.map(({ slug }) => ({ slug }));
}

interface BlogDetailPageProps {
  params: { slug: string };
}

export default async function BlogDetailPage(props: BlogDetailPageProps) {
  const { params } = await props;
  const blog = await getBlogBySlug(params.slug);
  if (!blog) return notFound();
  return <BlogDetailContent blog={blog} />;
}
