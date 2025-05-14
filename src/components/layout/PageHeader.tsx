interface PageHeaderProps {
  heading: string;
  text?: string;
}

export function PageHeader({ heading, text }: PageHeaderProps) {
  return (
    <div className="space-y-2">
      <h1 className="text-3xl font-bold tracking-tight">{heading}</h1>
      {text && <p className="text-lg text-muted-foreground">{text}</p>}
    </div>
  );
} 