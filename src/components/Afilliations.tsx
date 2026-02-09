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
  { id: '1', name: 'Consiliul Național pentru Tineret', logo: '/assets/afiliere/cnpt.png', type: 'national' },
  { id: '2', name: 'Grupul Național de Lucru Dialogul UE cu Tinerii', logo: '/assets/afiliere/GNL_color.png', type: 'national' },
  { id: '6', name: 'Comitetul de monitorizare a programului Tranziție Justă 2021-2027', logo: '/assets/afiliere/tranzitie_justa.jpg', type: 'national' },
  { id: '7', name: 'Comitetului interinstituțional de monitorizare și implementare a SNOFM', logo: '/assets/afiliere/anofm.png', type: 'national' },
  { id: '3', name: 'Forumul European pentru Tineret (European Youth Forum)', logo: '/assets/afiliere/youth_forum.png', type: 'international' },
  { id: '4', name: 'Organizația Mondială pentru Tineret (World Assembly of Youth)', logo: '/assets/afiliere/way.png', type: 'international' },
  { id: '5', name: 'The European Youth Advisory Board', logo: '/assets/afiliere/youth-4-europe.webp', type: 'international' },
  { id: '8', name: 'EU Youth Stakeholders Group', logo: '/assets/afiliere/EU-Youth-Stakeholders-Group-1.png', type: 'international' },
];

const PartnerCard = ({ partner, index }: { partner: Partner; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4, delay: index * 0.08 }}
    className="bg-white/5 p-6 flex flex-col items-center justify-center hover:bg-white/10 transition-colors"
  >
    <div className="relative w-20 h-20 md:w-24 md:h-24 mb-4 bg-white p-2">
      <Image
        src={partner.logo}
        alt={partner.name}
        fill
        className="object-contain p-1"
      />
    </div>
    <h4 className="text-white/70 text-center text-xs font-medium leading-snug">
      {partner.name}
    </h4>
  </motion.div>
);

const PartnersSection = () => {
  const nationalPartners = mockPartners.filter(p => p.type === 'national');
  const internationalPartners = mockPartners.filter(p => p.type === 'international');

  return (
    <section className="py-24 bg-ctr-blue relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-ctr-yellow font-semibold tracking-[0.15em] uppercase text-xs mb-4 block"
          >
            Parteneriate
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold text-white leading-tight"
          >
            Afilierea CTR
          </motion.h2>
        </div>

        <div className="mb-16">
          <motion.h3
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-sm font-semibold text-white/40 tracking-[0.15em] uppercase mb-8"
          >
            La nivel național
          </motion.h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/10">
            {nationalPartners.map((partner, index) => (
              <PartnerCard key={partner.id} partner={partner} index={index} />
            ))}
          </div>
        </div>

        <div>
          <motion.h3
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-sm font-semibold text-white/40 tracking-[0.15em] uppercase mb-8"
          >
            La nivel internațional
          </motion.h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/10">
            {internationalPartners.map((partner, index) => (
              <PartnerCard key={partner.id} partner={partner} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
