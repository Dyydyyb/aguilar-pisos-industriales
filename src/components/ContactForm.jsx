import { useEffect, useRef, useState } from 'react';
import {
  Check,
  CheckCircle2,
  ClipboardCheck,
  Copy,
  Instagram,
  MapPin,
  Pencil,
  Phone,
  Send,
} from 'lucide-react';
import Reveal from './Reveal';
import WhatsAppIcon from './WhatsAppIcon';
import {
  BUSINESS_INFO,
  FORM_SERVICE_GROUPS,
  buildWhatsAppUrl,
} from '../data/siteData';

const INITIAL_FORM_STATE = {
  nombre: '',
  telefono: '',
  email: '',
  servicio: '',
  detalle: '',
};

const MAX_LENGTHS = {
  nombre: 100,
  telefono: 24,
  email: 120,
  detalle: 500,
};

function validateForm(values) {
  const errors = {};

  if (!values.nombre.trim() || values.nombre.trim().length < 2) {
    errors.nombre = 'Ingresá tu nombre o razón social (mínimo 2 caracteres).';
  }

  const rawPhone = values.telefono.trim();
  const phoneDigits = rawPhone.replace(/\D/g, '');
  const hasInvalidChars = /[^\d\s()+-]/.test(rawPhone);
  const isRepeatedDummy = phoneDigits.length >= 8 && /^(\d)\1+$/.test(phoneDigits);
  if (hasInvalidChars || phoneDigits.length < 8 || phoneDigits.length > 15 || isRepeatedDummy) {
    errors.telefono = 'Ingresá un teléfono o WhatsApp real con código de área (ej: 11 5889-0608).';
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(values.email.trim())) {
    errors.email = 'Ingresá un correo electrónico válido (ej: nombre@empresa.com).';
  }

  if (!values.servicio) {
    errors.servicio = 'Seleccioná el servicio requerido para orientar el presupuesto.';
  }

  if (!values.detalle.trim() || values.detalle.trim().length < 12) {
    errors.detalle =
      'Indicá brevemente tipo de obra, m² aproximados o localidad (mínimo 12 caracteres).';
  }

  return errors;
}

export default function ContactForm() {
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [preparedData, setPreparedData] = useState(null);
  const [copyStatus, setCopyStatus] = useState('idle'); // 'idle' | 'copied' | 'error'

  const summaryHeadingRef = useRef(null);
  const copyTimerRef = useRef(null);

  useEffect(() => {
    if (preparedData && summaryHeadingRef.current) {
      summaryHeadingRef.current.focus();
    }
  }, [preparedData]);

  useEffect(() => {
    return () => {
      if (copyTimerRef.current) window.clearTimeout(copyTimerRef.current);
    };
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    const nextData = { ...formData, [name]: value };
    setFormData(nextData);

    if (touched[name]) {
      const nextErrors = validateForm(nextData);
      setErrors((prev) => ({ ...prev, [name]: nextErrors[name] }));
    }
  };

  const handleBlur = (event) => {
    const { name } = event.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const nextErrors = validateForm(formData);
    setErrors((prev) => ({ ...prev, [name]: nextErrors[name] }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = validateForm(formData);
    setErrors(validationErrors);
    setTouched({
      nombre: true,
      telefono: true,
      email: true,
      servicio: true,
      detalle: true,
    });

    if (Object.keys(validationErrors).length > 0) {
      const firstInvalidKey = Object.keys(validationErrors)[0];
      const firstInvalidElement = document.getElementById(`contact-${firstInvalidKey}`);
      if (firstInvalidElement) {
        firstInvalidElement.focus();
      }
      return;
    }

    setCopyStatus('idle');
    setPreparedData({
      nombre: formData.nombre.trim(),
      telefono: formData.telefono.trim(),
      email: formData.email.trim(),
      servicio: formData.servicio,
      detalle: formData.detalle.trim(),
    });
  };

  const handleEditData = () => {
    setPreparedData(null);
    setCopyStatus('idle');
  };

  const handleReset = () => {
    setFormData(INITIAL_FORM_STATE);
    setErrors({});
    setTouched({});
    setPreparedData(null);
    setCopyStatus('idle');
  };

  const formattedInquiryText = preparedData
    ? `Hola Aguilar Pisos Industriales, solicito cotización formal sin cargo.\n• Nombre/Empresa: ${preparedData.nombre}\n• Teléfono: ${preparedData.telefono}\n• Email: ${preparedData.email}\n• Servicio: ${preparedData.servicio}\n• Detalle de obra: ${preparedData.detalle}`
    : '';

  const whatsappDirectHref = preparedData ? buildWhatsAppUrl(formattedInquiryText) : '#';

  const handleCopySummary = async () => {
    if (copyTimerRef.current) window.clearTimeout(copyTimerRef.current);
    try {
      if (!navigator.clipboard || typeof navigator.clipboard.writeText !== 'function') {
        throw new Error('Clipboard API unavailable');
      }
      await navigator.clipboard.writeText(formattedInquiryText);
      setCopyStatus('copied');
    } catch {
      setCopyStatus('error');
    }
    copyTimerRef.current = window.setTimeout(() => setCopyStatus('idle'), 3000);
  };

  const inputBaseClass =
    'min-h-[48px] w-full rounded-xl border bg-concrete-light px-3.5 py-2.5 text-sm text-ink placeholder:text-ink-muted transition-colors focus:bg-white sm:text-[15px]';

  return (
    <section
      id="contacto"
      className="border-b border-concrete-border bg-concrete-mid py-12 sm:py-20 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 sm:gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Información técnica y contacto directo visible de un vistazo en móvil y desktop */}
          <Reveal className="flex flex-col justify-between lg:col-span-5">
            <div>
              <h2 className="font-display text-2xl font-extrabold tracking-[-0.03em] text-ink text-balance sm:text-4xl">
                Solicitud Formal de Cotización
              </h2>
              <p className="mt-2.5 sm:mt-4 text-sm sm:text-base leading-relaxed text-ink-muted">
                Completá la ficha técnica de tu proyecto y enviá tu solicitud completa directo por
                WhatsApp sin perder ningún detalle.
              </p>

              {/* Lista compacta visible completa en móvil y desktop (sin tarjetas escondidas) */}
              <div className="mt-5 sm:mt-8 overflow-hidden rounded-2xl border border-concrete-border bg-white divide-y divide-concrete-mid">
                <a
                  href={BUSINESS_INFO.phoneHref}
                  className="flex min-h-[60px] items-center gap-3.5 px-4 py-3 transition-colors hover:bg-concrete-light lg:min-h-[68px] lg:gap-4 lg:px-5 lg:py-4"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-concrete-border bg-concrete-mid text-ink">
                    <Phone className="h-4 w-4 text-obra" aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-ink-muted">
                      Teléfono / WhatsApp
                    </p>
                    <p className="tabular-nums mt-0.5 text-sm lg:text-base font-semibold text-ink">
                      {BUSINESS_INFO.phoneDisplay}
                    </p>
                  </div>
                </a>

                <div className="flex min-h-[60px] items-center gap-3.5 px-4 py-3 lg:min-h-[68px] lg:gap-4 lg:px-5 lg:py-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-concrete-border bg-concrete-mid text-ink">
                    <MapPin className="h-4 w-4 text-obra" aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-ink-muted">
                      Cobertura de obra
                    </p>
                    <p className="mt-0.5 text-sm lg:text-base font-semibold text-ink">
                      {BUSINESS_INFO.coverage}
                    </p>
                  </div>
                </div>

                <a
                  href={BUSINESS_INFO.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-[60px] items-center gap-3.5 px-4 py-3 transition-colors hover:bg-concrete-light lg:min-h-[68px] lg:gap-4 lg:px-5 lg:py-4"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-concrete-border bg-concrete-mid text-ink">
                    <Instagram className="h-4 w-4 text-obra" aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-ink-muted">
                      Obras en Instagram
                    </p>
                    <p className="mt-0.5 truncate text-sm lg:text-base font-semibold text-ink">
                      {BUSINESS_INFO.instagramHandle}
                    </p>
                  </div>
                </a>
              </div>
            </div>

            {/* Respaldo técnico visible en TODOS los dispositivos */}
            <div className="mt-4 sm:mt-6 rounded-2xl border border-steel-border bg-charcoal p-4 sm:p-5 text-ink-inverse">
              <div className="flex items-start gap-3.5">
                <ClipboardCheck
                  className="mt-0.5 h-5 w-5 shrink-0 text-obra-bright"
                  aria-hidden="true"
                />
                <div>
                  <p className="font-display text-sm font-bold text-ink-inverse">
                    Cotizaciones y visitas técnicas sin cargo • {BUSINESS_INFO.responseSla}
                  </p>
                  <p className="mt-1.5 text-xs leading-relaxed text-ink-inverse-muted">
                    Evaluamos estado del terreno, cargas previstas, tipo de hormigón y terminación
                    bajo {BUSINESS_INFO.technicalDirection}.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Ficha formal / Confirmación transparente para envío real por WhatsApp (derecha) */}
          <Reveal
            variant="scale"
            delayMs={100}
            className="rounded-2xl border border-concrete-border bg-white p-5 sm:p-8 lg:col-span-7"
          >
            {preparedData ? (
              <div className="animate-tab-panel flex flex-col py-2 sm:py-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-concrete-border bg-concrete-mid text-obra">
                  <CheckCircle2 className="h-6 w-6" aria-hidden="true" />
                </span>

                <h3
                  ref={summaryHeadingRef}
                  tabIndex={-1}
                  className="mt-4 sm:mt-5 font-display text-xl sm:text-2xl font-extrabold tracking-[-0.02em] text-ink focus:outline-none"
                >
                  Ficha técnica lista para enviar
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted sm:text-base">
                  Tus datos ya están validados y ordenados. Presioná el botón naranja para abrir
                  WhatsApp y despachar tu solicitud al{' '}
                  <strong className="tabular-nums font-semibold text-ink">
                    {BUSINESS_INFO.phoneDisplay}
                  </strong>
                  .
                </p>

                <dl className="mt-5 space-y-2.5 rounded-xl border border-concrete-border bg-concrete-light p-4 text-sm">
                  <div className="flex flex-wrap justify-between gap-2">
                    <dt className="text-ink-muted">Nombre / Empresa:</dt>
                    <dd className="font-semibold text-ink">{preparedData.nombre}</dd>
                  </div>
                  <div className="flex flex-wrap justify-between gap-2">
                    <dt className="text-ink-muted">Teléfono:</dt>
                    <dd className="tabular-nums font-semibold text-ink">{preparedData.telefono}</dd>
                  </div>
                  <div className="flex flex-wrap justify-between gap-2">
                    <dt className="text-ink-muted">Email:</dt>
                    <dd className="font-semibold text-ink">{preparedData.email}</dd>
                  </div>
                  <div className="flex flex-wrap justify-between gap-2">
                    <dt className="text-ink-muted">Servicio:</dt>
                    <dd className="font-semibold text-ink">{preparedData.servicio}</dd>
                  </div>
                  <div className="border-t border-concrete-border pt-2.5">
                    <dt className="text-xs font-medium text-ink-muted">Detalle de la obra:</dt>
                    <dd className="mt-1 whitespace-pre-line text-sm text-ink">
                      {preparedData.detalle}
                    </dd>
                  </div>
                </dl>

                <div className="mt-6 flex flex-col gap-2.5">
                  <a
                    href={whatsappDirectHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[52px] w-full items-center justify-center gap-2.5 rounded-xl bg-obra px-5 text-sm sm:text-base font-bold text-white transition-[background-color,transform] hover:bg-obra-hover active:scale-[0.97]"
                  >
                    <WhatsAppIcon className="h-5 w-5 shrink-0" />
                    <span>Enviar Solicitud por WhatsApp Ahora</span>
                  </a>

                  <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                    <button
                      type="button"
                      onClick={handleCopySummary}
                      className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl border border-input-border bg-concrete-light px-4 text-xs sm:text-sm font-semibold text-ink transition-colors hover:border-charcoal hover:bg-white active:scale-[0.97]"
                    >
                      {copyStatus === 'copied' ? (
                        <>
                          <Check className="h-4 w-4 text-obra" aria-hidden="true" />
                          <span>Ficha copiada</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-4 w-4 text-ink-muted" aria-hidden="true" />
                          <span>Copiar ficha completa</span>
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={handleEditData}
                      className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl border border-input-border bg-concrete-light px-4 text-xs sm:text-sm font-semibold text-ink transition-colors hover:border-charcoal hover:bg-white active:scale-[0.97]"
                    >
                      <Pencil className="h-4 w-4 text-ink-muted" aria-hidden="true" />
                      <span>Editar datos</span>
                    </button>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <p role="status" aria-live="polite" className="text-xs text-ink-muted">
                      {copyStatus === 'error'
                        ? 'No se pudo copiar automáticamente; podés enviarla directo por WhatsApp.'
                        : copyStatus === 'copied'
                          ? 'Texto copiado al portapapeles.'
                          : ''}
                    </p>
                    <button
                      type="button"
                      onClick={handleReset}
                      className="inline-flex min-h-[44px] items-center px-2 text-xs font-semibold text-ink-muted underline-offset-4 hover:text-ink hover:underline"
                    >
                      Limpiar formulario
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-4 sm:space-y-5">
                <p className="text-xs font-medium text-ink-muted">
                  Los campos marcados con <span className="font-bold text-obra">*</span> son
                  obligatorios.
                </p>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
                  <div>
                    <label
                      htmlFor="contact-nombre"
                      className="block text-xs font-semibold uppercase tracking-[0.06em] text-ink"
                    >
                      Nombre / Empresa{' '}
                      <span className="text-obra" aria-hidden="true">
                        *
                      </span>
                    </label>
                    <input
                      id="contact-nombre"
                      name="nombre"
                      type="text"
                      required
                      maxLength={MAX_LENGTHS.nombre}
                      autoComplete="name"
                      value={formData.nombre}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Ej: Arq. Martín Gómez / Logística Sur"
                      aria-invalid={Boolean(errors.nombre)}
                      aria-describedby={errors.nombre ? 'error-nombre' : undefined}
                      className={`mt-1.5 sm:mt-2 ${inputBaseClass} ${
                        errors.nombre
                          ? 'border-red-700 focus:border-red-700'
                          : 'border-input-border focus:border-obra'
                      }`}
                    />
                    {errors.nombre && (
                      <p
                        id="error-nombre"
                        role="alert"
                        className="mt-1.5 text-xs font-medium text-red-700"
                      >
                        {errors.nombre}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="contact-telefono"
                      className="block text-xs font-semibold uppercase tracking-[0.06em] text-ink"
                    >
                      Teléfono{' '}
                      <span className="text-obra" aria-hidden="true">
                        *
                      </span>
                    </label>
                    <input
                      id="contact-telefono"
                      name="telefono"
                      type="tel"
                      required
                      maxLength={MAX_LENGTHS.telefono}
                      autoComplete="tel"
                      value={formData.telefono}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Ej: 11 5555-1234"
                      aria-invalid={Boolean(errors.telefono)}
                      aria-describedby={errors.telefono ? 'error-telefono' : undefined}
                      className={`mt-1.5 sm:mt-2 ${inputBaseClass} ${
                        errors.telefono
                          ? 'border-red-700 focus:border-red-700'
                          : 'border-input-border focus:border-obra'
                      }`}
                    />
                    {errors.telefono && (
                      <p
                        id="error-telefono"
                        role="alert"
                        className="mt-1.5 text-xs font-medium text-red-700"
                      >
                        {errors.telefono}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-xs font-semibold uppercase tracking-[0.06em] text-ink"
                    >
                      Email{' '}
                      <span className="text-obra" aria-hidden="true">
                        *
                      </span>
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      required
                      maxLength={MAX_LENGTHS.email}
                      autoComplete="email"
                      value={formData.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="correo@empresa.com"
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={errors.email ? 'error-email' : undefined}
                      className={`mt-1.5 sm:mt-2 ${inputBaseClass} ${
                        errors.email
                          ? 'border-red-700 focus:border-red-700'
                          : 'border-input-border focus:border-obra'
                      }`}
                    />
                    {errors.email && (
                      <p
                        id="error-email"
                        role="alert"
                        className="mt-1.5 text-xs font-medium text-red-700"
                      >
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="contact-servicio"
                      className="block text-xs font-semibold uppercase tracking-[0.06em] text-ink"
                    >
                      Servicio requerido{' '}
                      <span className="text-obra" aria-hidden="true">
                        *
                      </span>
                    </label>
                    <select
                      id="contact-servicio"
                      name="servicio"
                      required
                      value={formData.servicio}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      aria-invalid={Boolean(errors.servicio)}
                      aria-describedby={errors.servicio ? 'error-servicio' : undefined}
                      className={`mt-1.5 sm:mt-2 ${inputBaseClass} ${
                        errors.servicio
                          ? 'border-red-700 focus:border-red-700'
                          : 'border-input-border focus:border-obra'
                      }`}
                    >
                      <option value="">Seleccioná una opción...</option>
                      {FORM_SERVICE_GROUPS.map((group) => (
                        <optgroup key={group.label} label={group.label}>
                          {group.options.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </optgroup>
                      ))}
                    </select>
                    {errors.servicio && (
                      <p
                        id="error-servicio"
                        role="alert"
                        className="mt-1.5 text-xs font-medium text-red-700"
                      >
                        {errors.servicio}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <div className="flex items-baseline justify-between gap-2">
                    <label
                      htmlFor="contact-detalle"
                      className="block text-xs font-semibold uppercase tracking-[0.06em] text-ink"
                    >
                      Detalle de la obra{' '}
                      <span className="text-obra" aria-hidden="true">
                        *
                      </span>
                    </label>
                    <span className="tabular-nums text-xs text-ink-muted">
                      {formData.detalle.length}/{MAX_LENGTHS.detalle}
                    </span>
                  </div>
                  <textarea
                    id="contact-detalle"
                    name="detalle"
                    rows={3}
                    required
                    maxLength={MAX_LENGTHS.detalle}
                    value={formData.detalle}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Contanos ubicación, m² estimados, uso previsto del piso o etapa de obra..."
                    aria-invalid={Boolean(errors.detalle)}
                    aria-describedby={errors.detalle ? 'error-detalle' : undefined}
                    className={`mt-1.5 sm:mt-2 w-full rounded-xl border bg-concrete-light px-3.5 py-2.5 text-sm text-ink placeholder:text-ink-muted transition-colors focus:bg-white sm:text-[15px] ${
                      errors.detalle
                        ? 'border-red-700 focus:border-red-700'
                        : 'border-input-border focus:border-obra'
                    }`}
                  />
                  {errors.detalle && (
                    <p
                      id="error-detalle"
                      role="alert"
                      className="mt-1.5 text-xs font-medium text-red-700"
                    >
                      {errors.detalle}
                    </p>
                  )}
                </div>

                <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-xs text-ink-muted">
                    Armamos tu ficha y la enviás directo por WhatsApp sin cargo.
                  </p>

                  <button
                    type="submit"
                    className="inline-flex min-h-[48px] sm:min-h-[50px] items-center justify-center gap-2.5 rounded-xl bg-charcoal px-7 text-sm font-semibold text-ink-inverse transition-[background-color,transform] duration-150 hover:bg-obra active:scale-[0.97]"
                  >
                    <Send className="h-4 w-4" aria-hidden="true" />
                    <span>Preparar Solicitud Formal</span>
                  </button>
                </div>
              </form>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
