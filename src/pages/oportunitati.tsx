import { useState } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import MainLayout from '../components/layout/MainLayout';

// Types for our opportunities
type Opportunity = {
  id: string;
  title: string;
  description: string;
  deadline: string;
  isActive: boolean;
  category: 'scholarship' | 'internship' | 'competition' | 'volunteer' | 'other';
  link?: string;
};

// Sample data - in a real app, this would come from a CMS or API
const opportunities: Opportunity[] = [
  {
    id: '1',
    title: 'Bursă de Excelență pentru Tineri Talenți',
    description: 'Oportunitate unică pentru studenții excepționali să-și continue studiile cu sprijin financiar.',
    deadline: '2024-06-30',
    isActive: true,
    category: 'scholarship',
    link: '#'
  },
  {
    id: '2',
    title: 'Internship la Google',
    description: 'Program de internship pentru studenți pasionați de tehnologie și inovație.',
    deadline: '2024-05-15',
    isActive: true,
    category: 'internship',
    link: '#'
  },
  {
    id: '3',
    title: 'Concurs de Inovație Socială',
    description: 'Concurs pentru tineri cu idei inovatoare care pot rezolva probleme sociale.',
    deadline: '2024-04-30',
    isActive: true,
    category: 'competition',
    link: '#'
  },
];

const categories = [
  { id: 'all', label: 'Toate' },
  { id: 'scholarship', label: 'Burse' },
  { id: 'internship', label: 'Internship-uri' },
  { id: 'competition', label: 'Concursuri' },
  { id: 'volunteer', label: 'Voluntariat' },
  { id: 'other', label: 'Altele' },
];

export default function Opportunities() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredOpportunities = opportunities.filter(opp => {
    const matchesCategory = selectedCategory === 'all' || opp.category === selectedCategory;
    const matchesSearch = opp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         opp.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <MainLayout>
      <Head>
        <title>Oportunități pentru Tineri | CTR</title>
        <meta name="description" content="Descoperă oportunități pentru tineri în România - burse, internship-uri, concursuri și multe altele." />
      </Head>

      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-primary to-secondary py-24 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-secondary/90" />
          <div className="absolute inset-0 bg-[url('/assets/pattern.svg')] opacity-10" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-bold text-white mb-6"
            >
              Oportunități pentru Tineri
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-8"
            >
              Descoperă cele mai bune oportunități pentru dezvoltarea ta personală și profesională
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap justify-center gap-4"
            >
              {categories.slice(1).map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors duration-200"
                >
                  {category.label}
                </button>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Search Bar */}
          <div className="mb-8">
            <div className="flex justify-center">
              <div className="relative w-full max-w-xl">
                <input
                  type="text"
                  placeholder="Caută oportunități..."
                  className="w-full px-6 py-4 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent shadow-sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Opportunities Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredOpportunities.map((opportunity, index) => (
              <motion.div
                key={opportunity.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-6 border border-gray-100"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {opportunity.title}
                  </h3>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium
                      ${opportunity.isActive
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                      }`}
                  >
                    {opportunity.isActive ? 'Activ' : 'Expirat'}
                  </span>
                </div>
                
                <p className="text-gray-600 mb-4">
                  {opportunity.description}
                </p>
                
                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-500">
                    Termen limită: {new Date(opportunity.deadline).toLocaleDateString('ro-RO')}
                  </div>
                  {opportunity.link && (
                    <a
                      href={opportunity.link}
                      className="text-primary hover:text-primary/80 font-medium inline-flex items-center"
                    >
                      Află mai multe
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {filteredOpportunities.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                Nu am găsit oportunități care să corespundă criteriilor tale.
              </p>
            </div>
          )}
        </div>
      </main>
    </MainLayout>
  );
} 