import { Blog } from './types';
import { Locale } from '@/i18n/types';

export function parseBlogs(raw: Blog[]): Record<Locale, Blog[]> {
  const grouped: Record<Locale, Blog[]> = { en: [], zh: [] };
  for (const blog of raw) {
    if (blog.language === 'en') {
      grouped.en.push(blog);
    } else if (blog.language === 'zh') {
      grouped.zh.push(blog);
    }
  }
  return grouped;
}
