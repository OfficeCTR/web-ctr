import { type NextPage } from "next";
import MainLayout from "../components/layout/MainLayout";
import AnimatedHero from "../components/AnimatedHero";
import ArticleSlider from "../components/ArticleSlider";
import AboutSection from "../components/AboutSection";
import PartnersSection from "../components/Afilliations";
import { Article } from "../types/article";

// Temporary mock data - replace with actual data from your backend
const mockArticles: Article[] = [
  {
    id: "1",
    title: "Primul nostru proiect de succes",
    slug: "primul-proiect",
    excerpt: "Descriere scurtă despre primul nostru proiect și impactul său asupra comunității.",
    content: "Conținut complet al articolului...",
    coverImage: "/assets/cover.jpg",
    author: {
      name: "Echipa CTR",
      avatar: "/assets/ctr-logo.png",
    },
    publishedAt: "2024-03-15",
    category: "Proiecte",
  },
  {
    id: "2",
    title: "Workshop de dezvoltare personală",
    slug: "workshop-dezvoltare",
    excerpt: "Detalii despre workshop-ul nostru de dezvoltare personală și rezultatele obținute.",
    content: "Conținut complet al articolului...",
    coverImage: "/assets/cover.jpg",
    author: {
      name: "Echipa CTR",
      avatar: "/assets/ctr-logo.png",
    },
    publishedAt: "2024-03-10",
    category: "Evenimente",
  },
  {
    id: "3",
    title: "Colaborare cu organizații locale",
    slug: "colaborare-organizatii",
    excerpt: "Cum am reușit să creăm parteneriate puternice cu organizațiile locale.",
    content: "Conținut complet al articolului...",
    coverImage: "/assets/cover.jpg",
    author: {
      name: "Echipa CTR",
      avatar: "/assets/ctr-logo.png",
    },
    publishedAt: "2024-03-05",
    category: "Parteneriate",
  },
];

const Home: NextPage = () => {
  return (
    <MainLayout>
      <AnimatedHero />
      <AboutSection />
      <PartnersSection />
      <section className="py-16">
        <div className="container mx-auto px-4">
          <ArticleSlider articles={mockArticles} />
        </div>
      </section>
    </MainLayout>
  );
};

export default Home; 