import React, { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

const ThemeSwitch = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <button
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      className="text-primary-foreground hover:bg-primary-hover/30 inline-flex items-center justify-center rounded-md p-1.5"
      aria-label="Toggle theme"
    >
      {mounted ? theme === 'light' ? <Moon size={20} /> : <Sun size={20} /> : null}
    </button>
  );
};

export default ThemeSwitch;
