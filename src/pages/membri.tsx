import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { motion } from 'framer-motion';
import MainLayout from '../components/layout/MainLayout';
import { ChevronDownIcon } from '@heroicons/react/24/solid';

// Define organization types as per the old website
const organizationTypes = [
  'international',
  'national',
  'regional'
];

// Type labels for display
const typeDisplayLabels = {
  all: 'Toate organizațiile',
  international: 'Afiliate internațional',
  national: 'Nivel național',
  regional: 'Regionale/Județene'
};

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
    name: 'AEGEE București',
    type: 'international',
    logo: '/assets/organizations/aegee_bucuresti.jpg'
  },
  {
    id: 2,
    name: 'ANSR Tineret',
    type: 'international',
    logo: '/assets/organizations/ansr_tineret.png'
  },
  
  // National Organizations
  {
    id: 3,
    name: 'Alianța Națională a Organizațiilor Studențești din România (ANOSR)',
    type: 'national',
    logo: '/assets/organizations/anosr.png'
  },
  {
    id: 4,
    name: 'Organizația Națională „Cercetașii României” (ONCR)',
    type: 'national',
    logo: '/assets/organizations/oncr.png'
  },
  {
    id: 5,
    name: 'Asociația MIERT',
    type: 'national',
    logo: '/assets/organizations/miert.png'
  },
  {
    id: 6,
    name: 'FFederația Tinerilor Basarabeni - FTB',
    type: 'national',
    logo: '/assets/organizations/ftb.jpg'
  },
  // Regional/County Organizations
  {
    id: 7,
    name: 'Federația Tinerilor din Cluj (FTC)',
    type: 'regional',
    region: 'CLUJ',
    logo: '/assets/organizations/ftc.jpg'
  },
  {
    id: 8,
    name: 'Fundaţia pentru Tineret a Municipiului Bucureşti (FTMB)',
    type: 'regional',
    region: 'BUCUREȘTI',
    logo: '/assets/organizations/ftmb.png'
  },
  {
    id: 9,
    name: 'Fundaţia Judeţeană pentru Tineret Dâmboviţa',
    type: 'regional',
    region: 'DÂMBOVIȚA',
    logo: '/assets/organizations/fjt_db.jpg'
  },
  {
    id: 10,
    name: 'Federația Organizațiilor Neguvernamentale de Tineret din Maramureș (FONT)',
    type: 'regional',
    region: 'MARAMUREȘ',
    logo: '/assets/organizations/font_mm.jpg'
  },
  {
    id: 11,
    name: 'Fundaţia pentru Tineret Mehedinţi',
    type: 'regional',
    region: 'MEHEDINȚI',
    logo: '/assets/organizations/fjt_mh.jpg'
  },
  {
    id: 12,
    name: 'Fundaţia Judeţeană pentru Tineret Olt',
    type: 'regional',
    region: 'OLT',
    logo: '/assets/organizations/fjt_ot.jpg'
  },
  {
    id: 13,
    name: 'Fundaţia Judeţeană pentru Tineret Vâlcea',
    type: 'regional',
    region: 'VÂLCEA',
    logo: '/assets/organizations/fjt_vl.jpg'
  },
  {
    id: 14,
    name: 'Federația Tinerilor din Bacău',
    type: 'regional',
    region: 'BACĂU',
    logo: '/assets/organizations/ft_bacau.png'
  },
  {
    id: 15,
    name: 'Federația Organizațiilor Neguvernamentale de Tineret din Iași (FONTIS)',
    type: 'regional',
    region: 'IAȘI',
    logo: '/assets/organizations/fontis.jpg'
  },
  {
    id: 16,
    name: 'Fundaţia Judeţeană pentru Tineret Botoşani',
    type: 'regional',
    region: 'BOTOȘANI',
    logo: '/assets/organizations/fjt_bt.jpg'
  },
  {
    id: 17,
    name: 'Fundația Județeană pentru Tineret Covasna ',
    type: 'regional',
    region: 'COVASNA',
    logo: '/assets/organizations/placeholder.png'
  },
  {
    id: 18,
    name: 'Fundaţia Judeţeană pentru Tineret Tulcea ',
    type: 'regional',
    region: 'TULCEA',
    logo: '/assets/organizations/fjt_tl.jpg'
  },
  {
    id: 19,
    name: 'Fundația Județeană pentru Tineret Suceava',
    type: 'regional',
    region: 'SUCEAVA',
    logo: '/assets/organizations/fjt_sv.png'
  },
  {
    id: 20,
    name: 'Fundația Județeană pentru Tineret Gorj',
    type: 'regional',
    region: 'GORJ',
    logo: '/assets/organizations/fjt_gj.png'
  },
  {
    id: 21,
    name: 'Fundația Județeană pentru Tineret Ialomița',
    type: 'regional',
    region: 'IALOMIȚA',
    logo: '/assets/organizations/fjt_il.jpg'
  },
];

// Type labels in Romanian
const typeLabels = {
  international: 'Structuri neguvernamentale de tineret afiliate internațional',
  national: 'Organizații neguvernamentale de Tineret de nivel național',
  regional: 'Structuri neguvernamentale de tineret cu activitate și reprezentativitate regională sau județeană'
};

export default function MembriPage() {
  const [activeTab, setActiveTab] = useState('national');
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  // Filter organizations based on active tab
  const filteredOrganizations = activeTab === 'all' 
    ? organizations 
    : organizations.filter(org => org.type === activeTab);
    
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  
  const selectType = (type: string) => {
    setActiveTab(type);
    setIsDropdownOpen(false);
  };

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
                Consiliul Tineretului din România are o Adunare Generală formată din{' '}
                <span className="font-semibold text-yellow-300">{organizations.length}</span>{' '}
                de organizații federative de nivel național și județean și asociații afiliate internațional, formând împreună o rețea de peste <span className="font-semibold text-yellow-300">500</span>{' '} de organizații de și pentru tineret.
              </p>

              <div className="flex flex-wrap justify-center gap-4">

                <div className="bg-white/10 backdrop-blur-sm py-2 px-4 rounded-full shadow-md border border-white/20">
                  <span className="font-semibold text-yellow-300">
                    {organizations.filter(org => org.type === 'international').length}
                  </span>{' '}
                  <span className="text-white">
                    structuri neguvernamentale de tineret afiliate internațional
                  </span>
                </div>

                <div className="bg-white/10 backdrop-blur-sm py-2 px-4 rounded-full shadow-md border border-white/20">
                  <span className="font-semibold text-yellow-300">
                    {organizations.filter(org => org.type === 'national').length}
                  </span>{' '}
                  <span className="text-white">
                    structuri neguvernamentale de tineret cu activitate și reprezentativitate la nivel național
                  </span>
                </div>

                <div className="bg-white/10 backdrop-blur-sm py-2 px-4 rounded-full shadow-md border border-white/20">
                  <span className="font-semibold text-yellow-300">
                    {organizations.filter(org => org.type === 'regional').length}
                  </span>{' '}
                  <span className="text-white">
                    structuri neguvernamentale de tineret cu activitate și reprezentativitate regională sau județeană
                  </span>
                </div>

              </div>

            </div>
          </motion.div>
        </div>
      </section>

      {/* Organizations Filter Tabs - Desktop and Mobile Versions */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          {/* Desktop Tabs - Hidden on Mobile */}
          <div className="hidden md:flex justify-center mb-12">
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
                  {typeDisplayLabels[type as keyof typeof typeDisplayLabels]}
                </button>
              ))}
            </div>
          </div>
          
          {/* Mobile Dropdown - Hidden on Desktop */}
          <div className="md:hidden mb-12">
            <div className="relative">
              <button 
                onClick={toggleDropdown}
                className="w-full flex items-center justify-between bg-primary text-white px-5 py-3 rounded-lg shadow"
              >
                <span>{typeDisplayLabels[activeTab as keyof typeof typeDisplayLabels]}</span>
                <ChevronDownIcon className={`w-5 h-5 transform transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isDropdownOpen && (
                <div className="absolute z-10 w-full mt-1 bg-white rounded-lg shadow-lg overflow-hidden">
                  <div className="py-1">
                    <button
                      onClick={() => selectType('all')}
                      className={`w-full text-left px-4 py-3 text-sm ${
                        activeTab === 'all' ? 'bg-gray-100 font-medium' : 'hover:bg-gray-50'
                      }`}
                    >
                      Toate organizațiile
                    </button>
                    {organizationTypes.map((type) => (
                      <button
                        key={type}
                        onClick={() => selectType(type)}
                        className={`w-full text-left px-4 py-3 text-sm ${
                          activeTab === type ? 'bg-gray-100 font-medium' : 'hover:bg-gray-50'
                        }`}
                      >
                        {typeDisplayLabels[type as keyof typeof typeDisplayLabels]}
                      </button>
                    ))}
                  </div>
                </div>
              )}
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