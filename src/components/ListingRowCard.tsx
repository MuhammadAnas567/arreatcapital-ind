import React from 'react';
import { Link } from 'react-router-dom';
import { DollarSign, MapPin, Maximize2 } from 'lucide-react';
import type { Listing } from '../lib/listings';
import {
  formatBathrooms,
  formatBedrooms,
  formatLocation,
  formatPrice,
  formatPurpose,
  formatSize,
} from '../lib/formatListing';
import { ctaButtonLightClass, cn } from './Button';
import { design } from '../lib/design-tokens';

const { layout } = design;
const CREAM = '#F3EADF';
const GOLD = '#D4B37A';

type ListingRowCardProps = {
  listing: Listing;
  showAction?: boolean;
};

export function ListingRowCard({ listing, showAction = true }: ListingRowCardProps) {
  const imageUrl = listing.images[0]?.url;
  const summary = `${formatBedrooms(listing.bedrooms)} · ${formatBathrooms(listing.bathrooms)} · ${formatPurpose(listing.purpose)}`;

  return (
    <article className="group flex flex-col md:flex-row w-full border border-gold/30 bg-[#071418]/80 overflow-hidden transition-colors duration-300 hover:border-gold/55">
      <div className="w-full md:w-1/2 flex flex-col p-6 sm:p-7 md:p-8 lg:p-10 order-2 md:order-1">
        <div className={`${layout.contentStack} flex-1`}>
          <h2
            className="font-serif font-normal text-[24px] sm:text-[28px] md:text-[32px] lg:text-[34px] leading-[1.15] tracking-tightest m-0"
            style={{ color: CREAM }}
          >
            {listing.title}
          </h2>

          <p className="font-sans font-light text-[14px] md:text-[15px] text-white/65 leading-relaxed m-0 max-w-[380px]">
            {summary}
            {listing.propertyType ? ` · ${listing.propertyType}` : ''}
          </p>

          <div className="grid grid-cols-2 gap-x-8 gap-y-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <DollarSign
                  className="w-3.5 h-3.5"
                  strokeWidth={1.5}
                  style={{ color: `${GOLD}B3` }}
                />
                <span className="font-sans text-[11px] tracking-[0.14em] uppercase text-white/45">
                  Price
                </span>
              </div>
              <p className="font-sans text-[14px] text-white/85 tracking-wide m-0">
                {formatPrice(listing)}
              </p>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <MapPin
                  className="w-3.5 h-3.5"
                  strokeWidth={1.5}
                  style={{ color: `${GOLD}B3` }}
                />
                <span className="font-sans text-[11px] tracking-[0.14em] uppercase text-white/45">
                  Location
                </span>
              </div>
              <p className="font-sans text-[14px] text-white/85 tracking-wide m-0">
                {formatLocation(listing)}
              </p>
            </div>

            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-1.5">
                <Maximize2
                  className="w-3.5 h-3.5"
                  strokeWidth={1.5}
                  style={{ color: `${GOLD}B3` }}
                />
                <span className="font-sans text-[11px] tracking-[0.14em] uppercase text-white/45">
                  Size
                </span>
              </div>
              <p className="font-sans text-[14px] text-white/85 tracking-wide m-0">
                {formatSize(listing.size)}
              </p>
            </div>
          </div>
        </div>

        {showAction && (
          <div className="flex justify-stretch sm:justify-end pt-4">
            <Link
              to={`/property/${listing.slug}`}
              className={cn(ctaButtonLightClass, 'w-full sm:w-auto sm:min-w-[140px] h-[44px] px-6')}
            >
              SEE MORE
            </Link>
          </div>
        )}
      </div>

      <Link
        to={`/property/${listing.slug}`}
        className="w-full md:w-1/2 relative min-h-[240px] sm:min-h-[280px] md:min-h-[320px] order-1 md:order-2 overflow-hidden bg-[#10242C] block"
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={listing.title}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center font-sans text-[12px] tracking-[0.14em] uppercase text-white/35">
            No image
          </div>
        )}
      </Link>
    </article>
  );
}
