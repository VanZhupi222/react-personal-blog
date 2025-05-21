import { create } from 'zustand';
import { request } from '@/api/axios';

interface Blog {
  _id: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  tags: string[];
  slug: string;
}

interface BlogState {
  blogs: Blog[];
  loading: boolean;
  error: string | null;
  fetchBlogs: () => Promise<void>;
}

export const useBlogStore = create<BlogState>((set, get) => ({
  blogs: [],
  loading: false,
  error: null,
  fetchBlogs: async () => {
    if (get().blogs.length > 0) return;
    set({ loading: true, error: null });
    try {
      const res = await request.get<Blog[]>('/api/blog');
      set({ blogs: res, loading: false });
    } catch (err: any) {
      set({ error: err.message || 'Failed to fetch', loading: false });
    }
  },
}));
