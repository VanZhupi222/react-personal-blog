'use client';

import { useEffect } from 'react';
import { useTranslationsStore } from '@/store/translations';
import { GlobalLoading } from '@/components/layout/GlobalLoading';
import { useTranslations } from '@/lib/hooks/useTranslations';
import { Locale } from '@/i18n/types';

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const { loading } = useTranslations();

  useEffect(() => {
    const store = useTranslationsStore.getState();
    if (!store.initialized) {
      let detectedLocale: Locale = 'en';
      if (typeof window !== 'undefined') {
        const savedLocale = localStorage.getItem('preferred_locale') as Locale;
        const browserLocale = navigator.language.startsWith('zh') ? 'zh' : 'en';
        detectedLocale = savedLocale || browserLocale;
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
