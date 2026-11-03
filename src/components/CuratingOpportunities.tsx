import React from 'react';
import { Link } from 'react-router-dom';
import { Button, ctaButtonClass } from './Button';
import { design } from '../lib/design-tokens';

const { curating, layout, type } = design;

function CuratingOpportunitiesMobile() {
  return (
    <section
      className="md:hidden w-full overflow-hidden"
      style={{ backgroundColor: curating.background }}
    >
      <div className={`${layout.container} ${layout.sectionPadding}`}>
        <div className={`${layout.contentStack} ${layout.sectionHeaderGap}`}>
          <h2
            className="font-serif font-normal text-[28px] sm:text-[32px] leading-[1.12] tracking-tightest text-white m-0"
            style={{ fontFamily: '"Kaisei Opti", serif' }}
          >
            Curating India&apos;s Most Promising Investment Opportunities
          </h2>

          <p className={`${type.sectionSubtitle} m-0 text-white/90 max-w-xl`}>
            Focused on prime locations with strong development outlooks. We select
            only areas that promise sustainable growth and lasting investment value.
          </p>
        </div>

        <div className="relative w-full aspect-[4/3] sm:aspect-[16/11] overflow-hidden mb-8">
          <img
            src={curating.image}
            alt="Modern Indian city skyline at dusk with premium towers"
            className="absolute inset-0 w-full h-full object-cover object-center"
            loading="lazy"
            decoding="async"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            to="/properties"
            className={`${ctaButtonClass} !w-full sm:!flex-1 !h-[48px]`}
          >
            EXPLORE OPPORTUNITIES
          </Link>
          <Button
            variant="secondary"
            scrollTo="#contact"
            className="!w-full sm:!flex-1 !h-[48px]"
          >
            SPEAK WITH AN AGENT
          </Button>
        </div>
      </div>
    </section>
  );
}

function CuratingOpportunitiesDesktop() {
  return (
    <section
      className="hidden md:block w-full overflow-hidden"
      style={{ backgroundColor: curating.background }}
    >
      <div className={`${layout.container} ${layout.sectionPadding}`}>
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_365px] gap-10 lg:gap-16 items-center">
          <div className={`${layout.contentStack} max-w-[582px]`}>
            <h2
              className="font-serif font-normal text-[38px] lg:text-[42px] leading-[1.09] tracking-tightest text-white m-0"
              style={{ fontFamily: '"Kaisei Opti", serif' }}
            >
              Curating India&apos;s Most Promising Investment Opportunities
            </h2>

            <p className={`${type.sectionSubtitle} m-0 text-white/90 max-w-[443px]`}>
              Focused on prime locations with strong development outlooks. We
              select only areas that promise sustainable growth and lasting
              investment value.
            </p>

            <div className="flex flex-wrap items-center gap-3.5">
              <Link
                to="/properties"
                className={`${ctaButtonClass} !min-w-[249px] !h-[50px]`}
              >
                EXPLORE OPPORTUNITIES
              </Link>

              <Button
                variant="secondary"
                scrollTo="#contact"
                className="!min-w-[249px] !h-[50px]"
              >
                SPEAK WITH AN AGENT
              </Button>
            </div>
          </div>

          <div className="relative aspect-[365/379] w-full max-w-[365px] lg:max-w-none lg:ml-auto overflow-hidden">
            <img
              src={curating.image}
              alt="Modern Indian city skyline at dusk with premium towers"
              className="absolute inset-0 w-full h-full object-cover object-center"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export function CuratingOpportunities() {
  return (
    <>
      <CuratingOpportunitiesMobile />
      <CuratingOpportunitiesDesktop />
    </>
  );
}
