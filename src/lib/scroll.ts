import type { MouseEvent } from 'react';
import type { NavigateFunction } from 'react-router-dom';

const MAX_SCROLL_ATTEMPTS = 20;

function extractHashId(href: string): string | null {
  if (href.startsWith('/#')) return href.slice(2) || null;
  if (href.startsWith('#')) return href.slice(1) || null;
  return null;
}

function normalizeHash(href: string): string {
  const id = extractHashId(href);
  return id ? `#${id}` : '#';
}

export function scrollToHash(href: string) {
  const id = extractHashId(href);

  if (id === null) {
    if (!href.startsWith('#') && !href.startsWith('/#')) {
      window.location.href = href;
    }
    return;
  }

  if (!id) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }

  const target = document.getElementById(id);
  if (!target) {
    if (window.location.pathname !== '/') {
      window.location.assign(`/#${id}`);
    }
    return;
  }

  if (id === 'overview') {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }

  target.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export function scrollToHashWhenReady(href: string, attempt = 0) {
  const id = extractHashId(href);

  if (!id) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }

  const target = document.getElementById(id);
  if (target) {
    scrollToHash(href);
    return;
  }

  if (attempt < MAX_SCROLL_ATTEMPTS) {
    requestAnimationFrame(() => scrollToHashWhenReady(href, attempt + 1));
  }
}

export function navigateToHomeHash(
  href: string,
  navigate: NavigateFunction,
  onNavigate?: () => void
) {
  const id = extractHashId(href);

  if (!id) {
    navigate('/');
    onNavigate?.();
    return;
  }

  navigate({ pathname: '/', hash: id });
  onNavigate?.();
}

export function handleAnchorClick(
  event: MouseEvent<HTMLAnchorElement>,
  href: string,
  onNavigate?: () => void,
  pathname = window.location.pathname,
  navigate?: NavigateFunction
) {
  const hash = extractHashId(href);
  if (hash === null && href !== '/#') return;

  event.preventDefault();

  if (pathname !== '/') {
    if (navigate) {
      navigateToHomeHash(href, navigate, onNavigate);
    } else {
      const id = extractHashId(href);
      window.location.assign(id ? `/#${id}` : '/');
      onNavigate?.();
    }
    return;
  }

  scrollToHash(normalizeHash(href));
  onNavigate?.();
}

export function homeHash(href: string): string {
  return href.startsWith('#') ? `/${href}` : href;
}
