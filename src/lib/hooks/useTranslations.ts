import { useTranslationsStore } from '@/store/translations';

export function useTranslations() {
  const { locale, loading, translations, setLocaleWithFetch } = useTranslationsStore();
  return {
    t: translations,
    locale,
    loading,
    setLocale: setLocaleWithFetch,
  };
}
