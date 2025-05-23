import { create } from 'zustand';
import type { ContactData } from '@/lib/contact/types';

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
      if (!res.ok) throw new Error('Failed to fetch contact');
      const data = await res.json();
      set({ contact: data, loading: false });
    } catch (e: unknown) {
      set({ error: e instanceof Error ? e.message : String(e), loading: false });
    }
  },
}));
