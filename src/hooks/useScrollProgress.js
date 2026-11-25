import { useEffect, useState } from 'react';

/**
 * Retorna el progreso de lectura (0 a 100) y si la ventana superó el umbral inicial de scroll.
 */
export function useScrollProgress(scrolledThreshold = 24) {
  const [state, setState] = useState({ progress: 0, isScrolled: false });

  useEffect(() => {
    let rafId = null;

    const update = () => {
      rafId = null;
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress =
        scrollHeight > 0 ? Math.min(100, Math.max(0, (scrollTop / scrollHeight) * 100)) : 0;

      setState({
        progress,
        isScrolled: scrollTop > scrolledThreshold,
      });
    };

    const handleScroll = () => {
      if (rafId === null) {
        rafId = window.requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, [scrolledThreshold]);

  return state;
}
