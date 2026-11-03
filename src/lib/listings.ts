import { API_BASE } from './config';

export type Listing = {
  id: number;
  reference: string;
  slug: string;
  title: string;
  purpose: 'rent' | 'sale';
  category: 'residential' | 'commercial';
  price: number;
  currency: 'AED' | 'INR' | string;
  bedrooms: number;
  bathrooms: number;
  size: number;
  propertyType: string;
  location: {
    city: string;
    community: string;
    subCommunity: string;
    building: string;
    region: string;
  };
  coordinates: { lat: number; lng: number } | null;
  images: { url: string; originalUrl: string }[];
  agent: {
    name: string;
    email: string;
    mobile: string;
    photo: string | null;
    licenseNo: string | null;
  } | null;
  isFeatured: boolean;
  isExclusive: boolean;
  projectStatus: string | null;
  createdAt: string;
  updatedAt: string;
};

export type ListingDetail = Listing & {
  description: string;
  amenities: string[];
  commercialAmenities: string[];
  furnished: string | null;
  permitNumber: string | null;
  parkingSpaces: number | null;
  serviceCharge: number | null;
  buildYear: string | null;
  completionStatus: string | null;
  freehold: boolean;
  projectName: string | null;
  rentalPeriod: string | null;
  videoLink: string | null;
  floorPlans: { url: string }[];
  documents: { url: string }[];
};

export type ListingsResponse = {
  data: Listing[];
  total: number;
  page: number;
  limit: number;
  totalAll: number;
};

export type ListingsParams = {
  page?: number;
  limit?: number;
  [filter: string]: string | number | undefined;
};

export class ListingFetchError extends Error {
  constructor(
    message: string,
    public readonly status: number
  ) {
    super(message);
    this.name = 'ListingFetchError';
  }
}

async function parseError(response: Response): Promise<string> {
  try {
    const body = (await response.json()) as { error?: string };
    return body.error ?? `Request failed (${response.status})`;
  } catch {
    return `Request failed (${response.status})`;
  }
}

function buildQuery(params: ListingsParams): string {
  const search = new URLSearchParams();

  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== '') {
      search.set(key, String(value));
    }
  }

  const query = search.toString();
  return query ? `?${query}` : '';
}

export async function fetchListings(
  params: ListingsParams = {}
): Promise<ListingsResponse> {
  const response = await fetch(
    `${API_BASE}/api/listings${buildQuery(params)}`
  );

  if (!response.ok) {
    throw new ListingFetchError(await parseError(response), response.status);
  }

  return response.json() as Promise<ListingsResponse>;
}

export async function fetchListingBySlug(slug: string): Promise<ListingDetail> {
  const response = await fetch(
    `${API_BASE}/api/listings/${encodeURIComponent(slug)}`
  );

  if (!response.ok) {
    throw new ListingFetchError(await parseError(response), response.status);
  }

  return response.json() as Promise<ListingDetail>;
}

export type SupportingOption = {
  label: string;
  value: string;
};

export async function fetchSupporting(type: string): Promise<SupportingOption[]> {
  const response = await fetch(
    `${API_BASE}/api/supporting/${encodeURIComponent(type)}`
  );

  if (!response.ok) {
    throw new ListingFetchError(await parseError(response), response.status);
  }

  const body = (await response.json()) as { data?: SupportingOption[] };
  return body.data ?? [];
}
