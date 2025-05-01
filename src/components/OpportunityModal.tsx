import { motion, AnimatePresence } from 'framer-motion';
import { type Opportunity } from '../utils/googleSheets';
import Image from 'next/image';

interface OpportunityModalProps {
  opportunity: Opportunity | null;
  onClose: () => void;
}

export default function OpportunityModal({ opportunity, onClose }: OpportunityModalProps) {
  if (!opportunity) return null;

  const deadlineDate = new Date(opportunity.deadline);
  const isDeadlineNear = deadlineDate.getTime() - Date.now() < 7 * 24 * 60 * 60 * 1000; // 7 days

  // Validate if the imageUrl is a valid URL
  const isValidImageUrl = opportunity.imageUrl?.startsWith('http://') || 
                         opportunity.imageUrl?.startsWith('https://') ||
                         opportunity.imageUrl?.startsWith('/');

  // Ensure the link is absolute
  const getAbsoluteLink = (link?: string) => {
    if (!link) return undefined;
    if (link.startsWith('http://') || link.startsWith('https://')) return link;
    return `https://${link}`;
  };

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
          className="bg-white rounded-2xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          onClick={e => e.stopPropagation()}
        >
          {/* Header with Image */}
          <div className="relative h-48 md:h-64 rounded-t-2xl overflow-hidden">
            {opportunity.imageUrl && isValidImageUrl ? (
              <Image
                src={opportunity.imageUrl}
                alt={opportunity.title}
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
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    opportunity.isActive
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {opportunity.isActive ? 'Activ' : 'Expirat'}
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
                {opportunity.title}
              </h2>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Organization and Location */}
            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
              {opportunity.organization && (
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  {opportunity.organization}
                </div>
              )}
              {opportunity.location && (
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {opportunity.location}
                </div>
              )}
            </div>

            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Despre Oportunitate</h3>
              <p className="text-gray-600 whitespace-pre-line">{opportunity.fullDescription}</p>
            </div>

            {/* Requirements */}
            {opportunity.requirements && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Cerințe</h3>
                <p className="text-gray-600 whitespace-pre-line">{opportunity.requirements}</p>
              </div>
            )}

            {/* Benefits */}
            {opportunity.benefits && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Beneficii</h3>
                <p className="text-gray-600 whitespace-pre-line">{opportunity.benefits}</p>
              </div>
            )}

            {/* Deadline and Link */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-4 border-t">
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <div>
                  <span className="text-sm text-gray-600">Termen limită:</span>
                  <span className={`ml-2 font-medium ${isDeadlineNear ? 'text-red-600' : 'text-gray-900'}`}>
                    {deadlineDate.toLocaleDateString('ro-RO', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                </div>
              </div>
              {opportunity.link && (
                <a
                  href={getAbsoluteLink(opportunity.link)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Aplică acum
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
} 