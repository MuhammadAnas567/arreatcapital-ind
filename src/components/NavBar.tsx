import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { Logo } from './Logo';
import { design } from '../lib/design-tokens';
import { useArtboardScale } from '../hooks/useArtboardScale';
import { cn } from './Button';
import { CONTACT_PATH, mainNav, type NavItem } from '../lib/siteNav';

const { header: headerSpec } = design;

function DesktopDropdown({ item }: { item: Extract<NavItem, { type: 'dropdown' }> }) {
  const [open, setOpen] = useState(false);

  return (
    <li
      className="relative shrink-0"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        className={cn(design.type.navLink, 'inline-flex items-center gap-1')}
        aria-expanded={open}
      >
        {item.label}
        <ChevronDown className="h-3.5 w-3.5 opacity-70" />
      </button>
      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.15 }}
            className="absolute left-0 top-full z-50 min-w-[232px] border border-gold/30 bg-[#071418]/96 py-2 shadow-[0_16px_48px_rgba(0,0,0,0.45)] backdrop-blur-xl"
          >
            {item.children.map((child) => (
              <Link
                key={child.to}
                to={child.to}
                className="block px-4 py-2.5 font-sans text-[11px] uppercase tracking-[0.12em] text-white/80 transition-colors hover:bg-gold/10 hover:text-gold"
              >
                {child.label}
              </Link>
            ))}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </li>
  );
}

export function NavBar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openMobileSection, setOpenMobileSection] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();
  const isHome = pathname === '/';
  const scale = useArtboardScale(headerSpec.width);
  const headerHeight = headerSpec.height * scale;
  const solidNav = !isHome || scrolled;

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setOpenMobileSection(null);
  };

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    closeMobileMenu();
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const glassStyle: React.CSSProperties | undefined =
    isHome && !scrolled
      ? {
          background: headerSpec.background,
          backdropFilter: `blur(${headerSpec.blur}px)`,
          WebkitBackdropFilter: `blur(${headerSpec.blur}px)`,
        }
      : undefined;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full pt-[env(safe-area-inset-top,0px)]">
      {isHome && !scrolled && (
        <div aria-hidden="true" className="pointer-events-none absolute inset-0" style={glassStyle} />
      )}

      <div
        className={cn(
          'relative w-full transition-[background-color,backdrop-filter,box-shadow,border-color] duration-500',
          solidNav &&
            'border-b border-gold/15 bg-[#050F13]/92 shadow-[0_12px_40px_rgba(0,0,0,0.35)] backdrop-blur-xl'
        )}
        style={!solidNav ? { background: 'transparent' } : undefined}
      >
        <div className="relative hidden w-full md:block" style={{ height: headerHeight }}>
          <div
            className="absolute left-1/2 top-0"
            style={{
              width: headerSpec.width,
              height: headerSpec.height,
              transform: `translateX(-50%) scale(${scale})`,
              transformOrigin: 'top center',
            }}
          >
            <Link
              to="/"
              className="absolute flex items-center gap-3"
              style={{ top: design.logo.top, left: design.logo.left }}
              aria-label="Arreat Capital India home"
            >
              <Logo variant="navbar" />
              <span className="hidden items-center border border-gold/50 bg-gold/10 px-2.5 h-[22px] font-sans text-[9px] font-medium uppercase tracking-[0.22em] text-gold lg:inline-flex">
                India
              </span>
            </Link>

            <nav
              aria-label="Main navigation"
              className="absolute top-1/2 flex -translate-y-1/2 items-center"
              style={{ right: headerSpec.paddingX, gap: headerSpec.navGap }}
            >
              <ul
                className="m-0 flex list-none flex-row flex-nowrap items-center p-0"
                style={{ gap: Math.min(headerSpec.linkGap, 18) }}
              >
                {mainNav.map((item) =>
                  item.type === 'link' ? (
                    <li key={item.to} className="shrink-0">
                      <Link to={item.to} className={design.type.navLink}>
                        {item.label}
                      </Link>
                    </li>
                  ) : (
                    <DesktopDropdown key={item.label} item={item} />
                  )
                )}
              </ul>

              <Link to={CONTACT_PATH} className={design.type.navCta}>
                CONTACT
              </Link>
            </nav>
          </div>
        </div>

        <div className="flex h-navbar items-center justify-between px-5 sm:px-6 md:hidden">
          <Link
            to="/"
            aria-label="Arreat Capital India home"
            className="inline-flex items-center gap-2"
          >
            <Logo variant="navbar" className="!h-[32px] !w-[115px]" />
            <span className="inline-flex h-[20px] items-center border border-gold/45 px-2 font-sans text-[8px] uppercase tracking-[0.18em] text-gold/90">
              India
            </span>
          </Link>
          <button
            type="button"
            className="-mr-2 p-2 text-white"
            onClick={() => setIsMobileMenuOpen((open) => !open)}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <>
              <motion.button
                type="button"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 top-[calc(3.5rem+env(safe-area-inset-top,0px))] z-40 bg-black/60 md:hidden"
                onClick={closeMobileMenu}
                aria-label="Close menu overlay"
              />
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="fixed left-0 right-0 top-[calc(3.5rem+env(safe-area-inset-top,0px))] z-50 max-h-[calc(100dvh-3.5rem-env(safe-area-inset-top,0px))] overflow-y-auto border-b border-gold/20 bg-dark/95 shadow-xl backdrop-blur-xl md:hidden"
              >
                <div className="mx-auto flex w-full max-w-design flex-col gap-4 px-6 py-8">
                  <nav aria-label="Mobile navigation">
                    <ul className="flex flex-col gap-1">
                      {mainNav.map((item) =>
                        item.type === 'link' ? (
                          <li key={item.to}>
                            <Link
                              to={item.to}
                              onClick={closeMobileMenu}
                              className="block border-b border-white/5 py-3 font-sans text-[13px] uppercase tracking-[0.14em] text-white hover:text-gold"
                            >
                              {item.label}
                            </Link>
                          </li>
                        ) : (
                          <li key={item.label}>
                            <button
                              type="button"
                              onClick={() =>
                                setOpenMobileSection((current) =>
                                  current === item.label ? null : item.label
                                )
                              }
                              className="flex w-full items-center justify-between border-b border-white/5 py-3 font-sans text-[13px] uppercase tracking-[0.14em] text-white"
                            >
                              {item.label}
                              <ChevronDown
                                className={cn(
                                  'h-4 w-4 transition-transform',
                                  openMobileSection === item.label && 'rotate-180'
                                )}
                              />
                            </button>
                            {openMobileSection === item.label ? (
                              <ul className="mb-2 ml-3 flex flex-col gap-1">
                                {item.children.map((child) => (
                                  <li key={child.to}>
                                    <Link
                                      to={child.to}
                                      onClick={closeMobileMenu}
                                      className="block py-2 font-sans text-[12px] uppercase tracking-[0.12em] text-white/70 hover:text-gold"
                                    >
                                      {child.label}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            ) : null}
                          </li>
                        )
                      )}
                    </ul>
                  </nav>
                  <Link
                    to={CONTACT_PATH}
                    onClick={closeMobileMenu}
                    className={cn(design.type.navCta, 'h-[48px] w-full uppercase')}
                  >
                    CONTACT
                  </Link>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
