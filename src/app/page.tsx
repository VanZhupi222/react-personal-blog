'use client';

import { LazyMotion, domAnimation, m } from 'framer-motion';
import Link from 'next/link';
import { useTranslations } from '@/lib/hooks/useTranslations';
import { GradientParallaxSection } from '@/components/ui/ParallaxSection';
import { Languages } from 'lucide-react';
import { Box, Flex, Button, Text, Heading, Grid, GridItem, IconButton, VStack } from '@chakra-ui/react';

export default function WelcomePage() {
  const { t, locale, setLocale } = useTranslations();

  const toggleLocale = () => {
    setLocale(locale === 'en' ? 'zh' : 'en');
  };

  return (
    <LazyMotion features={domAnimation}>
      <Box h="100vh" overflowY="auto" perspective="1000px">
        {/* 语言切换按钮 */}
        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <IconButton
            position="fixed"
            top={4}
            right={4}
            zIndex={50}
            onClick={toggleLocale}
            size="sm"
            variant="ghost"
            bg="whiteAlpha.100"
            backdropFilter="blur(8px)"
            borderWidth={1}
            borderColor="whiteAlpha.100"
            color="white"
            _hover={{ bg: 'whiteAlpha.200' }}
            aria-label="Switch language"
          >
            <Languages size={16} />
            <Text ml={2} fontSize="sm">
              {locale === 'en' ? '中文' : 'English'}
            </Text>
          </IconButton>
        </m.div>

        {/* Hero Section - 深邃的午夜蓝到深紫渐变 */}
        <GradientParallaxSection
          gradientFrom="oklch(0.15 0.2 260)"
          gradientVia="oklch(0.2 0.18 265)"
          gradientTo="oklch(0.25 0.15 270)"
          className="text-white"
        >
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Box maxW={{ base: 'sm', sm: 'none' }} mx="auto" textAlign="center">
              <VStack gap={{ base: 6, sm: 8 }}>
                <m.div
                  initial={{ scale: 0.95 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                >
                  <VStack gap={2}>
                    <Heading
                      as="h1"
                      fontSize={{ base: '3xl', sm: '5xl', md: '6xl' }}
                      fontWeight="bold"
                      color="white"
                      textShadow="sm"
                      lineHeight="tight"
                    >
                      {t.welcome.name}
                    </Heading>
                    <Text
                      fontSize={{ base: 'xl', sm: '2xl', md: '3xl' }}
                      fontWeight="semibold"
                      color="whiteAlpha.900"
                      textShadow="sm"
                      mt={2}
                    >
                      Zhupi222
                    </Text>
                    <Text
                      fontSize={{ base: 'xl', sm: '2xl', md: '3xl' }}
                      fontWeight="semibold"
                      color="whiteAlpha.900"
                      textShadow="sm"
                      mt={1}
                    >
                      范世杰
                    </Text>
                  </VStack>
                </m.div>

                <m.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  <Flex
                    direction={{ base: 'column', sm: 'row' }}
                    align="center"
                    justify="center"
                    gap={{ base: 2, sm: 4 }}
                    fontSize={{ base: 'lg', sm: 'xl' }}
                    color="whiteAlpha.800"
                  >
                    <Text>{t.welcome.role.fullstack}</Text>
                    <Text display={{ base: 'none', sm: 'block' }} color="whiteAlpha.600">|</Text>
                    <Text>{t.welcome.role.tech}</Text>
                    <Text display={{ base: 'none', sm: 'block' }} color="whiteAlpha.600">|</Text>
                    <Text>{t.welcome.role.game}</Text>
                  </Flex>
                </m.div>

                <m.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  <Box pt={4}>
                    <Link href="/home">
                      <Button
                        h={11}
                        px={8}
                        fontSize="sm"
                        fontWeight="medium"
                        bg="whiteAlpha.100"
                        color="white"
                        _hover={{ bg: 'whiteAlpha.200', transform: 'scale(1.05)' }}
                        _focus={{ outline: 'none', ring: 2, ringColor: 'white', ringOffset: 2 }}
                        _disabled={{ pointerEvents: 'none', opacity: 0.5 }}
                        transition="all"
                        boxShadow="md"
                      >
                        {t.welcome.enter}
                      </Button>
                    </Link>
                  </Box>
                </m.div>
              </VStack>
            </Box>
          </m.div>
        </GradientParallaxSection>

        {/* Tech Stack Section - 承接深紫，过渡到靛蓝 */}
        <GradientParallaxSection
          gradientFrom="oklch(0.25 0.15 270)"
          gradientVia="oklch(0.3 0.2 275)"
          gradientTo="oklch(0.25 0.15 280)"
          className="text-white"
        >
          <m.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Box textAlign="center">
              <Heading as="h2" fontSize="4xl" fontWeight="bold" mb={8} color="white" textShadow="sm">
                {t.welcome.techStack.title}
              </Heading>
              <Grid
                templateColumns={{ base: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }}
                gap={8}
              >
                {t.welcome.techStack.items.map((tech) => (
                  <GridItem
                    key={tech}
                    bg="whiteAlpha.50"
                    backdropFilter="blur(8px)"
                    borderRadius="lg"
                    p={6}
                    _hover={{ transform: 'scale(1.05)', bg: 'whiteAlpha.100' }}
                    transition="transform"
                    borderWidth={1}
                    borderColor="whiteAlpha.100"
                  >
                    <Heading as="h3" fontSize="xl" fontWeight="semibold" color="white">
                      {tech}
                    </Heading>
                  </GridItem>
                ))}
              </Grid>
            </Box>
          </m.div>
        </GradientParallaxSection>

        {/* Projects Section - 承接靛蓝，过渡到深蓝紫 */}
        <GradientParallaxSection
          gradientFrom="oklch(0.25 0.15 280)"
          gradientVia="oklch(0.3 0.2 285)"
          gradientTo="oklch(0.25 0.15 290)"
          className="text-white"
        >
          <m.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Box textAlign="center">
              <Heading as="h2" fontSize="4xl" fontWeight="bold" mb={8} color="white" textShadow="sm">
                {t.welcome.projects.title}
              </Heading>
              <Grid
                templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }}
                gap={8}
              >
                {t.welcome.projects.items.map((project) => (
                  <GridItem
                    key={project.title}
                    bg="whiteAlpha.50"
                    backdropFilter="blur(8px)"
                    borderRadius="lg"
                    p={8}
                    _hover={{ transform: 'scale(1.05)', bg: 'whiteAlpha.100' }}
                    transition="transform"
                    borderWidth={1}
                    borderColor="whiteAlpha.100"
                  >
                    <Heading as="h3" fontSize="2xl" fontWeight="semibold" mb={4} color="white">
                      {project.title}
                    </Heading>
                    <Text color="whiteAlpha.800">{project.description}</Text>
                  </GridItem>
                ))}
              </Grid>
            </Box>
          </m.div>
        </GradientParallaxSection>

        {/* Contact Section - 承接深蓝紫，过渡到深紫罗兰 */}
        <GradientParallaxSection
          gradientFrom="oklch(0.25 0.15 290)"
          gradientVia="oklch(0.2 0.2 295)"
          gradientTo="oklch(0.15 0.15 300)"
          className="text-white"
        >
          <m.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Box textAlign="center">
              <Heading as="h2" fontSize="4xl" fontWeight="bold" mb={8} color="white" textShadow="sm">
                {t.welcome.contact.title}
              </Heading>
              <Box maxW="2xl" mx="auto">
                <Text fontSize="xl" mb={8} color="whiteAlpha.800">
                  {t.welcome.contact.description}
                </Text>
                <Flex justify="center" gap={6}>
                  {t.welcome.contact.platforms.map((platform) => (
                    <Button
                      key={platform}
                      bg="whiteAlpha.50"
                      backdropFilter="blur(8px)"
                      borderRadius="lg"
                      px={6}
                      py={3}
                      _hover={{ transform: 'scale(1.05)', bg: 'whiteAlpha.100' }}
                      transition="transform"
                      borderWidth={1}
                      borderColor="whiteAlpha.100"
                      color="white"
                    >
                      {platform}
                    </Button>
                  ))}
                </Flex>
              </Box>
            </Box>
          </m.div>
        </GradientParallaxSection>
      </Box>
    </LazyMotion>
  );
}
