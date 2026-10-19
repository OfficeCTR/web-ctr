import Head from "next/head";
import type { GetStaticProps } from "next";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import MainLayout from "../components/layout/MainLayout";
import PageHero from "../components/PageHero";
import { SectionTitle, Sheet } from "../components/ui/Sheet";
import { stickers } from "../components/ui/sticker";
import { getOrganizations } from "../lib/content";
import type { Organization } from "../lib/types";

const OrgLogo = ({ org }: { org: Organization }) =>
  org.logo ? (
    <Image src={org.logo} alt={`${org.name} logo`} fill sizes="80px" className="object-contain" />
  ) : (
    <span
      className="flex h-full w-full items-center justify-center rounded-full bg-ctr-blue font-cond font-black text-white"
      style={{ fontSize: 24 }}
    >
      {org.name
        .split(/\s+/)
        .filter((w) => /^[A-ZĂÂÎȘȚ]/.test(w))
        .slice(0, 3)
        .map((w) => w[0])
        .join("")}
    </span>
  );

export const getStaticProps: GetStaticProps = async () => ({ props: { organizations: await getOrganizations() } });

export default function MembriPage({ organizations }: { organizations: Organization[] }) {
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
            </div>
          </div>
        </section>

        <section id="organizatii" className="relative scroll-mt-28 bg-ctr-blue py-20 text-white lg:py-24">
          <div className="pointer-events-none absolute -left-4 top-0 w-[36%] max-w-[360px] opacity-30" aria-hidden>
            <Image src="/assets/design/europe-symbols.png" alt="" width={844} height={650} className="h-auto w-full" />
          </div>
          <div className="shell relative">
            <SectionTitle before="Structuri" script="membre" tone="ink" light />
            <ul className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-4 xl:grid-cols-5">
              {organizations.map((org, index) => (
                <motion.li
                  key={org.id}
                  initial={{ opacity: 0, scale: 0.85 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: Math.min((index % 5) * 0.05, 0.4) }}
                  whileHover={{ y: -8, rotate: index % 2 ? 2 : -2 }}
                  className="flex flex-col items-center rounded-[24px] bg-white p-4 text-center text-ctr-ink shadow-[0_18px_30px_-14px_rgba(0,20,80,.55)] sm:p-6"
                >
                  <div className="relative mb-3 h-16 w-16 sm:h-20 sm:w-20">
                    <OrgLogo org={org} />
                  </div>
                  <h3 className="text-sm font-bold leading-snug sm:text-base">{org.name}</h3>
                  {org.region && (
                    <span className="mt-1 text-xs font-semibold uppercase tracking-wider text-ctr-pink">
                      {org.region}
                    </span>
                  )}
                </motion.li>
              ))}
            </ul>
          </div>
        </section>

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
    </MainLayout>
  );
}
