import { useEffect, useState } from "react";
import Head from "next/head";
import { type GetStaticProps } from "next";
import { AnimatePresence, motion } from "framer-motion";
import MainLayout from "../components/layout/MainLayout";
import PageHero from "../components/PageHero";
import OpportunityModal from "../components/OpportunityModal";
import { PillTabs, Sheet, TabLabel } from "../components/ui/Sheet";
import { getOpportunities } from "../lib/content";
import { opportunityCategories, type Opportunity } from "../lib/types";

interface OpportunitiesProps {
  initialOpportunities: Opportunity[];
  fetchError?: string;
}

export const getStaticProps: GetStaticProps = async () => ({
  props: { initialOpportunities: await getOpportunities() },
});

const accents = ["#5B8FFF", "#FE558E", "#FED653"];

export default function Opportunities({ initialOpportunities, fetchError }: OpportunitiesProps) {
  const [selectedCategory, setSelectedCategory] = useState<(typeof opportunityCategories)[number]["id"]>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOpportunity, setSelectedOpportunity] = useState<Opportunity | null>(null);

  const [today, setToday] = useState<string | null>(null);
  useEffect(() => setToday(new Date().toISOString().slice(0, 10)), []);
  const opportunities = initialOpportunities.map((o) =>
    today && o.deadline && o.deadline < today ? { ...o, isActive: false } : o,
  );

  const filteredOpportunities = opportunities.filter((opp) => {
    const matchesCategory = selectedCategory === "all" || opp.category === selectedCategory;
    const q = searchQuery.toLowerCase();
    const matchesSearch = opp.title.toLowerCase().includes(q) || opp.shortDescription.toLowerCase().includes(q);
    return matchesCategory && matchesSearch;
  });

  return (
    <MainLayout>
      <Head>
        <title>Oportunități pentru tineri | CTR</title>
        <meta
          name="description"
          content="Descoperă cele mai bune oportunități pentru dezvoltarea ta personală și profesională."
        />
      </Head>

      <PageHero
        title="Oportunități"
        script="pentru tine"
        accent="yellow"
        image="/assets/design/photos/youth-sitting.jpg"
        imageAlt="Tineri la un atelier CTR"
        description="Burse, stagii, concursuri și programe de voluntariat — pentru tine, organizația ta și comunitatea ta."
      />

      <Sheet>
        <section className="relative py-16 lg:py-20">
          <div className="shell">
            <div className="mx-auto max-w-2xl">
              <label htmlFor="search" className="sr-only">
                Caută oportunități
              </label>
              <div className="relative">
                <input
                  id="search"
                  type="text"
                  placeholder="Caută oportunități..."
                  className="w-full rounded-full border-2 border-black bg-white px-7 py-4 pr-16 text-lg shadow-[6px_6px_0_#0A0A0A] outline-none transition-shadow placeholder:text-black/40 focus:shadow-[6px_6px_0_#5B8FFF]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <span className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-ctr-yellow">
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

            <div className="mt-10">
              <PillTabs
                tone="yellow"
                options={opportunityCategories}
                value={selectedCategory}
                onChange={setSelectedCategory}
              />
            </div>

            {fetchError && (
              <div className="mx-auto mt-14 max-w-xl rounded-[24px] bg-ctr-pink/10 p-8 text-center font-semibold text-ctr-pink">
                {fetchError}
              </div>
            )}

            {!fetchError && (
              <motion.div layout className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                <AnimatePresence mode="popLayout">
                  {filteredOpportunities.map((opportunity, i) => (
                    <motion.article
                      key={opportunity.id}
                      layout
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.4 }}
                      className="group relative flex flex-col overflow-hidden rounded-[26px] bg-white p-7 shadow-card transition-transform duration-500 hover:-translate-y-2 hover:rotate-[-0.6deg]"
                    >
                      <span className="absolute inset-x-0 top-0 h-2" style={{ background: accents[i % 3] }} />
                      <div className="flex items-start justify-between gap-4">
                        <h3 className="text-xl font-bold leading-snug">{opportunity.title}</h3>
                        <span
                          className={`shrink-0 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider ${
                            opportunity.isActive ? "bg-ctr-blue text-white" : "bg-black/10 text-black/50"
                          }`}
                        >
                          {opportunity.isActive ? "Activ" : "Expirat"}
                        </span>
                      </div>
                      {opportunity.organization && (
                        <p className="mt-2 text-sm font-semibold text-black/50">{opportunity.organization}</p>
                      )}
                      <p className="mt-4 line-clamp-4 leading-relaxed text-black/65">{opportunity.shortDescription}</p>
                      <div className="mt-auto flex items-center justify-between gap-4 pt-6">
                        {opportunity.deadline && (
                          <span className="text-sm">
                            <span className="block text-xs font-semibold uppercase tracking-[0.15em] text-black/40">
                              Termen limită
                            </span>
                            <span className="font-bold">
                              {new Date(opportunity.deadline).toLocaleDateString("ro-RO")}
                            </span>
                          </span>
                        )}
                        <button
                          onClick={() => setSelectedOpportunity(opportunity)}
                          className="ml-auto inline-flex items-center gap-2 rounded-full bg-ctr-ink px-5 py-2.5 font-bold text-white transition-all duration-300 hover:bg-ctr-pink"
                        >
                          Detalii <span aria-hidden>→</span>
                        </button>
                      </div>
                    </motion.article>
                  ))}
                </AnimatePresence>
              </motion.div>
            )}

            {!fetchError && filteredOpportunities.length === 0 && (
              <div className="mx-auto mt-14 max-w-lg text-center">
                <p className="font-script text-4xl text-ctr-blue">Hmm...</p>
                <p className="mt-3 text-lg text-black/60">
                  Nu am găsit oportunități care să corespundă criteriilor tale.
                </p>
                <p className="mt-6">
                  <TabLabel tone="yellow">Revino curând — lista se actualizează constant!</TabLabel>
                </p>
              </div>
            )}
          </div>
        </section>
      </Sheet>

      <OpportunityModal opportunity={selectedOpportunity} onClose={() => setSelectedOpportunity(null)} />
    </MainLayout>
  );
}
