'use client';

import { LazyMotion, domAnimation, m } from 'framer-motion';
import { PageHeader } from '@/components/ui/PageHeader';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { useTranslations } from '@/hooks/useTranslations';

const skills = {
  frontend: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
  backend: ["Node.js", "Express", "Python", "Django", "PostgreSQL", "MongoDB"],
  devops: ["Docker", "AWS", "CI/CD", "Git"],
  tools: ["VS Code", "Figma", "Postman", "Linux"]
};

const experiences = [
  {
    title: "Senior Full-stack Developer",
    company: "Company Name",
    period: "2021 - Present",
    description: "Led development of multiple web applications using React and Node.js. Implemented CI/CD pipelines and mentored junior developers.",
    achievements: [
      "Reduced application load time by 40% through optimization",
      "Implemented automated testing that increased code coverage to 85%",
      "Led team of 5 developers in successful project delivery"
    ]
  },
  {
    title: "Full-stack Developer",
    company: "Previous Company",
    period: "2019 - 2021",
    description: "Developed and maintained multiple web applications using modern technologies.",
    achievements: [
      "Built RESTful APIs serving 100k+ daily users",
      "Implemented real-time features using WebSocket",
      "Reduced server costs by 30% through optimization"
    ]
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

export default function AboutPage() {
  const { t } = useTranslations();

  return (
    <LazyMotion features={domAnimation}>
      <m.div className="min-h-[100dvh] flex items-center justify-center">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <m.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="space-y-12"
          >
            <m.div variants={itemVariants}>
              <PageHeader
                title={t.about.title}
                description={t.about.description}
              />
            </m.div>

            <m.section variants={itemVariants} className="space-y-6">
              <h2 className="text-2xl font-bold">{t.about.skills.title}</h2>
              <div className="grid gap-6 md:grid-cols-2">
                {Object.entries(skills).map(([category, items]) => (
                  <Card key={category}>
                    <CardContent className="pt-6">
                      <h3 className="text-lg font-semibold mb-4">
                        {t.about.skills.categories[category as keyof typeof t.about.skills.categories]}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {items.map((skill) => (
                          <Badge key={skill}>{skill}</Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </m.section>

            <m.section variants={itemVariants} className="space-y-6">
              <h2 className="text-2xl font-bold">{t.about.experience.title}</h2>
              <div className="space-y-6">
                {experiences.map((exp, index) => (
                  <Card key={index}>
                    <CardContent className="pt-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-lg font-semibold">{exp.title}</h3>
                          <p className="text-muted-foreground">{exp.company}</p>
                        </div>
                        <span className="text-sm text-muted-foreground">{exp.period}</span>
                      </div>
                      <p className="text-muted-foreground mb-4">{exp.description}</p>
                      <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                        {exp.achievements.map((achievement, i) => (
                          <li key={i}>{achievement}</li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </m.section>
          </m.div>
        </div>
      </m.div>
    </LazyMotion>
  );
} 