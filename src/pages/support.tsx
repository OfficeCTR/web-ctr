import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import MainLayout from "../components/layout/MainLayout";
import PageHero from "../components/PageHero";
import dataInfo from "../content/data";

const Support: NextPage = () => {
  return (
    <MainLayout>
      {/* Hero Section */}
      <PageHero 
        title="Susține Consiliul Tineretului din România"
        description="CTR este o organizație independentă, care își desfășoară activitatea pe baza voluntariatului. Ajută-ne să dezvoltăm împreună programe și inițiative care sprijină tinerii din România."
      />

      {/* Support Methods Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Method 1: 3.5% Tax Redirection (Highlighted) */}
            <motion.div 
              className="relative overflow-hidden rounded-2xl shadow-xl border-2 border-yellow-400"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <div className="bg-blue-900 text-white p-8 md:p-10">
                <div className="absolute top-0 right-0">
                  <div className="bg-yellow-400 text-blue-900 font-bold py-1 px-4 rounded-bl-lg">
                    Recomandat
                  </div>
                </div>
                
                <h2 className="text-3xl font-bold mb-6">
                  Redirecționează 3,5% din impozit către CTR
                </h2>
                
                <p className="text-lg mb-6">
                Poți redirecționa 3,5% din impozitul tău în mod gratuit către CTR. Tu completezi formularul, iar noi ne ocupăm de restul demersurilor.
                </p>
                
                <div className="flex space-x-4 mb-8">
                  <div className="flex items-center">
                    <div className="bg-yellow-400 rounded-full w-8 h-8 flex justify-center items-center text-blue-900 font-bold mr-2">
                      1
                    </div>
                    <span>Completezi formularul</span>
                  </div>
                  <div className="flex items-center">
                    <div className="bg-yellow-400 rounded-full w-8 h-8 flex justify-center items-center text-blue-900 font-bold mr-2">
                      2
                    </div>
                    <span>Noi îl depunem la ANAF</span>
                  </div>
                </div>
                
                <div className="flex justify-center">
                  <a 
                    href="https://formular230.ro/consiliul-tineretului-din-romania" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-bold py-3 px-8 rounded-full text-lg transition duration-300 inline-flex items-center"
                  >
                    Completează acum
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                </div>
              </div>
              
              <div className="relative h-64 md:h-80">
                <Image 
                  src="/assets/cover.jpg" 
                  alt="Susține tinerii prin redirecționarea a 3.5% din impozit"
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>
            
            {/* Method 2: Direct Donation */}
            <motion.div 
              className="bg-white rounded-2xl shadow-lg overflow-hidden"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <div className="p-8 md:p-10">
                <h2 className="text-3xl font-bold text-gray-800 mb-6">
                  Donează direct
                </h2>
                
                <p className="text-lg text-gray-600 mb-8">
                  Donația ta directă ne ajută să implementăm proiecte imediate și să răspundem rapid nevoilor 
                  comunității de tineret din România.
                </p>
                
                <div className="bg-gray-100 rounded-lg p-6 mb-8">
                  <h3 className="font-bold text-gray-800 mb-4">Detalii bancare:</h3>
                  <ul className="space-y-3 text-gray-700">
                    <li><span className="font-medium">Beneficiar:</span> {dataInfo.bank.beneficiary}</li>
                    <li><span className="font-medium">Banca:</span> {dataInfo.bank.name} </li>
                    <li><span className="font-medium">IBAN (RON):</span> {dataInfo.bank.iban_ron}</li>
                    <li><span className="font-medium">IBAN (EUR):</span> {dataInfo.bank.iban_eur}</li>
                    <li><span className="font-medium">Cod Swift:</span> {dataInfo.bank.swift}</li>
                    <li><span className="font-medium">CUI/CIF:</span> {dataInfo.vat}</li>
                  </ul>
                </div>
                
                <div className="flex justify-center">
                  <Link 
                    href="/contact"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full text-lg transition duration-300 inline-flex items-center"
                  >
                    Contactează-ne
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Impact Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Impactul contribuției tale</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Fiecare donație, indiferent de valoare, contribuie la dezvoltarea programelor 
              noastre și la sprijinirea tinerilor din România.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              className="bg-white p-6 rounded-xl shadow-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-center text-gray-800 mb-2">Dezvoltarea competențelor</h3>
              <p className="text-gray-600 text-center">
                Dezvoltăm programe educaționale și de formare pentru tineri.
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-white p-6 rounded-xl shadow-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-center text-gray-800 mb-2">Reprezentare națională</h3>
              <p className="text-gray-600 text-center">
                Reprezentăm interesele tinerilor în dialoguri cu autorități și instituții.
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-white p-6 rounded-xl shadow-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
            >
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-center text-gray-800 mb-2">Inițiative internaționale</h3>
              <p className="text-gray-600 text-center">
                Facilitarea participării tinerilor la programe și schimburi internaționale.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-blue-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Fii parte din schimbare!</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Contribuția ta este esențială pentru a putea continua misiunea noastră de a sprijini 
            tinerii din România.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a 
              href="https://formular230.ro/consiliul-tineretului-din-romania" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-bold py-3 px-8 rounded-full text-lg transition duration-300"
            >
              Redirecționează 3.5% din impozit
            </a>
            <Link 
              href="/contact"
              className="bg-transparent hover:bg-white/10 border-2 border-white text-white font-bold py-3 px-8 rounded-full text-lg transition duration-300"
            >
              Contactează-ne
            </Link>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Support; 