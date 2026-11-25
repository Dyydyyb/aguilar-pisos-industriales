import { useState } from 'react';
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

  const activeDivision = SERVICE_DIVISIONS[activeIndex] || SERVICE_DIVISIONS[0];

  const handleConsultClick = (service) => {
    onSelectService({
      category: service.filterCategory,
      detail: service.title,
    });
  };

  return (
    <section
      id="servicios"
      className="border-b border-[#CBD5E1] bg-[#F8FAFC] py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Encabezado de sección */}
        <Reveal className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <h2 className="font-display text-3xl font-extrabold tracking-[-0.03em] text-[#0F172A] text-balance sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
              Pisos Industriales, Arquitectura y Construcción Integral
            </h2>
          </div>

          <p className="max-w-xl text-base leading-relaxed text-slate-600">
            Dos divisiones técnicas coordinadas bajo una misma dirección de obra. Ejecutamos desde
            la nivelación y el piso industrial hasta la construcción completa de tu nave.
          </p>
        </Reveal>

        {/* Tabs interactivos redondeados con indicador deslizante */}
        <Reveal delayMs={80} className="mt-10 sm:mt-12">
          <div
            role="tablist"
            aria-label="Divisiones de servicios"
            className="relative grid grid-cols-1 gap-1.5 rounded-2xl border border-[#CBD5E1] bg-[#E2E8F0] p-1.5 sm:inline-grid sm:grid-cols-2 sm:gap-0"
          >
            {/* Indicador deslizante suave en desktop/tablet */}
            <span
              aria-hidden="true"
              className="pointer-events-none hidden sm:block absolute top-1.5 bottom-1.5 left-1.5 w-[calc(50%-0.375rem)] rounded-xl bg-[#0F172A] transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{ transform: `translateX(${activeIndex * 100}%)` }}
            />

            {SERVICE_DIVISIONS.map((division, idx) => {
              const isSelected = idx === activeIndex;
              return (
                <button
                  key={division.id}
                  id={`tab-${division.id}`}
                  role="tab"
                  type="button"
                  aria-selected={isSelected}
                  aria-controls={`panel-${division.id}`}
                  onClick={() => setActiveIndex(idx)}
                  className={`relative z-10 flex min-h-[48px] items-center justify-center gap-3 rounded-xl px-6 py-3 text-left text-sm font-semibold transition-colors duration-200 active:scale-[0.98] sm:min-w-[270px] sm:text-base ${
                    isSelected
                      ? 'bg-[#0F172A] text-[#F8FAFC] sm:bg-transparent'
                      : 'bg-transparent text-slate-700 hover:text-[#0F172A]'
                  }`}
                >
                  <span>{division.label}</span>
                  <span
                    className={`tabular-nums rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors duration-200 ${
                      isSelected
                        ? 'bg-[#EA580C] text-white'
                        : 'border border-[#CBD5E1] bg-[#F8FAFC] text-slate-600'
                    }`}
                  >
                    {division.items.length}
                  </span>
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* Panel de división activo con tarjetas redondeadas y stagger suave */}
        <div
          key={activeDivision.id}
          id={`panel-${activeDivision.id}`}
          role="tabpanel"
          aria-labelledby={`tab-${activeDivision.id}`}
          className="animate-tab-panel mt-8"
        >
          <p className="mb-7 max-w-3xl text-sm font-medium text-slate-600 sm:text-base">
            {activeDivision.summary}
          </p>

          {/* Grilla moderna con tarjetas redondeadas y elevación sutil */}
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:gap-6">
            {activeDivision.items.map((service, idx) => {
              const IconComponent = SERVICE_ICONS[service.icon] || Disc;
              return (
                <article
                  key={service.id}
                  style={{ animationDelay: `${idx * 60}ms` }}
                  className="animate-card-in group flex flex-col justify-between rounded-2xl border border-[#CBD5E1] bg-white p-6 transition-[transform,border-color] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:border-slate-400 sm:p-8"
                >
                  <div>
                    <div className="flex items-start justify-between gap-4">
                      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#CBD5E1] bg-[#E2E8F0] text-[#0F172A] transition-colors duration-200 group-hover:border-[#EA580C] group-hover:bg-[#EA580C] group-hover:text-white">
                        <IconComponent className="h-5 w-5" strokeWidth={1.8} aria-hidden="true" />
                      </span>
                    </div>

                    <h3 className="mt-5 font-display text-lg font-bold leading-snug tracking-[-0.02em] text-[#0F172A] sm:text-xl">
                      {service.title}
                    </h3>

                    <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-[15px]">
                      {service.description}
                    </p>

                    {/* Especificaciones técnicas */}
                    <ul className="mt-5 flex flex-wrap gap-2" aria-label="Especificaciones técnicas">
                      {service.specs.map((spec) => (
                        <li
                          key={spec}
                          className="rounded-lg border border-[#CBD5E1] bg-[#F8FAFC] px-3 py-1 text-xs font-medium text-slate-700"
                        >
                          {spec}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-7 border-t border-[#E2E8F0] pt-5">
                    <button
                      type="button"
                      onClick={() => handleConsultClick(service)}
                      className="inline-flex min-h-[44px] items-center gap-2 rounded-xl px-1 text-sm font-semibold text-[#EA580C] transition-colors duration-150 hover:text-[#C2410C] active:scale-[0.97]"
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
        </div>
      </div>
    </section>
  );
}
