'use client';

import { useEffect } from 'react';
import { useBlogStore } from '@/store/blogStore';
import { SkeletonBlogList } from '@/components/skeleton/SkeletonBlogList';
import { Calendar, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { PageHeader } from '@/components/layout/PageHeader';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { LazyMotion, domAnimation, m } from 'framer-motion';
import { useTranslations } from '@/lib/hooks/useTranslations';
import { ErrorFunc } from '@/components/features/Error';
import Link from 'next/link';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
  },
};

export function BlogListPage() {
  const { t, locale } = useTranslations();
  const { blogs, loading, error, fetchBlogs } = useBlogStore();

  useEffect(() => {
    if ((blogs[locale]?.length ?? 0) === 0) fetchBlogs();
  }, [fetchBlogs, blogs, locale]);

  return (
    <LazyMotion features={domAnimation}>
      <m.div
        className="min-h-[100dvh]"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="mx-auto w-full max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          {/* 标题始终在最上方 */}
          <m.div variants={itemVariants}>
            <PageHeader heading={t.blog.title} text={t.blog.description} />
          </m.div>
          {/* loading/error/blogs 渲染在下方 */}
          {loading && <SkeletonBlogList />}
          {error && <ErrorFunc onRetry={fetchBlogs} />}
          {!loading && !error && (
            <m.div className="mt-12 grid gap-6" variants={containerVariants}>
              {(blogs[locale] || []).map((blog, index) => (
                <m.div key={index} variants={itemVariants}>
                  <Card className="group hover:border-primary-hover transition-colors">
                    <CardHeader>
                      <CardTitle className="group-hover:text-primary-hover transition-colors hover:underline">
                        <Link href={`/blog/${blog.slug}`}>{blog.title || 'No Title'}</Link>
                      </CardTitle>
                    </CardHeader>

                    <div className="text-muted-foreground mb-4 flex items-center gap-4 px-6 text-sm">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {blog.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {blog.readTime}
                      </span>
                    </div>

                    <CardContent>
                      <p className="text-muted-foreground mb-4">{blog.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {blog.tags.map((tag) => (
                          <Badge key={tag} icon>
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </m.div>
              ))}
            </m.div>
          )}
        </div>
      </m.div>
    </LazyMotion>
  );
}
