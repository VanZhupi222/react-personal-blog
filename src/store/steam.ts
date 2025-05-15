import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { SteamStats } from '@/lib/steam/types';

interface SteamState {
  // 状态
  stats: SteamStats | null;
  loading: boolean;
  error: string | null;

  // actions
  fetchStats: () => Promise<void>;
  retryFetch: () => Promise<void>;
  reset: () => void;
}

const initialState = {
  stats: null,
  loading: false,
  error: null,
};

export const useSteamStore = create<SteamState>()(
  devtools(
    (set, get) => ({
      ...initialState,

      fetchStats: async () => {
        try {
          set({ loading: true, error: null }, false, 'steam/fetchStats/pending');

          const response = await fetch('/api/steam');
          const data = await response.json();

          if (!response.ok) {
            throw new Error(data.error || 'Failed to fetch Steam stats');
          }

          set({ stats: data, loading: false }, false, 'steam/fetchStats/fulfilled');
        } catch (error) {
          const errorMessage =
            error instanceof Error ? error.message : 'Failed to fetch Steam stats';
          set(
            {
              error: errorMessage,
              loading: false,
            },
            false,
            'steam/fetchStats/rejected'
          );
          // 发生错误时自动重试
          get().retryFetch();
        }
      },

      retryFetch: async () => {
        await new Promise((resolve) => setTimeout(resolve, 3000)); // 等待3秒
        await get().fetchStats();
      },

      reset: () => {
        set(initialState, false, 'steam/reset');
      },
    }),
    {
      name: 'Steam Store',
      enabled: process.env.NODE_ENV === 'development',
    }
  )
);
