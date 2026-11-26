import { useEffect, useRef, useState } from 'react';

/**
 * Actualiza la barra de progreso directamente por ref (0 re-renders por frame al scrollear)
 * y solo actualiza estado React cuando cruza el umbral `isScrolled`.
 */
export function useScrollProgress(scrolledThreshold = 24) {
  const progressBarRef = useRef(null);
  const isScrolledRef = useRef(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    let rafId = null;

    const update = () => {
      rafId = null;
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const ratio = scrollHeight > 0 ? Math.min(1, Math.max(0, scrollTop / scrollHeight)) : 0;

      if (progressBarRef.current) {
        progressBarRef.current.style.transform = `scaleX(${ratio})`;
      }

      const nextScrolled = scrollTop > scrolledThreshold;
      if (nextScrolled !== isScrolledRef.current) {
        isScrolledRef.current = nextScrolled;
        setIsScrolled(nextScrolled);
      }
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

  return { progressBarRef, isScrolled };
}
