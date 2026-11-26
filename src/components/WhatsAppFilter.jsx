import { useEffect, useRef, useState } from 'react';
import { Building2, Check, Copy, Handshake, MapPin, X } from 'lucide-react';
import Reveal from './Reveal';
import WhatsAppIcon from './WhatsAppIcon';
import {
  BUSINESS_INFO,
  WHATSAPP_AREA_DEFAULT,
  WHATSAPP_AREA_OPTIONS,
  WHATSAPP_SECTOR_OPTIONS,
  WHATSAPP_SERVICE_OPTIONS,
  buildWhatsAppQuoteMessage,
  buildWhatsAppUrl,
} from '../data/siteData';

export default function WhatsAppFilter({
  mode,
  selectedService,
  selectedServiceDetail,
  onChangeMode,
  onSelectServiceCategory,
  onClearServiceDetail,
}) {
  const [selectedArea, setSelectedArea] = useState(WHATSAPP_AREA_DEFAULT);
  const [selectedSector, setSelectedSector] = useState(WHATSAPP_SECTOR_OPTIONS[0]);
  const [zone, setZone] = useState('');
  const [copyStatus, setCopyStatus] = useState('idle'); // 'idle' | 'copied' | 'error'
  const [ackPulse, setAckPulse] = useState(false);

  const copyTimerRef = useRef(null);
  const ackTimerRef = useRef(null);
  const hasMountedRef = useRef(false);

  const isAllianceMode = mode === 'alianza';

  const previewMessage = buildWhatsAppQuoteMessage({
    mode,
    service: selectedService,
    serviceDetail: selectedServiceDetail,
    area: selectedArea,
    sector: selectedSector,
    zone,
  });

  const whatsappHref = buildWhatsAppUrl(previewMessage);

  // Dispara pulso visual sutil sin desmontar el contenedor aria-live
  useEffect(() => {
    if (!hasMountedRef.current) {
      hasMountedRef.current = true;
      return undefined;
    }
    setAckPulse(true);
    if (ackTimerRef.current) window.clearTimeout(ackTimerRef.current);
    ackTimerRef.current = window.setTimeout(() => setAckPulse(false), 550);
    return undefined;
  }, [previewMessage]);

  useEffect(() => {
    return () => {
      if (copyTimerRef.current) window.clearTimeout(copyTimerRef.current);
      if (ackTimerRef.current) window.clearTimeout(ackTimerRef.current);
    };
  }, []);

  const handleCopyMessage = async () => {
    if (copyTimerRef.current) window.clearTimeout(copyTimerRef.current);
    try {
      if (!navigator.clipboard || typeof navigator.clipboard.writeText !== 'function') {
        throw new Error('Clipboard API unavailable');
      }
      await navigator.clipboard.writeText(previewMessage);
      setCopyStatus('copied');
    } catch {
      setCopyStatus('error');
    }
    copyTimerRef.current = window.setTimeout(() => setCopyStatus('idle'), 3000);
  };

  return (
    <section
      id="cotizador"
      className="border-b border-concrete-border bg-concrete-light py-12 sm:py-20 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <h2 className="font-display text-2xl font-extrabold tracking-[-0.03em] text-ink text-balance sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
              Armá tu Consulta por WhatsApp
            </h2>
            <p className="mt-2.5 sm:mt-4 text-sm sm:text-base leading-relaxed text-ink-muted">
              Elegí el tipo de consulta, completá los datos básicos y enviá el mensaje armado
              directo por WhatsApp. {BUSINESS_INFO.commercialHook}.
            </p>
          </div>

          {/* Selector binario claro: separa cliente final de alianza B2B */}
          <div
            role="group"
            aria-label="Tipo de consulta"
            className="grid grid-cols-2 rounded-2xl border border-concrete-border bg-concrete-mid p-1 sm:inline-grid sm:min-w-[320px]"
          >
            <button
              type="button"
              aria-pressed={!isAllianceMode}
              onClick={() => onChangeMode('obra')}
              className={`inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl px-4 text-xs sm:text-sm font-semibold transition-colors active:scale-[0.98] ${
                !isAllianceMode
                  ? 'bg-charcoal text-ink-inverse'
                  : 'text-ink hover:text-charcoal'
              }`}
            >
              <Building2 className="h-4 w-4 shrink-0 text-obra-bright" aria-hidden="true" />
              <span>Cotizar Obra</span>
            </button>

            <button
              type="button"
              aria-pressed={isAllianceMode}
              onClick={() => onChangeMode('alianza')}
              className={`inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl px-4 text-xs sm:text-sm font-semibold transition-colors active:scale-[0.98] ${
                isAllianceMode
                  ? 'bg-charcoal text-ink-inverse'
                  : 'text-ink hover:text-charcoal'
              }`}
            >
              <Handshake className="h-4 w-4 shrink-0 text-obra-bright" aria-hidden="true" />
              <span>Alianza B2B</span>
            </button>
          </div>
        </Reveal>

        <div className="mt-6 sm:mt-10 grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-12 lg:items-start lg:gap-8">
          {/* Panel configurador (izquierda) — ≤4 opciones por decisión */}
          <Reveal
            variant="scale"
            delayMs={80}
            className="rounded-2xl border border-concrete-border bg-white p-4 sm:p-8 lg:col-span-7"
          >
            {isAllianceMode ? (
              <div key="mode-alianza" className="animate-tab-panel">
                {/* Paso 1 B2B: Rubro de tu empresa (4 opciones) */}
                <fieldset>
                  <legend className="flex items-center gap-2.5 sm:gap-3 font-display text-sm font-bold text-ink sm:text-lg">
                    <span className="tabular-nums inline-flex h-6 w-6 sm:h-7 sm:w-7 shrink-0 items-center justify-center rounded-lg bg-charcoal text-xs font-extrabold text-ink-inverse">
                      1
                    </span>
                    <span>Rubro de tu empresa</span>
                  </legend>

                  <div className="mt-3 sm:mt-4 grid grid-cols-2 gap-2 sm:gap-2.5">
                    {WHATSAPP_SECTOR_OPTIONS.map((sectorOption) => {
                      const isActive = selectedSector === sectorOption;
                      return (
                        <button
                          key={sectorOption}
                          type="button"
                          aria-pressed={isActive}
                          onClick={() => setSelectedSector(sectorOption)}
                          className={`inline-flex min-h-[48px] items-center justify-between gap-2 rounded-xl border px-3 py-2 sm:px-4 text-left text-xs sm:text-sm font-semibold leading-snug transition-[background-color,border-color,color,transform] duration-150 active:scale-[0.97] ${
                            isActive
                              ? 'border-charcoal bg-charcoal text-ink-inverse'
                              : 'border-input-border bg-concrete-light text-ink hover:border-charcoal hover:bg-white'
                          }`}
                        >
                          <span>{sectorOption}</span>
                          <span
                            className={`h-2.5 w-2.5 shrink-0 rounded-full ${
                              isActive
                                ? 'bg-obra-bright'
                                : 'border border-input-border bg-transparent'
                            }`}
                            aria-hidden="true"
                          />
                        </button>
                      );
                    })}
                  </div>
                </fieldset>

                {/* Paso 2 B2B: Localidad */}
                <div className="mt-5 border-t border-concrete-mid pt-5 sm:mt-8 sm:pt-7">
                  <label
                    htmlFor="obra-zona"
                    className="flex items-center gap-2.5 sm:gap-3 font-display text-sm font-bold text-ink sm:text-lg"
                  >
                    <span className="tabular-nums inline-flex h-6 w-6 sm:h-7 sm:w-7 shrink-0 items-center justify-center rounded-lg bg-charcoal text-xs font-extrabold text-ink-inverse">
                      2
                    </span>
                    <span>Localidad / Zona de tu empresa</span>
                  </label>

                  <div className="relative mt-3 sm:mt-4">
                    <MapPin
                      className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-ink-muted"
                      aria-hidden="true"
                    />
                    <input
                      id="obra-zona"
                      type="text"
                      maxLength={100}
                      value={zone}
                      onChange={(event) => setZone(event.target.value)}
                      placeholder="Ej: Florencio Varela, Quilmes, Ezeiza, Avellaneda..."
                      autoComplete="address-level2"
                      className="min-h-[48px] w-full rounded-xl border border-input-border bg-concrete-light py-2.5 sm:py-3 pr-4 pl-10 text-sm text-ink placeholder:text-ink-muted transition-colors focus:border-obra focus:bg-white sm:text-base"
                    />
                  </div>
                  <p className="mt-1.5 text-xs text-ink-muted">
                    Red activa de corralones, hormigoneras y estudios en {BUSINESS_INFO.coverage}.
                  </p>
                </div>
              </div>
            ) : (
              <div key="mode-obra" className="animate-tab-panel">
                {/* Paso 1 Obra: ¿Qué necesitás construir? (4 opciones) */}
                <fieldset>
                  <legend className="flex items-center gap-2.5 sm:gap-3 font-display text-sm font-bold text-ink sm:text-lg">
                    <span className="tabular-nums inline-flex h-6 w-6 sm:h-7 sm:w-7 shrink-0 items-center justify-center rounded-lg bg-charcoal text-xs font-extrabold text-ink-inverse">
                      1
                    </span>
                    <span>¿Qué necesitás construir?</span>
                  </legend>

                  <div className="mt-3 sm:mt-4 grid grid-cols-2 gap-2 sm:gap-2.5">
                    {WHATSAPP_SERVICE_OPTIONS.map((option) => {
                      const isActive = selectedService === option;
                      return (
                        <button
                          key={option}
                          type="button"
                          aria-pressed={isActive}
                          onClick={() => onSelectServiceCategory(option)}
                          className={`flex min-h-[48px] items-center justify-between gap-2 rounded-xl border px-3 py-2 sm:px-4 sm:py-2.5 text-left text-xs sm:text-sm font-semibold leading-snug transition-[background-color,border-color,color,transform] duration-150 active:scale-[0.97] ${
                            isActive
                              ? 'border-charcoal bg-charcoal text-ink-inverse'
                              : 'border-input-border bg-concrete-light text-ink hover:border-charcoal hover:bg-white'
                          }`}
                        >
                          <span>{option}</span>
                          <span
                            className={`h-2.5 w-2.5 shrink-0 rounded-full ${
                              isActive
                                ? 'bg-obra-bright'
                                : 'border border-input-border bg-transparent'
                            }`}
                            aria-hidden="true"
                          />
                        </button>
                      );
                    })}
                  </div>

                  {selectedServiceDetail && (
                    <div className="mt-3 flex items-center justify-between gap-2 rounded-xl border border-concrete-border bg-concrete-mid/70 pl-3.5 pr-1.5 py-1 text-xs text-ink">
                      <span className="min-w-0 truncate" title={selectedServiceDetail}>
                        <strong className="font-semibold">Servicio:</strong> {selectedServiceDetail}
                      </span>
                      <button
                        type="button"
                        onClick={onClearServiceDetail}
                        className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-input-border bg-concrete-light text-ink transition-colors hover:border-charcoal hover:bg-white"
                        aria-label="Quitar servicio específico"
                      >
                        <X className="h-4 w-4" aria-hidden="true" />
                      </button>
                    </div>
                  )}
                </fieldset>

                {/* Paso 2 Obra: Superficie estimada (4 rangos + opción neutra "A confirmar" por defecto) */}
                <fieldset className="mt-5 border-t border-concrete-mid pt-5 sm:mt-8 sm:pt-7">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <legend className="flex items-center gap-2.5 sm:gap-3 font-display text-sm font-bold text-ink sm:text-lg">
                      <span className="tabular-nums inline-flex h-6 w-6 sm:h-7 sm:w-7 shrink-0 items-center justify-center rounded-lg bg-charcoal text-xs font-extrabold text-ink-inverse">
                        2
                      </span>
                      <span>Superficie estimada (m²)</span>
                    </legend>

                    <button
                      type="button"
                      aria-pressed={selectedArea === WHATSAPP_AREA_DEFAULT}
                      onClick={() => setSelectedArea(WHATSAPP_AREA_DEFAULT)}
                      className={`inline-flex min-h-[44px] items-center rounded-xl px-3 text-xs font-semibold transition-colors ${
                        selectedArea === WHATSAPP_AREA_DEFAULT
                          ? 'bg-charcoal text-ink-inverse'
                          : 'border border-input-border bg-concrete-light text-ink hover:border-charcoal'
                      }`}
                    >
                      No lo sé aún / A confirmar
                    </button>
                  </div>

                  <div className="mt-3 sm:mt-4 grid grid-cols-2 gap-2 sm:gap-2.5">
                    {WHATSAPP_AREA_OPTIONS.map((areaOption) => {
                      const isActive = selectedArea === areaOption;
                      return (
                        <button
                          key={areaOption}
                          type="button"
                          aria-pressed={isActive}
                          onClick={() => setSelectedArea(areaOption)}
                          className={`tabular-nums inline-flex min-h-[44px] items-center justify-center rounded-xl border px-3 py-2 sm:px-4 text-xs sm:text-sm font-semibold transition-[background-color,border-color,color,transform] duration-150 active:scale-[0.97] ${
                            isActive
                              ? 'border-obra bg-obra text-white'
                              : 'border-input-border bg-concrete-light text-ink hover:border-charcoal hover:bg-white'
                          }`}
                        >
                          {areaOption}
                        </button>
                      );
                    })}
                  </div>
                </fieldset>

                {/* Paso 3 Obra: Localidad / Zona */}
                <div className="mt-5 border-t border-concrete-mid pt-5 sm:mt-8 sm:pt-7">
                  <label
                    htmlFor="obra-zona"
                    className="flex items-center gap-2.5 sm:gap-3 font-display text-sm font-bold text-ink sm:text-lg"
                  >
                    <span className="tabular-nums inline-flex h-6 w-6 sm:h-7 sm:w-7 shrink-0 items-center justify-center rounded-lg bg-charcoal text-xs font-extrabold text-ink-inverse">
                      3
                    </span>
                    <span>Localidad / Zona de la obra</span>
                  </label>

                  <div className="relative mt-3 sm:mt-4">
                    <MapPin
                      className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-ink-muted"
                      aria-hidden="true"
                    />
                    <input
                      id="obra-zona"
                      type="text"
                      maxLength={100}
                      value={zone}
                      onChange={(event) => setZone(event.target.value)}
                      placeholder="Ej: Quilmes, Florencio Varela, Ezeiza, Avellaneda..."
                      autoComplete="address-level2"
                      className="min-h-[48px] w-full rounded-xl border border-input-border bg-concrete-light py-2.5 sm:py-3 pr-4 pl-10 text-sm text-ink placeholder:text-ink-muted transition-colors focus:border-obra focus:bg-white sm:text-base"
                    />
                  </div>
                  <p className="mt-1.5 text-xs text-ink-muted">
                    Cobertura directa en {BUSINESS_INFO.coverage}.
                  </p>
                </div>
              </div>
            )}
          </Reveal>

          {/* Vista previa en vivo y envío a WhatsApp (derecha) */}
          <Reveal
            variant="scale"
            delayMs={160}
            className="rounded-2xl border border-steel-border bg-charcoal p-4 text-ink-inverse sm:p-8 lg:sticky lg:top-[96px] lg:col-span-5"
          >
            <div className="flex items-center justify-between gap-3 border-b border-steel-border pb-3.5 sm:pb-4">
              <div>
                <h3 className="font-display text-sm sm:text-base font-bold text-ink-inverse">
                  Vista previa del mensaje
                </h3>
                <p className="tabular-nums mt-0.5 text-xs text-ink-inverse-muted">
                  Destino: WhatsApp {BUSINESS_INFO.phoneDisplay}
                </p>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-steel-border bg-graphite px-2.5 py-1 text-xs font-semibold text-ink-inverse">
                <span className="h-2 w-2 rounded-full bg-obra-bright" aria-hidden="true" />
                {isAllianceMode ? 'Alianza B2B' : 'En vivo'}
              </span>
            </div>

            {/* Contenedor persistente aria-live (nunca se desmonta al cambiar el texto) */}
            <div
              aria-live="polite"
              aria-atomic="true"
              className={`mt-4 sm:mt-5 rounded-xl border bg-graphite p-3.5 sm:p-5 transition-colors duration-300 ${
                ackPulse ? 'animate-preview-ack border-obra-bright' : 'border-steel-border'
              }`}
            >
              <p className="text-xs sm:text-sm leading-relaxed text-ink-inverse">
                {previewMessage}
              </p>
            </div>

            {/* Resumen técnico (visible en tablet/desktop) */}
            <dl className="hidden sm:block mt-5 space-y-2 border-b border-steel-border pb-5 text-xs">
              <div className="flex items-baseline justify-between gap-3">
                <dt className="text-ink-inverse-muted">
                  {isAllianceMode ? 'Modalidad' : 'Servicio'}
                </dt>
                <dd className="text-right font-medium text-ink-inverse">
                  {isAllianceMode ? 'Alianza Comercial B2B' : selectedService}
                </dd>
              </div>
              <div className="flex items-baseline justify-between gap-3">
                <dt className="text-ink-inverse-muted">
                  {isAllianceMode ? 'Rubro' : 'Superficie aprox.'}
                </dt>
                <dd className="tabular-nums text-right font-medium text-ink-inverse">
                  {isAllianceMode ? selectedSector : selectedArea}
                </dd>
              </div>
              <div className="flex items-baseline justify-between gap-3">
                <dt className="text-ink-inverse-muted">Zona</dt>
                <dd className="text-right font-medium text-ink-inverse">
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
                className="inline-flex min-h-[48px] sm:min-h-[52px] w-full items-center justify-center gap-2.5 rounded-xl bg-obra px-4 sm:px-5 py-3 text-center text-xs sm:text-base font-bold text-white transition-[background-color,transform] duration-150 hover:bg-obra-hover active:scale-[0.97]"
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
                className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-xl border border-steel-border-strong bg-graphite px-4 text-xs font-semibold text-ink-inverse transition-[border-color,background-color,transform] duration-150 hover:border-ink-inverse-muted hover:bg-steel-border active:scale-[0.97]"
              >
                {copyStatus === 'copied' ? (
                  <>
                    <Check className="h-4 w-4 text-obra-bright" aria-hidden="true" />
                    <span>Mensaje copiado al portapapeles</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4 text-ink-inverse-muted" aria-hidden="true" />
                    <span>Copiar texto del mensaje</span>
                  </>
                )}
              </button>

              <p role="status" aria-live="polite" className="min-h-[16px] text-center text-xs text-ink-inverse-muted">
                {copyStatus === 'error'
                  ? 'No se pudo copiar automáticamente. Seleccioná el texto arriba para copiarlo.'
                  : copyStatus === 'copied'
                    ? 'Listo para pegar en WhatsApp o correo.'
                    : ''}
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
