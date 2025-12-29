export function getPastelColors(count: number): string[] {
  return Array.from({ length: count }, (_, i) => {
    const hue = Math.round((360 / count) * i);
    return `hsl(${hue}, 70%, 75%)`;
  });
}
