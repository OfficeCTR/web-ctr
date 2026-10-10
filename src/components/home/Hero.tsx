import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { at, fs, placed } from "../ui/canvas";

const ease = [0.22, 1, 0.36, 1] as const;

const Hero = () => {
  const { scrollY } = useScroll();
  const photoY = useTransform(scrollY, [0, 800], [0, 60]);
  const splatterY = useTransform(scrollY, [0, 800], [0, -50]);
  const arrowX = useTransform(scrollY, [0, 800], [0, -40]);

  return (
    <section className="relative overflow-hidden bg-black text-white">
      <div className="relative mx-auto max-w-[1366px] px-5 pb-16 pt-28 sm:px-8 sm:pt-36 lg:h-[calc(var(--u)*800)] lg:p-0">
        <h1 className="relative z-10">
          <motion.span
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.1 }}
            className={`block text-[16vw] font-bold uppercase leading-[0.86] tracking-[0.02em] sm:text-7xl lg:text-[length:var(--fs)] ${placed}`}
            style={{ ...at(70, 207), ...fs(88) }}
          >
            Vocea
          </motion.span>
          <motion.span
            initial={{ opacity: 0, scale: 0.6, rotate: -8 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 140, damping: 12, delay: 0.35 }}
            className={`relative -my-[2vw] block w-[92%] max-w-[560px] lg:my-0 lg:max-w-none ${placed}`}
            style={at(66, 269, 536)}
          >
            <Image
              src="/assets/design/hero-tinerilor.png"
              alt="tinerilor"
              width={1072}
              height={306}
              priority
              className="h-auto w-full"
            />
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.25 }}
            className={`block whitespace-nowrap text-[13.4vw] font-bold uppercase leading-[0.86] tracking-[0.02em] sm:text-7xl lg:text-[length:var(--fs)] ${placed}`}
            style={{ ...at(76, 412), ...fs(88) }}
          >
            Din România
          </motion.span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: 0.55 }}
          className={`relative z-10 mt-8 max-w-xl text-lg font-light leading-snug tracking-[0.03em] text-white/90 sm:text-2xl lg:mt-0 lg:max-w-none lg:text-[length:var(--fs)] lg:leading-[1.3] ${placed}`}
          style={{ ...at(86, 540, 600), ...fs(26) }}
        >
          Reprezentăm tinerii din România acolo unde se <br className="hidden lg:block" />
          iau deciziile și transformăm nevoile acestora în <br className="hidden lg:block" />
          <span className="font-bold tracking-normal text-ctr-pink">politici publice</span>,{" "}
          <span className="font-bold tracking-normal text-ctr-yellow">programe</span>{" "}
          <span className="font-bold tracking-normal">și</span>{" "}
          <span className="font-bold tracking-normal text-ctr-blue">oportunități</span>.
        </motion.p>

        <div className="relative mx-auto mt-6 aspect-[594/555] w-full max-w-[560px] lg:static lg:mt-0 lg:max-w-none">
          <motion.div
            initial={{ opacity: 0, scale: 0.92, rotate: 2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, ease, delay: 0.2 }}
            className={`absolute inset-0 lg:inset-auto lg:h-auto ${placed}`}
            style={{ ...at(723, 127, 594), y: photoY } as never}
          >
            <Image
              src="/assets/design/hero-photo.png"
              alt="Tineri participând activ la o dezbatere CTR"
              width={1188}
              height={1110}
              priority
              sizes="(max-width: 1024px) 92vw, 45vw"
              className="h-auto w-full"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.4 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease, delay: 0.7 }}
            className={`pointer-events-none absolute right-[-12%] top-[23%] w-[56%] lg:right-auto ${placed}`}
            style={{ ...at(1032, 256, 334), y: splatterY } as never}
          >
            <Image src="/assets/design/hero-splatter.png" alt="" width={668} height={842} className="h-auto w-full" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, rotate: -20 }}
            animate={{ opacity: 1, rotate: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.9 }}
            className={`pointer-events-none absolute bottom-[-2%] left-[-6%] w-[20%] lg:bottom-auto ${placed}`}
            style={at(685, 529, 121)}
          >
            <Image src="/assets/design/hero-scribble.png" alt="" width={242} height={282} className="h-auto w-full" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -60, y: 30 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 1.05 }}
            className={`pointer-events-none absolute bottom-[22%] left-[-10%] w-[27%] lg:bottom-auto ${placed}`}
            style={{ ...at(639, 446, 161), x: arrowX } as never}
          >
            <Image src="/assets/design/hero-arrow.png" alt="" width={322} height={178} className="h-auto w-full" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
