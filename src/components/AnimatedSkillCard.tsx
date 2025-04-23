import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Card } from '@/components/ui/card';

interface AnimatedSkillCardProps {
  icon: React.ReactNode;
  title: string;
  color: string;
}

const AnimatedSkillCard: React.FC<AnimatedSkillCardProps> = ({ 
  icon, 
  title, 
  color 
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Mouse tracking for 3D card effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const rotateX = useTransform(y, [-100, 100], [10, -10]);
  const rotateY = useTransform(x, [-100, 100], [-10, 10]);
  
  const springConfig = { damping: 20, stiffness: 100 };
  const springRotateX = useSpring(rotateX, springConfig);
  const springRotateY = useSpring(rotateY, springConfig);
  
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
      className="group"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      style={{
        rotateX: springRotateX,
        rotateY: springRotateY,
        transformPerspective: 1200,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <Card className={`relative overflow-hidden bg-gradient-to-br ${color} backdrop-blur-sm border-none p-6 transition-all duration-300 group-hover:shadow-lg group-hover:scale-[1.02]`}>
        <div className="flex items-center gap-4">
          <div className="p-2 rounded-lg bg-white/10 backdrop-blur-sm">
            {icon}
          </div>
          <h3 className="text-lg font-semibold">{title}</h3>
        </div>
      </Card>
    </motion.div>
  );
};

export default AnimatedSkillCard;
