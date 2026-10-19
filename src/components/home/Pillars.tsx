import Image from "next/image";
import { motion } from "framer-motion";
import { at, fs, placed, u } from "../ui/canvas";
import Highlight from "../ui/Highlight";

type Pillar = {
  title: [string, string];
  tab: string;
  align: "left" | "center" | "right";
  paragraphs: string[];
  highlight: string;
  underline: boolean;
  box: { x: number; y: number; w: number; h: number; rotate: number };
  tabPos: { x: number; y: number; w: number };
};

const pillars: Pillar[] = [
  {
    title: ["Programe,", "proiecte & inițiative"],
    tab: "bg-ctr-yellow",
    align: "left",
    paragraphs: [
      "**Proiecte naționale** și sprijin pentru **inițiativele locale** cu impact social direct.",
      "**Programe de formare** pentru dezvoltarea **competențelor civice** și de **leadership**.",
      "Susținere pentru **tinerii lideri**, **organizațiile emergente** și cooperarea între actorii din sector.",
    ],
    highlight: "text-ctr-blue",
    underline: false,
    box: { x: 182, y: 266, w: 330, h: 430, rotate: -6 },
    tabPos: { x: 128, y: 282, w: 290 },
  },
  {
    title: ["Reprezentare,", "consultare & dialog"],
    tab: "bg-ctr-blue",
    align: "center",
    paragraphs: [
      "Spații reale de **dialog** între tineri și organizațiile din **ecosistemul de tineret**.",
      "Asigurare a **prezenței tinerilor** în **structuri consultative**, grupuri de lucru și dezbateri publice.",
      "**Apărare a drepturilor** și intereselor generației tinere în raport cu **instituțiile publice**.",
    ],
    highlight: "text-ctr-blue",
    underline: true,
    box: { x: 503, y: 183, w: 362, h: 475, rotate: 0 },
    tabPos: { x: 520, y: 172, w: 330 },
  },
  {
    title: ["Politici publice &", "advocacy"],
    tab: "bg-ctr-pink",
    align: "right",
    paragraphs: [
      "**Propuneri legislative**, **poziții publice** și **strategii de tineret** fundamentate pe date.",
      "Contribuire directă la **politicile naționale și europene** cu impact asupra generației tinere.",
      "**Monitorizare a deciziilor publice** și presiune pentru **aplicarea corectă a legislației**.",
    ],
    highlight: "text-ctr-pink",
    underline: false,
    box: { x: 833, y: 273, w: 335, h: 440, rotate: 5 },
    tabPos: { x: 930, y: 305, w: 302 },
  },
];

const alignClass = { left: "text-left", center: "text-center", right: "text-right" };

const PillarCard = ({ p, i }: { p: Pillar; i: number }) => (
  <motion.article
    initial={{ opacity: 0, y: 60, rotate: 0 }}
    whileInView={{ opacity: 1, y: 0, rotate: p.box.rotate }}
    whileHover={{ rotate: 0, y: -10, scale: 1.03, zIndex: 30 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ type: "spring", stiffness: 110, damping: 16, delay: i * 0.12 }}
    className={`paper-card relative z-10 mx-auto mt-16 w-full max-w-[400px] px-8 pb-10 pt-14 lg:mx-0 lg:mt-0 lg:h-[var(--h)] lg:max-w-none lg:px-[calc(var(--u)*34)] lg:pb-[calc(var(--u)*40)] lg:pt-[calc(var(--u)*108)] ${placed}`}
    style={at(p.box.x, p.box.y, p.box.w, p.box.h)}
  >
    <h3
      className={`absolute -top-8 font-bold leading-[1.18] text-white ${
        p.align === "left" ? "-left-3" : p.align === "right" ? "-right-3" : "inset-x-0"
      } ${alignClass[p.align]} text-[1.45rem] lg:hidden`}
    >
      {p.title.map((line) => (
        <span key={line} className="block">
          <span className={`box-decoration-clone rounded-lg px-2.5 py-0.5 ${p.tab}`}>{line}</span>
        </span>
      ))}
    </h3>
    <div
      className="flex flex-col gap-5 text-[1.05rem] leading-[1.18] tracking-[0.03em] text-[#3a3a3a] lg:gap-[calc(var(--u)*22)] lg:text-[length:var(--fs)]"
      style={fs(20)}
    >
      {p.paragraphs.map((t) => (
        <p key={t}>
          <Highlight text={t} className={p.highlight} />
        </p>
      ))}
    </div>
    {p.underline && (
      <div
        className="scribble-underline mx-auto mt-8 h-3 w-[78%] opacity-80 lg:absolute lg:bottom-[calc(var(--u)*46)] lg:left-[11%] lg:mt-0"
        aria-hidden
      />
    )}
  </motion.article>
);

const Pillars = () => (
  <section className="relative bg-white">
    <div
      className="pointer-events-none absolute left-0 top-[-60px] z-[5] w-full lg:top-[calc(var(--u)*-210)]"
      aria-hidden
    >
      <div className="relative mx-auto max-w-[1366px]">
        <Image
          src="/assets/design/pillars-symbols.png"
          alt=""
          width={2732}
          height={2200}
          sizes="100vw"
          className="h-auto w-full opacity-50 lg:opacity-90"
        />
      </div>
    </div>

    <div className="relative mx-auto max-w-[1366px] px-5 pb-24 pt-10 sm:px-8 lg:h-[calc(var(--u)*810)] lg:p-0">
      <motion.div
        initial={{ opacity: 0, scale: 0.5, rotate: 10 }}
        whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 160, damping: 11 }}
        className="relative z-20 ml-auto w-[62%] max-w-[360px] lg:absolute lg:left-[var(--l)] lg:top-[var(--t)] lg:w-[var(--w)] lg:max-w-none"
        style={at(880, -60, 486)}
      >
        <h2 className="sr-only">20 de ani de...</h2>
        <Image src="/assets/design/twenty-years.png" alt="" width={972} height={660} className="h-auto w-full" />
        <span
          className="absolute bottom-[14%] right-[20%] text-xl font-bold text-ctr-pink lg:bottom-auto lg:right-auto lg:left-[calc(var(--u)*290)] lg:top-[calc(var(--u)*270)] lg:text-[length:var(--fs)]"
          style={fs(26)}
        >
          de...
        </span>
      </motion.div>

      <div className="relative z-10 lg:static">
        {pillars.map((p, i) => (
          <div key={p.tab} className="contents">
            <motion.h3
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + i * 0.12 }}
              className={`z-40 hidden font-bold leading-[1.18] text-white lg:absolute lg:left-[var(--l)] lg:top-[var(--t)] lg:block lg:w-[var(--w)] lg:text-[length:var(--fs)] ${alignClass[p.align]}`}
              style={
                {
                  ...at(p.tabPos.x, p.tabPos.y, p.tabPos.w),
                  ...fs(27),
                  rotate: `${p.box.rotate * 0.6}deg`,
                } as React.CSSProperties
              }
            >
              {p.title.map((line) => (
                <span key={line} className="block">
                  <span className={`box-decoration-clone rounded-[10px] ${p.tab}`} style={{ padding: `0 ${u(10)}` }}>
                    {line}
                  </span>
                </span>
              ))}
            </motion.h3>
            <PillarCard p={p} i={i} />
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Pillars;
