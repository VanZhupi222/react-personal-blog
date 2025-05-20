'use client';

import { Code, User, Briefcase, Trophy, Gamepad, Star, Award, Medal } from 'lucide-react';
import { LazyMotion, domAnimation, m } from 'framer-motion';
import { FeatureCard } from '@/components/features/FeatureCard';
import { Card, CardContent } from '@/components/ui/Card';
import { useTranslations } from '@/lib/hooks/useTranslations';
import { useLeetCodeStore } from '@/store/leetcode';
import React from 'react';
import { SteamCard } from '@/components/home/SteamCard';
import { RefreshButton } from '@/components/ui/RefreshButton';
import { useSteamStore } from '@/store/steam';
import { LeetCodeCard } from '@/components/home/LeetCodeCard/index';

const features = [
  {
    href: '/about',
    icon: User,
    key: 'about' as const,
  },
  {
    href: '/projects',
    icon: Briefcase,
    key: 'projects' as const,
  },
  {
    href: '/blog',
    icon: Code,
    key: 'blog' as const,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
  },
};

export default function Home() {
  const { t } = useTranslations();
  const { stats, loading, error, fetchStats } = useLeetCodeStore();
  const { fetchOwnedGames, ownedGamesLoading } = useSteamStore();

  React.useEffect(() => {
    fetchStats();
    // eslint-disable-next-line
  }, []);

  return (
    <LazyMotion features={domAnimation}>
      <m.div className="flex min-h-[100dvh] items-center justify-center">
        <div className="mx-auto w-full max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <m.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="space-y-20"
          >
            <m.section variants={itemVariants} className="text-center">
              <h1 className="mb-6 text-4xl font-bold">{t.home.welcome}</h1>
              <p className="text-muted-foreground mb-8 text-xl">{t.home.description}</p>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {features.map((feature) => {
                  const { key, ...rest } = feature;
                  return (
                    <FeatureCard
                      key={key}
                      {...rest}
                      title={t.home.features[key].title}
                      description={t.home.features[key].description}
                      actionText={t.home.features[key].action}
                    />
                  );
                })}
              </div>
            </m.section>

            <m.section variants={itemVariants}>
              <h2 className="mb-6 text-center text-2xl font-bold">{t.home.activity.title}</h2>
              <div className="grid gap-6 md:grid-cols-2">
                <LeetCodeCard />
                <SteamCard />
              </div>
            </m.section>
          </m.div>
        </div>
      </m.div>
    </LazyMotion>
  );
}
