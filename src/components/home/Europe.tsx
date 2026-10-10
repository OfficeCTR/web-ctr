import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { at, fs, placed } from "../ui/canvas";
import { stickers } from "../ui/sticker";

const bodies = [
  { lines: ["Youth", "Advisory", "Board"], style: stickers.blueLabel, x: 184, y: 505, w: 142 },
  { lines: ["Dialogul UE", "cu Tinerii"], style: stickers.yellowLabel, x: 356, y: 523, w: 183 },
  { lines: ["EU Youth", "Stakeholders", "Group"], style: stickers.blueLabel, x: 565, y: 505, w: 209 },
  { lines: ["Forumul", "European de", "Tineret (YFJ)"], style: stickers.yellowLabel, x: 795, y: 505, w: 191 },
  { lines: ["World", "Assembly on", "Youth"], style: stickers.blueLabel, x: 1012, y: 505, w: 201 },
];

const Europe = () => (
  <section className="relative z-20 -mt-12 overflow-hidden rounded-t-[50%_48px] bg-white lg:-mt-[calc(var(--u)*70)] lg:rounded-t-[50%_calc(var(--u)*70)]">
    <div className="relative mx-auto max-w-[1366px] px-5 pb-16 pt-14 sm:px-8 lg:h-[calc(var(--u)*838)] lg:p-0">
      <motion.div
        initial={{ opacity: 0, scale: 1.06 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2 }}
        className="pointer-events-none absolute -right-[30%] top-24 w-[115%] opacity-30 lg:right-auto lg:left-[var(--l)] lg:top-[var(--t)] lg:w-[var(--w)] lg:opacity-100"
        style={at(338, -76, 1028)}
        aria-hidden
      >
        <Image
          src="/assets/design/europe-map.png"
          alt=""
          width={2056}
          height={2026}
          sizes="(max-width: 1024px) 115vw, 75vw"
          className="h-auto w-full"
        />
      </motion.div>
      <div
        className="pointer-events-none absolute right-6 top-6 hidden w-[30%] lg:block lg:right-auto lg:left-[var(--l)] lg:top-[var(--t)] lg:w-[var(--w)]"
        style={at(681, 139, 422)}
        aria-hidden
      >
        <Image src="/assets/design/europe-symbols.png" alt="" width={844} height={650} className="h-auto w-full" />
      </div>

      <motion.div
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 100, damping: 15 }}
        className={`relative w-[88%] max-w-[480px] lg:max-w-none ${placed}`}
        style={at(108, 192, 500)}
      >
        <h2 className="sr-only">Setăm agenda europeană pentru tineret</h2>
        <Image src="/assets/design/europe-title.png" alt="" width={1000} height={414} className="h-auto w-full" />
      </motion.div>
      <p
        className={`relative mt-4 text-xl font-light tracking-[0.03em] lg:mt-0 lg:text-[length:var(--fs)] ${placed}`}
        style={{ ...at(135, 410, 500), ...fs(26) }}
      >
        Unde suntem prezenți și activi:
      </p>

      <ul className="relative mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-6 lg:static lg:mt-0">
        {bodies.map((b, i) => (
          <motion.li
            key={b.lines.join(" ")}
            initial={{ opacity: 0, y: 30, rotate: i % 2 ? 6 : -6 }}
            whileInView={{ opacity: 1, y: 0, rotate: 0 }}
            whileHover={{ scale: 1.08, rotate: i % 2 ? 2 : -2 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 160, damping: 12, delay: 0.08 * i }}
            className={`cursor-default text-center font-cond text-[2rem] font-black leading-[0.86] tracking-[-0.02em] lg:text-[length:var(--fs)] ${placed}`}
            style={{ ...at(b.x, b.y, b.w), ...fs(44), ...b.style }}
          >
            {b.lines.map((l) => (
              <span key={l} className="block whitespace-nowrap">
                {l}
              </span>
            ))}
          </motion.li>
        ))}
      </ul>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className={`relative mt-12 flex justify-center lg:mt-0 lg:h-[var(--h)] ${placed}`}
        style={at(477, 699, 381, 55)}
      >
        <Link
          href="/despre#afilieri"
          className="btn-pill group h-full w-full max-w-sm whitespace-nowrap bg-white font-sans text-lg text-black shadow-[0_24px_40px_-12px_rgba(0,0,0,.35)] hover:bg-black hover:text-white lg:max-w-none lg:text-[length:var(--fs)]"
          style={fs(21)}
        >
          CTR pe plan internațional
          <svg
            viewBox="0 0 32 20"
            className="h-auto w-9 transition-transform duration-300 group-hover:translate-x-1.5"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.6}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M2 10h27M21 2l8 8-8 8" />
          </svg>
        </Link>
      </motion.div>
    </div>
  </section>
);

export default Europe;
