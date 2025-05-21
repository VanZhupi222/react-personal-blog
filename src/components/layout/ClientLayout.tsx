'use client';

import { useEffect } from 'react';
import { useTranslationsStore } from '@/store/translations';
import { GlobalLoading } from '@/components/layout/GlobalLoading';
import { useTranslations } from '@/lib/hooks/useTranslations';

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const { loading } = useTranslations();

  useEffect(() => {
    const store = useTranslationsStore.getState();
    if (!store.initialized) {
      let detectedLocale = 'en';
      if (typeof window !== 'undefined') {
        detectedLocale =
          localStorage.getItem('preferred_locale') ||
          (navigator.language.startsWith('zh') ? 'zh' : 'en');
      }
      store.initTranslations(detectedLocale);
    }
  }, []);

  return (
    <>
      {loading && <GlobalLoading />}
      {children}
    </>
  );
}
