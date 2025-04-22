
import React from 'react';
import { Code, Briefcase } from 'lucide-react';
import Image from 'next/image';

interface HeroImageProps {
  mousePosition: { x: number; y: number };
}

const HeroImage = ({ mousePosition }: HeroImageProps) => {
  return (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-teal-500 rounded-full blur-2xl opacity-20 animate-pulse-slow"></div>
      <div 
        className="relative z-10 bg-card p-2 rounded-full border border-border"
        style={{
          transform: `perspective(1000px) rotateY(${mousePosition.x * 10}deg) rotateX(${-mousePosition.y * 10}deg)`,
          transition: 'transform 0.1s ease-out'
        }}
      >
        <div className="overflow-hidden rounded-full relative group">
          <Image 
            src="/mahmoud.png" 
            alt="Developer Profile" 
            className="w-64 h-64 sm:w-80 sm:h-80 rounded-full object-cover transition-transform duration-500 group-hover:scale-110"
            width={256}
            height={256}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/40 to-teal-500/40 opacity-0 group-hover:opacity-80 transition-opacity duration-300 flex items-center justify-center">
            <div className="text-white text-center space-y-2 scale-0 group-hover:scale-100 transition-transform duration-300">
              <Code size={32} className="mx-auto" />
              <p className="text-lg font-medium">MERN Developer</p>
            </div>
          </div>
        </div>
      </div>
      
      <div 
        className="absolute -top-6 -right-6 bg-card px-4 py-2 rounded-full border border-border shadow-lg flex items-center gap-2 animate-float-slow"
        style={{ animationDelay: '0.5s' }}
      >
        <Code size={18} className="text-purple-500" />
        <span className="font-medium">MERN Developer</span>
      </div>
      
      <div 
        className="absolute -bottom-6 -left-6 z-50 bg-card px-4 py-2 rounded-full border border-border shadow-lg flex items-center gap-2 animate-float-slow"
        style={{ animationDelay: '1.5s' }}
      >
        <Briefcase size={18} className="text-teal-500" />
        <span className="font-medium">1+ Years Exp</span>
      </div>
    </div>
  );
};

export default HeroImage;
