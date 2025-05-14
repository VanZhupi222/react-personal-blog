import axios from 'axios';
import type { TranslationResponse } from '@/lib/translations/types';

class TranslationsAPI {
  private readonly baseURL = '/api/translations';

  async fetchTranslations(locale: string): Promise<TranslationResponse> {
    try {
      const { data } = await axios.get<TranslationResponse>(`${this.baseURL}/${locale}`);
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
