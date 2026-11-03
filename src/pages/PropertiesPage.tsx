import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { NavBar } from '../components/NavBar';
import { PropertiesFilterBar } from '../components/PropertiesFilterBar';
import { cn } from '../components/Button';
import {
  formatBedrooms,
  formatBathrooms,
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
import { design } from '../lib/design-tokens';

const { layout, type } = design;

const PAGE_LIMIT = 12;

function PropertyCard({ listing, index }: { listing: Listing; index: number }) {
  const imageUrl = listing.images[0]?.url;

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{
        duration: 0.6,
        delay: (index % PAGE_LIMIT) * 0.05,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <Link
        to={`/property/${listing.slug}`}
        className="group flex flex-col h-full border border-gold/35 bg-capabilities overflow-hidden hover:border-gold/55 transition-colors duration-300"
      >
        <div className="relative aspect-[4/3] overflow-hidden bg-[#10242C]">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={listing.title}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center font-sans text-[12px] tracking-[0.14em] uppercase text-white/35">
              No image
            </div>
          )}
          <span className="absolute top-3 left-3 px-2.5 py-1 bg-dark/85 border border-gold/40 font-sans text-[10px] tracking-[0.14em] uppercase text-gold">
            {formatPurpose(listing.purpose)}
          </span>
        </div>

        <div className="flex flex-col flex-1 p-5 sm:p-6">
          <p className="font-sans text-[15px] md:text-[16px] text-gold mb-2 tracking-wide">
            {formatPrice(listing)}
          </p>

          <h2 className="font-serif font-normal text-[20px] sm:text-[22px] leading-[1.2] tracking-tightest text-[#E8DFCF] mb-3 line-clamp-2">
            {listing.title}
          </h2>

          <p className="font-sans font-light text-[13px] text-white/60 mb-4">
            {formatBedrooms(listing.bedrooms)} · {formatBathrooms(listing.bathrooms)} ·{' '}
            {formatSize(listing.size)}
          </p>

          <div className="flex items-start gap-2 mb-4">
            <MapPin
              className="w-3.5 h-3.5 text-gold/70 shrink-0 mt-0.5"
              strokeWidth={1.5}
            />
            <p className="font-sans text-[13px] text-white/75 leading-snug">
              {formatLocation(listing)}
            </p>
          </div>

          <div className="mt-auto flex items-center justify-between gap-3 pt-2 border-t border-white/10">
            {listing.propertyType ? (
              <span className="font-sans text-[11px] tracking-[0.12em] uppercase text-white/50 border border-white/15 px-2 py-1">
                {listing.propertyType}
              </span>
            ) : (
              <span />
            )}
            <span className="font-sans text-[11px] tracking-[0.1em] text-white/40">
              Ref. {listing.reference}
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

export function PropertiesPage() {
  const [page, setPage] = useState(1);
  const [retryKey, setRetryKey] = useState(0);
  const [draftFilters, setDraftFilters] =
    useState<PropertiesFilterState>(defaultPropertiesFilters);
  const [appliedFilters, setAppliedFilters] =
    useState<PropertiesFilterState>(defaultPropertiesFilters);
  const [propertyTypes, setPropertyTypes] = useState<
    { label: string; value: string }[]
  >([]);
  const [communities, setCommunities] = useState<
    { label: string; value: string }[]
  >([]);
  const [optionsLoading, setOptionsLoading] = useState(true);
  const [listings, setListings] = useState<Listing[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const totalPages = Math.max(1, Math.ceil(total / PAGE_LIMIT));
  const filtersActive = hasActiveFilters(appliedFilters);

  useEffect(() => {
    let cancelled = false;

    async function loadOptions() {
      setOptionsLoading(true);
      try {
        const [types, communityList] = await Promise.all([
          fetchSupporting('property-type'),
          fetchSupporting('communities'),
        ]);
        if (cancelled) return;
        setPropertyTypes(types);
        setCommunities(communityList);
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
        setListings(response.data);
        setTotal(response.total);
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
  }, [page, appliedFilters, retryKey]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [page]);

  const handleApply = () => {
    setAppliedFilters(draftFilters);
    setPage(1);
  };

  const handleReset = () => {
    setDraftFilters(defaultPropertiesFilters);
    setAppliedFilters(defaultPropertiesFilters);
    setPage(1);
  };

  return (
    <div className="min-h-screen bg-capabilities text-white selection:bg-gold selection:text-black overflow-x-hidden">
      <NavBar />
      <main className="relative z-0 pt-navbar md:pt-hero-nav bg-capabilities min-h-screen">
      <div className={`${layout.container} pt-4 sm:pt-5 md:pt-6 pb-12 sm:pb-16 md:pb-20`}>
        <div className={`${layout.sectionIntro} mb-6 md:mb-8 mx-auto items-center text-center`}>
          <h1 className={`${type.sectionTitle} m-0`}>
            Properties
          </h1>
          <div className={`${type.goldRule} mx-auto`} />
          <p className={`${type.sectionSubtitle} m-0 max-w-[520px]`}>
            Browse our curated selection of residential and commercial opportunities
            across India.
          </p>
        </div>

        <PropertiesFilterBar
          filters={draftFilters}
          propertyTypes={propertyTypes}
          communities={communities}
          optionsLoading={optionsLoading}
          onChange={setDraftFilters}
          onApply={handleApply}
          onReset={handleReset}
        />

        {loading && (
          <div className="py-20 text-center">
            <p className="font-sans text-[14px] tracking-[0.12em] uppercase text-white/50">
              Loading properties…
            </p>
          </div>
        )}

        {!loading && error && (
          <div className="py-16 px-6 text-center border border-gold/25 bg-[#0E1F26]">
            <p className="font-serif text-[22px] text-white/90 mb-2">
              Unable to load properties
            </p>
            <p className="font-sans text-[14px] text-white/55 mb-6">{error}</p>
            <button
              type="button"
              onClick={() => setRetryKey((current) => current + 1)}
              className="h-[44px] px-8 border border-gold/55 text-white font-sans text-[11px] tracking-[0.18em] uppercase hover:bg-gold/10 hover:border-gold transition-all duration-300"
            >
              Try again
            </button>
          </div>
        )}

        {!loading && !error && listings.length === 0 && (
          <div className="py-16 px-6 text-center border border-gold/25 bg-[#0E1F26]">
            <p className="font-serif text-[22px] text-white/90 mb-2">
              {filtersActive
                ? 'No properties match your filters.'
                : 'No properties found'}
            </p>
            {!filtersActive && (
              <p className="font-sans text-[14px] text-white/55">
                Check back soon for new listings.
              </p>
            )}
            {filtersActive && (
              <button
                type="button"
                onClick={handleReset}
                className="mt-6 h-[44px] px-8 border border-gold/55 text-white font-sans text-[11px] tracking-[0.18em] uppercase hover:bg-gold/10 hover:border-gold transition-all duration-300"
              >
                Reset filters
              </button>
            )}
          </div>
        )}

        {!loading && !error && listings.length > 0 && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
              {listings.map((listing, index) => (
                <PropertyCard key={listing.id} listing={listing} index={index} />
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10 md:mt-12">
                <button
                  type="button"
                  disabled={page <= 1}
                  onClick={() => setPage((current) => Math.max(1, current - 1))}
                  className={cn(
                    'h-[44px] min-w-[120px] px-6 border border-gold/55 text-white font-sans text-[11px] tracking-[0.18em] uppercase transition-all duration-300',
                    page <= 1
                      ? 'opacity-40 cursor-not-allowed'
                      : 'hover:bg-gold/10 hover:border-gold'
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
                  onClick={() =>
                    setPage((current) => Math.min(totalPages, current + 1))
                  }
                  className={cn(
                    'h-[44px] min-w-[120px] px-6 border border-gold/55 text-white font-sans text-[11px] tracking-[0.18em] uppercase transition-all duration-300',
                    page >= totalPages
                      ? 'opacity-40 cursor-not-allowed'
                      : 'hover:bg-gold/10 hover:border-gold'
                  )}
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </main>
    </div>
  );
}
