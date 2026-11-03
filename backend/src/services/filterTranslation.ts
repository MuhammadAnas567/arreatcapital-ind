import type { ListingsQuery } from './listingsProvider.js';

export type FriendlyListingsQuery = {
  page?: string;
  limit?: string;
  purpose?: string;
  category?: string;
  propertyType?: string;
  bedrooms?: string;
  priceMin?: string;
  priceMax?: string;
  community?: string;
  search?: string;
  orderColumn?: string;
  orderDir?: string;
};

const FRIENDLY_FILTER_KEYS = [
  'page',
  'limit',
  'purpose',
  'category',
  'propertyType',
  'bedrooms',
  'priceMin',
  'priceMax',
  'community',
  'search',
  'orderColumn',
  'orderDir',
] as const;

function readString(value: unknown): string | undefined {
  if (typeof value !== 'string') return undefined;
  const trimmed = value.trim();
  return trimmed || undefined;
}

export function extractFriendlyQuery(
  query: Record<string, unknown>
): FriendlyListingsQuery {
  const params: FriendlyListingsQuery = {};

  for (const key of FRIENDLY_FILTER_KEYS) {
    const value = readString(query[key]);
    if (value !== undefined) {
      params[key] = value;
    }
  }

  return params;
}

function mapPurpose(value: string): string | undefined {
  if (value === 'rent') return 'R';
  if (value === 'sale') return 'S';
  return undefined;
}

function mapCategory(value: string): string | undefined {
  if (value === 'residential') return 'R';
  if (value === 'commercial') return 'S';
  return undefined;
}

function buildPriceParam(min?: string, max?: string): string | undefined {
  const hasMin = min !== undefined;
  const hasMax = max !== undefined;
  if (!hasMin && !hasMax) return undefined;
  return `${min ?? ''},${max ?? ''}`;
}

export function translateFriendlyQuery(
  friendly: FriendlyListingsQuery
): ListingsQuery {
  const upstream: ListingsQuery = {
    page: friendly.page,
    limit: friendly.limit,
    orderColumn: friendly.orderColumn,
    orderDir: friendly.orderDir,
  };

  if (friendly.purpose) {
    const purpose = mapPurpose(friendly.purpose);
    if (purpose) upstream.purpose = purpose;
  }

  if (friendly.category) {
    const category = mapCategory(friendly.category);
    if (category) upstream.category = category;
  }

  if (friendly.propertyType) {
    upstream.property_type = friendly.propertyType;
  }

  if (friendly.bedrooms !== undefined) {
    upstream.bedrooms = friendly.bedrooms;
  }

  const price = buildPriceParam(friendly.priceMin, friendly.priceMax);
  if (price !== undefined) {
    upstream.price = price;
  }

  if (friendly.community) {
    upstream.location = friendly.community;
  }

  if (friendly.search) {
    upstream.listing_title = friendly.search;
  }

  return upstream;
}
