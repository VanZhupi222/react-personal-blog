'use client';

import * as React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { motion } from 'framer-motion';
import { LanguageSwitch } from './LanguageSwitch';
import { Box, Flex, IconButton } from '@chakra-ui/react';

const controlVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.5,
    },
  },
};

export function ControlPanel() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={controlVariants}
    >
      <Box
        position="fixed"
        top={4}
        right={4}
        zIndex={50}
        bg="white"
        borderRadius="full"
        borderWidth={1}
        borderColor="gray.200"
        p={2}
        boxShadow="sm"
        backdropFilter="blur(8px)"
    >
        <Flex gap={2} align="center">
      <LanguageSwitch />
          <IconButton
            aria-label="Toggle theme"
        onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            size="sm"
            variant="ghost"
            _hover={{ bg: 'gray.100' }}
      >
        {mounted ? theme === 'light' ? <Moon size={18} /> : <Sun size={18} /> : null}
          </IconButton>
        </Flex>
      </Box>
    </motion.div>
  );
}
