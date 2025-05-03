'use client';

import { type ReactNode, useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: "Acasă", path: "/" },
    { name: "Despre Noi", path: "/despre" },
    { name: "Oportunități", path: "/oportunitati" },
    { name: "Proiecte", path: "/proiecte" },
    { name: "Membri", path: "/membri" },
    { name: "Susține-ne", path: "/support" },
    { name: "Contact", path: "/contact-page" },
  ];

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden w-full">
      <header 
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled 
            ? "bg-white shadow-md" 
            : "bg-transparent"
        }`}
      >
        <nav className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="relative w-16 h-16 flex-shrink-0 md:block">
              <Image
                src="/assets/ctr-logo.png"
                alt="CTR Logo"
                fill
                className="object-contain"
                priority
              />
            </Link>
            <div className="hidden md:flex space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  legacyBehavior
                >
                  <a
                    className={`${
                      pathname === item.path
                        ? isScrolled ? "text-primary font-semibold" : "text-yellow-400 font-semibold"
                        : isScrolled ? "text-gray-600 hover:text-primary" : "text-white hover:text-yellow-400"
                    } transition-colors duration-200`}
                  >
                    {item.name}
                  </a>
                </Link>
              ))}
            </div>
            <button 
              className={`md:hidden ${isScrolled ? "text-gray-600" : "text-white"} flex-shrink-0`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed top-20 left-0 w-full bg-white shadow-lg md:hidden z-40"
        >
          <div className="container mx-auto px-4 py-4">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  legacyBehavior
                >
                  <a
                    className={`${
                      pathname === item.path
                        ? "text-primary font-semibold"
                        : "text-gray-600 hover:text-primary"
                    } transition-colors duration-200 py-2`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </a>
                </Link>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      <main className="flex-grow overflow-x-hidden">{children}</main>

      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">CTR</h3>
              <p className="text-gray-400">
                Organizație de tineret dedicată dezvoltării comunității.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Contact</h3>
              <p className="text-gray-400">Email: contact@ctr.ro</p>
              <p className="text-gray-400">Telefon: +40 123 456 789</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Urmărește-ne</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  Facebook
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  Instagram
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} CTR. Toate drepturile rezervate.</p>
            <p>Creat cu &#x2661; de <a href="https://www.linkedin.com/in/crares/">Rareș Cotoi</a></p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout; 