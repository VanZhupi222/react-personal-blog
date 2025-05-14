'use client';

import { LazyMotion, domAnimation, m } from 'framer-motion';
import Link from 'next/link';
import { useTranslations } from '@/lib/hooks/useTranslations';

export default function WelcomePage() {
  const { t } = useTranslations();

  return (
    <LazyMotion features={domAnimation}>
      <div className="min-h-[100dvh] flex flex-col items-center justify-center px-4 py-8">
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-6 sm:space-y-8 max-w-sm sm:max-w-none"
        >
          <m.div 
            className="space-y-2"
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent drop-shadow-sm leading-tight">
              Shijie Fan | 范世杰
            </h1>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary/90 via-primary/70 to-primary/50 bg-clip-text text-transparent drop-shadow-sm">
              Zhupi222
            </h2>
          </m.div>
          
          <m.p 
            className="text-lg sm:text-xl text-muted-foreground flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <span>{t.home.role.fullstack}</span>
            <span className="hidden sm:inline">|</span>
            <span>{t.home.role.tech}</span>
            <span className="hidden sm:inline">|</span>
            <span>{t.home.role.game}</span>
          </m.p>

          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="pt-4"
          >
            <Link 
              href="/home"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-105 h-11 px-8 shadow-md"
            >
              {t.home.enter}
            </Link>
          </m.div>
        </m.div>
      </div>
    </LazyMotion>
  );
}
