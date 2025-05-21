'use client';

import { LazyMotion, domAnimation, m } from 'framer-motion';
import { PageHeader } from '@/components/layout/PageHeader';
import { useTranslations } from '@/lib/hooks/useTranslations';
import { useEffect } from 'react';
import { useAboutStore } from '@/store/aboutStore';
import { SkeletonAbout } from '@/components/SkeletonAbout';
import { SkillCard } from '@/components/features/SkillCard';
import { Card } from '@/components/ui/Card';

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
  const { t } = useTranslations();
  const { data, loading, error, fetchAbout } = useAboutStore();

  useEffect(() => {
    fetchAbout();
  }, []);

  return (
    <LazyMotion features={domAnimation}>
      <m.div className="flex min-h-[100dvh] items-center justify-center">
        <div className="mx-auto w-full max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <PageHeader heading={t.about.title} text={t.about.description} />

          {loading || !data ? (
            <SkeletonAbout />
          ) : error ? (
            <div className="text-destructive py-12 text-center">{error}</div>
          ) : (
            <m.div
              initial="hidden"
              animate="visible"
              variants={containerVariants}
              className="space-y-12"
            >
              <m.section variants={itemVariants} className="mt-16 space-y-6">
                <h2 className="text-2xl font-bold">{t.about.skills.title}</h2>
                <div className="grid gap-6 md:grid-cols-2">
                  {Object.entries(data.skills)
                    .filter(([_, items]) => Array.isArray(items) && items.length > 0)
                    .map(([category, items]) => (
                      <SkillCard
                        key={category}
                        title={
                          t.about.skills.categories[
                            category as keyof typeof t.about.skills.categories
                          ] || category
                        }
                        items={items}
                      />
                    ))}
                </div>
              </m.section>

              <m.section variants={itemVariants} className="space-y-6">
                <h2 className="text-2xl font-bold">{t.about.experience.title}</h2>
                <div className="space-y-6">
                  {data.experiences.map((exp, index) => (
                    <Card
                      key={index}
                      className="bg-card text-card-foreground border-border border shadow-lg"
                    >
                      <div className="px-6 pt-6 pb-2">
                        <div className="mb-4 flex items-start justify-between">
                          <div>
                            <h3 className="mb-4 text-lg font-semibold">{exp.title}</h3>
                            <p className="text-muted-foreground">{exp.company}</p>
                          </div>
                          <span className="text-muted-foreground text-sm">{exp.period}</span>
                        </div>
                        <p className="text-muted-foreground mb-4">{exp.description}</p>
                        <ul className="text-muted-foreground list-inside list-disc space-y-2">
                          {exp.achievements.map((achievement, i) => (
                            <li key={i}>{achievement}</li>
                          ))}
                        </ul>
                      </div>
                    </Card>
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
