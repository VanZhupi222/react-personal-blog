import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

interface SkillCardProps {
  title: string;
  items: string[];
}

export function SkillCard({ title, items }: SkillCardProps) {
  return (
    <Card>
      <CardContent className="pt-2 pb-4">
        <h3 className="mt-1 mb-4 text-lg font-semibold">{title}</h3>
        <div className="flex flex-wrap gap-2">
          {items.map((skill) => (
            <Badge key={skill}>{skill}</Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
