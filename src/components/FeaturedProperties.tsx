import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ctaButtonLightClass, cn } from './Button';
import { ListingRowCard } from './ListingRowCard';
import { fetchListings, type Listing } from '../lib/listings';
import { design } from '../lib/design-tokens';

const { colors, layout, type } = design;
const FEATURED_LIMIT = 3;

function GhostLink({
  to,
  children,
  className = '',
}: {
  to: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link
      to={to}
      className={cn(ctaButtonLightClass, 'h-[44px] px-6', className)}
    >
      {children}
    </Link>
  );
}

export function FeaturedProperties() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      try {
        const response = await fetchListings({ page: 1, limit: FEATURED_LIMIT });
        if (!cancelled) setListings(response.data);
      } catch {
        if (!cancelled) setListings([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section
      id="projects"
      className={`relative w-full overflow-hidden ${layout.scrollMt}`}
      style={{ backgroundColor: colors.capabilities }}
    >
      <div className="absolute inset-0 india-surface-mesh opacity-40" aria-hidden="true" />

      <div className={`relative z-10 ${layout.container} ${layout.sectionPadding}`}>
        <div className="mb-8 flex flex-col gap-3 md:mb-10 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className={`${type.eyebrow} m-0 mb-3`}>Featured inventory</p>
            <h2 className={`${type.sectionTitle} m-0`}>Handpicked opportunities</h2>
            <div className={`${type.goldRule} mt-5`} />
          </div>
          <p className={`${type.sectionSubtitle} m-0 max-w-md md:text-right`}>
            Curated residential and commercial assets selected for clarity,
            location strength and long-term value.
          </p>
        </div>

        <div className="india-frame relative border border-gold/25 bg-[#071418]/55 p-4 sm:p-5 md:p-6">
          {loading && (
            <div className="py-16 text-center">
              <p className="font-sans text-[13px] tracking-[0.16em] uppercase text-cream/45">
                Loading listings…
              </p>
            </div>
          )}

          {!loading && listings.length === 0 && (
            <div className="py-16 text-center">
              <p className="font-sans text-[14px] text-cream/55">
                No listings available right now.
              </p>
            </div>
          )}

          {!loading && listings.length > 0 && (
            <>
              <div className="flex flex-col gap-4 md:gap-5">
                {listings.map((listing) => (
                  <ListingRowCard key={listing.id} listing={listing} />
                ))}
              </div>

              <div className="mt-9 flex justify-center">
                <GhostLink
                  to="/properties"
                  className="h-[50px] w-full px-10 tracking-[0.2em] sm:w-auto sm:min-w-[220px]"
                >
                  EXPLORE MORE
                </GhostLink>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
