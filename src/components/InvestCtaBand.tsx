import React from 'react';
import { Link } from 'react-router-dom';
import { ctaButtonClass, ctaButtonLightClass } from './Button';
import { CONTACT_PATH, WHATSAPP_URL } from '../lib/siteNav';
import { design } from '../lib/design-tokens';

const { layout, type, contact } = design;

export function InvestCtaBand() {
  return (
    <section
      id="consult"
      className={`relative w-full overflow-hidden ${layout.scrollMt} ${layout.sectionPadding}`}
      style={{ backgroundColor: '#0F242C' }}
    >
      <div className="absolute inset-0 india-surface-mesh" aria-hidden="true" />
      <div className="absolute inset-0 india-jaali opacity-40" aria-hidden="true" />
      <div className="absolute inset-0 india-grain" aria-hidden="true" />

      <div className={`relative z-10 ${layout.container}`}>
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div className={layout.contentStack}>
            <p className={`${type.eyebrow} m-0`}>Next step</p>
            <h2 className={`${type.sectionTitle} m-0 max-w-xl`}>
              Ready to invest in India the right way?
            </h2>
            <div className={type.goldRule} />
            <p className={`${type.sectionSubtitle} m-0 max-w-xl`}>
              Book a no-pressure consultation with an Arreat Capital India advisor.
              We&apos;ll assess your goals and shortlist opportunities that
              actually fit them.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                to={CONTACT_PATH}
                className={`${ctaButtonClass} !h-[50px] !min-w-[200px]`}
              >
                Book a consultation
              </Link>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={`${ctaButtonLightClass} !h-[50px] !min-w-[160px]`}
              >
                WhatsApp us
              </a>
            </div>
          </div>

          <div className="india-frame india-media relative aspect-[16/11] w-full">
            <img
              src={contact.image}
              alt="Arreat Capital India — real estate advisory"
              className="absolute inset-0 h-full w-full object-cover object-center"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
