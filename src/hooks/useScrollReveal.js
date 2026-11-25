import { useEffect, useRef, useState } from 'react';

/**
 * Custom hook reutilizable con IntersectionObserver para animar entradas suaves al scrollear.
 * Transición: opacity-0 translate-y-6 -> opacity-100 translate-y-0 (600ms cubic-bezier(0.16, 1, 0.3, 1)).
 * Soporta retraso escalonado (`stagger` / `delayMs`) y respeta `prefers-reduced-motion`.
 *
 * @param {Object} [options]
 * @param {number} [options.threshold=0.12]
 * @param {string} [options.rootMargin='0px 0px -32px 0px']
 * @param {number} [options.delayMs=0]
 * @param {boolean} [options.triggerOnce=true]
 */
export function useScrollReveal({
  threshold = 0.12,
  rootMargin = '0px 0px -32px 0px',
  delayMs = 0,
  triggerOnce = true,
} = {}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(() => {
    if (typeof window === 'undefined') return true;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  useEffect(() => {
    const element = ref.current;
    if (!element) return undefined;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsVisible(true);
      return undefined;
    }

    if (typeof IntersectionObserver === 'undefined') {
      setIsVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            if (triggerOnce) {
              observer.unobserve(entry.target);
            }
          } else if (!triggerOnce) {
            setIsVisible(false);
          }
        });
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [threshold, rootMargin, triggerOnce]);

  const revealClassName = `transition-[opacity,transform] duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] will-change-[opacity,transform] ${
    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
  }`;

  const revealStyle = delayMs > 0 ? { transitionDelay: `${delayMs}ms` } : undefined;

  return {
    ref,
    isVisible,
    revealClassName,
    revealStyle,
  };
}
