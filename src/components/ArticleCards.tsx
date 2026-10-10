import Link from "next/link";
import { motion } from "framer-motion";
import type { Article } from "../lib/types";
import Cover from "./ui/Cover";
import { TabLabel } from "./ui/Sheet";

const tones = ["blue", "pink", "yellow"] as const;

const ArticleCards = ({ articles }: { articles: Omit<Article, "content">[] }) => {
  if (!articles.length) return null;
  return (
    <ul className="scrollbar-hide -mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-6 pt-4 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:grid-cols-3 lg:gap-8">
      {articles.map((a, i) => (
        <motion.li
          key={a.id}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: (i % 3) * 0.1 }}
          className="w-[82%] shrink-0 snap-center sm:w-auto"
        >
          <Link
            href={`/blog/${a.slug}`}
            className="group flex h-full flex-col overflow-hidden rounded-[26px] bg-white shadow-card transition-all duration-500 hover:-translate-y-2 hover:rotate-[-0.6deg]"
          >
            <Cover src={a.coverImage} alt={a.title} label={a.title} index={i} className="aspect-[16/10]" />
            <div className="flex flex-1 flex-col p-6">
              <div className="flex flex-wrap items-center gap-3 text-sm">
                <TabLabel tone={tones[i % 3]}>{a.category}</TabLabel>
                <span className="text-black/45">
                  {new Date(a.publishedAt).toLocaleDateString("ro-RO", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
              <h3 className="mt-4 text-xl font-bold leading-snug transition-colors group-hover:text-ctr-blue">
                {a.title}
              </h3>
              <p className="mt-3 line-clamp-3 text-[15px] leading-relaxed text-black/60">{a.excerpt}</p>
              <span className="mt-auto inline-flex items-center gap-2 pt-5 font-bold">
                Citește articolul
                <span className="transition-transform duration-300 group-hover:translate-x-1.5">→</span>
              </span>
            </div>
          </Link>
        </motion.li>
      ))}
    </ul>
  );
};

export default ArticleCards;
