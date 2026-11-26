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
  const thumbRefs = useRef([]);
  const lightboxRef = useRef(null);
  const lightboxCloseBtnRef = useRef(null);
  const previousFocusRef = useRef(null);
  const hasInteractedRef = useRef(false);

  const totalSlides = projectsData.length;

  const selectSlide = useCallback((nextIdx) => {
    hasInteractedRef.current = true;
    setCurrentIndex(nextIdx);
  }, []);

  const goToPrevious = useCallback(() => {
    hasInteractedRef.current = true;
    setCurrentIndex((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  }, [totalSlides]);

  const goToNext = useCallback(() => {
    hasInteractedRef.current = true;
    setCurrentIndex((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
  }, [totalSlides]);

  // Sincroniza la miniatura activa dentro del riel horizontal móvil cuando cambia el slide
  useEffect(() => {
    if (!hasInteractedRef.current) return;
    const activeThumb = thumbRefs.current[currentIndex];
    if (!activeThumb) return;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    activeThumb.scrollIntoView({
      behavior: reducedMotion ? 'auto' : 'smooth',
      inline: 'nearest',
      block: 'nearest',
    });
  }, [currentIndex]);

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

  const openLightbox = (index, triggerElement) => {
    previousFocusRef.current = triggerElement || document.activeElement;
    setLightboxIndex(index);
  };

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
    window.requestAnimationFrame(() => {
      if (previousFocusRef.current && typeof previousFocusRef.current.focus === 'function') {
        previousFocusRef.current.focus();
      }
    });
  }, []);

  // Gestión completa de foco (foco inicial, focus trap Tab/Shift+Tab y teclas Esc/Flechas) en Lightbox
  useEffect(() => {
    if (lightboxIndex === null) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const focusTimer = window.requestAnimationFrame(() => {
      lightboxCloseBtnRef.current?.focus();
    });

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        closeLightbox();
      } else if (event.key === 'ArrowLeft') {
        event.preventDefault();
        setLightboxIndex((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        setLightboxIndex((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
      } else if (event.key === 'Tab' && lightboxRef.current) {
        const focusables = lightboxRef.current.querySelectorAll(
          'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])'
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.cancelAnimationFrame(focusTimer);
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [lightboxIndex, totalSlides, closeLightbox]);

  const activeLightboxProject =
    lightboxIndex !== null ? projectsData[lightboxIndex] : null;

  return (
    <section
      id="proyectos"
      className="border-b border-concrete-border bg-concrete-mid py-12 text-ink sm:py-20 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Encabezado y controles del slider */}
        <Reveal className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <h2 className="font-display text-2xl font-extrabold tracking-[-0.03em] text-ink text-balance sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
              Obras Realizadas en Campo
            </h2>
            <p className="mt-2.5 sm:mt-4 text-sm leading-relaxed text-ink-muted sm:text-base">
              Trabajos reales en pisos industriales, playones cívicos, sendas, hormigón pigmentado
              y accesos de camiones ejecutados en Florencio Varela y Buenos Aires Zona Sur.
            </p>
          </div>

          <div className="flex items-center justify-between gap-4 sm:justify-end">
            <span
              className="tabular-nums text-sm font-semibold tracking-[0.08em] text-ink"
              aria-live="polite"
            >
              {String(currentIndex + 1).padStart(2, '0')} /{' '}
              {String(totalSlides).padStart(2, '0')}
            </span>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={goToPrevious}
                className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-input-border bg-concrete-light text-ink transition-[background-color,border-color,color,transform] duration-150 hover:border-obra hover:bg-obra hover:text-white active:scale-[0.96]"
                aria-label="Proyecto anterior"
              >
                <ChevronLeft className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={goToNext}
                className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-input-border bg-concrete-light text-ink transition-[background-color,border-color,color,transform] duration-150 hover:border-obra hover:bg-obra hover:text-white active:scale-[0.96]"
                aria-label="Proyecto siguiente"
              >
                <ChevronRight className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </Reveal>

        {/* Contenedor principal redondeado del Slider */}
        <Reveal variant="scale" delayMs={100} className="mt-6 sm:mt-10">
          <div
            className="touch-pan-y overflow-hidden rounded-2xl border border-concrete-border bg-concrete-light"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onTouchCancel={resetTouchState}
            role="region"
            aria-roledescription="carrusel"
            aria-label="Galería de obras realizadas"
          >
            <div
              className="flex transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none"
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
                    {/* Fotografía: 4:3 compacto en móvil y 50/50 altura completa en PC */}
                    <div className="relative bg-charcoal lg:col-span-6">
                      <button
                        type="button"
                        onClick={(event) => openLightbox(index, event.currentTarget)}
                        tabIndex={isActiveSlide ? 0 : -1}
                        className="group relative block w-full aspect-[4/3] lg:aspect-auto lg:h-full lg:min-h-[540px] overflow-hidden text-left focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-obra-bright"
                        aria-label={`Ampliar fotografía de ${project.title}`}
                      >
                        <img
                          src={project.image}
                          alt={project.alt}
                          width={project.width}
                          height={project.height}
                          loading={index === 0 ? 'eager' : 'lazy'}
                          decoding="async"
                          className={`h-full w-full object-cover ${
                            project.imagePosition || 'object-center'
                          } transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none ${
                            isActiveSlide ? 'scale-100 group-hover:scale-[1.03]' : 'scale-[1.04]'
                          }`}
                        />
                        {project.featured && (
                          <span className="absolute top-3 left-3 sm:top-3.5 sm:left-3.5 inline-flex items-center gap-2 rounded-full bg-obra px-3 py-1 sm:px-3.5 sm:py-1.5 text-xs font-bold uppercase tracking-[0.08em] text-white">
                            Obra Principal
                          </span>
                        )}
                        <span className="absolute right-3 bottom-3 sm:right-3.5 sm:bottom-3.5 inline-flex min-h-[40px] items-center gap-2 rounded-xl border border-steel-border-strong bg-charcoal/95 px-3 py-1.5 text-xs font-semibold text-ink-inverse transition-colors group-hover:border-obra group-hover:bg-obra">
                          <Expand className="h-3.5 w-3.5" aria-hidden="true" />
                          <span>Ver completa</span>
                        </span>
                      </button>
                    </div>

                    {/* Ficha técnica del proyecto */}
                    <div className="flex flex-col justify-between border-t border-concrete-border bg-concrete-light p-4 sm:p-8 lg:col-span-6 lg:border-t-0 lg:border-l">
                      <div>
                        <span
                          className={`inline-block rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.08em] ${
                            project.featured
                              ? 'bg-obra text-white'
                              : 'border border-concrete-border bg-concrete-mid text-ink'
                          }`}
                        >
                          {project.category}
                        </span>

                        <h3 className="mt-3 sm:mt-4 font-display text-lg font-extrabold leading-tight tracking-[-0.02em] text-ink sm:text-2xl">
                          {project.title}
                        </h3>

                        {/* Metadatos lado a lado incluso en móvil */}
                        <dl className="mt-4 sm:mt-5 grid grid-cols-2 gap-3 border-y border-concrete-border py-3 sm:py-4">
                          <div className="flex items-start gap-2">
                            <MapPin
                              className="mt-0.5 h-4 w-4 shrink-0 text-obra"
                              aria-hidden="true"
                            />
                            <div className="min-w-0">
                              <dt className="text-[11px] font-medium uppercase tracking-[0.08em] text-ink-muted">
                                Ubicación
                              </dt>
                              <dd className="mt-0.5 text-xs sm:text-sm font-medium text-ink">
                                {project.location}
                              </dd>
                            </div>
                          </div>

                          <div className="flex items-start gap-2">
                            <Layers
                              className="mt-0.5 h-4 w-4 shrink-0 text-obra"
                              aria-hidden="true"
                            />
                            <div className="min-w-0">
                              <dt className="text-[11px] font-medium uppercase tracking-[0.08em] text-ink-muted">
                                Terminación
                              </dt>
                              <dd className="mt-0.5 text-xs sm:text-sm font-semibold text-ink">
                                {project.execution}
                              </dd>
                            </div>
                          </div>
                        </dl>

                        <p className="mt-3.5 sm:mt-5 text-xs sm:text-[15px] leading-relaxed text-ink-muted">
                          {project.description}
                        </p>

                        <p className="mt-3 sm:mt-4 rounded-xl border border-concrete-border bg-concrete-mid/60 px-3 py-2 sm:px-3.5 sm:py-2.5 text-xs font-medium text-ink">
                          {project.specHighlight}
                        </p>
                      </div>

                      <div className="mt-4 sm:mt-7 pt-1 sm:pt-2">
                        <button
                          type="button"
                          tabIndex={isActiveSlide ? 0 : -1}
                          onClick={() =>
                            onSelectService({
                              category: project.filterCategory,
                              detail: project.title,
                            })
                          }
                          className="group inline-flex min-h-[44px] items-center gap-2 rounded-xl px-1 text-sm font-semibold text-obra transition-colors hover:text-obra-hover active:scale-[0.97]"
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

          {/* Tira de miniaturas sincronizada con pista visual en móvil */}
          <div className="mt-3.5 sm:mt-4">
            <div className="mb-1.5 flex items-center justify-between sm:hidden">
              <span className="text-[11px] font-medium text-ink-muted">
                Elegí una obra ({currentIndex + 1} de {totalSlides})
              </span>
              <span className="text-xs font-semibold text-obra">Deslizá →</span>
            </div>

            <div className="relative">
              <div
                className="no-scrollbar flex gap-2.5 overflow-x-auto snap-x snap-mandatory -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-4 sm:gap-3 sm:overflow-visible"
                role="group"
                aria-label="Seleccionar proyecto"
              >
                {projectsData.map((project, index) => {
                  const isActive = index === currentIndex;
                  return (
                    <button
                      key={project.id}
                      ref={(node) => {
                        thumbRefs.current[index] = node;
                      }}
                      type="button"
                      aria-current={isActive ? 'true' : undefined}
                      aria-label={`Ver proyecto ${index + 1}: ${project.title}`}
                      onClick={() => selectSlide(index)}
                      className={`group flex min-h-[56px] w-[48vw] max-w-[195px] shrink-0 snap-start items-center gap-2.5 rounded-xl border p-2 text-left transition-[transform,border-color,background-color] duration-200 active:scale-[0.97] sm:w-auto sm:max-w-none sm:gap-3 ${
                        isActive
                          ? 'border-obra bg-charcoal text-ink-inverse'
                          : 'border-concrete-border bg-concrete-light text-ink hover:border-input-border'
                      }`}
                    >
                      <img
                        src={project.image}
                        alt=""
                        aria-hidden="true"
                        width={project.width}
                        height={project.height}
                        loading="lazy"
                        decoding="async"
                        className={`h-10 w-10 sm:h-11 sm:w-11 shrink-0 rounded-lg object-cover ${
                          project.imagePosition || 'object-center'
                        }`}
                      />
                      <span className="min-w-0">
                        <span
                          className={`tabular-nums block text-[11px] font-semibold ${
                            isActive ? 'text-obra-bright' : 'text-ink-muted'
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
              <div
                className="pointer-events-none absolute top-0 right-0 bottom-0 w-8 bg-gradient-to-l from-concrete-mid to-transparent sm:hidden"
                aria-hidden="true"
              />
            </div>
          </div>
        </Reveal>
      </div>

      {/* Lightbox Modal con focus trap y restauración de foco */}
      {activeLightboxProject && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Fotografía ampliada: ${activeLightboxProject.title}`}
          className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/95 p-4 sm:p-6"
          onClick={closeLightbox}
        >
          <div
            ref={lightboxRef}
            className="animate-lightbox relative w-full max-w-5xl overflow-hidden rounded-2xl border border-steel-border bg-charcoal"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-4 border-b border-steel-border px-4 py-3 sm:px-6">
              <div className="min-w-0">
                <p className="truncate font-display text-sm font-bold text-ink-inverse sm:text-base">
                  {activeLightboxProject.title}
                </p>
                <p className="text-xs text-ink-inverse-muted">
                  {activeLightboxProject.location} • {activeLightboxProject.execution}
                </p>
              </div>

              <button
                ref={lightboxCloseBtnRef}
                type="button"
                onClick={closeLightbox}
                className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-steel-border-strong bg-graphite text-ink-inverse transition-colors hover:border-obra hover:bg-obra"
                aria-label="Cerrar imagen ampliada"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            <div className="relative bg-black/50">
              <img
                src={activeLightboxProject.image}
                alt={activeLightboxProject.alt}
                width={activeLightboxProject.width}
                height={activeLightboxProject.height}
                decoding="async"
                className="max-h-[72vh] w-full object-contain"
              />

              <button
                type="button"
                onClick={() =>
                  setLightboxIndex((prev) => (prev === 0 ? totalSlides - 1 : prev - 1))
                }
                className="absolute top-1/2 left-3 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-xl border border-steel-border-strong bg-charcoal/95 text-ink-inverse transition-colors hover:border-obra hover:bg-obra"
                aria-label="Imagen anterior"
              >
                <ChevronLeft className="h-5 w-5" aria-hidden="true" />
              </button>

              <button
                type="button"
                onClick={() =>
                  setLightboxIndex((prev) => (prev === totalSlides - 1 ? 0 : prev + 1))
                }
                className="absolute top-1/2 right-3 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-xl border border-steel-border-strong bg-charcoal/95 text-ink-inverse transition-colors hover:border-obra hover:bg-obra"
                aria-label="Imagen siguiente"
              >
                <ChevronRight className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 border-t border-steel-border px-4 py-3 text-xs text-ink-inverse-muted sm:px-6">
              <span>{activeLightboxProject.specHighlight}</span>
              <span className="tabular-nums text-ink-inverse-muted">
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
