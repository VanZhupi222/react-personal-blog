import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { Translations } from '@/i18n/types';
import { translationsAPI } from '@/api/translations';
import en from '@/i18n/locales/en';
import zh from '@/i18n/locales/zh';

interface TranslationsStoreState {
  locale: string;
  translations: Translations;
  initialized: boolean;
  loaded: Record<string, Translations | undefined>;
  loading: boolean;
  setLocale: (locale: string) => void;
  setLocaleWithFetch: (locale: string) => Promise<void>;
  fetchRemoteTranslations: (locale: string) => Promise<void>;
  initTranslations: (locale: string) => Promise<void>;
}

const defaultTranslations: Record<string, Translations> = { en, zh };

export const useTranslationsStore = create<TranslationsStoreState>()(
  devtools((set, get) => ({
    locale: 'en',
    translations: defaultTranslations.en,
    initialized: false,
    loaded: {},
    loading: false,
    setLocale: (locale: string) => {
      localStorage.setItem('preferred_locale', locale);
      const loaded = get().loaded;
      set({
        locale,
        translations: loaded[locale] || defaultTranslations[locale] || defaultTranslations.en,
        loading: false,
      });
    },
    setLocaleWithFetch: async (locale: string) => {
      const loaded = get().loaded;
      if (loaded[locale]) {
        set({
          locale,
          translations: loaded[locale]!,
          loading: false,
        });
        localStorage.setItem('preferred_locale', locale);
        return;
      }
      set({ loading: true });
      try {
        const translations = await translationsAPI.fetchTranslations(locale);
        set((state) => ({
          locale,
          translations,
          loaded: { ...state.loaded, [locale]: translations },
          loading: false,
        }));
        localStorage.setItem('preferred_locale', locale);
      } catch (error) {
        set({
          locale,
          translations: defaultTranslations[locale] || defaultTranslations.en,
          loading: false,
        });
      }
    },
    fetchRemoteTranslations: async (locale: string) => {
      try {
        const translations = await translationsAPI.fetchTranslations(locale);
        set({ translations });
      } catch (error) {
        console.warn('Failed to fetch remote translations:', error);
      }
    },
    initTranslations: async (locale: string) => {
      const { initialized } = get();
      if (initialized) return;
      set({ initialized: true, loading: true });
      try {
        const translations = await translationsAPI.fetchTranslations(locale);
        set((state) => ({
          translations,
          locale,
          loaded: { ...state.loaded, [locale]: translations },
          loading: false,
        }));
      } catch (error) {
        set({
          translations: defaultTranslations[locale] || defaultTranslations.en,
          locale,
          loading: false,
        });
      }
    },
  }))
);
