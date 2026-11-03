import React from 'react';
import { Button } from './Button';
import { PartnerBarMobile } from './PartnerBarMobile';
import { design } from '../lib/design-tokens';

const { hero, colors } = design;

export function HeroMobile() {
  return (
    <section className="md:hidden w-full scroll-mt-navbar bg-capabilities">
      <div className="relative w-full overflow-hidden">
        <div
          className="relative min-h-[min(78svh,680px)] sm:min-h-[min(80svh,720px)] flex flex-col"
          style={{ backgroundColor: colors.capabilities }}
        >
          <div className="absolute inset-0 overflow-hidden">
            <img
              src={hero.image}
              alt=""
              fetchPriority="high"
              decoding="async"
              aria-hidden="true"
              className="absolute inset-0 w-full h-full object-cover select-none animate-soft-zoom origin-[58%_42%]"
              style={{
                objectPosition: hero.imageFit.objectPosition,
                filter: 'brightness(0.92) saturate(1.15) contrast(1.06)',
              }}
            />

            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: hero.featherGradient }}
            />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: hero.topLeftGlow }}
            />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: hero.topAreaLift }}
            />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: hero.leftSideShade }}
            />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: hero.vignette }}
            />
            <div className="absolute inset-0 india-grain" aria-hidden="true" />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  'linear-gradient(180deg, rgba(5,15,19,0.4) 0%, rgba(5,15,19,0.12) 38%, transparent 68%)',
              }}
            />
          </div>

          <div className="relative z-10 flex flex-1 flex-col justify-end px-5 sm:px-6 pt-[calc(3.5rem+env(safe-area-inset-top,0px))] pb-9 sm:pb-10">
            <div className="flex flex-col gap-5 sm:gap-6 max-w-[440px]">
              <div className="india-fade-up flex items-center gap-3">
                <span className="h-px w-7 bg-gold" aria-hidden="true" />
                <p className="m-0 font-sans text-[10px] font-medium tracking-[0.34em] uppercase text-gold">
                  Arreat Capital India
                </p>
              </div>

              <h1 className="india-fade-up-delay font-hero text-cream font-normal text-[34px] sm:text-[40px] leading-[1.04] tracking-[-0.03em] m-0 max-w-[15ch] text-balance">
                Build wealth through{' '}
                <span className="italic text-gold/95">India&apos;s finest</span> real estate
              </h1>

              <div className="india-fade-up-delay india-rule h-px w-16 bg-gradient-to-r from-gold to-transparent" />

              <p className="india-fade-up-delay-2 font-hero-body text-cream/85 font-light text-[15px] sm:text-[16px] leading-[1.5] tracking-[0.02em] m-0 max-w-[34ch]">
                Discover premium residential and commercial opportunities across
                Mumbai, Bengaluru, Delhi-NCR and beyond.
              </p>

              <div className="india-fade-up-delay-2 flex flex-col sm:flex-row gap-3 w-full">
                <Button
                  variant="primary"
                  scrollTo="#projects"
                  className="!w-full sm:!flex-1 !h-[50px]"
                >
                  INVEST NOW
                </Button>
                <Button
                  variant="light"
                  scrollTo="#contact"
                  className="!w-full sm:!flex-1 !h-[50px]"
                >
                  TALK TO AN EXPERT
                </Button>
              </div>
            </div>
          </div>
        </div>

        <PartnerBarMobile />
      </div>
    </section>
  );
}
