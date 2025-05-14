import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { resumeData } from "@/data/resume";
import { ArrowRight, ExternalLink, Github } from "lucide-react";

type FilterType = "all" | "data" | "web" | "software";

const Projects: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const projectContainerRef = useRef<HTMLDivElement>(null);

  // Filter projects based on active filter
  const filteredProjects = resumeData.projects.filter(project => {
    if (activeFilter === "all") return true;
    return project.categories.includes(activeFilter);
  });

  // Handle filter change with animation
  const handleFilterChange = (filter: FilterType) => {
    // Add fade-out class
    const projectElements = document.querySelectorAll('.project-card');
    projectElements.forEach(el => {
      el.classList.add('opacity-0', 'transform', 'translate-y-4');
    });
    
    // After a short delay, change the filter and fade in the new projects
    setTimeout(() => {
      setActiveFilter(filter);
      setTimeout(() => {
        const newProjectElements = document.querySelectorAll('.project-card');
        newProjectElements.forEach((el, i) => {
          setTimeout(() => {
            el.classList.remove('opacity-0', 'transform', 'translate-y-4');
          }, i * 100); // Staggered animation
        });
      }, 50);
    }, 300);
  };

  // Handle scroll to project container when filter changes
  useEffect(() => {
    if (projectContainerRef.current && window.innerWidth < 768) {
      projectContainerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [activeFilter]);

  // Toggle project details
  const toggleProjectDetails = (index: number) => {
    setSelectedProject(selectedProject === index ? null : index);
  };

  return (
    <section id="projects" className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <h2 className="section-heading reveal">Featured Projects</h2>
        <p className="text-center text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-16 reveal">
          Showcasing my work across data science, web development, and software engineering.
        </p>
        
        {/* Project Filters */}
        <div className="flex flex-wrap justify-center mb-12 gap-3 reveal">
          <Button
            variant={activeFilter === "all" ? "default" : "outline"}
            className="px-5 py-2 rounded-full transition-all duration-300"
            onClick={() => handleFilterChange("all")}
          >
            All Projects
          </Button>
          <Button
            variant={activeFilter === "data" ? "default" : "outline"}
            className="px-5 py-2 rounded-full transition-all duration-300"
            onClick={() => handleFilterChange("data")}
          >
            Data Science
          </Button>
          <Button
            variant={activeFilter === "web" ? "default" : "outline"}
            className="px-5 py-2 rounded-full transition-all duration-300"
            onClick={() => handleFilterChange("web")}
          >
            Web Development
          </Button>
          <Button
            variant={activeFilter === "software" ? "default" : "outline"}
            className="px-5 py-2 rounded-full transition-all duration-300"
            onClick={() => handleFilterChange("software")}
          >
            Software Engineering
          </Button>
        </div>
        
        {/* Project Grid */}
        <div 
          ref={projectContainerRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 reveal"
        >
          {filteredProjects.map((project, index) => (
            <div 
              key={`project-${index}`}
              className="project-card bg-gray-50 dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg transition-all duration-500 hover-card opacity-100"
              onClick={() => toggleProjectDetails(index)}
            >
              <div className="relative group h-48 overflow-hidden">
                <img 
                  src={project.image} 
                  alt={`${project.title} visualization`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                  <div className="flex gap-3 mb-2 transition-transform duration-500 translate-y-4 group-hover:translate-y-0">
                    <a 
                      href={project.link} 
                      className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-primary/80 transition-colors duration-300"
                      onClick={(e) => e.stopPropagation()}
                      aria-label="View Live Demo"
                    >
                      <ExternalLink className="h-5 w-5 text-white" />
                    </a>
                    <a 
                      href="#github" 
                      className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-primary/80 transition-colors duration-300"
                      onClick={(e) => e.stopPropagation()}
                      aria-label="View Source Code"
                    >
                      <Github className="h-5 w-5 text-white" />
                    </a>
                  </div>
                </div>
                <span className="absolute top-3 right-3 text-xs px-3 py-1 bg-primary/90 text-white rounded-full backdrop-blur-sm">
                  {project.period}
                </span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors duration-300">{project.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-5">
                  {project.technologies.map((tech, techIndex) => (
                    <span 
                      key={`tech-${index}-${techIndex}`} 
                      className="text-xs px-2 py-1 bg-primary/10 text-primary dark:text-primary-foreground dark:bg-primary/20 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex justify-between items-center">
                  <a 
                    href={project.link} 
                    className="text-primary inline-flex items-center group/link"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <span>View Project</span>
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-1" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Project Details Modal (would be implemented with a proper modal component) */}
        {selectedProject !== null && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-gray-800 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-auto">
              {/* Modal content would go here */}
              {/* Close button */}
              <button 
                className="absolute top-4 right-4 bg-gray-200 dark:bg-gray-700 rounded-full p-2"
                onClick={() => setSelectedProject(null)}
              >
                <span className="sr-only">Close</span>
                ×
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
