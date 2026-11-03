import React from 'react';
import { cn } from './Button';
import type { SupportingOption } from '../lib/listings';
import type { PropertiesFilterState } from '../lib/propertyFilters';

interface PropertiesFilterBarProps {
  filters: PropertiesFilterState;
  propertyTypes: SupportingOption[];
  communities: SupportingOption[];
  optionsLoading: boolean;
  onChange: (filters: PropertiesFilterState) => void;
  onApply: () => void;
  onReset: () => void;
}

const fieldClass =
  'w-full h-[42px] bg-[#383F1C]/90 border border-white/15 px-3 text-white font-sans text-[13px] focus:outline-none focus:border-gold/50 transition-colors';

const labelClass =
  'font-sans text-[11px] tracking-[0.18em] uppercase text-white/50 mb-2 block';

const bedroomOptions = [
  { label: 'Any', value: '' },
  { label: 'Studio', value: '0' },
  { label: '1', value: '1' },
  { label: '2', value: '2' },
  { label: '3', value: '3' },
  { label: '4', value: '4' },
  { label: '5+', value: '5' },
] as const;

function SegmentGroup<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: T;
  options: { label: string; value: T }[];
  onChange: (value: T) => void;
}) {
  return (
    <div>
      <span className={labelClass}>{label}</span>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            key={option.label}
            type="button"
            onClick={() => onChange(option.value)}
            className={cn(
              'h-9 px-3 border font-sans text-[12px] tracking-[0.06em] transition-colors',
              value === option.value
                ? 'border-gold bg-gold/10 text-white'
                : 'border-gold/30 text-white/70 hover:border-gold/55 hover:text-white'
            )}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export function PropertiesFilterBar({
  filters,
  propertyTypes,
  communities,
  optionsLoading,
  onChange,
  onApply,
  onReset,
}: PropertiesFilterBarProps) {
  const update = <K extends keyof PropertiesFilterState>(
    key: K,
    value: PropertiesFilterState[K]
  ) => {
    onChange({ ...filters, [key]: value });
  };

  return (
    <div className="border border-gold/35 bg-[#0E1F26] mb-8 md:mb-10">
      <div className="px-4 sm:px-6 py-6 sm:py-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <SegmentGroup
            label="Purpose"
            value={filters.purpose}
            options={[
              { label: 'All', value: '' },
              { label: 'Rent', value: 'rent' },
              { label: 'Sale', value: 'sale' },
            ]}
            onChange={(value) => update('purpose', value)}
          />
          <SegmentGroup
            label="Category"
            value={filters.category}
            options={[
              { label: 'All', value: '' },
              { label: 'Residential', value: 'residential' },
              { label: 'Commercial', value: 'commercial' },
            ]}
            onChange={(value) => update('category', value)}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label htmlFor="property-type" className={labelClass}>
              Property type
            </label>
            <select
              id="property-type"
              value={filters.propertyType}
              onChange={(e) => update('propertyType', e.target.value)}
              disabled={optionsLoading}
              className={fieldClass}
            >
              <option value="" className="bg-olive">
                All types
              </option>
              {propertyTypes.map((option) => (
                <option key={option.value} value={option.value} className="bg-olive">
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <span className={labelClass}>Bedrooms</span>
            <div className="flex flex-wrap gap-2">
              {bedroomOptions.map((option) => (
                <button
                  key={option.label}
                  type="button"
                  onClick={() => update('bedrooms', option.value)}
                  className={cn(
                    'h-9 min-w-[42px] px-3 border font-sans text-[12px] tracking-[0.04em] transition-colors',
                    filters.bedrooms === option.value
                      ? 'border-gold bg-gold/10 text-white'
                      : 'border-gold/30 text-white/70 hover:border-gold/55 hover:text-white'
                  )}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label htmlFor="community" className={labelClass}>
              Locality
            </label>
            <select
              id="community"
              value={filters.community}
              onChange={(e) => update('community', e.target.value)}
              disabled={optionsLoading}
              className={fieldClass}
            >
              <option value="" className="bg-olive">
                All localities
              </option>
              {communities.map((option) => (
                <option key={option.value} value={option.value} className="bg-olive">
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label htmlFor="price-min" className={labelClass}>
              Min price (₹)
            </label>
            <input
              id="price-min"
              type="number"
              min={0}
              placeholder="Min"
              value={filters.priceMin}
              onChange={(e) => update('priceMin', e.target.value)}
              className={fieldClass}
            />
          </div>
          <div>
            <label htmlFor="price-max" className={labelClass}>
              Max price (₹)
            </label>
            <input
              id="price-max"
              type="number"
              min={0}
              placeholder="Max"
              value={filters.priceMax}
              onChange={(e) => update('priceMax', e.target.value)}
              className={fieldClass}
            />
          </div>
          <div>
            <label htmlFor="search" className={labelClass}>
              Search
            </label>
            <input
              id="search"
              type="text"
              placeholder="Listing title"
              value={filters.search}
              onChange={(e) => update('search', e.target.value)}
              className={fieldClass}
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 sm:justify-end pt-2">
          <button
            type="button"
            onClick={onReset}
            className="h-[44px] px-8 border border-white/20 text-white/80 font-sans text-[11px] tracking-[0.18em] uppercase hover:border-gold/50 hover:text-white transition-all duration-300"
          >
            Reset
          </button>
          <button
            type="button"
            onClick={onApply}
            className="h-[44px] px-8 border border-gold/55 text-white font-sans text-[11px] tracking-[0.18em] uppercase hover:bg-gold/10 hover:border-gold transition-all duration-300"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
}
