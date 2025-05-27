import { create } from 'zustand';
import type { ContactData } from '@/lib/contact/types';
import { API_ERRORS } from '@/lib/constants/errors';

interface ContactStoreState {
  contact: ContactData | null;
  loading: boolean;
  error: string | null;
  fetchContact: () => Promise<void>;
}

export const useContactStore = create<ContactStoreState>((set) => ({
  contact: null,
  loading: false,
  error: null,
  fetchContact: async () => {
    set({ loading: true, error: null });
    try {
      const res = await fetch('/api/contact');
      if (!res.ok) throw new Error(API_ERRORS.MONGODB_ERROR);
      const data = await res.json();
      set({ contact: data, loading: false });
    } catch (e: unknown) {
      set({ error: e instanceof Error ? e.message : API_ERRORS.MONGODB_ERROR, loading: false });
    }
  },
}));
