import React from 'react';

function PrestigeLogo() {
  return (
    <div className="flex flex-col items-center justify-center min-w-[72px] sm:min-w-[88px]">
      <span className="font-serif text-[12px] sm:text-[15px] tracking-[0.18em] uppercase text-white leading-none">
        Prestige
      </span>
      <span className="font-sans text-[5px] sm:text-[6px] tracking-[0.34em] uppercase text-white/90 leading-none mt-0.5">
        Group
      </span>
    </div>
  );
}

export const partners = [
  {
    id: 'dlf',
    name: 'DLF',
    skipAfterDivider: false,
    logo: (
      <span className="font-serif text-[15px] sm:text-[19px] font-normal tracking-[0.14em] uppercase text-white leading-none whitespace-nowrap">
        DLF
      </span>
    ),
  },
  {
    id: 'godrej',
    name: 'Godrej Properties',
    skipAfterDivider: false,
    logo: (
      <span className="font-sans text-[11px] sm:text-[14px] font-bold tracking-[0.06em] uppercase text-white leading-tight whitespace-nowrap">
        Godrej
      </span>
    ),
  },
  {
    id: 'lodha',
    name: 'Lodha',
    skipAfterDivider: false,
    logo: (
      <span className="font-serif text-[14px] sm:text-[17px] tracking-[0.16em] uppercase text-white leading-none whitespace-nowrap">
        Lodha
      </span>
    ),
  },
  {
    id: 'prestige',
    name: 'Prestige Group',
    skipAfterDivider: false,
    logo: <PrestigeLogo />,
  },
] as const;
