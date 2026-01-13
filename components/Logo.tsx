
import React from 'react';

interface LogoProps {
  className?: string;
  showSubtext?: boolean;
}

const Logo: React.FC<LogoProps> = ({ className = "w-32", showSubtext = true }) => {
  const logoUrl = "https://eqansdofhuztzdghzhlz.supabase.co/storage/v1/object/sign/Xeelenja/LOGO%20XEele%20blanco%20ok.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV84ODRmOTc4My1lZmY0LTRhYTItOWQ1Ni1lYTI5ZjY3MjIzNmIiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJYZWVsZW5qYS9MT0dPIFhFZWxlIGJsYW5jbyBvay5wbmciLCJpYXQiOjE3NjgzMTMyMDUsImV4cCI6MTc5OTg0OTIwNX0.PeMr2-GtoWl_0Qkvx1rGWE_VPDdiJfDl38V4SvqvkTA";

  return (
    <div className={`flex flex-col items-center justify-center ${className} select-none transition-all duration-700`}>
      <img 
        src={logoUrl} 
        alt="Xeelenja Logo" 
        className="w-full h-auto object-contain brightness-0 invert" 
        style={{ filter: 'brightness(0) invert(1)' }}
      />
      
      {showSubtext && (
        <div className="mt-4 w-full flex flex-col items-center">
          <div className="w-full h-[1px] bg-white/20 mb-1.5" />
          <p className="text-[0.4em] tracking-[0.4em] uppercase font-bold text-white/60">
            DESARROLLAMOS FUTURO
          </p>
          <div className="w-full h-[1px] bg-white/20 mt-1.5" />
        </div>
      )}
    </div>
  );
};

export default Logo;
