"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Moon, Sun, Menu, X } from "lucide-react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { LanguageSwitch } from "@/components/features/ControlPanel/LanguageSwitch";
import { useTranslations } from "@/lib/hooks/useTranslations";

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
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center px-6 pr-1">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center">
            <span className="font-bold">Zhupi222</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            <Link href="/home" className="transition-colors hover:text-foreground/80 text-foreground/60">{t.home.title}</Link>
            <Link href="/about" className="transition-colors hover:text-foreground/80 text-foreground/60">{t.about.title}</Link>
            <Link href="/projects" className="transition-colors hover:text-foreground/80 text-foreground/60">{t.projects.title}</Link>
            <Link href="/blog" className="transition-colors hover:text-foreground/80 text-foreground/60">{t.blog.title}</Link>
            <Link href="/contact" className="transition-colors hover:text-foreground/80 text-foreground/60">{t.contact.title}</Link>
          </nav>
        </div>
        <div className="flex-1 flex items-center justify-end">
          {/* Desktop controls */}
          <nav className="hidden md:flex items-center space-x-2">
            <LanguageSwitch />
            <button
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              className="inline-flex items-center justify-center rounded-md p-2.5 text-foreground hover:bg-accent"
              aria-label="Toggle theme"
            >
              {mounted ? (
                theme === "light" ? <Moon size={20} /> : <Sun size={20} />
              ) : null}
            </button>
          </nav>
          {/* Mobile menu button */}
          <button
            className="md:hidden inline-flex items-center justify-center rounded-md p-2.5 text-foreground"
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
          className="md:hidden border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
        >
          <div className="container py-4">
            <nav className="flex flex-col space-y-4 px-6">
              <Link 
                href="/home" 
                className="transition-colors hover:text-foreground/80 text-foreground/60"
                onClick={() => setIsOpen(false)}
              >
                {t.home.title}
              </Link>
              <Link 
                href="/about" 
                className="transition-colors hover:text-foreground/80 text-foreground/60"
                onClick={() => setIsOpen(false)}
              >
                {t.about.title}
              </Link>
              <Link 
                href="/projects" 
                className="transition-colors hover:text-foreground/80 text-foreground/60"
                onClick={() => setIsOpen(false)}
              >
                {t.projects.title}
              </Link>
              <Link 
                href="/blog" 
                className="transition-colors hover:text-foreground/80 text-foreground/60"
                onClick={() => setIsOpen(false)}
              >
                {t.blog.title}
              </Link>
              <Link 
                href="/contact" 
                className="transition-colors hover:text-foreground/80 text-foreground/60"
                onClick={() => setIsOpen(false)}
              >
                {t.contact.title}
              </Link>
              <div className="pt-4 border-t space-y-4">
                <div>
                  <div className="px-2 mb-2 text-sm font-medium text-muted-foreground/80">
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
                        className={`flex items-center w-full px-2 py-2 rounded-md transition-colors ${
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
                  <div className="px-2 mb-2 text-sm font-medium text-muted-foreground/80">
                    Theme
                  </div>
                  <button
                    onClick={() => {
                      setTheme(theme === "light" ? "dark" : "light");
                      setIsOpen(false);
                    }}
                    className="flex items-center space-x-2 w-full px-2 py-2 rounded-md hover:bg-accent/20 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {mounted ? (
                      theme === "light" ? (
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