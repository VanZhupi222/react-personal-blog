import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import React from 'react';

interface ContactCardProps {
  icon: React.ReactNode;
  title: React.ReactNode;
  children: React.ReactNode;
  cardClassName?: string;
  headerClassName?: string;
  contentClassName?: string;
}

export function ContactCard({
  icon,
  title,
  children,
  cardClassName = '',
  headerClassName = '',
  contentClassName = '',
}: ContactCardProps) {
  return (
    <Card
      className={`flex h-full flex-col p-6 shadow-xl transition-transform duration-200 hover:-translate-y-2 hover:shadow-2xl ${cardClassName}`}
    >
      <CardHeader className={`pt-2 pb-0 ${headerClassName}`}>
        <CardTitle className="mx-auto flex items-center gap-2 text-xl font-bold">
          {icon}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent
        className={`flex flex-1 flex-col items-center justify-center ${contentClassName}`}
      >
        {children}
      </CardContent>
    </Card>
  );
}
