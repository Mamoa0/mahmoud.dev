import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowDown, Download } from "lucide-react";
import TypewriterText from "./hero/TypewriterText";
import HeroImage from "./hero/HeroImage";
import SocialLinks from "./hero/SocialLinks";
import BackgroundElements from "./hero/BackgroundElements";

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX / window.innerWidth - 0.5,
        y: e.clientY / window.innerHeight - 0.5,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const phrases = ["MERN Developer", "Mobile Developer"];

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-16 "
    >
      <BackgroundElements />

      <div className="container px-4 sm:px-6 lg:px-8 z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div
            className={`lg:w-1/2 space-y-8 transform ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            } transition-all duration-1000`}
          >
            <div className="space-y-2">
              <div className="flex items-center gap-2 md:mt-0 mt-5">
                <span className="inline-block w-12 h-0.5 bg-gradient-to-r from-purple-500 to-teal-500"></span>
                <h2 className="text-lg sm:text-xl font-medium text-accent ">
                  👋 Hi there, I&lsquo;m
                </h2>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold">
                <span className="gradient-text animate-gradient-text">
                  Mahmoud Walid
                </span>
              </h1>
              <TypewriterText phrases={phrases} />
            </div>

            <p className="text-lg text-muted-foreground max-w-lg">
              I am a passionate MERN Stack Developer with a strong focus on
              React and Next.js. I thrive on building dynamic, user-centered web
              applications that address real-world challenges. My experience
              includes working on diverse projects such as scalable e-commerce
              platforms and secure dashboards for government use. I prioritize
              clean, maintainable code and intuitive user experiences. With a
              continuous drive to learn and grow, I bring both solid technical
              skills and a collaborative mindset to every team I join.{" "}
            </p>

            <div className="flex flex-wrap gap-4">
              <Button asChild className="group bg-gradient-to-r from-purple-600 to-teal-500 hover:from-purple-700 hover:to-teal-600 transform hover:scale-105 transition-all duration-300">
                <a href="#projects" className="relative overflow-hidden">
                  <span className="relative z-10 flex items-center">
                    View Projects
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </a>
              </Button>
              <Button 
                asChild 
                variant="outline" 
                className="group border-[1.5px] gradient-border hover:scale-105 transition-all duration-300"
              >
                <a href="#contact" className="flex items-center">
                  Contact Me
                  <ArrowDown className="ml-2 h-4 w-4 group-hover:translate-y-1 transition-transform" />
                </a>
              </Button>
              <Button 
                asChild 
                variant="secondary"
                className="group flex items-center gap-2 hover:scale-105 transition-all duration-300"
              >
                <a 
                  href="/mahmoudWalidCV.pdf" 
                  download 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center"
                >
                  <Download className="mr-2 h-4 w-4 group-hover:translate-y-1 transition-transform" />
                  Download CV
                </a>
              </Button>
            </div>

            <SocialLinks />
          </div>

          <div
            className={`lg:w-1/2 flex justify-center ${
              isVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"
            } transition-all duration-1000 delay-500`}
          >
            <HeroImage mousePosition={mousePosition} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
