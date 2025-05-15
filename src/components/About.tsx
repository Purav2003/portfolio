import React, { useState } from "react";
import { Button } from "../components/ui/button";
import { resumeData } from "../data/resume";
import { 
  Database, 
  Code, 
  LineChart, 
  BrainCircuit, 
  LayoutGrid, 
  Rocket, 
  ChevronRight,
  Sparkles
} from "lucide-react";

type RoleType = "data" | "sde";

const About: React.FC = () => {
  const [activeRole, setActiveRole] = useState<RoleType>("data");

  // Role-specific features and tech stacks
  const roleFeatures = {
    data: [
      { 
        icon: <Database className="h-8 w-8 text-primary" />, 
        title: "Data Processing",
        description: "Expert in ETL operations and data cleaning using Python and SQL."
      },
      { 
        icon: <LineChart className="h-8 w-8 text-secondary" />, 
        title: "Visualization",
        description: "Creating insightful data visualizations with Tableau, Power BI, and Python libraries."
      },
      { 
        icon: <BrainCircuit className="h-8 w-8 text-accent" />, 
        title: "Machine Learning",
        description: "Building predictive models using supervised and unsupervised learning techniques."
      }
    ],
    sde: [
      { 
        icon: <LayoutGrid className="h-8 w-8 text-primary" />, 
        title: "Full-Stack Development",
        description: "Building responsive web applications with React, Node.js, and modern database technologies."
      },
      { 
        icon: <Code className="h-8 w-8 text-secondary" />, 
        title: "API Integration",
        description: "Designing and implementing RESTful APIs for seamless application connectivity."
      },
      { 
        icon: <Rocket className="h-8 w-8 text-accent" />, 
        title: "Cloud Solutions",
        description: "Developing scalable applications using AWS and other cloud platforms."
      }
    ]
  };

  // Theme based on the active role
  const roleTheme = {
    data: {
      gradient: "from-blue-500 to-purple-600",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&h=800",
      alt: "Data visualization abstract"
    },
    sde: {
      gradient: "from-green-500 to-blue-600",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&h=800",
      alt: "Software development concept"
    }
  };

  return (
    <section id="about" className="py-20 bg-gray-50 dark:bg-gray-900 transition-colors duration-300 overflow-hidden relative">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-secondary/5 rounded-full translate-x-1/4 translate-y-1/4 blur-3xl"></div>
      
      <div className="container mx-auto px-4">
        <h2 className="section-heading reveal">About Me</h2>
        
        {/* Role selector */}
        <div className="max-w-md mx-auto bg-white dark:bg-gray-800 p-1 rounded-full flex justify-between shadow-md mb-12 reveal">
          <button
            onClick={() => setActiveRole("data")}
            className={`rounded-full py-3 px-6 text-sm md:text-base font-medium transition-all duration-300 flex-1 ${
              activeRole === "data" 
                ? "bg-gradient-to-r from-primary to-accent text-white" 
                : "hover:bg-gray-100 dark:hover:bg-gray-700"
            }`}
          >
            Data Analyst / Scientist
          </button>
          <button
            onClick={() => setActiveRole("sde")}
            className={`rounded-full py-3 px-6 text-sm md:text-base font-medium transition-all duration-300 flex-1 ${
              activeRole === "sde" 
                ? "bg-gradient-to-r from-secondary to-primary text-white" 
                : "hover:bg-gray-100 dark:hover:bg-gray-700"
            }`}
          >
            Software Engineer
          </button>
        </div>
        
        <div className="max-w-6xl mx-auto">
          {/* Main content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Left side - profile image and visual elements */}
            <div className="relative reveal">
              <div className={`absolute inset-0 bg-gradient-to-br ${roleTheme[activeRole].gradient} opacity-20 rounded-3xl blur-xl transition-all duration-500`}></div>
              
              <div className="relative bg-white dark:bg-gray-800 p-6 shadow-xl rounded-3xl overflow-hidden hover-card">
                <div className="relative z-10">
                  <div className="w-full h-64 md:h-80 overflow-hidden rounded-xl mb-6">
                    <img 
                      src={roleTheme[activeRole].image}
                      alt={roleTheme[activeRole].alt}
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                    />
                  </div>
                  
                  {/* Personal details */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <Sparkles className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-bold text-xl">Payal</h3>
                        <p className="text-gray-600 dark:text-gray-400">
                          {activeRole === "data" ? "Data Analyst & Scientist" : "Software Engineer"}
                        </p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mt-6 text-center">
                      <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded-xl">
                        <h4 className="font-bold">Location</h4>
                        <p className="text-gray-600 dark:text-gray-400">Windsor, Ontario</p>
                      </div>
                      <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded-xl">
                        <h4 className="font-bold">Experience</h4>
                        <p className="text-gray-600 dark:text-gray-400">4+ Years</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right side - content */}
            <div className="flex flex-col justify-center reveal">
              <div className={`p-1 w-fit rounded-full bg-gradient-to-r ${
                activeRole === "data" ? "from-blue-500 to-purple-600" : "from-green-500 to-blue-600"
              } mb-6`}>
                <div className="bg-white dark:bg-gray-800 px-4 py-1 rounded-full">
                  <span className={`font-medium ${
                    activeRole === "data" ? "text-blue-600 dark:text-blue-400" : "text-green-600 dark:text-green-400"
                  }`}>
                    {activeRole === "data" ? "Data Specialist" : "Software Developer"}
                  </span>
                </div>
              </div>
              
              <h3 className="text-3xl font-bold mb-6">
                I'm a passionate {activeRole === "data" ? "data professional" : "software engineer"} with expertise in
                <span className={activeRole === "data" ? " text-blue-600 dark:text-blue-400" : " text-green-600 dark:text-green-400"}>
                  {activeRole === "data" ? " analytics & machine learning" : " full-stack development"}
                </span>
              </h3>
              
              <div className="space-y-4 mb-8">
                {resumeData.roles[activeRole].points.map((point, index) => (
                  <div key={`${activeRole}-point-${index}`} className="flex items-start">
                    <ChevronRight className={`h-5 w-5 mt-1 mr-2 flex-shrink-0 ${
                      activeRole === "data" ? "text-blue-500" : "text-green-500"
                    }`} />
                    <p className="text-gray-700 dark:text-gray-300">{point}</p>
                  </div>
                ))}
              </div>
              
              {/* Features */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                {roleFeatures[activeRole].map((feature, index) => (
                  <div key={`feature-${index}`} className="bg-gray-50 dark:bg-gray-800 p-5 rounded-xl hover:shadow-md transition-all duration-300">
                    <div className="mb-3">{feature.icon}</div>
                    <h4 className="font-bold text-lg mb-2">{feature.title}</h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">{feature.description}</p>
                  </div>
                ))}
              </div>
              
              {/* CTA */}
              <div className="mt-8">
                <Button 
                  asChild
                  className={`rounded-full ${
                    activeRole === "data" 
                      ? "bg-gradient-to-r from-blue-500 to-purple-600" 
                      : "bg-gradient-to-r from-green-500 to-blue-600"
                  } text-white hover:shadow-lg group`}
                >
                  <a href="#skills">
                    View My Skills
                    <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
