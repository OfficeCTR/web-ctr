'use client';

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const CapitalaTineretuluiSection = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-100 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/assets/pattern.svg')] bg-repeat"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-[#0B1C3D] mb-4">Capitala Tineretului din România</h2>
          <div className="w-24 h-1 bg-[#FF0000] mx-auto"></div>
          <p className="mt-6 text-gray-600 max-w-3xl mx-auto">
            Cel mai mare și amplu program marca CTR care transformă comunitățile locale, alături de ecosistemele lor de tineret.
          </p>
        </motion.div>

        <div className="flex flex-col md:flex-row items-center gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden md:block md:w-1/2"
          >
            <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden shadow-2xl bg-white p-8">
              <Image
                src="/assets/capitala-tineretului/capitala-logo.png"
                alt="Capitala Tineretului din România"
                fill
                className="object-contain scale-90"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="md:w-1/2"
          >
            <h3 className="text-2xl font-bold text-[#0B1C3D] mb-4">
              Cel mai ambițios program național destinat tinerilor
            </h3>
            <p className="text-gray-600 mb-6">
              Capitala Tineretului din România pune accent pe dezvoltarea ecosistemelor de tineret 
              din zonele românești, în general, și pe dezvoltarea ecosistemelor de tineret urbane, 
              în mod special. În cadrul programului, autoritățile locale colaborează cu organizațiile 
              neguvernamentale de și pentru tineret și cu mediul privat, și îi pun pe tineri în 
              centrul procesului de dezvoltare urbană.
            </p>
            <div className="flex space-x-4">
              <Link 
                href="/capitala-tineretului" 
                className="px-6 py-3 bg-[#0B1C3D] text-white rounded-lg transition-all hover:bg-[#1a2b4a] shadow-lg hover:shadow-xl"
              >
                Află mai multe
              </Link>
              <a 
                href="https://capitalatineretului.ro/" 
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 border-2 border-[#0B1C3D] text-[#0B1C3D] rounded-lg transition-all hover:bg-[#0B1C3D] hover:text-white shadow-lg hover:shadow-xl"
              >
                Vizitează site-ul oficial
              </a>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-6"
        >
          {[
            { number: "8", text: "Orașe Capitale ale Tineretului din România" },
            { number: "1210", text: "Evenimente, activități și proiecte organizate" },
            { number: "1524", text: "Persoane voluntare în cadrul programelor" },
            { number: "27", text: "Orașe candidate la titlu" },
          ].map((stat, index) => (
            <div 
              key={index}
              className="bg-white/80 backdrop-blur-sm rounded-xl p-8 text-center shadow-lg hover:shadow-xl transition-all hover:scale-105"
            >
              <div className="text-4xl font-bold text-[#FF0000] mb-2">{stat.number}</div>
              <div className="text-[#0B1C3D] font-medium">{stat.text}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default CapitalaTineretuluiSection; 