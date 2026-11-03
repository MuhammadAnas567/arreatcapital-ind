import React from 'react';
import { Link } from 'react-router-dom';
import {
  Building2,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MessageCircle,
  Phone,
  Twitter,
  Youtube,
} from 'lucide-react';
import { Logo } from './Logo';
import { design } from '../lib/design-tokens';
import {
  CONTACT_EMAIL,
  OFFICE,
  PHONE_DISPLAY,
  PHONE_TEL,
  WHATSAPP_URL,
} from '../lib/contact';

const { footer, layout } = design;
const GOLD = '#D4B37A';

const navigationLinks = [
  { label: 'Properties for Sale', href: '/properties-for-sale-in-india' },
  { label: 'Properties for Rent', href: '/properties-for-rent-in-india' },
  { label: 'Off-Plan', href: '/new-properties-off-plan-india' },
];

const informationLinks = [
  { label: 'About', href: '/about' },
  { label: 'Invest', href: '/invest' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contact', href: '/contact' },
];

const socialLinks = [
  { label: 'WhatsApp', href: WHATSAPP_URL, icon: MessageCircle },
  { label: 'Email', href: `mailto:${CONTACT_EMAIL}`, icon: Mail },
  { label: 'X', href: 'https://x.com/ArreatCapital', icon: Twitter },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/arreatcapital/', icon: Linkedin },
  { label: 'Instagram', href: 'https://www.instagram.com/arreatcapital/', icon: Instagram },
  { label: 'Facebook', href: 'https://www.facebook.com/arreatcapital', icon: Facebook },
  { label: 'YouTube', href: 'https://www.youtube.com/@ArreatCapital', icon: Youtube },
];

function ColumnHeading({ children }: { children: React.ReactNode }) {
  return (
    <h4
      className="font-sans text-[13px] font-semibold tracking-[0.14em] uppercase mb-4"
      style={{ color: GOLD }}
    >
      {children}
    </h4>
  );
}

function BodyText({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`font-sans text-[13px] font-light leading-relaxed text-white/65 ${className}`}
    >
      {children}
    </span>
  );
}

function FooterSocial() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      {socialLinks.map((social) => {
        const Icon = social.icon;

        return (
          <a
            key={social.label}
            href={social.href}
            aria-label={social.label}
            {...(social.href.startsWith('http')
              ? { target: '_blank', rel: 'noopener noreferrer' }
              : {})}
            className="w-10 h-10 flex items-center justify-center border transition-colors duration-300 hover:bg-white/5"
            style={{ borderColor: `${GOLD}66`, color: GOLD }}
          >
            <Icon className="w-[18px] h-[18px]" strokeWidth={1.5} />
          </a>
        );
      })}
    </div>
  );
}

function FooterColumns() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 items-start">
      <div>
        <Link
          to="/"
          className="inline-block mb-4"
          aria-label="Arreat Capital India home"
        >
          <Logo variant="footer" height={68} />
        </Link>
        <BodyText className="block max-w-[240px]">
          Premium real estate advisory across Mumbai, Bengaluru, Delhi-NCR and
          India&apos;s growth corridors.
        </BodyText>
      </div>

      <div>
        <ColumnHeading>Contact</ColumnHeading>
        <ul className="space-y-3">
          <li className="flex items-start gap-3">
            <Building2
              size={16}
              className="shrink-0 mt-0.5"
              strokeWidth={1.5}
              style={{ color: GOLD }}
            />
            <BodyText>
              {OFFICE.line1},
              <br />
              {OFFICE.line2}
              <br />
              {OFFICE.line3}
            </BodyText>
          </li>
          <li className="flex items-center gap-3">
            <Mail size={16} className="shrink-0" strokeWidth={1.5} style={{ color: GOLD }} />
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="font-sans text-[13px] text-white/65 font-light hover:text-[#D4B37A] transition-colors"
            >
              {CONTACT_EMAIL}
            </a>
          </li>
          <li className="flex items-center gap-3">
            <Phone size={16} className="shrink-0" strokeWidth={1.5} style={{ color: GOLD }} />
            <a
              href={PHONE_TEL}
              className="font-sans text-[13px] text-white/65 font-light hover:text-[#D4B37A] transition-colors"
            >
              {PHONE_DISPLAY}
            </a>
          </li>
        </ul>
      </div>

      <div>
        <ColumnHeading>Navigation</ColumnHeading>
        <ul className="space-y-3">
          {navigationLinks.map((item) => (
            <li key={item.label}>
              <Link
                to={item.href}
                className="font-sans text-[13px] text-white/65 font-light hover:text-[#D4B37A] transition-colors"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <ColumnHeading>Information</ColumnHeading>
        <ul className="space-y-3">
          {informationLinks.map((item) => (
            <li key={item.label}>
              <Link
                to={item.href}
                className="font-sans text-[13px] text-white/65 font-light hover:text-[#D4B37A] transition-colors"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function FooterBottom() {
  return (
    <div className="flex flex-col items-center gap-3 pt-6 mt-8 border-t border-white/10">
      <FooterSocial />
      <p className="font-sans text-[12px] text-white/45 font-light text-center">
        &copy; Copyright {new Date().getFullYear()} Arreat Capital India - All rights reserved.
      </p>
    </div>
  );
}

export function Footer() {
  return (
    <footer
      className="w-full overflow-hidden"
      style={{ backgroundColor: footer.background }}
    >
      <div
        className={`${layout.container} ${layout.sectionPadding} pb-[calc(1.5rem+env(safe-area-inset-bottom,0px))]`}
        style={{ backgroundColor: footer.background }}
      >
        <FooterColumns />
        <FooterBottom />
      </div>
    </footer>
  );
}
