export type Listing = {
  id: number;
  reference: string;
  slug: string;
  title: string;
  purpose: 'rent' | 'sale';
  category: 'residential' | 'commercial';
  price: number;
  currency: 'AED';
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

export interface RawPropertyImage {
  photo_url?: string;
  original_url?: string;
  sorting_id?: number | string;
}

export interface RawPropertyAgent {
  agent_name?: string;
  agent_email?: string;
  agent_mobile?: string;
  photo?: string;
  license_no?: string;
}

export interface RawProperty {
  unit_id?: number | string;
  listing_id?: string;
  seo_url?: string;
  listing_title?: string;
  category?: string;
  property_purpose?: string;
  price?: string | number;
  bedrooms?: string | number;
  bathrooms?: string | number;
  size?: number | string;
  property_type?: { prop_type_name?: string };
  community?: string;
  sub_community?: string;
  building?: string;
  town?: string;
  region?: string;
  latitude?: string | number;
  longitude?: string | number;
  images?: RawPropertyImage[];
  project_status?: string;
  is_featured?: boolean | string | number;
  is_exclusive?: boolean | string | number;
  Listing_Created_Date?: string;
  Listing_Last_Modified_Date?: string;
  agent?: RawPropertyAgent;
  // Private fields — intentionally not mapped to DTO
  owner?: unknown;
  owner_contact?: unknown;
  ownerinfo?: unknown;
  user_id?: unknown;
  user_role?: unknown;
}

/** Detail API returns a richer object under `.property` — only read via normalizeDetail. */
export type RawDetailProperty = Record<string, unknown>;

const URL_FIELD_CANDIDATES = [
  'url',
  'file_url',
  'document_url',
  'plan_url',
  'floor_plan_url',
  'photo_url',
  'original_url',
] as const;

const ENTITY_MAP: Record<string, string> = {
  '&amp;': '&',
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&#39;': "'",
  '&apos;': "'",
  '&nbsp;': '\u00a0',
};

export function decodeHtmlEntities(value: string): string {
  let decoded = value;
  let previous = '';

  while (decoded !== previous) {
    previous = decoded;
    decoded = decoded.replace(
      /&(?:amp|lt|gt|quot|apos|nbsp|#39);/gi,
      (match) => ENTITY_MAP[match.toLowerCase()] ?? match
    );
    decoded = decoded.replace(/&#(\d+);/g, (_, num) =>
      String.fromCharCode(Number(num))
    );
    decoded = decoded.replace(/&#x([0-9a-f]+);/gi, (_, hex) =>
      String.fromCharCode(parseInt(hex, 16))
    );
  }

  return decoded;
}

function parseNumber(value: unknown): number | null {
  if (value === null || value === undefined || value === '') return null;
  const parsed = typeof value === 'number' ? value : Number(String(value).trim());
  return Number.isFinite(parsed) ? parsed : null;
}

function parseBoolean(value: unknown): boolean {
  if (typeof value === 'boolean') return value;
  if (typeof value === 'number') return value !== 0;
  const normalized = String(value).trim().toLowerCase();
  return normalized === 'true' || normalized === '1' || normalized === 'yes';
}

function mapPurpose(value: string | undefined): 'rent' | 'sale' {
  return value?.toUpperCase() === 'R' ? 'rent' : 'sale';
}

function mapCategory(value: string | undefined): 'residential' | 'commercial' {
  return value?.toUpperCase() === 'S' ? 'commercial' : 'residential';
}

function normalizeImages(images: RawPropertyImage[] | undefined): Listing['images'] {
  if (!Array.isArray(images)) return [];

  return [...images]
    .sort((a, b) => {
      const aSort = parseNumber(a.sorting_id) ?? 0;
      const bSort = parseNumber(b.sorting_id) ?? 0;
      return aSort - bSort;
    })
    .map((image) => ({
      url: image.photo_url ?? '',
      originalUrl: image.original_url ?? image.photo_url ?? '',
    }))
    .filter((image) => image.url.length > 0);
}

function normalizeAgent(agent: RawPropertyAgent | undefined): Listing['agent'] {
  if (!agent) return null;

  const name = agent.agent_name?.trim();
  const email = agent.agent_email?.trim();
  const mobile = agent.agent_mobile?.trim();

  if (!name && !email && !mobile) return null;

  return {
    name: name ?? '',
    email: email ?? '',
    mobile: mobile ?? '',
    photo: agent.photo?.trim() || null,
    licenseNo: agent.license_no?.trim() || null,
  };
}

function normalizeCoordinates(
  latitude: unknown,
  longitude: unknown
): Listing['coordinates'] {
  let lat = parseNumber(latitude);
  let lng = parseNumber(longitude);

  if (lat === null || lng === null) return null;

  if (lat > 50 && lng < 35) {
    [lat, lng] = [lng, lat];
  }

  return { lat, lng };
}

export function normalizeListing(raw: RawProperty): Listing {
  const id = parseNumber(raw.unit_id) ?? 0;
  const price = parseNumber(raw.price) ?? 0;
  const bedrooms = parseNumber(raw.bedrooms) ?? 0;
  const bathrooms = parseNumber(raw.bathrooms) ?? 0;
  const size = parseNumber(raw.size) ?? 0;

  return {
    id,
    reference: String(raw.listing_id ?? ''),
    slug: String(raw.seo_url ?? ''),
    title: decodeHtmlEntities(String(raw.listing_title ?? '')),
    purpose: mapPurpose(raw.property_purpose),
    category: mapCategory(raw.category),
    price,
    currency: 'AED',
    bedrooms,
    bathrooms,
    size,
    propertyType: raw.property_type?.prop_type_name?.trim() ?? '',
    location: {
      city: String(raw.town ?? '').trim(),
      community: String(raw.community ?? '').trim(),
      subCommunity: String(raw.sub_community ?? '').trim(),
      building: String(raw.building ?? '').trim(),
      region: decodeHtmlEntities(String(raw.region ?? '').trim()),
    },
    coordinates: normalizeCoordinates(raw.latitude, raw.longitude),
    images: normalizeImages(raw.images),
    agent: normalizeAgent(raw.agent),
    isFeatured: parseBoolean(raw.is_featured),
    isExclusive: parseBoolean(raw.is_exclusive),
    projectStatus: raw.project_status?.trim() || null,
    createdAt: String(raw.Listing_Created_Date ?? ''),
    updatedAt: String(raw.Listing_Last_Modified_Date ?? ''),
  };
}

export function normalizeListings(rawItems: RawProperty[]): Listing[] {
  return rawItems.map(normalizeListing);
}

function decodeHtmlEntitiesOnce(value: string): string {
  let decoded = value.replace(
    /&(?:amp|lt|gt|quot|apos|nbsp|#39);/gi,
    (match) => ENTITY_MAP[match.toLowerCase()] ?? match
  );
  decoded = decoded.replace(/&#(\d+);/g, (_, num) =>
    String.fromCharCode(Number(num))
  );
  decoded = decoded.replace(/&#x([0-9a-f]+);/gi, (_, hex) =>
    String.fromCharCode(parseInt(hex, 16))
  );
  return decoded;
}

function decodeHtmlOneLevel(value: string): string {
  return value
    .replace(/&amp;/gi, '&')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/&apos;/gi, "'");
}

export function cleanDescription(raw: unknown): string {
  if (raw === null || raw === undefined) return '';

  let text = decodeHtmlOneLevel(String(raw));
  text = text.replace(/<br\s*\/?>/gi, '\n');
  text = text.replace(/&nbsp;/gi, ' ');
  text = text.replace(/\u00a0/g, ' ');
  text = text.replace(/<[^>]*>/g, '');
  text = decodeHtmlEntitiesOnce(text);
  text = text.replace(/&nbsp;/gi, ' ');
  text = text.replace(/\u00a0/g, ' ');
  text = text.replace(/\n{3,}/g, '\n\n');

  return text.trim();
}

function parsePriceFromDetail(price: unknown, priceYear: unknown): number {
  for (const candidate of [price, priceYear]) {
    if (candidate === null || candidate === undefined || candidate === '') continue;

    const numeric = parseNumber(candidate);
    if (numeric !== null) return numeric;

    const match = String(candidate).replace(/,/g, '').match(/(\d+(?:\.\d+)?)/);
    if (match) {
      const parsed = Number(match[1]);
      if (Number.isFinite(parsed)) return parsed;
    }
  }

  return 0;
}

function readString(raw: RawDetailProperty, key: string): string {
  const value = raw[key];
  if (value === null || value === undefined) return '';
  return String(value).trim();
}

function readNullableString(raw: RawDetailProperty, key: string): string | null {
  const value = readString(raw, key);
  return value || null;
}

function extractAmenityNames(items: unknown, nameKey: string): string[] {
  if (!Array.isArray(items)) return [];

  return items
    .map((item) => {
      if (!item || typeof item !== 'object') return null;
      const name = (item as Record<string, unknown>)[nameKey];
      if (typeof name !== 'string') return null;
      const trimmed = name.trim();
      return trimmed || null;
    })
    .filter((name): name is string => Boolean(name));
}

function extractCommercialAmenityNames(items: unknown): string[] {
  if (!Array.isArray(items)) return [];

  return items
    .map((item) => {
      if (!item || typeof item !== 'object') return null;
      const record = item as Record<string, unknown>;
      const candidates = [
        record.commercial_amenities_name,
        record.amenity_name,
        record.name,
      ];
      for (const candidate of candidates) {
        if (typeof candidate === 'string' && candidate.trim()) {
          return candidate.trim();
        }
      }
      return null;
    })
    .filter((name): name is string => Boolean(name));
}

function extractUrlItems(items: unknown): { url: string }[] {
  if (!Array.isArray(items)) return [];

  const results: { url: string }[] = [];

  for (const item of items) {
    if (!item || typeof item !== 'object') continue;
    const record = item as Record<string, unknown>;
    let found: string | null = null;

    for (const key of URL_FIELD_CANDIDATES) {
      const value = record[key];
      if (typeof value === 'string' && value.trim()) {
        found = value.trim();
        break;
      }
    }

    if (!found) {
      for (const value of Object.values(record)) {
        if (typeof value === 'string' && /^https?:\/\//i.test(value.trim())) {
          found = value.trim();
          break;
        }
      }
    }

    if (found) results.push({ url: found });
  }

  return results;
}

function normalizeDetailImages(images: unknown): Listing['images'] {
  if (!Array.isArray(images)) return [];
  return normalizeImages(images as RawPropertyImage[]);
}

function normalizeDetailPropertyType(propertyType: unknown): string {
  if (typeof propertyType === 'string') return propertyType.trim();
  if (propertyType && typeof propertyType === 'object') {
    const name = (propertyType as { prop_type_name?: unknown }).prop_type_name;
    if (typeof name === 'string') return name.trim();
  }
  return '';
}

function normalizeDetailAgent(raw: RawDetailProperty): Listing['agent'] {
  const nested =
    raw.agent && typeof raw.agent === 'object'
      ? (raw.agent as RawPropertyAgent)
      : undefined;

  const agent: RawPropertyAgent = {
    agent_name:
      nested?.agent_name ??
      (typeof raw.agent_name === 'string' ? raw.agent_name : undefined),
    agent_email:
      nested?.agent_email ??
      (typeof raw.agent_email === 'string' ? raw.agent_email : undefined),
    agent_mobile:
      nested?.agent_mobile ??
      (typeof raw.agent_mobile === 'string' ? raw.agent_mobile : undefined),
    photo:
      nested?.photo ?? (typeof raw.agent_photo === 'string' ? raw.agent_photo : undefined),
    license_no:
      nested?.license_no ??
      (typeof raw.license_no === 'string' ? raw.license_no : undefined),
  };

  return normalizeAgent(agent);
}

export function normalizeDetail(raw: RawDetailProperty): ListingDetail {
  const id = parseNumber(raw.unit_id) ?? 0;
  const price = parsePriceFromDetail(raw.price, raw.price_year);
  const bedrooms = parseNumber(raw.bedrooms) ?? 0;
  const bathrooms = parseNumber(raw.bathrooms) ?? 0;
  const size = parseNumber(raw.size) ?? 0;

  const descriptionSource =
    raw.description ?? raw.listing_description ?? raw.property_description ?? '';

  const parkingSpaces =
    parseNumber(raw.parking_spaces) ?? parseNumber(raw.parking) ?? null;
  const serviceCharge =
    parseNumber(raw.service_charge) ?? parseNumber(raw.serviceCharge) ?? null;

  const videoLink =
    readNullableString(raw, 'video_link') ?? readNullableString(raw, 'youtube_link');

  return {
    id,
    reference: readString(raw, 'listing_id'),
    slug: readString(raw, 'seo_url'),
    title: decodeHtmlEntities(readString(raw, 'listing_title')),
    purpose: mapPurpose(readString(raw, 'property_purpose') || undefined),
    category: mapCategory(readString(raw, 'category') || undefined),
    price,
    currency: 'AED',
    bedrooms,
    bathrooms,
    size,
    propertyType: normalizeDetailPropertyType(raw.property_type),
    location: {
      city: readString(raw, 'city'),
      community: readString(raw, 'community'),
      subCommunity: readString(raw, 'sub_community'),
      building: readString(raw, 'building'),
      region: decodeHtmlEntities(readString(raw, 'region')),
    },
    coordinates: normalizeCoordinates(raw.latitude, raw.longitude),
    images: normalizeDetailImages(raw.images),
    agent: normalizeDetailAgent(raw),
    isFeatured: parseBoolean(raw.is_featured),
    isExclusive: parseBoolean(raw.is_exclusive),
    projectStatus: readNullableString(raw, 'project_status'),
    createdAt: readString(raw, 'Listing_Created_Date'),
    updatedAt: readString(raw, 'Listing_Last_Modified_Date'),
    description: cleanDescription(descriptionSource),
    amenities: extractAmenityNames(raw.privateAmenitiestest, 'private_amenities_name'),
    commercialAmenities: extractCommercialAmenityNames(raw.commercialAmenitiestest),
    furnished: readNullableString(raw, 'furnished'),
    permitNumber: readNullableString(raw, 'RERA_Permit_Number'),
    parkingSpaces,
    serviceCharge,
    buildYear: readNullableString(raw, 'build_year'),
    completionStatus: readNullableString(raw, 'completion_status'),
    freehold: parseBoolean(raw.freehold),
    projectName: readNullableString(raw, 'project_name'),
    rentalPeriod: readNullableString(raw, 'plan'),
    videoLink,
    floorPlans: extractUrlItems(raw.floorplans),
    documents: extractUrlItems(raw.documents),
  };
}
