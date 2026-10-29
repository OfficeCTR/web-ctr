import { type GetStaticProps, type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import MainLayout from "../../components/layout/MainLayout";
import ArticleCards from "../../components/ArticleCards";
import ArticleGallery from "../../components/ArticleGallery";
import { SectionTitle, Sheet, TabLabel } from "../../components/ui/Sheet";
import { getArticle, getArticles } from "../../lib/content";
import type { Article, ArticleSummary } from "../../lib/types";

interface ArticlePageProps {
  article: Article | null;
  related: ArticleSummary[];
}

const ArticlePage: NextPage<ArticlePageProps> = ({ article, related }) => {
  const router = useRouter();

  if (router.isFallback || !article) {
    return (
      <MainLayout>
        <div className="flex min-h-screen items-center justify-center bg-black px-5 text-center text-white">
          {router.isFallback ? (
            <p className="font-script text-4xl text-ctr-blue">Se încarcă articolul...</p>
          ) : (
            <div>
              <h1 className="text-4xl font-bold">Articolul nu a fost găsit</h1>
              <p className="mt-4 text-white/70">Ne pare rău, dar articolul pe care îl cauți nu există.</p>
              <Link href="/" className="btn-pill mt-8 bg-ctr-yellow text-ctr-ink">
                Înapoi acasă
              </Link>
            </div>
          )}
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <Head>
        <title>{article.title} | CTR</title>
        <meta name="description" content={article.excerpt} />
      </Head>

      <article>
        <header className="relative overflow-hidden bg-black pb-48 pt-32 text-white sm:pt-40 lg:pb-60 lg:pt-48">
          <Image src={article.coverImage} alt="" fill priority sizes="100vw" className="object-cover opacity-45" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black" />
          <div className="pointer-events-none absolute -right-10 top-24 w-[34%] max-w-[360px] opacity-80" aria-hidden>
            <Image src="/assets/design/hero-splatter.png" alt="" width={668} height={842} className="h-auto w-full" />
          </div>
          <div className="relative mx-auto max-w-4xl px-5 sm:px-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <Link
                href="/blog"
                className="group mb-8 inline-flex items-center gap-2 font-cond text-lg font-semibold text-white/80 transition-colors hover:text-ctr-yellow"
              >
                <span className="transition-transform group-hover:-translate-x-1" aria-hidden>
                  ←
                </span>
                Toate articolele
              </Link>
              <div className="flex flex-wrap items-center gap-3 text-sm sm:text-base">
                <TabLabel tone="yellow">{article.category}</TabLabel>
                <span className="text-white/70">
                  {new Date(article.publishedAt).toLocaleDateString("ro-RO", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
              <h1 className="mt-6 text-4xl font-bold leading-[1.05] sm:text-5xl lg:text-6xl">{article.title}</h1>
              <div className="mt-8 flex items-center gap-4">
                <div className="relative h-12 w-12 overflow-hidden rounded-full ring-4 ring-ctr-blue">
                  <Image src={article.author.avatar} alt={article.author.name} fill className="object-cover" />
                </div>
                <div>
                  <p className="font-bold">{article.author.name}</p>
                  <p className="text-sm text-white/60">Autor</p>
                </div>
              </div>
            </motion.div>
          </div>
        </header>

        <Sheet>
          <div className="mx-auto max-w-3xl px-5 py-16 sm:px-8 lg:py-20">
            <div className="relative -mt-36 mb-12 aspect-[16/9] overflow-hidden rounded-[26px] border-[6px] border-white bg-white shadow-card lg:-mt-44">
              <Image
                src={article.coverImage}
                alt={article.title}
                fill
                sizes="(max-width: 768px) 100vw, 768px"
                className="object-cover"
              />
            </div>
            <div className="text-lg leading-relaxed text-black/80">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  p: ({ children }) => {
                    const text = children?.toString() || "";
                    if (text.startsWith("[-]")) {
                      return (
                        <ul className="my-4 list-disc pl-6 marker:text-ctr-pink">
                          <li className="mb-2">{text.replace("[-]", "").trim()}</li>
                        </ul>
                      );
                    }
                    return <p className="mb-5">{children}</p>;
                  },
                  h1: ({ children }) => (
                    <h2 className="mb-5 mt-12 text-3xl font-bold leading-tight text-ctr-ink sm:text-4xl">{children}</h2>
                  ),
                  h2: ({ children }) => (
                    <h2 className="mb-4 mt-10 text-2xl font-bold leading-tight text-ctr-ink sm:text-3xl">{children}</h2>
                  ),
                  h3: ({ children }) => <h3 className="mb-3 mt-8 text-xl font-bold text-ctr-ink">{children}</h3>,
                  a: ({ children, href }) => (
                    <a
                      href={href}
                      className="font-semibold text-ctr-blue underline decoration-ctr-yellow decoration-[3px] underline-offset-4 hover:text-ctr-pink"
                    >
                      {children}
                    </a>
                  ),
                  strong: ({ children }) => <strong className="font-bold text-ctr-ink">{children}</strong>,
                  ul: ({ children }) => (
                    <ul className="my-5 list-disc space-y-2 pl-6 marker:text-ctr-pink">{children}</ul>
                  ),
                  ol: ({ children }) => (
                    <ol className="my-5 list-decimal space-y-2 pl-6 marker:font-bold marker:text-ctr-blue">
                      {children}
                    </ol>
                  ),
                  img: ({ src, alt }) => (
                    <span className="my-8 block">
                      <img
                        src={typeof src === "string" ? src : ""}
                        alt={alt ?? ""}
                        className="w-full rounded-[22px] shadow-card"
                        loading="lazy"
                      />
                      {alt && <span className="mt-3 block text-center text-sm text-black/50">{alt}</span>}
                    </span>
                  ),
                  blockquote: ({ children }) => (
                    <blockquote className="my-8 rounded-[22px] border-l-[6px] border-ctr-yellow bg-ctr-paper px-6 py-4 text-xl font-semibold italic">
                      {children}
                    </blockquote>
                  ),
                }}
              >
                {article.content}
              </ReactMarkdown>
            </div>
          </div>

          <ArticleGallery photos={article.gallery} title={article.title} />

          {related.length > 0 && (
            <section className="rounded-t-[50%_48px] bg-ctr-yellow pb-24 pt-20 lg:rounded-t-[50%_70px]">
              <div className="shell">
                <SectionTitle before="Citește și" script="altele" tone="ink" />
                <div className="mt-12">
                  <ArticleCards articles={related} />
                </div>
              </div>
            </section>
          )}
        </Sheet>
      </article>
    </MainLayout>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;
  const article = slug ? await getArticle(slug) : null;
  if (!article) return { notFound: true };
  const related = (await getArticles()).filter((a) => a.slug !== slug).slice(0, 3);
  return { props: { article, related } };
};

export const getStaticPaths = async () => ({
  paths: (await getArticles()).map((a) => ({ params: { slug: a.slug } })),
  fallback: false,
});

export default ArticlePage;
