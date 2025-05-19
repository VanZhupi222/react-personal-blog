'use client';

import { Code, User, Briefcase, Trophy, Gamepad, Star, Award, Medal } from 'lucide-react';
import { LazyMotion, domAnimation, m } from 'framer-motion';
import { FeatureCard } from '@/components/features/FeatureCard';
import { Card, CardContent } from '@/components/ui/Card';
import { useTranslations } from '@/lib/hooks/useTranslations';
import { useLeetCodeStore } from '@/store/leetcode';
import { Loader } from '@/components/ui/Loader';
import React from 'react';
import { SteamStatsCard } from '@/components/features/SteamStatsCard';

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
                <Card>
                  <CardContent className="pt-6">
                    <div className="mb-4 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Trophy className="h-5 w-5" />
                        <h3 className="text-lg font-semibold">{t.home.activity.leetcode.title}</h3>
                      </div>
                      <span className="text-muted-foreground text-sm">
                        {stats ? 'Live' : t.home.activity.leetcode.status}
                      </span>
                    </div>
                    {loading ? (
                      <div className="flex min-h-[200px] items-center justify-center">
                        <Loader size="lg" />
                      </div>
                    ) : error ? (
                      <p className="text-red-500">{error}</p>
                    ) : stats ? (
                      <>
                        <div>
                          <div className="flex items-center gap-2 mb-4">
                            <span className="ml-auto text-2xl font-extrabold text-foreground">{stats.totalSolved}</span>
                            <span className="text-lg font-semibold text-muted-foreground">/ {stats.totalQuestions}</span>
                          </div>
                          <div className="space-y-3">
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-foreground">{t.home.activity.leetcode.easy}</span>
                              <span className="ml-auto text-sm font-semibold text-foreground">{stats.easySolved} / {stats.totalEasy}</span>
                            </div>
                            <div className="w-full h-2 bg-muted rounded">
                              <div
                                className="h-2 rounded bg-leetcode-easy transition-all duration-500"
                                style={{
                                  width: `${stats.totalEasy ? (stats.easySolved / stats.totalEasy) * 100 : 0}%`,
                                }}
                              />
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-foreground">{t.home.activity.leetcode.medium}</span>
                              <span className="ml-auto text-sm font-semibold text-foreground">{stats.mediumSolved} / {stats.totalMedium}</span>
                            </div>
                            <div className="w-full h-2 bg-muted rounded">
                              <div
                                className="h-2 rounded bg-leetcode-medium transition-all duration-500"
                                style={{
                                  width: `${stats.totalMedium ? (stats.mediumSolved / stats.totalMedium) * 100 : 0}%`,
                                }}
                              />
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-foreground">{t.home.activity.leetcode.hard}</span>
                              <span className="ml-auto text-sm font-semibold text-foreground">{stats.hardSolved} / {stats.totalHard}</span>
                            </div>
                            <div className="w-full h-2 bg-muted rounded">
                              <div
                                className="h-2 rounded bg-leetcode-hard transition-all duration-500"
                                style={{
                                  width: `${stats.totalHard ? (stats.hardSolved / stats.totalHard) * 100 : 0}%`,
                                }}
                              />
                            </div>
                          </div>
                          <div className="flex items-center justify-between mt-6 text-xs font-semibold">
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 text-leetcode-completion" />
                              <span className="text-muted-foreground">{t.home.activity.leetcode.completion}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Award className="w-4 h-4 text-leetcode-ranking" />
                              <span className="text-muted-foreground">{t.home.activity.leetcode.ranking}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Medal className="w-4 h-4 text-leetcode-reputation" />
                              <span className="text-muted-foreground">{t.home.activity.leetcode.reputation}</span>
                            </div>
                          </div>
                          <div className="flex items-center justify-between mt-1 text-lg font-extrabold">
                            <span className="text-foreground">{stats.totalQuestions ? ((stats.totalSolved / stats.totalQuestions) * 100).toFixed(1) : 0}%</span>
                            <span className="text-foreground">{stats.ranking.toLocaleString()}</span>
                            <span className="text-foreground">{stats.reputation}</span>
                          </div>
                        </div>
                      </>
                    ) : (
                      <p className="text-muted-foreground">{t.home.activity.leetcode.placeholder}</p>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="mb-4 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Gamepad className="h-5 w-5" />
                        <h3 className="text-lg font-semibold">{t.home.activity.steam.title}</h3>
                      </div>
                      <span className="text-muted-foreground text-sm">
                        {t.home.activity.steam.status}
                      </span>
                    </div>
                    <SteamStatsCard />
                  </CardContent>
                </Card>
              </div>
            </m.section>
          </m.div>
        </div>
      </m.div>
    </LazyMotion>
  );
}
