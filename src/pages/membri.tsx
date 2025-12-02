import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { motion } from 'framer-motion';
import MainLayout from '../components/layout/MainLayout';
import PageHero from '../components/PageHero';
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import { 
  organizations, 
  organizationTypes, 
  typeDisplayLabels, 
  typeLabels 
} from '../content/data';

import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import romaniaMap from "../utils/ro_judete_poligon.json"; // topojson for Romania

export default function MembriPage() {
  const [activeTab, setActiveTab] = useState('all');
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

  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [tooltipSide, setTooltipSide] = useState<'right' | 'left'>('right');

  const handleMouseMove = (e: React.MouseEvent) => {
    const padding = 20;
    const tooltipWidth = 250;

    if (e.clientX + tooltipWidth + padding > window.innerWidth) {
      setTooltipSide('left');
    } else {
      setTooltipSide('right');
    }

    setTooltipPosition({ x: e.clientX, y: e.clientY });
  };

  return (
    <MainLayout>
      <Head>
        <title>Membri | CTR</title>
        <meta name="description" content="Organizațiile membre ale Consiliului Tineretului din România" />
      </Head>

      <PageHero 
        title="Structuri membre CTR"
        description="Consiliul Tineretului din România reunește structuri de tineret din toată țara pentru a reprezenta interesele tinerilor."
      />

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-lg md:text-xl text-gray-700 mb-12 leading-relaxed">
              Consiliul Tineretului din România are o Adunare Generală formată din{' '}
              <span className="font-bold text-blue-900">{organizations.length}</span>{' '}
              de organizații federative de nivel național și județean și asociații afiliate internațional, formând împreună o rețea de peste <span className="font-bold text-blue-900">500</span>{' '} de organizații de și pentru tineret.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-md border-t-4 border-blue-900 hover:shadow-lg transition-shadow">
                <span className="block text-4xl font-bold text-blue-900 mb-3">
                  {organizations.filter(org => org.type === 'international').length}
                </span>
                <span className="text-gray-600 text-sm font-medium">
                  structuri neguvernamentale de tineret afiliate internațional
                </span>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md border-t-4 border-blue-900 hover:shadow-lg transition-shadow">
                <span className="block text-4xl font-bold text-blue-900 mb-3">
                  {organizations.filter(org => org.type === 'national').length}
                </span>
                <span className="text-gray-600 text-sm font-medium">
                  structuri neguvernamentale de tineret cu activitate și reprezentativitate la nivel național
                </span>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md border-t-4 border-blue-900 hover:shadow-lg transition-shadow">
                <span className="block text-4xl font-bold text-blue-900 mb-3">
                  {organizations.filter(org => org.type === 'regional').length}
                </span>
                <span className="text-gray-600 text-sm font-medium">
                  structuri neguvernamentale de tineret cu activitate și reprezentativitate regională sau județeană
                </span>
              </div>
            </div>
          </div>
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
                transition={{ duration: 0.3, delay: index * 0.1 }}
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

      {/* interactive map */}

      {hoveredRegion && (
        <div
          className="fixed z-50 p-3 bg-white rounded-lg shadow-lg border border-gray-200 max-w-xs pointer-events-none"
          style={{
            top: window.innerWidth < 768 ? "50%" : tooltipPosition.y + 10,
            left: window.innerWidth < 768 ? "50%" : tooltipSide === 'right' ? tooltipPosition.x + 10 : tooltipPosition.x - 260,
            transform: window.innerWidth < 768 ? "translate(-50%, -50%)" : "none",
          }}
        >
          <h4 className="font-bold mb-2 text-sm">Organizații din {hoveredRegion}</h4>
          <ul className="space-y-1 text-xs max-h-48 overflow-y-auto">
            {organizations
              .filter(org => (org.region?.toUpperCase() || "") === hoveredRegion.toUpperCase())
              .map(org => (
                <li key={org.id} className="flex items-center gap-2">
                  <div className="w-5 h-5 relative">
                    <Image src={org.logo} alt={org.name} fill className="object-contain" />
                  </div>
                  <span>{org.name}</span>
                </li>
              ))}
          </ul>
        </div>
      )}




      {activeTab === 'regional' && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-10">
              Distribuția Organizațiilor Regionale
            </h2>

            {/* Responsive large map container */}
            <div className="w-full h-[600px] md:h-[800px] lg:h-[900px] mx-auto">
              <ComposableMap
                projection="geoMercator"
                projectionConfig={{
                  scale: 5000,
                  center: [25, 45.75],
                }}
                width={1000}
                height={800}
                style={{
                  width: "100%",
                  height: "100%",
                }}
              >
                {/*<Geographies geography={romaniaMap}>*/}
                {/*  {({ geographies }) =>*/}
                {/*    geographies.map((geo) => {*/}
                {/*      const orgsInRegion = organizations.filter(*/}
                {/*        (org) => (org.region?.toUpperCase() || "") === geo.properties.name.toUpperCase()*/}
                {/*      );*/}

                {/*      return (*/}
                {/*        <Geography*/}
                {/*          key={geo.rsmKey}*/}
                {/*          geography={geo}*/}
                {/*          fill={orgsInRegion.length ? "#3B82F6" : "#E5E7EB"}*/}
                {/*          stroke="#ffffff"*/}
                {/*          style={{*/}
                {/*            default: { outline: "none" },*/}
                {/*            hover: { fill: "#2563EB", outline: "none", cursor: 'pointer' },*/}
                {/*            pressed: { outline: "none" },*/}
                {/*          }}*/}
                {/*          onClick={() => orgsInRegion.length && handleRegionClick(geo.properties.name)}*/}
                {/*        />*/}
                {/*      );*/}
                {/*    })*/}
                {/*  }*/}
                {/*</Geographies>*/}
                <Geographies geography={romaniaMap}>
                  {({ geographies }) =>
                    geographies.map((geo) => {
                      const orgsInRegion = organizations.filter(
                        (org) => (org.region?.toUpperCase() || "") === geo.properties.name.toUpperCase()
                      );

                      return (
                        <Geography
                          key={geo.rsmKey}
                          geography={geo}
                          fill={orgsInRegion.length ? "#3B82F6" : "#E5E7EB"}
                          stroke="#ffffff"
                          style={{
                            default: { outline: "none" },
                            hover: { fill: "#2563EB", outline: "none", cursor: orgsInRegion.length ? 'pointer' : 'default' },
                            pressed: { outline: "none" },
                          }}
                          onMouseEnter={(e) => {
                            if (orgsInRegion.length) {
                              setHoveredRegion(geo.properties.name);
                              handleMouseMove(e as any);
                            }
                          }}
                          onMouseMove={(e) => {
                            if (orgsInRegion.length) handleMouseMove(e as any);
                          }}
                          onMouseLeave={() => setHoveredRegion(null)}

                        />
                      );
                    })
                  }
                </Geographies>


              </ComposableMap>
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