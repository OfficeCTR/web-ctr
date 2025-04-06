import { type GetStaticProps, type NextPage } from "next";
import { useRouter } from "next/router";
import Image from "next/image";
import MainLayout from "../../components/layout/MainLayout";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getArticleBySlug, getAllArticles, Article } from "../../utils/markdown";

interface ArticlePageProps {
  article: Article | null;
}

const ArticlePage: NextPage<ArticlePageProps> = ({ article }) => {
  const router = useRouter();

  if (router.isFallback) {
    return (
      <MainLayout>
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-xl">Se încarcă articolul...</p>
        </div>
      </MainLayout>
    );
  }

  if (!article) {
    return (
      <MainLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Articolul nu a fost găsit</h1>
            <p className="text-gray-600 mb-8">Ne pare rău, dar articolul pe care îl cauți nu există.</p>
            <button
              onClick={() => router.push('/')}
              className="bg-yellow-400 text-[#0B1C3D] px-8 py-4 rounded-full font-semibold hover:bg-yellow-300 transition-colors"
            >
              Înapoi la pagina principală
            </button>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <article className="min-h-screen">
        {/* Hero Section */}
        <div className="relative">
          <div className="relative h-[60vh] w-full">
            <Image
              src={article.coverImage}
              alt={article.title}
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
          </div>
          
          {/* Content Section */}
          <div className="relative -mt-20 z-10">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8 md:p-12">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="flex flex-wrap gap-4 mb-6">
                    <span className="inline-block px-4 py-2 bg-yellow-400 text-[#0B1C3D] rounded-full text-sm font-semibold">
                      {article.category}
                    </span>
                    <span className="inline-block px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm">
                      {new Date(article.publishedAt).toLocaleDateString('ro-RO', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                  
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-8 leading-tight">
                    {article.title}
                  </h1>
                  
                  <div className="flex items-center space-x-4">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden">
                      <Image
                        src={article.author.avatar}
                        alt={article.author.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{article.author.name}</p>
                      <p className="text-sm text-gray-500">Autor</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>

        {/* Article Content */}
        <div className="container mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-4xl mx-auto prose prose-lg prose-yellow 
              prose-headings:font-bold prose-headings:text-gray-900 prose-headings:mt-8 prose-headings:mb-4
              prose-h1:text-4xl prose-h1:mb-6 prose-h1:mt-12
              prose-h2:text-3xl prose-h2:mb-4 prose-h2:mt-8
              prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-4
              prose-ul:list-disc prose-ul:pl-6 prose-ul:my-4
              prose-li:text-gray-700 prose-li:mb-2
              prose-strong:text-gray-900
              prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline"
          >
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                // Convert consecutive [-] items into a proper list
                p: ({ children }) => {
                  const text = children?.toString() || '';
                  
                  // If this is a bullet point
                  if (text.startsWith('[-]')) {
                    // Get all siblings that are also bullet points
                    const bulletPoint = text.replace('[-]', '').trim();
                    return (
                      <ul className="list-disc pl-6 my-4">
                        <li className="text-gray-700 mb-2">{bulletPoint}</li>
                      </ul>
                    );
                  }
                  
                  return <p className="text-gray-700 leading-relaxed mb-4">{children}</p>;
                },
                // Style headings
                h1: ({ children }) => (
                  <h1 className="text-4xl font-bold text-gray-900 mb-6 mt-12">{children}</h1>
                ),
                h2: ({ children }) => (
                  <h2 className="text-3xl font-bold text-gray-900 mb-4 mt-8">{children}</h2>
                ),
                // Style links
                a: ({ children, href }) => (
                  <a href={href} className="text-blue-600 no-underline hover:underline">
                    {children}
                  </a>
                ),
                // Ensure proper list styling
                ul: ({ children }) => (
                  <ul className="list-disc pl-6 my-4 space-y-2">
                    {children}
                  </ul>
                ),
                li: ({ children }) => (
                  <li className="text-gray-700">{children}</li>
                ),
              }}
            >
              {article.content}
            </ReactMarkdown>
          </motion.div>
        </div>

        {/* Related Articles Section */}
        <div className="bg-gray-50 py-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto"
            >
              <h2 className="text-3xl font-bold mb-8">Articole similare</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Add related articles here */}
              </div>
            </motion.div>
          </div>
        </div>
      </article>
    </MainLayout>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const slug = params?.slug as string;
    if (!slug) {
      return {
        notFound: true,
      };
    }

    const article = await getArticleBySlug(slug);
    if (!article) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        article,
      },
    };
  } catch (error) {
    console.error('Error fetching article:', error);
    return {
      notFound: true,
    };
  }
};

export const getStaticPaths = async () => {
  try {
    const articles = await getAllArticles();
    const paths = articles.map((article: Article) => ({
      params: { slug: article.slug },
    }));

    console.log('Generated paths:', paths); // Debug log

    return {
      paths,
      fallback: true, // Changed to true to handle articles that might be added later
    };
  } catch (error) {
    console.error('Error generating paths:', error);
    return {
      paths: [],
      fallback: true,
    };
  }
};

export default ArticlePage; 