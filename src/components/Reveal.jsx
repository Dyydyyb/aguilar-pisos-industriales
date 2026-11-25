import { useScrollReveal } from '../hooks/useScrollReveal';

export default function Reveal({
  children,
  as: Component = 'div',
  className = '',
  delayMs = 0,
  variant = 'up',
  threshold = 0.12,
}) {
  const { ref, revealClassName, revealStyle } = useScrollReveal({
    delayMs,
    variant,
    threshold,
  });

  return (
    <Component
      ref={ref}
      className={`${revealClassName} ${className}`.trim()}
      style={revealStyle}
    >
      {children}
    </Component>
  );
}
