import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Bath,
  BedDouble,
  Building2,
  Car,
  Mail,
  MapPin,
  Maximize2,
  Phone,
} from 'lucide-react';
import { NavBar } from '../components/NavBar';
import { cn } from '../components/Button';
import {
  formatBedrooms,
  formatBathrooms,
  formatCategory,
  formatPrice,
  formatPurpose,
  formatSize,
  formatWhatsAppUrl,
} from '../lib/formatListing';
import {
  fetchListingBySlug,
  ListingFetchError,
  type ListingDetail,
} from '../lib/listings';
import { design } from '../lib/design-tokens';

const { layout } = design;

function AgentInitial({ name }: { name: string }) {
  const initial = name.trim().charAt(0).toUpperCase() || '?';
  return (
    <span className="shrink-0 flex items-center justify-center size-16 rounded-full bg-[#8B6A3E] font-serif text-[24px] text-white">
      {initial}
    </span>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4 py-3 border-b border-white/10 last:border-0">
      <dt className="font-sans text-[11px] tracking-[0.14em] uppercase text-white/45 sm:w-[180px] shrink-0">
        {label}
      </dt>
      <dd className="font-sans text-[14px] text-white/85">{value}</dd>
    </div>
  );
}

export function PropertyDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [listing, setListing] = useState<ListingDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ListingFetchError | Error | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    if (!slug) return;

    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);
      setActiveImageIndex(0);

      try {
        const data = await fetchListingBySlug(slug);
        if (!cancelled) setListing(data);
      } catch (err) {
        if (!cancelled) {
          setListing(null);
          setError(err instanceof Error ? err : new Error('Failed to load property'));
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [slug]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slug]);

  const notFound =
    error instanceof ListingFetchError && error.status === 404;

  const activeImage = listing?.images[activeImageIndex]?.url;
  const locationParts = listing
    ? [
        listing.location.region,
        listing.location.community,
        listing.location.subCommunity,
        listing.location.building,
        listing.location.city,
      ].filter(Boolean)
    : [];

  const allAmenities = listing
    ? [...listing.amenities, ...listing.commercialAmenities]
    : [];

  return (
    <div className="min-h-screen bg-capabilities text-white selection:bg-gold selection:text-black overflow-x-hidden">
      <NavBar />
      <main className="relative z-0 pt-navbar md:pt-hero-nav bg-capabilities min-h-screen">
      <div className={`${layout.container} ${layout.sectionPadding}`}>
        <Link
          to="/properties"
          className="inline-flex items-center gap-2 font-sans text-[11px] tracking-[0.14em] uppercase text-white/60 hover:text-gold transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" strokeWidth={1.5} />
          Back to properties
        </Link>

        {loading && (
          <div className="py-20 text-center">
            <p className="font-sans text-[14px] tracking-[0.12em] uppercase text-white/50">
              Loading property…
            </p>
          </div>
        )}

        {!loading && notFound && (
          <div className="py-16 px-6 text-center border border-gold/25 bg-[#0E1F26]">
            <p className="font-serif text-[22px] text-white/90 mb-2">
              Property not found
            </p>
            <p className="font-sans text-[14px] text-white/55 mb-6">
              This listing may have been removed or the link is incorrect.
            </p>
            <Link
              to="/properties"
              className="inline-flex items-center justify-center h-[44px] px-8 border border-gold/55 text-white font-sans text-[11px] tracking-[0.18em] uppercase hover:bg-gold/10 hover:border-gold transition-all duration-300"
            >
              Browse properties
            </Link>
          </div>
        )}

        {!loading && error && !notFound && (
          <div className="py-16 px-6 text-center border border-gold/25 bg-[#0E1F26]">
            <p className="font-serif text-[22px] text-white/90 mb-2">
              Unable to load property
            </p>
            <p className="font-sans text-[14px] text-white/55">{error.message}</p>
          </div>
        )}

        {!loading && listing && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-10 md:gap-12"
          >
            {/* Gallery */}
            <div className="border border-gold/35 bg-[#0E1F26] overflow-hidden">
              <div className="relative aspect-[16/10] sm:aspect-[16/9] bg-[#10242C]">
                {activeImage ? (
                  <img
                    src={activeImage}
                    alt={listing.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center font-sans text-[12px] tracking-[0.14em] uppercase text-white/35">
                    No image available
                  </div>
                )}
              </div>
              {listing.images.length > 1 && (
                <div className="flex flex-wrap gap-2 p-3 sm:p-4">
                  {listing.images.map((image, index) => (
                    <button
                      key={`${image.url}-${index}`}
                      type="button"
                      onClick={() => setActiveImageIndex(index)}
                      className={cn(
                        'shrink-0 w-20 h-14 sm:w-24 sm:h-16 border overflow-hidden transition-colors',
                        index === activeImageIndex
                          ? 'border-gold'
                          : 'border-white/15 hover:border-gold/50'
                      )}
                    >
                      <img
                        src={image.url}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Header */}
            <div>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-2.5 py-1 border border-gold/40 font-sans text-[10px] tracking-[0.14em] uppercase text-gold">
                  {formatPurpose(listing.purpose)}
                </span>
                <span className="px-2.5 py-1 border border-white/20 font-sans text-[10px] tracking-[0.14em] uppercase text-white/70">
                  {formatCategory(listing.category)}
                </span>
                {listing.isFeatured && (
                  <span className="px-2.5 py-1 border border-white/20 font-sans text-[10px] tracking-[0.14em] uppercase text-white/70">
                    Featured
                  </span>
                )}
                {listing.isExclusive && (
                  <span className="px-2.5 py-1 border border-white/20 font-sans text-[10px] tracking-[0.14em] uppercase text-white/70">
                    Exclusive
                  </span>
                )}
              </div>

              <h1 className="font-serif font-normal text-[28px] sm:text-[36px] md:text-[44px] leading-[1.12] tracking-tightest text-[#F3EADF] mb-3">
                {listing.title}
              </h1>

              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
                <p className="font-sans text-[20px] sm:text-[22px] text-gold tracking-wide">
                  {formatPrice(listing)}
                </p>
                <p className="font-sans text-[12px] tracking-[0.1em] text-white/45">
                  Ref. {listing.reference}
                </p>
              </div>
            </div>

            {/* Key specs */}
            <div className="flex flex-wrap gap-x-6 gap-y-3 py-5 border-y border-gold/25">
              <span className="inline-flex items-center gap-2 font-sans text-[14px] text-white/80">
                <BedDouble className="w-4 h-4 text-gold/70" strokeWidth={1.5} />
                {formatBedrooms(listing.bedrooms)}
              </span>
              <span className="inline-flex items-center gap-2 font-sans text-[14px] text-white/80">
                <Bath className="w-4 h-4 text-gold/70" strokeWidth={1.5} />
                {formatBathrooms(listing.bathrooms)}
              </span>
              <span className="inline-flex items-center gap-2 font-sans text-[14px] text-white/80">
                <Maximize2 className="w-4 h-4 text-gold/70" strokeWidth={1.5} />
                {formatSize(listing.size)}
              </span>
              {listing.propertyType && (
                <span className="inline-flex items-center gap-2 font-sans text-[14px] text-white/80">
                  <Building2 className="w-4 h-4 text-gold/70" strokeWidth={1.5} />
                  {listing.propertyType}
                </span>
              )}
              {listing.furnished && (
                <span className="font-sans text-[14px] text-white/80">
                  Furnished: {listing.furnished}
                </span>
              )}
              {listing.parkingSpaces !== null && listing.parkingSpaces > 0 && (
                <span className="inline-flex items-center gap-2 font-sans text-[14px] text-white/80">
                  <Car className="w-4 h-4 text-gold/70" strokeWidth={1.5} />
                  {listing.parkingSpaces} Parking
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-10 lg:gap-12">
              <div className="flex flex-col gap-10">
                {/* Location */}
                {locationParts.length > 0 && (
                  <section>
                    <h2 className="font-serif text-[22px] text-[#E8DFCF] mb-3">Location</h2>
                    <div className="flex items-start gap-2">
                      <MapPin
                        className="w-4 h-4 text-gold/70 shrink-0 mt-1"
                        strokeWidth={1.5}
                      />
                      <p className="font-sans text-[14px] text-white/75 leading-relaxed">
                        {locationParts.join(' · ')}
                      </p>
                    </div>
                    {listing.coordinates && (
                      <a
                        href={`https://www.google.com/maps?q=${listing.coordinates.lat},${listing.coordinates.lng}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center mt-4 h-[40px] px-5 border border-gold/55 text-white font-sans text-[11px] tracking-[0.16em] uppercase hover:bg-gold/10 hover:border-gold transition-all duration-300"
                      >
                        View on map
                      </a>
                    )}
                  </section>
                )}

                {/* Description */}
                {listing.description && (
                  <section>
                    <h2 className="font-serif text-[22px] text-[#E8DFCF] mb-4">
                      Description
                    </h2>
                    <p className="font-sans font-light text-[14px] md:text-[15px] text-white/70 leading-relaxed whitespace-pre-line">
                      {listing.description}
                    </p>
                  </section>
                )}

                {/* Amenities */}
                {allAmenities.length > 0 && (
                  <section>
                    <h2 className="font-serif text-[22px] text-[#E8DFCF] mb-4">
                      Amenities
                    </h2>
                    <ul className="flex flex-wrap gap-2">
                      {allAmenities.map((amenity) => (
                        <li
                          key={amenity}
                          className="font-sans text-[12px] tracking-[0.08em] text-white/70 border border-white/15 px-3 py-1.5"
                        >
                          {amenity}
                        </li>
                      ))}
                    </ul>
                  </section>
                )}

                {/* Details block */}
                {(listing.permitNumber ||
                  listing.buildYear ||
                  listing.completionStatus ||
                  listing.projectName ||
                  listing.serviceCharge !== null) && (
                  <section>
                    <h2 className="font-serif text-[22px] text-[#E8DFCF] mb-2">
                      Property details
                    </h2>
                    <dl className="border border-gold/25 bg-[#0E1F26] px-5 sm:px-6">
                      {listing.permitNumber && (
                        <DetailRow
                          label="RERA registration"
                          value={listing.permitNumber}
                        />
                      )}
                      {listing.buildYear && (
                        <DetailRow label="Year of completion" value={listing.buildYear} />
                      )}
                      <DetailRow
                        label="Ownership"
                        value={listing.freehold ? 'Freehold' : 'Leasehold'}
                      />
                      {listing.completionStatus && (
                        <DetailRow
                          label="Possession status"
                          value={listing.completionStatus}
                        />
                      )}
                      {listing.projectName && (
                        <DetailRow label="Project" value={listing.projectName} />
                      )}
                      {listing.serviceCharge !== null && (
                        <DetailRow
                          label="Maintenance"
                          value={`${listing.currency} ${new Intl.NumberFormat('en-IN').format(listing.serviceCharge)} /yr`}
                        />
                      )}
                    </dl>
                  </section>
                )}
              </div>

              {/* Agent card */}
              {listing.agent && (
                <aside className="lg:sticky lg:top-[calc(5rem+1.5rem)] h-fit">
                  <div className="border border-gold/35 bg-[#0E1F26] p-6">
                    <h2 className="font-serif text-[20px] text-[#E8DFCF] mb-5">
                      Contact agent
                    </h2>
                    <div className="flex items-center gap-4 mb-5">
                      {listing.agent.photo ? (
                        <img
                          src={listing.agent.photo}
                          alt={listing.agent.name}
                          className="shrink-0 size-16 rounded-full object-cover border border-gold/30"
                        />
                      ) : (
                        <AgentInitial name={listing.agent.name} />
                      )}
                      <div>
                        <p className="font-sans text-[15px] text-white/90">
                          {listing.agent.name}
                        </p>
                        {listing.agent.licenseNo && (
                          <p className="font-sans text-[12px] text-white/50 mt-1">
                            License {listing.agent.licenseNo}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      {listing.agent.mobile && (
                        <>
                          <a
                            href={`tel:${listing.agent.mobile.replace(/\s/g, '')}`}
                            className="inline-flex items-center justify-center gap-2 h-[42px] border border-gold/55 text-white font-sans text-[11px] tracking-[0.14em] uppercase hover:bg-gold/10 hover:border-gold transition-all duration-300"
                          >
                            <Phone className="w-4 h-4" strokeWidth={1.5} />
                            Call
                          </a>
                          {formatWhatsAppUrl(listing.agent.mobile) && (
                            <a
                              href={formatWhatsAppUrl(listing.agent.mobile)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center justify-center gap-2 h-[42px] border border-white/20 text-white/85 font-sans text-[11px] tracking-[0.14em] uppercase hover:border-gold/50 hover:text-gold transition-all duration-300"
                            >
                              WhatsApp
                            </a>
                          )}
                        </>
                      )}
                      {listing.agent.email && (
                        <a
                          href={`mailto:${listing.agent.email}`}
                          className="inline-flex items-center justify-center gap-2 h-[42px] border border-white/20 text-white/85 font-sans text-[11px] tracking-[0.14em] uppercase hover:border-gold/50 hover:text-gold transition-all duration-300"
                        >
                          <Mail className="w-4 h-4" strokeWidth={1.5} />
                          Email
                        </a>
                      )}
                    </div>
                  </div>
                </aside>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </main>
    </div>
  );
}
