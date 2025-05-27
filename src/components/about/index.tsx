'use client';

import { LazyMotion, domAnimation, m } from 'framer-motion';
import { PageHeader } from '@/components/layout/PageHeader';
import { useTranslations } from '@/lib/hooks/useTranslations';
import { useEffect } from 'react';
import { useAboutStore } from '@/store/aboutStore';
import { SkeletonAbout } from '@/components/skeleton/SkeletonAbout';
import { SkillCardList } from './SkillCard';
import { ExperienceCard } from './ExperienceCard';
import { ErrorFunc } from '@/components/features/Error';

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

export function AboutContent() {
  const { t, locale } = useTranslations();
  const { data, loading, error, fetchAbout } = useAboutStore();

  useEffect(() => {
    if (!data && !loading) fetchAbout();
  }, [fetchAbout, data, loading]);

  return (
    <LazyMotion features={domAnimation}>
      <m.div className="flex min-h-[100dvh] items-center justify-center">
        <div className="mx-auto w-full max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <m.div initial="hidden" animate="visible" variants={itemVariants}>
            <PageHeader heading={t.about.title} text={t.about.description} />
          </m.div>
          {loading || !data ? (
            <SkeletonAbout />
          ) : error ? (
            <ErrorFunc onRetry={fetchAbout} />
          ) : (
            <m.div
              initial="hidden"
              animate="visible"
              variants={containerVariants}
              className="space-y-12"
            >
              <m.section variants={itemVariants} className="mt-16 space-y-6">
                <h2 className="text-2xl font-bold">{t.about.skills.title}</h2>
                <SkillCardList skills={data.skills[locale] || null} />
              </m.section>

              <m.section variants={itemVariants} className="space-y-6">
                <h2 className="text-2xl font-bold">{t.about.experience.title}</h2>
                <div className="space-y-6">
                  {data.experiences[locale]?.map((exp, index) => (
                    <ExperienceCard key={index} exp={exp} index={index} />
                  ))}
                </div>
              </m.section>
            </m.div>
          )}
        </div>
      </m.div>
    </LazyMotion>
  );
}
