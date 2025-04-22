
import React from 'react';
import { ArrowUp } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="bg-background py-10 border-t border-border relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <button
          onClick={scrollToTop}
          className="bg-primary rounded-full p-3 text-primary-foreground hover:bg-primary/90 transition-colors"
          aria-label="Scroll to top"
        >
          <ArrowUp size={20} />
        </button>
      </div>
      
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <a href="#home" className="text-xl font-bold gradient-text">Mahmoud.Dev</a>
            <p className="text-muted-foreground mt-2">
              Creating exceptional web and mobile experiences.
            </p>
          </div>
          
          <div className="text-center md:text-right">
            <p className="text-muted-foreground">
              © {new Date().getFullYear()} Mahmoud Walid. All rights reserved.
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              Designed & Built with ❤️
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
