import { create } from 'zustand';

interface AboutData {
  skills: {
    frontend: string[];
    backend: string[];
    devops: string[];
    tools: string[];
  };
  experiences: {
    title: string;
    company: string;
    period: string;
    description: string;
    achievements: string[];
  }[];
}

interface AboutStore {
  data: AboutData | null;
  loading: boolean;
  error: string | null;
  fetchAbout: () => Promise<void>;
}

export const useAboutStore = create<AboutStore>((set) => ({
  data: null,
  loading: false,
  error: null,
  fetchAbout: async () => {
    if (useAboutStore.getState().loading) return;
    if (useAboutStore.getState().data) return;

    set({ loading: true, error: null });
    try {
      const res = await fetch('/api/about');
      if (!res.ok) throw new Error('Failed to fetch about data');
      const data = await res.json();
      set({ data, loading: false });
    } catch (error: any) {
      set({ error: error.message || 'Unknown error', loading: false });
    }
  },
}));
