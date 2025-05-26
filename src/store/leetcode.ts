import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { request } from '@/api/axios';
import { parseLeetCodeStats } from '@/lib/leetcode/parser';
import { leetcodeQuery } from '@/lib/leetcode/queries';
import type { LeetCodeStats, LeetCodeResponse } from '@/lib/leetcode/types';

interface LeetCodeState {
  stats: LeetCodeStats | null;
  loading: boolean;
  error: string | null;
  username: string;

  // actions
  setUsername: (username: string) => void;
  fetchStats: () => Promise<void>;
  reset: () => void;
}

const initialState = {
  stats: null,
  loading: false,
  error: null,
  username: 'Zhupi222',
};

export const useLeetCodeStore = create<LeetCodeState>()(
  devtools(
    (set, get) => ({
      ...initialState,

      setUsername: (username: string) => {
        set({ username }, false, 'leetcode/setUsername');
        get().fetchStats();
      },

      fetchStats: async () => {
        try {
          set({ loading: true, error: null }, false, 'leetcode/fetchStats/pending');

          const username = get().username;
          const data = await request.post<{ data: LeetCodeResponse }>('/api/leetcode', {
            query: leetcodeQuery,
            variables: { username },
          });

          const stats = parseLeetCodeStats(data.data);
          set({ stats, loading: false }, false, 'leetcode/fetchStats/fulfilled');
        } catch (error) {
          const errorMessage =
            error instanceof Error ? error.message : 'Failed to fetch LeetCode stats';
          set(
            {
              error: errorMessage,
              loading: false,
            },
            false,
            'leetcode/fetchStats/rejected'
          );
        }
      },

      reset: () => {
        set(initialState, false, 'leetcode/reset');
      },
    }),
    {
      name: 'LeetCode Store',
      enabled: process.env.NODE_ENV === 'development',
    }
  )
);
