import React from 'react';
import { Hero } from '../components/Hero';
import { Capabilities } from '../components/Capabilities';
import { LuxuryProjects } from '../components/LuxuryProjects';
// import { SecondaryMetrics } from '../components/SecondaryMetrics';
// import { InvestmentStrategy } from '../components/InvestmentStrategy';
import { CTABanner } from '../components/CTABanner';
import { FeaturedProperties } from '../components/FeaturedProperties';
// import { OpportunitiesList } from '../components/OpportunitiesList';
import { CuratingOpportunities } from '../components/CuratingOpportunities';
import { ContactCTA } from '../components/ContactCTA';

import { design } from '../lib/design-tokens';

export function LandingPage() {
  return (
    <main className={`relative z-0 ${design.layout.sectionStack}`}>
      <Hero />
      <Capabilities />
      <LuxuryProjects />
      {/* <SecondaryMetrics /> */}
      {/* <InvestmentStrategy /> */}
      <CTABanner />
      <FeaturedProperties />
      <CuratingOpportunities />
      <ContactCTA />
    </main>
  );
}
