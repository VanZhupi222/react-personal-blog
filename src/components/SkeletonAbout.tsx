import { Card, CardContent } from '@/components/ui/Card';

export function SkeletonAbout() {
  return (
    <div className="space-y-12">
      <div className="bg-muted/40 h-12 w-1/2 animate-pulse rounded" />
      <section className="space-y-6">
        <div className="bg-muted/40 h-8 w-32 animate-pulse rounded" />
        <div className="grid gap-6 md:grid-cols-2">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i}>
              <CardContent className="pt-6">
                <div className="bg-muted/40 mb-4 h-6 w-24 animate-pulse rounded" />
                <div className="flex flex-wrap gap-2">
                  {[1, 2, 3, 4].map((j) => (
                    <div key={j} className="bg-muted/40 h-6 w-16 animate-pulse rounded" />
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
      <section className="space-y-6">
        <div className="bg-muted/40 h-8 w-32 animate-pulse rounded" />
        <div className="space-y-6">
          {[1, 2].map((i) => (
            <Card key={i}>
              <CardContent className="pt-6">
                <div className="mb-4 flex items-start justify-between">
                  <div>
                    <div className="bg-muted/40 mb-2 h-6 w-32 animate-pulse rounded" />
                    <div className="bg-muted/40 h-4 w-20 animate-pulse rounded" />
                  </div>
                  <div className="bg-muted/40 h-4 w-16 animate-pulse rounded" />
                </div>
                <div className="bg-muted/40 mb-4 h-4 w-3/4 animate-pulse rounded" />
                <ul className="space-y-2">
                  {[1, 2, 3].map((j) => (
                    <li key={j} className="bg-muted/40 h-4 w-1/2 animate-pulse rounded" />
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
