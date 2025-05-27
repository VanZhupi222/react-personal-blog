'use client';
import { useRef } from 'react';
import { useTranslationsStore } from '@/store/translations';
import type { Translations, Locale } from '@/i18n/types';
import { GlobalLoading } from '@/components/layout/GlobalLoading';
import { useTranslations } from '@/lib/hooks/useTranslations';

export function AppClientProvider({
  locale,
  translations,
  children,
}: {
  locale: Locale;
  translations: Translations | null;
  children: React.ReactNode;
}) {
  const { loading } = useTranslations();
  const hydrated = useRef(false);

  if (!hydrated.current && translations) {
    useTranslationsStore.setState({
      locale,
      translations,
      loaded: { [locale]: translations },
      loading: false,
      error: null,
    });
    hydrated.current = true;
  }

  return (
    <>
      {loading && <GlobalLoading />}
      {children}
    </>
  );
}
