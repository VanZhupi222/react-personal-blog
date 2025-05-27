import { Calendar, Clock } from 'lucide-react';
import Markdown from '@/components/features/Markdown';
import type { Blog } from '@/lib/blog/types';

export function BlogDetailContent({ blog }: { blog: Blog }) {
  return (
    <div className="bg-background flex min-h-[100dvh] justify-center px-2 py-8">
      <div className="bg-card dark:bg-card w-full max-w-3xl rounded-2xl p-6 shadow-xl sm:p-10">
        {/* 标题 */}
        <h1 className="text-foreground mb-2 text-center text-3xl leading-tight font-extrabold tracking-tight">
          {blog.title}
        </h1>
        {/* 元信息 */}
        <div className="text-muted-foreground mb-6 flex flex-wrap items-center justify-center gap-3 text-xs sm:text-sm">
          <span className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            {blog.date}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            {blog.readTime}
          </span>
        </div>
        {/* 描述 */}
        <div className="text-muted-foreground mb-8 text-center text-base">{blog.description}</div>
        {/* 分割线 */}
        <div className="border-border mb-8 border-b border-dashed" />
        {/* 正文 */}
        <article className="mx-auto max-w-none">
          <Markdown>{blog.content}</Markdown>
        </article>
      </div>
    </div>
  );
}
