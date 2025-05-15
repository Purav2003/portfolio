import React, { useState, useEffect } from "react";
import { resumeData } from "../data/resume";
import { 
  Code, 
  LineChart, 
  Database, 
  PieChart, 
  Laptop, 
  Cloud,
  Award
} from "lucide-react";
import { 
  SiPython, SiJavascript, SiReact, 
  SiPandas, SiNumpy, SiScikitlearn, SiTensorflow, 
  SiMysql, SiPostgresql, SiMongodb, SiApachespark, 
  SiTableau, 
  SiNodedotjs, SiExpress, SiTailwindcss, SiFastapi, 
  SiSalesforce, SiGit, SiLinux
} from "react-icons/si";
import { FaJava, FaTerminal, FaMicrosoft } from "react-icons/fa";

// Map skill names to icons
const skillIcons: Record<string, JSX.Element> = {
  // Programming
  "Python": <SiPython size={32} />,
  "JavaScript/React": <SiReact size={32} />,
  "Java": <FaJava size={32} />,
  "Bash Scripting": <FaTerminal size={32} />,
  
  // Data Analysis & ML
  "Pandas/NumPy": <SiPandas size={32} />,
  "Scikit-learn": <SiScikitlearn size={32} />,
  "TensorFlow": <SiTensorflow size={32} />,
  "Matplotlib/Seaborn": <SiPython size={32} />,
  
  // Databases
  "MySQL/PostgreSQL": <SiPostgresql size={32} />,
  "MongoDB": <SiMongodb size={32} />,
  "ETL Processes": <SiApachespark size={32} />,
  "Spark SQL/Hadoop": <SiApachespark size={32} />,
  
  // Data Visualization
  "Tableau": <SiTableau size={32} />,
  "Power BI": <FaMicrosoft size={32} />,
  "Excel": <FaMicrosoft size={32} />,
  "Board": <SiTableau size={32} />,
  
  // Web Tech
  "React.js": <SiReact size={32} />,
  "Node.js/Express": <SiNodedotjs size={32} />,
  "CSS/Bootstrap/Tailwind": <SiTailwindcss size={32} />,
  "FastAPI": <SiFastapi size={32} />,
  
  // Other Tools
  "Salesforce Administration": <SiSalesforce size={32} />,
  "Workflows/Screen-Flows": <SiSalesforce size={32} />,
  "Unix/Command Line": <SiLinux size={32} />,
  "Git/Version Control": <SiGit size={32} />
};

interface SkillCategoryProps {
  title: string;
  icon: React.ReactNode;
  skills: Array<{ name: string; level: number }>;
  colorClass: string;
  index: number;
}

const SkillCategory: React.FC<SkillCategoryProps> = ({ 
  title, 
  icon, 
  skills, 
  colorClass,
  index
}) => {
  const [isInView, setIsInView] = useState(false);
  
  useEffect(() => {
    // Add delay for staggered animation
    const timer = setTimeout(() => {
      setIsInView(true);
    }, index * 200);
    
    return () => clearTimeout(timer);
  }, [index]);

  return (
    <div className={`bg-gray-50 dark:bg-gray-800 p-6 rounded-xl shadow-lg hover-card reveal
      ${isInView ? 'reveal-visible' : ''}`}>
      <div className="flex items-center mb-6">
        <div className={`w-12 h-12 flex items-center justify-center rounded-full bg-${colorClass}/10 text-${colorClass} mr-4`}>
          {icon}
        </div>
        <h3 className="text-xl font-semibold">{title}</h3>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        {skills.map((skill, idx) => (
          <div 
            key={`${title}-skill-${idx}`} 
            className={`flex flex-col items-center justify-center p-4 rounded-xl 
              bg-white dark:bg-gray-900 hover:bg-${colorClass}/5 transition-all duration-300
              ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            style={{ transitionDelay: `${idx * 100}ms` }}
          >
            <div className={`w-16 h-16 rounded-full mb-3 flex items-center justify-center 
              bg-${colorClass}/10 text-${colorClass} transform transition-transform duration-500 hover:scale-110`}>
              {skillIcons[skill.name] || <Code size={32} />}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Section for skill categories
const TechnologiesGrid: React.FC = () => {
  const allSkills = [
    ...resumeData.skills.programming,
    ...resumeData.skills.dataAnalysis,
    ...resumeData.skills.databases,
    ...resumeData.skills.webTech
  ];
  
  // Sort by level to show most proficient first
  const sortedSkills = [...allSkills].sort((a, b) => b.level - a.level).slice(0, 12);
  
  return (
    <div className="max-w-5xl mx-auto mt-16 reveal">
      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {sortedSkills.map((skill, idx) => (
          <div 
            key={`top-skill-${idx}`} 
            className="flex flex-col items-center group"
          >
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/10 to-accent/10 
              dark:from-primary/20 dark:to-accent/20 flex items-center justify-center 
              shadow-lg transition-all duration-500 transform group-hover:scale-110 group-hover:shadow-xl mb-3">
              {skillIcons[skill.name] || <Code size={40} className="text-primary" />}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Skills: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  
  const skillsCategories = [
    {
      id: "programming",
      title: "Programming & Scripting",
      icon: <Code size={24} />,
      skills: resumeData.skills.programming,
      colorClass: "primary"
    },
    {
      id: "data",
      title: "Data Analysis & ML",
      icon: <LineChart size={24} />,
      skills: resumeData.skills.dataAnalysis,
      colorClass: "secondary"
    },
    {
      id: "databases",
      title: "Databases & Data Engineering",
      icon: <Database size={24} />,
      skills: resumeData.skills.databases,
      colorClass: "accent"
    },
    {
      id: "visualization",
      title: "Data Visualization & BI",
      icon: <PieChart size={24} />,
      skills: resumeData.skills.dataVisualization,
      colorClass: "primary"
    },
    {
      id: "web",
      title: "Web Technologies",
      icon: <Laptop size={24} />,
      skills: resumeData.skills.webTech,
      colorClass: "secondary"
    },
    {
      id: "other",
      title: "Salesforce & Other Tools",
      icon: <Cloud size={24} />,
      skills: resumeData.skills.otherTools,
      colorClass: "accent"
    }
  ];
  
  // Filter skills based on active category
  const filteredCategories = activeCategory === 'all' 
    ? skillsCategories 
    : skillsCategories.filter(cat => cat.id === activeCategory);

  return (
    <section id="skills" className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <h2 className="section-heading reveal">Technologies & Skills</h2>
        
        <TechnologiesGrid />
        
        {/* Category tabs */}
        <div className="flex flex-wrap justify-center mt-20 mb-12 gap-3 reveal">
          <button 
            className={`px-5 py-2 rounded-full transition-all duration-300 ${
              activeCategory === 'all' 
                ? 'bg-primary text-white shadow-md' 
                : 'bg-gray-100 dark:bg-gray-800 hover:bg-primary/10'
            }`}
            onClick={() => setActiveCategory('all')}
          >
            All Categories
          </button>
          
          {skillsCategories.map((category) => (
            <button 
              key={category.id}
              className={`px-5 py-2 rounded-full transition-all duration-300 ${
                activeCategory === category.id 
                  ? 'bg-primary text-white shadow-md' 
                  : 'bg-gray-100 dark:bg-gray-800 hover:bg-primary/10'
              }`}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.title}
            </button>
          ))}
        </div>
        
        {/* Skills by category */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {filteredCategories.map((category, index) => (
            <SkillCategory 
              key={`skill-category-${index}`}
              title={category.title}
              icon={category.icon}
              skills={category.skills}
              colorClass={category.colorClass}
              index={index}
            />
          ))}
        </div>
        
        {/* Certifications */}
        <div className="mt-20 max-w-3xl mx-auto bg-gray-50 dark:bg-gray-800 p-8 rounded-xl shadow-lg reveal">
          <h3 className="text-2xl font-bold mb-6 text-center text-primary flex items-center justify-center gap-2">
            <Award className="h-6 w-6" />
            Professional Certifications
          </h3>
          <div className="space-y-4">
            {resumeData.certifications.map((cert, index) => (
              <div 
                key={`cert-${index}`} 
                className="flex items-start p-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300"
              >
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary mr-4">
                  <span className="font-bold">{index + 1}</span>
                </div>
                <div>
                  <h4 className="font-semibold text-lg">{cert.name}</h4>
                  <div className="flex flex-wrap items-center text-sm text-gray-600 dark:text-gray-400 mt-1">
                    <span className="mr-3">{cert.issuer}</span>
                    <span className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs">{cert.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
