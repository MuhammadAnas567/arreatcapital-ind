import React, { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { design } from '../lib/design-tokens';
import { salesGraphics, salesSrc } from '../lib/sales';

const { layout, type } = design;

const SALES_COPY =
  "A selection of recent transactions closed by the Arreat Capital India team across India's premium residential market.";

type SaleItem = {
  file: string;
  alt: string;
  src: string;
};

const items: SaleItem[] = salesGraphics.map((graphic) => ({
  file: graphic.file,
  alt: graphic.alt,
  src: salesSrc(graphic.file),
}));

function SaleCard({
  item,
  onOpen,
}: {
  item: SaleItem;
  onOpen: (item: SaleItem) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onOpen(item)}
      className="group block w-full overflow-hidden bg-transparent text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
      aria-label={`View ${item.alt}`}
    >
      <img
        src={item.src}
        alt={item.alt}
        loading="lazy"
        decoding="async"
        className="block h-auto w-full"
      />
    </button>
  );
}

function Lightbox({
  item,
  onClose,
}: {
  item: SaleItem;
  onClose: () => void;
}) {
  React.useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[80] flex items-center justify-center bg-black/85 p-4 sm:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={item.alt}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute right-4 top-4 rounded-full border border-white/20 bg-black/40 p-2 text-white transition-colors hover:border-gold hover:text-gold sm:right-6 sm:top-6"
        aria-label="Close"
      >
        <X className="h-5 w-5" />
      </button>
      <motion.img
        src={item.src}
        alt={item.alt}
        className="max-h-[90vh] max-w-[min(920px,100%)] object-contain"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        transition={{ duration: 0.25 }}
        onClick={(event) => event.stopPropagation()}
      />
    </motion.div>
  );
}

export function RecentSales() {
  const [active, setActive] = useState<SaleItem | null>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const onOpen = useCallback((item: SaleItem) => setActive(item), []);
  const onClose = useCallback(() => setActive(null), []);

  const updateScrollState = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft < max - 4);
  }, []);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    updateScrollState();
    el.addEventListener('scroll', updateScrollState, { passive: true });
    window.addEventListener('resize', updateScrollState);
    return () => {
      el.removeEventListener('scroll', updateScrollState);
      window.removeEventListener('resize', updateScrollState);
    };
  }, [updateScrollState]);

  const scrollByCards = (direction: -1 | 1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const amount = Math.min(320, Math.round(el.clientWidth * 0.75));
    el.scrollBy({ left: direction * amount, behavior: 'smooth' });
  };

  if (items.length === 0) return null;

  return (
    <section
      id="sales"
      className={`${layout.section} ${layout.sectionPadding} ${layout.scrollMt}`}
    >
      <div className={layout.container}>
        <div
          className={`${layout.sectionIntro} ${layout.sectionHeaderGap} mx-auto items-center text-center`}
        >
          <p className={`${type.eyebrow} m-0`}>Track record</p>
          <h2 className={`${type.sectionTitle} m-0 text-white`}>Recent sales</h2>
          <div className={type.goldRule} />
          <p className={`${type.sectionSubtitle} m-0 max-w-2xl`}>{SALES_COPY}</p>
        </div>

        <div className="mb-4 flex items-center justify-between gap-3">
          <p className="m-0 font-sans text-[11px] uppercase tracking-[0.18em] text-cream/45 md:hidden">
            Swipe to browse
          </p>
          <p className="m-0 hidden font-sans text-[11px] uppercase tracking-[0.18em] text-cream/45 md:block">
            Scroll sideways
          </p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => scrollByCards(-1)}
              disabled={!canScrollLeft}
              className="inline-flex h-10 w-10 items-center justify-center border border-gold/40 text-gold transition-colors hover:bg-gold/10 disabled:cursor-not-allowed disabled:opacity-30"
              aria-label="Scroll sales left"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => scrollByCards(1)}
              disabled={!canScrollRight}
              className="inline-flex h-10 w-10 items-center justify-center border border-gold/40 text-gold transition-colors hover:bg-gold/10 disabled:cursor-not-allowed disabled:opacity-30"
              aria-label="Scroll sales right"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      <div
        ref={scrollerRef}
        className="overflow-x-auto overscroll-x-contain touch-pan-x snap-x snap-mandatory pb-3 [scrollbar-width:thin] [scrollbar-color:rgba(212,179,122,0.55)_transparent]"
        style={{ WebkitOverflowScrolling: 'touch' }}
      >
        <div className="flex w-max gap-4 px-5 sm:gap-5 sm:px-6 md:px-12 lg:px-[82px]">
          {items.map((item) => (
            <div
              key={item.file}
              className="w-[min(78vw,260px)] shrink-0 snap-start sm:w-[min(72vw,240px)]"
            >
              <SaleCard item={item} onOpen={onOpen} />
            </div>
          ))}
          <div className="w-1 shrink-0 sm:w-2" aria-hidden="true" />
        </div>
      </div>

      <AnimatePresence>
        {active ? <Lightbox item={active} onClose={onClose} /> : null}
      </AnimatePresence>
    </section>
  );
}
