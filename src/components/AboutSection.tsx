'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const AboutSection = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mb-20">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-ctr-red font-semibold tracking-[0.15em] uppercase text-xs mb-4 block"
          >
            Despre Noi
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold text-ctr-blue leading-tight"
          >
            Construim viitorul alături de tinerii din România
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start mb-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:col-span-5"
          >
            <span className="text-[7rem] md:text-[9rem] font-bold text-ctr-blue/[0.06] leading-none block -mb-12 md:-mb-16 select-none">
              01
            </span>
            <h3 className="text-2xl font-bold text-ctr-blue mb-5 relative">Misiunea Noastră</h3>
            <p className="text-gray-500 text-lg leading-relaxed">
              Suntem dedicați să creăm un mediu în care tinerii să poată dezvolta
              abilitățile lor, să învețe lucruri noi și să contribuie pozitiv la
              comunitate. Prin proiectele noastre, ne propunem să inspirăm și să
              sprijinim generațiile viitoare în căutarea potențialului lor maxim.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="md:col-span-7"
          >
            <div className="relative h-[350px] md:h-[450px] overflow-hidden">
              <Image
                src="/assets/cover.jpg"
                alt="Misiunea noastră"
                fill
                className="object-cover"
              />
              <div className="absolute bottom-0 left-0 w-full h-1 bg-ctr-yellow" />
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="md:col-span-7 order-2 md:order-1"
          >
            <div className="relative h-[350px] md:h-[450px] overflow-hidden">
              <Image
                src="/assets/home1.jpg"
                alt="Viziunea noastră"
                fill
                className="object-cover"
              />
              <div className="absolute bottom-0 left-0 w-full h-1 bg-ctr-red" />
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:col-span-5 order-1 md:order-2"
          >
            <span className="text-[7rem] md:text-[9rem] font-bold text-ctr-blue/[0.06] leading-none block -mb-12 md:-mb-16 select-none">
              02
            </span>
            <h3 className="text-2xl font-bold text-ctr-blue mb-5 relative">Viziunea Noastră</h3>
            <p className="text-gray-500 text-lg leading-relaxed">
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
