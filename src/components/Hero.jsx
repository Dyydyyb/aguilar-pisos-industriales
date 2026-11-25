import { useEffect, useState } from 'react';
import { ArrowDownRight, Building2, ClipboardCheck, Cog, MapPin } from 'lucide-react';
import { HERO_INDICATORS, projectsData } from '../data/siteData';

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

  const activeRealIndex = trackIndex % totalRealSlides;
  const activeProject = projectsData[activeRealIndex];

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return undefined;
    }

    const timer = window.setInterval(() => {
      if (document.hidden) return;
      setTransitionEnabled(true);
      setTrackIndex((prev) => (prev >= totalRealSlides ? 1 : prev + 1));
    }, SLIDE_INTERVAL_MS);

    return () => window.clearInterval(timer);
  }, [totalRealSlides]);

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
    const rafId = window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        setTransitionEnabled(true);
      });
    });
    return () => window.cancelAnimationFrame(rafId);
  }, [transitionEnabled]);

  const handleSelectSlide = (index) => {
    setTransitionEnabled(true);
    setTrackIndex(index);
  };

  return (
    <section
      id="inicio"
      className="relative flex min-h-[86svh] sm:min-h-screen flex-col justify-between bg-[#0F172A] pt-[76px] text-[#F8FAFC] overflow-hidden"
    >
      {/* Carrusel continuo en loop con las fotografías reales de los proyectos */}
      <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
        <div
          className={`flex h-full w-full ${
            transitionEnabled
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
                fetchPriority={idx === 0 ? 'high' : 'auto'}
                className={`h-full w-full object-cover ${
                  project.imagePosition || 'object-center'
                }`}
              />
            </div>
          ))}
        </div>

        <div className="absolute inset-0 bg-slate-950/75" />
      </div>

      {/* Contenido principal del Hero */}
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-4 py-8 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="max-w-4xl">
          {/* Badge de ubicación compacto en 1 sola línea en móvil */}
          <div
            className="animate-hero-fade inline-flex max-w-full items-center gap-1.5 rounded-full border border-[#334155] bg-[#0F172A]/90 px-3 py-1.5 text-[11px] font-medium text-slate-200 sm:gap-2 sm:px-4 sm:py-2 sm:text-sm"
            style={{ animationDelay: '40ms' }}
          >
            <MapPin className="h-3.5 w-3.5 shrink-0 text-[#EA580C] sm:h-4 sm:w-4" aria-hidden="true" />
            <span className="truncate">
              Buenos Aires, Zona Sur
              <span className="mx-1.5 text-slate-500" aria-hidden="true">
                •
              </span>
              <span className="text-[#F8FAFC] sm:hidden">Presupuesto sin cargo</span>
              <span className="hidden text-[#F8FAFC] sm:inline">
                Cotizaciones y Consultas Sin Cargo
              </span>
            </span>
          </div>

          <h1
            className="animate-hero-clip mt-4 font-display text-[1.75rem] font-extrabold leading-[1.1] tracking-[-0.03em] text-[#F8FAFC] text-balance sm:mt-6 sm:text-5xl lg:text-6xl"
            style={{ animationDelay: '120ms' }}
          >
            Pisos Industriales de Alta Resistencia, Arquitectura y Construcción
          </h1>

          <p
            className="animate-hero-fade mt-4 max-w-2xl text-sm leading-relaxed text-slate-200 sm:mt-6 sm:text-lg lg:text-xl"
            style={{ animationDelay: '220ms' }}
          >
            Soluciones estructurales y pisos de hormigón llaneado para galpones, fábricas,
            entradas vehiculares y obras civiles. Ejecución técnica con maquinaria propia.
          </p>

          {/* Doble CTA lado a lado en celulares para ahorrar altura vertical */}
          <div
            className="animate-hero-fade mt-6 grid grid-cols-2 gap-2.5 sm:mt-9 sm:flex sm:flex-row sm:items-center sm:gap-4"
            style={{ animationDelay: '300ms' }}
          >
            <a
              href="#cotizador"
              className="group inline-flex min-h-[48px] sm:min-h-[52px] items-center justify-center gap-1.5 sm:gap-2.5 rounded-xl bg-[#EA580C] px-3 sm:px-7 text-center text-xs font-semibold text-white transition-[background-color,transform] duration-150 hover:bg-[#C2410C] active:scale-[0.97] sm:text-base"
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
              className="inline-flex min-h-[48px] sm:min-h-[52px] items-center justify-center rounded-xl border border-[#F8FAFC]/85 bg-transparent px-3 sm:px-7 text-center text-xs font-semibold text-[#F8FAFC] transition-[background-color,color,transform] duration-150 hover:bg-[#F8FAFC] hover:text-[#0F172A] active:scale-[0.97] sm:text-base"
            >
              Ver Proyectos
            </a>
          </div>
        </div>

        {/* Indicador del carrusel de obras */}
        <div
          className="animate-hero-fade mt-6 flex items-center justify-between gap-3 sm:mt-12"
          style={{ animationDelay: '360ms' }}
        >
          <div className="inline-flex min-w-0 items-center gap-2 rounded-full border border-[#334155] bg-[#0F172A]/90 px-3 py-1 text-[11px] sm:text-xs text-slate-200">
            <span className="tabular-nums shrink-0 font-bold text-[#EA580C]">
              0{activeRealIndex + 1}/0{totalRealSlides}
            </span>
            <span className="text-slate-500" aria-hidden="true">
              •
            </span>
            <span className="truncate font-medium text-slate-100">{activeProject.shortLabel}</span>
          </div>

          <div className="flex shrink-0 items-center gap-1" role="tablist" aria-label="Obra visible en portada">
            {projectsData.map((project, idx) => {
              const isCurrent = idx === activeRealIndex;
              return (
                <button
                  key={project.id}
                  type="button"
                  role="tab"
                  aria-selected={isCurrent}
                  aria-label={`Mostrar obra ${idx + 1}: ${project.shortLabel}`}
                  onClick={() => handleSelectSlide(idx)}
                  className="flex min-h-[36px] items-center px-1"
                >
                  <span
                    className={`block h-1.5 rounded-full transition-all duration-300 ${
                      isCurrent ? 'w-6 sm:w-7 bg-[#EA580C]' : 'w-2 bg-slate-400/70 hover:bg-white'
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Barra inferior integrada: riel horizontal deslizable en móvil, 3 columnas en desktop */}
      <div className="relative z-10 border-t border-[#334155] bg-[#0F172A]/95">
        <div className="mx-auto max-w-7xl px-4 py-3.5 sm:px-6 sm:py-5 lg:px-8">
          <div className="no-scrollbar flex gap-2.5 overflow-x-auto snap-x snap-mandatory -mx-4 px-4 md:mx-0 md:px-0 md:grid md:grid-cols-3 md:gap-4 md:overflow-visible">
            {HERO_INDICATORS.map((item, index) => {
              const IconComponent = INDICATOR_ICONS[item.icon] || Cog;
              return (
                <div
                  key={item.id}
                  className="animate-hero-fade flex w-[76vw] max-w-[280px] shrink-0 snap-start items-start gap-3 rounded-2xl border border-[#334155] bg-[#1E293B]/80 p-3.5 transition-colors duration-200 hover:border-slate-500 md:w-auto md:max-w-none md:gap-4 md:p-4"
                  style={{ animationDelay: `${380 + index * 80}ms` }}
                >
                  <span className="flex h-9 w-9 md:h-10 md:w-10 shrink-0 items-center justify-center rounded-xl border border-[#334155] bg-[#0F172A] text-[#EA580C]">
                    <IconComponent className="h-4 w-4 md:h-5 md:w-5" strokeWidth={1.8} aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <p className="font-display text-xs font-bold tracking-[-0.01em] text-[#F8FAFC] sm:text-sm md:text-base">
                      {item.title}
                    </p>
                    <p className="mt-0.5 text-[11px] leading-snug text-slate-300 sm:text-xs md:mt-1 md:text-sm">
                      {item.detail}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
