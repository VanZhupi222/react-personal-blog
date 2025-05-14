'use client';

import * as React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { motion } from 'framer-motion';
import { LanguageSwitch } from './LanguageSwitch';

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
      className="bg-background/95 dark:bg-accent/30 border-border/40 dark:border-accent/30 fixed top-4 right-4 z-50 flex items-center gap-2 rounded-full border p-2 shadow-sm backdrop-blur"
    >
      <LanguageSwitch />
      <button
        onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        className="text-foreground hover:bg-accent dark:hover:bg-accent/50 inline-flex h-8 w-8 items-center justify-center rounded-full"
        aria-label="Toggle theme"
      >
        {mounted ? theme === 'light' ? <Moon size={18} /> : <Sun size={18} /> : null}
      </button>
    </motion.div>
  );
}
