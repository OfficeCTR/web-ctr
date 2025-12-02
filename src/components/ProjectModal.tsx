import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Project } from '~/content/data';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  if (!project) return null;

  // Validate if the imageUrl is a valid URL
  const isValidImageUrl = project.imageUrl?.startsWith('http://') || 
                          project.imageUrl?.startsWith('https://') ||
                          project.imageUrl?.startsWith('/');

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="bg-white rounded-2xl shadow-xl max-w-5xl w-full max-h-[90vh] overflow-y-auto"
          onClick={e => e.stopPropagation()}
        >
          {/* Header with Image */}
          <div className="relative h-64 md:h-80 rounded-t-2xl overflow-hidden">
            {project.imageUrl && isValidImageUrl ? (
              <Image
                src={project.imageUrl}
                alt={project.title}
                fill
                className="object-cover"
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary" />
            )}
            {/* Black gradient at the bottom for readability */}
            <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/70 via-black/30 to-transparent pointer-events-none" />
            <div className="absolute inset-0 bg-black/30" />
            
            <div className="absolute inset-0 p-6 flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-white/90 backdrop-blur-sm text-primary">
                  {project.year}
                </span>
                <button
                  onClick={onClose}
                  className="text-white hover:text-gray-200 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white">
                {project.title}
              </h2>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Project Quick Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-xl">
              <div className="flex flex-col">
                <span className="text-sm text-gray-500">Locație</span>
                <span className="font-medium text-gray-900">{project.location}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm text-gray-500">Durată</span>
                <span className="font-medium text-gray-900">{project.duration}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm text-gray-500">Participanți</span>
                <span className="font-medium text-gray-900">{project.participants}</span>
              </div>
            </div>

            {/* Project Description */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Despre Proiect</h3>
              <p className="text-gray-600 whitespace-pre-line">{project.fullDescription}</p>
            </div>
            
            {/* Impact */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Impact</h3>
              <p className="text-gray-600">{project.impact}</p>
            </div>

            {/* Partners */}
            {project.partners && project.partners.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Parteneri</h3>
                <div className="flex flex-wrap gap-2">
                  {project.partners.map((partner, idx) => (
                    <span 
                      key={idx} 
                      className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm"
                    >
                      {partner}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Gallery */}
            {project.galleryImages && project.galleryImages.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Galerie</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {project.galleryImages.map((image, idx) => (
                    <div key={idx} className="relative h-40 rounded-lg overflow-hidden">
                      <Image
                        src={image}
                        alt={`${project.title} - Image ${idx + 1}`}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
} 