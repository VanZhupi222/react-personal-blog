import axios from 'axios';
import type { Translations } from '@/i18n/types';

class TranslationsAPI {
  private readonly baseURL = '/api/i18n';

  async fetchTranslations(locale: string): Promise<Translations> {
    try {
      const { data } = await axios.get<Translations>(`${this.baseURL}?lang=${locale}`);
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(`Failed to fetch translations for locale ${locale}: ${error.message}`);
      }
      throw error;
    }
  }
}

export const translationsAPI = new TranslationsAPI();
