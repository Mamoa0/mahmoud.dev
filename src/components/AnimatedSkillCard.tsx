
import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface AnimatedSkillCardProps {
  icon: React.ReactNode;
  title: string;
  percentage: number;
  color: string;
}

const AnimatedSkillCard: React.FC<AnimatedSkillCardProps> = ({ 
  icon, 
  title, 
  percentage, 
  color 
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  
  // Mouse tracking for 3D card effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const rotateX = useTransform(y, [-100, 100], [10, -10]);
  const rotateY = useTransform(x, [-100, 100], [-10, 10]);
  
  // Smooth spring physics for the card movement
  const springConfig = { damping: 20, stiffness: 100 };
  const springRotateX = useSpring(rotateX, springConfig);
  const springRotateY = useSpring(rotateY, springConfig);
  
  // Animation for percentage counter
  const [displayPercentage, setDisplayPercentage] = useState(0);
  
  useEffect(() => {
    if (isInView) {
      const duration = 800; // milliseconds
      const startTime = performance.now();
      
      const updateCounter = (currentTime: number) => {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        const currentValue = Math.round(progress * percentage);
        
        setDisplayPercentage(currentValue);
        
        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        }
      };
      
      requestAnimationFrame(updateCounter);
    }
  }, [isInView, percentage]);
  
  // Observer for when card enters viewport
  useEffect(() => {
    if (!cardRef.current) return;
    
    const currentRef = cardRef.current;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.3 }
    );
    
    observer.observe(currentRef);
    
    return () => {
      observer.unobserve(currentRef);
    };
  }, []);
  // Handle mouse movement on the card
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  };
  
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };
  
  return (
    <motion.div
      ref={cardRef}
      className="relative rounded-xl border border-border overflow-hidden card-3d"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.1 }}
      style={{
        rotateX: springRotateX,
        rotateY: springRotateY,
        transformPerspective: 1200,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="p-6 bg-card">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-3">
            <div className={`${color} p-2 rounded-lg text-white`}>
              {icon}
            </div>
            <h3 className="text-lg font-semibold">{title}</h3>
          </div>
          <motion.div 
            className="text-xl font-bold text-right"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
          >
            {displayPercentage}%
          </motion.div>
        </div>
        
        <div className="relative h-2 bg-secondary rounded-full overflow-hidden">
          <motion.div 
            className={`absolute top-0 left-0 h-full ${color}`}
            initial={{ width: 0 }}
            animate={isInView ? { width: `${percentage}%` } : {}}
            transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default AnimatedSkillCard;
