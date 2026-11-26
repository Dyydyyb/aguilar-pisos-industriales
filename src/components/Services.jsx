import { useRef, useState } from 'react';
import {
  ArrowRight,
  Compass,
  Disc,
  Factory,
  Hammer,
  Layers,
  ShieldCheck,
  Truck,
  Warehouse,
} from 'lucide-react';
import Reveal from './Reveal';
import { SERVICE_DIVISIONS } from '../data/siteData';

const SERVICE_ICONS = {
  disc: Disc,
  warehouse: Warehouse,
  truck: Truck,
  shield: ShieldCheck,
  compass: Compass,
  factory: Factory,
  layers: Layers,
  hammer: Hammer,
};

export default function Services({ onSelectService }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [mobileScrollIndex, setMobileScrollIndex] = useState(0);
  const tabRefs = useRef([]);

  const activeDivision = SERVICE_DIVISIONS[activeIndex] || SERVICE_DIVISIONS[0];

  const handleSelectTab = (index, focusTab = false) => {
    setActiveIndex(index);
    setMobileScrollIndex(0);
    if (focusTab && tabRefs.current[index]) {
      tabRefs.current[index].focus();
    }
  };

  // Navegación completa WAI-ARIA APG Tabs (ArrowLeft, ArrowRight, Home, End)
  const handleTabKeyDown = (event, index) => {
    const count = SERVICE_DIVISIONS.length;
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      handleSelectTab((index + 1) % count, true);
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      handleSelectTab((index - 1 + count) % count, true);
    } else if (event.key === 'Home') {
      event.preventDefault();
      handleSelectTab(0, true);
    } else if (event.key === 'End') {
      event.preventDefault();
      handleSelectTab(count - 1, true);
    }
  };

  const handleRailScroll = (event) => {
    const container = event.currentTarget;
    const firstCard = container.firstElementChild;
    if (!firstCard) return;
    const stepWidth = firstCard.getBoundingClientRect().width + 14;
    if (stepWidth <= 0) return;
    const nextIndex = Math.min(
      activeDivision.items.length - 1,
      Math.max(0, Math.round(container.scrollLeft / stepWidth))
    );
    setMobileScrollIndex(nextIndex);
  };

  const handleConsultClick = (service) => {
    onSelectService({
      category: service.filterCategory,
      detail: service.title,
    });
  };

  return (
    <section
      id="servicios"
      className="border-b border-concrete-border bg-concrete-light py-12 sm:py-20 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Encabezado diferenciado del H1 de portada */}
        <Reveal className="flex flex-col gap-3 sm:gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <h2 className="font-display text-2xl font-extrabold tracking-[-0.03em] text-ink text-balance sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
              Dos Divisiones Técnicas Bajo una Sola Dirección
            </h2>
          </div>

          <p className="max-w-xl text-sm leading-relaxed text-ink-muted sm:text-base">
            Coordinamos cada etapa desde el movimiento de suelos y el piso industrial llaneado
            hasta la ejecución integral de tu nave o reforma edilicia.
          </p>
        </Reveal>

        {/* Tabs interactivos con soporte de teclado APG e indicador deslizante */}
        <Reveal delayMs={80} className="mt-6 sm:mt-12">
          <div
            role="tablist"
            aria-label="Divisiones de servicios"
            className="relative grid grid-cols-2 rounded-2xl border border-concrete-border bg-concrete-mid p-1 sm:inline-grid sm:p-1.5"
          >
            <span
              aria-hidden="true"
              className="pointer-events-none absolute top-1 bottom-1 left-1 w-[calc(50%-0.25rem)] rounded-xl bg-charcoal transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none sm:top-1.5 sm:bottom-1.5 sm:left-1.5 sm:w-[calc(50%-0.375rem)]"
              style={{ transform: `translateX(${activeIndex * 100}%)` }}
            />

            {SERVICE_DIVISIONS.map((division, idx) => {
              const isSelected = idx === activeIndex;
              return (
                <button
                  key={division.id}
                  ref={(node) => {
                    tabRefs.current[idx] = node;
                  }}
                  id={`tab-${division.id}`}
                  role="tab"
                  type="button"
                  tabIndex={isSelected ? 0 : -1}
                  aria-selected={isSelected}
                  aria-controls={`panel-${division.id}`}
                  onClick={() => handleSelectTab(idx)}
                  onKeyDown={(event) => handleTabKeyDown(event, idx)}
                  className={`relative z-10 flex min-h-[44px] sm:min-h-[48px] items-center justify-center gap-2 rounded-xl px-2.5 py-2.5 text-center text-xs font-semibold transition-colors duration-200 active:scale-[0.98] sm:min-w-[270px] sm:gap-3 sm:px-6 sm:text-base ${
                    isSelected ? 'text-ink-inverse' : 'text-ink hover:text-charcoal'
                  }`}
                >
                  <span className="sm:hidden">{division.shortLabel}</span>
                  <span className="hidden sm:inline">{division.label}</span>
                  <span
                    className={`tabular-nums rounded-full px-2 py-0.5 text-[11px] font-semibold transition-colors duration-200 sm:px-2.5 sm:text-xs ${
                      isSelected
                        ? 'bg-obra text-white'
                        : 'border border-concrete-border bg-concrete-light text-ink-muted'
                    }`}
                  >
                    {division.items.length}
                  </span>
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* Panel de división activo */}
        <div
          key={activeDivision.id}
          id={`panel-${activeDivision.id}`}
          role="tabpanel"
          aria-labelledby={`tab-${activeDivision.id}`}
          className="animate-tab-panel mt-5 sm:mt-8"
        >
          <div className="mb-4 flex items-center justify-between gap-3 sm:mb-7">
            <p className="max-w-3xl text-xs font-medium text-ink-muted sm:text-base">
              {activeDivision.summary}
            </p>
            <span className="shrink-0 text-xs font-semibold text-obra md:hidden">
              Deslizá →
            </span>
          </div>

          <div className="relative">
            <div
              onScroll={handleRailScroll}
              className="no-scrollbar flex gap-3.5 overflow-x-auto snap-x snap-mandatory pb-1 -mx-4 px-4 md:mx-0 md:px-0 md:grid md:grid-cols-2 md:gap-6 md:overflow-visible md:pb-0"
            >
              {activeDivision.items.map((service, idx) => {
                const IconComponent = SERVICE_ICONS[service.icon] || Disc;
                return (
                  <article
                    key={service.id}
                    style={{ animationDelay: `${idx * 60}ms` }}
                    className="animate-card-in flex w-[82vw] max-w-[330px] shrink-0 snap-start flex-col justify-between rounded-2xl border border-concrete-border bg-white p-5 transition-colors duration-200 hover:border-input-border md:w-auto md:max-w-none sm:p-8"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-4">
                        <span className="flex h-11 w-11 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-xl border border-concrete-border bg-concrete-mid text-ink">
                          <IconComponent className="h-5 w-5" strokeWidth={1.8} aria-hidden="true" />
                        </span>
                      </div>

                      <h3 className="mt-4 sm:mt-5 font-display text-base font-bold leading-snug tracking-[-0.02em] text-ink sm:text-xl">
                        {service.title}
                      </h3>

                      <p className="mt-2.5 sm:mt-3 text-xs leading-relaxed text-ink-muted sm:text-[15px]">
                        {service.description}
                      </p>

                      <ul
                        className="mt-4 sm:mt-5 flex flex-wrap gap-1.5 sm:gap-2"
                        aria-label="Especificaciones técnicas"
                      >
                        {service.specs.map((spec) => (
                          <li
                            key={spec}
                            className="rounded-lg border border-concrete-border bg-concrete-light px-2.5 py-1 text-xs font-medium text-ink"
                          >
                            {spec}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-5 sm:mt-7 border-t border-concrete-mid pt-4 sm:pt-5">
                      <button
                        type="button"
                        onClick={() => handleConsultClick(service)}
                        className="group inline-flex min-h-[44px] items-center gap-2 rounded-xl px-1 text-sm font-semibold text-obra transition-colors duration-150 hover:text-obra-hover active:scale-[0.97]"
                      >
                        <span>Consultar este servicio</span>
                        <ArrowRight
                          className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
            <div
              className="pointer-events-none absolute top-0 right-0 bottom-1 w-8 bg-gradient-to-l from-concrete-light to-transparent md:hidden"
              aria-hidden="true"
            />
          </div>

          {/* Indicador de posición del riel móvil */}
          <div className="mt-3 flex items-center justify-center gap-1.5 md:hidden" aria-hidden="true">
            {activeDivision.items.map((service, idx) => (
              <span
                key={service.id}
                className={`h-1.5 rounded-full transition-all duration-200 ${
                  idx === mobileScrollIndex ? 'w-6 bg-obra' : 'w-2 bg-concrete-border'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
