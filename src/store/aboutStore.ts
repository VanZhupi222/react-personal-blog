import { create } from 'zustand';
import { AboutData } from '@/lib/about/types';
import { parseAboutData } from '@/lib/about/parser';

interface Skills {
  frontend: string[];
  backend: string[];
  devops: string[];
  tools: string[];
}

interface Experience {
  title: string;
  company: string;
  period: string;
  description: string;
  achievements: string[];
}

interface AboutData {
  skills: {
    en: Skills | null;
    zh: Skills | null;
  };
  experiences: {
    en: Experience[] | null;
    zh: Experience[] | null;
  };
}

interface AboutStore {
  data: AboutData | null;
  loading: boolean;
  error: string | null;
  language: 'en' | 'zh';
  setLanguage: (lang: 'en' | 'zh') => void;
  fetchAbout: () => Promise<void>;
}

const parseData = (rawData: any): AboutData => {
  const skills = {
    en: null,
    zh: null,
  };
  const experiences = {
    en: null,
    zh: null,
  };

  // 处理技能数据
  rawData.skills.forEach((item: any) => {
    if (item.language === 'en') {
      skills.en = item.skills;
    } else if (item.language === 'zh') {
      skills.zh = item.skills;
    }
  });

  // 处理经验数据
  rawData.experiences.forEach((item: any) => {
    if (item.language === 'en') {
      experiences.en = item.experiences;
    } else if (item.language === 'zh') {
      experiences.zh = item.experiences;
    }
  });

  return { skills, experiences };
};

export const useAboutStore = create<AboutStore>((set, get) => ({
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
      if (!res.ok) throw new Error('Failed to fetch about data');
      const rawData = await res.json();
      const parsedData = parseAboutData(rawData);
      set({ data: parsedData, loading: false });
    } catch (error: any) {
      set({ error: error.message || 'Unknown error', loading: false });
    }
  },
}));
