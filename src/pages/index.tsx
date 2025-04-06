import { type GetStaticProps, type NextPage } from "next";
import MainLayout from "../components/layout/MainLayout";
import AnimatedHero from "../components/AnimatedHero";
import ArticleSlider from "../components/ArticleSlider";
import AboutSection from "../components/AboutSection";
import PartnersSection from "../components/Afilliations";
import { getAllArticles, Article } from "../utils/markdown";

interface HomeProps {
  articles: Article[];
}

const Home: NextPage<HomeProps> = ({ articles }) => {
  return (
    <MainLayout>
      <AnimatedHero />
      <AboutSection />
      <PartnersSection />
      <section className="py-16">
        <div className="container mx-auto px-4">
          <ArticleSlider articles={articles} />
        </div>
      </section>
    </MainLayout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const articles = await getAllArticles();

  return {
    props: {
      articles,
    },
  };
};

export default Home; 