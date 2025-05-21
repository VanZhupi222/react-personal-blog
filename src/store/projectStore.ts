import { create } from 'zustand';
import { request } from '@/api/axios';

interface Project {
  _id: string;
  title: string;
  description: string;
  tags: string[];
  slug: string;
  highlights: string[];
}

interface ProjectState {
  projects: Project[];
  loading: boolean;
  error: string | null;
  initialized: boolean;
  fetchProjects: () => Promise<void>;
}

export const useProjectStore = create<ProjectState>((set, get) => ({
  projects: [],
  loading: false,
  error: null,
  initialized: false,
  fetchProjects: async () => {
    if (get().initialized) return;
    set({ loading: true, error: null });
    try {
      const res = await request.get<Project[]>('/api/projects');
      set({ projects: res, loading: false, initialized: true });
    } catch (err: any) {
      set({ error: err.message || 'Failed to fetch', loading: false, initialized: true });
    }
  },
}));
