import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { at, fs, placed, u } from "../ui/canvas";
import { homepage, isExternal } from "../../lib/site";

const logoLayout = [
  { x: 152, y: 174, width: 166 },
  { x: 445, y: 177, width: 199 },
  { x: 707, y: 163, width: 218 },
  { x: 992, y: 136, width: 197 },
];

const projects = homepage.featuredProjects.slice(0, 4).map((p, i) => ({
  logo: { src: p.logo, alt: p.logoAlt, ...logoLayout[i] },
  text: p.text,
  href: p.link || "/proiecte",
}));

const cardX = [160, 432, 704, 976];

const Arrow = () => (
  <svg
    viewBox="0 0 32 20"
    className="h-auto w-[45%]"
    fill="none"
    stroke="currentColor"
    strokeWidth={2.6}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M2 10h27M21 2l8 8-8 8" />
  </svg>
);

const Projects = () => (
  <section className="relative z-20 text-white">
    <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1366 774" preserveAspectRatio="none" aria-hidden>
      <path
        fill="#FE558E"
        d="M0 20 C 80 70 160 92 320 78 C 520 60 760 6 950 8 C 1150 10 1290 50 1366 114 L 1366 774 C 1300 700 1210 683 1080 683 C 860 683 600 760 380 761 C 200 762 70 730 0 675 Z"
      />
    </svg>
    <div
      className="bg-dots-white pointer-events-none absolute left-0 top-[18%] h-[45%] w-[16%] opacity-80 [mask-image:linear-gradient(90deg,#000,transparent)]"
      aria-hidden
    />

    <div className="relative mx-auto max-w-[1366px] pb-28 pt-6 lg:h-[calc(var(--u)*774)] lg:p-0">
      <motion.div
        initial={{ opacity: 0, y: 30, rotate: -4 }}
        whileInView={{ opacity: 1, y: 0, rotate: 0 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 120, damping: 14 }}
        className={`relative mx-auto -mt-10 w-[86%] max-w-[560px] lg:mt-0 lg:max-w-none ${placed}`}
        style={at(330, -50, 660)}
      >
        <h2 className="sr-only">Proiectele noastre</h2>
        <Image src="/assets/design/projects-title.png" alt="" width={1320} height={340} className="h-auto w-full" />
      </motion.div>

      <div
        className="pointer-events-none absolute bottom-[8%] left-0 w-[22%] max-w-[216px] lg:bottom-auto lg:left-[var(--l)] lg:top-[var(--t)] lg:w-[var(--w)] lg:max-w-none"
        style={at(0, 391, 216)}
        aria-hidden
      >
        <Image src="/assets/design/projects-left.png" alt="" width={432} height={802} className="h-auto w-full" />
      </div>
      <motion.div
        className="pointer-events-none absolute right-0 top-[6%] w-[24%] max-w-[219px] lg:right-auto lg:left-[var(--l)] lg:top-[var(--t)] lg:w-[var(--w)] lg:max-w-none"
        style={at(1147, 203, 219)}
        animate={{ x: [0, -10, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden
      >
        <Image src="/assets/design/projects-right.png" alt="" width={438} height={616} className="h-auto w-full" />
      </motion.div>
      <div
        className="pointer-events-none absolute right-0 hidden lg:block lg:left-[var(--l)] lg:top-[var(--t)] lg:w-[var(--w)]"
        style={at(1081, 454, 285)}
        aria-hidden
      >
        <Image src="/assets/design/dots-white.png" alt="" width={570} height={574} className="h-auto w-full" />
      </div>

      <ul className="scrollbar-hide relative mt-14 flex snap-x snap-mandatory gap-5 overflow-x-auto px-[12%] pb-10 pt-14 lg:static lg:m-0 lg:overflow-visible lg:p-0">
        {projects.map((p, i) => {
          const external = isExternal(p.href);
          return (
            <motion.li
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className={`relative w-[72%] max-w-[260px] shrink-0 snap-center lg:h-[var(--h)] lg:max-w-none ${placed}`}
              style={at(cardX[i], 205, 230, 338)}
            >
              <Link
                href={p.href}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
                className="group block h-full"
              >
                <div className="relative flex h-full min-h-[300px] flex-col rounded-[28px] bg-ctr-pink px-7 pb-16 pt-24 shadow-[0_24px_40px_-14px_rgba(120,0,40,.45),0_0_0_1px_rgba(255,255,255,.06)] transition-all duration-500 group-hover:-translate-y-3 group-hover:shadow-[0_34px_50px_-14px_rgba(120,0,40,.6)] lg:min-h-0 lg:rounded-[calc(var(--u)*28)] lg:px-[calc(var(--u)*33)] lg:pb-0 lg:pt-[calc(var(--u)*97)]">
                  <p className="text-lg leading-[1.15] tracking-[0.02em] lg:text-[length:var(--fs)]" style={fs(22)}>
                    {p.text}
                  </p>
                  <span className="absolute -bottom-6 left-1/2 flex h-[62px] w-[92px] -translate-x-1/2 items-center justify-center rounded-full bg-ctr-pink shadow-[0_14px_24px_-8px_rgba(120,0,40,.55)] transition-all duration-300 group-hover:w-[110px] group-hover:bg-white group-hover:text-ctr-pink lg:-bottom-[calc(var(--u)*25)] lg:h-[calc(var(--u)*62)] lg:w-[calc(var(--u)*92)]">
                    <Arrow />
                  </span>
                </div>
                <div
                  className="absolute -top-10 left-1/2 w-[78%] -translate-x-1/2 transition-transform duration-500 group-hover:-rotate-3 group-hover:scale-105 lg:left-[var(--lx)] lg:top-[var(--ty)] lg:w-[var(--lw)] lg:translate-x-0"
                  style={
                    {
                      "--lx": u(p.logo.x - cardX[i]),
                      "--ty": u(p.logo.y - 205),
                      "--lw": u(p.logo.width),
                    } as React.CSSProperties
                  }
                >
                  {p.logo.src && <img src={p.logo.src} alt={p.logo.alt} className="h-auto w-full drop-shadow-md" />}
                </div>
              </Link>
            </motion.li>
          );
        })}
      </ul>
    </div>
  </section>
);

export default Projects;
