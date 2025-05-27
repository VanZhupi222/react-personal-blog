import { cookies, headers } from 'next/headers';
import type { Locale } from '@/i18n/types';

export async function getServerLocale(): Promise<Locale> {
  const cookieStore = await cookies();
  let locale = cookieStore.get('preferred_locale')?.value as Locale;

  if (!locale) {
    const headerStore = await headers();
    const acceptLang = headerStore.get('accept-language');
    if (acceptLang) {
      locale = acceptLang.split(',')[0].split('-')[0] as Locale;
    }
  }

  if (!locale || (locale !== 'en' && locale !== 'zh')) {
    locale = 'en';
  }

  return locale;
}
