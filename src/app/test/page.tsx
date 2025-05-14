'use client';

import { useEffect, useState } from 'react';
import { leetcodeAPI } from '@/api/leetcode';
import type { LeetCodeStats } from '@/lib/leetcode/types';

export default function TestPage() {
  const [data, setData] = useState<LeetCodeStats | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const stats = await leetcodeAPI.getUserStats('Zhupi222');
        console.log('LeetCode Stats:', stats);
        setData(stats);
      } catch (err) {
        const error = err as Error;
        console.error('Error:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return <div className="p-4">Loading...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="p-4">
      <h1 className="mb-4 text-2xl font-bold">LeetCode API Test</h1>
      <pre className="bg-muted overflow-auto rounded-lg p-4">{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
