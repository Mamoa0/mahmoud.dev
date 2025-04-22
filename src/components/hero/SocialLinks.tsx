
import { Github, Linkedin } from 'lucide-react';

const SocialLinks = () => {
  return (
    <div className="flex gap-6 pt-2">
      <a href="https://github.com/Arius02" target="_blank" rel="noopener noreferrer" 
         className="text-muted-foreground hover:text-foreground transition-colors hover:scale-110 transform duration-300">
        <Github size={24} />
      </a>
      <a href="https://linkedin.com/in/mahmouu" target="_blank" rel="noopener noreferrer" 
         className="text-muted-foreground hover:text-foreground transition-colors hover:scale-110 transform duration-300">
        <Linkedin size={24} />
      </a>
    </div>
  );
};

export default SocialLinks;
