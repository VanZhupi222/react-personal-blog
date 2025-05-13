'use client';

import { LazyMotion, domAnimation, m } from 'framer-motion';
import Link from 'next/link';
import { useTranslations } from '@/hooks/useTranslations';

export default function WelcomePage() {
  const { t } = useTranslations();

  return (
    <LazyMotion features={domAnimation}>
      <div className="min-h-[100dvh] flex flex-col items-center justify-center -translate-y-8">
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center px-4 space-y-8"
        >
          <m.h1 
            className="text-6xl sm:text-7xl font-bold bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent drop-shadow-sm leading-normal py-2"
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            Shijie Fan | 范世杰 | Zhupi222
          </m.h1>
          <m.p 
            className="text-xl text-muted-foreground mt-8"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            {t.home.role.fullstack} | {t.home.role.tech} | {t.home.role.game}
          </m.p>
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
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
