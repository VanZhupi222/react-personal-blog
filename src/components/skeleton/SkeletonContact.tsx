import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';

export default function SkeletonContact() {
  return (
    <div className="bg-background flex min-h-[100dvh] items-center justify-center px-2 py-12">
      <div className="mx-auto grid h-[260px] w-full max-w-4xl gap-8 sm:grid-cols-3">
        {[...Array(3)].map((_, idx) => (
          <Card key={idx} className="flex h-full flex-col p-6 shadow-xl">
            <CardHeader className="pt-2 pb-0">
              <CardTitle className="mx-auto flex items-center gap-2 text-xl font-bold">
                <div className="bg-muted h-7 w-7 animate-pulse rounded-full" />
                <div className="bg-muted h-6 w-24 animate-pulse rounded" />
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-1 flex-col items-center justify-center">
              <div className="mt-2 flex w-40 flex-col gap-2">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="bg-muted h-5 w-5 animate-pulse rounded-full" />
                    <div className="bg-muted h-4 w-28 animate-pulse rounded" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
