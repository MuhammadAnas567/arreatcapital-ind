import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ctaButtonClass } from './Button';
import { design } from '../lib/design-tokens';

const { layout, type, curating } = design;

const ticks = [
  'Independent, data-led recommendations across sale, rent and under-construction.',
  'Full transparency on price, fees and realistic net yields.',
  'End-to-end support: viewing, negotiation, paperwork and handover.',
  'Dedicated support for NRI and overseas investors.',
];

export function WhyArreat() {
  return (
    <section
      id="strategy"
      className={`relative w-full overflow-hidden ${layout.scrollMt} ${layout.sectionPadding}`}
      style={{ backgroundColor: '#050F13' }}
    >
      <div className="absolute inset-0 india-surface-mesh opacity-50" aria-hidden="true" />

      <div className={`relative z-10 ${layout.container}`}>
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className={layout.contentStack}>
            <p className={`${type.eyebrow} m-0`}>Why Arreat India</p>
            <h2 className={`${type.sectionTitle} m-0 max-w-xl`}>
              A property investment partner in India that puts your return first
            </h2>
            <div className={type.goldRule} />
            <p className={`${type.sectionSubtitle} m-0 max-w-xl`}>
              We built Arreat Capital India for investors who want clarity over
              sales pressure. Our advice is grounded in market data, rental
              performance and project delivery — not whichever unit pays the
              biggest commission.
            </p>
            <ul className="m-0 flex list-none flex-col gap-3.5 p-0">
              {ticks.map((item, i) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.06 }}
                  className="flex gap-3.5 font-sans text-[14px] font-light leading-relaxed text-cream/80"
                >
                  <span className="mt-2 h-px w-4 shrink-0 bg-gold" aria-hidden="true" />
                  <span>{item}</span>
                </motion.li>
              ))}
            </ul>
            <div>
              <Link to="/invest" className={`${ctaButtonClass} !h-[48px] !min-w-[200px]`}>
                See how we invest
              </Link>
            </div>
          </div>

          <div className="india-frame india-media relative aspect-[4/5] w-full sm:aspect-[5/4] lg:aspect-[365/379]">
            <img
              src={curating.image}
              alt="Premium Indian city skyline — Arreat Capital India"
              className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-[1.2s] ease-out hover:scale-[1.03]"
              loading="lazy"
              decoding="async"
            />
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                boxShadow: 'inset 0 0 0 1px rgba(212,179,122,0.2)',
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
