import { create } from 'zustand';
import { request } from '@/api/axios';
import { Project } from '@/lib/project/types';
import { Locale } from '@/i18n/types';
import { parseProjects } from '@/lib/project/parser';

interface ProjectState {
  projects: Record<Locale, Project[]>;
  loading: boolean;
  error: string | null;
  initialized: boolean;
  fetchProjects: () => Promise<void>;
}

export const useProjectStore = create<ProjectState>((set, get) => ({
  projects: { en: [], zh: [] },
  loading: false,
  error: null,
  initialized: false,
  fetchProjects: async () => {
    if (get().initialized) return;
    set({ loading: true, error: null });
    try {
      const res = await request.get<Project[]>('/api/projects');
      const grouped = parseProjects(res);
      set({ projects: grouped, loading: false, initialized: true });
    } catch (err: any) {
      set({ error: err.message || 'Failed to fetch', loading: false });
    }
  },
}));
