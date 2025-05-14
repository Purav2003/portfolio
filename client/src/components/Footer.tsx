import React from "react";
import { Github, Linkedin, Mail } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <h2 className="text-2xl font-bold">Payal</h2>
            <p className="text-gray-400 mt-2">Data Analyst & Software Engineer</p>
          </div>
          
          <div className="flex space-x-6">
            <a 
              href="https://linkedin.com/in/payal-kash-40abb3225" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors" 
              aria-label="LinkedIn"
            >
              <Linkedin className="h-6 w-6" />
            </a>
            <a 
              href="https://github.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors" 
              aria-label="GitHub"
            >
              <Github className="h-6 w-6" />
            </a>
            <a 
              href="mailto:napayal@uwindsor.ca" 
              className="hover:text-primary transition-colors" 
              aria-label="Email"
            >
              <Mail className="h-6 w-6" />
            </a>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400">&copy; {new Date().getFullYear()} Payal. All rights reserved.</p>
          <div className="mt-4 md:mt-0">
            <a href="#home" className="text-gray-400 hover:text-primary transition-colors">
              Back to top
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
