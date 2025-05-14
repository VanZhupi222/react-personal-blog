'use client';

import { Code, User, Briefcase, Trophy, Gamepad } from 'lucide-react';
import { LazyMotion, domAnimation, m } from 'framer-motion';
import { FeatureCard } from '@/components/features/FeatureCard';
import { Card, CardContent } from '@/components/ui/Card';
import { useTranslations } from '@/lib/hooks/useTranslations';

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
                        {t.home.activity.leetcode.status}
                      </span>
                    </div>
                    <div className="bg-muted/30 flex h-32 items-center justify-center rounded border">
                      <p className="text-muted-foreground">
                        {t.home.activity.leetcode.placeholder}
                      </p>
                    </div>
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
                    <div className="bg-muted/30 flex h-32 items-center justify-center rounded border">
                      <p className="text-muted-foreground">{t.home.activity.steam.placeholder}</p>
                    </div>
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
