'use client';

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const AnimatedHero = () => {
  return (
    <section className="relative min-h-screen bg-ctr-blue overflow-hidden w-full">
      <div className="absolute right-[-5%] top-1/2 -translate-y-1/2 w-[55%] h-[80%] opacity-[0.07] pointer-events-none select-none">
        <Image
          src="/assets/romania.svg"
          alt=""
          fill
          className="object-contain"
          style={{ filter: 'brightness(0) invert(1)' }}
          priority
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="min-h-screen flex items-center">
          <div className="max-w-3xl pt-20 pb-32">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-8"
            >
              <span className="inline-block px-4 py-1.5 border border-ctr-red/40 text-ctr-red text-xs tracking-[0.2em] uppercase font-medium">
                #CuȘiDespreTineri
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-bold leading-[0.95] tracking-tight text-white mb-8"
            >
              Consiliul
              <br />
              Tineretului
              <br />
              <span className="text-ctr-yellow">din România</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="w-16 h-[2px] bg-ctr-red mb-8"
            />

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.55 }}
              className="text-lg md:text-xl text-white/50 max-w-md mb-12 leading-relaxed font-light"
            >
              Reprezentăm tinerii din România la nivel național și internațional!
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex flex-wrap gap-4"
            >
              <Link
                href="/support"
                className="bg-ctr-yellow text-ctr-blue px-8 py-4 rounded-full font-semibold hover:bg-white transition-colors text-sm tracking-wide uppercase"
              >
                Susține-ne
              </Link>
              <Link
                href="/despre"
                className="border border-white/25 text-white px-8 py-4 rounded-full font-semibold hover:border-white/50 hover:bg-white/5 transition-all text-sm tracking-wide uppercase"
              >
                Află mai multe
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full z-20 overflow-hidden leading-[0]">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full h-[50px] md:h-[80px] block">
          <path d="M0,80 L1440,0 L1440,80 Z" fill="#ffffff" />
        </svg>
      </div>
    </section>
  );
};

export default AnimatedHero;
