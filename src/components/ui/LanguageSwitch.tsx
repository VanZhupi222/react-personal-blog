'use client';

import * as React from 'react';
import { Globe } from 'lucide-react';
import { useTranslations } from '@/lib/hooks/useTranslations';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const languages = [
  { code: 'en', name: 'English' },
  { code: 'zh', name: '中文' },
];

export function LanguageSwitch() {
  const { locale, setLocale } = useTranslations();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-accent transition-colors">
        <Globe className="w-4 h-4" />
        <span className="text-sm">
          {languages.find(lang => lang.code === locale)?.name}
        </span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => setLocale(lang.code)}
            className={locale === lang.code ? 'bg-accent' : ''}
          >
            {lang.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
} 