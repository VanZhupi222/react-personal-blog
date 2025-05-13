'use client';

import { Code, User, Briefcase, Trophy, Gamepad } from 'lucide-react';
import { LazyMotion, domAnimation, m } from 'framer-motion';
import { FeatureCard } from '@/components/ui/FeatureCard';
import { Card, CardContent } from '@/components/ui/Card';
import { useTranslations } from '@/hooks/useTranslations';

const features = [
  {
    href: "/about",
    icon: User,
    key: "about" as const,
  },
  {
    href: "/projects",
    icon: Briefcase,
    key: "projects" as const,
  },
  {
    href: "/blog",
    icon: Code,
    key: "blog" as const,
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0
  }
};

export default function Home() {
  const { t } = useTranslations();

  return (
    <LazyMotion features={domAnimation}>
      <m.div 
        className="min-h-[100dvh] flex items-center justify-center"
      >
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <m.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="space-y-20"
          >
            <m.section variants={itemVariants} className="text-center">
              <h1 className="text-4xl font-bold mb-6">{t.home.welcome}</h1>
              <p className="text-xl text-muted-foreground mb-8">
                {t.home.description}
              </p>
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
              <h2 className="text-2xl font-bold mb-6 text-center">{t.home.activity.title}</h2>
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <Trophy className="w-5 h-5" />
                        <h3 className="text-lg font-semibold">{t.home.activity.leetcode.title}</h3>
                      </div>
                      <span className="text-sm text-muted-foreground">{t.home.activity.leetcode.status}</span>
                    </div>
                    <div className="h-32 flex items-center justify-center border rounded bg-muted/30">
                      <p className="text-muted-foreground">{t.home.activity.leetcode.placeholder}</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <Gamepad className="w-5 h-5" />
                        <h3 className="text-lg font-semibold">{t.home.activity.steam.title}</h3>
                      </div>
                      <span className="text-sm text-muted-foreground">{t.home.activity.steam.status}</span>
                    </div>
                    <div className="h-32 flex items-center justify-center border rounded bg-muted/30">
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