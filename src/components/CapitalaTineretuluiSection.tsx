'use client';

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const stats = [
  { number: "8", text: "Orașe Capitale ale Tineretului din România" },
  { number: "1210", text: "Evenimente, activități și proiecte organizate" },
  { number: "1524", text: "Persoane voluntare în cadrul programelor" },
  { number: "27", text: "Orașe candidate la titlu" },
];

const CapitalaTineretuluiSection = () => {
  return (
    <section className="py-24 bg-[#f8f8f6] relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-ctr-red font-semibold tracking-[0.15em] uppercase text-xs mb-4 block"
          >
            Programul Nostru
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold text-ctr-blue leading-tight mb-6"
          >
            Capitala Tineretului din România
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-gray-500 text-lg leading-relaxed"
          >
            Cel mai mare și amplu program marca CTR care transformă comunitățile locale, alături de ecosistemele lor de tineret.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden md:block"
          >
            <div className="relative w-full aspect-[16/10] bg-white p-10">
              <Image
                src="/assets/capitala-tineretului/capitala-logo.png"
                alt="Capitala Tineretului din România"
                fill
                className="object-contain p-8"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="text-xl font-bold text-ctr-blue mb-5">
              Cel mai ambițios program național destinat tinerilor
            </h3>
            <p className="text-gray-500 mb-8 leading-relaxed">
              Capitala Tineretului din România pune accent pe dezvoltarea ecosistemelor de tineret
              din zonele românești, în general, și pe dezvoltarea ecosistemelor de tineret urbane,
              în mod special. În cadrul programului, autoritățile locale colaborează cu organizațiile
              neguvernamentale de și pentru tineret și cu mediul privat, și îi pun pe tineri în
              centrul procesului de dezvoltare urbană.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/capitala-tineretului"
                className="bg-ctr-blue text-white px-7 py-3.5 font-semibold hover:bg-ctr-blue/90 transition-colors text-sm tracking-wide uppercase"
              >
                Află mai multe
              </Link>
              <a
                href="https://capitalatineretului.ro/"
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-ctr-blue text-ctr-blue px-7 py-3.5 font-semibold hover:bg-ctr-blue hover:text-white transition-all text-sm tracking-wide uppercase"
              >
                Site-ul oficial
              </a>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-ctr-blue/10">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-[#f8f8f6] p-8 text-center"
            >
              <div className="text-4xl md:text-5xl font-bold text-ctr-red mb-3">{stat.number}</div>
              <div className="text-ctr-blue/70 text-sm font-medium">{stat.text}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CapitalaTineretuluiSection;
