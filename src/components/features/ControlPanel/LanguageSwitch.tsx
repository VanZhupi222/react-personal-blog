'use client';

import * as React from 'react';
import { Globe } from 'lucide-react';
import { useTranslations } from '@/lib/hooks/useTranslations';
import { Box, Button, IconButton, VStack } from '@chakra-ui/react';

const languages = [
  { code: 'en', name: 'English' },
  { code: 'zh', name: '中文' },
];

export function LanguageSwitch() {
  const { locale, setLocale } = useTranslations();
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Box position="relative">
      <IconButton
        aria-label="Switch language"
        size="sm"
        variant="ghost"
        _hover={{ bg: 'gray.100' }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <Globe size={18} />
      </IconButton>
      {isOpen && (
        <Box
          position="absolute"
          top="100%"
          right={0}
          mt={2}
          bg="white"
          borderRadius="md"
          boxShadow="md"
          borderWidth={1}
          borderColor="gray.200"
          zIndex={50}
        >
          <VStack align="stretch" gap={1} p={2}>
        {languages.map((lang) => (
              <Button
            key={lang.code}
                onClick={() => {
                  setLocale(lang.code);
                  setIsOpen(false);
                }}
                variant="ghost"
                justifyContent="flex-start"
                size="sm"
                bg={locale === lang.code ? 'gray.100' : 'transparent'}
                _hover={{ bg: 'gray.100' }}
          >
            {lang.name}
              </Button>
        ))}
          </VStack>
        </Box>
      )}
    </Box>
  );
}
