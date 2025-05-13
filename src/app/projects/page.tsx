'use client';

import { GithubIcon, ExternalLink } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { PageHeader } from '@/components/ui/PageHeader';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { LazyMotion, domAnimation, m } from 'framer-motion';
import { useTranslations } from '@/hooks/useTranslations';

const projects = [
  {
    title: "Project Name 1",
    description: "A full-stack web application built with Next.js and Node.js that helps users manage their daily tasks and track progress.",
    tags: ["Next.js", "Node.js", "PostgreSQL", "TypeScript"],
    links: {
      github: "https://github.com/username/project1",
      live: "https://project1.example.com"
    },
    image: "/project1.png",
    highlights: [
      "Implemented real-time updates using WebSocket",
      "Designed and built RESTful API endpoints",
      "Integrated with third-party services for authentication"
    ]
  },
  {
    title: "Project Name 2",
    description: "An e-commerce platform that allows users to browse products, manage their cart, and complete purchases securely.",
    tags: ["React", "Express", "MongoDB", "Redux"],
    links: {
      github: "https://github.com/username/project2",
      live: "https://project2.example.com"
    },
    image: "/project2.png",
    highlights: [
      "Built responsive UI components using React and Tailwind CSS",
      "Implemented secure payment processing with Stripe",
      "Optimized performance with server-side rendering"
    ]
  },
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

export default function ProjectsPage() {
  const { t } = useTranslations();

  return (
    <LazyMotion features={domAnimation}>
      <m.div className="min-h-[100dvh] flex items-center justify-center">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <m.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="space-y-8"
          >
            <m.div variants={itemVariants}>
              <PageHeader
                title={t.projects.title}
                description={t.projects.description}
              />
            </m.div>

            <div className="grid gap-8">
              {projects.map((project, index) => (
                <m.div key={index} variants={itemVariants}>
                  <Card className="overflow-hidden">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle>{project.title}</CardTitle>
                        <div className="flex gap-4">
                          <a
                            href={project.links.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted-foreground hover:text-foreground transition-colors"
                          >
                            <GithubIcon className="w-5 h-5" />
                          </a>
                          <a
                            href={project.links.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted-foreground hover:text-foreground transition-colors"
                          >
                            <ExternalLink className="w-5 h-5" />
                          </a>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent>
                      <p className="text-muted-foreground mb-4">
                        {project.description}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.tags.map((tag) => (
                          <Badge key={tag}>
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      <div className="space-y-2">
                        <h3 className="font-semibold">{t.projects.highlights}:</h3>
                        <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                          {project.highlights.map((highlight, i) => (
                            <li key={i}>{highlight}</li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </m.div>
              ))}
            </div>
          </m.div>
        </div>
      </m.div>
    </LazyMotion>
  );
}