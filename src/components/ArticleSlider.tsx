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
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold">Ultimele Articole</h2>
        <div className="flex space-x-4">
          <button
            onClick={prevSlide}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
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
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            onClick={nextSlide}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
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
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className="relative h-[400px] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {articles.slice(currentIndex, currentIndex + 2).map((article) => (
                <Link
                  key={article.id}
                  href={`/blog/${article.slug}`}
                  className="group"
                >
                  <div className="bg-white rounded-lg shadow-md overflow-hidden h-full">
                    <div className="relative h-48">
                      <Image
                        src={article.coverImage}
                        alt={article.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-sm text-primary font-semibold">
                          {article.category}
                        </span>
                        <span className="text-gray-400">•</span>
                        <span className="text-sm text-gray-500">
                          {new Date(article.publishedAt).toLocaleDateString('ro-RO')}
                        </span>
                      </div>
                      <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                        {article.title}
                      </h3>
                      <p className="text-gray-600 line-clamp-2">{article.excerpt}</p>
                      <div className="flex items-center mt-4">
                        <div className="relative w-8 h-8 rounded-full overflow-hidden mr-2">
                          <Image
                            src={article.author.avatar}
                            alt={article.author.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <span className="text-sm text-gray-600">{article.author.name}</span>
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