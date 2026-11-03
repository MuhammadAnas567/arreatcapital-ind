import type { Listing } from './listings';

const LOCALE = 'en-IN';

export function formatMoney(amount: number, currency = 'INR'): string {
  const formatted = new Intl.NumberFormat(LOCALE, {
    maximumFractionDigits: 0,
  }).format(amount);

  if (currency === 'INR' || currency === '₹') {
    return `₹${formatted}`;
  }

  return `${currency} ${formatted}`;
}

export function formatPrice(listing: Listing): string {
  const rentSuffix =
    listing.purpose === 'rent'
      ? listing.currency === 'INR'
        ? ' /mo'
        : ' /yr'
      : '';

  return `${formatMoney(listing.price, listing.currency)}${rentSuffix}`;
}

export function formatBedrooms(bedrooms: number): string {
  return bedrooms === 0 ? 'Studio' : `${bedrooms} BHK`;
}

export function formatBathrooms(bathrooms: number): string {
  return `${bathrooms} Bath`;
}

export function formatSize(size: number): string {
  return `${new Intl.NumberFormat(LOCALE).format(size)} sq.ft.`;
}

export function formatLocation(listing: Listing): string {
  const parts = [listing.location.community, listing.location.city].filter(
    Boolean
  );
  return parts.join(', ') || listing.location.region || 'India';
}

export function formatPurpose(purpose: Listing['purpose']): string {
  return purpose === 'rent' ? 'Rent' : 'Sale';
}

export function formatCategory(category: Listing['category']): string {
  return category === 'commercial' ? 'Commercial' : 'Residential';
}

export function formatWhatsAppUrl(mobile: string): string {
  const digits = mobile.replace(/\D/g, '');
  return digits ? `https://wa.me/${digits}` : '';
}
