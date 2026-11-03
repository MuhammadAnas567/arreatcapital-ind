import React from 'react';
import { motion } from 'framer-motion';

const testimonials = [
  {
    quote:
      "Their curated approach to India's real estate market helped me secure a high-yield asset that exceeded my portfolio expectations.",
    name: 'Alexander Wright',
    title: 'Private Investor',
  },
  {
    quote:
      "Unparalleled access to premium off-plan developments. The team's market insight and white-glove service are truly exceptional.",
    name: 'Sarah Al-Fayed',
    title: 'Portfolio Manager',
  },
];

export function Testimonials() {
  return (
    <section className="w-full bg-olive border-y border-capabilities py-20 md:py-24">
      <div className="w-full max-w-design mx-auto px-6 md:px-12">
        <div className="text-center mb-14 md:mb-16">
          <h2 className="font-serif font-normal text-[34px] md:text-[44px] tracking-tightest text-white mb-4">
            Investor Success
          </h2>
          <div className="w-[60px] h-[2px] bg-gold mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          {testimonials.map((t, i) => (
            <motion.blockquote
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, delay: i * 0.12 }}
              className="relative p-8 md:p-10 border border-gold/35 bg-capabilities/40"
            >
              <div className="text-gold text-5xl font-serif absolute top-3 left-5 opacity-25">
                &ldquo;
              </div>
              <p className="font-serif italic text-[18px] md:text-[22px] text-white/90 leading-relaxed mb-8 relative z-10">
                {t.quote}
              </p>
              <footer className="flex items-center gap-4">
                <div className="w-10 h-px bg-gold" />
                <div>
                  <cite className="not-italic font-sans text-[13px] text-white tracking-[0.14em] uppercase block mb-1">
                    {t.name}
                  </cite>
                  <span className="font-sans text-[11px] text-gold tracking-[0.14em] uppercase">
                    {t.title}
                  </span>
                </div>
              </footer>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
