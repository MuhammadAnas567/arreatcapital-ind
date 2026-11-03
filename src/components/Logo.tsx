import React from 'react';
import { cn } from './Button';
import { design } from '../lib/design-tokens';

const LOGO_SRC = '/arreat-logo.png';
const LOGO_VERTICAL_SRC = '/arreat-logo-vertical.png';

interface LogoProps {
  className?: string;
  height?: number;
  variant?: 'navbar' | 'footer';
}

export function Logo({ className, height = 40, variant = 'navbar' }: LogoProps) {
  if (variant === 'navbar') {
    return (
      <img
        src={LOGO_SRC}
        alt="Arreat Capital India"
        width={design.logo.width}
        height={design.logo.height}
        className={cn('object-contain object-left bg-transparent', className)}
        style={{
          width: design.logo.width,
          height: design.logo.height,
        }}
        decoding="async"
      />
    );
  }

  return (
    <img
      src={LOGO_VERTICAL_SRC}
      alt="Arreat Capital India"
      className={cn('object-contain object-left bg-transparent', className)}
      style={{ height, width: 'auto' }}
      decoding="async"
    />
  );
}
