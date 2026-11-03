import React from 'react';
import { Link } from 'react-router-dom';
import { CtaBand, PageHero, SitePageShell } from '../components/PageChrome';
import { ContactCTA } from '../components/ContactCTA';
import { Team } from '../components/Team';
import { SITE_FAQS } from '../lib/faqs';
import { design } from '../lib/design-tokens';

const { layout, type } = design;
const cardClass = 'border border-gold/30 bg-[#0E1F26] p-6 sm:p-7';

export function AboutPage() {
  return (
    <SitePageShell>
      <PageHero
        eyebrow="About"
        title="About Arreat Capital India"
        lead="We help investors and homeowners make clearer decisions across India’s premium residential and commercial markets."
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'About' }]}
      />
      <section className={`${layout.section} ${layout.sectionPadding} pt-0`}>
        <div className={`${layout.container} grid grid-cols-1 gap-6 md:grid-cols-2`}>
          <article className={cardClass}>
            <h2 className="font-serif text-[24px] text-cream m-0 mb-3">Our approach</h2>
            <p className={`${type.sectionSubtitle} m-0`}>
              Arreat Capital India focuses on curated opportunities — not volume.
              We weigh location, developer quality, pricing and realistic yields
              before recommending anything.
            </p>
          </article>
          <article className={cardClass}>
            <h2 className="font-serif text-[24px] text-cream m-0 mb-3">Who we serve</h2>
            <p className={`${type.sectionSubtitle} m-0`}>
              End-users, domestic investors and NRIs looking for transparent
              guidance on buying, renting or investing in Mumbai, Bengaluru,
              Delhi-NCR and other growth cities.
            </p>
          </article>
        </div>
      </section>
      <CtaBand />
    </SitePageShell>
  );
}

export function TeamPage() {
  return (
    <SitePageShell>
      <PageHero
        eyebrow="Team"
        title="Our Team"
        lead="Experienced advisors with deep local market knowledge across India’s key cities."
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Our Team' }]}
      />
      <Team />
      <CtaBand />
    </SitePageShell>
  );
}

export function InvestPage() {
  return (
    <SitePageShell>
      <PageHero
        eyebrow="Invest"
        title="Invest in Indian real estate"
        lead="A practical framework for yield, appreciation and risk — tailored to your capital and timeline."
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Invest' }]}
      />
      <section className={`${layout.section} ${layout.sectionPadding} pt-0`}>
        <div className={`${layout.container} grid grid-cols-1 gap-6 md:grid-cols-3`}>
          {[
            {
              title: 'Income first',
              body: 'Identify markets and product types with resilient rental demand and realistic net yields.',
            },
            {
              title: 'Growth corridors',
              body: 'Focus on infrastructure-led micro-markets where capital appreciation has a clear catalyst.',
            },
            {
              title: 'Risk control',
              body: 'Compare ready vs under-construction, developer track record and total cost of acquisition.',
            },
          ].map((item) => (
            <article key={item.title} className={cardClass}>
              <h2 className="font-serif text-[22px] text-cream m-0 mb-3">{item.title}</h2>
              <p className={`${type.sectionSubtitle} m-0`}>{item.body}</p>
            </article>
          ))}
        </div>
        <div className={`${layout.container} mt-8`}>
          <Link
            to="/properties-for-sale-in-india"
            className="inline-flex h-[44px] items-center px-7 border border-gold/55 font-sans text-[11px] tracking-[0.16em] uppercase text-white hover:bg-gold/10"
          >
            Browse investment listings
          </Link>
        </div>
      </section>
      <CtaBand title="Want a curated shortlist?" lead="Tell us your budget and goals — we’ll send opportunities worth reviewing." />
    </SitePageShell>
  );
}

export function ServicesPage() {
  return (
    <SitePageShell>
      <PageHero
        eyebrow="Services"
        title="How we help"
        lead="Advisory across buy, rent, invest and off-plan — with clear communication at every step."
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Services' }]}
      />
      <section className={`${layout.section} ${layout.sectionPadding} pt-0`}>
        <div className={`${layout.container} grid grid-cols-1 gap-6 sm:grid-cols-2`}>
          {[
            { title: 'Buy advisory', body: 'Shortlisting, negotiation and closing support for ready homes.' },
            { title: 'Rental search', body: 'Fast shortlists for apartments and villas with transparent terms.' },
            { title: 'Off-plan guidance', body: 'Independent view of launches, payment plans and delivery risk.' },
            { title: 'NRI support', body: 'Remote diligence, virtual tours and end-to-end transaction coordination.' },
          ].map((item) => (
            <article key={item.title} className={cardClass}>
              <h2 className="font-serif text-[22px] text-cream m-0 mb-3">{item.title}</h2>
              <p className={`${type.sectionSubtitle} m-0`}>{item.body}</p>
            </article>
          ))}
        </div>
      </section>
      <CtaBand />
    </SitePageShell>
  );
}

export function FaqPage() {
  return (
    <SitePageShell>
      <PageHero
        eyebrow="FAQ"
        title="Frequently asked questions"
        lead="Clear answers on investing, buying and renting across India."
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'FAQ' }]}
      />
      <section className={`${layout.section} ${layout.sectionPadding} pt-0`}>
        <div className={`${layout.container} max-w-3xl space-y-4`}>
          {SITE_FAQS.map((item) => (
            <article key={item.q} className={cardClass}>
              <h2 className="font-serif text-[20px] text-cream m-0 mb-3">{item.q}</h2>
              <p className={`${type.sectionSubtitle} m-0`}>{item.a}</p>
            </article>
          ))}
        </div>
      </section>
      <CtaBand />
    </SitePageShell>
  );
}

export function ContactPage() {
  return (
    <SitePageShell>
      <PageHero
        eyebrow="Contact"
        title="Talk to Arreat Capital India"
        lead="Share your goals — we’ll respond with a clear next step."
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Contact' }]}
      />
      <ContactCTA />
    </SitePageShell>
  );
}
