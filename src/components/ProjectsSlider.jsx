import { useCallback, useEffect, useRef, useState } from 'react';
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Expand,
  MapPin,
  Ruler,
  X,
} from 'lucide-react';
import Reveal from './Reveal';
import { projectsData } from '../data/siteData';

export default function ProjectsSlider({ onSelectService }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const touchStartRef = useRef({ x: 0, y: 0 });
  const touchEndRef = useRef({ x: 0, y: 0 });
  const totalSlides = projectsData.length;

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  }, [totalSlides]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
  }, [totalSlides]);

  const handleTouchStart = (event) => {
    const touch = event.touches[0];
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
    touchEndRef.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleTouchMove = (event) => {
    const touch = event.touches[0];
    touchEndRef.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleTouchEnd = () => {
    const deltaX = touchStartRef.current.x - touchEndRef.current.x;
    const deltaY = touchStartRef.current.y - touchEndRef.current.y;

    // Solo dispara swipe horizontal cuando supera 45px y domina sobre el desplazamiento vertical
    if (Math.abs(deltaX) > 45 && Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX > 0) {
        goToNext();
      } else {
        goToPrevious();
      }
    }
  };

  // Navegación por teclado y bloqueo de scroll cuando el Lightbox está abierto
  useEffect(() => {
    if (lightboxIndex === null) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setLightboxIndex(null);
      } else if (event.key === 'ArrowLeft') {
        setLightboxIndex((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
      } else if (event.key === 'ArrowRight') {
        setLightboxIndex((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [lightboxIndex, totalSlides]);

  const activeLightboxProject =
    lightboxIndex !== null ? projectsData[lightboxIndex] : null;

  return (
    <section
      id="proyectos"
      className="border-b border-[#334155] bg-[#0F172A] py-20 text-[#F8FAFC] sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Encabezado y controles del slider */}
        <Reveal className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <h2 className="font-display text-3xl font-extrabold tracking-[-0.03em] text-[#F8FAFC] text-balance sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
              Proyectos Realizados en Obra
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-300">
              Pisos industriales llaneados, playones vehiculares, plateas y naves ejecutadas con
              equipamiento propio en Buenos Aires, Zona Sur y AMBA.
            </p>
          </div>

          <div className="flex items-center justify-between gap-4 sm:justify-end">
            <span
              className="tabular-nums text-sm font-semibold tracking-[0.08em] text-slate-300"
              aria-live="polite"
            >
              {String(currentIndex + 1).padStart(2, '0')} /{' '}
              {String(totalSlides).padStart(2, '0')}
            </span>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={goToPrevious}
                className="inline-flex h-11 w-11 items-center justify-center border border-[#334155] bg-[#1E293B] text-[#F8FAFC] transition-colors duration-150 hover:border-[#EA580C] hover:bg-[#EA580C] active:scale-[0.98]"
                aria-label="Proyecto anterior"
              >
                <ChevronLeft className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={goToNext}
                className="inline-flex h-11 w-11 items-center justify-center border border-[#334155] bg-[#1E293B] text-[#F8FAFC] transition-colors duration-150 hover:border-[#EA580C] hover:bg-[#EA580C] active:scale-[0.98]"
                aria-label="Proyecto siguiente"
              >
                <ChevronRight className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </Reveal>

        {/* Contenedor del Slider con swipe táctil real */}
        <Reveal delayMs={100} className="mt-10">
          <div
            className="overflow-hidden border border-[#334155] bg-[#1E293B]"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            role="region"
            aria-roledescription="carrusel"
            aria-label="Galería de proyectos realizados"
          >
            <div
              className="flex transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {projectsData.map((project, index) => (
                <div
                  key={project.id}
                  className="grid w-full shrink-0 grid-cols-1 lg:grid-cols-12"
                  aria-hidden={index !== currentIndex}
                >
                  {/* Fotografía 4:3 mobile / 16:10 desktop con acceso a Lightbox */}
                  <div className="relative bg-[#0F172A] lg:col-span-7">
                    <button
                      type="button"
                      onClick={() => setLightboxIndex(index)}
                      tabIndex={index === currentIndex ? 0 : -1}
                      className="group relative block w-full aspect-[4/3] md:aspect-[16/10] overflow-hidden text-left focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#EA580C]"
                      aria-label={`Ampliar fotografía de ${project.title}`}
                    >
                      <img
                        src={project.image}
                        alt={project.alt}
                        loading={index === 0 ? 'eager' : 'lazy'}
                        className="h-full w-full object-cover object-center transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
                      />
                      <span className="absolute right-3 bottom-3 inline-flex min-h-[40px] items-center gap-2 border border-[#334155] bg-[#0F172A]/95 px-3 py-1.5 text-xs font-semibold text-[#F8FAFC] transition-colors group-hover:border-[#EA580C] group-hover:bg-[#EA580C]">
                        <Expand className="h-3.5 w-3.5" aria-hidden="true" />
                        <span>Ampliar</span>
                      </span>
                    </button>
                  </div>

                  {/* Ficha técnica del proyecto */}
                  <div className="flex flex-col justify-between border-t border-[#334155] p-6 sm:p-8 lg:col-span-5 lg:border-t-0 lg:border-l">
                    <div>
                      <span className="inline-block border border-[#334155] bg-[#0F172A] px-3 py-1 text-xs font-semibold uppercase tracking-[0.08em] text-[#EA580C]">
                        {project.category}
                      </span>

                      <h3 className="mt-4 font-display text-2xl font-extrabold leading-tight tracking-[-0.02em] text-[#F8FAFC]">
                        {project.title}
                      </h3>

                      {/* Metadatos técnicos */}
                      <dl className="mt-5 grid grid-cols-1 gap-3 border-y border-[#334155] py-4 sm:grid-cols-2">
                        <div className="flex items-start gap-2.5">
                          <MapPin
                            className="mt-0.5 h-4 w-4 shrink-0 text-[#EA580C]"
                            aria-hidden="true"
                          />
                          <div>
                            <dt className="text-[11px] font-medium uppercase tracking-[0.08em] text-slate-400">
                              Ubicación
                            </dt>
                            <dd className="mt-0.5 text-sm font-medium text-slate-100">
                              {project.location}
                            </dd>
                          </div>
                        </div>

                        <div className="flex items-start gap-2.5">
                          <Ruler
                            className="mt-0.5 h-4 w-4 shrink-0 text-[#EA580C]"
                            aria-hidden="true"
                          />
                          <div>
                            <dt className="text-[11px] font-medium uppercase tracking-[0.08em] text-slate-400">
                              Superficie aprox.
                            </dt>
                            <dd className="tabular-nums mt-0.5 text-sm font-semibold text-slate-100">
                              {project.area}
                            </dd>
                          </div>
                        </div>
                      </dl>

                      <p className="mt-5 text-sm leading-relaxed text-slate-300 sm:text-[15px]">
                        {project.description}
                      </p>

                      <p className="mt-4 border border-[#334155] bg-[#0F172A] px-3.5 py-2.5 text-xs font-medium text-slate-200">
                        {project.specHighlight}
                      </p>
                    </div>

                    <div className="mt-7 pt-2">
                      <button
                        type="button"
                        tabIndex={index === currentIndex ? 0 : -1}
                        onClick={() =>
                          onSelectService({
                            category: project.filterCategory,
                            detail: project.title,
                          })
                        }
                        className="inline-flex min-h-[44px] items-center gap-2 text-sm font-semibold text-[#EA580C] transition-colors hover:text-[#F8FAFC] active:scale-[0.98]"
                      >
                        <span>Cotizar una obra similar</span>
                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bullets de paginación accesibles */}
          <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-1" role="tablist" aria-label="Seleccionar proyecto">
              {projectsData.map((project, index) => {
                const isActive = index === currentIndex;
                return (
                  <button
                    key={project.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-label={`Ver proyecto ${index + 1}: ${project.title}`}
                    onClick={() => setCurrentIndex(index)}
                    className="flex min-h-[44px] min-w-[36px] items-center justify-center px-1"
                  >
                    <span
                      className={`block h-2 transition-all duration-200 ${
                        isActive ? 'w-8 bg-[#EA580C]' : 'w-3 bg-[#334155] hover:bg-slate-400'
                      }`}
                    />
                  </button>
                );
              })}
            </div>

            <p className="text-xs text-slate-400">
              Tocá cualquier imagen para abrirla en pantalla completa.
            </p>
          </div>
        </Reveal>
      </div>

      {/* Lightbox Modal a pantalla completa */}
      {activeLightboxProject && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Fotografía ampliada: ${activeLightboxProject.title}`}
          className="animate-lightbox fixed inset-0 z-50 flex items-center justify-center bg-slate-950/95 p-4 sm:p-6"
          onClick={() => setLightboxIndex(null)}
        >
          <div
            className="relative w-full max-w-5xl border border-[#334155] bg-[#0F172A]"
            onClick={(event) => event.stopPropagation()}
          >
            {/* Barra superior del Lightbox */}
            <div className="flex items-center justify-between gap-4 border-b border-[#334155] px-4 py-3 sm:px-6">
              <div className="min-w-0">
                <p className="truncate font-display text-sm font-bold text-[#F8FAFC] sm:text-base">
                  {activeLightboxProject.title}
                </p>
                <p className="tabular-nums text-xs text-slate-300">
                  {activeLightboxProject.location} • {activeLightboxProject.area}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setLightboxIndex(null)}
                className="inline-flex h-11 w-11 shrink-0 items-center justify-center border border-[#334155] bg-[#1E293B] text-[#F8FAFC] transition-colors hover:border-[#EA580C] hover:bg-[#EA580C]"
                aria-label="Cerrar imagen ampliada"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            {/* Imagen ampliada */}
            <div className="relative bg-slate-950">
              <img
                src={activeLightboxProject.image}
                alt={activeLightboxProject.alt}
                className="max-h-[70vh] w-full object-contain"
              />

              {/* Navegación dentro del Lightbox */}
              <button
                type="button"
                onClick={() =>
                  setLightboxIndex((prev) => (prev === 0 ? totalSlides - 1 : prev - 1))
                }
                className="absolute top-1/2 left-3 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-[#334155] bg-[#0F172A]/95 text-[#F8FAFC] transition-colors hover:border-[#EA580C] hover:bg-[#EA580C]"
                aria-label="Imagen anterior"
              >
                <ChevronLeft className="h-5 w-5" aria-hidden="true" />
              </button>

              <button
                type="button"
                onClick={() =>
                  setLightboxIndex((prev) => (prev === totalSlides - 1 ? 0 : prev + 1))
                }
                className="absolute top-1/2 right-3 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-[#334155] bg-[#0F172A]/95 text-[#F8FAFC] transition-colors hover:border-[#EA580C] hover:bg-[#EA580C]"
                aria-label="Imagen siguiente"
              >
                <ChevronRight className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            {/* Pie del Lightbox */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-t border-[#334155] px-4 py-3 text-xs text-slate-300 sm:px-6">
              <span>{activeLightboxProject.specHighlight}</span>
              <span className="tabular-nums text-slate-400">
                {String(lightboxIndex + 1).padStart(2, '0')} /{' '}
                {String(totalSlides).padStart(2, '0')} • ESC para cerrar
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
