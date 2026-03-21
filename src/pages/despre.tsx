import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { motion } from 'framer-motion';
import MainLayout from '../components/layout/MainLayout';
import PageHero from '../components/PageHero';
import { teamMembers, carouselImages } from '../content/data';

export default function DesprePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeTab, setActiveTab] = useState<'leadership' | 'executive' | 'media'>('leadership');

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startAutoSlide = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 5000);
  };

  useEffect(() => {
    startAutoSlide();

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    startAutoSlide();
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
    startAutoSlide();
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    startAutoSlide();
  };

  const filteredMembers = teamMembers.filter(member => member.department === activeTab);

  return (
    <MainLayout>
      <Head>
        <title>Despre Noi | CTR</title>
        <meta name="description" content="Aflați mai multe despre Consiliul Tinerilor din România și echipa noastră" />
      </Head>

      {/* Hero Section */}
      <PageHero
        title="Despre Noi"
        description="Consiliul Tinerilor din România (CTR) este o organizație dedicată reprezentării intereselor tinerilor și dezvoltării de politici și proiecte care să îmbunătățească calitatea vieții acestora. Prin activitățile noastre, vizăm să creăm un mediu în care tinerii să își poată atinge potențialul maxim."
      />

      {/* Photo Carousel */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10">Activitățile Noastre</h2>

          <div className="relative w-full max-w-5xl mx-auto h-[400px] md:h-[500px] overflow-hidden rounded-xl shadow-lg">
            {carouselImages.map((image, index) => (
              <div
                key={index}
                className={`absolute w-full h-full transition-all duration-300 ease-in-out transform ${
                  index === currentSlide ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'
                }`}
              >
                <div className="relative w-full h-full">
                  <Image
                    src={image}
                    alt={`CTR Activity ${index + 1}`}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </div>
              </div>
            ))}

            {/* Prev */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md z-10"
              aria-label="Previous slide"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md z-10"
              aria-label="Next slide"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
              {carouselImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-2.5 h-2.5 rounded-full ${
                    index === currentSlide ? 'bg-primary' : 'bg-gray-300'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission and Vision */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-lg shadow-md"
            >
              <h3 className="text-2xl font-bold text-primary mb-4">Misiunea Noastră</h3>
              <p className="text-gray-700">
                Misiunea noastră este de a reprezenta vocea tinerilor în procesele decizionale și de a implementa proiecte ce contribuie la dezvoltarea socială, educațională și profesională a acestora.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-lg shadow-md"
            >
              <h3 className="text-2xl font-bold text-primary mb-4">Viziunea Noastră</h3>
              <p className="text-gray-700">
                Viziunea noastră este o societate în care tinerii sunt implicați activ în dezvoltarea comunităților, având acces la oportunități și resurse pentru a-și împlini potențialul.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10">Echipa Noastră</h2>

          {/* Tabs */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex bg-gray-100 rounded-full p-1">
              <button onClick={() => setActiveTab('leadership')} className={`px-6 py-2 rounded-full text-sm font-medium ${activeTab === 'leadership' ? 'bg-primary text-white' : 'text-gray-700'}`}>
                Conducere
              </button>
              <button onClick={() => setActiveTab('executive')} className={`px-6 py-2 rounded-full text-sm font-medium ${activeTab === 'executive' ? 'bg-primary text-white' : 'text-gray-700'}`}>
                Executiv
              </button>
              <button onClick={() => setActiveTab('media')} className={`px-6 py-2 rounded-full text-sm font-medium ${activeTab === 'media' ? 'bg-primary text-white' : 'text-gray-700'}`}>
                Media
              </button>
            </div>
          </div>

          {/* Members */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredMembers.map((member) => (
              <div key={member.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:-translate-y-2 transition">
                <div className="relative h-64 w-full bg-gray-200">
                  <Image
                    src={member.photo}
                    alt={member.name}
                    fill
                    style={{ objectFit: 'cover', objectPosition: 'center 30%' }}
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold">{member.name}</h3>
                  <p className="text-primary">{member.position}</p>
                  <a href={`mailto:${member.email}`} className="text-sm text-gray-600">
                    {member.email}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </MainLayout>
  );
}