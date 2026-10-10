import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { animate, motion, useInView } from "framer-motion";
import { at, fs, placed, u } from "../ui/canvas";
import { stickers } from "../ui/sticker";
import Reveal from "../ui/Reveal";
import { homepage } from "../../lib/site";

const CountUp = ({ to, suffix = "" }: { to: number; suffix?: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, { duration: 1.6, ease: "easeOut", onUpdate: (v) => setValue(Math.round(v)) });
    return () => controls.stop();
  }, [inView, to]);
  return (
    <span ref={ref}>
      {value}
      {suffix}
    </span>
  );
};

const Stat = ({ to, suffix, label }: { to: number; suffix?: string; label: [string, string] }) => (
  <div className="flex flex-col items-center">
    <span
      className="inline-block -skew-x-6 font-cond text-[19vw] font-black leading-none tracking-tight sm:text-8xl lg:text-[length:var(--fs)]"
      style={{ ...stickers.blueStat, ...fs(98) }}
    >
      <CountUp to={to} suffix={suffix} />
    </span>
    <span
      className="mt-3 text-center text-lg font-bold leading-[1.1] sm:text-xl lg:mt-[calc(var(--u)*14)] lg:text-[length:var(--fs)]"
      style={fs(22)}
    >
      {label[0]}
      <br />
      {label[1]}
    </span>
  </div>
);

const Network = () => (
  <section className="relative -mt-8 rounded-t-[32px] bg-white lg:-mt-[calc(var(--u)*36)] lg:rounded-t-[calc(var(--u)*40)]">
    <div className="relative mx-auto max-w-[1366px] px-5 pt-14 sm:px-8 lg:h-[calc(var(--u)*471)] lg:p-0">
      <Reveal
        className={`relative mx-auto aspect-[524/372] w-full max-w-[480px] lg:max-w-none ${placed}`}
        style={at(86, 87, 524)}
        scale={0.94}
      >
        <Image
          src="/assets/design/romania-outline.png"
          alt=""
          fill
          sizes="(max-width: 1024px) 90vw, 40vw"
          className="object-contain"
        />
        <div className="absolute inset-0 flex items-center justify-center gap-[9%] pb-[6%] pr-[4%]">
          <Stat to={homepage.statFederations ?? 14} label={["Federații", "membre"]} />
          <Stat to={homepage.statOrganizations ?? 600} suffix="+" label={["Organizații", "în rețea"]} />
        </div>
      </Reveal>

      <Reveal
        delay={0.15}
        className={`mt-10 text-center text-[1.35rem] leading-[1.32] tracking-[0.01em] sm:text-3xl lg:mt-0 lg:text-right lg:text-[length:var(--fs)] ${placed}`}
        style={{ ...at(520, 141, 768), ...fs(36.5) }}
      >
        <p>
          De la <strong>organizații de și pentru tineret locale</strong>,
          <br className="hidden lg:block" /> la <strong>federații de tineret naționale</strong>,{" "}
          <span className="text-ctr-pink">CTR aduce</span>
          <br className="hidden lg:block" /> <strong className="text-ctr-pink">ecosistemul de tineret</strong>{" "}
          <span className="text-ctr-pink">la aceeași masă!</span>
        </p>
      </Reveal>

      <Reveal
        delay={0.3}
        className={`mt-8 flex justify-center lg:mt-0 lg:h-[var(--h)] ${placed}`}
        style={at(715, 351, 560, 82)}
      >
        <Link
          href="/membri"
          className="btn-pill group h-full w-full max-w-md bg-ctr-blue text-xl text-white shadow-[0_18px_40px_-10px_rgba(91,143,255,.6)] hover:bg-[#4a7ff5] lg:max-w-none lg:text-[length:var(--fs)]"
          style={fs(24)}
        >
          Descoperă rețeaua
          <span className="transition-transform duration-300 group-hover:translate-x-2">→</span>
        </Link>
      </Reveal>
    </div>

    <div className="relative mt-12 overflow-visible lg:mt-0">
      <div className="relative -mx-[35%] lg:mx-0">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
        >
          <Image
            src="/assets/design/crowd.png"
            alt="Peste 200 de tineri din rețeaua CTR, fotografie de grup"
            width={2732}
            height={690}
            sizes="(max-width: 1024px) 170vw, 100vw"
            className="h-auto w-full"
          />
        </motion.div>
      </div>
      <div
        className="pointer-events-none absolute right-0 top-[22%] z-20 w-[34%] max-w-[358px] lg:top-[calc(var(--u)*79)] lg:w-[var(--w)] lg:max-w-none"
        style={{ "--w": u(358) } as React.CSSProperties}
        aria-hidden
      >
        <Image src="/assets/design/splatter-black.png" alt="" width={716} height={992} className="h-auto w-full" />
      </div>
      <motion.div
        className="pointer-events-none absolute right-0 top-[66%] z-20 w-[18%] max-w-[188px] lg:top-[calc(var(--u)*242)] lg:w-[var(--w)] lg:max-w-none"
        style={{ "--w": u(188) } as React.CSSProperties}
        initial={{ opacity: 0, rotate: -12 }}
        whileInView={{ opacity: 1, rotate: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3 }}
        aria-hidden
      >
        <Image src="/assets/design/scribble-white.png" alt="" width={376} height={562} className="h-auto w-full" />
      </motion.div>
    </div>
  </section>
);

export default Network;
