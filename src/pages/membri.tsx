import { useState } from "react";
import Head from "next/head";
import type { GetStaticProps } from "next";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import dynamic from "next/dynamic";
import MainLayout from "../components/layout/MainLayout";
import PageHero from "../components/PageHero";
import { PillTabs, SectionTitle, Sheet } from "../components/ui/Sheet";
import { stickers } from "../components/ui/sticker";
import { getOrganizations } from "../lib/content";
import { organizationTypes, typeDisplayLabels, typeLabels, type Organization } from "../lib/types";

type TypeKey = keyof typeof typeDisplayLabels;

const RegionalMap = dynamic(() => import("../components/RegionalMap"), {
  ssr: false,
  loading: () => <p className="py-24 text-center font-script text-3xl text-ctr-blue">Se încarcă harta...</p>,
});

const OrgLogo = ({ org, sizes }: { org: Organization; sizes: string }) =>
  org.logo ? (
    <Image src={org.logo} alt={`${org.name} logo`} fill sizes={sizes} className="object-contain" />
  ) : (
    <span
      className="flex h-full w-full items-center justify-center rounded-full bg-ctr-blue font-cond font-black text-white"
      style={{ fontSize: sizes === "24px" ? 9 : 24 }}
    >
      {org.name
        .split(/\s+/)
        .filter((w) => /^[A-ZĂÂÎȘȚ]/.test(w))
        .slice(0, 3)
        .map((w) => w[0])
        .join("")}
    </span>
  );

const statStyles = [stickers.blueStat, stickers.pinkStat, stickers.yellowStat];

export const getStaticProps: GetStaticProps = async () => ({ props: { organizations: await getOrganizations() } });

export default function MembriPage({ organizations }: { organizations: Organization[] }) {
  const [activeTab, setActiveTab] = useState<TypeKey>("all");
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);
  const [tooltip, setTooltip] = useState<{ x: number; y: number; side: "left" | "right" }>({
    x: 0,
    y: 0,
    side: "right",
  });

  const filteredOrganizations =
    activeTab === "all" ? organizations : organizations.filter((org) => org.type === activeTab);

  const handleMouseMove = (e: React.MouseEvent) => {
    setTooltip({ x: e.clientX, y: e.clientY, side: e.clientX + 270 > window.innerWidth ? "left" : "right" });
  };

  const counts = organizationTypes.map((t) => ({
    type: t,
    count: organizations.filter((o) => o.type === t).length,
  }));

  return (
    <MainLayout>
      <Head>
        <title>Membri | CTR</title>
        <meta name="description" content="Organizațiile membre ale Consiliului Tineretului din România." />
      </Head>

      <PageHero
        title="Rețeaua"
        script="CTR"
        accent="blue"
        image="/assets/design/photos/hall.jpg"
        imageAlt="Sală plină de tineri la un eveniment CTR"
        description="Consiliul Tineretului din România reunește structuri de tineret din toată țara pentru a reprezenta interesele tinerilor."
      >
        <a href="#organizatii" className="btn-pill group bg-ctr-blue text-white hover:bg-white hover:text-black">
          Vezi organizațiile <span className="transition-transform group-hover:translate-y-1">↓</span>
        </a>
      </PageHero>

      <Sheet>
        <section className="py-16 lg:py-24">
          <div className="shell grid items-center gap-14 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative mx-auto aspect-[524/372] w-full max-w-[560px]"
            >
              <Image src="/assets/design/romania-outline.png" alt="" fill sizes="560px" className="object-contain" />
              <div className="absolute inset-0 flex flex-col items-center justify-center pb-[6%] pr-[4%] text-center">
                <span
                  className="inline-block -skew-x-6 font-cond text-[18vw] font-black leading-none sm:text-8xl lg:text-[7.5rem]"
                  style={stickers.blueStat}
                >
                  {organizations.length}
                </span>
                <span className="mt-2 max-w-[14rem] text-lg font-bold leading-tight">
                  organizații în Adunarea Generală
                </span>
              </div>
            </motion.div>
            <div>
              <p className="text-xl leading-relaxed sm:text-2xl">
                Adunarea Generală a CTR este formată din <strong>{organizations.length}</strong> organizații federative
                de nivel național și județean și asociații afiliate internațional, formând împreună o rețea de peste{" "}
                <strong className="text-ctr-pink">600 de organizații</strong> de și pentru tineret.
              </p>
              <div className="mt-10 grid grid-cols-3 gap-4">
                {counts.map((c, i) => (
                  <motion.button
                    key={c.type}
                    type="button"
                    onClick={() => {
                      setActiveTab(c.type as TypeKey);
                      document.getElementById("organizatii")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    whileHover={{ y: -6, rotate: i % 2 ? 2 : -2 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="rounded-[22px] bg-white p-4 text-center shadow-card sm:p-6"
                  >
                    <span
                      className="block -skew-x-6 font-cond text-5xl font-black leading-none sm:text-6xl"
                      style={statStyles[i]}
                    >
                      {c.count}
                    </span>
                    <span className="mt-3 block text-xs font-semibold leading-snug text-black/60 sm:text-sm">
                      {typeDisplayLabels[c.type as TypeKey]}
                    </span>
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="organizatii" className="relative scroll-mt-28 bg-ctr-blue py-20 text-white lg:py-24">
          <div className="pointer-events-none absolute -left-4 top-0 w-[36%] max-w-[360px] opacity-30" aria-hidden>
            <Image src="/assets/design/europe-symbols.png" alt="" width={844} height={650} className="h-auto w-full" />
          </div>
          <div className="shell relative">
            <SectionTitle before="Structuri" script="membre" tone="ink" light />
            <div className="mt-10">
              <PillTabs
                tone="yellow"
                options={(["all", ...organizationTypes] as TypeKey[]).map((t) => ({
                  id: t,
                  label: typeDisplayLabels[t],
                }))}
                value={activeTab}
                onChange={setActiveTab}
              />
            </div>
            <AnimatePresence mode="wait">
              {activeTab !== "all" && (
                <motion.p
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mx-auto mt-8 max-w-3xl text-center text-xl font-semibold text-white/90"
                >
                  {typeLabels[activeTab as keyof typeof typeLabels]}
                </motion.p>
              )}
            </AnimatePresence>

            <motion.ul
              layout
              className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-4 xl:grid-cols-5"
            >
              <AnimatePresence mode="popLayout">
                {filteredOrganizations.map((org, index) => (
                  <motion.li
                    key={org.id}
                    layout
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.85 }}
                    transition={{ duration: 0.35, delay: Math.min(index * 0.03, 0.4) }}
                    whileHover={{ y: -8, rotate: index % 2 ? 2 : -2 }}
                    className="flex flex-col items-center rounded-[24px] bg-white p-4 text-center text-ctr-ink shadow-[0_18px_30px_-14px_rgba(0,20,80,.55)] sm:p-6"
                  >
                    <div className="relative mb-3 h-16 w-16 sm:h-20 sm:w-20">
                      <OrgLogo org={org} sizes="80px" />
                    </div>
                    <h3 className="text-sm font-bold leading-snug sm:text-base">{org.name}</h3>
                    {org.region && (
                      <span className="mt-1 text-xs font-semibold uppercase tracking-wider text-ctr-pink">
                        {org.region}
                      </span>
                    )}
                  </motion.li>
                ))}
              </AnimatePresence>
            </motion.ul>
          </div>
        </section>

        {activeTab === "regional" && (
          <section className="py-20">
            <div className="shell">
              <SectionTitle before="Harta" script="regională" tone="pink" />
              <p className="mt-4 text-center text-black/55">
                Treci cu mouse-ul peste un județ colorat pentru a vedea organizațiile.
              </p>
              <div className="mx-auto mt-6 h-[420px] w-full sm:h-[600px] lg:h-[720px]">
                <RegionalMap
                  organizations={organizations}
                  setHoveredRegion={setHoveredRegion}
                  handleMouseMove={handleMouseMove}
                />
              </div>
            </div>
          </section>
        )}

        <section className="relative overflow-hidden bg-ctr-pink py-20 text-white lg:py-24">
          <div
            className="bg-dots-white pointer-events-none absolute left-0 top-0 h-full w-1/4 opacity-30 [mask-image:linear-gradient(90deg,#000,transparent)]"
            aria-hidden
          />
          <div className="pointer-events-none absolute -right-6 bottom-0 w-[30%] max-w-[260px]" aria-hidden>
            <Image src="/assets/design/projects-right.png" alt="" width={438} height={616} className="h-auto w-full" />
          </div>
          <div className="shell relative max-w-3xl text-center">
            <SectionTitle before="Aderă la" script="CTR!" tone="ink" light />
            <p className="mt-6 text-xl leading-relaxed text-white/90">
              Consiliul Tineretului din România este o platformă de dialog și cooperare pentru organizațiile de tineret
              din România. Dacă vrei ca organizația ta să se alăture rețelei, scrie-ne!
            </p>
            <Link
              href="/contact-page"
              className="btn-pill group mt-10 bg-white text-ctr-ink hover:bg-ctr-ink hover:text-white"
            >
              Hai să vorbim! <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </section>
      </Sheet>

      {hoveredRegion && (
        <div
          className="pointer-events-none fixed z-50 max-w-xs rounded-2xl bg-white p-4 shadow-2xl ring-2 ring-ctr-blue"
          style={{
            top: tooltip.y + 12,
            left: tooltip.side === "right" ? tooltip.x + 12 : tooltip.x - 272,
          }}
        >
          <h4 className="mb-2 font-cond text-xl font-black uppercase">{hoveredRegion}</h4>
          <ul className="max-h-48 space-y-1.5 overflow-y-auto text-sm">
            {organizations
              .filter((org) => (org.region?.toUpperCase() || "") === hoveredRegion.toUpperCase())
              .map((org) => (
                <li key={org.id} className="flex items-center gap-2">
                  <span className="relative h-6 w-6 shrink-0">
                    <OrgLogo org={org} sizes="24px" />
                  </span>
                  <span>{org.name}</span>
                </li>
              ))}
          </ul>
        </div>
      )}
    </MainLayout>
  );
}
