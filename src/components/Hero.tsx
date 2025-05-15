import React, { useEffect, useRef, useState } from "react";
import { Button } from "../components/ui/button";
import { initParticles } from "../lib/three/particles";
import { ArrowDown, Github, Linkedin, Mail, FileText } from "lucide-react";

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const typingRef = useRef<HTMLSpanElement>(null);
  const [scrollIndicator, setScrollIndicator] = useState(true);

  useEffect(() => {
    // Initialize Three.js particles
    if (containerRef.current) {
      const cleanup = initParticles(containerRef.current);
      return cleanup;
    }
  }, []);

  useEffect(() => {
    // Handle scroll indicator visibility
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setScrollIndicator(false);
      } else {
        setScrollIndicator(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Typing effect for roles
    if (!typingRef.current) return;
    
    const roles = ["Data Analyst", "Software Engineer", "Data Scientist", "Full-Stack Developer"];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    const type = () => {
      const currentRole = roles[roleIndex];
      
      if (isDeleting) {
        typingRef.current!.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
      } else {
        typingRef.current!.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
      }
      
      // Speed control
      typingSpeed = isDeleting ? 35 : 100;
      
      // Word complete
      if (!isDeleting && charIndex === currentRole.length) {
        isDeleting = true;
        typingSpeed = 1500; // Pause at end
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typingSpeed = 400; // Pause before next word
      }
      
      setTimeout(type, typingSpeed);
    };
    
    const typingTimeout = setTimeout(type, 800);
    
    return () => clearTimeout(typingTimeout);
  }, []);

  const handleScrollToContent = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative pt-16 overflow-hidden">
      <div ref={containerRef} className="absolute inset-0 z-0"></div>
      
      <div className="container mx-auto px-4 z-10 flex flex-col md:flex-row items-center overflow-hidden">
        <div className="md:w-1/2 text-center md:text-left mb-10 md:mb-0 reveal">
          <div className="relative inline-block mb-3 md:mb-5 bg-primary/10 px-4 py-1 rounded-full text-primary dark:text-primary-foreground text-sm font-medium">
            <span className="relative z-10">Welcome to my portfolio</span>
            <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/20 to-primary/0 animate-pulse rounded-full"></div>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-4 relative">
            Hi, I'm <span className="text-primary relative">
              Payal
              <span className="absolute bottom-0 left-0 w-full h-1 bg-primary translate-y-1"></span>
            </span>
          </h1>
          
          <h2 className="text-2xl md:text-3xl mb-6 flex items-center justify-center md:justify-start">
            <span className="h-8 inline-block mr-3 w-1 bg-primary animate-blink"></span>
            <span ref={typingRef} className="font-medium">Data Analyst</span>
          </h2>
          
          <p className="text-lg mb-8 max-w-lg mx-auto md:mx-0 dark:text-gray-300">
            Turning data into insights and code into solutions. Specialized in data analysis, 
            machine learning, and full-stack development.
          </p>
          
          <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-8">
            <Button 
              asChild 
              className="btn-primary group"
            >
              <a href="#contact">
                Get In Touch
                <span className="inline-block ml-2 transition-transform duration-300 group-hover:translate-x-1">→</span>
              </a>
            </Button>
            <Button 
              asChild 
              variant="outline" 
              className="btn-outline"
            >
              <a href="#projects">View Projects</a>
            </Button>
          </div>
          
          <div className="flex justify-center md:justify-start items-center gap-5 mt-6">
            <a 
              href="https://linkedin.com/in/payal-kash-40abb3225" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors duration-300"
              aria-label="LinkedIn Profile"
            >
              <Linkedin size={20} />
            </a>
            <a 
              href="https://github.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors duration-300"
              aria-label="GitHub Profile"
            >
              <Github size={20} />
            </a>
            <a 
              href="mailto:napayal@uwindsor.ca" 
              className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors duration-300"
              aria-label="Email Me"
            >
              <Mail size={20} />
            </a>
            <a 
              href="#resume" 
              className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors duration-300"
              aria-label="Download Resume"
            >
              <FileText size={20} />
            </a>
          </div>
        </div>
        
        <div className="md:w-1/2 flex justify-center reveal">
          <div className="relative w-64 h-64 md:w-80 md:h-80">
            {/* Main photo */}
            <div className="w-full h-full rounded-full overflow-hidden border-4 border-primary relative z-10 shadow-xl">
              <img 
                src="/payal.jpg" 
                alt="Payal's professional headshot" 
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Animated border */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[105%] h-[105%] rounded-full border-4 border-primary/30 z-0 animate-slow-ping"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[115%] h-[115%] rounded-full border-2 border-secondary/20 z-0 animate-slow-ping" style={{ animationDelay: "1s" }}></div>
            
            {/* Skill badges */}
            <div className="absolute top-0 -left-6 w-16 h-16 rounded-full bg-secondary flex items-center justify-center text-white shadow-lg z-20 animate-float">
              <span className="text-xs font-semibold">ML</span>
            </div>
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-20 h-20 rounded-full bg-primary flex items-center justify-center text-white shadow-lg z-20 animate-float" style={{ animationDelay: "2s" }}>
              <span className="text-xs font-semibold">Data</span>
            </div>
            <div className="absolute top-1/4 -right-4 w-14 h-14 rounded-full bg-accent flex items-center justify-center text-white shadow-lg z-20 animate-float" style={{ animationDelay: "1s" }}>
              <span className="text-xs font-semibold">Dev</span>
            </div>
            
            {/* Background blobs */}
            <div className="absolute -bottom-10 -right-10 w-32 h-32 rounded-full bg-gradient-to-tr from-primary/20 to-secondary/20 blur-xl"></div>
            <div className="absolute -top-10 -left-10 w-32 h-32 rounded-full bg-gradient-to-bl from-accent/20 to-primary/20 blur-xl"></div>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      {scrollIndicator && (
        <div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center cursor-pointer animate-bounce"
          onClick={handleScrollToContent}
        >
          <span className="text-sm text-gray-500 dark:text-gray-400 mb-2">Scroll Down</span>
          <ArrowDown className="h-6 w-6 text-primary" />
        </div>
      )}
    </section>
  );
};

export default Hero;
