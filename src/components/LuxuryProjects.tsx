import React from 'react';
import { Button } from './Button';
import { design } from '../lib/design-tokens';
import { useArtboardScale } from '../hooks/useArtboardScale';

const LUXURY_IMAGE = '/luxury-projects.png';
const { colors, splitArtboard, layout, type } = design;

function LuxuryProjectsMobile() {
  return (
    <section
      id="luxury-projects"
      className={`md:hidden w-full border-y border-[#B8925A] ${layout.scrollMt} overflow-hidden`}
      style={{ backgroundColor: colors.capabilities }}
    >
      <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] overflow-hidden bg-[#10242C]">
        <img
          src={LUXURY_IMAGE}
          alt="Futuristic luxury residential tower with illuminated terraces overlooking an Indian city skyline"
          className="absolute inset-0 w-full h-full object-cover object-center"
          loading="lazy"
          decoding="async"
        />
      </div>

      <div className={`${layout.container} ${layout.sectionPadding}`}>
        <div className={`${layout.contentStack} max-w-xl`}>
          <p className={`${type.eyebrow} m-0`}>What We Do</p>

          <h2 className={`${type.sectionTitle} m-0 max-w-[16ch]`}>
            Explore Luxury Projects
          </h2>

          <p className={`${type.sectionSubtitle} m-0`}>
            Our curated, investor-tailored solutions focus on premium real estate
            projects, delivering top security, lasting value, and superior returns.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Button variant="secondary" scrollTo="#contact" className="!w-full sm:!flex-1">
              INVEST NOW
            </Button>
            <Button variant="light" scrollTo="#contact" className="!w-full sm:!flex-1">
              TALK TO AN EXPERT
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

function LuxuryProjectsDesktop() {
  const scale = useArtboardScale(splitArtboard.width);
  const scaledHeight = splitArtboard.height * scale;

  return (
    <section
      className={`hidden md:block relative w-full border-y border-[#B8925A] ${layout.scrollMt} overflow-hidden`}
      style={{ backgroundColor: colors.capabilities }}
    >
      <div
        className="relative w-full"
        style={{ height: scaledHeight, backgroundColor: colors.capabilities }}
      >
        <div
          className="absolute left-1/2 top-0"
          style={{
            width: splitArtboard.width,
            height: splitArtboard.height,
            transform: `translateX(-50%) scale(${scale})`,
            transformOrigin: 'top center',
          }}
        >
          <div
            className="absolute top-0 left-0 flex flex-col justify-center"
            style={{
              width: splitArtboard.contentWidth,
              height: splitArtboard.height,
              paddingLeft: splitArtboard.paddingLeft,
              paddingRight: 40,
              gap: 24,
            }}
          >
            <p className={`${type.eyebrow} m-0`}>What We Do</p>

            <h2 className={`${type.sectionTitle} m-0 max-w-[480px]`}>
              Explore Luxury Projects
            </h2>

            <p className={`${type.sectionSubtitle} m-0 max-w-[423px]`}>
              Our curated, investor-tailored solutions focus on premium real
              estate projects, delivering top security, lasting value, and
              superior returns.
            </p>

            <div className="flex flex-wrap gap-3 max-w-[520px] pt-2">
              <Button variant="secondary" scrollTo="#contact" className="!min-w-[190px]">
                INVEST NOW
              </Button>
              <Button variant="light" scrollTo="#contact" className="!min-w-[190px]">
                TALK TO AN EXPERT
              </Button>
            </div>
          </div>

          <div
            className="absolute top-0 overflow-hidden"
            style={{
              left: splitArtboard.imageLeft,
              width: splitArtboard.imageWidth,
              height: splitArtboard.imageHeight,
            }}
          >
            <img
              src={LUXURY_IMAGE}
              alt="Futuristic luxury residential tower with illuminated terraces overlooking an Indian city skyline"
              className="w-full h-full object-cover object-center"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export function LuxuryProjects() {
  return (
    <>
      <LuxuryProjectsMobile />
      <LuxuryProjectsDesktop />
    </>
  );
}
