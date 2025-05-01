import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { motion } from 'framer-motion';
import MainLayout from '../components/layout/MainLayout';

// Define organization types as per the old website
const organizationTypes = [
  'international',
  'national',
  'regional'
];

interface Organization {
  id: number;
  name: string;
  type: string;
  region?: string;
  logo: string;
}

// Organization data based on the old website content
const organizations: Organization[] = [
  // International Organizations
  {
    id: 1,
    name: 'AEGEE',
    type: 'international',
    logo: '/assets/organizations/placeholder.png'
  },
  {
    id: 2,
    name: 'AIESEC',
    type: 'international',
    logo: '/assets/organizations/placeholder.png'
  },
  
  // National Organizations
  {
    id: 3,
    name: 'Alianța Națională a Organizațiilor Studențești din România (ANOSR)',
    type: 'national',
    logo: '/assets/organizations/placeholder.png'
  },
  {
    id: 4,
    name: 'Asociația Cercetașii României',
    type: 'national',
    logo: '/assets/organizations/placeholder.png'
  },
  {
    id: 5,
    name: 'Consiliul Național al Elevilor (CNE)',
    type: 'national',
    logo: '/assets/organizations/placeholder.png'
  },
  {
    id: 6,
    name: 'Federația Organizațiilor Neguvernamentale de Tineret (FONT)',
    type: 'national',
    logo: '/assets/organizations/placeholder.png'
  },
  {
    id: 7,
    name: 'Uniunea Studenților din România (USR)',
    type: 'national',
    logo: '/assets/organizations/placeholder.png'
  },
  {
    id: 8,
    name: 'Uniunea Națională a Studenților din România (UNSR)',
    type: 'national',
    logo: '/assets/organizations/placeholder.png'
  },
  
  // Regional/County Organizations
  {
    id: 9,
    name: 'Federația Tinerilor din Bacău',
    type: 'regional',
    region: 'BACĂU',
    logo: '/assets/organizations/placeholder.png'
  },
  {
    id: 10,
    name: 'Federația Asociațiilor de Tineret din Botoșani',
    type: 'regional',
    region: 'BOTOȘANI',
    logo: '/assets/organizations/placeholder.png'
  },
  {
    id: 11,
    name: 'Federația Organizațiilor Neguvernamentale de Tineret din București',
    type: 'regional',
    region: 'BUCUREȘTI',
    logo: '/assets/organizations/placeholder.png'
  },
  {
    id: 12,
    name: 'Federația Tinerilor din Cluj',
    type: 'regional',
    region: 'CLUJ',
    logo: '/assets/organizations/placeholder.png'
  },
  {
    id: 13,
    name: 'Asociația Județeană de Tineret Covasna',
    type: 'regional',
    region: 'COVASNA',
    logo: '/assets/organizations/placeholder.png'
  },
  {
    id: 14,
    name: 'Forumul Tinerilor din Dâmbovița',
    type: 'regional',
    region: 'DÂMBOVIȚA',
    logo: '/assets/organizations/placeholder.png'
  },
  {
    id: 15,
    name: 'Forumul Tinerilor din Gorj',
    type: 'regional',
    region: 'GORJ',
    logo: '/assets/organizations/placeholder.png'
  },
  {
    id: 16,
    name: 'Consiliul Județean al Tinerilor din Maramureș',
    type: 'regional',
    region: 'MARAMUREȘ',
    logo: '/assets/organizations/placeholder.png'
  },
  {
    id: 17,
    name: 'Asociația Județeană a Tinerilor din Mehedinți',
    type: 'regional',
    region: 'MEHEDINȚI',
    logo: '/assets/organizations/placeholder.png'
  },
  {
    id: 18,
    name: 'Asociația Județeană de Tineret Olt',
    type: 'regional',
    region: 'OLT',
    logo: '/assets/organizations/placeholder.png'
  },
  {
    id: 19,
    name: 'Fundația Județeană pentru Tineret Suceava',
    type: 'regional',
    region: 'SUCEAVA',
    logo: '/assets/organizations/placeholder.png'
  },
  {
    id: 20,
    name: 'Fundația Județeană pentru Tineret Timiș',
    type: 'regional',
    region: 'TIMIȘ',
    logo: '/assets/organizations/placeholder.png'
  },
  {
    id: 21,
    name: 'Asociația Județeană a Tinerilor din Tulcea',
    type: 'regional',
    region: 'TULCEA',
    logo: '/assets/organizations/placeholder.png'
  },
  {
    id: 22,
    name: 'Asociația Județeană de Tineret Vâlcea',
    type: 'regional',
    region: 'VÂLCEA',
    logo: '/assets/organizations/placeholder.png'
  }
];

// Type labels in Romanian
const typeLabels = {
  international: 'Structuri neguvernamentale de tineret afiliate internațional',
  national: 'Organizații neguvernamentale de Tineret de nivel național',
  regional: 'Structuri neguvernamentale de tineret cu activitate și reprezentativitate regională sau județeană'
};

export default function MembriPage() {
  const [activeTab, setActiveTab] = useState('all');
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  
  // Filter organizations based on active tab
  const filteredOrganizations = activeTab === 'all' 
    ? organizations 
    : organizations.filter(org => org.type === activeTab);

  return (
    <MainLayout>
      <Head>
        <title>Membri | CTR</title>
        <meta name="description" content="Organizațiile membre ale Consiliului Tineretului din România" />
      </Head>

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-r from-red-700 via-red-800 to-blue-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Structuri membre CTR</h1>
            <div className="max-w-3xl mx-auto">
              <p className="text-lg text-gray-100 mb-8">
                Consiliul Tineretului din România are o Adunare Generală formată din 22 de organizații federative de nivel național și județean și asociații afiliate internațional, formând împreună o rețea de peste 500 de organizații de și pentru tineret.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <div className="bg-white/10 backdrop-blur-sm py-2 px-4 rounded-full shadow-md border border-white/20">
                  <span className="font-semibold text-yellow-300">2</span> <span className="text-white">structuri neguvernamentale de tineret afiliate internațional</span>
                </div>
                <div className="bg-white/10 backdrop-blur-sm py-2 px-4 rounded-full shadow-md border border-white/20">
                  <span className="font-semibold text-yellow-300">6</span> <span className="text-white">structuri neguvernamentale de tineret cu activitate și reprezentativitate la nivel național</span>
                </div>
                <div className="bg-white/10 backdrop-blur-sm py-2 px-4 rounded-full shadow-md border border-white/20">
                  <span className="font-semibold text-yellow-300">14</span> <span className="text-white">structuri neguvernamentale de tineret cu activitate și reprezentativitate regională sau județeană</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Organizations Filter Tabs */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-center mb-12 overflow-x-auto">
            <div className="inline-flex bg-gray-100 rounded-full p-1">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
                  activeTab === 'all' ? 'bg-primary text-white' : 'text-gray-700 hover:bg-gray-200'
                }`}
              >
                Toate organizațiile
              </button>
              {organizationTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => setActiveTab(type)}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
                    activeTab === type ? 'bg-primary text-white' : 'text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {type === 'international' && 'Afiliate internațional'}
                  {type === 'national' && 'Nivel național'}
                  {type === 'regional' && 'Regionale/Județene'}
                </button>
              ))}
            </div>
          </div>

          {/* Organizations Display */}
          {activeTab !== 'all' && (
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-2xl font-bold text-center mb-10 text-gray-800"
            >
              {typeLabels[activeTab as keyof typeof typeLabels]}
            </motion.h2>
          )}

          {/* Display organizations in a hexagonal grid layout */}
          <div className="flex flex-wrap justify-center gap-8 mb-16">
            {filteredOrganizations.map((org, index) => (
              <motion.div
                key={org.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                onMouseEnter={() => setHoveredCard(org.id)}
                onMouseLeave={() => setHoveredCard(null)}
                className="relative"
              >
                <div className="hex-container">
                  <div className={`hex-card ${hoveredCard === org.id ? 'hex-card-active' : ''}`}>
                    <div className="hex-content">
                      <div className="relative w-20 h-20 mx-auto mb-3">
                        <Image
                          src={org.logo}
                          alt={`${org.name} logo`}
                          fill
                          className="object-contain"
                        />
                      </div>
                      <h3 className="text-center font-medium">{org.name}</h3>
                      {org.region && (
                        <span className="text-sm text-gray-500">{org.region}</span>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Regional Map Section (for regional organizations) */}
      {activeTab === 'regional' && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-10">Distribuția Organizațiilor Regionale</h2>
            <div className="max-w-4xl mx-auto relative aspect-[5/3] rounded-lg overflow-hidden shadow-lg">
              <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                <p className="text-gray-500">Hartă interactivă în dezvoltare</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Join Us Section */}
      <section className="py-16 bg-gradient-to-b from-white to-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Aderă la CTR!</h2>
            <p className="text-lg text-gray-700 mb-8">
              Consiliul Tineretului din România reprezintă o platformă de dialog și cooperare pentru organizațiile de tineret din România. Dacă doriți să vă alăturați rețelei noastre, contactați-ne!
            </p>
            <a 
              href="/contact" 
              className="inline-block bg-primary hover:bg-primary/90 text-white font-bold py-3 px-8 rounded-full shadow-md transition-colors"
            >
              Contactează-ne
            </a>
          </div>
        </div>
      </section>

      {/* Custom CSS for hexagonal layout */}
      <style jsx global>{`
        .hex-container {
          width: 250px;
          height: 260px;
          margin: 0 auto;
          position: relative;
        }
        
        .hex-card {
          width: 100%;
          height: 100%;
          background: white;
          clip-path: polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
          transition: all 0.3s ease;
        }
        
        .hex-card-active {
          background: linear-gradient(135deg, #f0f9ff 0%, #e1f5fe 100%);
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
        }
        
        .hex-content {
          text-align: center;
          max-width: 100%;
        }
      `}</style>
    </MainLayout>
  );
} 