import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { Translations, Locale } from '@/i18n/types';
import { request } from '@/api/axios';
import en from '@/i18n/locales/en';
import zh from '@/i18n/locales/zh';
import { API_ERRORS } from '@/lib/constants/errors';

interface TranslationsStoreState {
  locale: Locale;
  translations: Translations;
  initialized: boolean;
  loaded: Record<string, Translations | undefined>;
  loading: boolean;
  error: string | null;
  setLocale: (locale: Locale) => void;
  setLocaleWithFetch: (locale: Locale) => Promise<void>;
  initTranslations: (locale: Locale) => Promise<void>;
}

const defaultTranslations: Record<Locale, Translations> = { en, zh };

export const useTranslationsStore = create<TranslationsStoreState>()(
  devtools((set, get) => ({
    locale: 'en',
    translations: defaultTranslations.en,
    initialized: false,
    loaded: {},
    loading: false,
    setLocale: (locale: Locale) => {
      localStorage.setItem('preferred_locale', locale);
      const loaded = get().loaded;
      set({
        locale,
        translations: loaded[locale] || defaultTranslations[locale] || defaultTranslations.en,
        loading: false,
      });
    },
    setLocaleWithFetch: async (locale: Locale) => {
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
      set({ error: null, loading: true });
      try {
        const translations = await request.get<Translations>(`/api/i18n?lang=${locale}`);
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
          error: error instanceof Error ? error.message : API_ERRORS.MONGODB_ERROR,
        });
      }
    },
    initTranslations: async (locale: Locale) => {
      const { initialized } = get();
      if (initialized) return;
      set({ error: null, loading: true });
      try {
        const translations = await request.get<Translations>(`/api/i18n?lang=${locale}`);
        set((state) => ({
          translations,
          locale,
          loaded: { ...state.loaded, [locale]: translations },
          loading: false,
          initialized: true,
        }));
      } catch (error) {
        set({
          translations: defaultTranslations[locale] || defaultTranslations.en,
          locale,
          loading: false,
          error: error instanceof Error ? error.message : API_ERRORS.MONGODB_ERROR,
        });
      }
    },
  }))
);
