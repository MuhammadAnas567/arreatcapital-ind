import React from 'react';
import { Toaster } from 'sonner';
import { design } from '../lib/design-tokens';
import { NavBar } from '../components/NavBar';
import { Hero } from '../components/Hero';
import { Capabilities } from '../components/Capabilities';
import { FeaturedProperties } from '../components/FeaturedProperties';
import { ExploreArreat } from '../components/ExploreArreat';
import { WhyArreat } from '../components/WhyArreat';
import { RecentSales } from '../components/RecentSales';
import { InvestCtaBand } from '../components/InvestCtaBand';
import { HomeSeoProse } from '../components/HomeSeoProse';
import { ContactCTA } from '../components/ContactCTA';
import { Footer } from '../components/Footer';

export function HomePage() {
  return (
    <div className="min-h-screen bg-capabilities text-white selection:bg-gold selection:text-capabilities overflow-x-clip">
      <NavBar />
      <Hero />
      <main className={`relative z-0 ${design.layout.sectionStack}`}>
        <Capabilities />
        <FeaturedProperties />
        <ExploreArreat />
        <WhyArreat />
        <RecentSales />
        <InvestCtaBand />
        <HomeSeoProse />
        <ContactCTA />
      </main>
      <Footer />
      <Toaster position="bottom-right" />
    </div>
  );
}
