import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { scrollToHash, scrollToHashWhenReady } from '../lib/scroll';

export function ScrollToHashOnLoad() {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/' && location.hash) {
      const hash = location.hash;
      scrollToHashWhenReady(hash);

      const retrySoon = window.setTimeout(() => scrollToHash(hash), 150);
      const retryLater = window.setTimeout(() => scrollToHash(hash), 450);

      return () => {
        window.clearTimeout(retrySoon);
        window.clearTimeout(retryLater);
      };
    }
  }, [location.pathname, location.hash]);

  return null;
}
