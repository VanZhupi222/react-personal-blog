'use client';
import { LanguageSwitch } from './LanguageSwitch';
import ThemeSwitch from './ThemeSwitch';

export function ControlPanel() {
  return (
    <div className="fixed top-4 right-4 z-50 flex items-center gap-2 rounded-full border border-white/10 bg-white/10 p-2 shadow-sm backdrop-blur">
      <LanguageSwitch />
      <ThemeSwitch />
    </div>
  );
}
