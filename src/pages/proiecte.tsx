import { useState } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import MainLayout from '~/components/layout/MainLayout';
import ProjectModal from '~/components/ProjectModal';
import Image from 'next/image';

// Define Project type
export interface Project {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  year: number;
  location: string;
  duration: string;
  participants: string;
  impact: string;
  partners: string[];
  imageUrl: string;
  galleryImages: string[];
}

// Color themes for year sections
const yearColorThemes: Record<number, { gradient: string; badge: string }> = {
  2025: { gradient: 'from-primary to-purple-500', badge: 'bg-primary' },
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

// Sample project data - this would be replaced with actual data from an API or CMS
const sampleProjects: Project[] = [
  {
    id: '1',
    title: 'Maraton Ploiești',
    shortDescription: 'Maraton de dezvoltare locală dedicat identificării și soluționării problemelor tinerilor din Ploiești, organizat în cadrul Festivalului Democrației.',
    fullDescription: 'Maratonul Ploiești a fost o competiție de dezvoltare locală organizată în cadrul Festivalului Democrației, unde tineri din toată țara au colaborat pentru a identifica probleme ale tinerilor din Capitala Tineretului din România - Ploiești și pentru a propune soluții inovatoare. Participanții au fost sprijiniți de o echipă de mentori care i-au ajutat să își contureze soluțiile și să le prezinte unui juriu. BCR s-a angajat să finanțeze cele mai bune soluții identificate. Evenimentul a reunit tineri din Ploiești, care au contribuit cu experiența și cunoștințele lor locale, și tineri din alte orașe, care au adus perspective noi și modele de bună practică. După finalizarea concursului, echipa Consiliului Tineretului din România a sprijinit implementarea soluțiilor câștigătoare.',
    year: 2024,
    location: 'Ploiești, România',
    duration: '2 zile',
    participants: '100+ tineri din toată țara',
    impact: 'Identificarea problemelor tinerilor din Ploiești și dezvoltarea de soluții concrete finanțate de BCR, consolidarea spiritului civic și a colaborării între tineri.',
    partners: ['Consiliul Tineretului din România', 'BCR', 'Primăria Municipiului Ploiești', 'Capitala Tineretului din România'],
    imageUrl: '/assets/projects/maraton-ploiest1.jpg',
    galleryImages: [
      '/assets/projects/maraton-ploiest1.jpg',
      '/assets/projects/maraton-ploiest2.png',
      '/assets/projects/maraton-ploiest3.jpg',
    ]
  },
  {
    id: '2',
    title: 'Festivalul Democrației',
    shortDescription: 'Festival dedicat promovării valorilor democratice prin dezbateri și discuții cu și despre tineri, organizat în Ploiești - Capitala Tineretului din România.',
    fullDescription: 'Festivalul Democrației a fost un eveniment de două zile organizat în Ploiești, Capitala Tineretului din România, dedicat dezbaterilor și discuțiilor cu și despre tineri, pentru tineri. Evenimentul a inclus diverse activități interactive, printre care și Maratonul de dezvoltare locală susținut de BCR, unde participanții au colaborat pentru a identifica probleme ale tinerilor din Ploiești și pentru a găsi soluții. Pe parcursul festivalului, tinerii au beneficiat de sprijinul unei echipe de mentori care i-au ajutat să își contureze ideile și să le prezinte în fața unui juriu. Festivalul a reprezentat o platformă importantă pentru implicarea tinerilor în procesele democratice și în dezvoltarea comunității locale.',
    year: 2024,
    location: 'Ploiești, România',
    duration: '2 zile (5-6 aprilie)',
    participants: '200+ tineri',
    impact: 'Promovarea valorilor democratice și a participării civice în rândul tinerilor, identificarea și finanțarea de soluții pentru problemele tinerilor din Ploiești.',
    partners: ['Consiliul Tineretului din România', 'BCR', 'Primăria Municipiului Ploiești', 'Capitala Tineretului din România'],
    imageUrl: '/assets/projects/festivalul-democratiei.jpg',
    galleryImages: [
      '/assets/projects/festivalul-democratiei.jpg',
      '/assets/projects/festivalul-democratiei-2.jpg',
    ]
  },
  {
    id: '3',
    title: 'Erasmus+ Youth Exchange',
    shortDescription: 'Program de schimb de experiență pentru tineri din diferite țări europene, focusat pe dezvoltarea competențelor interculturale.',
    fullDescription: 'Programul Erasmus+ Youth Exchange oferă tinerilor oportunitatea de a participa la un schimb intercultural, de a învăța despre alte culturi, de a-și dezvolta competențe sociale și de comunicare, și de a crea conexiuni internaționale. Participanții iau parte la ateliere, activități de team-building, și proiecte comune care abordează teme relevante pentru tineri.',
    year: 2024,
    location: 'Multiple locații în Europa',
    duration: '2 săptămâni',
    participants: '30 tineri din 6 țări europene',
    impact: 'Dezvoltarea competențelor interculturale, lingvistice și sociale ale tinerilor participanți, crearea unei rețele internaționale de tineri.',
    partners: ['Comisia Europeană', 'Agenția Națională pentru Programe Comunitare în Domeniul Educației și Formării Profesionale', 'Organizații partenere din țările participante'],
    imageUrl: '/assets/projects/erasmus-youth-exchange.jpg',
    galleryImages: [
      '/assets/projects/erasmus-youth-exchange.jpg',
      '/assets/projects/erasmus-youth-exchange-2.jpg',
    ]
  },
  {
    id: '4',
    title: 'Maraton Târgu Jiu',
    shortDescription: 'Maraton organizat în Târgu Jiu pentru promovarea sportului și a unui stil de viață sănătos în rândul tinerilor.',
    fullDescription: 'Maratonul Târgu Jiu este un eveniment sportiv anual care aduce împreună tineri și adulți pasionați de alergare. Evenimentul include curse pentru diferite categorii de vârstă și niveluri de pregătire, oferind participanților oportunitatea de a se bucura de mișcare în aer liber, într-un cadru competitiv prietenos.',
    year: 2023,
    location: 'Târgu Jiu, România',
    duration: '1 zi',
    participants: '400+ alergători',
    impact: 'Promovarea sportului, a unui stil de viață sănătos și crearea unui spirit de comunitate în rândul tinerilor din Târgu Jiu.',
    partners: ['Primăria Municipiului Târgu Jiu', 'Consiliul Județean Gorj', 'Cluburi sportive locale'],
    imageUrl: '/assets/projects/maraton-targu-jiu.jpg',
    galleryImages: [
      '/assets/projects/maraton-targu-jiu.jpg',
      '/assets/projects/maraton-targu-jiu-2.jpg',
    ]
  },
  {
    id: '5',
    title: 'Summitul Tinerilor 2023',
    shortDescription: 'Eveniment anual care reunește tineri lideri și activiști pentru a discuta provocările actuale și pentru a dezvolta soluții inovatoare.',
    fullDescription: 'Summitul Tinerilor este un eveniment de referință care aduce împreună tineri lideri, activiști, antreprenori și factori de decizie pentru a dezbate probleme de interes pentru tineri și pentru a dezvolta soluții concrete. Prin sesiuni plenare, ateliere, și sesiuni de networking, participanții au oportunitatea de a-și împărtăși ideile, de a învăța unii de la alții și de a crea parteneriate.',
    year: 2023,
    location: 'Cluj-Napoca, România',
    duration: '3 zile',
    participants: '300 tineri lideri',
    impact: 'Facilitarea dialogului între tineri și factori de decizie, dezvoltarea de politici și inițiative bazate pe nevoile reale ale tinerilor.',
    partners: ['Ministerul Tineretului și Sportului', 'Primăria Cluj-Napoca', 'Universitatea Babeș-Bolyai'],
    imageUrl: '/assets/projects/summitul-tinerilor-2023.jpg',
    galleryImages: [
      '/assets/projects/summitul-tinerilor-2023.jpg',
      '/assets/projects/summitul-tinerilor-2023-2.jpg',
    ]
  },
  {
    id: '6',
    title: 'Summitul Tinerilor 2022',
    shortDescription: 'Ediția 2022 a Summitului Tinerilor, focusată pe tema sustenabilității și inovației digitale.',
    fullDescription: 'Ediția 2022 a Summitului Tinerilor a abordat teme precum sustenabilitatea, inovația digitală și incluziunea socială. Evenimentul a oferit o platformă pentru tinerii lideri de a discuta despre provocările globale actuale și de a dezvolta soluții inovatoare care să contribuie la construirea unui viitor mai sustenabil și incluziv.',
    year: 2022,
    location: 'Timișoara, România',
    duration: '3 zile',
    participants: '250 tineri lideri',
    impact: 'Crearea unei rețele de tineri inovatori, promovarea proiectelor sustenabile și stimularea colaborării intersectoriale.',
    partners: ['Ministerul Tineretului și Sportului', 'Primăria Timișoara', 'Universitatea de Vest din Timișoara'],
    imageUrl: '/assets/projects/summitul-tinerilor-2022.jpg',
    galleryImages: [
      '/assets/projects/summitul-tinerilor-2022.jpg',
      '/assets/projects/summitul-tinerilor-2022-2.jpg',
    ]
  },
  {
    id: '7',
    title: 'Summitul Tinerilor 2021',
    shortDescription: 'Ediția 2021 a Summitului Tinerilor, dedicată reconstrucției post-pandemie și rezilienței tinerilor.',
    fullDescription: 'În contextul provocărilor generate de pandemia COVID-19, ediția 2021 a Summitului Tinerilor s-a concentrat pe tema reconstrucției și a rezilienței. Evenimentul a oferit tinerilor un forum pentru a discuta despre impactul pandemiei asupra diferitelor aspecte ale vieții lor și pentru a dezvolta strategii de adaptare și recuperare.',
    year: 2021,
    location: 'București, România (format hibrid)',
    duration: '3 zile',
    participants: '200 tineri lideri (prezență fizică + online)',
    impact: 'Dezvoltarea de recomandări pentru politici publice post-pandemie axate pe tineri, sprijinirea reintegrării tinerilor în activități sociale și economice.',
    partners: ['Ministerul Tineretului și Sportului', 'Administrația Prezidențială', 'Organizația Mondială a Sănătății - Biroul pentru România'],
    imageUrl: '/assets/projects/summitul-tinerilor-2021.jpg',
    galleryImages: [
      '/assets/projects/summitul-tinerilor-2021.jpg',
      '/assets/projects/summitul-tinerilor-2021-2.jpg',
    ]
  },
  {
    id: '8',
    title: 'Summitul Tinerilor 2020',
    shortDescription: 'Ediția 2020 a Summitului Tinerilor, desfășurată în format online, cu focus pe adaptarea la provocările globale.',
    fullDescription: 'Ediția 2020 a Summitului Tinerilor s-a desfășurat în format complet online, adaptându-se la contextul pandemic. Summitul a abordat teme precum transformarea digitală, educația la distanță, sănătatea mintală și solidaritatea în vremuri de criză, oferind tinerilor un spațiu virtual pentru dialog și colaborare.',
    year: 2020,
    location: 'Online',
    duration: '5 zile',
    participants: '500 tineri (participare online)',
    impact: 'Facilitarea schimbului de bune practici pentru adaptarea tinerilor la criza COVID-19, susținerea inițiativelor digitale ale tinerilor.',
    partners: ['Ministerul Tineretului și Sportului', 'Ministerul Educației', 'Organizații internaționale pentru tineret'],
    imageUrl: '/assets/projects/summitul-tinerilor-2020.jpg',
    galleryImages: [
      '/assets/projects/summitul-tinerilor-2020.jpg',
      '/assets/projects/summitul-tinerilor-2020-2.jpg',
    ]
  },
  {
    id: '9',
    title: 'Summitul Tinerilor 2019',
    shortDescription: 'Ediția 2019 a Summitului Tinerilor, cu focus pe antreprenoriatul în rândul tinerilor și inovație socială.',
    fullDescription: 'Ediția 2019 a Summitului Tinerilor a pus accentul pe antreprenoriatul în rândul tinerilor și inovația socială, oferind participanților oportunitatea de a interacționa cu antreprenori de succes, de a participa la ateliere practice și de a-și dezvolta propriile idei de afaceri cu impact social.',
    year: 2019,
    location: 'Constanța, România',
    duration: '3 zile',
    participants: '250 tineri',
    impact: 'Stimularea spiritului antreprenorial în rândul tinerilor, sprijinirea start-up-urilor sociale și crearea unei rețele de tineri inovatori sociali.',
    partners: ['Ministerul Tineretului și Sportului', 'Primăria Constanța', 'Camera de Comerț și Industrie a României'],
    imageUrl: '/assets/projects/summitul-tinerilor-2019.jpg',
    galleryImages: [
      '/assets/projects/summitul-tinerilor-2019.jpg',
      '/assets/projects/summitul-tinerilor-2019-2.jpg',
    ]
  },
  {
    id: '10',
    title: 'Prima Capitală a Tineretului din România',
    shortDescription: 'Timișoara, prima Capitală a Tineretului din România, un proiect emblematic pentru implicarea și dezvoltarea tinerilor la nivel național.',
    fullDescription: 'În 2016, Timișoara a devenit prima Capitală a Tineretului din România, marcând începutul unei inițiative naționale dedicate tinerilor. Programul a inclus peste 100 de evenimente și proiecte pe parcursul unui an, toate concepute și implementate de și pentru tineri, transformând orașul într-un hub al activităților pentru tineret. Această inițiativă a pus bazele unui model care a continuat să fie implementat anual în diferite orașe din România.',
    year: 2016,
    location: 'Timișoara, România',
    duration: '1 an',
    participants: '10,000+ tineri beneficiari direcți',
    impact: 'Crearea unui model național pentru implicarea tinerilor în dezvoltarea comunităților, stimularea participării civice a tinerilor și dezvoltarea de politici publice pentru tineret la nivel local și național.',
    partners: ['Primăria Municipiului Timișoara', 'Consiliul Tineretului din România', 'Fundația Județeană pentru Tineret Timiș', 'Ministerul Tineretului și Sportului'],
    imageUrl: '/assets/projects/capitala-tineretului-2016.jpg',
    galleryImages: [
      '/assets/projects/capitala-tineretului-2016.jpg',
      '/assets/projects/capitala-tineretului-2016-2.jpg',
    ]
  },
  {
    id: '11',
    title: 'Summitul Tinerilor X "Încotro?"',
    shortDescription: 'tbd',
    fullDescription: 'tbd',
    year: 2025,
    location: 'Vaslui, România',
    duration: '5 zile',
    participants: '240+ tineri beneficiari direcți',
    impact: '',
    partners: ['Primăria Municipiului Vaslui', 'Consiliul Tineretului din România', 'Federația Tinerilor din Județul Vaslui'],
    imageUrl: '/assets/projects/placeholder.jpg',
    galleryImages: [
        '/assets/projects/placeholder.jpg',
        '/assets/projects/placeholder-2.jpg',
    ]
  }
];

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

      {/* Hero Section with Interactive Timeline */}
      <div className="relative bg-gray-900 py-24 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gray-900/90" />
          <div className="absolute inset-0 bg-[url('/assets/pattern.svg')] opacity-10" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Proiectele Noastre
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-12">
              Descoperă proiectele prin care facem o diferență în comunitățile noastre
            </p>
            
            {/* Interactive Timeline */}
            <div className="relative mt-16">
              {/* Line connecting all years */}
              <div className="absolute left-0 right-0 h-1 bg-gray-700 top-1/2 transform -translate-y-1/2 hidden md:block"></div>
              
              <div className="flex items-center justify-between relative px-4 max-w-5xl mx-auto overflow-x-auto md:overflow-visible pb-4 md:pb-0 scrollbar-hide">
                {/* All button first */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveYear('all')}
                  className={`relative z-10 flex flex-col items-center mx-3 md:mx-0 flex-shrink-0`}
                >
                  <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center 
                    ${activeYear === 'all' 
                      ? `bg-gradient-to-r from-primary to-secondary shadow-lg` 
                      : 'bg-gray-700 hover:bg-gray-600'}`}>
                    <span className="text-white font-bold text-xs md:text-sm">All</span>
                  </div>
                  <span className={`mt-2 text-sm md:text-base font-medium ${activeYear === 'all' ? 'text-white' : 'text-gray-400'}`}>
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
                      <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center shadow-md
                      ${isActive 
                        ? `bg-gradient-to-r ${colorTheme.gradient} shadow-lg shadow-${colorTheme.badge}/30` 
                        : 'bg-gray-700 hover:bg-gray-600'}`}>
                        <span className="text-white font-bold">
                          {year.toString().substring(2)}
                        </span>
                      </div>
                      <span className={`mt-2 text-sm md:text-base font-medium ${isActive ? 'text-white' : 'text-gray-400'}`}>
                        {year}
                      </span>
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </motion.div>
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
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: yearIndex * 0.1 }}
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
                  </motion.div>
                  
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
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
    </motion.div>
  );
}; 