import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { DollarSign, MapPin, Maximize2 } from 'lucide-react';
import {
  defaultFilters,
  filterOpportunities,
  opportunities,
  type FilterState,
} from '../lib/opportunities';
import { PropertyFilter } from './PropertyFilter';
import { design } from '../lib/design-tokens';

const metaItems = [
  { key: 'price' as const, label: 'Price', icon: DollarSign },
  { key: 'location' as const, label: 'Location', icon: MapPin },
  { key: 'size' as const, label: 'Size', icon: Maximize2 },
];

export function OpportunitiesList() {
  const [draftFilters, setDraftFilters] = useState<FilterState>(defaultFilters);
  const [appliedFilters, setAppliedFilters] = useState<FilterState>(defaultFilters);
  const [isFilterOpen, setIsFilterOpen] = useState(true);

  const filteredOpportunities = useMemo(
    () => filterOpportunities(opportunities, appliedFilters),
    [appliedFilters]
  );

  const handleApply = () => {
    setAppliedFilters(draftFilters);
    setIsFilterOpen(false);
  };

  const handleClear = () => {
    const cleared = {
      ...defaultFilters,
      listingType: draftFilters.listingType,
    };
    setDraftFilters(cleared);
    setAppliedFilters(cleared);
  };

  return (
    <section id="projects" className={`${design.layout.section} ${design.layout.sectionPadding} ${design.layout.scrollMt}`}>
      <div className={design.layout.container}>
        <div className="text-center mb-10 md:mb-12">
          <h2 className={`${design.type.sectionTitle} mb-4`}>
            Exclusive Projects in India
          </h2>
          <div className={design.type.goldRule + ' mx-auto'} />
        </div>

        <div className="mb-6 md:mb-8">
          <PropertyFilter
            filters={draftFilters}
            isOpen={isFilterOpen}
            onToggle={() => setIsFilterOpen((open) => !open)}
            onChange={(next) => {
              setDraftFilters(next);
              if (next.listingType !== draftFilters.listingType) {
                setAppliedFilters(next);
              }
            }}
            onApply={handleApply}
            onClear={handleClear}
          />
        </div>

        <div className="border border-gold/40 p-3 sm:p-4 md:p-6">
          <div className="flex flex-col gap-4 md:gap-5">
            {filteredOpportunities.length === 0 ? (
              <div className="py-16 px-6 text-center border border-gold/25 bg-[#0E1F26]">
                <p className="font-serif text-[22px] text-white/90 mb-2">
                  No projects match your filters
                </p>
                <p className="font-sans text-[14px] text-white/55 mb-6">
                  Try adjusting your selection or clear filters to see all opportunities.
                </p>
                <button
                  type="button"
                  onClick={handleClear}
                  className="h-[44px] px-8 border border-gold/55 text-white font-sans text-[11px] tracking-[0.18em] uppercase hover:bg-gold/10 hover:border-gold transition-all duration-300"
                >
                  Clear Selection
                </button>
              </div>
            ) : (
              filteredOpportunities.map((opp, index) => (
                <motion.article
                  key={opp.id}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{
                    duration: 0.7,
                    delay: index * 0.1,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="flex flex-col md:flex-row w-full border border-gold/35 bg-capabilities overflow-hidden group"
                >
                  <div className="w-full md:w-1/2 p-5 sm:p-8 md:p-10 flex flex-col order-2 md:order-1">
                    <h3 className="font-serif font-normal text-[22px] sm:text-[28px] md:text-[34px] leading-[1.15] tracking-tightest text-[#E8DFCF] mb-3 sm:mb-4">
                      {opp.title}
                    </h3>
                    <p className="font-sans font-light text-[14px] md:text-[15px] text-white/65 leading-relaxed mb-8 max-w-[360px]">
                      {opp.description}
                    </p>

                    <div className="grid grid-cols-2 gap-x-6 gap-y-5 mb-8">
                      {metaItems.map((item) => {
                        const Icon = item.icon;
                        const value = opp[item.key];

                        return (
                          <div
                            key={item.key}
                            className={item.key === 'size' ? 'col-span-2' : ''}
                          >
                            <div className="flex items-center gap-2 mb-1.5">
                              <Icon
                                className="w-3.5 h-3.5 text-gold/70"
                                strokeWidth={1.5}
                              />
                              <span className="font-sans text-[11px] tracking-[0.14em] uppercase text-white/45">
                                {item.label}
                              </span>
                            </div>
                            <p className="font-sans text-[14px] text-white/85 tracking-wide">
                              {value}
                            </p>
                          </div>
                        );
                      })}
                    </div>

                    <div className="mt-auto flex justify-stretch sm:justify-end pt-2">
                      <Link
                        to="/properties"
                        className="inline-flex items-center justify-center h-[44px] w-full sm:w-auto sm:min-w-[140px] px-6 border border-gold/55 text-white font-sans text-[11px] tracking-[0.18em] uppercase hover:bg-gold/10 hover:border-gold transition-all duration-300 whitespace-nowrap"
                      >
                        See More
                      </Link>
                    </div>
                  </div>

                  <div className="w-full md:w-1/2 min-h-[220px] sm:min-h-[260px] md:min-h-[320px] relative overflow-hidden bg-[#10242C] order-1 md:order-2">
                    <img
                      src={opp.image}
                      alt={opp.title}
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                  </div>
                </motion.article>
              ))
            )}
          </div>

          {filteredOpportunities.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex justify-center mt-6 md:mt-8"
            >
              <Link
                to="/properties"
                className="inline-flex items-center justify-center h-[48px] w-full sm:w-auto sm:min-w-[220px] px-10 border border-gold/55 text-white font-sans text-[11px] tracking-[0.2em] uppercase hover:bg-gold/10 hover:border-gold transition-all duration-300 whitespace-nowrap"
              >
                Explore More
              </Link>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
