import { useEffect } from 'react';
import { useTranslationsStore } from '@/store/translations';

export function useTranslations() {
  const { locale, translations, setLocale, fetchRemoteTranslations } = useTranslationsStore();

  useEffect(() => {
    // 尝试从后端获取最新翻译
    fetchRemoteTranslations(locale);
  }, [locale, fetchRemoteTranslations]);

  return {
    t: translations,
    locale,
    setLocale,
  };
}
