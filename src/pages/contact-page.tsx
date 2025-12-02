import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa';
import MainLayout from '../components/layout/MainLayout';
import PageHero from '../components/PageHero';
import { dataInfo } from "../content/data";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    success?: boolean;
    message?: string;
  }>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({});

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      
      if (response.ok) {
        setSubmitStatus({
          success: true,
          message: data.message || 'Mesajul a fost trimis cu succes!',
        });
        // Reset form on success
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      } else {
        setSubmitStatus({
          success: false,
          message: data.message || 'A apărut o eroare. Vă rugăm să încercați din nou.',
        });
      }
    } catch (error) {
      setSubmitStatus({
        success: false,
        message: 'A apărut o eroare de conexiune. Vă rugăm să încercați din nou.',
      });
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <MainLayout>
      <PageHero 
        title="Contactează-ne"
        description="Suntem aici să răspundem la întrebările tale și să te ajutăm cu orice informații ai nevoie."
      />
      
      <div className="min-h-screen pb-16 relative z-10">
        <div className="container mx-auto px-6 pt-16">

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Information - Increase padding and font sizes */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-2xl shadow-xl p-10"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Informații de Contact</h2>
              
              <div className="space-y-8">
                <div className="flex items-start space-x-5">
                  <div className="bg-red-100 p-4 rounded-full">
                    <FaEnvelope className="text-red-600 text-2xl" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-xl">Email</h3>
                    <p className="text-gray-600 text-lg">{dataInfo.email}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-5">
                  <div className="bg-yellow-100 p-4 rounded-full">
                    <FaPhone className="text-yellow-600 text-2xl" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-xl">Telefon</h3>
                    <p className="text-gray-600 text-lg">{dataInfo.phone}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-5">
                  <div className="bg-red-100 p-4 rounded-full">
                    <FaMapMarkerAlt className="text-red-600 text-2xl" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-xl">Adresă</h3>
                    <p className="text-gray-600 text-lg">{dataInfo.address}</p>
                  </div>
                </div>
              </div>

              <div className="mt-10">
                <h3 className="font-semibold text-gray-900 text-xl mb-5">Urmărește-ne</h3>
                  <div className="flex space-x-5">
                      {dataInfo.socials.map((social) => {
                          const Icon =
                              social.name === "Facebook"
                                  ? FaFacebook
                                  : social.name === "Instagram"
                                      ? FaInstagram
                                      : FaLinkedin;

                          const hoverColor =
                              social.name === "Facebook"
                                  ? "hover:bg-red-100 hover:text-red-600"
                                  : social.name === "Instagram"
                                      ? "hover:bg-yellow-100 hover:text-yellow-600"
                                      : "hover:bg-red-100 hover:text-red-600";

                          return (
                              <a
                                  key={social.name}
                                  href={social.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className={`bg-gray-100 p-4 rounded-full transition-colors ${hoverColor}`}
                              >
                                  <Icon className="text-gray-600 text-2xl" />
                              </a>
                          );
                      })}
                  </div>
              </div>
            </motion.div>

            {/* Contact Form - Increase padding, font sizes, and input heights */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-white rounded-2xl shadow-xl p-10"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Trimite-ne un mesaj</h2>
              
              {submitStatus.success && (
                <div className="bg-green-50 border border-green-200 text-green-700 px-6 py-4 rounded-lg mb-6">
                  <p className="font-medium">{submitStatus.message}</p>
                </div>
              )}

              {submitStatus.success === false && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg mb-6">
                  <p className="font-medium">{submitStatus.message}</p>
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-lg font-medium text-gray-700 mb-2">
                    Nume
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-5 py-3 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                    required
                    disabled={isSubmitting}
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-lg font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-5 py-3 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                    required
                    disabled={isSubmitting}
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-lg font-medium text-gray-700 mb-2">
                    Subiect
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-5 py-3 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                    required
                    disabled={isSubmitting}
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-lg font-medium text-gray-700 mb-2">
                    Mesaj
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className="w-full px-5 py-3 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                    required
                    disabled={isSubmitting}
                  />
                </div>

                <button
                  type="submit"
                  className={`w-full bg-gradient-to-r from-red-600 to-yellow-500 text-white font-semibold py-4 px-6 text-lg rounded-lg transition-colors transform hover:scale-[1.02] mt-4 ${
                    isSubmitting ? 'opacity-70 cursor-not-allowed from-red-400 to-yellow-400' : 'hover:from-red-700 hover:to-yellow-600'
                  }`}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Se trimite...
                    </span>
                  ) : (
                    'Trimite Mesajul'
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ContactPage; 