import React, { forwardRef } from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { scrollToHash } from '../lib/scroll';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Primary — brass fill */
export const ctaButtonClass =
  'india-btn-sheen relative inline-flex items-center justify-center rounded-none border border-[#D4B37A] bg-[#D4B37A] font-hero-body font-medium text-[11px] tracking-[0.1em] uppercase text-[#050F13] whitespace-nowrap transition-all duration-300 hover:bg-[#E2C48E] hover:border-[#E2C48E] hover:text-[#050F13]';

/** Ghost outline */
export const ctaButtonLightClass =
  'india-btn-sheen relative inline-flex items-center justify-center rounded-none border border-[#D4B37A]/75 bg-transparent font-hero-body font-medium text-[11px] tracking-[0.1em] uppercase text-[#F3EADF] whitespace-nowrap transition-all duration-300 hover:bg-[#D4B37A]/12 hover:border-[#D4B37A] hover:text-white';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'light';
  scrollTo?: string;
  children: React.ReactNode;
}

const variantClass = {
  primary: ctaButtonClass,
  secondary: ctaButtonClass,
  light: ctaButtonLightClass,
} as const;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', scrollTo, children, onClick, style, ...props }, ref) => {
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(event);
      if (!event.defaultPrevented && scrollTo) {
        scrollToHash(scrollTo);
      }
    };

    return (
      <button
        ref={ref}
        onClick={handleClick}
        style={style}
        className={cn(
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-capabilities disabled:opacity-50 disabled:pointer-events-none',
          variantClass[variant],
          !style?.width && 'w-full sm:w-auto h-[50px] px-7 sm:min-w-[180px]',
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
