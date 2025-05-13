import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { Translations } from '@/i18n/types';
import { fetchTranslations } from '@/api/translations';
import en from '@/i18n/locales/en';
import zh from '@/i18n/locales/zh';

const defaultTranslations: Record<string, Translations> = {
  en,
  zh,
};

interface TranslationsState {
  locale: string;
  translations: Translations;
  setLocale: (locale: string) => void;
  fetchRemoteTranslations: (locale: string) => Promise<void>;
}

export const useTranslationsStore = create<TranslationsState>()(
  devtools(
    (set) => ({
      locale: 'en',
      translations: defaultTranslations.en,
      setLocale: (locale: string) => {
        set({
          locale,
          translations: defaultTranslations[locale] || defaultTranslations.en,
        }, false, 'translations/setLocale');
      },
      fetchRemoteTranslations: async (locale: string) => {
        try {
          const response = await fetchTranslations(locale);
          set({
            translations: response.translations,
          }, false, 'translations/fetchRemoteTranslations');
        } catch (error) {
          console.warn('Failed to fetch remote translations, using default:', error);
        }
      },
    }),
    {
      name: 'Translations Store',
      enabled: process.env.NODE_ENV === 'development'
    }
  )
); 