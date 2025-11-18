import { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { motion } from 'framer-motion';
import MainLayout from '../components/layout/MainLayout';

interface TeamMember {
  id: number;
  name: string;
  position: string;
  email: string;
  photo: string;
  department: 'leadership' | 'executive' | 'media';
}

const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: 'Rafael Barac Bologa',
    position: 'Președinte',
    email: 'rafael.barac@ctr.ro',
    photo: '/assets/team/Bologa.png',
    department: 'leadership'
  },
  {
    id: 2,
    name: 'Tudor Miu',
    position: 'Secretar General',
    email: 'tudor.miu@ctr.ro',
    photo: '/assets/team/Miu.png',
    department: 'leadership'
  },
  {
    id: 3,
    name: 'Cătălin Ilieș',
    position: 'Vicepreședinte',
    email: 'catalin.ilies@ctr.ro',
    photo: '/assets/team/Ilies.png',
    department: 'leadership'
  },
  {
    id: 4,
    name: 'Cristina Carciuc',
    position: 'Vicepreședinte',
    email: 'cristina.carciuc@ctr.ro',
    photo: '/assets/team/Cristina.png',
    department: 'leadership'
  },
  // {
  //   id: 5,
  //   name: 'Maria Stanescu',
  //   position: 'Coordonator Media',
  //   email: 'maria.stanescu@ctr.ro',
  //   photo: '/assets/team/placeholder.jpg',
  //   department: 'media'
  // },
  // {
  //   id: 6,
  //   name: 'Andrei Munteanu',
  //   position: 'Designer Grafic',
  //   email: 'andrei.munteanu@ctr.ro',
  //   photo: '/assets/team/placeholder.jpg',
  //   department: 'media'
  // },
  // {
  //   id: 7,
  //   name: 'Larisa Bejan',
  //   position: 'Director Departament Relații Internaționale',
  //   email: 'larisa.bejan@ctr.ro',
  //   photo: '/assets/team/placeholder.jpg',
  //   department: 'executive'
  // },
  // {
  //   id: 8,
  //   name: 'Alexandru Cazac',
  //   position: 'Director Departament Fundraising',
  //   email: 'alexandru.cazac@ctr.ro',
  //   photo: '/assets/team/placeholder.jpg',
  //   department: 'executive'
  // }
];

// Carousel image paths - to be replaced with real images
const carouselImages = [
  '/assets/carousel/placeholder1.jpg',
  '/assets/carousel/placeholder2.jpg',
  '/assets/carousel/placeholder3.jpg',
  '/assets/carousel/placeholder4.jpg',
];

export default function DesprePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeTab, setActiveTab] = useState<'leadership' | 'executive' | 'media'>('leadership');

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
  };

  const filteredMembers = teamMembers.filter(member => member.department === activeTab);

  return (
    <MainLayout>
      <Head>
        <title>Despre Noi | CTR</title>
        <meta name="description" content="Aflați mai multe despre Consiliul Tinerilor din România și echipa noastră" />
      </Head>

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-primary">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Despre Noi</h1>
            <div className="max-w-3xl mx-auto">
              <p className="text-lg text-white/90 mb-8">
                Consiliul Tinerilor din România (CTR) este o organizație dedicată reprezentării intereselor tinerilor și dezvoltării de politici și proiecte care să îmbunătățească calitatea vieții acestora. Prin activitățile noastre, vizăm să creăm un mediu în care tinerii să își poată atinge potențialul maxim.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Photo Carousel */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10">Activitățile Noastre</h2>
          
          <div className="relative w-full max-w-5xl mx-auto h-[400px] md:h-[500px] overflow-hidden rounded-xl shadow-lg">
            {carouselImages.map((image, index) => (
              <div
                key={index}
                className={`absolute w-full h-full transition-all duration-500 ease-in-out transform ${
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
            
            <button 
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md z-10"
              aria-label="Previous slide"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <button 
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md z-10"
              aria-label="Next slide"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
              {carouselImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
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
              transition={{ duration: 0.6 }}
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
              transition={{ duration: 0.6, delay: 0.2 }}
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
          
          {/* Department Tabs */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex bg-gray-100 rounded-full p-1">
              <button
                onClick={() => setActiveTab('leadership')}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeTab === 'leadership' ? 'bg-primary text-white' : 'text-gray-700 hover:bg-gray-200'
                }`}
              >
                Conducere
              </button>
              <button
                onClick={() => setActiveTab('executive')}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeTab === 'executive' ? 'bg-primary text-white' : 'text-gray-700 hover:bg-gray-200'
                }`}
              >
                Executiv
              </button>
              <button
                onClick={() => setActiveTab('media')}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeTab === 'media' ? 'bg-primary text-white' : 'text-gray-700 hover:bg-gray-200'
                }`}
              >
                Media
              </button>
            </div>
          </div>
          
          {/* Team Members Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredMembers.map((member) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true, margin: "-50px" }}
                whileHover={{ y: -10 }}
                className="bg-white rounded-xl shadow-md overflow-hidden transform transition-all duration-300"
              >
                <div className="relative h-64 w-full bg-gray-200">
                  <Image
                    src={member.photo}
                    alt={member.name}
                    fill
                    style={{ objectFit: 'cover', objectPosition: 'center 30%' }}
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-primary font-medium mb-3">{member.position}</p>
                  <div className="flex items-center text-gray-600">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <a href={`mailto:${member.email}`} className="text-sm hover:text-primary transition-colors">
                      {member.email}
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Organizational Values */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Valorile Noastre</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-xl shadow-md text-center"
            >
              <div className="w-16 h-16 mx-auto mb-6 bg-primary/10 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-primary" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Dezvoltare</h3>
              <p className="text-gray-600">
                Construim oportunități pentru creșterea personală și profesională a tinerilor din România.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-xl shadow-md text-center"
            >
              <div className="w-16 h-16 mx-auto mb-6 bg-primary/10 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-primary" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Incluziune</h3>
              <p className="text-gray-600">
                Ne asigurăm că toți tinerii au oportunitatea de a participa și contribui, indiferent de background.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-xl shadow-md text-center"
            >
              <div className="w-16 h-16 mx-auto mb-6 bg-primary/10 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-primary" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Inovație</h3>
              <p className="text-gray-600">
                Încurajăm gândirea creativă și abordările noi în rezolvarea provocărilor cu care se confruntă tinerii.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
} 