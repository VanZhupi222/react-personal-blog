'use client';

import { Calendar, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { PageHeader } from '@/components/ui/PageHeader';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { LazyMotion, domAnimation, m } from 'framer-motion';
import { useTranslations } from '@/hooks/useTranslations';

const posts = [
  {
    title: "Understanding TypeScript Generics",
    description: "A deep dive into TypeScript generics and their practical applications in real-world scenarios.",
    date: "2024-03-15",
    readTime: "8 min read",
    tags: ["TypeScript", "Programming", "Web Development"],
    slug: "understanding-typescript-generics"
  },
  {
    title: "Building Scalable React Applications",
    description: "Best practices and patterns for building large-scale React applications that are maintainable and performant.",
    date: "2024-03-10",
    readTime: "12 min read",
    tags: ["React", "Architecture", "Performance"],
    slug: "building-scalable-react-applications"
  },
  {
    title: "Advanced Git Workflows",
    description: "Learn advanced Git techniques and workflows to improve your version control skills.",
    date: "2024-03-05",
    readTime: "10 min read",
    tags: ["Git", "DevOps", "Version Control"],
    slug: "advanced-git-workflows"
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

export default function BlogPage() {
  const { t } = useTranslations();

  return (
    <LazyMotion features={domAnimation}>
      <m.div 
        className="min-h-[100dvh] flex items-center justify-center"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <m.div variants={itemVariants}>
            <PageHeader
              title={t.blog.title}
              description={t.blog.description}
            />
          </m.div>

          <m.div className="mt-12 grid gap-6" variants={containerVariants}>
            {posts.map((post, index) => (
              <m.div key={index} variants={itemVariants}>
                <Card className="group transition-colors hover:border-primary">
                  <CardHeader>
                    <CardTitle className="group-hover:text-primary transition-colors">
                      <a href={`/blog/${post.slug}`}>{post.title}</a>
                    </CardTitle>
                  </CardHeader>
                  
                  <div className="px-6 flex items-center gap-4 text-sm text-muted-foreground mb-4">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {post.readTime}
                    </span>
                  </div>

                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      {post.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <Badge key={tag} icon>
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </m.div>
            ))}
          </m.div>
        </div>
      </m.div>
    </LazyMotion>
  );
} 