import React, { Fragment } from 'react';
import { design } from '../lib/design-tokens';
import { partners } from './partnerLogos';

const { partnerBar, colors, layout } = design;

export function PartnerBarMobile() {
  return (
    <div
      className="relative z-20 w-full box-border border-t bg-capabilities"
      style={{ borderColor: colors.goldBorder }}
    >
      <div className={`${design.layout.container} py-5 sm:py-6`}>
        <p className="font-hero-body text-cream uppercase m-0 mb-4 text-[11px] sm:text-[12px] leading-[1.35] tracking-[0.1em] max-w-[320px]">
          <span className="font-light text-cream/70">WE ARE </span>
          <span className="font-semibold text-gold">OFFICIAL PARTNERS</span>{' '}
          <span className="font-light text-cream/70">WITH LEADING DEVELOPERS IN INDIA</span>
        </p>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-3 sm:gap-x-5 sm:gap-y-4">
          {partners.map((partner, index) => (
            <Fragment key={partner.id}>
              <div
                className="flex items-center justify-center shrink-0"
                aria-label={partner.name}
              >
                {partner.logo}
              </div>
              {index < partners.length - 1 && !partner.skipAfterDivider && (
                <span
                  className="w-px shrink-0"
                  style={{
                    height: partnerBar.logos.dividerHeight,
                    backgroundColor: colors.goldBorder,
                  }}
                  aria-hidden="true"
                />
              )}
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
