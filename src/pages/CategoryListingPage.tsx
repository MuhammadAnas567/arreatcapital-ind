import React, { useEffect, useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import { CtaBand, PageHero, SitePageShell } from '../components/PageChrome';
import { PropertiesFilterBar } from '../components/PropertiesFilterBar';
import { cn } from '../components/Button';
import {
  formatBathrooms,
  formatBedrooms,
  formatLocation,
  formatPrice,
  formatPurpose,
  formatSize,
} from '../lib/formatListing';
import { fetchListings, fetchSupporting, type Listing } from '../lib/listings';
import {
  defaultPropertiesFilters,
  filtersToParams,
  hasActiveFilters,
  type PropertiesFilterState,
} from '../lib/propertyFilters';
import { getCategoryConfig, type CategoryPageConfig } from '../lib/siteNav';
import { design } from '../lib/design-tokens';

const { layout, type } = design;
const PAGE_LIMIT = 12;

function PropertyCard({ listing }: { listing: Listing }) {
  const imageUrl = listing.images[0]?.url;

  return (
    <article>
      <Link
        to={`/property/${listing.slug}`}
        className="group flex h-full flex-col overflow-hidden border border-gold/35 bg-capabilities transition-colors duration-300 hover:border-gold/55"
      >
        <div className="relative aspect-[4/3] overflow-hidden bg-[#10242C]">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={listing.title}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center font-sans text-[12px] uppercase tracking-[0.14em] text-white/35">
              No image
            </div>
          )}
          <span className="absolute left-3 top-3 border border-gold/40 bg-dark/85 px-2.5 py-1 font-sans text-[10px] uppercase tracking-[0.14em] text-gold">
            {formatPurpose(listing.purpose)}
          </span>
        </div>
        <div className="flex flex-1 flex-col p-5 sm:p-6">
          <p className="mb-2 font-sans text-[15px] tracking-wide text-gold md:text-[16px]">
            {formatPrice(listing)}
          </p>
          <h2 className="mb-3 line-clamp-2 font-serif text-[20px] font-normal leading-[1.2] tracking-tightest text-cream sm:text-[22px]">
            {listing.title}
          </h2>
          <p className="mb-4 font-sans text-[13px] font-light text-white/60">
            {formatBedrooms(listing.bedrooms)} · {formatBathrooms(listing.bathrooms)} ·{' '}
            {formatSize(listing.size)}
          </p>
          <div className="mb-4 flex items-start gap-2">
            <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold/70" strokeWidth={1.5} />
            <p className="font-sans text-[13px] leading-snug text-white/75">
              {formatLocation(listing)}
            </p>
          </div>
        </div>
      </Link>
    </article>
  );
}

function matchesType(listing: Listing, includes?: string[]) {
  if (!includes || includes.length === 0) return true;
  const value = (listing.propertyType || '').toLowerCase();
  return includes.some((token) => value.includes(token.toLowerCase()));
}

export function CategoryListingPage() {
  const { pathname } = useLocation();
  const config = useMemo(() => getCategoryConfig(pathname), [pathname]);

  if (!config) {
    return (
      <SitePageShell>
        <PageHero title="Page not found" lead="This listing category does not exist." />
      </SitePageShell>
    );
  }

  return <CategoryListingInner config={config} />;
}

function CategoryListingInner({ config }: { config: CategoryPageConfig }) {
  const initialFilters: PropertiesFilterState = {
    ...defaultPropertiesFilters,
    purpose: config.purpose || '',
  };

  const [page, setPage] = useState(1);
  const [retryKey, setRetryKey] = useState(0);
  const [draftFilters, setDraftFilters] = useState(initialFilters);
  const [appliedFilters, setAppliedFilters] = useState(initialFilters);
  const [propertyTypes, setPropertyTypes] = useState<{ label: string; value: string }[]>([]);
  const [communities, setCommunities] = useState<{ label: string; value: string }[]>([]);
  const [optionsLoading, setOptionsLoading] = useState(true);
  const [listings, setListings] = useState<Listing[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setDraftFilters(initialFilters);
    setAppliedFilters(initialFilters);
    setPage(1);
  }, [config.path]);

  useEffect(() => {
    let cancelled = false;
    async function loadOptions() {
      setOptionsLoading(true);
      try {
        const [types, communityList] = await Promise.all([
          fetchSupporting('property-type'),
          fetchSupporting('communities'),
        ]);
        if (!cancelled) {
          setPropertyTypes(types);
          setCommunities(communityList);
        }
      } catch {
        if (!cancelled) {
          setPropertyTypes([]);
          setCommunities([]);
        }
      } finally {
        if (!cancelled) setOptionsLoading(false);
      }
    }
    loadOptions();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const response = await fetchListings(
          filtersToParams(appliedFilters, page, PAGE_LIMIT)
        );
        if (cancelled) return;
        const filtered = response.data.filter((listing) =>
          matchesType(listing, config.propertyTypeIncludes)
        );
        setListings(filtered);
        setTotal(config.propertyTypeIncludes ? filtered.length : response.total);
      } catch (err) {
        if (cancelled) return;
        setError(err instanceof Error ? err.message : 'Failed to load properties');
        setListings([]);
        setTotal(0);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [page, appliedFilters, retryKey, config.propertyTypeIncludes]);

  const totalPages = Math.max(1, Math.ceil(total / PAGE_LIMIT));
  const filtersActive = hasActiveFilters(appliedFilters);

  return (
    <SitePageShell>
      <PageHero
        eyebrow={config.eyebrow}
        title={config.heading}
        lead={config.lead}
        breadcrumbs={config.breadcrumbs}
      />

      <section className={`${layout.section} pb-12 sm:pb-16 md:pb-20`}>
        <div className={layout.container}>
          {(config.listingTitle || config.listingLead) && (
            <div className="mb-8 max-w-3xl">
              {config.listingEyebrow ? (
                <p className={`${type.eyebrow} m-0 mb-2`}>{config.listingEyebrow}</p>
              ) : null}
              {config.listingTitle ? (
                <h2 className={`${type.sectionTitle} m-0 text-[28px] sm:text-[32px]`}>
                  {config.listingTitle}
                </h2>
              ) : null}
              {config.listingLead ? (
                <p className={`${type.sectionSubtitle} m-0 mt-4`}>{config.listingLead}</p>
              ) : null}
            </div>
          )}

          <PropertiesFilterBar
            filters={draftFilters}
            propertyTypes={propertyTypes}
            communities={communities}
            optionsLoading={optionsLoading}
            onChange={setDraftFilters}
            onApply={() => {
              setAppliedFilters(draftFilters);
              setPage(1);
            }}
            onReset={() => {
              setDraftFilters(initialFilters);
              setAppliedFilters(initialFilters);
              setPage(1);
            }}
          />

          {loading && (
            <div className="py-20 text-center">
              <p className="font-sans text-[14px] uppercase tracking-[0.12em] text-white/50">
                Loading properties…
              </p>
            </div>
          )}

          {!loading && error && (
            <div className="border border-gold/25 bg-[#0E1F26] px-6 py-16 text-center">
              <p className="mb-2 font-serif text-[22px] text-white/90">Unable to load properties</p>
              <p className="mb-6 font-sans text-[14px] text-white/55">{error}</p>
              <button
                type="button"
                onClick={() => setRetryKey((current) => current + 1)}
                className="h-[44px] border border-gold/55 px-8 font-sans text-[11px] uppercase tracking-[0.18em] text-white hover:bg-gold/10"
              >
                Try again
              </button>
            </div>
          )}

          {!loading && !error && listings.length === 0 && (
            <div className="border border-gold/25 bg-[#0E1F26] px-6 py-16 text-center">
              <p className="mb-2 font-serif text-[22px] text-white/90">
                {filtersActive
                  ? 'No properties match your filters.'
                  : 'No properties found'}
              </p>
            </div>
          )}

          {!loading && !error && listings.length > 0 && (
            <>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:gap-6 lg:grid-cols-3">
                {listings.map((listing) => (
                  <PropertyCard key={listing.id} listing={listing} />
                ))}
              </div>

              {totalPages > 1 && (
                <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row md:mt-12">
                  <button
                    type="button"
                    disabled={page <= 1}
                    onClick={() => setPage((current) => Math.max(1, current - 1))}
                    className={cn(
                      'h-[44px] min-w-[120px] border border-gold/55 px-6 font-sans text-[11px] uppercase tracking-[0.18em] text-white',
                      page <= 1 ? 'cursor-not-allowed opacity-40' : 'hover:bg-gold/10'
                    )}
                  >
                    Previous
                  </button>
                  <p className="font-sans text-[13px] text-white/60">
                    Page {page} of {totalPages}
                  </p>
                  <button
                    type="button"
                    disabled={page >= totalPages}
                    onClick={() => setPage((current) => Math.min(totalPages, current + 1))}
                    className={cn(
                      'h-[44px] min-w-[120px] border border-gold/55 px-6 font-sans text-[11px] uppercase tracking-[0.18em] text-white',
                      page >= totalPages
                        ? 'cursor-not-allowed opacity-40'
                        : 'hover:bg-gold/10'
                    )}
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
      <CtaBand />
    </SitePageShell>
  );
}
