'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Article } from '../types/article';

interface ArticleSliderProps {
  articles: Article[];
}

const ArticleSlider = ({ articles }: ArticleSliderProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % articles.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + articles.length) % articles.length);
  };

  return (
    <div className="relative w-full">
      <div className="flex justify-between items-end mb-10">
        <div>
          <span className="text-ctr-red font-semibold tracking-[0.15em] uppercase text-xs mb-3 block">
            Blog
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-ctr-blue">Ultimele Articole</h2>
        </div>
        <div className="flex gap-2">
          <button
            onClick={prevSlide}
            className="w-12 h-12 flex items-center justify-center border border-ctr-blue/20 text-ctr-blue hover:bg-ctr-blue hover:text-white transition-all"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={nextSlide}
            className="w-12 h-12 flex items-center justify-center border border-ctr-blue/20 text-ctr-blue hover:bg-ctr-blue hover:text-white transition-all"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      <div className="relative h-[420px] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -80 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {articles.slice(currentIndex, currentIndex + 2).map((article) => (
                <Link
                  key={article.id}
                  href={`/blog/${article.slug}`}
                  className="group block"
                >
                  <div className="bg-white border border-gray-100 overflow-hidden h-full">
                    <div className="relative h-56">
                      <Image
                        src={article.coverImage}
                        alt={article.title}
                        fill
                        className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-xs font-semibold text-ctr-red tracking-wide uppercase">
                          {article.category}
                        </span>
                        <span className="text-gray-300">|</span>
                        <span className="text-xs text-gray-400">
                          {new Date(article.publishedAt).toLocaleDateString('ro-RO')}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-ctr-blue mb-2 group-hover:text-ctr-red transition-colors line-clamp-2">
                        {article.title}
                      </h3>
                      <p className="text-gray-500 text-sm line-clamp-2">{article.excerpt}</p>
                      <div className="flex items-center mt-5 pt-4 border-t border-gray-100">
                        <div className="relative w-7 h-7 rounded-full overflow-hidden mr-2.5">
                          <Image
                            src={article.author.avatar}
                            alt={article.author.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <span className="text-xs text-gray-500 font-medium">{article.author.name}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ArticleSlider;
