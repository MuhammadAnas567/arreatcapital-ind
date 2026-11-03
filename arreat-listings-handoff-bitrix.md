# Arreat Capital — Property Listings Integration (Handoff / Context)

> Paste this into a new Claude chat to resume from exactly where we left off.
> It captures the full context, every decision, what's built, and what's left.

---

## 1. The Goal

Arreat Capital is a Dubai/UAE real estate company. We're pulling their **property
listings** out of their CRM and displaying them on their **website** (a React app
on Vercel). Eventually the site's contact form should also create **leads** back
in the CRM.

## 2. Where the data actually lives (investigation result)

- Arreat's CRM is **Bitrix24** (`arreat.bitrix24.com`).
- Listings are modeled as a Bitrix **Smart Process Automation** entity called
  **"Assets" (entityTypeId `1060`)** — but the raw Bitrix entity is nearly empty
  of property fields (just name, amount, an agent link). The rich property data is
  **assembled by a custom API built by their implementation partner, SaabSoft.**
- **Decision: use the SaabSoft custom API, NOT the raw Bitrix webhook.** The custom
  API returns clean, website-ready data (price, beds, location, images, amenities,
  etc.); the raw Bitrix entity does not.
- Other Bitrix entity IDs (for reference, in case lead-creation needs them later):
  Leads `1056`, Deals `1058`, Developer `1076`, City `1074`, Community `1046`,
  Sub Community `1044`, Building Name `1042`, Property Type `1048`, Agents `1054`.

## 3. The SaabSoft Listings API

- **Base URL:** `https://youtupia.net/SingleListingApp/api`
- **Auth:** `POST /auth/token` with JSON body `{ client_id, client_secret }`
  → returns `{ success, token, expires_at }`. **Token valid ~2 hours.**
- **Required headers** on all protected endpoints:
  `X-API-Token: <token>` **and** `X-Client-ID: <client_id>`
- **Credentials** are stored in `backend/.env` (gitignored). Obtain from the team /
  existing env. (They were exposed in chat during setup and should be rotated.)

### Endpoints
| Endpoint | Notes |
|---|---|
| `POST /auth/token` | Get a 2h token. |
| `GET /get-data-properties?order[0][column]=0&order[0][dir]=asc&limit=&page=&<filters>` | List. Returns `{ recordsTotal, recordsFiltered, data:[...], counts:{ allListingCount } }`. |
| `GET /get-property-detail/{seo_url}` | Single property. **Wrapped in `{ property: {...} }`**, much richer than the list. |
| `GET /get-{type}-data` | Supporting lists. Return `{ results: [ { text, id } ] }`. Types: property-type, developers, locations, cities, communities, sub-communities, buildings, listing-agents, private-amenities, commercial-amenities. |

### List filters (query params)
`price` ("min,max"), `category` (R=Residential / S=Commercial),
`purpose` (R=Rent / S=Sale), `bedrooms`, `property_type` (abbreviation e.g. AP, TH),
`location` (community **name**), `sub_community`, `building`, `developers`,
`listing_title`, `listing_id`, `permit_number`, `unit_no`, `owner` (agent id).
Sorting/pagination: `order[0][column]` (0–6), `order[0][dir]` (asc/desc),
`limit` (≤100), `page`.

## 4. Data quirks discovered (important)

- **Private fields must be stripped, never sent to the browser:** `owner`,
  `owner_contact`, `owner_email`, `landlord*`, internal notes, user/portal IDs.
  The backend uses an **allowlist** mapping for this.
- **Description** is HTML-entity-encoded (double-encoded: `&amp;nbsp;`, `&lt;br&gt;`)
  and — heads up — the prose sometimes **contains the owner's phone number**. It's
  the same copy that syndicates to Bayut, so presumably public, but flag to client.
- **Coordinates are swapped at the source** (latitude/longitude reversed). Backend
  corrects: if `lat > 50 && lng < 35`, swap (UAE lat ~22–26, lng ~51–57).
- **Title / region** contain HTML entities and need decoding.
- **Supporting endpoints** return `{ results: [ { text, id } ] }`:
  - property-type & listing-agents → filter value = `id` (e.g. "AP")
  - communities/locations/etc. → filter value = `text` (the name)
  - dedupe by value (e.g. "Show Room"/"Showroom" both id "SR").
- **Community name mismatch risk:** listing data uses names like "Dubailand" while
  the communities list has "Dubai Land". If the community filter returns empty,
  fallback = build community options from the distinct communities in the listings.

## 5. Architecture

- **Frontend:** existing **React 18 + Vite 5 + TypeScript (strict) + Tailwind** SPA
  (originally the "magic-patterns" scaffold), deployed on **Vercel managed by
  another dev**. Originally: no router, mock listings, one mock contact form.
- **Backend:** NEW **TypeScript + Express** server in a **`backend/` folder**
  (monorepo). **Host: TBD** (Render / Railway / VPS — decide later; keep it
  host-agnostic). Proxies the SaabSoft API, normalizes to a clean DTO, strips
  private fields, holds all secrets.
- **Frontend → backend** via `VITE_API_BASE_URL` (the ONLY non-secret value that
  goes in Vercel). All real secrets live in `backend/.env` / the backend host.
- **Why a backend:** secrets can't ship in the browser bundle; CORS; and it's the
  future home for contact-form → Bitrix lead creation.

### Local dev
- Backend: `cd backend && npm run dev` (port **3001**); needs `backend/.env`.
- Frontend: `npm run dev` (port **5173**); needs `.env.local` with
  `VITE_API_BASE_URL=http://localhost:3001`.
- Backend `CORS_ORIGIN` must include `http://localhost:5173`.
- Windows: test GET endpoints in the **browser**; use PowerShell
  `Invoke-RestMethod` for POSTs.

## 6. The DTOs (backend output the frontend consumes)

```ts
type Listing = {
  id: number; reference: string; slug: string; title: string;
  purpose: 'rent' | 'sale'; category: 'residential' | 'commercial';
  price: number; currency: string;
  bedrooms: number; bathrooms: number; size: number; propertyType: string;
  location: { city: string; community: string; subCommunity: string; building: string; region: string };
  coordinates: { lat: number; lng: number } | null;
  images: { url: string; originalUrl: string }[];
  agent: { name: string; email: string; mobile: string; photo: string | null; licenseNo: string | null } | null;
  isFeatured: boolean; isExclusive: boolean;
  projectStatus: string | null; createdAt: string; updatedAt: string;
};

// Detail = Listing + these (allowlist-mapped, unwraps {property}):
type ListingDetail = Listing & {
  description: string;           // cleaned plain text, line breaks preserved
  amenities: string[];           // from privateAmenitiestest[].private_amenities_name
  commercialAmenities: string[];
  furnished: string | null; permitNumber: string | null;  // RERA_Permit_Number
  parkingSpaces: number | null; serviceCharge: number | null;
  buildYear: string | null; completionStatus: string | null;
  freehold: boolean; projectName: string | null; rentalPeriod: string | null;
  videoLink: string | null; floorPlans: { url: string }[]; documents: { url: string }[];
};
```

List response shape: `{ data: Listing[], total, page, limit, totalAll }`.

## 7. What's been built (all phases complete & verified)

**Phase 1 — Backend** (`backend/`): Express + TS. Token cache (2h, early refresh,
401-retry), `normalize.ts`, routes `/health`, `/api/listings`,
`/api/listings/:slug`, `/api/supporting/:type`, zod env validation, rate limit
(300 req/15min on `/api`), configurable CORS. Env keys: `LISTINGS_API_BASE_URL`,
`LISTINGS_CLIENT_ID`, `LISTINGS_CLIENT_SECRET`, `CORS_ORIGIN`, `PORT`.

**Phase 2 — Frontend routing + list page:** added `react-router-dom`,
`BrowserRouter`, routes (`/`, `/properties`, `/property/:slug`),
`src/lib/config.ts`, `src/lib/listings.ts` (types + fetchers),
`src/lib/formatListing.ts`, `LandingPage` / `PropertiesPage` /
`PropertyDetailPage`, `ScrollToHashOnLoad`, `vercel.json` SPA rewrite, homepage
teaser CTA → `/properties`.

**Phase 3 — Detail page:** `normalizeDetail()` (allowlist, unwraps `{property}`),
`cleanDescription()`, full `PropertyDetailPage` (gallery, specs, location,
description, amenities, agent card, map link). Plus fixes: removed gallery
horizontal scrollbar, fixed description spacing, coordinate swap correction.

**Phase 4 — Filters:** `filterTranslation.ts` (friendly→R/S codes, kept ONLY in
backend), `supportingNormalize.ts`, `PropertiesFilterBar.tsx` (purpose, category,
property type, bedrooms, price, community, search; draft-vs-applied pattern),
filtered fetch + pagination persistence.

## 8. OPEN ITEMS — start here

1. **`supportingNormalize` fix (in flight):** supporting endpoints return
   `{ results: [ { text, id } ] }`. Fix to read `.results`, `label = text` (trim
   `\r`/whitespace), `value = id` for property-type & listing-agents else `text`,
   dedupe by value. (Prompt was given; confirm it's applied so the Property Type &
   Community dropdowns populate.)
2. **429 Too Many Requests (in flight):** backend rate limiter tripped by a
   **frontend re-fetch loop** introduced in Phase 4. Fix: fetch supporting lists
   once on mount (stable empty deps); make the listings effect depend only on
   serialized applied-filters + page (no new object each render); relax the rate
   limit when `NODE_ENV !== 'production'`. Restart backend to clear current 429.
3. **Verify community filter** actually returns results (name-mismatch risk → use
   listings-derived fallback if empty).
4. **Verify coordinate swap** holds across multiple listings.
5. **Flag to client:** descriptions contain owner phone numbers — confirm that's
   intended for the public site.

## 9. REMAINING WORK (not started)

- **Go live / deploy:** pick a backend host (Render/Railway/VPS), set the backend
  env vars there, set `VITE_API_BASE_URL` in Vercel to the deployed backend URL,
  add the deployed frontend origin to backend `CORS_ORIGIN`, and confirm the
  `vercel.json` SPA rewrite with the Vercel project owner.
- **Contact form → Bitrix lead:** the existing `ContactCTA` form is a mock. It
  should POST to a new backend route that **creates a Lead in Bitrix** (Leads
  entity `1056`). This needs a **Bitrix WRITE webhook** (different permission than
  the read API) — must be requested from the SaabSoft/Bitrix team. Add spam
  protection (honeypot/reCAPTCHA).

## 10. Working method that's been effective

Build in small, verifiable phases. Before building against any new endpoint,
**fetch its real response shape first** (browser for GET, PowerShell for POST) and
confirm the data — this caught the empty-Assets entity, the swapped coordinates,
the private-field leaks, and the `{ results: [...] }` supporting shape. Keep
secrets out of prompts/Cursor; reference `.env`. Use Cursor with tightly-scoped,
phase-by-phase prompts and a "wait for confirmation before coding" instruction.
