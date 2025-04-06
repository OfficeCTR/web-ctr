'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const AboutSection = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-center mb-16"
        >
          Despre Noi
        </motion.h2>

        {/* First Row - Mission */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h3 className="text-3xl font-semibold text-primary">Misiunea Noastră</h3>
            <p className="text-gray-600 text-lg leading-relaxed">
              Suntem dedicați să creăm un mediu în care tinerii să poată dezvolta
              abilitățile lor, să învețe lucruri noi și să contribuie pozitiv la
              comunitate. Prin proiectele noastre, ne propunem să inspirăm și să
              sprijinim generațiile viitoare în căutarea potențialului lor maxim.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative h-[400px] rounded-2xl overflow-hidden shadow-xl"
          >
            <Image
              src="/assets/cover.jpg"
              alt="Misiunea noastră"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          </motion.div>
        </div>

        {/* Second Row - Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative h-[400px] rounded-2xl overflow-hidden shadow-xl order-2 md:order-1"
          >
            <Image
              src="/assets/cover.jpg"
              alt="Viziunea noastră"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6 order-1 md:order-2"
          >
            <h3 className="text-3xl font-semibold text-primary">Viziunea Noastră</h3>
            <p className="text-gray-600 text-lg leading-relaxed">
              Ne imaginăm o comunitate în care fiecare tânăr are acces la resursele
              și oportunitățile necesare pentru a-și atinge visele. Vrem să fim
              catalizatorul schimbării pozitive și să construim un viitor mai bun
              pentru toți.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection; 