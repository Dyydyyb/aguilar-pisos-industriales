import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import ProjectsSlider from './components/ProjectsSlider';
import WhatsAppFilter from './components/WhatsAppFilter';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import { WHATSAPP_SERVICE_OPTIONS } from './data/siteData';

export default function App() {
  const [selectedService, setSelectedService] = useState(WHATSAPP_SERVICE_OPTIONS[0]);
  const [selectedServiceDetail, setSelectedServiceDetail] = useState('');

  const handleSelectServiceFromCatalog = ({ category, detail }) => {
    setSelectedService(category);
    setSelectedServiceDetail(detail || '');

    const target = document.getElementById('cotizador');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSelectServiceCategory = (category) => {
    setSelectedService(category);
    setSelectedServiceDetail('');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] overflow-x-clip">
      <Navbar />

      <main>
        <Hero />
        <Services onSelectService={handleSelectServiceFromCatalog} />
        <ProjectsSlider onSelectService={handleSelectServiceFromCatalog} />
        <WhatsAppFilter
          selectedService={selectedService}
          selectedServiceDetail={selectedServiceDetail}
          onSelectServiceCategory={handleSelectServiceCategory}
          onClearServiceDetail={() => setSelectedServiceDetail('')}
        />
        <ContactForm />
      </main>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
