
import React from 'react';
import { useTheme } from '@/hooks/use-theme';

const BackgroundElements = () => {
  const { theme } = useTheme();
  
  return (
    <>
      <div className="absolute top-40 -left-24 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse-slow"></div>
      <div className="absolute bottom-20 -right-24 w-80 h-80 bg-teal-500/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
      
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i}
            className={`absolute w-2 h-2 rounded-full ${theme === 'dark' ? 'bg-white/10' : 'bg-purple-500/10'}`}
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.7 + 0.3,
              animation: `float ${Math.random() * 10 + 10}s linear infinite`,
              animationDelay: `${Math.random() * 10}s`,
            }}
          ></div>
        ))}
      </div>
    </>
  );
};

export default BackgroundElements;
