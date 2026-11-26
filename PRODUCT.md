# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

1. **Cliente final industrial, comercial o civil (primario):** Dueños de galpones, depósitos, naves logísticas, fábricas, talleres o particulares en Florencio Varela, Buenos Aires Zona Sur y AMBA que necesitan presupuestar y ejecutar pisos industriales de alta resistencia, hormigón llaneado mecánico, entradas/playones vehiculares, plateas o construcción integral sin intermediarios.
2. **Aliados comerciales B2B (secundario):** Corralones de materiales, plantas de hormigón elaborado, constructoras y estudios de arquitectura en Zona Sur que buscan un equipo de colocación confiable bajo Dirección Técnica de Maestro Mayor de Obras para recomendar sin riesgo de reclamos y generar derivación mutua de obras y materiales.

## Product Purpose

Convertir visitas —principalmente desde teléfonos móviles— en consultas calificadas por **WhatsApp (`+54 9 11 5889-0608`)** ofreciendo presupuestos y visitas técnicas **100% sin cargo**, reduciendo la fricción para describir tipo de obra, superficie aproximada o rubro B2B, y localidad. Un formulario escrito formal funciona como canal secundario para empresas y estudios con respaldo de envío rápido por WhatsApp hasta definir un backend de correo.

## Positioning

Ejecución propia con maquinaria especializada (allanadoras simples y dobles tripuladas) combinada con Dirección Técnica de **Maestro Mayor de Obras** e historial verificable en obra pública y privada en Florencio Varela y Zona Sur (incluyendo la Plaza Principal San Juan Bautista), articulando pisos industriales + arquitectura y construcción integral bajo una sola conducción.

## Operating Context

- **Zona de cobertura:** Buenos Aires, Zona Sur (Florencio Varela, Quilmes, Ezeiza, Avellaneda, AMBA y alrededores).
- **Escenario real de consulta:** Propietarios, encargados de obra y corralones que navegan desde el teléfono en obra o desde oficina, comparan trabajos reales y priorizan contacto directo inmediato por WhatsApp.
- **Canales reales activos:** WhatsApp y teléfono `+54 9 11 5889-0608` (`https://wa.me/5491158890608`), Instagram `@aguilar.pisos.industriales`.

## Capabilities and Constraints

- **Capacidades confirmadas:** Dos divisiones técnicas (Pisos Industriales + Arquitectura y Construcción), galería de obras reales con vista completa, propuesta B2B para corralones/hormigoneras/estudios, configurador dinámico de mensajes de WhatsApp (modo obra y modo alianza B2B) y formulario formal con validación cliente + copia a WhatsApp.
- **Restricciones técnicas y de deploy:** SPA estática en Vite + React + Tailwind CSS desplegada en Vercel desde el repositorio `Dyydyyb/aguilar-pisos-industriales`.
- **Decisiones abiertas explícitas:** El formulario formal (`ContactForm`) opera hoy con confirmación en cliente y derivación opcional a WhatsApp; la conexión a un backend de correo (ej. Formspree / Resend / API propia) queda abierta para una etapa posterior.

## Brand Commitments

- **Nombre oficial:** Aguilar Pisos Industriales.
- **Gancho comercial irrenunciable:** Cotizaciones, consultas y visitas técnicas 100% sin cargo.
- **Respaldo técnico:** Ejecución con maquinaria propia y Dirección Técnica de Maestro Mayor de Obras.
- **Identidad confirmada:** Logo circular oficial (`public/images/logo-aguilar.png`) y estética industrial sobria, técnica y 100% mate (sin efectos neón, glow ni recursos artificiosos).
- **Voz:** Español rioplatense profesional y directo (*voseo* natural: "armá tu consulta", "cotizá", "enviá"), concreto y orientado a obra real.

## Evidence on Hand

- `public/images/logo-aguilar.png` — Logo oficial de Aguilar Pisos Industriales.
- `public/images/obra-plaza-san-juan-bautista.webp` — Obra principal destacada: Hormigón peinado y sector llaneado con pigmento azul en Plaza Principal San Juan Bautista (Florencio Varela).
- `public/images/obra-playon-civico.webp` — Construcción de Playón Cívico.
- `public/images/obra-senda-plaza-barrial.webp` — Senda peatonal para Plaza Barrial.
- `public/images/obra-acceso-camiones.webp` — Piso Industrial de Acceso de Camiones con allanadora doble tripulada (debe figurar en último lugar en galerías y loops).
- **Ausencias que NO deben fabricarse:** No existen aún testimonios escritos, cifras verificadas de m² totales/por obra, años exactos de trayectoria ni listado de clientes privados autorizados. Prohibido inventar reseñas, m², precios o nombres de clientes.

## Product Principles

1. **WhatsApp primero, cero fricción:** Toda sección debe facilitar el paso directo a una consulta precalificada sin obligar a redactar desde cero.
2. **Verdad de obra verificable:** Mostrar exclusivamente trabajos, maquinaria y capacidades reales; nunca rellenar credibilidad con cifras o testimonios inventados.
3. **Móvil ágil sin fatiga de scroll:** Privilegiar exploración horizontal compacta y decisiones rápidas en teléfonos (`360px–430px`) sin sacrificar lectura ni áreas táctiles.
4. **Claridad entre dos públicos:** Separar limpiamente el recorrido del cliente final (servicios + obras + cotizador) del recorrido B2B de corralones, hormigoneras y estudios (alianzas + modo proveedor).

## Accessibility & Inclusion

- Cumplimiento objetivo WCAG AA en contraste de texto y controles, navegación completa por teclado con foco visible, soporte real para `prefers-reduced-motion` y áreas táctiles mínimas de `44px` en móvil.
