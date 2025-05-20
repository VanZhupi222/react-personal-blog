'use client';

import { Code, User, FolderGit2 } from 'lucide-react';
import { LeetCodeCard } from '@/components/home/LeetCodeCard';
import { SteamCard } from '@/components/home/SteamCard';
import { FeatureCard } from '@/components/features/FeatureCard';
import { useTranslations } from '@/lib/hooks/useTranslations';
import { LazyMotion, m, domAnimation } from 'framer-motion';

export default function HomePage() {
  const { t } = useTranslations();
  const featureCards = [
    {
      href: '/about',
      icon: User,
      title: t.home.features.about.title,
      description: t.home.features.about.description,
      actionText: t.home.features.about.action,
    },
    {
      href: '/projects',
      icon: FolderGit2,
      title: t.home.features.projects.title,
      description: t.home.features.projects.description,
      actionText: t.home.features.projects.action,
    },
    {
      href: '/blog',
      icon: Code,
      title: t.home.features.blog.title,
      description: t.home.features.blog.description,
      actionText: t.home.features.blog.action,
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
    visible: { opacity: 1, y: 0 },
  };

  return (
    <LazyMotion features={domAnimation}>
      <m.div
        className="flex min-h-[100dvh] items-center justify-center"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <main className="bg-background min-h-screen p-8">
          {/* Welcome Section */}
          <section className="mx-auto mb-16 max-w-6xl text-center">
            <m.div variants={itemVariants}>
              <h1 className="text-primary-foreground mb-4 text-6xl font-bold">{t.home.welcome}</h1>
              <p className="text-muted-foreground text-xl">{t.home.description}</p>
            </m.div>
          </section>

          {/* Cards Section */}
          <section className="mx-auto mb-16 grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-3">
            {featureCards.map((card) => (
              <m.div key={card.href} variants={itemVariants}>
                <FeatureCard {...card} />
              </m.div>
            ))}
          </section>

          {/* Activity Tracking Section */}
          <m.section className="mx-auto max-w-6xl" variants={itemVariants}>
            <h2 className="text-secondary mb-8 text-center text-4xl font-bold">
              {t.home.activity.title}
            </h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <LeetCodeCard />
              <SteamCard />
            </div>
          </m.section>
        </main>
      </m.div>
    </LazyMotion>
  );
}
