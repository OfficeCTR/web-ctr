import { useMemo, useState } from "react";
import type { GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import MainLayout from "../../components/layout/MainLayout";
import PageHero from "../../components/PageHero";
import ArticleCards from "../../components/ArticleCards";
import Cover from "../../components/ui/Cover";
import { PillTabs, SectionTitle, Sheet, TabLabel } from "../../components/ui/Sheet";
import { stickers } from "../../components/ui/sticker";
import { getArticles } from "../../lib/content";
import type { ArticleSummary } from "../../lib/types";

const PAGE_SIZE = 9;

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("ro-RO", { year: "numeric", month: "long", day: "numeric" });

const normalize = (value: string) => value.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

const FeaturedArticle = ({ article }: { article: ArticleSummary }) => (
  <motion.div
    initial={{ opacity: 0, y: 40, rotate: 0 }}
    whileInView={{ opacity: 1, y: 0, rotate: -0.8 }}
    viewport={{ once: true }}
    transition={{ type: "spring", stiffness: 110, damping: 16 }}
    className="relative"
  >
    <span
      className="absolute -top-7 left-4 z-10 -rotate-6 font-script text-3xl sm:-top-9 sm:left-8 sm:text-4xl"
      style={stickers.scriptWhiteOnPink}
    >
      Cel mai recent
    </span>
    <Link
      href={`/blog/${article.slug}`}
      className="paper-card group grid overflow-hidden transition-transform duration-500 hover:-translate-y-2 hover:rotate-[0.6deg] lg:grid-cols-[1.15fr_1fr]"
    >
      <div className="relative p-3 sm:p-4 lg:pr-0">
        <Cover
          src={article.coverImage}
          alt={article.title}
          label={article.title}
          sizes="(max-width: 1024px) 100vw, 55vw"
          className="aspect-[16/10] rounded-[20px] lg:aspect-auto lg:h-full lg:min-h-[380px]"
        />
      </div>
      <div className="flex flex-col p-7 sm:p-10">
        <div className="flex flex-wrap items-center gap-3 text-sm sm:text-base">
          <TabLabel tone="yellow">{article.category}</TabLabel>
          <span className="text-black/45">{formatDate(article.publishedAt)}</span>
        </div>
        <h2 className="mt-5 text-2xl font-bold leading-tight transition-colors group-hover:text-ctr-blue sm:text-4xl">
          {article.title}
        </h2>
        <p className="mt-4 line-clamp-4 text-lg leading-relaxed text-black/65">{article.excerpt}</p>
        <div className="mt-auto flex items-center justify-between gap-4 pt-8">
          <span className="flex items-center gap-3 text-sm">
            <span className="relative h-10 w-10 overflow-hidden rounded-full ring-2 ring-ctr-blue">
              <Image src={article.author.avatar} alt="" fill sizes="40px" className="object-cover" />
            </span>
            <span className="font-semibold">{article.author.name}</span>
          </span>
          <span className="btn-pill bg-ctr-ink px-6 py-3 text-white transition-colors group-hover:bg-ctr-pink">
            Citește <span className="transition-transform duration-300 group-hover:translate-x-1.5">→</span>
          </span>
        </div>
      </div>
    </Link>
  </motion.div>
);

export const getStaticProps: GetStaticProps = async () => ({ props: { articles: await getArticles() } });

export default function BlogPage({ articles }: { articles: ArticleSummary[] }) {
  const [category, setCategory] = useState("all");
  const [query, setQuery] = useState("");
  const [visible, setVisible] = useState(PAGE_SIZE);

  const categories = useMemo(() => {
    const counts = new Map<string, number>();
    articles.forEach((a) => counts.set(a.category, (counts.get(a.category) ?? 0) + 1));
    return [
      { id: "all", label: `Toate (${articles.length})` },
      ...Array.from(counts.entries()).map(([name, count]) => ({ id: name, label: `${name} (${count})` })),
    ];
  }, [articles]);

  const filtering = category !== "all" || query.trim() !== "";
  const filtered = useMemo(() => {
    const q = normalize(query.trim());
    return articles.filter(
      (a) =>
        (category === "all" || a.category === category) &&
        (!q || normalize(`${a.title} ${a.excerpt} ${a.category}`).includes(q)),
    );
  }, [articles, category, query]);

  const featured = !filtering ? filtered[0] : undefined;
  const rest = featured ? filtered.slice(1) : filtered;
  const shown = rest.slice(0, visible);

  const changeCategory = (id: string) => {
    setCategory(id);
    setVisible(PAGE_SIZE);
  };

  return (
    <MainLayout>
      <Head>
        <title>Blog | CTR</title>
        <meta
          name="description"
          content="Poziții, proiecte, evenimente și noutăți din activitatea Consiliului Tineretului din România."
        />
      </Head>

      <PageHero
        title="Blogul"
        script="CTR"
        accent="pink"
        image="/assets/design/photos/summit-x-stage.jpg"
        imageAlt="Tineri la Summitul Tinerilor"
        description="Poziții, proiecte, evenimente și tot ce se întâmplă în ecosistemul de tineret — povestite de noi."
      >
        <a href="#articole" className="btn-pill group bg-ctr-pink text-white hover:bg-white hover:text-ctr-ink">
          Vezi articolele
          <span className="transition-transform group-hover:translate-y-1" aria-hidden>
            ↓
          </span>
        </a>
      </PageHero>

      <Sheet>
        <section id="articole" className="relative scroll-mt-24 overflow-hidden pb-24 pt-16 lg:pt-20">
          <div
            className="pointer-events-none absolute -right-10 top-0 hidden w-[30%] max-w-[380px] opacity-60 lg:block"
            aria-hidden
          >
            <Image
              src="/assets/design/ctr-pattern-faded.png"
              alt=""
              width={1400}
              height={1350}
              className="h-auto w-full -scale-x-100"
            />
          </div>

          <div className="shell relative">
            <div className="mx-auto max-w-2xl">
              <label htmlFor="blog-search" className="sr-only">
                Caută în articole
              </label>
              <div className="relative">
                <input
                  id="blog-search"
                  type="search"
                  placeholder="Caută în articole..."
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setVisible(PAGE_SIZE);
                  }}
                  className="w-full rounded-full border-2 border-black bg-white px-7 py-4 pr-16 text-lg shadow-[6px_6px_0_#0A0A0A] outline-none transition-shadow placeholder:text-black/40 focus:shadow-[6px_6px_0_#FE558E]"
                />
                <span className="pointer-events-none absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-ctr-pink text-white">
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.4}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </span>
              </div>
            </div>

            <div className="mt-8">
              <PillTabs tone="pink" options={categories} value={category} onChange={changeCategory} />
            </div>

            {featured && (
              <div className="mt-20">
                <FeaturedArticle article={featured} />
              </div>
            )}

            {rest.length > 0 && (
              <div className="mt-20">
                {!filtering && <SectionTitle before="Toate" script="articolele" tone="blue" />}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${category}-${query}`}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className={filtering ? "" : "mt-12"}
                  >
                    <ArticleCards articles={shown} stacked />
                  </motion.div>
                </AnimatePresence>
                {rest.length > visible && (
                  <div className="mt-10 flex justify-center">
                    <button
                      type="button"
                      onClick={() => setVisible((v) => v + PAGE_SIZE)}
                      className="btn-pill group border-2 border-black bg-white text-ctr-ink shadow-[5px_5px_0_#0A0A0A] hover:shadow-[5px_5px_0_#5B8FFF]"
                    >
                      Încarcă mai multe articole
                      <span className="transition-transform group-hover:translate-y-1" aria-hidden>
                        ↓
                      </span>
                    </button>
                  </div>
                )}
              </div>
            )}

            {filtered.length === 0 && (
              <div className="mx-auto mt-16 max-w-lg text-center">
                <p className="font-script text-4xl text-ctr-pink">Hmm...</p>
                <p className="mt-3 text-lg text-black/60">Nu am găsit articole care să corespundă căutării tale.</p>
                <button
                  type="button"
                  onClick={() => {
                    setQuery("");
                    changeCategory("all");
                  }}
                  className="btn-pill mt-6 bg-ctr-ink text-white hover:bg-ctr-pink"
                >
                  Arată toate articolele
                </button>
              </div>
            )}
          </div>
        </section>
      </Sheet>
    </MainLayout>
  );
}
