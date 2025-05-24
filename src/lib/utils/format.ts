export function formatPlaytime(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  if (hours < 1) {
    return `${minutes}m`;
  }
  return `${hours}h`;
}

export function formatPercentage(value: number): string {
  return value.toFixed(1) + '%';
}
