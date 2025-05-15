'use client';

import { LazyMotion, domAnimation, m } from 'framer-motion';
import Link from 'next/link';
import { useTranslations } from '@/lib/hooks/useTranslations';
import { GradientParallaxSection } from '@/components/ui/ParallaxSection';
import { Languages } from 'lucide-react';

export default function WelcomePage() {
  const { t, locale, setLocale } = useTranslations();

  const toggleLocale = () => {
    setLocale(locale === 'en' ? 'zh' : 'en');
  };

  return (
    <LazyMotion features={domAnimation}>
      <div className="h-screen overflow-y-auto perspective-1000">
        {/* 语言切换按钮 */}
        <m.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          onClick={toggleLocale}
          className="fixed top-4 right-4 z-50 p-2 rounded-full
                   bg-white/10 backdrop-blur-sm border border-white/10
                   text-white hover:bg-white/20 transition-colors
                   flex items-center gap-2 text-sm"
        >
          <Languages className="w-4 h-4" />
          <span>{locale === 'en' ? '中文' : 'English'}</span>
        </m.button>

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
            className="max-w-sm space-y-6 text-center sm:max-w-none sm:space-y-8"
          >
            <m.div
              className="space-y-2"
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1, ease: 'easeOut' }}
            >
              <h1 className="text-4xl leading-tight font-bold text-white drop-shadow-sm sm:text-6xl md:text-7xl">
                {t.welcome.name}
              </h1>
              <h2 className="text-3xl font-bold text-white/90 drop-shadow-sm sm:text-5xl md:text-6xl">
                {t.welcome.nickname}
              </h2>
            </m.div>

            <m.p
              className="flex flex-col items-center justify-center gap-2 text-lg text-white/80 sm:flex-row sm:gap-4 sm:text-xl"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <span>{t.welcome.role.fullstack}</span>
              <span className="hidden sm:inline text-white/60">|</span>
              <span>{t.welcome.role.tech}</span>
              <span className="hidden sm:inline text-white/60">|</span>
              <span>{t.welcome.role.game}</span>
            </m.p>

            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="pt-4"
            >
              <Link
                href="/home"
                className="inline-flex h-11 items-center justify-center rounded-md px-8 text-sm font-medium
                         bg-white/10 text-white hover:bg-white/20
                         shadow-md transition-all hover:scale-105
                         focus-visible:outline-none focus-visible:ring-2
                         focus-visible:ring-white focus-visible:ring-offset-2
                         disabled:pointer-events-none disabled:opacity-50"
              >
                {t.welcome.enter}
              </Link>
            </m.div>
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
            className="text-center"
          >
            <h2 className="text-4xl font-bold mb-8 text-white drop-shadow-sm">{t.welcome.techStack.title}</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {t.welcome.techStack.items.map((tech) => (
                <div
                  key={tech}
                  className="bg-white/5 backdrop-blur-sm rounded-lg p-6 hover:scale-105
                           transition-transform border border-white/10 hover:bg-white/10"
                >
                  <h3 className="text-xl font-semibold text-white">{tech}</h3>
                </div>
              ))}
            </div>
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
            className="text-center"
          >
            <h2 className="text-4xl font-bold mb-8 text-white drop-shadow-sm">{t.welcome.projects.title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {t.welcome.projects.items.map((project) => (
                <div
                  key={project.title}
                  className="bg-white/5 backdrop-blur-sm rounded-lg p-8 hover:scale-105
                           transition-transform border border-white/10 hover:bg-white/10"
                >
                  <h3 className="text-2xl font-semibold mb-4 text-white">{project.title}</h3>
                  <p className="text-white/80">{project.description}</p>
                </div>
              ))}
            </div>
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
            className="text-center"
          >
            <h2 className="text-4xl font-bold mb-8 text-white drop-shadow-sm">{t.welcome.contact.title}</h2>
            <div className="max-w-2xl mx-auto">
              <p className="text-xl mb-8 text-white/80">
                {t.welcome.contact.description}
              </p>
              <div className="flex justify-center space-x-6">
                {t.welcome.contact.platforms.map((platform) => (
                  <button
                    key={platform}
                    className="bg-white/5 backdrop-blur-sm rounded-lg px-6 py-3
                             hover:scale-105 transition-transform border border-white/10
                             text-white hover:bg-white/10"
                  >
                    {platform}
                  </button>
                ))}
              </div>
            </div>
          </m.div>
        </GradientParallaxSection>
      </div>
    </LazyMotion>
  );
}
