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
│   ├── WhatsAppFilter.jsx   # Filtro de 3 pasos con vista previa y link dinámico a WhatsApp
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

## Reemplazo de fotografías de obra

Las fotografías del Hero y de la galería `projectsData` se sirven desde `public/images/`:

- `public/images/hero-concrete.webp`
- `public/images/project-llaneado-doble.webp`
- `public/images/project-playon-vehicular.webp`
- `public/images/project-nave-industrial.webp`
- `public/images/project-platea-obra-civil.webp`

Para subir fotos reales de obra, reemplazá esos archivos manteniendo los mismos nombres o actualizá las rutas en `src/data/siteData.js`.

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
