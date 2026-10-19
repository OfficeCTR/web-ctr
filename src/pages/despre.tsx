import { useMemo, useState } from "react";
import type { GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";
import { motion } from "framer-motion";
import MainLayout from "../components/layout/MainLayout";
import PageHero from "../components/PageHero";
import { PillTabs, SectionTitle, Sheet, TabLabel } from "../components/ui/Sheet";
import { PhotoCarousel } from "../components/home/Quote";
import { stickers } from "../components/ui/sticker";
import Highlight from "../components/ui/Highlight";
import { getTeam } from "../lib/content";
import type { TeamMember } from "../lib/types";

type Department = TeamMember["department"];

const departmentLabels: Record<Department, string> = {
  leadership: "Conducere",
  executive: "Executiv",
  media: "Media",
};

const frameColors = ["#5B8FFF", "#FE558E", "#FED653", "#0A0A0A"];

const affiliations = {
  national: [
    { name: "Consiliul Național Consultativ pentru Tineret", logo: "/assets/afiliere/mmftss.png" },
    { name: "Grupul Național de Lucru Dialogul UE cu Tinerii", logo: "/assets/afiliere/eu-youth-dialogue.png" },
    {
      name: "Comitetul de monitorizare a programului Tranziție Justă 2021-2027",
      logo: "/assets/afiliere/tranzitie_justa.jpg",
    },
    {
      name: "Comitetul interinstituțional de monitorizare și implementare a SNOFM",
      logo: "/assets/afiliere/anofm.png",
    },
  ],
  international: [
    { name: "Forumul European de Tineret (European Youth Forum)", logo: "/assets/afiliere/youth_forum.png" },
    { name: "World Assembly of Youth", logo: "/assets/afiliere/way.png" },
    { name: "President's Youth Advisory Board — Comisia Europeană", logo: "/assets/afiliere/eu-flag.svg" },
    { name: "EU Youth Stakeholders Group", logo: "/assets/afiliere/EU-Youth-Stakeholders-Group-1.png" },
  ],
};

const AffiliationGrid = ({ items }: { items: Array<{ name: string; logo: string }> }) => (
  <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
    {items.map((a, i) => (
      <motion.div
        key={a.name}
        initial={{ opacity: 0, y: 30, rotate: i % 2 ? 3 : -3 }}
        whileInView={{ opacity: 1, y: 0, rotate: i % 2 ? 1.5 : -1.5 }}
        whileHover={{ rotate: 0, y: -8, scale: 1.03 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 140, damping: 16, delay: i * 0.06 }}
        className="flex flex-col items-center rounded-[24px] bg-white p-5 text-center shadow-[0_18px_30px_-14px_rgba(120,90,0,.45)] sm:p-6"
      >
        <div className="relative mb-4 h-20 w-full sm:h-24">
          <Image src={a.logo} alt={a.name} fill sizes="200px" className="object-contain" />
        </div>
        <p className="text-sm font-semibold leading-snug sm:text-base">{a.name}</p>
      </motion.div>
    ))}
  </div>
);

export const getStaticProps: GetStaticProps = async () => ({ props: { teamMembers: await getTeam() } });

export default function DesprePage({ teamMembers }: { teamMembers: TeamMember[] }) {
  const departments = useMemo(
    () => (Object.keys(departmentLabels) as Department[]).filter((d) => teamMembers.some((m) => m.department === d)),
    [teamMembers],
  );
  const [activeTab, setActiveTab] = useState<Department>(departments[0] ?? "leadership");
  const members = teamMembers.filter((m) => m.department === activeTab);

  return (
    <MainLayout>
      <Head>
        <title>Despre noi | CTR</title>
        <meta
          name="description"
          content="Află mai multe despre Consiliul Tineretului din România, misiunea, viziunea și echipa noastră."
        />
      </Head>

      <PageHero
        title="Despre"
        script="noi"
        accent="blue"
        image="/assets/design/photos/capitala-group.jpg"
        imageAlt="Tineri la un eveniment Capitala Tineretului din România"
        description="Consiliul Tineretului din România reprezintă interesele tinerilor și dezvoltă politici și proiecte care îmbunătățesc calitatea vieții acestora — de 20 de ani, cu și despre tineri."
      />

      <Sheet>
        <section className="pb-16 pt-16 lg:pt-20">
          <div className="shell">
            <SectionTitle before="Din" script="activitatea" after="noastră" tone="pink" />
          </div>
          <div className="mt-8">
            <PhotoCarousel />
          </div>
        </section>

        <section className="relative bg-ctr-blue py-20 text-white lg:py-28">
          <div className="pointer-events-none absolute -right-6 -top-10 w-[30%] max-w-[300px]" aria-hidden>
            <Image src="/assets/design/splatter-black.png" alt="" width={716} height={992} className="h-auto w-full" />
          </div>
          <div className="shell relative">
            <SectionTitle before="Ce ne" script="motivează" after="?" tone="ink" light />
            <div className="mt-16 grid gap-14 md:grid-cols-2 md:gap-10 lg:gap-16">
              {[
                {
                  label: "Misiunea noastră",
                  tone: "yellow" as const,
                  rotate: -3,
                  text: "Să reprezentăm **vocea tinerilor** în **procesele decizionale** și să implementăm proiecte care contribuie la **dezvoltarea socială, educațională și profesională** a acestora.",
                },
                {
                  label: "Viziunea noastră",
                  tone: "pink" as const,
                  rotate: 3,
                  text: "O societate în care **tinerii sunt implicați activ** în **dezvoltarea comunităților**, având acces la **oportunități și resurse** pentru a-și împlini potențialul.",
                },
              ].map((c, i) => (
                <motion.div
                  key={c.label}
                  initial={{ opacity: 0, y: 50, rotate: 0 }}
                  whileInView={{ opacity: 1, y: 0, rotate: c.rotate }}
                  whileHover={{ rotate: 0, y: -8 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 110, damping: 15, delay: i * 0.12 }}
                  className="paper-card relative px-8 pb-10 pt-14 text-ctr-ink sm:px-10"
                >
                  <h3 className={`absolute -top-5 text-2xl sm:text-[1.7rem] ${i ? "-right-3" : "-left-3"}`}>
                    <TabLabel tone={c.tone}>{c.label}</TabLabel>
                  </h3>
                  <p className="text-lg leading-relaxed tracking-[0.02em] text-[#3a3a3a] sm:text-xl">
                    <Highlight text={c.text} className={c.tone === "pink" ? "text-ctr-pink" : "text-ctr-blue"} />
                  </p>
                  <div className="scribble-underline mx-auto mt-8 h-3 w-[70%] opacity-70" aria-hidden />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden py-20 lg:py-28">
          <div className="pointer-events-none absolute -left-10 top-10 w-[40%] max-w-[420px] opacity-60" aria-hidden>
            <Image
              src="/assets/design/ctr-pattern-faded.png"
              alt=""
              width={1400}
              height={1350}
              className="h-auto w-full"
            />
          </div>
          <div className="shell relative">
            <SectionTitle before="Echipa" script="noastră" tone="blue" />
            {departments.length > 1 && (
              <div className="mt-10">
                <PillTabs
                  options={departments.map((d) => ({ id: d, label: departmentLabels[d] }))}
                  value={activeTab}
                  onChange={setActiveTab}
                />
              </div>
            )}
            <div className="mt-14 grid grid-cols-2 gap-x-5 gap-y-10 lg:grid-cols-4 lg:gap-8">
              {members.map((member, i) => (
                <motion.article
                  key={member.id}
                  initial={{ opacity: 0, y: 40, rotate: 0 }}
                  whileInView={{ opacity: 1, y: 0, rotate: i % 2 ? 2.5 : -2.5 }}
                  whileHover={{ rotate: 0, y: -10, scale: 1.02 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 120, damping: 15, delay: i * 0.08 }}
                  className="mx-auto w-full max-w-[320px] rounded-[18px] bg-white p-2 pb-4 shadow-card sm:rounded-[22px] sm:p-3 sm:pb-6"
                  style={{
                    boxShadow: `0 0 0 6px ${frameColors[i % frameColors.length]}, 0 26px 40px -18px rgba(0,0,0,.4)`,
                  }}
                >
                  <div className="relative aspect-[4/5] overflow-hidden rounded-[14px] bg-ctr-paper">
                    <Image
                      src={member.photo}
                      alt={member.name}
                      fill
                      sizes="(max-width: 640px) 90vw, 25vw"
                      className="object-cover grayscale transition-all duration-500 hover:grayscale-0"
                      style={{ objectPosition: "center 30%" }}
                    />
                  </div>
                  <div className="px-1 pt-3 text-center sm:px-2 sm:pt-5">
                    <h3 className="text-base font-bold leading-tight sm:text-2xl">{member.name}</h3>
                    <p className="mt-2 text-xs sm:text-lg">
                      <TabLabel tone={(["blue", "pink", "yellow"] as const)[i % 3]}>{member.position}</TabLabel>
                    </p>
                    <a
                      href={`mailto:${member.email}`}
                      className="mt-3 inline-block break-all text-[10px] text-black/55 sm:text-sm underline-offset-4 hover:text-ctr-blue hover:underline"
                    >
                      {member.email}
                    </a>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section
          id="afilieri"
          className="relative scroll-mt-28 rounded-t-[50%_48px] bg-ctr-yellow pb-24 pt-20 lg:rounded-t-[50%_70px] lg:pt-28"
        >
          <div
            className="bg-dots-white pointer-events-none absolute right-0 top-24 h-48 w-40 opacity-70 [mask-image:linear-gradient(270deg,#000,transparent)]"
            aria-hidden
          />
          <div className="shell relative">
            <SectionTitle before="Afilierea" script="CTR" tone="ink" />
            <h3 className="mb-6 mt-14 text-center font-cond text-4xl font-black" style={stickers.blackOnWhite}>
              La nivel național
            </h3>
            <AffiliationGrid items={affiliations.national} />
            <h3 className="mb-6 mt-16 text-center font-cond text-4xl font-black" style={stickers.blueLabel}>
              La nivel internațional
            </h3>
            <AffiliationGrid items={affiliations.international} />
          </div>
        </section>
      </Sheet>
    </MainLayout>
  );
}
