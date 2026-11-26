import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import ProjectsSlider from './components/ProjectsSlider';
import WhatsAppFilter from './components/WhatsAppFilter';
import Alliances from './components/Alliances';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import { WHATSAPP_SERVICE_OPTIONS } from './data/siteData';

function scrollToElement(elementId) {
  const target = document.getElementById(elementId);
  if (!target) return;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  target.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' });
}

export default function App() {
  const [quoteMode, setQuoteMode] = useState('obra'); // 'obra' | 'alianza'
  const [selectedService, setSelectedService] = useState(WHATSAPP_SERVICE_OPTIONS[0]);
  const [selectedServiceDetail, setSelectedServiceDetail] = useState('');

  const handleSelectServiceFromCatalog = ({ category, detail }) => {
    setQuoteMode('obra');
    setSelectedService(category);
    setSelectedServiceDetail(detail || '');
    scrollToElement('cotizador');
  };

  const handleConfigureAlliance = () => {
    setQuoteMode('alianza');
    setSelectedServiceDetail('');
    scrollToElement('cotizador');
  };

  const handleSelectServiceCategory = (category) => {
    setSelectedService(category);
    setSelectedServiceDetail('');
  };

  return (
    <div className="min-h-screen">
      {/* Enlace de salto al contenido principal (WCAG 2.4.1) */}
      <a
        href="#contenido-principal"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:inline-flex focus:min-h-[44px] focus:items-center focus:rounded-xl focus:bg-obra focus:px-4 focus:text-sm focus:font-semibold focus:text-white"
      >
        Saltar al contenido principal
      </a>

      <Navbar />

      <main id="contenido-principal" tabIndex={-1} className="focus:outline-none">
        <Hero />
        <Services onSelectService={handleSelectServiceFromCatalog} />
        <ProjectsSlider onSelectService={handleSelectServiceFromCatalog} />
        <WhatsAppFilter
          mode={quoteMode}
          selectedService={selectedService}
          selectedServiceDetail={selectedServiceDetail}
          onChangeMode={setQuoteMode}
          onSelectServiceCategory={handleSelectServiceCategory}
          onClearServiceDetail={() => setSelectedServiceDetail('')}
        />
        <Alliances onConfigureAlliance={handleConfigureAlliance} />
        <ContactForm />
      </main>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
