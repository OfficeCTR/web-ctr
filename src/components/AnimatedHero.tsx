'use client';

import { motion } from "framer-motion";
import Image from "next/image";

const AnimatedHero = () => {
  return (
    <section className="relative min-h-screen bg-[#0B1C3D] overflow-hidden">
      {/* Background animated elements */}
      <motion.div
        className="absolute inset-0 opacity-20 md:scale-100 scale-[0.6] origin-bottom hidden md:block"
        initial={{ scale: 1 }}
        animate={{ 
          scale: [1, 1.1, 1],
          rotate: [0, 5, 0]
        }}
        transition={{ 
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        <svg viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0,500 C150,400 350,300 500,500 C650,700 850,600 1000,500 V1000 H0 V500Z"
            fill="#FFD700"
          />
        </svg>
      </motion.div>
      <motion.div
        className="absolute inset-0 opacity-15 md:scale-100 scale-[0.6] origin-bottom hidden md:block"
        initial={{ scale: 1.1 }}
        animate={{ 
          scale: [1.1, 1, 1.1],
          rotate: [0, -5, 0]
        }}
        transition={{ 
          duration: 15,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        <svg viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0,600 C200,500 300,400 500,600 C700,800 800,700 1000,600 V1000 H0 V600Z"
            fill="#1E3A8A"
          />
        </svg>
      </motion.div>

      {/* Romania Map */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[45%] md:h-[80%] h-[60%] opacity-20 md:opacity-20 opacity-30">
        <Image
          src="/assets/romania.svg"
          alt="Romania Map"
          fill
          className="object-contain"
          style={{ filter: 'brightness(0) saturate(100%) invert(79%) sepia(56%) saturate(552%) hue-rotate(359deg) brightness(103%) contrast(106%)' }}
        />
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center space-y-8 max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="flex items-center justify-center gap-4 hidden md:flex"
            >
              <Image
                src="/assets/ctr-logo.png"
                alt="CTR Logo"
                width={100}
                height={100}
                className="object-contain"
              />
            </motion.div>
            
            <div className="space-y-4">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-6xl lg:text-7xl font-bold leading-tight text-white"
              >
                Consiliul Tineretului <br />
                <span className="text-yellow-400">din România</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-xl lg:text-2xl text-gray-300 max-w-2xl mx-auto"
              >
                Reprezentăm tinerii din România la nivel național și internațional!
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex gap-6 justify-center pt-8"
            >
              <button className="bg-yellow-400 text-[#0B1C3D] px-8 py-4 rounded-full font-semibold hover:bg-yellow-300 transition-colors text-lg">
                Implică-te
              </button>
              <button className="bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-full font-semibold hover:bg-white/20 transition-colors text-lg">
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