import { create } from 'zustand';
import { AboutData } from '@/lib/about/types';
import { parseAboutData } from '@/lib/about/parser';
import { API_ERRORS } from '@/lib/constants/errors';

interface AboutStore {
  data: AboutData | null;
  loading: boolean;
  error: string | null;
  language: 'en' | 'zh';
  setLanguage: (lang: 'en' | 'zh') => void;
  fetchAbout: () => Promise<void>;
}

export const useAboutStore = create<AboutStore>((set) => ({
  data: null,
  loading: false,
  error: null,
  language: 'en',
  setLanguage: (lang) => {
    set({ language: lang });
  },
  fetchAbout: async () => {
    if (useAboutStore.getState().loading) return;

    set({ loading: true, error: null });
    try {
      const res = await fetch('/api/about');
      if (!res.ok) throw new Error(API_ERRORS.MONGODB_ERROR);
      const rawData = await res.json();
      const parsedData = parseAboutData(rawData);
      set({ data: parsedData, loading: false });
    } catch (error: unknown) {
      set({
        error: error instanceof Error ? error.message : API_ERRORS.MONGODB_ERROR,
        loading: false,
      });
    }
  },
}));
