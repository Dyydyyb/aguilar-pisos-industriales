import { useEffect, useRef, useState } from 'react';
import {
  ArrowDownRight,
  ArrowRight,
  Building2,
  ClipboardCheck,
  Cog,
  Handshake,
  MapPin,
  Pause,
  Play,
} from 'lucide-react';
import { BUSINESS_INFO, HERO_INDICATORS, projectsData } from '../data/siteData';

const INDICATOR_ICONS = {
  cog: Cog,
  building: Building2,
  clipboard: ClipboardCheck,
};

const SLIDE_INTERVAL_MS = 4500;
const TRANSITION_DURATION_MS = 900;

export default function Hero() {
  const slides = [...projectsData, projectsData[0]];
  const totalRealSlides = projectsData.length;

  const [trackIndex, setTrackIndex] = useState(0);
  const [transitionEnabled, setTransitionEnabled] = useState(true);
  const [userPaused, setUserPaused] = useState(false);
  const [interactionPaused, setInteractionPaused] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  const raf1Ref = useRef(null);
  const raf2Ref = useRef(null);

  const isAutoPlaying = !userPaused && !interactionPaused && !prefersReducedMotion;
  const activeRealIndex = trackIndex % totalRealSlides;
  const activeProject = projectsData[activeRealIndex];

  // Suscripción en tiempo real a prefers-reduced-motion
  useEffect(() => {
    if (typeof window === 'undefined') return undefined;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleChange = (event) => setPrefersReducedMotion(event.matches);

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    if (!isAutoPlaying) return undefined;

    const timer = window.setInterval(() => {
      if (document.hidden) return;
      setTransitionEnabled(true);
      setTrackIndex((prev) => (prev >= totalRealSlides ? 1 : prev + 1));
    }, SLIDE_INTERVAL_MS);

    return () => window.clearInterval(timer);
  }, [isAutoPlaying, totalRealSlides]);

  useEffect(() => {
    if (trackIndex !== totalRealSlides) return undefined;

    const resetTimer = window.setTimeout(() => {
      setTransitionEnabled(false);
      setTrackIndex(0);
    }, TRANSITION_DURATION_MS + 30);

    return () => window.clearTimeout(resetTimer);
  }, [trackIndex, totalRealSlides]);

  useEffect(() => {
    if (transitionEnabled) return undefined;

    raf1Ref.current = window.requestAnimationFrame(() => {
      raf2Ref.current = window.requestAnimationFrame(() => {
        setTransitionEnabled(true);
      });
    });

    return () => {
      if (raf1Ref.current !== null) window.cancelAnimationFrame(raf1Ref.current);
      if (raf2Ref.current !== null) window.cancelAnimationFrame(raf2Ref.current);
    };
  }, [transitionEnabled]);

  const handleSelectSlide = (index) => {
    setTransitionEnabled(!prefersReducedMotion);
    setTrackIndex(index);
  };

  return (
    <section
      id="inicio"
      onMouseEnter={() => setInteractionPaused(true)}
      onMouseLeave={() => setInteractionPaused(false)}
      onFocusCapture={() => setInteractionPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setInteractionPaused(false);
        }
      }}
      className="relative flex min-h-[86svh] sm:min-h-screen flex-col justify-between bg-charcoal pt-[76px] text-ink-inverse overflow-hidden"
    >
      {/* Carrusel continuo en loop con fotografías reales (solo slide 0 eager para proteger LCP) */}
      <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
        <div
          className={`flex h-full w-full ${
            transitionEnabled && !prefersReducedMotion
              ? 'transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)]'
              : 'transition-none'
          }`}
          style={{ transform: `translateX(-${trackIndex * 100}%)` }}
        >
          {slides.map((project, idx) => (
            <div key={`${project.id}-${idx}`} className="relative h-full w-full shrink-0">
              <img
                src={project.image}
                alt=""
                width={project.width}
                height={project.height}
                loading={idx === 0 ? 'eager' : 'lazy'}
                decoding={idx === 0 ? 'sync' : 'async'}
                fetchPriority={idx === 0 ? 'high' : 'auto'}
                className={`h-full w-full object-cover ${
                  project.imagePosition || 'object-center'
                }`}
              />
            </div>
          ))}
        </div>

        {/* Scrim direccional mate: máxima legibilidad izquierda, textura real de hormigón visible a la derecha */}
        <div className="absolute inset-0 bg-charcoal/80 md:bg-gradient-to-r md:from-charcoal/92 md:via-charcoal/76 md:to-charcoal/45" />
      </div>

      {/* Contenido principal del Hero */}
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-4 py-8 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="max-w-4xl">
          {/* Badge compacto en 1 línea */}
          <div
            className="animate-hero-fade inline-flex max-w-full items-center gap-1.5 rounded-full border border-steel-border bg-charcoal/90 px-3 py-1.5 text-[11px] font-medium text-ink-inverse-muted sm:gap-2 sm:px-4 sm:py-2 sm:text-sm"
            style={{ animationDelay: '40ms' }}
          >
            <MapPin className="h-3.5 w-3.5 shrink-0 text-obra-bright sm:h-4 sm:w-4" aria-hidden="true" />
            <span className="truncate">
              {BUSINESS_INFO.location}
              <span className="mx-1.5 text-steel-border-strong" aria-hidden="true">
                •
              </span>
              <span className="text-ink-inverse sm:hidden">{BUSINESS_INFO.commercialHookShort}</span>
              <span className="hidden text-ink-inverse sm:inline">
                {BUSINESS_INFO.commercialHook}
              </span>
            </span>
          </div>

          <h1
            className="animate-hero-clip mt-4 font-display text-[1.75rem] font-extrabold leading-[1.1] tracking-[-0.03em] text-ink-inverse text-balance sm:mt-6 sm:text-5xl lg:text-6xl"
            style={{ animationDelay: '120ms' }}
          >
            Pisos Industriales de Alta Resistencia, Arquitectura y Construcción
          </h1>

          <p
            className="animate-hero-fade mt-4 max-w-2xl text-sm leading-relaxed text-ink-inverse-muted sm:mt-6 sm:text-lg lg:text-xl"
            style={{ animationDelay: '220ms' }}
          >
            Soluciones estructurales y pisos de hormigón llaneado para galpones, fábricas,
            entradas vehiculares y obras civiles. Maquinaria propia bajo{' '}
            <strong className="font-semibold text-white">{BUSINESS_INFO.technicalDirection}</strong>.
          </p>

          {/* Doble CTA lado a lado en celulares */}
          <div
            className="animate-hero-fade mt-6 grid grid-cols-2 gap-2.5 sm:mt-9 sm:flex sm:flex-row sm:items-center sm:gap-4"
            style={{ animationDelay: '300ms' }}
          >
            <a
              href="#cotizador"
              className="group inline-flex min-h-[48px] sm:min-h-[52px] items-center justify-center gap-1.5 sm:gap-2.5 rounded-xl bg-obra px-3 sm:px-7 text-center text-xs font-semibold text-white transition-[background-color,transform] duration-150 hover:bg-obra-hover active:scale-[0.97] sm:text-base"
            >
              <span className="sm:hidden">Cotizar WhatsApp</span>
              <span className="hidden sm:inline">Armar Consulta por WhatsApp</span>
              <ArrowDownRight
                className="h-4 w-4 sm:h-5 sm:w-5 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:translate-y-0.5"
                aria-hidden="true"
              />
            </a>

            <a
              href="#proyectos"
              className="inline-flex min-h-[48px] sm:min-h-[52px] items-center justify-center rounded-xl border border-ink-inverse/85 bg-transparent px-3 sm:px-7 text-center text-xs font-semibold text-ink-inverse transition-[background-color,color,transform] duration-150 hover:bg-ink-inverse hover:text-charcoal active:scale-[0.97] sm:text-base"
            >
              Ver Proyectos
            </a>
          </div>

          {/* Acceso directo visible arriba del pliegue para corralones, hormigoneras y estudios B2B */}
          <div className="animate-hero-fade mt-4" style={{ animationDelay: '340ms' }}>
            <a
              href="#alianzas"
              className="group inline-flex min-h-[44px] items-center gap-2 text-xs font-medium text-ink-inverse-muted transition-colors hover:text-white sm:text-sm"
            >
              <Handshake className="h-4 w-4 shrink-0 text-obra-bright" aria-hidden="true" />
              <span>¿Tenés corralón, hormigonera o estudio? Ver Alianzas B2B</span>
              <ArrowRight
                className="h-3.5 w-3.5 shrink-0 text-obra-bright transition-transform duration-200 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </a>
          </div>
        </div>

        {/* Controles accesibles del carrusel de portada (WCAG 2.2.2 Pausa + SC 2.5.8 ≥44px) */}
        <div
          className="animate-hero-fade mt-5 flex flex-wrap items-center justify-between gap-3 sm:mt-10"
          style={{ animationDelay: '360ms' }}
        >
          <div className="inline-flex min-w-0 items-center gap-2 rounded-full border border-steel-border bg-charcoal/90 px-3.5 py-1.5 text-xs text-ink-inverse-muted">
            <span className="tabular-nums shrink-0 font-bold text-obra-bright">
              0{activeRealIndex + 1}/0{totalRealSlides}
            </span>
            <span className="text-steel-border-strong" aria-hidden="true">
              •
            </span>
            <span className="truncate font-medium text-ink-inverse">{activeProject.shortLabel}</span>
          </div>

          <div
            className="flex shrink-0 items-center gap-1"
            role="group"
            aria-label="Controles del carrusel de portada"
          >
            {projectsData.map((project, idx) => {
              const isCurrent = idx === activeRealIndex;
              return (
                <button
                  key={project.id}
                  type="button"
                  aria-current={isCurrent ? 'true' : undefined}
                  aria-label={`Mostrar obra ${idx + 1}: ${project.shortLabel}`}
                  onClick={() => handleSelectSlide(idx)}
                  className="inline-flex h-11 min-w-[44px] items-center justify-center rounded-xl"
                >
                  <span
                    className={`block h-2 rounded-full transition-all duration-300 motion-reduce:transition-none ${
                      isCurrent ? 'w-7 bg-obra-bright' : 'w-2.5 bg-ink-inverse-muted/60 hover:bg-white'
                    }`}
                  />
                </button>
              );
            })}

            {!prefersReducedMotion && (
              <button
                type="button"
                onClick={() => setUserPaused((prev) => !prev)}
                aria-pressed={userPaused}
                aria-label={
                  userPaused
                    ? 'Reanudar carrusel de fotos de portada'
                    : 'Pausar carrusel de fotos de portada'
                }
                className="ml-1 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-steel-border-strong bg-charcoal/90 text-ink-inverse transition-colors hover:border-obra-bright hover:text-white active:scale-[0.96]"
              >
                {userPaused ? (
                  <Play className="h-4 w-4" aria-hidden="true" />
                ) : (
                  <Pause className="h-4 w-4" aria-hidden="true" />
                )}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Barra inferior integrada: riel horizontal con pista visual en móvil, 3 columnas en desktop */}
      <div className="relative z-10 border-t border-steel-border bg-charcoal/95">
        <div className="mx-auto max-w-7xl px-4 py-3.5 sm:px-6 sm:py-5 lg:px-8">
          <div className="mb-2 flex items-center justify-between md:hidden">
            <span className="text-[11px] font-medium text-ink-inverse-muted">
              Respaldo técnico en cada obra
            </span>
            <span className="text-[11px] font-semibold text-obra-bright">Deslizá →</span>
          </div>

          <div className="relative">
            <div className="no-scrollbar flex gap-2.5 overflow-x-auto snap-x snap-mandatory -mx-4 px-4 md:mx-0 md:px-0 md:grid md:grid-cols-3 md:gap-4 md:overflow-visible">
              {HERO_INDICATORS.map((item, index) => {
                const IconComponent = INDICATOR_ICONS[item.icon] || Cog;
                return (
                  <div
                    key={item.id}
                    className="animate-hero-fade flex w-[76vw] max-w-[280px] shrink-0 snap-start items-start gap-3 rounded-2xl border border-steel-border bg-graphite/90 p-3.5 md:w-auto md:max-w-none md:gap-4 md:p-4"
                    style={{ animationDelay: `${380 + index * 80}ms` }}
                  >
                    <span className="flex h-9 w-9 md:h-10 md:w-10 shrink-0 items-center justify-center rounded-xl border border-steel-border bg-charcoal text-obra-bright">
                      <IconComponent className="h-4 w-4 md:h-5 md:w-5" strokeWidth={1.8} aria-hidden="true" />
                    </span>
                    <div className="min-w-0">
                      <p className="font-display text-xs font-bold tracking-[-0.01em] text-ink-inverse sm:text-sm md:text-base">
                        {item.title}
                      </p>
                      <p className="mt-0.5 text-xs leading-snug text-ink-inverse-muted md:mt-1 md:text-sm">
                        {item.detail}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
            {/* Indicador visual sutil de contenido desplazable a la derecha en móvil */}
            <div
              className="pointer-events-none absolute top-0 right-0 bottom-0 w-8 bg-gradient-to-l from-charcoal to-transparent md:hidden"
              aria-hidden="true"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
