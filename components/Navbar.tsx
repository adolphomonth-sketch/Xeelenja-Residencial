import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Calendar } from 'lucide-react';
import Logo from './Logo';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const partnerLogoUrl = "https://eqansdofhuztzdghzhlz.supabase.co/storage/v1/object/sign/Xeelenja/LOGO%20FULL%20BLANCO.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV84ODRmOTc4My1lZmY0LTRhYTItOWQ1Ni1lYTI5ZjY3MjIzNmIiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJYZWVsZW5qYS9MT0dPIEZVTEwgQkxBTkNPLnBuZyIsImlhdCI6MTc2ODMxMzUxNywiZXhwIjoxNzk5ODQ5NTE3fQ.cOuvYlHs-piOjx2C5uyZqua6jqa7Adr03DHYRSWdzFo";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Cerrar menú móvil al cambiar de ruta
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'INICIO', path: '/' },
    { name: 'PORTAFOLIO', path: '/portfolio' },
    { name: 'TERRENOS', path: '/terrenos' },
    { name: 'AMENIDADES', path: '/amenidades' },
    { name: 'INVERSIÓN', path: '/financiamiento' },
  ];

  // Explicitly type menuVariants to Variants to correctly infer ease array as a cubic-bezier tuple
  const menuVariants: Variants = {
    closed: { opacity: 0, x: "100%", transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
    open: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
  };

  const linkVariants = {
    closed: { opacity: 0, y: 20 },
    open: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.3 + i * 0.1, duration: 0.6 }
    })
  };

  return (
    <>
      <motion.nav 
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className={`fixed top-0 left-0 w-full z-[100] px-5 md:px-12 py-5 md:py-8 flex items-center justify-between transition-all duration-700 ${
          scrolled || mobileMenuOpen ? 'bg-[#000c18]/95 backdrop-blur-xl py-4 shadow-2xl border-b border-white/5' : 'bg-transparent'
        }`}
      >
        <div className="flex items-center gap-4 md:gap-10">
          <Link to="/" className="flex items-center gap-3 md:gap-8 group">
            <Logo className="w-20 md:w-32" showSubtext={false} />
            <div className="w-[1px] h-6 md:h-12 bg-white/20" />
            <img 
              src={partnerLogoUrl} 
              alt="Partner Logo" 
              className="h-6 md:h-9 w-auto object-contain opacity-50 group-hover:opacity-100 transition-opacity duration-500"
            />
          </Link>
          
          {/* Desktop Links */}
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

        <div className="flex items-center gap-4">
          <a 
            href="#" 
            className="hidden sm:flex text-[9px] uppercase tracking-[0.25em] border border-white/20 hover:border-[#219EBC] hover:text-[#219EBC] px-6 py-3 rounded-full transition-all duration-500 font-bold text-white/90 bg-white/5 backdrop-blur-md"
          >
            AGENDAR CITA
          </a>

          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-3 bg-white/5 rounded-2xl border border-white/10 text-white hover:text-[#219EBC] transition-colors z-[110]"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed inset-0 z-[95] bg-[#001529]/98 backdrop-blur-2xl flex flex-col justify-center items-center p-8 pt-32"
          >
            <div className="flex flex-col gap-10 w-full max-w-sm">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  custom={i}
                  variants={linkVariants}
                >
                  <Link 
                    to={link.path}
                    className={`block text-3xl md:text-5xl font-serif italic text-center transition-colors ${
                      location.pathname === link.path ? 'text-[#219EBC]' : 'text-white hover:text-[#219EBC]'
                    }`}
                  >
                    {link.name}
                  </Link>
                  <div className="w-12 h-[1px] bg-white/10 mx-auto mt-4" />
                </motion.div>
              ))}
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="mt-20 w-full max-w-xs"
            >
              <button className="w-full py-6 bg-[#219EBC] text-[#001529] rounded-2xl font-bold uppercase tracking-[0.3em] text-[10px] flex items-center justify-center gap-4 shadow-2xl shadow-[#219EBC]/20">
                <Calendar className="w-4 h-4" />
                Agendar Cita
              </button>
            </motion.div>

            <div className="absolute bottom-12 flex flex-col items-center gap-6 opacity-30">
              <Logo className="w-24" showSubtext={false} />
              <p className="text-[7px] tracking-[0.4em] uppercase text-white font-bold">Fullnessland Real Estate</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;