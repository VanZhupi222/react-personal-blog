'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Moon, Sun, Menu, X } from 'lucide-react';
import { useTheme } from 'next-themes';
import { motion } from 'framer-motion';
import { LanguageSwitch } from '@/components/features/ControlPanel/LanguageSwitch';
import { useTranslations } from '@/lib/hooks/useTranslations';

const languages = [
  { code: 'en', name: 'English' },
  { code: 'zh', name: '中文' },
];

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
    <nav className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur">
      <div className="container flex h-14 items-center px-6 pr-1">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center">
            <span className="font-bold">Zhupi222</span>
          </Link>
          <nav className="hidden items-center space-x-6 text-sm font-medium md:flex">
            <Link
              href="/home"
              className="hover:text-foreground/80 text-foreground/60 transition-colors"
            >
              {t.home.title}
            </Link>
            <Link
              href="/about"
              className="hover:text-foreground/80 text-foreground/60 transition-colors"
            >
              {t.about.title}
            </Link>
            <Link
              href="/projects"
              className="hover:text-foreground/80 text-foreground/60 transition-colors"
            >
              {t.projects.title}
            </Link>
            <Link
              href="/blog"
              className="hover:text-foreground/80 text-foreground/60 transition-colors"
            >
              {t.blog.title}
            </Link>
            <Link
              href="/contact"
              className="hover:text-foreground/80 text-foreground/60 transition-colors"
            >
              {t.contact.title}
            </Link>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-end">
          {/* Desktop controls */}
          <nav className="hidden items-center space-x-2 md:flex">
            <LanguageSwitch />
            <button
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              className="text-foreground hover:bg-accent inline-flex items-center justify-center rounded-md p-2.5"
              aria-label="Toggle theme"
            >
              {mounted ? theme === 'light' ? <Moon size={20} /> : <Sun size={20} /> : null}
            </button>
          </nav>
          {/* Mobile menu button */}
          <button
            className="text-foreground inline-flex items-center justify-center rounded-md p-2.5 md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="bg-background/95 supports-[backdrop-filter]:bg-background/60 border-t backdrop-blur md:hidden"
        >
          <div className="container py-4">
            <nav className="flex flex-col space-y-4 px-6">
              <Link
                href="/home"
                className="hover:text-foreground/80 text-foreground/60 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {t.home.title}
              </Link>
              <Link
                href="/about"
                className="hover:text-foreground/80 text-foreground/60 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {t.about.title}
              </Link>
              <Link
                href="/projects"
                className="hover:text-foreground/80 text-foreground/60 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {t.projects.title}
              </Link>
              <Link
                href="/blog"
                className="hover:text-foreground/80 text-foreground/60 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {t.blog.title}
              </Link>
              <Link
                href="/contact"
                className="hover:text-foreground/80 text-foreground/60 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {t.contact.title}
              </Link>
              <div className="space-y-4 border-t pt-4">
                <div>
                  <div className="text-muted-foreground/80 mb-2 px-2 text-sm font-medium">
                    Language
                  </div>
                  <div className="space-y-1">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setLocale(lang.code);
                          setIsOpen(false);
                        }}
                        className={`flex w-full items-center rounded-md px-2 py-2 transition-colors ${
                          locale === lang.code
                            ? 'bg-accent/80 text-accent-foreground/90'
                            : 'hover:bg-accent/20 text-muted-foreground hover:text-foreground'
                        }`}
                      >
                        {lang.name}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="text-muted-foreground/80 mb-2 px-2 text-sm font-medium">
                    Theme
                  </div>
                  <button
                    onClick={() => {
                      setTheme(theme === 'light' ? 'dark' : 'light');
                      setIsOpen(false);
                    }}
                    className="hover:bg-accent/20 text-muted-foreground hover:text-foreground flex w-full items-center space-x-2 rounded-md px-2 py-2 transition-colors"
                  >
                    {mounted ? (
                      theme === 'light' ? (
                        <>
                          <Moon size={20} className="opacity-70" />
                          <span>Dark Mode</span>
                        </>
                      ) : (
                        <>
                          <Sun size={20} className="opacity-70" />
                          <span>Light Mode</span>
                        </>
                      )
                    ) : null}
                  </button>
                </div>
              </div>
            </nav>
          </div>
        </motion.div>
      )}
    </nav>
  );
}
