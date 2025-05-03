'use client';

import { motion } from "framer-motion";
import Image from "next/image";

const AnimatedHero = () => {
  return (
    <section className="relative min-h-screen bg-[#0B1C3D] overflow-hidden w-full">
      {/* Romania Map Background */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[80%] h-[100%] opacity-30 pointer-events-none">
        <Image
          src="/assets/romania.svg"
          alt="Romania Map"
          fill
          className="object-contain"
          style={{ filter: 'brightness(0) saturate(100%) invert(79%) sepia(56%) saturate(552%) hue-rotate(359deg) brightness(103%) contrast(106%)' }}
        />
      </div>

      {/* Simple Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center space-y-8 max-w-4xl">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-white"
            >
              Consiliul Tineretului <br />
              <span className="text-yellow-400">din România</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg sm:text-xl lg:text-2xl text-gray-300 max-w-2xl mx-auto"
            >
              Reprezentăm tinerii din România la nivel național și internațional!
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-wrap gap-4 sm:gap-6 justify-center pt-8"
            >
              <button className="bg-yellow-400 text-[#0B1C3D] px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold hover:bg-yellow-300 transition-colors text-base sm:text-lg">
                Susține-ne
              </button>
              <button className="bg-white/10 backdrop-blur-sm text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold hover:bg-white/20 transition-colors text-base sm:text-lg">
                Află mai multe
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AnimatedHero; 