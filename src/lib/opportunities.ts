export type ListingType = 'BUY' | 'RENT';
export type SizeUnit = 'sqft' | 'sqm';

export interface Opportunity {
  id: number;
  title: string;
  description: string;
  price: string;
  priceInr: number;
  rentInr: number;
  location: string;
  size: string;
  sizeSqft: number;
  beds: number;
  listingType: ListingType;
  lifestyles: string[];
  image: string;
}

export interface FilterState {
  listingType: ListingType;
  minBeds: number | null;
  minPrice: number | null;
  maxPrice: number | null;
  minSize: number | null;
  maxSize: number | null;
  sizeUnit: SizeUnit;
  lifestyles: string[];
}

export const lifestyleOptions = [
  'City Living',
  'Gated Society',
  'Clubhouse',
  'Metro Access',
  'IT Corridor',
  'Sea Facing',
  'Golf',
  'Skyline Views',
  'Hill View',
  'Park Facing',
  'Vastu Compliant',
  'Ready-to-move-in',
  'Under Construction',
  'Investment Opportunities',
  'NRI Friendly',
  'Pet-Friendly',
  'Private Living',
  'Modern',
  'Family Living',
  'Podium Amenities',
  'Power Backup',
  'Waterfront',
] as const;

export const bedroomOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] as const;

export const buyPriceOptions = [
  { label: 'Min Price', value: '' },
  { label: '₹50L', value: '5000000' },
  { label: '₹1 Cr', value: '10000000' },
  { label: '₹2 Cr', value: '20000000' },
  { label: '₹5 Cr', value: '50000000' },
  { label: '₹10 Cr', value: '100000000' },
  { label: '₹20 Cr', value: '200000000' },
];

export const buyPriceMaxOptions = [
  { label: 'Max Price', value: '' },
  { label: '₹1 Cr', value: '10000000' },
  { label: '₹2 Cr', value: '20000000' },
  { label: '₹5 Cr', value: '50000000' },
  { label: '₹10 Cr', value: '100000000' },
  { label: '₹20 Cr', value: '200000000' },
  { label: '₹50 Cr', value: '500000000' },
];

export const rentPriceOptions = [
  { label: 'Min Rent', value: '' },
  { label: '₹25K / mo', value: '25000' },
  { label: '₹50K / mo', value: '50000' },
  { label: '₹1L / mo', value: '100000' },
  { label: '₹2L / mo', value: '200000' },
  { label: '₹5L / mo', value: '500000' },
];

export const rentPriceMaxOptions = [
  { label: 'Max Rent', value: '' },
  { label: '₹50K / mo', value: '50000' },
  { label: '₹1L / mo', value: '100000' },
  { label: '₹2L / mo', value: '200000' },
  { label: '₹5L / mo', value: '500000' },
  { label: '₹10L / mo', value: '1000000' },
];

export const defaultFilters: FilterState = {
  listingType: 'BUY',
  minBeds: null,
  minPrice: null,
  maxPrice: null,
  minSize: null,
  maxSize: null,
  sizeUnit: 'sqft',
  lifestyles: [],
};

export const opportunities: Opportunity[] = [
  {
    id: 1,
    title: 'Sea Face Villa, Worli',
    description:
      'Premium sea-facing villa investment with strong appreciation potential in South Mumbai.',
    price: '₹18.5 Cr',
    priceInr: 185000000,
    rentInr: 850000,
    location: 'Worli, Mumbai',
    size: '4,200 sq.ft.',
    sizeSqft: 4200,
    beds: 4,
    listingType: 'BUY',
    lifestyles: ['Sea Facing', 'Private Living', 'Investment Opportunities', 'Skyline Views'],
    image: '/arreat-luxury-villa.png',
  },
  {
    id: 2,
    title: 'The Azure Penthouse, Indiranagar',
    description:
      'Exclusive Bengaluru penthouse with panoramic city views and premium lifestyle amenities.',
    price: '₹6.8 Cr',
    priceInr: 68000000,
    rentInr: 350000,
    location: 'Indiranagar, Bengaluru',
    size: '3,800 sq.ft.',
    sizeSqft: 3800,
    beds: 3,
    listingType: 'BUY',
    lifestyles: ['Skyline Views', 'City Living', 'Modern', 'IT Corridor'],
    image: '/arreat-curating-villa.png',
  },
  {
    id: 3,
    title: 'Golf Course Estate, Gurugram',
    description:
      'Luxury residence beside the golf course, delivering strong rental yields and capital growth.',
    price: '₹4.2L / mo',
    priceInr: 95000000,
    rentInr: 420000,
    location: 'Golf Course Road, Gurugram',
    size: '5,100 sq.ft.',
    sizeSqft: 5100,
    beds: 5,
    listingType: 'RENT',
    lifestyles: ['Golf', 'Gated Society', 'City Living', 'Investment Opportunities'],
    image: '/luxury-pool.png',
  },
];

function toSqft(value: number, unit: SizeUnit) {
  return unit === 'sqft' ? value : value * 10.7639;
}

export function filterOpportunities(
  items: Opportunity[],
  filters: FilterState
): Opportunity[] {
  return items.filter((item) => {
    if (item.listingType !== filters.listingType) return false;

    if (filters.minBeds !== null && item.beds < filters.minBeds) return false;

    const amount = filters.listingType === 'BUY' ? item.priceInr : item.rentInr;
    if (filters.minPrice !== null && amount < filters.minPrice) return false;
    if (filters.maxPrice !== null && amount > filters.maxPrice) return false;

    const minSizeSqft =
      filters.minSize !== null ? toSqft(filters.minSize, filters.sizeUnit) : null;
    const maxSizeSqft =
      filters.maxSize !== null ? toSqft(filters.maxSize, filters.sizeUnit) : null;

    if (minSizeSqft !== null && item.sizeSqft < minSizeSqft) return false;
    if (maxSizeSqft !== null && item.sizeSqft > maxSizeSqft) return false;

    if (filters.lifestyles.length > 0) {
      const hasMatch = filters.lifestyles.some((lifestyle) =>
        item.lifestyles.includes(lifestyle)
      );
      if (!hasMatch) return false;
    }

    return true;
  });
}
