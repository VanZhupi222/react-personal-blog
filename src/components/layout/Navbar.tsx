'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { useTheme } from 'next-themes';
import { LanguageSwitch } from '@/components/features/ControlPanel/LanguageSwitch';
import { useTranslations } from '@/lib/hooks/useTranslations';
import ThemeSwitch from '@/components/features/ControlPanel/ThemeSwitch';
import { MobileMenu } from './MobileMenu';

export function Navbar() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);
  const { t, locale, setLocale } = useTranslations();

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Hide navbar on the entrance page
  if (pathname === '/') {
    return null;
  }

  return (
    <nav className="border-border bg-card text-primary-foreground sticky top-0 z-50 w-full border-b backdrop-blur transition-colors">
      <div className="container flex h-14 items-center px-6 pr-1">
        <div className="flex items-center gap-8">
          <Link href="/" className="text-primary-foreground flex items-center">
            <span className="font-bold">Zhupi222</span>
          </Link>
          <nav className="hidden items-center space-x-6 text-sm font-medium md:flex">
            <Link
              href="/home"
              className="hover:text-primary-foreground text-primary-foreground/80 transition-colors"
            >
              {t.home.title}
            </Link>
            <Link
              href="/about"
              className="hover:text-primary-foreground text-primary-foreground/80 transition-colors"
            >
              {t.about.title}
            </Link>
            <Link
              href="/projects"
              className="hover:text-primary-foreground text-primary-foreground/80 transition-colors"
            >
              {t.projects.title}
            </Link>
            <Link
              href="/blog"
              className="hover:text-primary-foreground text-primary-foreground/80 transition-colors"
            >
              {t.blog.title}
            </Link>
            <Link
              href="/contact"
              className="hover:text-primary-foreground text-primary-foreground/80 transition-colors"
            >
              {t.contact.title}
            </Link>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-end">
          {/* Desktop controls */}
          <nav className="hidden items-center space-x-2 md:flex">
            <LanguageSwitch />
            <ThemeSwitch />
          </nav>
          {/* Mobile menu button */}
          <button
            className="text-primary-foreground inline-flex items-center justify-center rounded-md p-2.5 md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <MobileMenu
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        theme={theme}
        setTheme={setTheme}
        mounted={mounted}
        t={t}
        locale={locale}
        setLocale={setLocale}
      />
    </nav>
  );
}
