
import React, { useState, useRef } from 'react';
import { HashRouter, Routes, Route, Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { Star, CreditCard, LandPlot, X } from 'lucide-react';
import Navbar from './components/Navbar';
import PropertyCard from './components/PropertyCard';
import AIConcierge from './components/AIConcierge';
import Logo from './components/Logo';
import { PROPERTIES } from './constants';
import { Property, Section } from './types';

const partnerLogoUrl = "https://eqansdofhuztzdghzhlz.supabase.co/storage/v1/object/sign/Xeelenja/LOGO%20FULL%20BLANCO.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV84ODRmOTc4My1lZmY0LTRhYTItOWQ1Ni1lYTI5ZjY3MjIzNmIiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJYZWVsZW5qYS9MT0dPIEZVTEwgQkxBTkNPLnBuZyIsImlhdCI6MTc2ODMxMzUxNywiZXhwIjoxNzk5ODQ5NTE3fQ.cOuvYlHs-piOjx2C5uyZqua6jqa7Adr03DHYRSWdzFo";
const terrenosVideoUrl = "https://eqansdofhuztzdghzhlz.supabase.co/storage/v1/object/sign/Xeelenja/grok-video-ac531ff8-ec7d-481c-9d23-0f504b5e5295%20(1).mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV84ODRmOTc4My1lZmY0LTRhYTItOWQ1Ni1lYTI5ZjY3MjIzNmIiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJYZWVsZW5qYS9ncm9rLXZpZGVvLWFjNTMxZmY4LWVjN2QtNDgxYy05ZDIzLTBmNTA0YjVlNTI5NSAoMSkubXA0IiwiaWF0IjoxNzY4MzE0Mjc0LCJleHAiOjE3OTk4NTAyNzR9.qbQ1XdEh26gXIaZHPpNknCj0MwthGfFKOcZ7Vhb8L90";

const GenericPage: React.FC<{ title: string; subtitle: string; icon: React.ReactNode; videoUrl?: string }> = ({ title, subtitle, icon, videoUrl }) => (
  <div className="relative min-h-screen flex items-center justify-center px-6 bg-[#001529] overflow-hidden pt-20">
    {videoUrl && (
      <div className="absolute inset-0 z-0">
        <video 
          autoPlay 
          muted 
          loop 
          playsInline 
          className="w-full h-full object-cover opacity-40 grayscale-[10%]"
        >
          <source src={videoUrl} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-[#001529] via-transparent to-[#001529]" />
      </div>
    )}
    
    <motion.div 
      initial={{ opacity: 0, scale: 0.98, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 1.2 }}
      className="relative z-10 text-center space-y-10 max-w-5xl"
    >
      <div className="inline-block p-8 bg-white/5 rounded-[30px] border border-white/10 backdrop-blur-3xl shadow-2xl">
        {React.isValidElement(icon) ? React.cloneElement(icon as React.ReactElement<any>, { className: "w-14 h-14 text-[#219EBC] drop-shadow-[0_0_15px_#219EBC]" }) : icon}
      </div>
      <h2 className="text-6xl md:text-8xl font-serif text-white font-light uppercase tracking-widest leading-none">{title}</h2>
      <p className="text-[#8ECAE6] text-lg md:text-2xl font-light tracking-[0.2em] uppercase leading-relaxed max-w-2xl mx-auto opacity-80">
        {subtitle}
      </p>
    </motion.div>
  </div>
);

const PropertyModal: React.FC<{ property: Property, onClose: () => void }> = ({ property, onClose }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[300] flex items-center justify-center p-4 md:p-16 bg-[#000c18]/98 backdrop-blur-2xl"
      onClick={onClose}
    >
      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
        className="bg-[#001529] border border-white/10 max-w-[1200px] w-full max-h-[90vh] overflow-y-auto rounded-[45px] flex flex-col md:flex-row shadow-[0_100px_200px_rgba(0,0,0,0.8)] relative"
        onClick={e => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-8 right-8 z-10 p-3 bg-white/5 hover:bg-white/10 rounded-full text-white/50 hover:text-white transition-all">
          <X className="w-6 h-6" />
        </button>
        <div className="w-full md:w-1/2 h-[400px] md:h-auto overflow-hidden">
          <img src={property.image} className="w-full h-full object-cover" alt={property.title} />
        </div>
        <div className="w-full md:w-1/2 p-12 md:p-20 flex flex-col justify-center">
          <h3 className="text-4xl md:text-6xl font-serif text-white mb-6 italic">{property.title}</h3>
          <p className="text-[#219EBC] text-[10px] uppercase tracking-[0.4em] mb-10 font-bold">{property.location}</p>
          <p className="text-white/60 text-lg leading-relaxed mb-10">{property.description}</p>
          <div className="grid grid-cols-3 gap-6 py-8 border-y border-white/5 mb-10">
             <div className="text-center">
                <span className="block text-2xl font-serif text-white">{property.beds}</span>
                <span className="text-[9px] uppercase text-[#8ECAE6] tracking-widest">Dorm.</span>
             </div>
             <div className="text-center">
                <span className="block text-2xl font-serif text-white">{property.baths}</span>
                <span className="text-[9px] uppercase text-[#8ECAE6] tracking-widest">Baños</span>
             </div>
             <div className="text-center">
                <span className="block text-2xl font-serif text-white">{property.sqft}</span>
                <span className="text-[9px] uppercase text-[#8ECAE6] tracking-widest">M²</span>
             </div>
          </div>
          <p className="text-3xl text-[#219EBC] mb-8 font-light">{property.price}</p>
          <button className="w-full py-5 bg-[#219EBC] text-[#001529] font-bold uppercase tracking-[0.3em] rounded-xl hover:bg-white transition-all duration-500 shadow-xl shadow-[#219EBC]/10">
            Consultar Disponibilidad
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

const MainExperience: React.FC<{ onSelect: (p: Property) => void }> = ({ onSelect }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 45,
    damping: 20,
    restDelta: 0.001
  });

  const heroOpacity = useTransform(smoothProgress, [0, 0.1], [1, 0]);
  const heroY = useTransform(smoothProgress, [0, 0.1], [0, -50]);
  const listReveal = useTransform(smoothProgress, [0.12, 0.25], [0, 1]);

  return (
    <div ref={containerRef} className="relative min-h-[400vh]">
      <div className="fixed inset-0 z-0 bg-[#001529]">
        <div className="absolute inset-0 bg-gradient-to-b from-[#000c18]/80 via-[#001529]/40 to-[#001529] z-10" />
        <img 
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=2500" 
          className="w-full h-full object-cover grayscale-[20%] opacity-60"
          alt="Luxury Sea View"
        />
        <div className="absolute inset-x-0 bottom-0 h-[40vh] bg-gradient-to-t from-[#219EBC]/5 to-transparent z-20" />
      </div>

      <section className="sticky top-0 h-screen w-full flex flex-col items-center justify-center z-20 px-6">
        <motion.div 
          style={{ opacity: heroOpacity, y: heroY }}
          className="text-center max-w-6xl"
        >
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl md:text-8xl font-serif italic text-white/95 leading-[1.1] mb-12 drop-shadow-2xl"
          >
            "Donde el desarrollo encuentra su máxima plenitud."
          </motion.h1>
          
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: 100 }}
            transition={{ delay: 0.6, duration: 1.2 }}
            className="h-[1px] bg-[#219EBC] mx-auto mb-10 shadow-[0_0_15px_#219EBC]" 
          />
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
            className="text-[10px] md:text-[12px] tracking-[0.6em] text-white/50 uppercase font-light"
          >
            FULLNESSLAND: ¡DESARROLLAMOS FUTURO!
          </motion.p>
        </motion.div>
      </section>

      <section className="relative z-30 pt-48 pb-32 px-6 md:px-24 bg-transparent">
        <motion.div style={{ opacity: listReveal }}>
          <div className="max-w-7xl mx-auto mb-48 text-center md:text-left">
            <h2 className="text-7xl md:text-9xl font-serif mb-10 font-light text-white tracking-tight">Tipología</h2>
            <div className="w-24 h-[1px] bg-[#219EBC] mb-8" />
            <p className="text-[#8ECAE6] text-[11px] tracking-[0.8em] uppercase font-bold opacity-70">EXCLUSIVIDAD REDEFINIDA</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-48 mb-64 max-w-7xl mx-auto">
            {PROPERTIES.slice(0, 4).map((prop, idx) => (
              <PropertyCard 
                key={prop.id} 
                property={prop} 
                index={idx}
                onSelect={onSelect}
              />
            ))}
          </div>

          <div className="max-w-5xl mx-auto mt-64" id={Section.AI_CONCIERGE}>
            <AIConcierge />
          </div>
        </motion.div>
      </section>
    </div>
  );
};

const ListingsPage: React.FC<{ onSelect: (p: Property) => void }> = ({ onSelect }) => (
  <section className="pt-48 pb-64 px-8 md:px-24 min-h-screen bg-[#001529]">
    <div className="max-w-7xl mx-auto">
      <h2 className="text-6xl md:text-9xl font-serif mb-24 font-light text-white tracking-tighter leading-tight">Portafolio <br/> <span className="text-[#219EBC] italic text-5xl md:text-8xl block mt-4">Residencial</span></h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-48">
        {PROPERTIES.map((prop, idx) => (
          <PropertyCard 
            key={prop.id} 
            property={prop} 
            index={idx}
            onSelect={onSelect}
          />
        ))}
      </div>
    </div>
  </section>
);

const App: React.FC = () => {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);

  return (
    <HashRouter>
      <div className="relative min-h-screen bg-[#001529] selection-blue">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<MainExperience onSelect={setSelectedProperty} />} />
            <Route path="/portfolio" element={<ListingsPage onSelect={setSelectedProperty} />} />
            <Route 
              path="/terrenos" 
              element={<GenericPage title="Terrenos" subtitle="Lienzos naturales para inversiones visionarias" icon={<LandPlot />} videoUrl={terrenosVideoUrl} />} 
            />
            <Route 
              path="/amenidades" 
              element={<GenericPage title="Amenidades" subtitle="Santuarios de serenidad y distinción" icon={<Star />} />} 
            />
            <Route 
              path="/financiamiento" 
              element={<GenericPage title="Estrategia" subtitle="Modelos de inversión con respaldo institucional" icon={<CreditCard />} />} 
            />
          </Routes>
        </main>

        <footer className="bg-[#000c18] py-32 px-10 border-t border-white/5 relative z-50">
          <div className="container mx-auto flex flex-col items-center gap-16">
            <div className="flex items-center gap-8 md:gap-12 opacity-40 hover:opacity-100 transition-opacity duration-1000">
              <Logo className="w-32 md:w-40" showSubtext={false} />
              <div className="w-[1px] h-12 md:h-16 bg-white/20" />
              <img src={partnerLogoUrl} alt="Partner Logo" className="h-10 md:h-14 w-auto object-contain" />
            </div>
            
            <div className="flex flex-wrap justify-center gap-12 text-[10px] tracking-[0.5em] font-bold text-white/20 uppercase">
               <Link to="/" className="hover:text-[#219EBC] transition-colors duration-500">Inicio</Link>
               <Link to="/portfolio" className="hover:text-[#219EBC] transition-colors duration-500">Portafolio</Link>
               <Link to="/terrenos" className="hover:text-[#219EBC] transition-colors duration-500">Terrenos</Link>
               <Link to="/amenidades" className="hover:text-[#219EBC] transition-colors duration-500">Amenidades</Link>
               <Link to="/financiamiento" className="hover:text-[#219EBC] transition-colors duration-500">Inversión</Link>
            </div>
            
            <div className="text-white/10 text-[8px] uppercase tracking-[0.4em] text-center max-w-2xl font-light leading-relaxed">
              © 2025 XEELENJA PROPERTIES & FULLNESSLAND. <br/> ARQUITECTURA DEL FUTURO. CANCÚN, MÉXICO.
            </div>
          </div>
        </footer>

        <AnimatePresence>
          {selectedProperty && (
            <PropertyModal 
              property={selectedProperty} 
              onClose={() => setSelectedProperty(null)} 
            />
          )}
        </AnimatePresence>
      </div>
    </HashRouter>
  );
};

export default App;
