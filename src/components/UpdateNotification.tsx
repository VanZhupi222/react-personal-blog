'use client';

import { useRef, useEffect } from 'react';
import useSWR from 'swr';
import { showToast } from '@/components/features/Toast';
import { useTranslations } from '@/lib/hooks/useTranslations';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function UpdateNotification() {
  const { t, locale, loading } = useTranslations();
  const hasShown = useRef(false);

  // 使用SWR获取版本信息
  const { data } = useSWR('/api/version', fetcher, {
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
    refreshInterval: 5 * 60 * 1000, // 5min
  });

  useEffect(() => {
    if (loading) return;

    const lastVersion = localStorage.getItem('app-version');

    if (data?.version && lastVersion !== data.version && !hasShown.current) {
      localStorage.setItem('app-version', data.version);
      hasShown.current = true;
      showToast({
        title: t.common.update.title,
        message: t.common.update.message,
        actionLabel: t.common.update.refresh,
        onAction: () => window.location.reload(),
      });
    }
  }, [
    data,
    locale,
    loading,
    t.common.update.title,
    t.common.update.message,
    t.common.update.refresh,
  ]);

  return null;
}
