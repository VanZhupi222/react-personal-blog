'use client';

import { LazyMotion, domAnimation, m } from 'framer-motion';
import { PageHeader } from '@/components/layout/PageHeader';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { useTranslations } from '@/lib/hooks/useTranslations';
import { Box, Flex, Grid, Heading, Text } from '@chakra-ui/react';

const skills = {
  frontend: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
  backend: ['Node.js', 'Express', 'Python', 'Django', 'PostgreSQL', 'MongoDB'],
  devops: ['Docker', 'AWS', 'CI/CD', 'Git'],
  tools: ['VS Code', 'Figma', 'Postman', 'Linux'],
};

const experiences = [
  {
    title: 'Senior Full-stack Developer',
    company: 'Company Name',
    period: '2021 - Present',
    description:
      'Led development of multiple web applications using React and Node.js. Implemented CI/CD pipelines and mentored junior developers.',
    achievements: [
      'Reduced application load time by 40% through optimization',
      'Implemented automated testing that increased code coverage to 85%',
      'Led team of 5 developers in successful project delivery',
    ],
  },
  {
    title: 'Full-stack Developer',
    company: 'Previous Company',
    period: '2019 - 2021',
    description: 'Developed and maintained multiple web applications using modern technologies.',
    achievements: [
      'Built RESTful APIs serving 100k+ daily users',
      'Implemented real-time features using WebSocket',
      'Reduced server costs by 30% through optimization',
    ],
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

export default function AboutPage() {
  const { t } = useTranslations();

  return (
    <LazyMotion features={domAnimation}>
      <m.div className="flex min-h-[100dvh] items-center justify-center">
        <Box mx="auto" w="full" maxW="7xl" px={4} py={24}>
          <m.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <m.div variants={itemVariants}>
              <PageHeader heading={t.about.title} text={t.about.description} />
            </m.div>

            <m.section variants={itemVariants}>
              <Heading as="h2" fontSize="2xl" fontWeight="bold" mb={6}>
                {t.about.skills.title}
              </Heading>
              <Grid gap={6} templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }}>
                {Object.entries(skills).map(([category, items]) => (
                  <Card key={category}>
                    <CardContent>
                      <Heading as="h3" fontSize="lg" fontWeight="semibold" mb={4}>
                        {
                          t.about.skills.categories[
                            category as keyof typeof t.about.skills.categories
                          ]
                        }
                      </Heading>
                      <Flex flexWrap="wrap" gap={2}>
                        {items.map((skill) => (
                          <Badge key={skill}>{skill}</Badge>
                        ))}
                      </Flex>
                    </CardContent>
                  </Card>
                ))}
              </Grid>
            </m.section>

            <m.section variants={itemVariants} style={{ marginTop: 48 }}>
              <Heading as="h2" fontSize="2xl" fontWeight="bold" mb={6}>
                {t.about.experience.title}
              </Heading>
              <Box>
                {experiences.map((exp, index) => (
                  <Box mb={6} key={index}>
                    <Card>
                      <CardContent>
                        <Flex mb={4} align="flex-start" justify="space-between">
                          <Box>
                            <Heading as="h3" fontSize="lg" fontWeight="semibold">
                              {exp.title}
                            </Heading>
                            <Text color="gray.500">{exp.company}</Text>
                          </Box>
                          <Text color="gray.500" fontSize="sm">{exp.period}</Text>
                        </Flex>
                        <Text color="gray.500" mb={4}>{exp.description}</Text>
                        <Box as="ul" color="gray.500" pl={4} style={{ listStyleType: 'disc' }}>
                          {exp.achievements.map((achievement, i) => (
                            <Box as="li" key={i} mb={2}>
                              {achievement}
                            </Box>
                          ))}
                        </Box>
                      </CardContent>
                    </Card>
                  </Box>
                ))}
              </Box>
            </m.section>
          </m.div>
        </Box>
      </m.div>
    </LazyMotion>
  );
}
