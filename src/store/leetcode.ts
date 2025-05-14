import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { leetcodeAPI } from '@/api/leetcode';
import type { LeetCodeStats } from '@/lib/leetcode/types';

interface LeetCodeState {
  // 状态
  stats: LeetCodeStats | null;
  loading: boolean;
  error: string | null;
  username: string;

  // actions
  setUsername: (username: string) => void;
  fetchStats: () => Promise<void>;
  retryFetch: () => Promise<void>;
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
        // 当用户名改变时自动获取数据
        get().fetchStats();
      },

      fetchStats: async () => {
        try {
          set({ loading: true, error: null }, false, 'leetcode/fetchStats/pending');

          const username = get().username;
          const stats = await leetcodeAPI.getUserStats(username);

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
          // 发生错误时自动重试
          get().retryFetch();
        }
      },

      retryFetch: async () => {
        await new Promise((resolve) => setTimeout(resolve, 3000)); // 等待3秒
        await get().fetchStats();
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
