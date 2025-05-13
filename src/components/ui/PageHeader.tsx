interface PageHeaderProps {
  title: string;
  description?: string;
  className?: string;
}

export function PageHeader({ title, description, className = "mb-16" }: PageHeaderProps) {
  return (
    <section className={className}>
      <h1 className="text-4xl font-bold mb-6">{title}</h1>
      {description && (
        <p className="text-xl text-muted-foreground mb-8">
          {description}
        </p>
      )}
    </section>
  );
} 