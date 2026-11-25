import { ArrowDownRight, Building2, ClipboardCheck, Cog, MapPin } from 'lucide-react';
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
      {/* Mosaico unificado de todas las obras reales con asentamiento suave + capa oscura mate */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src="/images/hero-obras-collage.webp"
          alt="Obras reales de Aguilar Pisos Industriales: Plaza San Juan Bautista en hormigón peinado y pigmento azul, playón cívico, senda peatonal y piso industrial de acceso de camiones"
          className="animate-hero-canvas h-full w-full object-cover object-center"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-slate-950/75" aria-hidden="true" />
      </div>

      {/* Contenido principal del Hero con coreografía de entrada */}
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 items-center px-4 py-14 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="max-w-4xl">
          <div
            className="animate-hero-fade inline-flex max-w-full flex-wrap items-center gap-2 rounded-full border border-[#334155] bg-[#0F172A]/95 px-4 py-2 text-xs font-medium text-slate-200 sm:text-sm"
            style={{ animationDelay: '40ms' }}
          >
            <MapPin className="h-4 w-4 shrink-0 text-[#EA580C]" aria-hidden="true" />
            <span>Buenos Aires, Zona Sur</span>
            <span className="text-slate-500" aria-hidden="true">
              •
            </span>
            <span className="text-[#F8FAFC]">Cotizaciones y Consultas Sin Cargo</span>
          </div>

          <h1
            className="animate-hero-clip mt-6 font-display text-3xl font-extrabold leading-[1.08] tracking-[-0.03em] text-[#F8FAFC] text-balance sm:text-5xl lg:text-6xl"
            style={{ animationDelay: '120ms' }}
          >
            Pisos Industriales de Alta Resistencia, Arquitectura y Construcción
          </h1>

          <p
            className="animate-hero-fade mt-6 max-w-2xl text-base leading-relaxed text-slate-200 sm:text-lg lg:text-xl"
            style={{ animationDelay: '220ms' }}
          >
            Soluciones estructurales y pisos de hormigón llaneado para galpones, fábricas,
            entradas vehiculares y obras civiles. Ejecución técnica con maquinaria propia.
          </p>

          <div
            className="animate-hero-fade mt-9 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4"
            style={{ animationDelay: '300ms' }}
          >
            <a
              href="#cotizador"
              className="group inline-flex min-h-[52px] items-center justify-center gap-2.5 rounded-xl bg-[#EA580C] px-7 text-sm font-semibold text-white transition-[background-color,transform] duration-150 hover:bg-[#C2410C] active:scale-[0.97] sm:text-base"
            >
              <span>Armar Consulta por WhatsApp</span>
              <ArrowDownRight
                className="h-5 w-5 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:translate-y-0.5"
                aria-hidden="true"
              />
            </a>

            <a
              href="#proyectos"
              className="inline-flex min-h-[52px] items-center justify-center rounded-xl border border-[#F8FAFC]/85 bg-transparent px-7 text-sm font-semibold text-[#F8FAFC] transition-[background-color,color,transform] duration-150 hover:bg-[#F8FAFC] hover:text-[#0F172A] active:scale-[0.97] sm:text-base"
            >
              Ver Proyectos
            </a>
          </div>
        </div>
      </div>

      {/* Grilla inferior integrada al Hero con 3 indicadores técnicos en tarjetas redondeadas */}
      <div className="relative z-10 border-t border-[#334155] bg-[#0F172A]/95">
        <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-3 md:gap-4">
            {HERO_INDICATORS.map((item, index) => {
              const IconComponent = INDICATOR_ICONS[item.icon] || Cog;
              return (
                <div
                  key={item.id}
                  className="animate-hero-fade flex items-start gap-4 rounded-2xl border border-[#334155] bg-[#1E293B]/80 p-4 transition-colors duration-200 hover:border-slate-500"
                  style={{ animationDelay: `${380 + index * 80}ms` }}
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#334155] bg-[#0F172A] text-[#EA580C]">
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
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
