import { Card } from '@/components/ui/Card';
import { Experience } from '@/lib/about/types';
import { useIsMobile } from '@/lib/hooks/useIsMobile';
import { CollapsibleCard } from '@/components/features/CollapsibleCard';

interface ExperienceCardProps {
  exp: Experience;
  index: number;
}

export function ExperienceCard({ exp, index }: ExperienceCardProps) {
  const isMobile = useIsMobile();

  if (!isMobile) {
    // PC端直接展示全部内容
    return (
      <Card key={index} className="bg-card text-card-foreground border-border border shadow-lg">
        <div className="px-6 pt-6 pb-2">
          <div className="mb-4 flex items-start justify-between">
            <div>
              <h3 className="mb-4 text-lg font-semibold">{exp.title}</h3>
              <p className="text-muted-foreground">{exp.company}</p>
            </div>
            <span className="text-muted-foreground text-sm">{exp.period}</span>
          </div>
          <p className="text-muted-foreground mb-4">{exp.description}</p>
          <ul className="text-muted-foreground list-inside list-disc space-y-2">
            {exp.achievements.map((achievement, i) => (
              <li key={i}>{achievement}</li>
            ))}
          </ul>
        </div>
      </Card>
    );
  }

  // mobile端折叠卡片
  return (
    <CollapsibleCard
      header={
        <div>
          <h3 className="mb-1 text-base font-semibold">{exp.title}</h3>
          <p className="text-muted-foreground mb-1 text-xs">{exp.period}</p>
          <p className="text-muted-foreground text-sm">{exp.company}</p>
        </div>
      }
      className="mb-2"
    >
      <p className="text-muted-foreground mb-2 text-xs">{exp.description}</p>
      <ul className="list-disc space-y-1 pl-4">
        {exp.achievements.map((achievement, i) => (
          <li key={i} className="text-xs">
            {achievement}
          </li>
        ))}
      </ul>
    </CollapsibleCard>
  );
}
