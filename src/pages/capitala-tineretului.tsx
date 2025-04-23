import { NextPage } from "next";
import Head from "next/head";
import MainLayout from "../components/layout/MainLayout";
import { motion } from "framer-motion";
import Image from "next/image";

const CapitalaTineretului: NextPage = () => {
  return (
    <MainLayout>
      <Head>
        <title>Capitala Tineretului din România | CTR</title>
        <meta name="description" content="Cel mai ambițios program național destinat tinerilor care pune accent pe dezvoltarea ecosistemelor de tineret din România." />
      </Head>

      {/* Hero Section */}
      <section className="relative bg-[#0B1C3D] py-20 md:py-32">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('/assets/pattern.svg')] bg-repeat"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                  Capitala Tineretului din România
                </h1>
                <div className="w-32 h-1 bg-[#FF0000] mb-8"></div>
                <p className="text-white/90 text-lg md:text-xl mb-10 max-w-xl">
                  Cel mai ambițios program național destinat tinerilor, creat pentru dezvoltarea ecosistemelor de tineret din România.
                </p>
                <a 
                  href="https://capitalatineretului.ro/" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-8 py-4 bg-[#FF0000] text-white font-semibold rounded-lg shadow-lg hover:bg-red-700 transition-all transform hover:scale-105"
                >
                  Vizitează site-ul oficial
                </a>
              </motion.div>
            </div>
            <div className="md:w-1/2">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="relative w-full aspect-[4/3] bg-white rounded-2xl overflow-hidden shadow-2xl p-8"
              >
                <Image
                  src="/assets/capitala-tineretului/capitala-logo.png"
                  alt="Capitala Tineretului din România"
                  fill
                  className="object-contain scale-90"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#0B1C3D] mb-6">
              Ce este Capitala Tineretului din România?
            </h2>
            <div className="w-24 h-1 bg-[#FF0000] mx-auto mb-8"></div>
            <p className="text-gray-700 text-lg">
              Capitala Tineretului din România este un program-cadru de tineret, creat la nivel național, 
              ce funcționează pe principii similare cu cele ale Capitalei Europene a Tineretului.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Un program ambițios",
                description: "Programul pune accent pe dezvoltarea ecosistemelor de tineret din zonele românești, în general, și pe dezvoltarea ecosistemelor de tineret urbane, în mod special.",
                icon: "📈"
              },
              {
                title: "Colaborare multi-sectorială",
                description: "În cadrul programului, autoritățile locale colaborează cu organizațiile neguvernamentale de și pentru tineret și cu mediul privat.",
                icon: "🤝"
              },
              {
                title: "Tinerii în centrul dezvoltării",
                description: "Programul îi pune pe tineri în centrul procesului de dezvoltare urbană și al comunităților locale.",
                icon: "🚀"
              },
              {
                title: "Concurs anual",
                description: "Anual, un oraș din România primește, în urma unui concurs de concepte, titlul de Capitala Tineretului din România.",
                icon: "🏆"
              },
              {
                title: "Sprijin pentru implementare",
                description: "Orașul câștigător este sprijinit financiar, respectiv prin formare și consultanță, în pregătirea și implementarea inițiativelor.",
                icon: "💰"
              },
              {
                title: "Impact pe termen lung",
                description: "Programul devine un instrument eficient de mobilizare a resurselor locale pentru o mai bună dezvoltare economică și socială.",
                icon: "🔄"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all hover:scale-105"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-[#0B1C3D] mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#0B1C3D] mb-6">
              Programul în cifre
            </h2>
            <div className="w-24 h-1 bg-[#FF0000] mx-auto mb-8"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { number: "8", text: "Orașe Capitale ale Tineretului din România" },
              { number: "1210", text: "Evenimente, activități și proiecte organizate" },
              { number: "1524", text: "Persoane voluntare în cadrul programelor" },
              { number: "27", text: "Orașe candidate la titlu" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg p-10 text-center hover:shadow-xl transition-all hover:scale-105"
              >
                <div className="text-5xl font-bold text-[#FF0000] mb-4">{stat.number}</div>
                <div className="text-[#0B1C3D] font-medium">{stat.text}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#0B1C3D] mb-6">
              Partenerii programului
            </h2>
            <div className="w-24 h-1 bg-[#FF0000] mx-auto mb-8"></div>
            <p className="text-gray-700 text-lg">
              Capitala Tineretului din România este susținută de un parteneriat puternic de organizații.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: "Consiliul Tineretului din România", logo: "/assets/ctr-logo.png" },
              { name: "Federația Tinerilor din Cluj", logo: "/assets/capitala-tineretului/ftc-logo.png" },
              { name: "Grupul PONT", logo: "/assets/capitala-tineretului/pont-logo.png" },
              { name: "Banca Comercială Română", logo: "/assets/capitala-tineretului/BCR_whitebg.svg" },
            ].map((partner, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center justify-center text-center min-h-[200px] hover:shadow-xl transition-all hover:scale-105 border border-gray-100"
              >
                <div className="relative w-24 h-24 mb-4">
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    fill
                    className="object-contain"
                  />
                </div>
                <h3 className="text-xl font-medium text-[#0B1C3D]">{partner.name}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#0B1C3D] to-[#1a2b4a] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('/assets/pattern.svg')] bg-repeat"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Descoperă tot ce are de oferit programul Capitala Tineretului din România
            </h2>
            <p className="text-white/80 text-lg mb-10 max-w-2xl mx-auto">
              Vizitează site-ul oficial pentru informații complete despre program, ediții anterioare, 
              știri recente și detalii despre procesul de candidatură.
            </p>
            <a 
              href="https://capitalatineretului.ro/" 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-4 bg-[#FF0000] text-white font-semibold rounded-lg shadow-lg hover:bg-red-700 transition-all transform hover:scale-105"
            >
              Vizitează www.capitalatineretului.ro
            </a>
          </motion.div>
        </div>
      </section>
    </MainLayout>
  );
};

export default CapitalaTineretului; 