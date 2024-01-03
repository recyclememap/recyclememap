import { useEffect } from 'react';

export const useEscape = (onEscape: () => any) => {
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onEscape();
      }
    };

    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };

    // eslint-disable-next-line
  }, []);
};
