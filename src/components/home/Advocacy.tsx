import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { at, fs, placed } from "../ui/canvas";
import { homepage } from "../../lib/site";

const posterLayout = [
  { x: 113, y: 257, w: 228, rotate: -5, z: 1 },
  { x: 330, y: 217, w: 218, rotate: -2, z: 2 },
  { x: 552, y: 207, w: 262, rotate: 0, z: 5 },
  { x: 816, y: 217, w: 222, rotate: 2, z: 3 },
  { x: 1040, y: 257, w: 212, rotate: 5, z: 4 },
];
const posters = homepage.advocacyPosters.slice(0, 5).map((p, i) => ({ src: p.image, alt: p.alt, ...posterLayout[i] }));

const button = { label: homepage.advocacyButton.label, href: homepage.advocacyButton.link || "/proiecte#blog" };

const Advocacy = () => (
  <section className="relative z-10 rounded-t-[50%_48px] bg-ctr-yellow lg:rounded-t-[50%_calc(var(--u)*70)]">
    <div
      className="pointer-events-none absolute left-0 top-[6%] w-[18%] max-w-[170px] lg:left-[var(--l)] lg:top-[var(--t)] lg:w-[var(--w)] lg:max-w-none"
      style={at(0, 118, 170)}
      aria-hidden
    >
      <Image src="/assets/design/advocacy-left.png" alt="" width={340} height={1040} className="h-auto w-full" />
    </div>
    <div
      className="pointer-events-none absolute right-0 top-[30%] hidden w-[36%] lg:block lg:left-[var(--l)] lg:top-[var(--t)] lg:w-[var(--w)]"
      style={at(880, -399, 486)}
      aria-hidden
    >
      <Image src="/assets/design/advocacy-right.png" alt="" width={972} height={2480} className="h-auto w-full" />
    </div>
    <div
      className="bg-dots-white pointer-events-none absolute bottom-[16%] right-0 h-[22%] w-[18%] opacity-70 [mask-image:linear-gradient(270deg,#000,transparent)] lg:hidden"
      aria-hidden
    />

    <div className="relative mx-auto max-w-[1366px] px-5 pb-24 pt-10 sm:px-8 lg:h-[calc(var(--u)*837)] lg:p-0">
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.9 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 120, damping: 14 }}
        className={`relative mx-auto w-[92%] max-w-[600px] lg:max-w-none ${placed}`}
        style={at(310, 12, 730)}
      >
        <h2 className="sr-only">Inițiative de advocacy</h2>
        <Image src="/assets/design/advocacy-title.png" alt="" width={1460} height={280} className="h-auto w-full" />
      </motion.div>

      <div className="relative mx-auto mt-10 grid max-w-[560px] grid-cols-3 gap-2 sm:grid-cols-5 sm:max-w-none lg:static lg:mt-0">
        {posters.map((p, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 60, rotate: 0 }}
            whileInView={{ opacity: 1, y: 0, rotate: p.rotate }}
            whileHover={{ y: -18, rotate: 0, scale: 1.06, zIndex: 20 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ type: "spring", stiffness: 140, damping: 16, delay: i * 0.08 }}
            className={`relative aspect-[4/5] bg-white p-1.5 shadow-[0_18px_30px_-12px_rgba(0,0,0,.35)] lg:p-[calc(var(--u)*8)] ${placed} ${
              i > 2 ? "hidden sm:block" : ""
            }`}
            style={{ ...at(p.x, p.y, p.w), zIndex: p.z }}
          >
            <div className="relative h-full w-full overflow-hidden">
              {p.src && (
                <Image src={p.src} alt={p.alt} fill sizes="(max-width: 1024px) 33vw, 20vw" className="object-cover" />
              )}
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className={`relative mx-auto mt-12 max-w-[560px] lg:mt-0 lg:h-[var(--h)] lg:max-w-none ${placed}`}
        style={at(148, 579, 1070, 90)}
      >
        <Link
          href={button.href}
          className="group flex h-full min-h-[72px] items-center justify-center gap-4 whitespace-nowrap rounded-full bg-ctr-yellow px-8 text-center text-lg font-bold shadow-[0_16px_30px_-10px_rgba(150,110,0,.45),inset_0_0_0_1px_rgba(255,255,255,.35)] transition-all duration-300 hover:-translate-y-1.5 hover:bg-black hover:text-ctr-yellow sm:text-xl lg:min-h-0 lg:text-[length:var(--fs)]"
          style={fs(28)}
        >
          {button.label}
          <span className="transition-transform duration-300 group-hover:translate-x-2" aria-hidden>
            →
          </span>
        </Link>
      </motion.div>
    </div>
  </section>
);

export default Advocacy;
