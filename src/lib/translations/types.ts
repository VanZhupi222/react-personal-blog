import { Translations } from '@/i18n/types';

export interface TranslationResponse {
  locale: string;
  translations: Translations;
  timestamp: number;
}

export interface TranslationsState {
  locale: string;
  translations: Translations;
  setLocale: (locale: string) => void;
  fetchRemoteTranslations: (locale: string) => Promise<void>;
}
