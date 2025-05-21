import { Card, CardContent } from '@/components/ui/Card';

export function LeetCodeCardSkeleton() {
  return (
    <Card className="bg-card text-card-foreground border-border border shadow-lg">
      <CardContent className="pt-6">
        <div className="mb-4 flex items-center justify-between">
          <div className="bg-muted/40 h-8 w-40 animate-pulse rounded" />
          <div className="bg-muted/40 h-8 w-8 animate-pulse rounded-full" />
        </div>
        <div className="flex min-h-[200px] flex-col gap-4">
          <div className="bg-muted/40 h-10 w-1/2 animate-pulse rounded" />
          {[1, 2, 3].map((i) => (
            <div key={i}>
              <div className="mb-2 flex items-center gap-2">
                <div className="bg-muted/40 h-4 w-20 animate-pulse rounded" />
                <div className="bg-muted/40 ml-auto h-4 w-12 animate-pulse rounded" />
              </div>
              <div className="bg-muted/40 h-2 w-full animate-pulse rounded" />
            </div>
          ))}
          <div className="mt-6 flex items-center justify-between text-xs font-semibold">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-muted/40 h-4 w-20 animate-pulse rounded" />
            ))}
          </div>
          <div className="mt-1 flex items-center justify-between text-lg font-extrabold">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-muted/40 h-6 w-12 animate-pulse rounded" />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
