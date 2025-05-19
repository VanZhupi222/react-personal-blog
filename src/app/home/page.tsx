'use client';

import { Code, User, Briefcase } from 'lucide-react';
import { LazyMotion, domAnimation, m } from 'framer-motion';
import { FeatureCard } from '@/components/features/FeatureCard';
import { Card, CardContent } from '@/components/ui/Card';
import { useTranslations } from '@/lib/hooks/useTranslations';
import React from 'react';
import { SteamStatsCard } from '@/components/features/SteamStatsCard';
import { Box, Grid, Heading, Text } from '@chakra-ui/react';
import { LeetCodeStatsCard } from '@/components/features/LeetCodeStatsCard';

const features = [
  {
    href: '/about',
    icon: User,
    key: 'about' as const,
  },
  {
    href: '/projects',
    icon: Briefcase,
    key: 'projects' as const,
  },
  {
    href: '/blog',
    icon: Code,
    key: 'blog' as const,
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

export default function Home() {
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
            <m.section variants={itemVariants}>
              <Box textAlign="center" mb={8}>
                <Heading as="h1" mb={6} fontSize="4xl" fontWeight="bold" className="text-foreground">
                  {t.home.welcome}
                </Heading>
                <Text className="text-muted-foreground" mb={8} fontSize="xl">
                  {t.home.description}
                </Text>
                <Grid gap={6} templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }}>
                  {features.map((feature) => {
                    const { key, ...rest } = feature;
                    return (
                      <FeatureCard
                        key={key}
                        {...rest}
                        title={t.home.features[key].title}
                        description={t.home.features[key].description}
                        actionText={t.home.features[key].action}
                      />
                    );
                  })}
                </Grid>
              </Box>
            </m.section>

            <m.section variants={itemVariants}>
              <Heading as="h2" mb={6} textAlign="center" fontSize="2xl" fontWeight="bold" className="text-foreground">
                {t.home.activity.title}
              </Heading>
              <Grid gap={6} templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }}>
                <Card>
                  <CardContent>
                    <LeetCodeStatsCard />
                  </CardContent>
                </Card>

                <Card>
                  <CardContent>
                    <Box minH="200px">
                      <SteamStatsCard />
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            </m.section>
          </m.div>
        </Box>
      </m.div>
    </LazyMotion>
  );
}
