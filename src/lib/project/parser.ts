import { Project } from './types';
import { Locale } from '@/i18n/types';

export function parseProjects(raw: Project[]): Record<Locale, Project[]> {
  const grouped: Record<Locale, Project[]> = { en: [], zh: [] };
  raw.forEach((p) => {
    if (p.language === 'en') grouped.en.push(p);
    else if (p.language === 'zh') grouped.zh.push(p);
  });
  grouped.en.sort((a, b) => a.order - b.order);
  grouped.zh.sort((a, b) => a.order - b.order);
  return grouped;
}
