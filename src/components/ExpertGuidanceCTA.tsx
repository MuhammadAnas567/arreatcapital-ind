import React from 'react';
import { motion } from 'framer-motion';
import { Button } from './Button';

export function ExpertGuidanceCTA() {
  return (
    <section className="w-full bg-capabilities border-y border-gold/25 py-14 md:py-16">
      <div className="w-full max-w-design mx-auto px-6 md:px-12">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="w-full lg:w-[48%] lg:max-w-[520px]"
          >
            <h2 className="font-serif font-normal text-[32px] sm:text-[38px] md:text-[44px] leading-[1.12] tracking-tightest text-white text-balance">
              Expert guidance from
              <br />
              a trusted investment team
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="w-full lg:w-[48%] lg:max-w-[480px] flex flex-col items-start"
          >
            <p className="font-sans font-light text-[15px] md:text-[16px] text-white/75 leading-[1.65] mb-8 md:mb-10">
              Work with experienced professionals who understand the market and
              build strategies tailored to your goals.
            </p>
            <Button variant="secondary" className="min-w-[160px]">
              Buy
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
