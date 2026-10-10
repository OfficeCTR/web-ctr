import { useMemo, useState } from "react";
import Head from "next/head";
import { type GetStaticProps } from "next";
import { AnimatePresence, motion } from "framer-motion";
import MainLayout from "~/components/layout/MainLayout";
import PageHero from "~/components/PageHero";
import ProjectModal from "~/components/ProjectModal";
import ArticleCards from "~/components/ArticleCards";
import Cover from "~/components/ui/Cover";
import { PillTabs, SectionTitle, Sheet, TabLabel } from "~/components/ui/Sheet";
import { stickers } from "~/components/ui/sticker";
import { getArticles, getProjects } from "~/lib/content";
import type { Article, Project } from "~/lib/types";

const tones = ["blue", "pink", "yellow"] as const;
const yearSticker = [stickers.blueStat, stickers.pinkStat, stickers.yellowStat];

const ProjectCard = ({ project, index, onClick }: { project: Project; index: number; onClick: () => void }) => (
  <motion.button
    type="button"
    layout
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, scale: 0.95 }}
    transition={{ duration: 0.45, delay: (index % 3) * 0.06 }}
    onClick={onClick}
    className="group flex h-full w-full flex-col overflow-hidden rounded-[26px] bg-white text-left shadow-card transition-[transform,box-shadow] duration-500 hover:-translate-y-2 hover:rotate-[-0.8deg] hover:shadow-[0_30px_50px_-20px_rgba(0,0,0,.45)]"
  >
    <div className="relative">
      <Cover
        src={project.imageUrl}
        alt={project.title}
        label={project.title}
        index={index}
        className="aspect-[16/10]"
      />
      <span className="absolute right-4 top-4 rounded-full bg-white px-3 py-1 font-cond text-lg font-black shadow-md">
        {project.year}
      </span>
    </div>
    <div className="flex flex-1 flex-col p-6">
      <h3 className="text-xl font-bold leading-snug transition-colors group-hover:text-ctr-blue">{project.title}</h3>
      {project.shortDescription && (
        <p className="mt-3 line-clamp-3 text-[15px] leading-relaxed text-black/60">{project.shortDescription}</p>
      )}
      <div className="mt-auto flex items-center justify-between gap-3 pt-5 text-sm">
        {project.location && (
          <span className="inline-flex items-center gap-1.5 text-black/55">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {project.location}
          </span>
        )}
        <span className="ml-auto inline-flex h-10 w-14 shrink-0 items-center justify-center rounded-full bg-ctr-ink text-white transition-all duration-300 group-hover:w-16 group-hover:bg-ctr-pink">
          →
        </span>
      </div>
    </div>
  </motion.button>
);

export default function Projects({
  articles,
  projects: sampleProjects,
}: {
  articles: Omit<Article, "content">[];
  projects: Project[];
}) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeYear, setActiveYear] = useState<string>("all");

  const years = useMemo(
    () => Array.from(new Set(sampleProjects.map((p) => p.year))).sort((a, b) => b - a),
    [sampleProjects],
  );
  const shownYears = activeYear === "all" ? years : [Number(activeYear)];

  return (
    <MainLayout>
      <Head>
        <title>Programe și proiecte | CTR</title>
        <meta
          name="description"
          content="Descoperă programele și proiectele implementate de Consiliul Tineretului din România de-a lungul anilor."
        />
      </Head>

      <PageHero
        title="Programe"
        script="& proiecte"
        accent="pink"
        image="/assets/design/photos/summit-x-stage.jpg"
        imageAlt="Scena Summitului Tinerilor X"
        description="Descoperă proiectele prin care facem o diferență în comunitățile din România — din 2016 până azi."
      />

      <Sheet>
        <section className="relative py-16 lg:py-20">
          <div
            className="pointer-events-none absolute right-0 top-0 hidden w-[28%] max-w-[360px] opacity-70 lg:block"
            aria-hidden
          >
            <img src="/assets/design/ctr-pattern-faded.png" alt="" className="h-auto w-full -scale-x-100" />
          </div>
          <div className="shell relative">
            <SectionTitle before="Alege un" script="an" tone="pink" />
            <div className="mt-8">
              <PillTabs
                tone="pink"
                options={[{ id: "all", label: "Toate" }, ...years.map((y) => ({ id: String(y), label: String(y) }))]}
                value={activeYear}
                onChange={setActiveYear}
              />
            </div>

            <div className="mt-14 space-y-20">
              <AnimatePresence mode="popLayout">
                {shownYears.map((year, yi) => (
                  <motion.div key={year} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <div className="mb-10 flex items-center gap-5">
                      <span
                        className="inline-block -skew-x-6 font-cond text-7xl font-black leading-none sm:text-8xl"
                        style={yearSticker[yi % 3]}
                      >
                        {year}
                      </span>
                      <span className="h-[3px] flex-1 rounded-full bg-black/10" />
                      <TabLabel tone={tones[yi % 3]} className="hidden text-lg sm:inline">
                        {sampleProjects.filter((p) => p.year === year).length} proiecte
                      </TabLabel>
                    </div>
                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                      {sampleProjects
                        .filter((p) => p.year === year)
                        .map((project, i) => (
                          <ProjectCard
                            key={project.id}
                            project={project}
                            index={i + yi}
                            onClick={() => setSelectedProject(project)}
                          />
                        ))}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </section>

        {articles.length > 0 && (
          <section className="relative rounded-t-[50%_48px] bg-ctr-yellow pb-24 pt-20 lg:rounded-t-[50%_70px] lg:pt-24">
            <div className="shell">
              <SectionTitle before="Noutăți din" script="blog" tone="ink" />
              <div className="mt-12">
                <ArticleCards articles={articles} />
              </div>
            </div>
          </section>
        )}
      </Sheet>

      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </MainLayout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const [articles, projects] = await Promise.all([getArticles(), getProjects()]);
  return { props: { articles, projects } };
};
