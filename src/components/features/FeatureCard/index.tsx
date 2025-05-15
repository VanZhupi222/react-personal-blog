import Link from 'next/link';
import { LucideIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import { motion, useAnimation } from 'framer-motion';
import { useRef } from 'react';

interface FeatureCardProps {
  href: string;
  icon: LucideIcon;
  title: string;
  description: string;
  actionText: string;
}

export function FeatureCard({
  href,
  icon: Icon,
  title,
  description,
  actionText,
}: FeatureCardProps) {
  const controls = useAnimation();

  return (
    <Link href={href}>
      <motion.div
        className="h-full"
        onMouseEnter={() => controls.start({ scale: 1.12 })}
        onMouseLeave={() => controls.start({ scale: 1 })}
      >
        <Card className="hover:bg-accent/10 h-full transition-colors group">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <Icon className="h-8 w-8" />
              <div className="space-y-2">
                <h3 className="text-xl font-semibold">{title}</h3>
                <p className="text-muted-foreground">{description}</p>
                <motion.p
                  className="text-foreground/80 text-sm font-medium"
                  animate={controls}
                  transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                >
                  {actionText}
                </motion.p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </Link>
  );
}
