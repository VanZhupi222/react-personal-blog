import { Skills } from '@/lib/about/types';
import { useTranslations } from '@/lib/hooks/useTranslations';
import { Badge } from '@/components/ui/Badge';

interface SkillCardProps {
  title: string;
  items: string[];
}

export function SkillCard({ title, items }: SkillCardProps) {
  return (
    <div className="bg-card rounded-lg border p-6 shadow-md">
      <h3 className="mb-4 text-lg font-semibold">{title}</h3>
      <div className="flex flex-wrap gap-2">
        {items.map((item, i) => (
          <Badge key={i} icon={false}>
            {item}
          </Badge>
        ))}
      </div>
    </div>
  );
}

interface SkillCardListProps {
  skills: Skills | null;
}

export function SkillCardList({ skills }: SkillCardListProps) {
  const { t } = useTranslations();
  if (!skills) return null;
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {Object.entries(skills)
        .filter(([, items]) => Array.isArray(items) && items.length > 0)
        .map(([category, items]) => (
          <SkillCard
            key={category}
            title={
              t.about.skills.categories[category as keyof typeof t.about.skills.categories] ||
              category
            }
            items={items}
          />
        ))}
    </div>
  );
}
