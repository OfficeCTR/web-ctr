'use client';

import { type ReactNode, useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import { dataInfo } from "../../content/data";

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

  const isHomePage = pathname === "/";

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
            ? "bg-white/95 backdrop-blur-sm shadow-sm"
            : "bg-transparent"
        }`}
      >
        <nav className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="relative w-14 h-14 flex-shrink-0">
              <Image
                src="/assets/ctr-logo.png"
                alt="CTR Logo"
                fill
                className="object-contain"
                priority
              />
            </Link>
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <Link key={item.path} href={item.path} legacyBehavior>
                  <a
                    className={`text-sm tracking-wide font-medium transition-colors duration-200 ${
                      pathname === item.path
                        ? isScrolled || !isHomePage ? "text-ctr-blue" : "text-ctr-yellow"
                        : isScrolled || !isHomePage ? "text-gray-500 hover:text-ctr-blue" : "text-white/70 hover:text-white"
                    }`}
                  >
                    {item.name}
                  </a>
                </Link>
              ))}
            </div>
            <button
              className={`md:hidden flex-shrink-0 ${isScrolled || !isHomePage ? "text-ctr-blue" : "text-white"}`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </nav>
      </header>

      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="fixed top-[72px] left-0 w-full bg-white shadow-lg md:hidden z-40"
        >
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col gap-1">
              {navItems.map((item) => (
                <Link key={item.path} href={item.path} legacyBehavior>
                  <a
                    className={`py-3 px-4 text-sm font-medium transition-colors ${
                      pathname === item.path
                        ? "text-ctr-blue bg-ctr-blue/5"
                        : "text-gray-500 hover:text-ctr-blue"
                    }`}
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

      <footer className="bg-ctr-blue text-white">
        <div className="container mx-auto px-4">
          <div className="py-16 grid grid-cols-1 md:grid-cols-12 gap-12">
            <div className="md:col-span-4">
              <div className="relative w-12 h-12 mb-4">
                <Image
                  src="/assets/ctr-logo.png"
                  alt="CTR"
                  fill
                  className="object-contain"
                />
              </div>
              <p className="text-white/40 text-sm leading-relaxed max-w-xs">
                Consiliul Tineretului din România — #CuȘiDespreTineri
              </p>
            </div>
            <div className="md:col-span-4">
              <h4 className="text-xs font-semibold tracking-[0.15em] uppercase text-white/40 mb-6">Contact</h4>
              <div className="space-y-3 text-sm">
                <p className="text-white/70">{dataInfo.email}</p>
                <p className="text-white/70">{dataInfo.phone}</p>
              </div>
            </div>
            <div className="md:col-span-4">
              <h4 className="text-xs font-semibold tracking-[0.15em] uppercase text-white/40 mb-6">Social</h4>
              <div className="flex gap-6">
                {dataInfo.socials.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    className="text-white/50 hover:text-ctr-yellow transition-colors text-sm"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {social.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="py-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/30">
            <p>&copy; {new Date().getFullYear()} CTR. Toate drepturile rezervate.</p>
            <p>Creat cu &#x2661; de <a href="https://www.linkedin.com/in/crares/" className="text-white/50 hover:text-white transition-colors">Rareș Cotoi</a></p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
