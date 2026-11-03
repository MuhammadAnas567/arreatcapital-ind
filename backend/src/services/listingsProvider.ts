import { env } from '../config/env.js';
import type { RawDetailProperty, RawProperty } from './normalize.js';

const TOKEN_REFRESH_BUFFER_MS = 10 * 60 * 1000;

interface TokenResponse {
  success: boolean;
  token: string;
  expires_at: string;
}

interface ListingsApiResponse {
  recordsTotal: number;
  recordsFiltered: number;
  data: RawProperty[];
  counts?: {
    allListingCount?: number;
  };
}

export interface ListingsQuery {
  page?: string;
  limit?: string;
  price?: string;
  category?: string;
  purpose?: string;
  unit_no?: string;
  property_type?: string;
  owner?: string;
  developers?: string;
  location?: string;
  sub_community?: string;
  building?: string;
  listing_title?: string;
  bedrooms?: string;
  listing_id?: string;
  permit_number?: string;
  orderColumn?: string;
  orderDir?: string;
}

interface CachedToken {
  token: string;
  expiresAtMs: number;
}

let cachedToken: CachedToken | null = null;
let tokenFetchPromise: Promise<string> | null = null;

function parseExpiry(expiresAt: string): number {
  const normalized = expiresAt.includes('T')
    ? expiresAt
    : expiresAt.replace(' ', 'T');
  const parsed = Date.parse(normalized);
  return Number.isFinite(parsed) ? parsed : Date.now() + 2 * 60 * 60 * 1000;
}

function buildUrl(path: string, query?: Record<string, string | undefined>): string {
  const base = env.LISTINGS_API_BASE_URL.replace(/\/$/, '');
  const url = new URL(`${base}${path.startsWith('/') ? path : `/${path}`}`);

  if (query) {
    for (const [key, value] of Object.entries(query)) {
      if (value !== undefined && value !== '') {
        url.searchParams.set(key, value);
      }
    }
  }

  return url.toString();
}

async function fetchToken(): Promise<string> {
  const response = await fetch(buildUrl('/auth/token'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      client_id: env.LISTINGS_CLIENT_ID,
      client_secret: env.LISTINGS_CLIENT_SECRET,
    }),
  });

  if (!response.ok) {
    throw new UpstreamError(
      'Failed to authenticate with listings provider',
      response.status
    );
  }

  const body = (await response.json()) as TokenResponse;

  if (!body.success || !body.token) {
    throw new UpstreamError('Listings provider returned an invalid auth response', 502);
  }

  cachedToken = {
    token: body.token,
    expiresAtMs: parseExpiry(body.expires_at) - TOKEN_REFRESH_BUFFER_MS,
  };

  return body.token;
}

async function getToken(): Promise<string> {
  if (cachedToken && Date.now() < cachedToken.expiresAtMs) {
    return cachedToken.token;
  }

  if (!tokenFetchPromise) {
    tokenFetchPromise = fetchToken().finally(() => {
      tokenFetchPromise = null;
    });
  }

  return tokenFetchPromise;
}

function clearToken(): void {
  cachedToken = null;
}

export class UpstreamError extends Error {
  constructor(
    message: string,
    public readonly statusCode: number
  ) {
    super(message);
    this.name = 'UpstreamError';
  }
}

async function authenticatedFetch(
  path: string,
  query?: Record<string, string | undefined>,
  retried = false
): Promise<Response> {
  const token = await getToken();
  const url = buildUrl(path, query);

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'X-API-Token': token,
      'X-Client-ID': env.LISTINGS_CLIENT_ID,
    },
  });

  if (response.status === 401 && !retried) {
    clearToken();
    return authenticatedFetch(path, query, true);
  }

  if (!response.ok) {
    throw new UpstreamError(
      'Listings provider request failed',
      response.status
    );
  }

  return response;
}

function buildListingsQuery(params: ListingsQuery): Record<string, string | undefined> {
  const orderColumn = params.orderColumn ?? '0';
  const orderDir = params.orderDir ?? 'asc';

  return {
    'order[0][column]': orderColumn,
    'order[0][dir]': orderDir,
    page: params.page,
    limit: params.limit,
    price: params.price,
    category: params.category,
    purpose: params.purpose,
    unit_no: params.unit_no,
    property_type: params.property_type,
    owner: params.owner,
    developers: params.developers,
    location: params.location,
    sub_community: params.sub_community,
    building: params.building,
    listing_title: params.listing_title,
    bedrooms: params.bedrooms,
    listing_id: params.listing_id,
    permit_number: params.permit_number,
  };
}

export async function fetchListings(params: ListingsQuery) {
  const response = await authenticatedFetch(
    '/get-data-properties',
    buildListingsQuery(params)
  );

  const body = (await response.json()) as ListingsApiResponse;

  return {
    items: body.data ?? [],
    total: body.recordsFiltered ?? 0,
    page: Number(params.page ?? 1),
    limit: Number(params.limit ?? (body.data?.length ?? 0)),
    totalAll: body.counts?.allListingCount ?? body.recordsTotal ?? 0,
  };
}

export async function fetchListingDetail(slug: string): Promise<RawDetailProperty> {
  const response = await authenticatedFetch(
    `/get-property-detail/${encodeURIComponent(slug)}`
  );
  const body = await response.json();

  if (!body || typeof body !== 'object' || !('property' in body)) {
    throw new UpstreamError('Listing not found', 404);
  }

  const property = (body as { property: unknown }).property;
  if (!property || typeof property !== 'object') {
    throw new UpstreamError('Listing not found', 404);
  }

  return property as RawDetailProperty;
}

export async function fetchSupportingData(endpoint: string): Promise<unknown> {
  const response = await authenticatedFetch(endpoint);
  return response.json();
}
