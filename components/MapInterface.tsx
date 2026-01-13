
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import L from 'leaflet';
import { PROPERTIES } from '../constants';
import { Property } from '../types';

interface MapInterfaceProps {
  onSelectProperty: (p: Property) => void;
}

const MapInterface: React.FC<MapInterfaceProps> = ({ onSelectProperty }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    // Centro inicial: Cancún/Zona del desarrollo
    const center: L.LatLngExpression = [21.0184, -86.8488];
    
    const map = L.map(mapContainerRef.current, {
      center,
      zoom: 14,
      zoomControl: false,
      attributionControl: false
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
    }).addTo(map);

    // Personalizar icono de pin
    const customIcon = L.divIcon({
      className: 'custom-div-icon',
      html: `<div style="background-color: #219EBC; width: 24px; height: 24px; border-radius: 50% 50% 50% 0; transform: rotate(-45deg); border: 2px solid white; box-shadow: 0 0 15px rgba(33,158,188,0.6);"></div>`,
      iconSize: [24, 24],
      iconAnchor: [12, 24],
      popupAnchor: [0, -24]
    });

    PROPERTIES.forEach(prop => {
      const marker = L.marker([prop.lat, prop.lng], { icon: customIcon }).addTo(map);
      
      const popupContent = `
        <div class="group overflow-hidden">
          <img src="${prop.image}" class="w-full h-32 object-cover" />
          <div class="p-4">
            <h4 class="text-white font-serif text-xl mb-1">${prop.title}</h4>
            <p class="text-[#219EBC] text-[10px] font-bold uppercase tracking-widest mb-3">${prop.price}</p>
            <button id="btn-${prop.id}" class="w-full py-2 bg-[#219EBC] text-[#001f26] text-[10px] font-bold uppercase tracking-tighter rounded-lg hover:bg-white transition-colors duration-300">
              Ver Detalles
            </button>
          </div>
        </div>
      `;

      marker.bindPopup(popupContent);

      marker.on('popupopen', () => {
        const btn = document.getElementById(`btn-${prop.id}`);
        if (btn) {
          btn.onclick = () => {
            onSelectProperty(prop);
            map.closePopup();
          };
        }
      });
    });

    mapInstanceRef.current = map;

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [onSelectProperty]);

  return (
    <div className="relative w-full h-[calc(100vh-120px)] mt-24 px-8 md:px-16 pb-16">
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="w-full h-full rounded-[40px] overflow-hidden border border-white/10 shadow-[0_50px_100px_rgba(0,0,0,0.5)] z-10"
        ref={mapContainerRef}
      />
      
      {/* Overlay de información del mapa */}
      <div className="absolute top-12 left-12 md:top-20 md:left-24 z-20 pointer-events-none">
        <div className="bg-[#001f26]/80 backdrop-blur-xl p-8 rounded-[30px] border border-white/10 shadow-2xl max-w-xs">
          <h3 className="text-white font-serif text-3xl mb-4">Ubicación Estratégica</h3>
          <p className="text-white/40 text-[10px] uppercase tracking-[0.4em] leading-relaxed mb-6 font-bold">
            Explore el corazón del desarrollo más exclusivo en Cancún.
          </p>
          <div className="flex items-center gap-4">
            <div className="w-4 h-4 rounded-full bg-[#219EBC] animate-pulse" />
            <span className="text-white/80 text-[10px] uppercase tracking-widest font-bold">4 Desarrollos Activos</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapInterface;