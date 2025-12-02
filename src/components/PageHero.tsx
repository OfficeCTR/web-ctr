import { motion } from 'framer-motion';

interface PageHeroProps {
  title: string;
  description?: string;
  className?: string;
}

const PageHero = ({ title, description, className = '' }: PageHeroProps) => {
  return (
    <section className={`relative pt-32 pb-16 md:pt-40 md:pb-20 bg-gradient-to-b from-blue-900 to-blue-800 text-white overflow-hidden ${className}`}>
      {/* Optional pattern overlay if needed later, keeping it clean for now as per Support page style */}
      
      <div className="container mx-auto px-4 text-center relative z-10">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
        >
          {title}
        </motion.h1>
        {description && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="max-w-3xl mx-auto"
          >
            <p className="text-lg md:text-xl text-blue-100 leading-relaxed">
              {description}
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default PageHero;

