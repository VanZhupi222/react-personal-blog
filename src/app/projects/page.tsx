'use client';

import { GithubIcon, ExternalLink } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { PageHeader } from '@/components/layout/PageHeader';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { LazyMotion, domAnimation, m } from 'framer-motion';
import { useTranslations } from '@/lib/hooks/useTranslations';
import { Box, Flex, Grid, Heading, Text, Link as ChakraLink, IconButton } from '@chakra-ui/react';

const projects = [
  {
    title: 'Project Name 1',
    description:
      'A full-stack web application built with Next.js and Node.js that helps users manage their daily tasks and track progress.',
    tags: ['Next.js', 'Node.js', 'PostgreSQL', 'TypeScript'],
    links: {
      github: 'https://github.com/username/project1',
      live: 'https://project1.example.com',
    },
    image: '/project1.png',
    highlights: [
      'Implemented real-time updates using WebSocket',
      'Designed and built RESTful API endpoints',
      'Integrated with third-party services for authentication',
    ],
  },
  {
    title: 'Project Name 2',
    description:
      'An e-commerce platform that allows users to browse products, manage their cart, and complete purchases securely.',
    tags: ['React', 'Express', 'MongoDB', 'Redux'],
    links: {
      github: 'https://github.com/username/project2',
      live: 'https://project2.example.com',
    },
    image: '/project2.png',
    highlights: [
      'Built responsive UI components using React and Tailwind CSS',
      'Implemented secure payment processing with Stripe',
      'Optimized performance with server-side rendering',
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

export default function ProjectsPage() {
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
              <PageHeader heading={t.projects.title} text={t.projects.description} />
            </m.div>

            <Grid gap={8}>
              {projects.map((project, index) => (
                <m.div key={index} variants={itemVariants}>
                  <Card>
                    <CardHeader>
                      <Flex align="center" justify="space-between">
                        <CardTitle>
                          {project.title}
                        </CardTitle>
                        <Flex gap={4}>
                          <ChakraLink href={project.links.github} target="_blank" rel="noopener noreferrer">
                            <IconButton
                              aria-label="GitHub"
                              variant="ghost"
                              size="sm"
                              color="gray.500"
                              _hover={{ color: 'gray.800', bg: 'gray.100' }}
                            >
                              <GithubIcon size={20} />
                            </IconButton>
                          </ChakraLink>
                          <ChakraLink href={project.links.live} target="_blank" rel="noopener noreferrer">
                            <IconButton
                              aria-label="Live Demo"
                              variant="ghost"
                              size="sm"
                              color="gray.500"
                              _hover={{ color: 'gray.800', bg: 'gray.100' }}
                            >
                              <ExternalLink size={20} />
                            </IconButton>
                          </ChakraLink>
                        </Flex>
                      </Flex>
                    </CardHeader>

                    <CardContent>
                      <Text color="gray.500" mb={4}>{project.description}</Text>

                      <Flex mb={6} flexWrap="wrap" gap={2}>
                        {project.tags.map((tag) => (
                          <Badge key={tag}>{tag}</Badge>
                        ))}
                      </Flex>

                      <Box mb={2}>
                        <Heading as="h3" fontSize="md" fontWeight="semibold" mb={2}>
                          {t.projects.highlights}:
                        </Heading>
                        <Box as="ul" color="gray.500" pl={4} style={{ listStyleType: 'disc' }}>
                          {project.highlights.map((highlight, i) => (
                            <Box as="li" key={i} mb={1}>
                              {highlight}
                            </Box>
                          ))}
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </m.div>
              ))}
            </Grid>
          </m.div>
        </Box>
      </m.div>
    </LazyMotion>
  );
}
