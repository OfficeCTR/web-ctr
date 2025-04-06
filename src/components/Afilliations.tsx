'use client';

import { motion } from "framer-motion";
import Image from "next/image";

interface Partner {
  id: string;
  name: string;
  logo: string;
  type: 'national' | 'international';
}

const mockPartners: Partner[] = [
  // National
  { id: '1', name: 'Consiliul Național pentru Tineret', logo: '/assets/afiliere/cnpt.png', type: 'national' },
  { id: '2', name: 'Grupul Național de Lucru Dialogul UE cu Tinerii', logo: '/assets/afiliere/GNL_color.png', type: 'national' },
  { id: '3', name: 'Consiliul Economic și Social', logo: '/assets/afiliere/ces.jpg', type: 'national' },
  { id: '4', name: 'Coaliția România Sustenabilă', logo: '/assets/afiliere/crs.png', type: 'national' },
  { id: '5', name: 'Parteneriatul pentru Guvernare Deschisă România', logo: '/assets/afiliere/ogp.png', type: 'national' },
  // International
  { id: '6', name: 'Forumul European pentru Tineret\n (European Youth Forum)', logo: '/assets/afiliere/youth_forum.png', type: 'international' },
  { id: '7', name: 'Organizația Mondială pentru Tineret\n (World Assembly of Youth)', logo: '/assets/afiliere/way.png', type: 'international' },
  { id: '8', name: 'Consiliul Consultativ pentru Tineret al Consiliului Europei', logo: '/assets/afiliere/coe.png', type: 'international' },
];

const PartnersSection = () => {
  const nationalPartners = mockPartners.filter(partner => partner.type === 'national');
  const internationalPartners = mockPartners.filter(partner => partner.type === 'international');

  return (
    <section className="py-20 bg-gradient-to-b from-[#0B1C3D] to-[#1a2b4a] relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/assets/pattern.svg')] bg-repeat opacity-20"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-4">Afilierea CTR</h2>
          <div className="w-24 h-1 mx-auto"></div>
        </motion.div>

        {/* National Partners */}
        <div className="mb-20">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-2xl font-semibold text-white mb-8 text-center"
          >
            La nivel național
          </motion.h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {nationalPartners.map((partner, index) => (
              <motion.div
                key={partner.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 h-full flex flex-col items-center justify-center transform transition-all duration-300 hover:scale-105 hover:bg-white/10">
                  <div className="relative w-24 h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 mb-4 bg-white rounded-lg p-3 shadow-lg">
                    <Image
                      src={partner.logo}
                      alt={partner.name}
                      fill
                      className="object-contain p-1"
                    />
                  </div>
                  <h4 className="text-white text-center text-sm font-medium group-hover:text-[#FF0000] transition-colors">
                    {partner.name}
                  </h4>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* International Partners */}
        <div>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-2xl font-semibold text-white mb-8 text-center"
          >
            La nivel internațional
          </motion.h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {internationalPartners.map((partner, index) => (
              <motion.div
                key={partner.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 h-full flex flex-col items-center justify-center transform transition-all duration-300 hover:scale-105 hover:bg-white/10 border-2 border-[#FF0000]">
                  <div className="relative w-24 h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 mb-4 bg-white rounded-lg p-3 shadow-lg">
                    <Image
                      src={partner.logo}
                      alt={partner.name}
                      fill
                      className="object-contain p-1"
                    />
                  </div>
                  <h4 className="text-white text-center text-sm font-medium group-hover:text-[#FF0000] transition-colors">
                    {partner.name}
                  </h4>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnersSection; 