import React from 'react';
import { Link } from 'react-router-dom';
import { design } from '../lib/design-tokens';

const { layout, type } = design;

export function HomeSeoProse() {
  return (
    <section className={`${layout.section} ${layout.sectionPadding}`}>
      <div className={`${layout.container} max-w-4xl`}>
        <p className={`${type.eyebrow} m-0 mb-3`}>India real estate</p>
        <h2 className={`${type.sectionTitle} m-0`}>
          Premium property investment across India&apos;s growth cities
        </h2>
        <div className={`${type.goldRule} mt-5 mb-6`} />
        <div className="space-y-4 font-sans text-[15px] font-light leading-relaxed text-white/75">
          <p className="m-0">
            Arreat Capital India helps investors and homeowners navigate Mumbai,
            Bengaluru, Delhi-NCR and other high-potential markets with clear,
            numbers-led advice. Whether you are buying to live, letting for yield,
            or comparing ready homes with under-construction launches, we shortlist
            opportunities that fit your timeline and risk profile.
          </p>
          <p className="m-0">
            Start with{' '}
            <Link to="/properties-for-sale-in-india" className="text-gold hover:underline">
              property for sale in India
            </Link>
            , browse{' '}
            <Link to="/properties-for-rent-in-india" className="text-gold hover:underline">
              rentals
            </Link>
            , or explore{' '}
            <Link to="/new-properties-off-plan-india" className="text-gold hover:underline">
              off-plan projects
            </Link>
            . Prefer a conversation first? Visit our{' '}
            <Link to="/invest" className="text-gold hover:underline">
              invest
            </Link>{' '}
            guide or{' '}
            <Link to="/contact" className="text-gold hover:underline">
              contact the team
            </Link>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
