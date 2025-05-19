'use client';

import { useEffect, useState } from 'react';
import type { SteamStats } from '@/lib/steam/types';

export default function TestPage() {
  const [data, setData] = useState<SteamStats | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const response = await fetch('/api/steam');
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Failed to fetch Steam stats');
        }

        console.log('Steam Stats:', data);
        setData(data);
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
      <h1 className="mb-4 text-2xl font-bold">Steam API Test</h1>

      {data && (
        <div className="space-y-8">
          <div>
            <h2 className="mb-2 text-xl font-semibold">Profile</h2>
            <pre className="bg-muted overflow-auto rounded-lg p-4">
              {JSON.stringify(data.profile, null, 2)}
            </pre>
          </div>

          <div>
            <h2 className="mb-2 text-xl font-semibold">Recent Games</h2>
            <pre className="bg-muted overflow-auto rounded-lg p-4">
              {JSON.stringify(data.recentGames, null, 2)}
            </pre>
          </div>

          <div>
            <h2 className="mb-2 text-xl font-semibold">Total Playtime</h2>
            <pre className="bg-muted overflow-auto rounded-lg p-4">
              {Math.round(data.totalPlaytime / 60)} hours
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}
