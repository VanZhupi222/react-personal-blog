export function SkeletonProjectList() {
  return (
    <div className="mt-12 grid gap-6">
      {[1, 2].map((i) => (
        <div
          key={i}
          className="bg-muted flex w-full animate-pulse flex-col gap-4 rounded-lg p-8 shadow"
        >
          <div className="bg-muted-foreground/20 h-6 w-1/3 rounded" />
          <div className="bg-muted-foreground/10 h-4 w-1/2 rounded" />
          <div className="bg-muted-foreground/10 h-4 w-full rounded" />
          <div className="mt-2 flex gap-2">
            <div className="bg-muted-foreground/20 h-6 w-20 rounded" />
            <div className="bg-muted-foreground/20 h-6 w-20 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}
