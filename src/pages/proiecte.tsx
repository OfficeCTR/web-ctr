import { useState } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import MainLayout from '~/components/layout/MainLayout';
import PageHero from '~/components/PageHero';
import ProjectModal from '~/components/ProjectModal';
import Image from 'next/image';
import { sampleProjects, type Project } from '~/content/data';

// Color themes for year sections
const yearColorThemes: Record<number, { gradient: string; badge: string }> = {
  2025: { gradient: 'from-purple-500 to-primary', badge: 'bg-purple-500' },
  2024: { gradient: 'from-blue-500 to-cyan-400', badge: 'bg-blue-500' },
  2023: { gradient: 'from-teal-500 to-green-400', badge: 'bg-teal-500' },
  2022: { gradient: 'from-yellow-500 to-amber-400', badge: 'bg-yellow-500' },
  2021: { gradient: 'from-orange-500 to-red-400', badge: 'bg-orange-500' },
  2020: { gradient: 'from-rose-500 to-pink-400', badge: 'bg-rose-500' },
  2019: { gradient: 'from-purple-500 to-indigo-400', badge: 'bg-purple-500' },
  2018: { gradient: 'from-indigo-500 to-blue-400', badge: 'bg-indigo-500' },
  2017: { gradient: 'from-green-500 to-teal-400', badge: 'bg-green-500' },
  2016: { gradient: 'from-secondary to-amber-400', badge: 'bg-secondary' },
};

// Helper function to get color theme for a year
const getYearColorTheme = (year: number) => {
  return yearColorThemes[year] || { gradient: 'from-primary to-secondary', badge: 'bg-primary' };
};

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeYear, setActiveYear] = useState('all');
  
  // Get all unique years from projects data, sorted in descending order
  const years = Array.from(new Set(sampleProjects.map(project => project.year))).sort((a, b) => b - a);
  
  // Filter projects by selected year or show all if 'all' is selected
  const filteredProjects = activeYear === 'all' 
    ? sampleProjects 
    : sampleProjects.filter(project => project.year === parseInt(activeYear));

  // Group projects by year for display
  const projectsByYear = years.reduce<Record<number, Project[]>>((acc, year) => {
    acc[year] = sampleProjects.filter(project => project.year === year);
    return acc;
  }, {});

  // Function to add a new project (would be implemented with API call in production)
  const addProject = (newProject: Omit<Project, 'id'>) => {
    // In a real application, this would be an API call
    // For now, this is a placeholder to show how you would add a project
    const projectWithId = {
      ...newProject,
      id: Date.now().toString(), // Generate a unique ID
    };
    
    // Here you would call an API endpoint to save the project
    console.log('Adding new project:', projectWithId);
    
    // Return the new project with ID
    return projectWithId;
  };

  return (
    <MainLayout>
      <Head>
        <title>Proiecte | CTR</title>
        <meta name="description" content="Descoperă proiectele implementate de organizația noastră de tineret de-a lungul anilor." />
      </Head>

      {/* Hero Section */}
      <PageHero 
        title="Proiectele Noastre"
        description="Descoperă proiectele prin care facem o diferență în comunitățile noastre"
      />

      {/* Timeline Section */}
      <div className="relative bg-gray-50 pt-12 pb-8 overflow-hidden border-b border-gray-200">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            
            {/* Interactive Timeline */}
            <div className="relative">
              {/* Line connecting all years */}
              <div className="absolute left-0 right-0 h-1 bg-gray-300 top-1/2 transform -translate-y-1/2 hidden md:block"></div>
              
              <div className="flex items-center justify-between relative px-4 max-w-5xl mx-auto overflow-x-auto md:overflow-visible pb-4 md:pb-0 scrollbar-hide">
                {/* All button first */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveYear('all')}
                  className={`relative z-10 flex flex-col items-center mx-3 md:mx-0 flex-shrink-0`}
                >
                  <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all duration-300
                    ${activeYear === 'all' 
                      ? `bg-gradient-to-r from-primary to-secondary shadow-lg text-white ring-2 ring-offset-2 ring-primary` 
                      : 'bg-white border-2 border-gray-300 text-gray-500 hover:border-primary hover:text-primary'}`}>
                    <span className="font-bold text-xs md:text-sm">All</span>
                  </div>
                  <span className={`mt-2 text-sm md:text-base font-medium ${activeYear === 'all' ? 'text-primary' : 'text-gray-500'}`}>
                    Toate
                  </span>
                </motion.button>
                
                {/* Year buttons */}
                {years.map((year, index) => {
                  const colorTheme = getYearColorTheme(year);
                  const isActive = activeYear === year.toString();
                  
                  return (
                    <motion.button
                      key={year}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setActiveYear(year.toString())}
                      className={`relative z-10 flex flex-col items-center mx-3 md:mx-0 flex-shrink-0`}
                    >
                      <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center shadow-sm transition-all duration-300
                      ${isActive 
                        ? `bg-gradient-to-r ${colorTheme.gradient} shadow-lg text-white ring-2 ring-offset-2 ring-${colorTheme.badge.replace('bg-', '')}` 
                        : 'bg-white border-2 border-gray-300 text-gray-500 hover:border-gray-400'}`}>
                        <span className="font-bold">
                          {year.toString().substring(2)}
                        </span>
                      </div>
                      <span className={`mt-2 text-sm md:text-base font-medium ${isActive ? 'text-gray-900' : 'text-gray-400'}`}>
                        {year}
                      </span>
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Projects Section */}
      <main className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {activeYear === 'all' ? (
            // Display projects grouped by year when "All" is selected
            years.map((year, yearIndex) => {
              const colorTheme = getYearColorTheme(year);
              
              return (
                <div key={year} className="mb-24 last:mb-0">
                  <div
                    className="relative mb-12"
                  >
                    {/* Decorative elements */}
                    <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 transform -translate-y-1/2"></div>
                    
                    <div className="relative flex justify-center">
                      <div className={`bg-gradient-to-r ${colorTheme.gradient} text-white px-8 py-4 rounded-xl text-2xl font-bold shadow-lg`}>
                        {year}
                      </div>
                    </div>
                    
                    {/* Year decoration */}
                    <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-8 h-8 rounded-full bg-gray-200"></div>
                    <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-8 h-8 rounded-full bg-gray-200"></div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projectsByYear[year].map((project, index) => (
                      <ProjectCard 
                        key={project.id} 
                        project={project} 
                        index={index}
                        colorTheme={colorTheme}
                        onClick={() => setSelectedProject(project)}
                      />
                    ))}
                  </div>
                </div>
              );
            })
          ) : (
            // Display only projects from selected year
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProjects.map((project, index) => {
                  const colorTheme = getYearColorTheme(project.year);
                  return (
                    <ProjectCard 
                      key={project.id} 
                      project={project} 
                      index={index}
                      colorTheme={colorTheme}
                      onClick={() => setSelectedProject(project)}
                    />
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </MainLayout>
  );
}

// Project Card Component
interface ProjectCardProps {
  project: Project;
  index: number;
  colorTheme: { gradient: string; badge: string };
  onClick: () => void;
}

const ProjectCard = ({ project, index, colorTheme, onClick }: ProjectCardProps) => {
  // Extract color name from badge class (e.g. "bg-primary" -> "primary")
  const colorName = colorTheme.badge.replace('bg-', '');
  
  return (
    <div
      className="group bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer h-full flex flex-col"
      onClick={onClick}
    >
      {/* Project Image */}
      <div className="relative h-48 overflow-hidden">
        {project.imageUrl ? (
          <Image
            src={project.imageUrl}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className={`absolute inset-0 bg-gradient-to-r ${colorTheme.gradient}`} />
        )}
        {/* Year Badge */}
        <div className={`absolute top-4 right-4 ${colorTheme.badge} text-white px-3 py-1 rounded-full text-sm font-medium shadow-md`}>
          {project.year}
        </div>
      </div>
      
      {/* Project Content */}
      <div className="p-6 flex-grow flex flex-col">
        <h3 className={`text-xl font-semibold mb-3 text-gray-900 group-hover:text-${colorName} transition-colors`}>
          {project.title}
        </h3>
        
        <p className="text-gray-600 mb-4 flex-grow">
          {project.shortDescription}
        </p>
        
        {/* Location and Details */}
        <div className="flex items-center text-sm text-gray-500 mb-4">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {project.location}
        </div>
        
        {/* Read More Button */}
        <button 
          className={`inline-flex items-center justify-center border border-${colorName}/30 bg-${colorName}/10 hover:bg-${colorName}/20 text-${colorName} font-medium px-4 py-2 rounded-lg transition-colors duration-200 mt-auto`}
        >
          Află mai multe
          <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
      </div>
    </div>
  );
}; 