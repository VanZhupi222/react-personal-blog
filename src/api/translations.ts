import { Translations } from '@/i18n/types';

export interface TranslationResponse {
  locale: string;
  translations: Translations;
  timestamp: number;
}

export async function fetchTranslations(locale: string): Promise<TranslationResponse> {
  const response = await fetch(`/api/translations/${locale}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch translations for locale: ${locale}`);
  }
  return response.json();
} 