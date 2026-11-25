import { useEffect, useRef, useState } from 'react';

const HIDDEN_VARIANT_CLASSES = {
  up: 'opacity-0 translate-y-6',
  scale: 'opacity-0 translate-y-4 scale-[0.975]',
  left: 'opacity-0 -translate-x-5',
  right: 'opacity-0 translate-x-5',
};

const VISIBLE_VARIANT_CLASSES = {
  up: 'opacity-100 translate-y-0',
  scale: 'opacity-100 translate-y-0 scale-100',
  left: 'opacity-100 translate-x-0',
  right: 'opacity-100 translate-x-0',
};

/**
 * Custom hook reutilizable con IntersectionObserver para animar entradas fluidas al scrollear.
 * Soporta variantes (`up`, `scale`, `left`, `right`), `delayMs` (stagger) y `prefers-reduced-motion`.
 * Libera `will-change` automáticamente una vez revelada la vista.
 */
export function useScrollReveal({
  threshold = 0.12,
  rootMargin = '0px 0px -32px 0px',
  delayMs = 0,
  variant = 'up',
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

  const hiddenClass = HIDDEN_VARIANT_CLASSES[variant] || HIDDEN_VARIANT_CLASSES.up;
  const visibleClass = VISIBLE_VARIANT_CLASSES[variant] || VISIBLE_VARIANT_CLASSES.up;

  const revealClassName = `transition-[opacity,transform] duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
    isVisible ? visibleClass : `${hiddenClass} will-change-[opacity,transform]`
  }`;

  const revealStyle = delayMs > 0 ? { transitionDelay: `${delayMs}ms` } : undefined;

  return {
    ref,
    isVisible,
    revealClassName,
    revealStyle,
  };
}
