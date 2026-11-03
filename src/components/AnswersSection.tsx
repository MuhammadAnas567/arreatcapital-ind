import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { Button } from './Button';

const faqs = [
  {
    q: 'What is the minimum investment?',
    a: 'Curated opportunities typically start around ₹2 Cr for ready homes, with select under-construction launches available at lower entry tickets depending on the city and product type.',
  },
  {
    q: 'How are returns structured?',
    a: 'Most clients target rental yield plus capital appreciation. We model realistic net yields after maintenance, society charges and vacancy — not brochure gross numbers.',
  },
  {
    q: 'Can NRIs and overseas investors buy?',
    a: 'Yes. NRIs can purchase residential and commercial property in India under FEMA guidelines. We support documentation, remittance guidance and remote transaction coordination.',
  },
  {
    q: 'What due diligence do you perform?',
    a: 'Every shortlist includes title checks, RERA status, developer track record, pricing vs comps, and possession / payment-plan risk for under-construction stock.',
  },
  {
    q: 'Ready home or under-construction?',
    a: 'Depends on your horizon. Ready homes offer faster rental start; off-plan can improve entry price if the developer and micro-market are sound. We compare both transparently.',
  },
  {
    q: 'What fees apply?',
    a: 'Advisory fees and any brokerage are disclosed upfront. No surprise commissions steered by whichever project pays the highest incentive.',
  },
];

export function AnswersSection() {
  const [openIndex, setOpenIndex] = useState<number>(0);

  return (
    <section id="faq" className="w-full bg-capabilities border-y border-gold/25 py-20 md:py-24">
      <div className="w-full max-w-design mx-auto px-6 md:px-12">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10 lg:gap-16 mb-14 md:mb-16">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-[48%] lg:max-w-[520px]"
          >
            <h2 className="font-serif font-normal text-[32px] sm:text-[38px] md:text-[44px] leading-[1.12] tracking-tightest text-cream text-balance">
              Answers that matter most to India investors
            </h2>
          </motion.div>

          <div className="w-full lg:flex-1">
            <ul className="m-0 flex list-none flex-col gap-0 p-0 border-t border-gold/20">
              {faqs.map((item, index) => {
                const isOpen = openIndex === index;
                return (
                  <li key={item.q} className="border-b border-gold/20">
                    <button
                      type="button"
                      onClick={() => setOpenIndex(isOpen ? -1 : index)}
                      className="flex w-full items-center justify-between gap-4 py-5 text-left"
                      aria-expanded={isOpen}
                    >
                      <span className="font-sans text-[15px] sm:text-[16px] text-cream/90">
                        {item.q}
                      </span>
                      {isOpen ? (
                        <Minus className="h-4 w-4 shrink-0 text-gold" />
                      ) : (
                        <Plus className="h-4 w-4 shrink-0 text-gold" />
                      )}
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          className="overflow-hidden"
                        >
                          <p className="pb-5 font-sans text-[14px] font-light leading-relaxed text-cream/65 m-0 max-w-2xl">
                            {item.a}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </li>
                );
              })}
            </ul>
            <div className="mt-8">
              <Button variant="light" scrollTo="#contact" className="!h-[48px]">
                Talk to an advisor
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
