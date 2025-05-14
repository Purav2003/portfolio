import React, { useState } from "react";
import { resumeData } from "@/data/resume";
import { 
  Briefcase, 
  Code, 
  Cloud, 
  GraduationCap,
  Building,
  Calendar,
  CheckCircle
} from "lucide-react";

// ExperienceCard component for individual experience items
const ExperienceCard: React.FC<{
  title: string;
  company: string;
  period: string;
  details: string[];
  icon: React.ReactNode;
  type: string;
  index: number;
}> = ({ title, company, period, details, icon, type, index }) => {
  const delay = index * 0.1;
  const isWork = !type.includes("education");
  
  return (
    <div 
      className={`bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 hover-card mb-6 reveal`}
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="flex items-start gap-4">
        <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 
          ${isWork ? 'bg-primary/10 text-primary' : 'bg-secondary/10 text-secondary'}`}>
          {icon}
        </div>
        
        <div className="flex-grow">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 mb-4">
            <div>
              <h3 className="text-xl font-bold">{title}</h3>
              <div className="flex items-center text-gray-600 dark:text-gray-400 mt-1">
                <Building size={16} className="mr-1" />
                <span>{company}</span>
              </div>
            </div>
            
            <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium 
              ${isWork ? 'bg-primary/10 text-primary' : 'bg-secondary/10 text-secondary'}`}>
              <Calendar size={14} className="mr-1" />
              {period}
            </div>
          </div>
          
          <ul className="space-y-2 mt-4">
            {details.map((detail, idx) => (
              <li 
                key={`detail-${idx}`} 
                className="flex items-start text-gray-700 dark:text-gray-300"
              >
                <CheckCircle size={18} className={`mt-1 mr-2 ${isWork ? 'text-primary' : 'text-secondary'} flex-shrink-0`} />
                <span>{detail}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

const Experience: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'work' | 'education'>('work');
  
  // Filter experiences based on the active tab
  const workExperiences = resumeData.experiences.filter(exp => !exp.type.includes("education"));
  const educationExperiences = resumeData.experiences.filter(exp => exp.type.includes("education"));
  
  // Map icons to experience type
  const getIcon = (type: string) => {
    switch (type) {
      case "work-epm":
        return <Briefcase size={22} />;
      case "work-ml":
        return <Code size={22} />;
      case "work-salesforce":
        return <Cloud size={22} />;
      case "education-masters":
      case "education-bachelors":
        return <GraduationCap size={22} />;
      default:
        return <Briefcase size={22} />;
    }
  };

  return (
    <section id="experience" className="py-20 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <h2 className="section-heading reveal">Experience & Education</h2>
        
        {/* Tabs for switching between work and education */}
        <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-full p-1 flex mb-12 shadow-md reveal">
          <button
            className={`flex-1 py-2 px-4 rounded-full text-center transition-all duration-300 ${
              activeTab === 'work' 
                ? 'bg-primary text-white font-medium' 
                : 'hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
            onClick={() => setActiveTab('work')}
          >
            <span className="flex items-center justify-center gap-2">
              <Briefcase size={18} />
              Work Experience
            </span>
          </button>
          
          <button
            className={`flex-1 py-2 px-4 rounded-full text-center transition-all duration-300 ${
              activeTab === 'education' 
                ? 'bg-secondary text-white font-medium' 
                : 'hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
            onClick={() => setActiveTab('education')}
          >
            <span className="flex items-center justify-center gap-2">
              <GraduationCap size={18} />
              Education
            </span>
          </button>
        </div>
        
        <div className="max-w-3xl mx-auto">
          {activeTab === 'work' ? (
            <div className="space-y-6 reveal">
              <div className="text-center mb-10">
                <h3 className="text-2xl font-bold mb-2">Professional Journey</h3>
                <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                  My career path showcasing roles and responsibilities in various organizations.
                </p>
              </div>
              
              {workExperiences.map((exp, index) => (
                <ExperienceCard
                  key={`work-${index}`}
                  title={exp.title}
                  company={exp.organization}
                  period={exp.period}
                  details={exp.details}
                  icon={getIcon(exp.type)}
                  type={exp.type}
                  index={index}
                />
              ))}
            </div>
          ) : (
            <div className="space-y-6 reveal">
              <div className="text-center mb-10">
                <h3 className="text-2xl font-bold mb-2">Educational Background</h3>
                <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                  My academic qualifications and educational achievements.
                </p>
              </div>
              
              {educationExperiences.map((exp, index) => (
                <ExperienceCard
                  key={`education-${index}`}
                  title={exp.title}
                  company={exp.organization}
                  period={exp.period}
                  details={exp.details}
                  icon={getIcon(exp.type)}
                  type={exp.type}
                  index={index}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Experience;
