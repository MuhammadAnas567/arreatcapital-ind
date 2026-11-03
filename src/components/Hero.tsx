import React from 'react';
import { Button } from './Button';
import { PartnerBar } from './PartnerBar';
import { HeroMobile } from './HeroMobile';
import { design } from '../lib/design-tokens';
import { useArtboardScale } from '../hooks/useArtboardScale';

const { artboard, hero, colors } = design;

function HeroDesktop() {
  const scale = useArtboardScale();
  const scaledHeight = artboard.sectionHeight * scale;
  const scaledHeroHeight = artboard.heroHeight * scale;

  return (
    <section className="hidden md:block w-full scroll-mt-hero bg-capabilities">
      <div
        className="relative w-full overflow-hidden"
        style={{ height: scaledHeight, backgroundColor: colors.capabilities }}
      >
        <div
          className="absolute inset-x-0 top-0 overflow-hidden"
          style={{ height: scaledHeroHeight }}
        >
          <img
            src={hero.image}
            alt=""
            fetchPriority="high"
            decoding="async"
            aria-hidden="true"
            className="absolute inset-0 w-full h-full max-w-none select-none object-cover animate-soft-zoom origin-center"
            style={{
              objectPosition: hero.imageFit.objectPosition,
              zIndex: 0,
              filter: 'brightness(0.92) saturate(1.15) contrast(1.06)',
            }}
          />

          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: hero.featherGradient, zIndex: 3 }}
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: hero.topLeftGlow, zIndex: 4 }}
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: hero.topAreaLift, zIndex: 5 }}
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: hero.leftSideShade, zIndex: 6 }}
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: hero.vignette, zIndex: 7 }}
          />
          <div className="absolute inset-0 india-grain z-[8]" aria-hidden="true" />
        </div>

        <div
          className="absolute left-1/2 top-0 isolate z-10"
          style={{
            width: artboard.width,
            height: artboard.sectionHeight,
            transform: `translateX(-50%) scale(${scale})`,
            transformOrigin: 'top center',
          }}
        >
          <div
            className="absolute top-0 left-0"
            style={{
              width: artboard.width,
              height: artboard.heroHeight,
            }}
          >
            <div
              className="absolute"
              style={{
                zIndex: 10,
                top: 0,
                left: 0,
                width: artboard.width,
                height: artboard.heroHeight,
              }}
            >
              <div
                className="absolute flex flex-col gap-6"
                style={{
                  top: hero.title.top,
                  left: hero.title.left,
                  width: hero.title.width,
                }}
              >
                <div className="india-fade-up flex items-center gap-3">
                  <span className="h-px w-8 bg-gold" aria-hidden="true" />
                  <p className="m-0 font-sans text-[12px] font-medium tracking-[0.36em] uppercase text-gold">
                    Arreat Capital India
                  </p>
                </div>

                <h1 className={`india-fade-up-delay ${design.type.heroTitle} m-0 text-balance`}>
                  Build wealth through
                  <br />
                  <span className="italic text-gold/95">India&apos;s finest</span> real estate
                </h1>

                <div className="india-rule h-px w-20 bg-gradient-to-r from-gold to-transparent" />

                <p
                  className={`india-fade-up-delay-2 ${design.type.heroBody} m-0`}
                  style={{ maxWidth: hero.body.width }}
                >
                  Discover premium residential and commercial opportunities
                  across Mumbai, Bengaluru, Delhi-NCR and beyond.
                </p>

                <div className="india-fade-up-delay-2 flex flex-wrap gap-3.5 pt-1">
                  <Button
                    variant="primary"
                    scrollTo="#projects"
                    style={{
                      width: hero.primaryButton.width,
                      height: hero.primaryButton.height,
                      minWidth: hero.primaryButton.width,
                    }}
                  >
                    INVEST NOW
                  </Button>

                  <Button
                    variant="light"
                    scrollTo="#contact"
                    className="!px-0"
                    style={{
                      width: hero.secondaryButton.width,
                      height: hero.secondaryButton.height,
                      minWidth: hero.secondaryButton.width,
                    }}
                  >
                    TALK TO AN EXPERT
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className="absolute inset-x-0 bottom-0 z-20"
          style={{ height: scaledHeight - scaledHeroHeight }}
        >
          <PartnerBar fillHeight />
        </div>
      </div>
    </section>
  );
}

export function Hero() {
  return (
    <div id="overview" className="scroll-mt-navbar md:scroll-mt-hero">
      <HeroMobile />
      <HeroDesktop />
    </div>
  );
}
