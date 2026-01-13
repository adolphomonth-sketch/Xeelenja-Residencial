
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import Logo from './Logo';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const partnerLogoUrl = "https://eqansdofhuztzdghzhlz.supabase.co/storage/v1/object/sign/Xeelenja/LOGO%20FULL%20BLANCO.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV84ODRmOTc4My1lZmY0LTRhYTItOWQ1Ni1lYTI5ZjY3MjIzNmIiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJYZWVsZW5qYS9MT0dPIEZVTEwgQkxBTkNPLnBuZyIsImlhdCI6MTc2ODMxMzUxNywiZXhwIjoxNzk5ODQ5NTE3fQ.cOuvYlHs-piOjx2C5uyZqua6jqa7Adr03DHYRSWdzFo";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'INICIO', path: '/' },
    { name: 'TIPOLOGÍA DE CASAS', path: '/portfolio' },
    { name: 'TERRENOS', path: '/terrenos' },
    { name: 'AMENIDADES', path: '/amenidades' },
    { name: 'FINANCIAMIENTO', path: '/financiamiento' },
  ];

  return (
    <motion.nav 
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className={`fixed top-0 left-0 w-full z-[100] px-6 md:px-12 py-6 flex items-center justify-between transition-all duration-700 ${
        scrolled ? 'bg-[#000c18]/95 backdrop-blur-xl py-4 shadow-2xl border-b border-white/5' : 'bg-transparent'
      }`}
    >
      <div className="flex items-center gap-6 md:gap-10">
        <Link to="/" className="flex items-center gap-4 md:gap-8 group">
          <Logo className="w-24 md:w-32" showSubtext={false} />
          <div className="w-[1px] h-8 md:h-12 bg-white/20" />
          <img 
            src={partnerLogoUrl} 
            alt="Partner Logo" 
            className="h-7 md:h-10 w-auto object-contain opacity-50 group-hover:opacity-100 transition-opacity duration-500"
          />
        </Link>
        
        <div className="hidden xl:flex gap-10 text-[9px] tracking-[0.4em] font-bold text-white/70">
          {navLinks.map((link) => (
            <Link 
              key={link.name}
              to={link.path} 
              className={`hover:text-[#219EBC] transition-all duration-300 relative group ${
                location.pathname === link.path ? 'text-[#219EBC]' : ''
              }`}
            >
              {link.name}
              <span className={`absolute -bottom-1 left-0 h-[1px] bg-[#219EBC] transition-all duration-500 ${
                location.pathname === link.path ? 'w-full' : 'w-0 group-hover:w-full'
              }`} />
            </Link>
          ))}
        </div>
      </div>

      <a 
        href="#" 
        className="text-[9px] uppercase tracking-[0.25em] border border-white/20 hover:border-[#219EBC] hover:text-[#219EBC] px-7 py-3 rounded-full transition-all duration-500 font-bold text-white/90 bg-white/5 backdrop-blur-md"
      >
        AGENDAR CITA
      </a>
    </motion.nav>
  );
};

export default Navbar;
