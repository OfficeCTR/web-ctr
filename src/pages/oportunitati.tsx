import { useState } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { GetStaticProps } from 'next';
import MainLayout from '../components/layout/MainLayout';
import PageHero from '../components/PageHero';
import { getOpportunities, type Opportunity } from '../utils/googleSheets';
import OpportunityModal from '../components/OpportunityModal';
import { opportunityCategories } from '../content/data';

interface OpportunitiesProps {
  initialOpportunities: Opportunity[];
  fetchError?: string;
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    const data = await getOpportunities();
    const serializedData = JSON.parse(JSON.stringify(data));
    
    return {
      props: {
        initialOpportunities: serializedData,
      },
      revalidate: 60,
    };
  } catch (err) {
    console.error('Error loading opportunities:', err);
    return {
      props: {
        initialOpportunities: [],
        fetchError: 'Nu am putut încărca oportunitățile. Vă rugăm să încercați din nou mai târziu.',
      },
      revalidate: 3600,
    };
  }
};

export default function Opportunities({ initialOpportunities, fetchError }: OpportunitiesProps) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOpportunity, setSelectedOpportunity] = useState<Opportunity | null>(null);

  const filteredOpportunities = initialOpportunities.filter(opp => {
    const matchesCategory = selectedCategory === 'all' || opp.category === selectedCategory;
    const matchesSearch = opp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         opp.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <MainLayout>
      <Head>
        <title>Oportunități pentru Tineri | CTR</title>
        <meta name="description" content="Descoperă cele mai bune oportunități pentru dezvoltarea ta personală și profesională" />
      </Head>

      {/* Hero Section */}
      <PageHero 
        title="Oportunități"
        description="Oportunități pentru tine, organizația ta și comunitatea ta"
      />

      {/* Main Content */}
      <main className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          
          {/* Categories */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {opportunityCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-full transition-all duration-200 font-medium shadow-sm
                  ${selectedCategory === category.id
                    ? 'bg-primary text-white shadow-md'
                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                  }`}
              >
                {category.label}
              </button>
            ))}
          </div>

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

          {/* Error State */}
          {fetchError && (
            <div className="text-center py-12">
              <p className="text-red-600">{fetchError}</p>
            </div>
          )}

          {/* Opportunities Grid */}
          {!fetchError && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredOpportunities.map((opportunity) => (
                <div
                  key={opportunity.id}
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
                    {opportunity.shortDescription}
                  </p>
                  
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-gray-500">
                      Termen limită: {new Date(opportunity.deadline).toLocaleDateString('ro-RO')}
                    </div>
                    <button
                      onClick={() => setSelectedOpportunity(opportunity)}
                      className="text-primary hover:text-primary/80 font-medium inline-flex items-center"
                    >
                      Află mai multe
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {!fetchError && filteredOpportunities.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                Nu am găsit oportunități care să corespundă criteriilor tale.
              </p>
            </div>
          )}
        </div>
      </main>

      {/* Opportunity Modal */}
      <OpportunityModal
        opportunity={selectedOpportunity}
        onClose={() => setSelectedOpportunity(null)}
      />
    </MainLayout>
  );
} 