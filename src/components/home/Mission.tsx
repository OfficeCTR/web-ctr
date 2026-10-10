import Image from "next/image";
import { motion } from "framer-motion";
import { at, fs, placed } from "../ui/canvas";
import { stickers } from "../ui/sticker";
import Reveal from "../ui/Reveal";

const items: Array<{ top: number; content: React.ReactNode }> = [
  {
    top: 203,
    content: (
      <>
        Reprezentarea{" "}
        <Image
          src="/assets/design/tinerilor-inline.png"
          alt="tinerilor"
          width={274}
          height={72}
          className="inline-block h-[1.2em] w-auto -translate-y-[0.12em] align-middle"
        />
        <br />
        în procesele decizionale
      </>
    ),
  },
  {
    top: 303,
    content: (
      <>
        Elaborarea de politici
        <br />
        publice adresate tinerilor
      </>
    ),
  },
  {
    top: 402,
    content: (
      <>
        Dezvoltarea și coagularea
        <br />
        ecosistemului de tineret
      </>
    ),
  },
  {
    top: 490,
    content: (
      <>
        Implementarea de
        <br />
        programe și activități
        <br />
        destinate tinerilor
      </>
    ),
  },
];

const Mission = () => (
  <section className="relative z-10 -mt-2 rounded-b-[24px] bg-ctr-blue lg:-mt-px text-white lg:rounded-b-[calc(var(--u)*22)]">
    <div className="relative mx-auto max-w-[1366px] px-5 pb-16 pt-6 sm:px-8 lg:h-[calc(var(--u)*719)] lg:p-0">
      <Reveal className={`relative mx-auto max-w-[620px] lg:max-w-none ${placed}`} style={at(126, 34, 736)}>
        <h2 className="sr-only">Care e misiunea noastră?</h2>
        <Image
          src="/assets/design/mission-title.png"
          alt=""
          width={1472}
          height={218}
          sizes="(max-width: 1024px) 92vw, 55vw"
          className="h-auto w-full"
        />
      </Reveal>

      <Reveal
        delay={0.1}
        x={40}
        className={`relative mx-auto mt-10 max-w-[560px] lg:mt-0 lg:max-w-none ${placed}`}
        style={at(617, 148, 622)}
      >
        <motion.div
          whileHover={{ rotate: -1.5, scale: 1.02 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
        >
          <Image
            src="/assets/design/mission-collage.png"
            alt="Tineri între 14 și 35 de ani la un eveniment CTR"
            width={1244}
            height={1042}
            sizes="(max-width: 1024px) 92vw, 46vw"
            className="h-auto w-full"
          />
        </motion.div>
      </Reveal>

      <ol className="mx-auto mt-10 flex max-w-[560px] flex-col gap-6 lg:static lg:mt-0 lg:max-w-none">
        {items.map((item, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 * i }}
            className={`group flex items-center gap-4 lg:gap-[calc(var(--u)*12)] ${placed}`}
            style={at(128, item.top, 470)}
          >
            <span
              className="w-12 shrink-0 text-center font-cond text-6xl font-black leading-none transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110 lg:w-[calc(var(--u)*56)] lg:text-[length:var(--fs)]"
              style={{ ...stickers.number, ...fs(78) }}
            >
              {i + 1}
            </span>
            <span
              className="text-[1.35rem] font-bold leading-[1.08] tracking-[0.01em] sm:text-2xl lg:text-[length:var(--fs)]"
              style={{ ...fs(30), textShadow: "0 2px 0 rgba(0,0,0,.25)" }}
            >
              {item.content}
            </span>
          </motion.li>
        ))}
      </ol>
    </div>
  </section>
);

export default Mission;
