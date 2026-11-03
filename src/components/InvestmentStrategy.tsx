import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const strategies = [
  {
    id: '01',
    title: 'Private equity',
    content:
      'Direct investments into high-potential, privately held real estate assets and development companies, focusing on value-add and opportunistic strategies to maximize investor returns over a targeted hold period.',
  },
  {
    id: '02',
    title: 'Private debt',
    content:
      'Providing tailored financing solutions for premium real estate developments, securing attractive risk-adjusted yields through senior and mezzanine debt structures backed by tangible assets.',
  },
  {
    id: '03',
    title: 'Public equity',
    content:
      'Strategic allocation in publicly traded real estate investment trusts (REITs) and property companies, offering liquidity and exposure to broad market trends while maintaining a focus on quality portfolios.',
  },
  {
    id: '04',
    title: 'Indirect solutions',
    content:
      'Curated access to top-tier real estate funds and joint ventures, allowing investors to diversify their portfolios across various geographies and asset classes alongside institutional partners.',
  },
];

export function InvestmentStrategy() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <section id="strategy" className="w-full bg-cream border-y border-capabilities py-14 sm:py-20 md:py-24 scroll-mt-navbar md:scroll-mt-hero">
      <div className="w-full max-w-design mx-auto px-4 sm:px-6 md:px-12">
        <div className="text-center mb-10 md:mb-12">
          <span className="block font-sans text-[11px] tracking-[0.28em] uppercase text-capabilities/50 mb-4">
            How we invest
          </span>
          <h2 className="font-serif font-normal text-[28px] sm:text-[36px] md:text-[44px] leading-[1.12] tracking-tightest text-capabilities mb-4">
            Investment Strategy
          </h2>
          <div className="w-[60px] h-[2px] bg-gold mx-auto" />
        </div>

        <div className="border border-capabilities/15">
          {strategies.map((strategy, index) => {
            const isExpanded = expandedId === strategy.id;

            return (
              <motion.div
                key={strategy.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="border-b border-capabilities/15 last:border-b-0"
              >
                <button
                  type="button"
                  onClick={() => setExpandedId(isExpanded ? null : strategy.id)}
                  className="w-full py-7 md:py-9 px-6 md:px-10 flex items-center justify-between text-left group"
                  aria-expanded={isExpanded}
                >
                  <div className="flex items-baseline gap-5 md:gap-10 min-w-0">
                    <span className="font-sans text-[13px] md:text-[14px] font-bold tracking-[0.18em] text-capabilities/40 group-hover:text-gold transition-colors">
                      {strategy.id}
                    </span>
                    <h3 className="font-serif font-normal text-[24px] md:text-[34px] text-capabilities tracking-tightest group-hover:text-olive transition-colors">
                      {strategy.title}
                    </h3>
                  </div>
                  <span className="text-capabilities/40 group-hover:text-gold transition-colors ml-4 shrink-0">
                    {isExpanded ? (
                      <Minus size={22} strokeWidth={1.5} />
                    ) : (
                      <Plus size={22} strokeWidth={1.5} />
                    )}
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="pb-8 md:pb-10 px-6 md:px-10 pl-[4.5rem] md:pl-[5.5rem] font-sans font-light text-[15px] md:text-[16px] text-capabilities/70 leading-relaxed max-w-3xl">
                        {strategy.content}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
