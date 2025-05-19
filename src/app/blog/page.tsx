'use client';

import { Calendar, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { PageHeader } from '@/components/layout/PageHeader';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { LazyMotion, domAnimation, m } from 'framer-motion';
import { useTranslations } from '@/lib/hooks/useTranslations';
import { Box, Flex, Grid, Heading, Text, Link as ChakraLink } from '@chakra-ui/react';

const posts = [
  {
    title: 'Understanding TypeScript Generics',
    description:
      'A deep dive into TypeScript generics and their practical applications in real-world scenarios.',
    date: '2024-03-15',
    readTime: '8 min read',
    tags: ['TypeScript', 'Programming', 'Web Development'],
    slug: 'understanding-typescript-generics',
  },
  {
    title: 'Building Scalable React Applications',
    description:
      'Best practices and patterns for building large-scale React applications that are maintainable and performant.',
    date: '2024-03-10',
    readTime: '12 min read',
    tags: ['React', 'Architecture', 'Performance'],
    slug: 'building-scalable-react-applications',
  },
  {
    title: 'Advanced Git Workflows',
    description:
      'Learn advanced Git techniques and workflows to improve your version control skills.',
    date: '2024-03-05',
    readTime: '10 min read',
    tags: ['Git', 'DevOps', 'Version Control'],
    slug: 'advanced-git-workflows',
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

export default function BlogPage() {
  const { t } = useTranslations();

  return (
    <LazyMotion features={domAnimation}>
      <m.div
        style={{ display: 'flex', minHeight: '100dvh', alignItems: 'center', justifyContent: 'center' }}
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <Box mx="auto" w="full" maxW="7xl" px={4} py={24}>
          <m.div variants={itemVariants}>
            <PageHeader heading={t.blog.title} text={t.blog.description} />
          </m.div>

          <m.div style={{ marginTop: 48 }} variants={containerVariants}>
            <Grid gap={6}>
              {posts.map((post, index) => (
                <m.div key={index} variants={itemVariants}>
                  <Card>
                    <CardHeader>
                      <CardTitle>
                        <ChakraLink href={`/blog/${post.slug}`} fontWeight="bold" fontSize="xl" _hover={{ color: 'blue.600' }}>
                          {post.title}
                        </ChakraLink>
                      </CardTitle>
                    </CardHeader>

                    <Flex color="gray.500" mb={4} align="center" gap={4} px={6} fontSize="sm">
                      <Flex align="center" gap={1}>
                        <Calendar size={16} />
                        <span>{post.date}</span>
                      </Flex>
                      <Flex align="center" gap={1}>
                        <Clock size={16} />
                        <span>{post.readTime}</span>
                      </Flex>
                    </Flex>

                    <CardContent>
                      <Text color="gray.500" mb={4}>{post.description}</Text>

                      <Flex flexWrap="wrap" gap={2}>
                        {post.tags.map((tag) => (
                          <Badge key={tag} icon>
                            {tag}
                          </Badge>
                        ))}
                      </Flex>
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
