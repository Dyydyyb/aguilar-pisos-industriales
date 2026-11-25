import { useCallback, useEffect, useRef, useState } from 'react';
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Expand,
  Layers,
  MapPin,
  X,
} from 'lucide-react';
import Reveal from './Reveal';
import { projectsData } from '../data/siteData';

export default function ProjectsSlider({ onSelectService }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const touchStartRef = useRef({ x: 0, y: 0, active: false });
  const touchEndRef = useRef({ x: 0, y: 0 });
  const totalSlides = projectsData.length;

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  }, [totalSlides]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
  }, [totalSlides]);

  const resetTouchState = () => {
    touchStartRef.current = { x: 0, y: 0, active: false };
    touchEndRef.current = { x: 0, y: 0 };
  };

  const handleTouchStart = (event) => {
    const touch = event.touches[0];
    touchStartRef.current = { x: touch.clientX, y: touch.clientY, active: true };
    touchEndRef.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleTouchMove = (event) => {
    if (!touchStartRef.current.active) return;
    const touch = event.touches[0];
    touchEndRef.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleTouchEnd = () => {
    if (!touchStartRef.current.active) return;
    const deltaX = touchStartRef.current.x - touchEndRef.current.x;
    const deltaY = touchStartRef.current.y - touchEndRef.current.y;

    if (Math.abs(deltaX) > 45 && Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX > 0) {
        goToNext();
      } else {
        goToPrevious();
      }
    }

    resetTouchState();
  };

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
      className="border-b border-[#CBD5E1] bg-[#E2E8F0] py-20 text-[#0F172A] sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Encabezado y controles del slider */}
        <Reveal className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <h2 className="font-display text-3xl font-extrabold tracking-[-0.03em] text-[#0F172A] text-balance sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
              Obras Realizadas en Campo
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-700">
              Trabajos reales en pisos industriales, playones cívicos, sendas, hormigón pigmentado
              y accesos de camiones ejecutados en Florencio Varela y Buenos Aires Zona Sur.
            </p>
          </div>

          <div className="flex items-center justify-between gap-4 sm:justify-end">
            <span
              className="tabular-nums text-sm font-semibold tracking-[0.08em] text-slate-700"
              aria-live="polite"
            >
              {String(currentIndex + 1).padStart(2, '0')} /{' '}
              {String(totalSlides).padStart(2, '0')}
            </span>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={goToPrevious}
                className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-[#CBD5E1] bg-[#F8FAFC] text-[#0F172A] transition-[background-color,border-color,color,transform] duration-150 hover:border-[#EA580C] hover:bg-[#EA580C] hover:text-white active:scale-[0.96]"
                aria-label="Proyecto anterior"
              >
                <ChevronLeft className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={goToNext}
                className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-[#CBD5E1] bg-[#F8FAFC] text-[#0F172A] transition-[background-color,border-color,color,transform] duration-150 hover:border-[#EA580C] hover:bg-[#EA580C] hover:text-white active:scale-[0.96]"
                aria-label="Proyecto siguiente"
              >
                <ChevronRight className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </Reveal>

        {/* Contenedor principal redondeado del Slider */}
        <Reveal variant="scale" delayMs={100} className="mt-10">
          <div
            className="touch-pan-y overflow-hidden rounded-2xl border border-[#CBD5E1] bg-[#F8FAFC]"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onTouchCancel={resetTouchState}
            role="region"
            aria-roledescription="carrusel"
            aria-label="Galería de obras realizadas"
          >
            <div
              className="flex transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {projectsData.map((project, index) => {
                const isActiveSlide = index === currentIndex;
                return (
                  <div
                    key={project.id}
                    className="grid w-full shrink-0 grid-cols-1 lg:grid-cols-12"
                    aria-hidden={!isActiveSlide}
                  >
                    {/* Fotografía: proporción casi cuadrada en PC (50/50) para evitar recortes y franjas vacías */}
                    <div className="relative bg-[#0F172A] lg:col-span-6">
                      <button
                        type="button"
                        onClick={() => setLightboxIndex(index)}
                        tabIndex={isActiveSlide ? 0 : -1}
                        className="group relative block w-full aspect-square sm:aspect-[5/4] lg:aspect-auto lg:h-full lg:min-h-[540px] overflow-hidden text-left focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#EA580C]"
                        aria-label={`Ampliar fotografía de ${project.title}`}
                      >
                        <img
                          src={project.image}
                          alt={project.alt}
                          loading={index === 0 ? 'eager' : 'lazy'}
                          className={`h-full w-full object-cover ${
                            project.imagePosition || 'object-center'
                          } transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                            isActiveSlide ? 'scale-100 group-hover:scale-[1.03]' : 'scale-[1.04]'
                          }`}
                        />
                        {project.featured && (
                          <span className="absolute top-3.5 left-3.5 inline-flex items-center gap-2 rounded-full bg-[#EA580C] px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.08em] text-white">
                            Obra Principal
                          </span>
                        )}
                        <span className="absolute right-3.5 bottom-3.5 inline-flex min-h-[40px] items-center gap-2 rounded-xl border border-[#334155] bg-[#0F172A]/95 px-3.5 py-1.5 text-xs font-semibold text-[#F8FAFC] transition-colors group-hover:border-[#EA580C] group-hover:bg-[#EA580C]">
                          <Expand className="h-3.5 w-3.5" aria-hidden="true" />
                          <span>Ver completa</span>
                        </span>
                      </button>
                    </div>

                    {/* Ficha técnica del proyecto */}
                    <div className="flex flex-col justify-between border-t border-[#CBD5E1] bg-[#F8FAFC] p-6 sm:p-8 lg:col-span-6 lg:border-t-0 lg:border-l">
                      <div>
                        <span
                          className={`inline-block rounded-full px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.08em] ${
                            project.featured
                              ? 'bg-[#EA580C] text-white'
                              : 'border border-[#CBD5E1] bg-[#E2E8F0] text-[#0F172A]'
                          }`}
                        >
                          {project.category}
                        </span>

                        <h3 className="mt-4 font-display text-xl font-extrabold leading-tight tracking-[-0.02em] text-[#0F172A] sm:text-2xl">
                          {project.title}
                        </h3>

                        {/* Metadatos técnicos */}
                        <dl className="mt-5 grid grid-cols-1 gap-3 border-y border-[#CBD5E1] py-4 sm:grid-cols-2">
                          <div className="flex items-start gap-2.5">
                            <MapPin
                              className="mt-0.5 h-4 w-4 shrink-0 text-[#EA580C]"
                              aria-hidden="true"
                            />
                            <div>
                              <dt className="text-[11px] font-medium uppercase tracking-[0.08em] text-slate-500">
                                Ubicación
                              </dt>
                              <dd className="mt-0.5 text-sm font-medium text-[#0F172A]">
                                {project.location}
                              </dd>
                            </div>
                          </div>

                          <div className="flex items-start gap-2.5">
                            <Layers
                              className="mt-0.5 h-4 w-4 shrink-0 text-[#EA580C]"
                              aria-hidden="true"
                            />
                            <div>
                              <dt className="text-[11px] font-medium uppercase tracking-[0.08em] text-slate-500">
                                Terminación
                              </dt>
                              <dd className="mt-0.5 text-sm font-semibold text-[#0F172A]">
                                {project.execution}
                              </dd>
                            </div>
                          </div>
                        </dl>

                        <p className="mt-5 text-sm leading-relaxed text-slate-700 sm:text-[15px]">
                          {project.description}
                        </p>

                        <p className="mt-4 rounded-xl border border-[#CBD5E1] bg-[#E2E8F0]/60 px-3.5 py-2.5 text-xs font-medium text-[#0F172A]">
                          {project.specHighlight}
                        </p>
                      </div>

                      <div className="mt-7 pt-2">
                        <button
                          type="button"
                          tabIndex={isActiveSlide ? 0 : -1}
                          onClick={() =>
                            onSelectService({
                              category: project.filterCategory,
                              detail: project.title,
                            })
                          }
                          className="group inline-flex min-h-[44px] items-center gap-2 rounded-xl px-1 text-sm font-semibold text-[#EA580C] transition-colors hover:text-[#C2410C] active:scale-[0.97]"
                        >
                          <span>Cotizar una obra similar</span>
                          <ArrowRight
                            className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                            aria-hidden="true"
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Grilla redondeada de miniaturas / selector rápido (orden exacto con Acceso de Camiones última) */}
          <div
            className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4"
            role="tablist"
            aria-label="Seleccionar proyecto"
          >
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
                  className={`group flex items-center gap-3 rounded-xl border p-2 text-left transition-[transform,border-color,background-color] duration-200 active:scale-[0.97] ${
                    isActive
                      ? 'border-[#EA580C] bg-[#0F172A] text-[#F8FAFC]'
                      : 'border-[#CBD5E1] bg-[#F8FAFC] text-[#0F172A] hover:-translate-y-0.5 hover:border-slate-400'
                  }`}
                >
                  <img
                    src={project.image}
                    alt=""
                    aria-hidden="true"
                    className={`h-11 w-11 shrink-0 rounded-lg object-cover ${
                      project.imagePosition || 'object-center'
                    }`}
                  />
                  <span className="min-w-0">
                    <span
                      className={`tabular-nums block text-[11px] font-semibold ${
                        isActive ? 'text-[#EA580C]' : 'text-slate-500'
                      }`}
                    >
                      0{index + 1}
                    </span>
                    <span className="block truncate text-xs font-semibold sm:text-[13px]">
                      {project.shortLabel}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </Reveal>
      </div>

      {/* Lightbox Modal redondeado a pantalla completa */}
      {activeLightboxProject && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Fotografía ampliada: ${activeLightboxProject.title}`}
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/95 p-4 sm:p-6"
          onClick={() => setLightboxIndex(null)}
        >
          <div
            className="animate-lightbox relative w-full max-w-5xl overflow-hidden rounded-2xl border border-[#334155] bg-[#0F172A]"
            onClick={(event) => event.stopPropagation()}
          >
            {/* Barra superior del Lightbox */}
            <div className="flex items-center justify-between gap-4 border-b border-[#334155] px-4 py-3 sm:px-6">
              <div className="min-w-0">
                <p className="truncate font-display text-sm font-bold text-[#F8FAFC] sm:text-base">
                  {activeLightboxProject.title}
                </p>
                <p className="text-xs text-slate-300">
                  {activeLightboxProject.location} • {activeLightboxProject.execution}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setLightboxIndex(null)}
                className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#334155] bg-[#1E293B] text-[#F8FAFC] transition-colors hover:border-[#EA580C] hover:bg-[#EA580C]"
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
                className="max-h-[72vh] w-full object-contain"
              />

              {/* Navegación dentro del Lightbox */}
              <button
                type="button"
                onClick={() =>
                  setLightboxIndex((prev) => (prev === 0 ? totalSlides - 1 : prev - 1))
                }
                className="absolute top-1/2 left-3 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-xl border border-[#334155] bg-[#0F172A]/95 text-[#F8FAFC] transition-colors hover:border-[#EA580C] hover:bg-[#EA580C]"
                aria-label="Imagen anterior"
              >
                <ChevronLeft className="h-5 w-5" aria-hidden="true" />
              </button>

              <button
                type="button"
                onClick={() =>
                  setLightboxIndex((prev) => (prev === totalSlides - 1 ? 0 : prev + 1))
                }
                className="absolute top-1/2 right-3 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-xl border border-[#334155] bg-[#0F172A]/95 text-[#F8FAFC] transition-colors hover:border-[#EA580C] hover:bg-[#EA580C]"
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
