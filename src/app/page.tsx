'use client';

import { LazyMotion, domAnimation, m } from 'framer-motion';
import Link from 'next/link';
import { useTranslations } from '@/lib/hooks/useTranslations';
import { ControlPanel } from '@/components/features/ControlPanel';

export default function WelcomePage() {
  const { t } = useTranslations();

  return (
    <LazyMotion features={domAnimation}>
      <ControlPanel />
      <div className="flex min-h-[100dvh] flex-col items-center justify-center px-4 py-8">
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-sm space-y-6 text-center sm:max-w-none sm:space-y-8"
        >
          <m.div
            className="space-y-2"
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1, ease: 'easeOut' }}
          >
            <h1 className="from-primary via-primary/80 to-primary/60 bg-gradient-to-r bg-clip-text text-4xl leading-tight font-bold text-transparent drop-shadow-sm sm:text-6xl md:text-7xl">
              Shijie Fan | 范世杰
            </h1>
            <h2 className="from-primary/90 via-primary/70 to-primary/50 bg-gradient-to-r bg-clip-text text-3xl font-bold text-transparent drop-shadow-sm sm:text-5xl md:text-6xl">
              Zhupi222
            </h2>
          </m.div>

          <m.p
            className="text-muted-foreground flex flex-col items-center justify-center gap-2 text-lg sm:flex-row sm:gap-4 sm:text-xl"
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
              className="ring-offset-background focus-visible:ring-ring bg-primary text-primary-foreground hover:bg-primary/90 inline-flex h-11 items-center justify-center rounded-md px-8 text-sm font-medium shadow-md transition-all hover:scale-105 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
            >
              {t.home.enter}
            </Link>
          </m.div>
        </m.div>
      </div>
    </LazyMotion>
  );
}
