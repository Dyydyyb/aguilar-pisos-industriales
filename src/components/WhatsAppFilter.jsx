import { useState } from 'react';
import { Check, Copy, Handshake, MapPin, X } from 'lucide-react';
import Reveal from './Reveal';
import WhatsAppIcon from './WhatsAppIcon';
import {
  ALLIANCE_SERVICE_OPTION,
  BUSINESS_INFO,
  WHATSAPP_AREA_OPTIONS,
  WHATSAPP_SECTOR_OPTIONS,
  WHATSAPP_SERVICE_OPTIONS,
  buildWhatsAppQuoteMessage,
  buildWhatsAppUrl,
} from '../data/siteData';

export default function WhatsAppFilter({
  selectedService,
  selectedServiceDetail,
  onSelectServiceCategory,
  onClearServiceDetail,
}) {
  const [selectedArea, setSelectedArea] = useState(WHATSAPP_AREA_OPTIONS[1]);
  const [selectedSector, setSelectedSector] = useState(WHATSAPP_SECTOR_OPTIONS[0]);
  const [zone, setZone] = useState('');
  const [copied, setCopied] = useState(false);

  const isAllianceMode = selectedService === ALLIANCE_SERVICE_OPTION;

  const previewMessage = buildWhatsAppQuoteMessage({
    service: selectedService,
    serviceDetail: selectedServiceDetail,
    area: selectedArea,
    sector: selectedSector,
    zone,
  });

  const whatsappHref = buildWhatsAppUrl(previewMessage);

  const handleCopyMessage = async () => {
    try {
      await navigator.clipboard.writeText(previewMessage);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section
      id="cotizador"
      className="border-b border-[#CBD5E1] bg-[#E2E8F0] py-12 sm:py-20 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="max-w-3xl">
          <h2 className="font-display text-2xl font-extrabold tracking-[-0.03em] text-[#0F172A] text-balance sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
            Armá tu Consulta Técnica en 3 Pasos
          </h2>
          <p className="mt-2.5 sm:mt-4 text-sm sm:text-base leading-relaxed text-slate-700">
            Seleccioná las características principales de tu obra o consulta comercial y enviá el
            detalle listo por WhatsApp. Presupuestos y visitas técnicas 100% sin cargo.
          </p>
        </Reveal>

        <div className="mt-6 sm:mt-10 grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-12 lg:items-start lg:gap-8">
          {/* Panel configurador interactivo compacto en 2 columnas desde móvil (izquierda) */}
          <Reveal
            variant="scale"
            delayMs={80}
            className="rounded-2xl border border-[#CBD5E1] bg-[#F8FAFC] p-4 sm:p-8 lg:col-span-7"
          >
            {/* Paso 1: Tipo de obra / alianza */}
            <fieldset>
              <legend className="flex items-center gap-2.5 sm:gap-3 font-display text-sm font-bold text-[#0F172A] sm:text-lg">
                <span className="tabular-nums inline-flex h-6 w-6 sm:h-7 sm:w-7 shrink-0 items-center justify-center rounded-lg bg-[#0F172A] text-xs font-extrabold text-[#F8FAFC]">
                  1
                </span>
                <span>¿Qué necesitás construir?</span>
              </legend>

              <div className="mt-3 sm:mt-4 grid grid-cols-2 gap-2 sm:gap-2.5">
                {WHATSAPP_SERVICE_OPTIONS.map((option) => {
                  const isActive = selectedService === option;
                  const isAlliancePill = option === ALLIANCE_SERVICE_OPTION;
                  return (
                    <button
                      key={option}
                      type="button"
                      aria-pressed={isActive}
                      onClick={() => onSelectServiceCategory(option)}
                      className={`flex min-h-[44px] sm:min-h-[48px] items-center justify-between gap-2 rounded-xl border px-3 py-2 sm:px-4 sm:py-2.5 text-left text-xs sm:text-sm font-semibold leading-snug transition-[background-color,border-color,color,transform] duration-150 active:scale-[0.97] ${
                        isAlliancePill ? 'col-span-2' : ''
                      } ${
                        isActive
                          ? 'border-[#0F172A] bg-[#0F172A] text-[#F8FAFC]'
                          : isAlliancePill
                            ? 'border-[#94A3B8] bg-[#E2E8F0]/60 text-[#0F172A] hover:border-[#0F172A] hover:bg-white'
                            : 'border-[#CBD5E1] bg-white text-[#0F172A] hover:border-[#0F172A]'
                      }`}
                    >
                      <span className="inline-flex items-center gap-2">
                        {isAlliancePill && (
                          <Handshake
                            className="h-4 w-4 shrink-0 text-[#EA580C]"
                            aria-hidden="true"
                          />
                        )}
                        <span>{option}</span>
                      </span>
                      <span
                        className={`h-2 w-2 sm:h-2.5 sm:w-2.5 shrink-0 rounded-full ${
                          isActive ? 'bg-[#EA580C]' : 'border border-[#CBD5E1] bg-transparent'
                        }`}
                        aria-hidden="true"
                      />
                    </button>
                  );
                })}
              </div>

              {selectedServiceDetail && !isAllianceMode && (
                <div className="mt-2.5 sm:mt-3 flex items-center justify-between gap-3 rounded-xl border border-[#CBD5E1] bg-[#E2E8F0] px-3 py-1.5 sm:px-3.5 sm:py-2 text-xs text-[#0F172A]">
                  <span className="min-w-0 truncate">
                    <strong className="font-semibold">Servicio:</strong> {selectedServiceDetail}
                  </span>
                  <button
                    type="button"
                    onClick={onClearServiceDetail}
                    className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[#CBD5E1] bg-[#F8FAFC] text-slate-700 transition-colors hover:border-[#0F172A] hover:text-[#0F172A]"
                    aria-label="Quitar servicio específico"
                  >
                    <X className="h-3.5 w-3.5" aria-hidden="true" />
                  </button>
                </div>
              )}
            </fieldset>

            {/* Paso 2: Dinámico — Superficie estimada (m²) o Rubro de tu empresa (B2B) */}
            <fieldset
              key={isAllianceMode ? 'step-2-b2b' : 'step-2-obra'}
              className="animate-tab-panel mt-5 border-t border-[#E2E8F0] pt-5 sm:mt-8 sm:pt-7"
            >
              <legend className="flex items-center gap-2.5 sm:gap-3 font-display text-sm font-bold text-[#0F172A] sm:text-lg">
                <span className="tabular-nums inline-flex h-6 w-6 sm:h-7 sm:w-7 shrink-0 items-center justify-center rounded-lg bg-[#0F172A] text-xs font-extrabold text-[#F8FAFC]">
                  2
                </span>
                <span>{isAllianceMode ? 'Rubro de tu empresa' : 'Superficie estimada (m²)'}</span>
              </legend>

              {isAllianceMode ? (
                <div className="mt-3 sm:mt-4 grid grid-cols-2 gap-2 sm:gap-2.5">
                  {WHATSAPP_SECTOR_OPTIONS.map((sectorOption) => {
                    const isActive = selectedSector === sectorOption;
                    return (
                      <button
                        key={sectorOption}
                        type="button"
                        aria-pressed={isActive}
                        onClick={() => setSelectedSector(sectorOption)}
                        className={`inline-flex min-h-[44px] items-center justify-center rounded-xl border px-3 py-2 text-center text-xs sm:text-sm font-semibold leading-snug transition-[background-color,border-color,color,transform] duration-150 active:scale-[0.97] ${
                          isActive
                            ? 'border-[#EA580C] bg-[#EA580C] text-white'
                            : 'border-[#CBD5E1] bg-white text-[#0F172A] hover:border-[#0F172A]'
                        }`}
                      >
                        {sectorOption}
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="mt-3 sm:mt-4 grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:gap-2.5">
                  {WHATSAPP_AREA_OPTIONS.map((areaOption, idx) => {
                    const isActive = selectedArea === areaOption;
                    const isLastOdd = idx === WHATSAPP_AREA_OPTIONS.length - 1;
                    return (
                      <button
                        key={areaOption}
                        type="button"
                        aria-pressed={isActive}
                        onClick={() => setSelectedArea(areaOption)}
                        className={`tabular-nums inline-flex min-h-[44px] items-center justify-center rounded-xl border px-3 py-2 sm:px-4 text-xs sm:text-sm font-semibold transition-[background-color,border-color,color,transform] duration-150 active:scale-[0.97] ${
                          isLastOdd ? 'col-span-2 sm:col-span-1' : ''
                        } ${
                          isActive
                            ? 'border-[#EA580C] bg-[#EA580C] text-white'
                            : 'border-[#CBD5E1] bg-white text-[#0F172A] hover:border-[#0F172A]'
                        }`}
                      >
                        {areaOption}
                      </button>
                    );
                  })}
                </div>
              )}
            </fieldset>

            {/* Paso 3: Localidad / Zona */}
            <div className="mt-5 border-t border-[#E2E8F0] pt-5 sm:mt-8 sm:pt-7">
              <label
                htmlFor="obra-zona"
                className="flex items-center gap-2.5 sm:gap-3 font-display text-sm font-bold text-[#0F172A] sm:text-lg"
              >
                <span className="tabular-nums inline-flex h-6 w-6 sm:h-7 sm:w-7 shrink-0 items-center justify-center rounded-lg bg-[#0F172A] text-xs font-extrabold text-[#F8FAFC]">
                  3
                </span>
                <span>
                  {isAllianceMode
                    ? 'Localidad / Zona de tu empresa'
                    : 'Localidad / Zona de la obra'}
                </span>
              </label>

              <div className="relative mt-3 sm:mt-4">
                <MapPin
                  className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-slate-500"
                  aria-hidden="true"
                />
                <input
                  id="obra-zona"
                  type="text"
                  value={zone}
                  onChange={(event) => setZone(event.target.value)}
                  placeholder="Ej: Quilmes, Florencio Varela, Ezeiza, Avellaneda..."
                  autoComplete="address-level2"
                  className="min-h-[46px] sm:min-h-[48px] w-full rounded-xl border border-[#CBD5E1] bg-white py-2.5 sm:py-3 pr-4 pl-10 text-sm text-[#0F172A] placeholder:text-slate-500 transition-colors focus:border-[#EA580C] focus:outline-none sm:text-base"
                />
              </div>
              <p className="mt-1.5 text-[11px] sm:text-xs text-slate-600">
                Cobertura directa en {BUSINESS_INFO.coverage}.
              </p>
            </div>
          </Reveal>

          {/* Vista previa en vivo y envío a WhatsApp (derecha) */}
          <Reveal
            variant="scale"
            delayMs={160}
            className="rounded-2xl border border-[#334155] bg-[#0F172A] p-4 text-[#F8FAFC] sm:p-8 lg:sticky lg:top-[96px] lg:col-span-5"
          >
            <div className="flex items-center justify-between gap-3 border-b border-[#334155] pb-3.5 sm:pb-4">
              <div>
                <h3 className="font-display text-sm sm:text-base font-bold text-[#F8FAFC]">
                  Vista previa del mensaje
                </h3>
                <p className="tabular-nums mt-0.5 text-[11px] sm:text-xs text-slate-300">
                  Destino: WhatsApp {BUSINESS_INFO.phoneDisplay}
                </p>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#334155] bg-[#1E293B] px-2.5 py-1 text-[11px] font-semibold text-slate-200">
                <span className="h-2 w-2 rounded-full bg-[#EA580C]" aria-hidden="true" />
                {isAllianceMode ? 'Alianza B2B' : 'En vivo'}
              </span>
            </div>

            <div
              key={previewMessage}
              aria-live="polite"
              className="animate-preview-ack mt-4 sm:mt-5 rounded-xl border border-[#334155] bg-[#1E293B] p-3.5 sm:p-5"
            >
              <p className="text-xs sm:text-sm leading-relaxed text-slate-100">{previewMessage}</p>
            </div>

            {/* Resumen técnico (visible en tablet/desktop para evitar repetición vertical en móvil) */}
            <dl className="hidden sm:block mt-5 space-y-2 border-b border-[#334155] pb-5 text-xs">
              <div className="flex items-baseline justify-between gap-3">
                <dt className="text-slate-400">{isAllianceMode ? 'Motivo' : 'Servicio'}</dt>
                <dd className="text-right font-medium text-slate-100">{selectedService}</dd>
              </div>
              <div className="flex items-baseline justify-between gap-3">
                <dt className="text-slate-400">
                  {isAllianceMode ? 'Rubro' : 'Superficie aprox.'}
                </dt>
                <dd className="tabular-nums text-right font-medium text-slate-100">
                  {isAllianceMode ? selectedSector : selectedArea}
                </dd>
              </div>
              <div className="flex items-baseline justify-between gap-3">
                <dt className="text-slate-400">Zona</dt>
                <dd className="text-right font-medium text-slate-100">
                  {zone.trim() ? zone.trim() : 'A confirmar'}
                </dd>
              </div>
            </dl>

            {/* Botones de envío */}
            <div className="mt-4 sm:mt-6 flex flex-col gap-2.5 sm:gap-3">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[48px] sm:min-h-[52px] w-full items-center justify-center gap-2.5 rounded-xl bg-[#EA580C] px-4 sm:px-5 py-3 text-center text-xs sm:text-base font-bold text-white transition-[background-color,transform] duration-150 hover:bg-[#C2410C] active:scale-[0.97]"
              >
                <WhatsAppIcon className="h-4 w-4 sm:h-5 sm:w-5 shrink-0" />
                <span>
                  {isAllianceMode
                    ? 'Enviar Consulta de Alianza por WhatsApp'
                    : 'Enviar Consulta por WhatsApp (Sin Cargo)'}
                </span>
              </a>

              <button
                type="button"
                onClick={handleCopyMessage}
                className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-xl border border-[#334155] bg-[#1E293B] px-4 text-xs font-semibold text-slate-200 transition-[border-color,color,transform] duration-150 hover:border-slate-400 hover:text-white active:scale-[0.97]"
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4 text-[#EA580C]" aria-hidden="true" />
                    <span>Mensaje copiado al portapapeles</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4 text-slate-400" aria-hidden="true" />
                    <span>Copiar texto del mensaje</span>
                  </>
                )}
              </button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
