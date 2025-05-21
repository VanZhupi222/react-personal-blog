export function GlobalLoading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-card rounded px-6 py-4 shadow-lg">
        <span className="animate-pulse text-lg font-bold">Loading...</span>
      </div>
    </div>
  );
}
