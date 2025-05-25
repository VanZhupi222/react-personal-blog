import { cn } from '@/lib/utils';
import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

interface Game {
  appid: number;
  name: string;
}

export function Card({ children, className, ...props }: CardProps) {
  return (
    <div className={cn('bg-card rounded-lg border p-6', className)} {...props}>
      {children}
    </div>
  );
}

export function CardHeader({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn('mb-4 flex items-start justify-between', className)}>{children}</div>;
}

export function CardTitle({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <h3 className={cn('text-xl font-semibold', className)}>{children}</h3>;
}

export function CardDescription({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <p className={cn('text-muted-foreground', className)}>{children}</p>;
}

export function CardContent({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn('', className)}>{children}</div>;
}

export function CardImage({ hoveredGame }: { hoveredGame: Game | null }) {
  return (
    <AnimatePresence mode="wait">
      {hoveredGame ? (
        <motion.img
          key={hoveredGame.appid}
          src={`https://cdn.cloudflare.steamstatic.com/steam/apps/${hoveredGame.appid}/library_hero.jpg`}
          alt={hoveredGame.name}
          className="max-h-[70vh] max-w-[90%] rounded-2xl border-4 border-white/10 object-cover object-center shadow-2xl"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          style={{
            boxShadow: '0 8px 32px 0 rgba(0,0,0,0.35)',
            background: 'rgba(0,0,0,0.1)',
          }}
        />
      ) : (
        <motion.div
          key="placeholder"
          className="text-muted-foreground text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          将鼠标悬停在左侧游戏上预览大图
        </motion.div>
      )}
    </AnimatePresence>
  );
}
