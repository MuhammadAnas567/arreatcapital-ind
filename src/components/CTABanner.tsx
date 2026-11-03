import React from 'react';
import { motion } from 'framer-motion';
import { Button } from './Button';
import { design } from '../lib/design-tokens';

const { colors, layout, type } = design;

export function CTABanner() {
  return (
    <section
      id="strategy"
      className={`relative w-full overflow-hidden ${layout.scrollMt}`}
      style={{ backgroundColor: colors.olive }}
    >
      <div
        className="absolute inset-0 pointer-events-none india-surface-mesh opacity-80"
        aria-hidden="true"
      />
      <div
        className="absolute -right-24 top-1/2 h-[320px] w-[320px] -translate-y-1/2 rounded-full pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(201,163,106,0.14) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      <div className={`relative ${layout.container} ${layout.sectionPadding}`}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className={`${type.eyebrow} m-0 mb-4`}>Investment Strategy</p>
            <h2
              className="font-serif font-normal text-[34px] sm:text-[38px] md:text-[40px] lg:text-[44px] leading-[1.1] tracking-tightest max-w-[580px] m-0 text-cream"
            >
              Discover India&apos;s premium real estate investments tailored for growth
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className={`${layout.contentStack} max-w-[420px]`}
          >
            <p className={`${type.sectionSubtitle} m-0 text-cream/85`}>
              Our curated, investor-tailored solutions focus on high-growth Indian
              markets—delivering security, lasting value, and superior returns.
            </p>
            <Button variant="secondary" scrollTo="#projects" className="sm:min-w-[200px]">
              START INVESTING
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
