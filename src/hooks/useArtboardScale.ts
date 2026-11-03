import { useEffect, useState } from 'react';
import { design } from '../lib/design-tokens';

/** Scale the 1200px Figma artboard to fit the viewport width. */
export function useArtboardScale(artboardWidth = design.artboard.width) {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const update = () => {
      setScale(Math.min(1, window.innerWidth / artboardWidth));
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, [artboardWidth]);

  return scale;
}
