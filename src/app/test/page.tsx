'use client';

import { ErrorFunc } from '@/components/features/Error';

export default function TestPage() {
  return (
    <div className="bg-background flex min-h-screen items-center justify-center">
      <ErrorFunc message="This is a test error!" onRetry={() => alert('Retry!')} />
    </div>
  );
}
