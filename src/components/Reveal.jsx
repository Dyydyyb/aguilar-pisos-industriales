import { useScrollReveal } from '../hooks/useScrollReveal';

export default function Reveal({
  children,
  as: Component = 'div',
  className = '',
  delayMs = 0,
  threshold = 0.12,
}) {
  const { ref, revealClassName, revealStyle } = useScrollReveal({
    delayMs,
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
