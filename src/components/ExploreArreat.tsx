import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FileText, Home, KeyRound, TrendingUp } from 'lucide-react';
import { design } from '../lib/design-tokens';

const { layout, type } = design;

const links = [
  {
    title: 'Buy',
    body: 'Property, apartments & villas for sale across India.',
    href: '/properties-for-sale-in-india',
    icon: KeyRound,
  },
  {
    title: 'Rent',
    body: "Apartments & villas for rent in India's best communities.",
    href: '/properties-for-rent-in-india',
    icon: Home,
  },
  {
    title: 'Off-Plan',
    body: 'New launches & under-construction projects with flexible plans.',
    href: '/new-properties-off-plan-india',
    icon: FileText,
  },
  {
    title: 'Invest',
    body: 'ROI, rental yields & the best areas to invest in India.',
    href: '/invest',
    icon: TrendingUp,
  },
];

export function ExploreArreat() {
  return (
    <section
      id="properties"
      className={`relative w-full overflow-hidden ${layout.scrollMt} ${layout.sectionPadding}`}
      style={{ backgroundColor: '#0A1A20' }}
    >
      <div className="absolute inset-0 india-surface-mesh opacity-80" aria-hidden="true" />
      <div className="absolute inset-0 india-grain" aria-hidden="true" />

      <div className={`relative z-10 ${layout.container}`}>
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <p className={`${type.eyebrow} m-0 mb-3`}>Where to start</p>
          <h2 className={`${type.sectionTitle} m-0`}>Explore Arreat Capital India</h2>
          <div className={`${type.goldRule} mx-auto mt-6`} />
        </div>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {links.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.55, delay: index * 0.07 }}
              >
                <Link
                  to={item.href}
                  className="india-panel india-frame group relative block px-5 py-7"
                >
                  <Icon
                    className="mb-5 h-6 w-6 text-gold transition-transform duration-300 group-hover:scale-110"
                    strokeWidth={1.35}
                    aria-hidden="true"
                  />
                  <h3 className="font-serif text-[26px] font-normal tracking-tight text-cream m-0">
                    {item.title}
                  </h3>
                  <p className="mt-3 font-sans text-[14px] font-light leading-relaxed text-cream/65 m-0">
                    {item.body}
                  </p>
                  <span className="mt-6 inline-flex items-center gap-2 font-sans text-[10px] font-medium uppercase tracking-[0.2em] text-gold/80 transition-colors group-hover:text-gold">
                    View
                    <span
                      className="inline-block transition-transform duration-300 group-hover:translate-x-1"
                      aria-hidden="true"
                    >
                      →
                    </span>
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
