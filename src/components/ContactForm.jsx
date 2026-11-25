import { useState } from 'react';
import {
  CheckCircle2,
  ClipboardCheck,
  Instagram,
  Loader2,
  MapPin,
  Phone,
  Send,
} from 'lucide-react';
import Reveal from './Reveal';
import WhatsAppIcon from './WhatsAppIcon';
import {
  BUSINESS_INFO,
  FORM_SERVICE_OPTIONS,
  buildWhatsAppUrl,
} from '../data/siteData';

const INITIAL_FORM_STATE = {
  nombre: '',
  telefono: '',
  email: '',
  servicio: '',
  detalle: '',
};

function validateForm(values) {
  const errors = {};

  if (!values.nombre.trim() || values.nombre.trim().length < 2) {
    errors.nombre = 'Ingresá tu nombre o razón social (mínimo 2 caracteres).';
  }

  const phoneDigits = values.telefono.replace(/\D/g, '');
  if (phoneDigits.length < 8) {
    errors.telefono = 'Ingresá un teléfono o WhatsApp válido con código de área.';
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(values.email.trim())) {
    errors.email = 'Ingresá un correo electrónico válido (ej: nombre@empresa.com).';
  }

  if (!values.servicio) {
    errors.servicio = 'Seleccioná el servicio requerido para orientar el presupuesto.';
  }

  if (!values.detalle.trim() || values.detalle.trim().length < 12) {
    errors.detalle = 'Indicá brevemente tipo de obra, m² aproximados o localidad (mínimo 12 caracteres).';
  }

  return errors;
}

export default function ContactForm() {
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);

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

    setIsSubmitting(true);
    window.setTimeout(() => {
      setIsSubmitting(false);
      setSubmittedData({ ...formData });
    }, 850);
  };

  const handleReset = () => {
    setFormData(INITIAL_FORM_STATE);
    setErrors({});
    setTouched({});
    setSubmittedData(null);
  };

  const whatsappCopyHref = submittedData
    ? buildWhatsAppUrl(
        `Hola Aguilar Pisos Industriales, acabo de completar el formulario de cotización web. • Nombre/Empresa: ${submittedData.nombre} • Teléfono: ${submittedData.telefono} • Email: ${submittedData.email} • Servicio: ${submittedData.servicio} • Detalle: ${submittedData.detalle}`
      )
    : '#';

  const inputBaseClass =
    'min-h-[48px] w-full border bg-[#F8FAFC] px-3.5 py-2.5 text-sm text-[#0F172A] placeholder:text-slate-500 transition-colors focus:bg-white focus:outline-none disabled:opacity-60 sm:text-[15px]';

  return (
    <section
      id="contacto"
      className="border-b border-[#CBD5E1] bg-[#F8FAFC] py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Información técnica y contacto directo (izquierda) */}
          <Reveal className="flex flex-col justify-between lg:col-span-5">
            <div>
              <h2 className="font-display text-3xl font-extrabold tracking-[-0.03em] text-[#0F172A] text-balance sm:text-4xl">
                Solicitud Formal de Cotización
              </h2>
              <p className="mt-4 text-base leading-relaxed text-slate-600">
                Canal escrito para empresas, estudios de arquitectura, constructoras o clientes que
                prefieren dejar las especificaciones técnicas de su obra.
              </p>

              <div className="mt-8 divide-y divide-[#CBD5E1] border-y border-[#CBD5E1]">
                <a
                  href={BUSINESS_INFO.phoneHref}
                  className="flex min-h-[64px] items-center gap-4 py-4 transition-colors hover:bg-[#E2E8F0]/50"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center border border-[#CBD5E1] bg-[#E2E8F0] text-[#0F172A]">
                    <Phone className="h-4 w-4 text-[#EA580C]" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-xs font-medium uppercase tracking-[0.08em] text-slate-500">
                      Teléfono / WhatsApp
                    </p>
                    <p className="tabular-nums mt-0.5 text-base font-semibold text-[#0F172A]">
                      {BUSINESS_INFO.phoneDisplay}
                    </p>
                  </div>
                </a>

                <div className="flex min-h-[64px] items-center gap-4 py-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center border border-[#CBD5E1] bg-[#E2E8F0] text-[#0F172A]">
                    <MapPin className="h-4 w-4 text-[#EA580C]" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-xs font-medium uppercase tracking-[0.08em] text-slate-500">
                      Cobertura de obra
                    </p>
                    <p className="mt-0.5 text-base font-semibold text-[#0F172A]">
                      {BUSINESS_INFO.coverage}
                    </p>
                  </div>
                </div>

                <a
                  href={BUSINESS_INFO.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-[64px] items-center gap-4 py-4 transition-colors hover:bg-[#E2E8F0]/50"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center border border-[#CBD5E1] bg-[#E2E8F0] text-[#0F172A]">
                    <Instagram className="h-4 w-4 text-[#EA580C]" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-xs font-medium uppercase tracking-[0.08em] text-slate-500">
                      Seguimiento de obras en Instagram
                    </p>
                    <p className="mt-0.5 text-base font-semibold text-[#0F172A]">
                      {BUSINESS_INFO.instagramHandle}
                    </p>
                  </div>
                </a>
              </div>
            </div>

            <div className="mt-8 border border-[#334155] bg-[#0F172A] p-5 text-[#F8FAFC]">
              <div className="flex items-start gap-3.5">
                <ClipboardCheck
                  className="mt-0.5 h-5 w-5 shrink-0 text-[#EA580C]"
                  aria-hidden="true"
                />
                <div>
                  <p className="font-display text-sm font-bold text-[#F8FAFC]">
                    Cotizaciones y visitas técnicas sin cargo
                  </p>
                  <p className="mt-1.5 text-xs leading-relaxed text-slate-300">
                    Evaluamos estado del terreno, cargas previstas, tipo de hormigón y terminación
                    superficial para entregarte un presupuesto claro y cerrado.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Formulario formal / Pantalla de éxito (derecha) */}
          <Reveal
            delayMs={100}
            className="border border-[#CBD5E1] bg-white p-6 sm:p-8 lg:col-span-7"
          >
            {submittedData ? (
              <div className="flex flex-col py-4" role="status" aria-live="polite">
                <span className="flex h-12 w-12 items-center justify-center border border-[#CBD5E1] bg-[#E2E8F0] text-[#EA580C]">
                  <CheckCircle2 className="h-6 w-6" aria-hidden="true" />
                </span>

                <h3 className="mt-5 font-display text-2xl font-extrabold tracking-[-0.02em] text-[#0F172A]">
                  Solicitud técnica registrada
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-base">
                  Recibimos los datos de tu consulta para{' '}
                  <strong className="font-semibold text-[#0F172A]">
                    {submittedData.servicio}
                  </strong>
                  . Nos pondremos en contacto a la brevedad para coordinar el relevamiento sin
                  cargo.
                </p>

                <dl className="mt-6 space-y-2 border border-[#CBD5E1] bg-[#F8FAFC] p-4 text-sm">
                  <div className="flex flex-wrap justify-between gap-2">
                    <dt className="text-slate-500">Nombre / Empresa:</dt>
                    <dd className="font-semibold text-[#0F172A]">{submittedData.nombre}</dd>
                  </div>
                  <div className="flex flex-wrap justify-between gap-2">
                    <dt className="text-slate-500">Teléfono:</dt>
                    <dd className="tabular-nums font-semibold text-[#0F172A]">
                      {submittedData.telefono}
                    </dd>
                  </div>
                  <div className="flex flex-wrap justify-between gap-2">
                    <dt className="text-slate-500">Email:</dt>
                    <dd className="font-semibold text-[#0F172A]">{submittedData.email}</dd>
                  </div>
                </dl>

                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                  <a
                    href={whatsappCopyHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[48px] flex-1 items-center justify-center gap-2 bg-[#EA580C] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#C2410C] active:scale-[0.98]"
                  >
                    <WhatsAppIcon className="h-4 w-4 shrink-0" />
                    <span>Enviar copia rápida por WhatsApp</span>
                  </a>

                  <button
                    type="button"
                    onClick={handleReset}
                    className="inline-flex min-h-[48px] items-center justify-center border border-[#CBD5E1] bg-[#F8FAFC] px-5 text-sm font-semibold text-[#0F172A] transition-colors hover:border-[#0F172A] active:scale-[0.98]"
                  >
                    Nueva consulta
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  {/* Nombre / Empresa */}
                  <div>
                    <label
                      htmlFor="contact-nombre"
                      className="block text-xs font-semibold uppercase tracking-[0.06em] text-[#0F172A]"
                    >
                      Nombre / Empresa <span className="text-[#EA580C]">*</span>
                    </label>
                    <input
                      id="contact-nombre"
                      name="nombre"
                      type="text"
                      required
                      disabled={isSubmitting}
                      value={formData.nombre}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Ej: Arq. Martín Gómez / Logística Sur"
                      aria-invalid={Boolean(errors.nombre)}
                      aria-describedby={errors.nombre ? 'error-nombre' : undefined}
                      className={`mt-2 ${inputBaseClass} ${
                        errors.nombre
                          ? 'border-red-600 focus:border-red-600'
                          : 'border-[#CBD5E1] focus:border-[#EA580C]'
                      }`}
                    />
                    {errors.nombre && (
                      <p id="error-nombre" role="alert" className="mt-1.5 text-xs font-medium text-red-700">
                        {errors.nombre}
                      </p>
                    )}
                  </div>

                  {/* Teléfono */}
                  <div>
                    <label
                      htmlFor="contact-telefono"
                      className="block text-xs font-semibold uppercase tracking-[0.06em] text-[#0F172A]"
                    >
                      Teléfono <span className="text-[#EA580C]">*</span>
                    </label>
                    <input
                      id="contact-telefono"
                      name="telefono"
                      type="tel"
                      required
                      disabled={isSubmitting}
                      value={formData.telefono}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Ej: 11 5555-1234"
                      aria-invalid={Boolean(errors.telefono)}
                      aria-describedby={errors.telefono ? 'error-telefono' : undefined}
                      className={`mt-2 ${inputBaseClass} ${
                        errors.telefono
                          ? 'border-red-600 focus:border-red-600'
                          : 'border-[#CBD5E1] focus:border-[#EA580C]'
                      }`}
                    />
                    {errors.telefono && (
                      <p id="error-telefono" role="alert" className="mt-1.5 text-xs font-medium text-red-700">
                        {errors.telefono}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  {/* Email */}
                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-xs font-semibold uppercase tracking-[0.06em] text-[#0F172A]"
                    >
                      Email <span className="text-[#EA580C]">*</span>
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      required
                      disabled={isSubmitting}
                      value={formData.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="correo@empresa.com"
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={errors.email ? 'error-email' : undefined}
                      className={`mt-2 ${inputBaseClass} ${
                        errors.email
                          ? 'border-red-600 focus:border-red-600'
                          : 'border-[#CBD5E1] focus:border-[#EA580C]'
                      }`}
                    />
                    {errors.email && (
                      <p id="error-email" role="alert" className="mt-1.5 text-xs font-medium text-red-700">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Servicio requerido */}
                  <div>
                    <label
                      htmlFor="contact-servicio"
                      className="block text-xs font-semibold uppercase tracking-[0.06em] text-[#0F172A]"
                    >
                      Servicio requerido <span className="text-[#EA580C]">*</span>
                    </label>
                    <select
                      id="contact-servicio"
                      name="servicio"
                      required
                      disabled={isSubmitting}
                      value={formData.servicio}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      aria-invalid={Boolean(errors.servicio)}
                      aria-describedby={errors.servicio ? 'error-servicio' : undefined}
                      className={`mt-2 ${inputBaseClass} ${
                        errors.servicio
                          ? 'border-red-600 focus:border-red-600'
                          : 'border-[#CBD5E1] focus:border-[#EA580C]'
                      }`}
                    >
                      <option value="">Seleccioná una opción...</option>
                      {FORM_SERVICE_OPTIONS.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                    {errors.servicio && (
                      <p id="error-servicio" role="alert" className="mt-1.5 text-xs font-medium text-red-700">
                        {errors.servicio}
                      </p>
                    )}
                  </div>
                </div>

                {/* Detalle de la obra */}
                <div>
                  <label
                    htmlFor="contact-detalle"
                    className="block text-xs font-semibold uppercase tracking-[0.06em] text-[#0F172A]"
                  >
                    Detalle de la obra <span className="text-[#EA580C]">*</span>
                  </label>
                  <textarea
                    id="contact-detalle"
                    name="detalle"
                    rows={4}
                    required
                    disabled={isSubmitting}
                    value={formData.detalle}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Contanos ubicación, m² estimados, uso previsto del piso o etapa de obra..."
                    aria-invalid={Boolean(errors.detalle)}
                    aria-describedby={errors.detalle ? 'error-detalle' : undefined}
                    className={`mt-2 w-full border bg-[#F8FAFC] px-3.5 py-3 text-sm text-[#0F172A] placeholder:text-slate-500 transition-colors focus:bg-white focus:outline-none disabled:opacity-60 sm:text-[15px] ${
                      errors.detalle
                        ? 'border-red-600 focus:border-red-600'
                        : 'border-[#CBD5E1] focus:border-[#EA580C]'
                    }`}
                  />
                  {errors.detalle && (
                    <p id="error-detalle" role="alert" className="mt-1.5 text-xs font-medium text-red-700">
                      {errors.detalle}
                    </p>
                  )}
                </div>

                <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-xs text-slate-600">
                    Presupuesto y asesoramiento técnico sin cargo.
                  </p>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex min-h-[50px] items-center justify-center gap-2.5 bg-[#0F172A] px-7 text-sm font-semibold text-[#F8FAFC] transition-colors duration-150 hover:bg-[#EA580C] disabled:cursor-not-allowed disabled:opacity-70 active:scale-[0.98]"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                        <span>Enviando solicitud...</span>
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" aria-hidden="true" />
                        <span>Solicitar Cotización Sin Cargo</span>
                      </>
                    )}
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
