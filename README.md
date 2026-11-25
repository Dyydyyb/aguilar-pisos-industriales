# Aguilar Pisos Industriales — Landing Page

Sitio web corporativo de alta conversión desarrollado con **Vite + React + Tailwind CSS + Lucide React** para **Aguilar Pisos Industriales** (Buenos Aires, Zona Sur y AMBA).

## Stack y arquitectura

- **Vite 6 + React 19**
- **Tailwind CSS v4** (`@tailwindcss/vite`)
- **Lucide React** para iconografía técnica consistente
- Estética industrial minimalista **100% mate** (`#F8FAFC`, `#E2E8F0`, `#0F172A`, `#1E293B`, acento `#EA580C`)
- Tipografía: `Montserrat` (700/800) + `Inter` (400/500/600)

```text
src/
├── components/
│   ├── BrandLogo.jsx        # Isologo arquitectónico AGUILAR
│   ├── Navbar.jsx           # Navegación sticky + barra de progreso + menú móvil
│   ├── Hero.jsx             # Hero full-viewport con indicadores técnicos
│   ├── Services.jsx         # Tabs interactivos (Pisos / Arquitectura) conectados al cotizador
│   ├── ProjectsSlider.jsx   # Slider con swipe táctil real + Lightbox modal
│   ├── Alliances.jsx        # Bloque B2B de alianzas con corralones, hormigoneras y estudios
│   ├── WhatsAppFilter.jsx   # Filtro de 3 pasos (obra y alianza B2B) con vista previa y link a WhatsApp
│   ├── ContactForm.jsx      # Formulario formal con validación y envío rápido a WhatsApp
│   ├── Footer.jsx           # Pie institucional oscuro
│   ├── FloatingWhatsApp.jsx # Acceso flotante a WhatsApp
│   ├── Reveal.jsx           # Contenedor de animación al scrollear
│   └── WhatsAppIcon.jsx     # Ícono vectorial de WhatsApp
├── data/
│   └── siteData.js          # Datos reales, servicios, projectsData y helpers de WhatsApp
└── hooks/
    ├── useScrollReveal.js   # IntersectionObserver reutilizable con soporte stagger
    └── useScrollProgress.js # Progreso de lectura en navbar
```

## Identidad y fotografías de obra

El logo oficial y las fotografías reales de obra se sirven desde `public/images/`:

- `public/images/logo-aguilar.png` (Logo oficial y favicon)
- `public/images/hero-concrete.webp` (Fondo principal del Hero)
- `public/images/obra-plaza-san-juan-bautista.webp` (Obra principal: Hormigón peinado y sector llaneado con pigmento azul — Plaza Principal San Juan Bautista, Florencio Varela)
- `public/images/obra-acceso-camiones.webp` (Piso industrial de acceso de camiones con allanadora doble tripulada)
- `public/images/obra-playon-civico.webp` (Construcción de playón cívico)
- `public/images/obra-senda-plaza-barrial.webp` (Senda peatonal para plaza barrial)

Para sumar nuevas obras o actualizar imágenes, editá `projectsData` en `src/data/siteData.js`.

## Desarrollo local

```bash
npm install
npm run dev
```

## Producción y deploy en Vercel

```bash
npm run build
npm run preview
```

El proyecto incluye `vercel.json` preconfigurado para desplegar directamente en **Vercel** conectando este repositorio (`Framework Preset: Vite`, `Build Command: npm run build`, `Output Directory: dist`).
