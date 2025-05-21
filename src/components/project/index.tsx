'use client';

import { useEffect } from 'react';
import { useProjectStore } from '@/store/projectStore';
import { SkeletonProjectList } from '@/components/skeleton/SkeletonProjectList';
import { PageHeader } from '@/components/layout/PageHeader';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { LazyMotion, domAnimation, m } from 'framer-motion';
import { useTranslations } from '@/lib/hooks/useTranslations';
import { Badge } from '@/components/ui/Badge';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export function ProjectListPage() {
  const { t } = useTranslations();
  const { projects, loading, error, fetchProjects } = useProjectStore();

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  return (
    <LazyMotion features={domAnimation}>
      <m.div
        className="min-h-[100dvh]"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="mx-auto w-full max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <m.div variants={itemVariants}>
            <PageHeader heading={t.projects.title} text={t.projects.description} />
          </m.div>
          {loading && <SkeletonProjectList />}
          {error && <div className="text-red-500">{error}</div>}
          {!loading && !error && (
            <m.div className="mt-12 grid gap-6" variants={containerVariants}>
              {projects.map((project, index) => (
                <m.div key={index} variants={itemVariants}>
                  <Card className="group hover:border-primary-hover transition-colors">
                    <CardHeader>
                      <CardTitle className="group-hover:text-primary-hover transition-colors hover:underline">
                        <a href={`/projects/${project.slug}`}>{project.title}</a>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4">{project.description}</p>
                      <div className="mb-2 flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <Badge key={tag} icon={false}>
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <div className="space-y-2">
                        <h3 className="font-semibold">{t.projects.highlights}:</h3>
                        <ul className="text-muted-foreground list-inside list-disc space-y-1">
                          {project.highlights.map((highlight, i) => (
                            <li key={i}>{highlight}</li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </m.div>
              ))}
            </m.div>
          )}
        </div>
      </m.div>
    </LazyMotion>
  );
}
