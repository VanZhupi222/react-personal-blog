'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { LucideIcon } from 'lucide-react';
import { Card } from './Card';

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
      <Card className="group hover:border-primary transition-colors">
        <Icon className="w-6 h-6 mb-4" />
        <h2 className="text-xl font-semibold mb-2">{title}</h2>
        <p className="text-muted-foreground mb-4">{description}</p>
        <span className="text-primary group-hover:translate-x-1 transition-transform inline-flex items-center">
          {actionText} <ArrowRight className="ml-1 h-4 w-4" />
        </span>
      </Card>
    </Link>
  );
}