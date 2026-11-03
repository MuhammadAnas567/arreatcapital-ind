import React from 'react';
import { Link } from 'react-router-dom';
import { Toaster } from 'sonner';
import { NavBar } from './NavBar';
import { Footer } from './Footer';
import { ctaButtonClass, ctaButtonLightClass } from './Button';
import { CONTACT_PATH, WHATSAPP_URL } from '../lib/siteNav';
import { design } from '../lib/design-tokens';

const { layout, type } = design;

export function SitePageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-capabilities text-white selection:bg-gold selection:text-capabilities overflow-x-clip">
      <NavBar />
      <main className="relative z-0 pt-navbar md:pt-hero-nav">{children}</main>
      <Footer />
      <Toaster position="bottom-right" />
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  lead,
  breadcrumbs,
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  breadcrumbs?: { label: string; to?: string }[];
}) {
  return (
    <section className={`${layout.sectionPadding} pb-8 md:pb-10`}>
      <div className={layout.container}>
        {breadcrumbs && breadcrumbs.length > 0 ? (
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="m-0 flex flex-wrap items-center gap-2 p-0 list-none font-sans text-[11px] tracking-[0.12em] uppercase text-white/45">
              {breadcrumbs.map((crumb, index) => (
                <li key={`${crumb.label}-${index}`} className="flex items-center gap-2">
                  {index > 0 ? <span aria-hidden="true">/</span> : null}
                  {crumb.to ? (
                    <Link to={crumb.to} className="hover:text-gold transition-colors">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="text-white/70">{crumb.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        ) : null}
        {eyebrow ? <p className={`${type.eyebrow} m-0 mb-3`}>{eyebrow}</p> : null}
        <h1 className={`${type.sectionTitle} m-0 max-w-4xl`}>{title}</h1>
        <div className={`${type.goldRule} mt-5`} />
        {lead ? (
          <p className={`${type.sectionSubtitle} m-0 mt-5 max-w-2xl`}>{lead}</p>
        ) : null}
      </div>
    </section>
  );
}

export function CtaBand({
  title = 'Ready to talk?',
  lead = 'Book a consultation with Arreat Capital India — clear advice, no pressure.',
}: {
  title?: string;
  lead?: string;
}) {
  return (
    <section className={`relative overflow-hidden ${layout.sectionPadding}`} style={{ backgroundColor: '#0F242C' }}>
      <div className="absolute inset-0 india-surface-mesh" aria-hidden="true" />
      <div className="absolute inset-0 india-grain" aria-hidden="true" />
      <div className={`relative z-10 ${layout.container} flex flex-col gap-6 md:flex-row md:items-center md:justify-between`}>
        <div className="max-w-xl">
          <h2 className={`${type.sectionTitle} m-0 text-[28px] sm:text-[32px]`}>{title}</h2>
          <p className={`${type.sectionSubtitle} m-0 mt-3`}>{lead}</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link to={CONTACT_PATH} className={`${ctaButtonClass} !h-[48px] !min-w-[180px]`}>
            Contact us
          </Link>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={`${ctaButtonLightClass} !h-[48px] !min-w-[140px]`}
          >
            WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
