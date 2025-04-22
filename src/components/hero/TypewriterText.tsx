
import React, { useState, useEffect } from 'react';

interface TypewriterTextProps {
  phrases: string[];
}

const TypewriterText = ({ phrases }: TypewriterTextProps) => {
  const [text, setText] = useState('');
  const [index, setIndex] = useState(0);
  const [currentPhrase, setCurrentPhrase] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(120);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const current = phrases[currentPhrase];
      
      if (!isDeleting) {
        setText(current.substring(0, index + 1));
        setIndex(index + 1);
        
        if (index >= current.length) {
          setIsDeleting(true);
          setTypingSpeed(80);
          setTimeout(() => {
            setTypingSpeed(120);
          }, 1500);
        }
      } else {
        setText(current.substring(0, index - 1));
        setIndex(index - 1);
        
        if (index <= 2) {
          setIsDeleting(false);
          setCurrentPhrase((currentPhrase + 1) % phrases.length);
        }
      }
    }, typingSpeed);
    
    return () => clearTimeout(timeout);
  }, [index, isDeleting, currentPhrase, typingSpeed, phrases]);

  return (
    <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-muted-foreground h-12">
      {text}<span className="animate-blink">|</span>
    </h2>
  );
};

export default TypewriterText;
