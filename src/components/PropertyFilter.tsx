import React from 'react';
import { SlidersHorizontal } from 'lucide-react';
import { cn } from './Button';
import {
  bedroomOptions,
  buyPriceMaxOptions,
  buyPriceOptions,
  lifestyleOptions,
  rentPriceMaxOptions,
  rentPriceOptions,
  type FilterState,
  type ListingType,
  type SizeUnit,
} from '../lib/opportunities';

interface PropertyFilterProps {
  filters: FilterState;
  isOpen: boolean;
  onToggle: () => void;
  onChange: (filters: FilterState) => void;
  onApply: () => void;
  onClear: () => void;
}

const fieldClass =
  'w-full h-[42px] bg-[#383F1C]/90 border border-white/15 px-3 text-white font-sans text-[13px] focus:outline-none focus:border-gold/50 transition-colors';

const sizeFieldClass =
  'w-full h-[42px] bg-[#383F1C]/90 border border-white/15 px-3 text-white font-sans text-[13px] placeholder:text-white/40 focus:outline-none focus:border-gold/50 transition-colors';

export function PropertyFilter({
  filters,
  isOpen,
  onToggle,
  onChange,
  onApply,
  onClear,
}: PropertyFilterProps) {
  const minPriceOptions =
    filters.listingType === 'BUY' ? buyPriceOptions : rentPriceOptions;
  const maxPriceOptions =
    filters.listingType === 'BUY' ? buyPriceMaxOptions : rentPriceMaxOptions;

  const update = <K extends keyof FilterState>(key: K, value: FilterState[K]) => {
    onChange({ ...filters, [key]: value });
  };

  const setListingType = (listingType: ListingType) => {
    onChange({
      ...filters,
      listingType,
      minPrice: null,
      maxPrice: null,
    });
  };

  const toggleLifestyle = (lifestyle: string) => {
    const lifestyles = filters.lifestyles.includes(lifestyle)
      ? filters.lifestyles.filter((item) => item !== lifestyle)
      : [...filters.lifestyles, lifestyle];
    update('lifestyles', lifestyles);
  };

  const activeFilterCount = [
    filters.minBeds !== null,
    filters.minPrice !== null,
    filters.maxPrice !== null,
    filters.minSize !== null,
    filters.maxSize !== null,
    filters.lifestyles.length > 0,
  ].filter(Boolean).length;

  return (
    <div className="border border-gold/35 bg-[#0E1F26]">
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 sm:px-6 py-4 border-b border-gold/20">
        <div className="flex items-center gap-6 sm:gap-8">
          {(['BUY', 'RENT'] as const).map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setListingType(type)}
              className={cn(
                'font-sans text-[12px] sm:text-[13px] tracking-[0.16em] uppercase pb-1 border-b-2 transition-colors',
                filters.listingType === type
                  ? 'text-white border-gold'
                  : 'text-white/55 border-transparent hover:text-white/80'
              )}
            >
              {type}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={onToggle}
          className="inline-flex items-center gap-2 font-sans text-[11px] tracking-[0.16em] uppercase text-gold hover:text-white transition-colors"
          aria-expanded={isOpen}
        >
          <SlidersHorizontal className="w-4 h-4" strokeWidth={1.5} />
          Filters
          {activeFilterCount > 0 && (
            <span className="inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full bg-gold text-black text-[10px] font-medium">
              {activeFilterCount}
            </span>
          )}
        </button>
      </div>

      {isOpen && (
        <div className="px-4 sm:px-6 py-6 sm:py-8 space-y-8">
          <div>
            <p className="font-sans text-[11px] tracking-[0.18em] uppercase text-white/50 mb-3">
              Bedrooms
            </p>
            <div className="flex flex-wrap gap-2">
              {bedroomOptions.map((beds) => {
                const isSelected = filters.minBeds === beds;

                return (
                  <button
                    key={beds}
                    type="button"
                    onClick={() => update('minBeds', isSelected ? null : beds)}
                    className={cn(
                      'h-9 min-w-[42px] px-3 border font-sans text-[12px] tracking-[0.04em] transition-colors',
                      isSelected
                        ? 'border-gold bg-gold/10 text-white'
                        : 'border-gold/30 text-white/70 hover:border-gold/55 hover:text-white'
                    )}
                  >
                    {beds}+
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <p className="font-sans text-[11px] tracking-[0.18em] uppercase text-white/50 mb-3">
              Price
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <select
                value={filters.minPrice?.toString() ?? ''}
                onChange={(e) =>
                  update('minPrice', e.target.value ? Number(e.target.value) : null)
                }
                className={fieldClass}
              >
                {minPriceOptions.map((option) => (
                  <option key={option.label} value={option.value} className="bg-olive">
                    {option.label}
                  </option>
                ))}
              </select>
              <select
                value={filters.maxPrice?.toString() ?? ''}
                onChange={(e) =>
                  update('maxPrice', e.target.value ? Number(e.target.value) : null)
                }
                className={fieldClass}
              >
                {maxPriceOptions.map((option) => (
                  <option key={option.label} value={option.value} className="bg-olive">
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-3">
              <p className="font-sans text-[11px] tracking-[0.18em] uppercase text-white/50">
                Property size
              </p>
              <div className="inline-flex border border-gold/30">
                {(['sqft', 'sqm'] as const).map((unit) => (
                  <button
                    key={unit}
                    type="button"
                    onClick={() => update('sizeUnit', unit as SizeUnit)}
                    className={cn(
                      'h-8 px-4 font-sans text-[11px] tracking-[0.08em] uppercase transition-colors',
                      filters.sizeUnit === unit
                        ? 'bg-gold text-black'
                        : 'text-white/70 hover:text-white'
                    )}
                  >
                    {unit === 'sqft' ? 'sq.ft.' : 'sq.m.'}
                  </button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="number"
                min={0}
                placeholder="Min"
                value={filters.minSize ?? ''}
                onChange={(e) =>
                  update('minSize', e.target.value ? Number(e.target.value) : null)
                }
                className={sizeFieldClass}
              />
              <input
                type="number"
                min={0}
                placeholder="Max"
                value={filters.maxSize ?? ''}
                onChange={(e) =>
                  update('maxSize', e.target.value ? Number(e.target.value) : null)
                }
                className={sizeFieldClass}
              />
            </div>
          </div>

          <div>
            <p className="font-sans text-[12px] font-semibold tracking-[0.14em] uppercase text-white mb-4">
              Lifestyle
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
              {lifestyleOptions.map((lifestyle) => {
                const isChecked = filters.lifestyles.includes(lifestyle);

                return (
                  <label
                    key={lifestyle}
                    className="flex items-center gap-3 cursor-pointer group"
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => toggleLifestyle(lifestyle)}
                      className="h-4 w-4 rounded-none border border-gold/50 bg-transparent accent-gold"
                    />
                    <span className="font-sans text-[13px] text-white/75 group-hover:text-white transition-colors">
                      {lifestyle}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-2 border-t border-gold/15">
            <button
              type="button"
              onClick={onClear}
              className="font-sans text-[11px] tracking-[0.16em] uppercase text-white/55 hover:text-gold transition-colors text-left sm:text-center"
            >
              Clear Selection
            </button>
            <button
              type="button"
              onClick={onApply}
              className="h-[46px] px-10 bg-olive border border-olive text-white font-sans text-[11px] tracking-[0.2em] uppercase hover:bg-[#2f3a04] transition-colors"
            >
              Filter
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
