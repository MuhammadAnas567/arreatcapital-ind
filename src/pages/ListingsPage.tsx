import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Toaster } from 'sonner';
import { NavBar } from '../components/NavBar';
import { Footer } from '../components/Footer';
import { ListingRowCard } from '../components/ListingRowCard';
import { cn } from '../components/Button';
import { fetchListings, type Listing } from '../lib/listings';
import { design } from '../lib/design-tokens';

const { layout, type } = design;
const PAGE_LIMIT = 10;

export function ListingsPage() {
  const [page, setPage] = useState(1);
  const [retryKey, setRetryKey] = useState(0);
  const [listings, setListings] = useState<Listing[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const totalPages = Math.max(1, Math.ceil(total / PAGE_LIMIT));

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);

      try {
        const response = await fetchListings({ page, limit: PAGE_LIMIT });
        if (cancelled) return;
        setListings(response.data);
        setTotal(response.total);
      } catch (err) {
        if (cancelled) return;
        setError(err instanceof Error ? err.message : 'Failed to load listings');
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
  }, [page, retryKey]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [page]);

  return (
    <div className="min-h-screen bg-dark text-white selection:bg-gold selection:text-black overflow-x-hidden">
      <NavBar />
      <main className="relative z-0 pt-navbar md:pt-hero-nav">
        <section className={`w-full bg-capabilities ${layout.sectionPadding}`}>
          <div className={layout.container}>
            <div className={`${layout.sectionIntro} ${layout.sectionHeaderGap}`}>
              <Link
                to="/"
                className="inline-flex items-center font-sans text-[11px] tracking-[0.16em] uppercase text-gold hover:text-white transition-colors"
              >
                Back to Home
              </Link>
              <h1 className={`${type.sectionTitle} m-0`}>
                All Available Listings
              </h1>
              <div className={type.goldRule} />
              <p className={`${type.sectionSubtitle} m-0 max-w-[640px]`}>
                Browse our live property listings across India.
              </p>
            </div>

            {loading && (
              <div className="py-20 text-center">
                <p className="font-sans text-[14px] tracking-[0.12em] uppercase text-white/50">
                  Loading listings…
                </p>
              </div>
            )}

            {!loading && error && (
              <div className="py-16 px-6 text-center border border-gold/25 bg-[#0E1F26]">
                <p className="font-serif text-[22px] text-white/90 mb-2">
                  Unable to load listings
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
                  No listings found
                </p>
                <p className="font-sans text-[14px] text-white/55">
                  Check back soon for new properties.
                </p>
              </div>
            )}

            {!loading && !error && listings.length > 0 && (
              <>
                <div className="border border-gold/40 p-4 sm:p-5 md:p-6">
                  <div className="flex flex-col gap-4 md:gap-5">
                    {listings.map((listing) => (
                      <ListingRowCard key={listing.id} listing={listing} />
                    ))}
                  </div>
                </div>

                {totalPages > 1 && (
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8 md:mt-10">
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
        </section>
      </main>
      <Footer />
      <Toaster position="bottom-right" />
    </div>
  );
}
