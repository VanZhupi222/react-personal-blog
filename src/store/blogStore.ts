import { create } from 'zustand';
import { request } from '@/api/axios';
import { Blog } from '@/lib/blog/types';
import { Locale } from '@/i18n/types';
import { parseBlogs } from '@/lib/blog/parser';

interface BlogState {
  blogs: Record<Locale, Blog[]>;
  loading: boolean;
  error: string | null;
  initialized: boolean;
  fetchBlogs: () => Promise<void>;
}

export const useBlogStore = create<BlogState>((set, get) => ({
  blogs: { en: [], zh: [] },
  loading: false,
  error: null,
  initialized: false,
  fetchBlogs: async () => {
    if (get().initialized) return;
    set({ loading: true, error: null });
    try {
      const res = await request.get<Blog[]>('/api/blog');
      const grouped = parseBlogs(res); // 按 language 分组
      set({ blogs: grouped, loading: false, initialized: true });
    } catch (err: any) {
      set({ error: err.message || 'Failed to fetch', loading: false });
    }
  },
}));
