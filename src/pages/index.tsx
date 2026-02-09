import { type GetStaticProps, type NextPage } from "next";
import MainLayout from "../components/layout/MainLayout";
import AnimatedHero from "../components/AnimatedHero";
import ArticleSlider from "../components/ArticleSlider";
import AboutSection from "../components/AboutSection";
import PartnersSection from "../components/Afilliations";
import CapitalaTineretuluiSection from "../components/CapitalaTineretuluiSection";
import { getAllArticles, Article } from "../utils/markdown";

interface HomeProps {
  articles: Article[];
}

const Home: NextPage<HomeProps> = ({ articles }) => {
  return (
    <MainLayout>
      <AnimatedHero />
      <AboutSection />
      <CapitalaTineretuluiSection />
      <PartnersSection />
      <section className="py-24 bg-white">
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
