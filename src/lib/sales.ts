export const salesGraphics = [
  { file: 'sale-1.jpg', alt: 'Recent sale announcement 1' },
  { file: 'sale-3.jpg', alt: 'Recent sale announcement 2' },
  { file: 'sale-5.jpg', alt: 'Recent sale announcement 3' },
  { file: 'sale-6.jpg', alt: 'Recent sale announcement 4' },
  { file: 'sale-7.jpg', alt: 'Recent sale announcement 5' },
  { file: 'sale-8.jpg', alt: 'Recent sale announcement 6' },
  { file: 'sale-9.jpg', alt: 'Recent sale announcement 7' },
  { file: 'sale-10.jpg', alt: 'Recent sale announcement 8' },
  { file: 'sale-11.jpg', alt: 'Recent sale announcement 9' },
  { file: 'sale-12.jpg', alt: 'Recent sale announcement 10' },
  { file: 'sale-13.jpg', alt: 'Recent sale announcement 11' },
  { file: 'sale-14.jpg', alt: 'Recent sale announcement 12' },
  { file: 'sale-16.jpg', alt: 'Recent sale announcement 13' },
  { file: 'sale-18.jpg', alt: 'Recent sale announcement 14' },
] as const;

export function salesSrc(file: string): string {
  return `/sales/${encodeURIComponent(file)}`;
}
