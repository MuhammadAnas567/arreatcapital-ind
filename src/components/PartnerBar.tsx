import React, { Fragment } from 'react';
import { design } from '../lib/design-tokens';
import { partners } from './partnerLogos';

const { partnerBar, colors } = design;
const textStyle = partnerBar.text;
const logosStyle = partnerBar.logos;

type PartnerBarProps = {
  fillHeight?: boolean;
};

export function PartnerBar({ fillHeight = false }: PartnerBarProps) {
  return (
    <div
      className={`relative w-full box-border border-t border-b bg-capabilities overflow-hidden${fillHeight ? ' h-full' : ''}`}
      style={{
        borderColor: `${colors.goldBorder}88`,
        minHeight: fillHeight ? undefined : partnerBar.height,
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none india-surface-mesh opacity-60"
        aria-hidden="true"
      />
      <div className="absolute inset-0 india-grain" aria-hidden="true" />
      <div
        className="relative mx-auto flex h-full w-full max-w-design flex-col items-start justify-center gap-5 px-5 sm:px-6 md:flex-row md:items-center md:justify-between md:gap-8 md:px-12 lg:px-[82px] py-5 md:py-0"
      >
        <p
          className="m-0 max-w-[420px] font-hero-body uppercase text-cream"
          style={{
            fontSize: textStyle.fontSize,
            lineHeight: `${textStyle.lineHeight * 100}%`,
            letterSpacing: textStyle.letterSpacing,
          }}
        >
          <span className="font-light text-cream/70">WE ARE </span>
          <span className="font-semibold text-gold">OFFICIAL PARTNERS</span>
          <br />
          <span className="font-light text-cream/70">WITH LEADING DEVELOPERS IN INDIA</span>
        </p>

        <div
          className="flex flex-row flex-nowrap items-center overflow-x-auto scrollbar-hide"
          style={{ gap: logosStyle.gap }}
        >
          {partners.map((partner, index) => (
            <Fragment key={partner.id}>
              <div
                className="flex shrink-0 items-center justify-center"
                aria-label={partner.name}
              >
                {partner.logo}
              </div>
              {index < partners.length - 1 && !partner.skipAfterDivider && (
                <span
                  className="w-px shrink-0"
                  style={{
                    height: logosStyle.dividerHeight,
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
