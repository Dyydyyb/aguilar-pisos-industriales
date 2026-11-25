import { ArrowDownRight, Building2, ClipboardCheck, Cog, MapPin } from 'lucide-react';
import Reveal from './Reveal';
import { HERO_INDICATORS } from '../data/siteData';

const INDICATOR_ICONS = {
  cog: Cog,
  building: Building2,
  clipboard: ClipboardCheck,
};

export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative flex min-h-screen flex-col justify-between bg-[#0F172A] pt-[76px] text-[#F8FAFC] overflow-hidden"
    >
      {/* Imagen de fondo industrial con capa oscura mate (bg-slate-950/75) */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/hero-concrete.webp"
          alt="Ejecución mecánica de hormigón llaneado industrial con allanadora doble tripulada"
          className="h-full w-full object-cover object-center"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-slate-950/75" aria-hidden="true" />
      </div>

      {/* Contenido principal del Hero */}
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 items-center px-4 py-14 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="max-w-4xl">
          <Reveal delayMs={0}>
            <div className="inline-flex max-w-full flex-wrap items-center gap-2 border border-[#334155] bg-[#0F172A]/95 px-3.5 py-2 text-xs font-medium text-slate-200 sm:text-sm">
              <MapPin className="h-4 w-4 shrink-0 text-[#EA580C]" aria-hidden="true" />
              <span>Buenos Aires, Zona Sur</span>
              <span className="text-slate-500" aria-hidden="true">
                •
              </span>
              <span className="text-[#F8FAFC]">Cotizaciones y Consultas Sin Cargo</span>
            </div>
          </Reveal>

          <Reveal delayMs={90}>
            <h1 className="mt-6 font-display text-3xl font-extrabold leading-[1.08] tracking-[-0.03em] text-[#F8FAFC] text-balance sm:text-5xl lg:text-6xl">
              Pisos Industriales de Alta Resistencia, Arquitectura y Construcción
            </h1>
          </Reveal>

          <Reveal delayMs={180}>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg lg:text-xl">
              Soluciones estructurales y pisos de hormigón llaneado para galpones, fábricas,
              entradas vehiculares y obras civiles. Ejecución técnica con maquinaria propia.
            </p>
          </Reveal>

          <Reveal delayMs={260}>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
              <a
                href="#cotizador"
                className="inline-flex min-h-[52px] items-center justify-center gap-2.5 bg-[#EA580C] px-7 text-sm font-semibold text-white transition-colors duration-150 hover:bg-[#C2410C] active:scale-[0.98] sm:text-base"
              >
                <span>Armar Consulta por WhatsApp</span>
                <ArrowDownRight className="h-5 w-5 shrink-0" aria-hidden="true" />
              </a>

              <a
                href="#proyectos"
                className="inline-flex min-h-[52px] items-center justify-center border border-[#F8FAFC]/85 bg-transparent px-7 text-sm font-semibold text-[#F8FAFC] transition-colors duration-150 hover:bg-[#F8FAFC] hover:text-[#0F172A] active:scale-[0.98] sm:text-base"
              >
                Ver Proyectos
              </a>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Barra inferior integrada con 3 indicadores técnicos animados */}
      <div className="relative z-10 border-t border-[#334155] bg-[#0F172A]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 divide-y divide-[#334155] md:grid-cols-3 md:divide-x md:divide-y-0">
            {HERO_INDICATORS.map((item, index) => {
              const IconComponent = INDICATOR_ICONS[item.icon] || Cog;
              return (
                <Reveal
                  key={item.id}
                  delayMs={320 + index * 90}
                  className="flex items-start gap-4 py-5 md:px-6 md:first:pl-0 md:last:pr-0"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center border border-[#334155] bg-[#1E293B] text-[#EA580C]">
                    <IconComponent className="h-5 w-5" strokeWidth={1.8} aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <p className="font-display text-sm font-bold tracking-[-0.01em] text-[#F8FAFC] sm:text-base">
                      {item.title}
                    </p>
                    <p className="mt-1 text-xs leading-relaxed text-slate-300 sm:text-sm">
                      {item.detail}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
