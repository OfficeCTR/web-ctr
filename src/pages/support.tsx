import { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import MainLayout from "../components/layout/MainLayout";
import PageHero from "../components/PageHero";
import { SectionTitle, Sheet, TabLabel } from "../components/ui/Sheet";
import { stickers } from "../components/ui/sticker";
import { settings } from "../lib/site";

const FORM_230 = settings.form230Url || "https://formular230.ro/consiliul-tineretului-din-romania";

const impact = [
  {
    tone: "yellow" as const,
    title: "Dezvoltarea competențelor",
    text: "Dezvoltăm programe educaționale și de formare pentru tineri.",
    rotate: -4,
  },
  {
    tone: "blue" as const,
    title: "Reprezentare națională",
    text: "Reprezentăm interesele tinerilor în dialogul cu autoritățile și instituțiile.",
    rotate: 0,
  },
  {
    tone: "pink" as const,
    title: "Inițiative internaționale",
    text: "Facilităm participarea tinerilor la programe și schimburi internaționale.",
    rotate: 4,
  },
];

const Support: NextPage = () => {
  const bankRows: Array<[string, string]> = [
    ["Beneficiar", settings.bank.beneficiary],
    ["Banca", settings.bank.name],
    ["IBAN (RON)", settings.bank.ibanRon],
    ["IBAN (EUR)", settings.bank.ibanEur],
    ["Cod SWIFT", settings.bank.swift],
    ["CUI/CIF", settings.vat],
  ].filter(([, v]) => v && v !== "unknown") as Array<[string, string]>;

  return (
    <MainLayout>
      <Head>
        <title>Susține-ne | CTR</title>
        <meta
          name="description"
          content="Susține Consiliul Tineretului din România prin redirecționarea a 3,5% din impozit sau printr-o donație."
        />
      </Head>

      <PageHero
        title="Susține"
        script="tinerii"
        accent="pink"
        image="/assets/3_5_perc.jpg"
        imageAlt="Redirecționează 3,5% din impozit către CTR"
        description="CTR este o organizație independentă, care funcționează pe baza voluntariatului. Ajută-ne să dezvoltăm programe și inițiative pentru tinerii din România."
      >
        <a
          href={FORM_230}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-pill group bg-ctr-yellow text-ctr-ink hover:bg-white"
        >
          Redirecționează 3,5% <span className="transition-transform group-hover:translate-x-1">→</span>
        </a>
      </PageHero>

      <Sheet>
        <section className="py-16 lg:py-24">
          <div className="shell grid gap-12 lg:grid-cols-2 lg:gap-10">
            <motion.div
              initial={{ opacity: 0, y: 40, rotate: 0 }}
              whileInView={{ opacity: 1, y: 0, rotate: -1.5 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 110, damping: 15 }}
              className="relative overflow-hidden rounded-[30px] bg-ctr-yellow p-8 shadow-card sm:p-10"
            >
              <div
                className="bg-dots-white pointer-events-none absolute right-0 top-0 h-40 w-40 opacity-60 [mask-image:linear-gradient(225deg,#000,transparent)]"
                aria-hidden
              />
              <span className="absolute -right-2 top-6 rotate-6 rounded-l-full bg-ctr-ink px-5 py-1.5 font-cond text-lg font-bold uppercase tracking-wider text-ctr-yellow">
                Recomandat
              </span>
              <span
                className="block -skew-x-6 font-cond text-8xl font-black leading-none sm:text-9xl"
                style={stickers.pinkStat}
              >
                3,5%
              </span>
              <h2 className="mt-4 text-3xl font-bold leading-tight sm:text-4xl">din impozitul tău, direct către CTR</h2>
              <p className="mt-4 text-lg leading-relaxed">
                Poți redirecționa gratuit 3,5% din impozitul pe venit. Tu completezi formularul, iar noi ne ocupăm de
                restul demersurilor.
              </p>
              <ol className="mt-8 flex flex-col gap-4 sm:flex-row sm:gap-8">
                {["Completezi formularul", "Noi îl depunem la ANAF"].map((s, i) => (
                  <li key={s} className="flex items-center gap-3 font-bold">
                    <span className="font-cond text-5xl font-black leading-none" style={stickers.number}>
                      {i + 1}
                    </span>
                    {s}
                  </li>
                ))}
              </ol>
              <a
                href={FORM_230}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-pill group mt-10 bg-ctr-ink text-white hover:bg-ctr-pink"
              >
                Completează acum <span className="transition-transform group-hover:translate-x-1">→</span>
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40, rotate: 0 }}
              whileInView={{ opacity: 1, y: 0, rotate: 1.5 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 110, damping: 15, delay: 0.1 }}
              className="paper-card relative p-8 sm:p-10"
            >
              <h2 className="text-3xl font-bold sm:text-4xl">
                <TabLabel tone="blue">Donează direct</TabLabel>
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-black/70">
                Donația ta ne ajută să implementăm proiecte imediate și să răspundem rapid nevoilor comunității de
                tineret din România.
              </p>
              <dl className="mt-8 divide-y divide-black/10 rounded-[20px] bg-ctr-paper px-6">
                {bankRows.map(([k, v]) => (
                  <div key={k} className="flex flex-col gap-1 py-3.5 sm:flex-row sm:justify-between sm:gap-6">
                    <dt className="text-sm font-semibold uppercase tracking-[0.12em] text-black/45">{k}</dt>
                    <dd className="break-all font-bold sm:text-right">{v}</dd>
                  </div>
                ))}
              </dl>
              <Link href="/contact-page" className="btn-pill group mt-8 bg-ctr-blue text-white hover:bg-ctr-ink">
                Contactează-ne <span className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </motion.div>
          </div>
        </section>

        <section className="relative overflow-hidden pb-24 pt-8">
          <div className="pointer-events-none absolute inset-x-0 top-0 mx-auto max-w-[1366px] opacity-60" aria-hidden>
            <Image
              src="/assets/design/pillars-symbols.png"
              alt=""
              width={2732}
              height={2200}
              className="h-auto w-full"
            />
          </div>
          <div className="shell relative">
            <SectionTitle before="Impactul" script="contribuției" after="tale" tone="blue" />
            <div className="mt-20 grid gap-16 md:grid-cols-3 md:gap-8">
              {impact.map((c, i) => (
                <motion.div
                  key={c.title}
                  initial={{ opacity: 0, y: 50, rotate: 0 }}
                  whileInView={{ opacity: 1, y: 0, rotate: c.rotate }}
                  whileHover={{ rotate: 0, y: -8, scale: 1.03 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 110, damping: 15, delay: i * 0.1 }}
                  className="paper-card relative z-10 px-8 pb-10 pt-14"
                >
                  <h3 className="absolute -top-5 left-4 right-4 text-center text-2xl">
                    <TabLabel tone={c.tone}>{c.title}</TabLabel>
                  </h3>
                  <p className="text-center text-lg leading-relaxed tracking-[0.02em] text-[#3a3a3a]">{c.text}</p>
                  <div className="scribble-underline mx-auto mt-8 h-3 w-[70%] opacity-70" aria-hidden />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-ctr-blue py-20 text-white lg:py-28">
          <div className="pointer-events-none absolute -left-4 bottom-0 w-[24%] max-w-[220px]" aria-hidden>
            <Image src="/assets/design/projects-left.png" alt="" width={432} height={802} className="h-auto w-full" />
          </div>
          <div className="shell relative max-w-3xl text-center">
            <SectionTitle before="Fii parte din" script="schimbare!" tone="ink" light />
            <p className="mt-6 text-xl leading-relaxed text-white/90">
              Contribuția ta este esențială pentru a putea continua misiunea noastră de a sprijini tinerii din România.
            </p>
            <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
              <a
                href={FORM_230}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-pill bg-ctr-yellow text-ctr-ink hover:bg-white"
              >
                Redirecționează 3,5% din impozit
              </a>
              <Link
                href="/contact-page"
                className="btn-pill border-2 border-white text-white hover:bg-white hover:text-ctr-ink"
              >
                Contactează-ne
              </Link>
            </div>
          </div>
        </section>
      </Sheet>
    </MainLayout>
  );
};

export default Support;
