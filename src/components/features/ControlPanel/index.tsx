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
      delay: 0.5
    }
  }
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
      className="fixed top-4 right-4 z-50 flex items-center gap-2 p-2 rounded-full bg-background/95 dark:bg-accent/30 backdrop-blur border border-border/40 dark:border-accent/30 shadow-sm"
    >
      <LanguageSwitch />
      <button
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        className="inline-flex items-center justify-center rounded-full w-8 h-8 text-foreground hover:bg-accent dark:hover:bg-accent/50"
        aria-label="Toggle theme"
      >
        {mounted ? (
          theme === "light" ? <Moon size={18} /> : <Sun size={18} />
        ) : null}
      </button>
    </motion.div>
  );
} 