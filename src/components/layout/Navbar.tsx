'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Moon, Sun, Menu, X } from 'lucide-react';
import { useTheme } from 'next-themes';
import { motion } from 'framer-motion';
import { LanguageSwitch } from '@/components/features/ControlPanel/LanguageSwitch';
import { useTranslations } from '@/lib/hooks/useTranslations';
import { Box, Flex, Button, IconButton, VStack, Text, Heading } from '@chakra-ui/react';

const languages = [
  { code: 'en', name: 'English' },
  { code: 'zh', name: '中文' },
];

export function Navbar() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);
  const { t, locale, setLocale } = useTranslations();

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Hide navbar on the entrance page
  if (pathname === '/') {
    return null;
  }

  return (
    <Box
      as="nav"
      position="sticky"
      top={0}
      zIndex={50}
      w="full"
      borderBottomWidth={1}
      borderColor="border"
      bg="background"
      backdropFilter="blur(8px)"
      className="dark:bg-background dark:border-border"
    >
      <Flex
        h={14}
        align="center"
        px={6}
        pr={1}
        maxW="container.xl"
        mx="auto"
      >
        <Flex align="center" gap={8}>
          <Link href="/">
            <Heading as="span" size="md" fontWeight="bold" className="text-foreground">
              Zhupi222
            </Heading>
          </Link>
          <Flex
            display={{ base: 'none', md: 'flex' }}
            align="center"
            gap={6}
            fontSize="sm"
            fontWeight="medium"
          >
            <Link href="/home">
              <Text className="text-muted-foreground hover:text-foreground">
                {t.home.title}
              </Text>
            </Link>
            <Link href="/about">
              <Text className="text-muted-foreground hover:text-foreground">
                {t.about.title}
              </Text>
            </Link>
            <Link href="/projects">
              <Text className="text-muted-foreground hover:text-foreground">
                {t.projects.title}
              </Text>
            </Link>
            <Link href="/blog">
              <Text className="text-muted-foreground hover:text-foreground">
                {t.blog.title}
              </Text>
            </Link>
            <Link href="/contact">
              <Text className="text-muted-foreground hover:text-foreground">
                {t.contact.title}
              </Text>
            </Link>
          </Flex>
        </Flex>
        <Flex flex={1} align="center" justify="flex-end">
          {/* Desktop controls */}
          <Flex
            display={{ base: 'none', md: 'flex' }}
            align="center"
            gap={2}
          >
            <LanguageSwitch />
            <IconButton
              aria-label="Toggle theme"
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              size="sm"
              variant="ghost"
              className="text-muted-foreground hover:text-foreground hover:bg-accent"
            >
              {mounted ? theme === 'light' ? <Moon size={20} /> : <Sun size={20} /> : null}
            </IconButton>
          </Flex>
          {/* Mobile menu button */}
          <IconButton
            display={{ base: 'flex', md: 'none' }}
            aria-label="Toggle menu"
            onClick={() => setIsOpen(!isOpen)}
            size="sm"
            variant="ghost"
            className="text-muted-foreground hover:text-foreground hover:bg-accent"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </IconButton>
        </Flex>
      </Flex>

      {/* Mobile menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          <Box
            display={{ base: 'block', md: 'none' }}
            borderTopWidth={1}
            borderColor="border"
            bg="background"
            backdropFilter="blur(8px)"
            className="dark:bg-background dark:border-border"
          >
            <Box py={4} maxW="container.xl" mx="auto">
              <VStack align="stretch" gap={4} px={6}>
                <Link href="/home" onClick={() => setIsOpen(false)}>
                  <Text className="text-muted-foreground hover:text-foreground">
                    {t.home.title}
                  </Text>
                </Link>
                <Link href="/about" onClick={() => setIsOpen(false)}>
                  <Text className="text-muted-foreground hover:text-foreground">
                    {t.about.title}
                  </Text>
                </Link>
                <Link href="/projects" onClick={() => setIsOpen(false)}>
                  <Text className="text-muted-foreground hover:text-foreground">
                    {t.projects.title}
                  </Text>
                </Link>
                <Link href="/blog" onClick={() => setIsOpen(false)}>
                  <Text className="text-muted-foreground hover:text-foreground">
                    {t.blog.title}
                  </Text>
                </Link>
                <Link href="/contact" onClick={() => setIsOpen(false)}>
                  <Text className="text-muted-foreground hover:text-foreground">
                    {t.contact.title}
                  </Text>
                </Link>
                <Box borderTopWidth={1} borderColor="border" pt={4} className="dark:border-border">
                  <VStack align="stretch" gap={4}>
                    <Box>
                      <Text fontSize="sm" fontWeight="medium" className="text-muted-foreground" mb={2} px={2}>
                        Language
                      </Text>
                      <VStack align="stretch" gap={1}>
                        {languages.map((lang) => (
                          <Button
                            key={lang.code}
                            onClick={() => {
                              setLocale(lang.code);
                              setIsOpen(false);
                            }}
                            variant="ghost"
                            justifyContent="flex-start"
                            px={2}
                            py={2}
                            className={`${
                              locale === lang.code
                                ? 'bg-accent text-accent-foreground'
                                : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                            }`}
                          >
                            {lang.name}
                          </Button>
                        ))}
                      </VStack>
                    </Box>
                    <Box>
                      <Text fontSize="sm" fontWeight="medium" className="text-muted-foreground" mb={2} px={2}>
                        Theme
                      </Text>
                      <Button
                        onClick={() => {
                          setTheme(theme === 'light' ? 'dark' : 'light');
                          setIsOpen(false);
                        }}
                        variant="ghost"
                        justifyContent="flex-start"
                        px={2}
                        py={2}
                        className="text-muted-foreground hover:text-foreground hover:bg-accent"
                      >
                        {mounted ? (
                          theme === 'light' ? (
                            <>
                              <Moon size={20} opacity={0.7} />
                              <Text ml={2}>Dark Mode</Text>
                            </>
                          ) : (
                            <>
                              <Sun size={20} opacity={0.7} />
                              <Text ml={2}>Light Mode</Text>
                            </>
                          )
                        ) : null}
                      </Button>
                    </Box>
                  </VStack>
                </Box>
              </VStack>
            </Box>
          </Box>
        </motion.div>
      )}
    </Box>
  );
}
