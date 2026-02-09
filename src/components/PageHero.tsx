'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

interface PageHeroProps {
  title: string;
  description?: string;
}

const PageHero = ({ title, description }: PageHeroProps) => {
  return (
    <section className="relative pt-32 pb-14 md:pt-40 md:pb-16 bg-white overflow-hidden">
      <div className="absolute right-[-5%] top-1/2 -translate-y-1/2 w-[35%] h-[90%] opacity-[0.03] pointer-events-none select-none">
        <Image
          src="/assets/romania.svg"
          alt=""
          fill
          className="object-contain"
          style={{ filter: 'brightness(0)' }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="text-ctr-red font-semibold tracking-[0.15em] uppercase text-xs mb-3 block"
        >
          CTR
        </motion.span>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.05 }}
          className="w-12 h-[2px] bg-ctr-red mb-6"
        />
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-ctr-blue max-w-3xl"
        >
          {title}
        </motion.h1>
        {description && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="text-gray-500 text-lg md:text-xl max-w-2xl leading-relaxed mt-6"
          >
            {description}
          </motion.p>
        )}
      </div>
      <div className="absolute bottom-0 left-0 w-full h-px bg-gray-200" />
    </section>
  );
};

export default PageHero;
