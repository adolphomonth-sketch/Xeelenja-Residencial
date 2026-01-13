
import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, ArrowUpRight } from 'lucide-react';
import { Property } from '../types';

interface PropertyCardProps {
  property: Property;
  index: number;
  onSelect: (p: Property) => void;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property, index, onSelect }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1.5, delay: (index % 2) * 0.2 }}
      className="group cursor-pointer w-full"
      onClick={() => onSelect(property)}
    >
      {/* Contenedor de Imagen con Aspect Ratio Mejorado */}
      <div className="relative aspect-[16/10] overflow-hidden rounded-[40px] md:rounded-[55px] mb-10 bg-[#001f26] shadow-[0_40px_80px_rgba(0,0,0,0.6)] border border-white/10 group-hover:border-[#219EBC]/50 transition-all duration-1000">
        <motion.img 
          src={property.image} 
          alt={property.title}
          className="w-full h-full object-cover transition-transform duration-[3s] group-hover:scale-110"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#001f26]/95 via-transparent to-transparent opacity-80 group-hover:opacity-40 transition-opacity duration-1000" />
        
        {/* Icono de Acción Flotante */}
        <div className="absolute top-8 right-8 md:top-12 md:right-12 opacity-0 group-hover:opacity-100 transition-all duration-700 scale-75 group-hover:scale-100">
           <div className="w-16 h-16 md:w-20 md:h-20 bg-white/10 backdrop-blur-3xl text-white flex items-center justify-center rounded-[24px] md:rounded-[28px] border border-white/40 shadow-2xl">
             <ArrowUpRight className="w-8 h-8 md:w-10 md:h-10" />
           </div>
        </div>
        
        {/* Etiqueta inferior */}
        <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12 opacity-100 group-hover:translate-x-4 transition-all duration-1000">
          <div className="flex flex-col gap-2">
            <span className="px-5 py-2.5 bg-[#219EBC] backdrop-blur-xl rounded-[15px] text-[10px] md:text-[11px] uppercase tracking-[0.4em] font-bold text-[#001f26] shadow-2xl">
              Ver Detalles
            </span>
          </div>
        </div>
      </div>
      
      {/* Contenedor de Información - Resuelve el solapamiento */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 px-4 md:px-10">
        {/* Lado Izquierdo: Título y Ubicación */}
        <div className="space-y-4 flex-1 w-full lg:max-w-[65%]">
          <h3 className="text-3xl md:text-5xl font-serif text-white group-hover:text-[#219EBC] transition-all duration-500 leading-tight drop-shadow-2xl">
            {property.title}
          </h3>
          <div className="flex items-start gap-3 text-[#8ECAE6] text-[12px] md:text-sm uppercase tracking-[0.3em] font-bold opacity-80 drop-shadow-lg">
            <MapPin className="w-5 h-5 text-[#219EBC] shrink-0 mt-0.5" />
            <span className="leading-relaxed">{property.location}</span>
          </div>
        </div>

        {/* Lado Derecho: Precio */}
        <div className="text-left lg:text-right flex flex-col lg:items-end shrink-0 w-full lg:w-auto border-t lg:border-t-0 border-white/10 pt-6 lg:pt-0">
          <span className="text-[10px] text-white/40 uppercase tracking-[0.5em] mb-2 font-bold">Inversión Desde</span>
          <p className="text-3xl md:text-4xl font-light text-[#219EBC] tracking-tighter drop-shadow-[0_0_15px_rgba(33,158,188,0.4)]">
            {property.price}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default PropertyCard;
