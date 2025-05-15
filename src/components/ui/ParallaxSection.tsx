'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// 注册 ScrollTrigger 插件
gsap.registerPlugin(ScrollTrigger);

interface ParallaxSectionProps {
  children: React.ReactNode;
  className?: string;
  bgClass?: string;
}

export const ParallaxSection = ({
  children,
  className = '',
  bgClass = '',
}: ParallaxSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const bg = bgRef.current;
    const content = contentRef.current;

    if (!section || !bg || !content) return;

    // 创建背景视差效果
    gsap.fromTo(bg,
      {
        backgroundPosition: '50% 0px',
      },
      {
        backgroundPosition: '50% 200px',
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      }
    );

    // 创建内容视差效果
    gsap.fromTo(content,
      {
        y: 0,
      },
      {
        y: -50,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.5,
        },
      }
    );

    return () => {
      // 清理 ScrollTrigger
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div
      ref={sectionRef}
      className={`relative min-h-screen overflow-hidden ${className}`}
    >
      {/* 背景层 */}
      <div
        ref={bgRef}
        className="absolute inset-0 w-full h-full"
        style={{
          background: bgClass,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          willChange: 'background-position',
        }}
      />

      {/* 内容层 */}
      <div
        ref={contentRef}
        className="relative z-10 min-h-screen flex items-center justify-center"
      >
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {children}
        </div>
      </div>
    </div>
  );
};

// 创建一个带有渐变背景的视差容器组件
export const GradientParallaxSection = ({
  children,
  className = '',
  gradientFrom,
  gradientVia,
  gradientTo,
  ...props
}: ParallaxSectionProps & {
  gradientFrom: string;
  gradientVia: string;
  gradientTo: string;
}) => {
  const bgClass = `linear-gradient(180deg, ${gradientFrom} 0%, ${gradientVia} 50%, ${gradientTo} 100%)`;

  return (
    <ParallaxSection
      bgClass={bgClass}
      className={`relative ${className}`}
      {...props}
    >
      {children}
    </ParallaxSection>
  );
};
