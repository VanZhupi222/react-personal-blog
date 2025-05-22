import { Card, CardContent } from '@/components/ui/Card';

export function SteamCardSkeleton() {
  return (
    <Card className="bg-card text-card-foreground border-border border shadow-lg">
      <CardContent className="relative flex h-full min-h-[320px] flex-col pt-6">
        <div className="mb-4 flex items-center justify-between">
          <div className="bg-muted/60 h-8 w-40 animate-pulse rounded" />
          <div className="bg-muted/60 h-8 w-8 animate-pulse rounded-full" />
        </div>
        <div className="flex flex-1 flex-col space-y-6">
          <div className="flex items-center gap-4">
            <div className="bg-muted/60 h-12 w-12 animate-pulse rounded-full" />
            <div className="flex-1">
              <div className="bg-muted/60 mb-2 h-5 w-32 animate-pulse rounded" />
              <div className="bg-muted/60 h-4 w-20 animate-pulse rounded" />
            </div>
            <div className="ml-auto text-right">
              <div className="bg-muted/60 mb-1 h-4 w-24 animate-pulse rounded" />
              <div className="bg-muted/60 h-5 w-16 animate-pulse rounded" />
            </div>
          </div>
          <div>
            <div className="bg-muted/60 mb-4 h-4 w-24 animate-pulse rounded" />
            {[1, 2, 3].map((i) => (
              <div key={i} className="mb-2 flex items-center gap-3">
                <div className="bg-muted/60 h-10 w-16 animate-pulse rounded" />
                <div className="flex-1">
                  <div className="bg-muted/60 mb-1 h-4 w-32 animate-pulse rounded" />
                  <div className="bg-muted/60 h-4 w-16 animate-pulse rounded" />
                </div>
                <div className="bg-muted/60 h-4 w-10 animate-pulse rounded" />
              </div>
            ))}
          </div>
          <div className="mt-2 flex justify-center">
            <div className="bg-muted/60 h-8 w-40 animate-pulse rounded-full" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
