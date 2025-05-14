import Link from 'next/link';
import { LucideIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';

interface FeatureCardProps {
  href: string;
  icon: LucideIcon;
  title: string;
  description: string;
  actionText: string;
}

export function FeatureCard({ href, icon: Icon, title, description, actionText }: FeatureCardProps) {
  return (
    <Link href={href}>
      <Card className="h-full transition-colors hover:bg-accent/10">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center text-center space-y-4">
            <Icon className="w-8 h-8" />
            <div className="space-y-2">
              <h3 className="text-xl font-semibold">{title}</h3>
              <p className="text-muted-foreground">{description}</p>
              <p className="text-sm font-medium text-foreground/80">{actionText}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
} 