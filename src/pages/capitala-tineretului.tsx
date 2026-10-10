import { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { motion } from "framer-motion";
import MainLayout from "../components/layout/MainLayout";
import PageHero from "../components/PageHero";
import { SectionTitle, Sheet, TabLabel } from "../components/ui/Sheet";
import { stickers } from "../components/ui/sticker";

const OFFICIAL = "https://capitalatineretului.ro/";

const features = [
  {
    title: "Un program ambițios",
    description:
      "Programul pune accent pe dezvoltarea ecosistemelor de tineret din zonele românești, în general, și pe dezvoltarea ecosistemelor de tineret urbane, în mod special.",
  },
  {
    title: "Colaborare multi-sectorială",
    description:
      "În cadrul programului, autoritățile locale colaborează cu organizațiile neguvernamentale de și pentru tineret și cu mediul privat.",
  },
  {
    title: "Tinerii în centrul dezvoltării",
    description: "Programul îi pune pe tineri în centrul procesului de dezvoltare urbană și al comunităților locale.",
  },
  {
    title: "Concurs anual",
    description:
      "Anual, un oraș din România primește, în urma unui concurs de concepte, titlul de Capitala Tineretului din România.",
  },
  {
    title: "Sprijin pentru implementare",
    description:
      "Orașul câștigător este sprijinit financiar, respectiv prin formare și consultanță, în pregătirea și implementarea inițiativelor.",
  },
  {
    title: "Impact pe termen lung",
    description:
      "Programul devine un instrument eficient de mobilizare a resurselor locale pentru o mai bună dezvoltare economică și socială.",
  },
];

const stats = [
  { number: "8", text: "Orașe Capitale ale Tineretului din România", style: stickers.blueStat },
  { number: "1210", text: "Evenimente, activități și proiecte organizate", style: stickers.pinkStat },
  { number: "1524", text: "Persoane voluntare în cadrul programelor", style: stickers.yellowStat },
  { number: "27", text: "Orașe candidate la titlu", style: stickers.blueStat },
];

const partners = [
  { name: "Consiliul Tineretului din România", logo: "/assets/design/logo.png", dark: true },
  { name: "Federația Tinerilor din Cluj", logo: "/assets/capitala-tineretului/ftc-logo.png" },
  { name: "Grupul PONT", logo: "/assets/capitala-tineretului/pont-logo.png" },
  { name: "Banca Comercială Română", logo: "/assets/capitala-tineretului/BCR_whitebg.svg" },
];

const tones = ["blue", "pink", "yellow"] as const;

const CapitalaTineretului: NextPage = () => {
  return (
    <MainLayout>
      <Head>
        <title>Capitala Tineretului din România | CTR</title>
        <meta
          name="description"
          content="Cel mai ambițios program național destinat tinerilor, care pune accent pe dezvoltarea ecosistemelor de tineret din România."
        />
      </Head>

      <PageHero
        title="Capitala"
        script="Tineretului"
        accent="blue"
        image="/assets/design/photos/capitala-group.jpg"
        imageAlt="Echipa Capitala Tineretului din România"
        description="Cel mai ambițios program național destinat tinerilor, creat pentru dezvoltarea ecosistemelor de tineret din România."
      >
        <a
          href={OFFICIAL}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-pill group bg-ctr-blue text-white hover:bg-white hover:text-black"
        >
          Vizitează site-ul oficial <span className="transition-transform group-hover:translate-x-1">→</span>
        </a>
      </PageHero>

      <Sheet>
        <section className="relative py-16 lg:py-24">
          <div className="shell">
            <div className="grid items-center gap-10 lg:grid-cols-[0.8fr_1.2fr]">
              <motion.div
                initial={{ opacity: 0, rotate: -6, scale: 0.9 }}
                whileInView={{ opacity: 1, rotate: -3, scale: 1 }}
                viewport={{ once: true }}
                className="mx-auto w-[80%] max-w-[420px]"
              >
                <Image
                  src="/assets/design/logo-capitala.png"
                  alt="Capitala Tineretului din România"
                  width={654}
                  height={345}
                  className="h-auto w-full drop-shadow-xl"
                />
              </motion.div>
              <div>
                <SectionTitle before="Ce este" script="Capitala" after="?" tone="blue" align="left" />
                <p className="mt-6 text-xl leading-relaxed text-black/75">
                  Capitala Tineretului din România este un program-cadru de tineret, creat la nivel național, ce
                  funcționează pe principii similare cu cele ale Capitalei Europene a Tineretului.
                </p>
              </div>
            </div>

            <div className="mt-20 grid gap-14 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-16">
              {features.map((f, i) => (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 40, rotate: 0 }}
                  whileInView={{ opacity: 1, y: 0, rotate: [-2, 1.5, -1][i % 3] }}
                  whileHover={{ rotate: 0, y: -8 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 110, damping: 15, delay: (i % 3) * 0.08 }}
                  className="paper-card relative px-7 pb-8 pt-12"
                >
                  <span
                    className="absolute -top-8 right-6 font-cond text-6xl font-black leading-none"
                    style={stickers.number}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="absolute -top-4 left-4 text-xl">
                    <TabLabel tone={tones[i % 3]}>{f.title}</TabLabel>
                  </h3>
                  <p className="leading-relaxed text-[#3a3a3a]">{f.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-ctr-pink py-20 text-white lg:py-24">
          <div
            className="bg-dots-white pointer-events-none absolute right-0 top-0 h-full w-1/4 opacity-30 [mask-image:linear-gradient(270deg,#000,transparent)]"
            aria-hidden
          />
          <div className="shell relative">
            <SectionTitle before="Programul în" script="cifre" tone="ink" light />
            <div className="mt-14 grid grid-cols-2 gap-5 lg:grid-cols-4 lg:gap-8">
              {stats.map((s, i) => (
                <motion.div
                  key={s.text}
                  initial={{ opacity: 0, scale: 0.85 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 140, damping: 13, delay: i * 0.08 }}
                  className="rounded-[26px] bg-white p-6 text-center text-ctr-ink shadow-[0_24px_40px_-14px_rgba(120,0,40,.45)] sm:p-8"
                >
                  <span
                    className="block -skew-x-6 font-cond text-6xl font-black leading-none sm:text-7xl"
                    style={s.style}
                  >
                    {s.number}
                  </span>
                  <span className="mt-4 block text-sm font-semibold leading-snug sm:text-base">{s.text}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 lg:py-24">
          <div className="shell">
            <SectionTitle before="Partenerii" script="programului" tone="yellow" />
            <div className="mt-14 grid grid-cols-2 gap-5 lg:grid-cols-4 lg:gap-8">
              {partners.map((p, i) => (
                <motion.div
                  key={p.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -8, rotate: i % 2 ? 2 : -2 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="flex flex-col items-center rounded-[24px] bg-white p-6 text-center shadow-card"
                >
                  <div className={`relative mb-4 h-24 w-full rounded-2xl ${p.dark ? "bg-black" : ""}`}>
                    <Image src={p.logo} alt={p.name} fill sizes="240px" className="object-contain p-3" />
                  </div>
                  <h3 className="font-bold leading-snug">{p.name}</h3>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden rounded-t-[50%_48px] bg-ctr-yellow py-20 lg:rounded-t-[50%_70px] lg:py-28">
          <div className="shell relative max-w-4xl text-center">
            <SectionTitle before="Descoperă tot ce are de oferit" script="Capitala" tone="ink" />
            <p className="mx-auto mt-6 max-w-2xl text-xl leading-relaxed">
              Informații complete despre program, ediții anterioare, știri recente și detalii despre procesul de
              candidatură.
            </p>
            <a
              href={OFFICIAL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-pill group mt-10 bg-ctr-ink text-white hover:bg-ctr-pink"
            >
              www.capitalatineretului.ro <span className="transition-transform group-hover:translate-x-1">→</span>
            </a>
          </div>
        </section>
      </Sheet>
    </MainLayout>
  );
};

export default CapitalaTineretului;
