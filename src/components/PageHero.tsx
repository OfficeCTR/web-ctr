import Image from "next/image";
import { motion } from "framer-motion";
import { stickers } from "./ui/sticker";

type Accent = "blue" | "pink" | "yellow";

interface PageHeroProps {
  title: string;
  script?: string;
  description?: string;
  accent?: Accent;
  image?: string;
  imageAlt?: string;
  children?: React.ReactNode;
}

const scriptStyle: Record<Accent, React.CSSProperties> = {
  blue: stickers.scriptWhiteOnBlue,
  pink: stickers.scriptWhiteOnPink,
  yellow: stickers.scriptWhiteOnYellow,
};

const accentHex: Record<Accent, string> = { blue: "#5B8FFF", pink: "#FE558E", yellow: "#FED653" };

const ease = [0.22, 1, 0.36, 1] as const;

const PageHero = ({ title, script, description, accent = "blue", image, imageAlt = "", children }: PageHeroProps) => {
  return (
    <section className="relative overflow-hidden bg-black pb-24 pt-32 text-white sm:pt-40 lg:pb-32 lg:pt-48">
      <div
        className="pointer-events-none absolute -right-24 -top-10 w-[70%] max-w-[560px] opacity-25 lg:right-[-4%] lg:top-[-6%] lg:opacity-30"
        aria-hidden
      >
        <Image
          src="/assets/design/europe-symbols.png"
          alt=""
          width={844}
          height={650}
          className="h-auto w-full"
          priority
        />
      </div>

      <div className="relative mx-auto grid max-w-[1366px] items-center gap-12 px-5 sm:px-8 lg:grid-cols-[1.1fr_1fr] lg:px-[6.5%]">
        <div className="relative z-10">
          <h1 className="font-bold uppercase leading-[0.9] tracking-[0.02em]">
            <motion.span
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease }}
              className="block text-[15vw] sm:text-7xl lg:text-[5.4rem] xl:text-[6rem]"
            >
              {title}
            </motion.span>
            {script && (
              <motion.span
                initial={{ opacity: 0, scale: 0.6, rotate: -8 }}
                animate={{ opacity: 1, scale: 1, rotate: -4 }}
                transition={{ type: "spring", stiffness: 140, damping: 12, delay: 0.25 }}
                className="mt-1 block origin-left whitespace-nowrap pb-4 pl-1 font-script text-[17vw] normal-case leading-[1.15] tracking-normal sm:text-8xl lg:text-[6rem] xl:text-[6.8rem]"
                style={scriptStyle[accent]}
              >
                {script}
              </motion.span>
            )}
          </h1>
          {description && (
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease, delay: 0.4 }}
              className="mt-6 max-w-xl text-lg font-light leading-snug tracking-[0.02em] text-white/85 sm:text-2xl"
            >
              {description}
            </motion.p>
          )}
          {children && (
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease, delay: 0.55 }}
              className="mt-8"
            >
              {children}
            </motion.div>
          )}
        </div>

        {image ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: 4 }}
            animate={{ opacity: 1, scale: 1, rotate: 2 }}
            transition={{ duration: 1, ease, delay: 0.2 }}
            className="relative mx-auto w-full max-w-[560px]"
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-[22px] border-[6px] border-white bg-white shadow-[0_30px_60px_-20px_rgba(0,0,0,.8)]">
              <Image
                src={image}
                alt={imageAlt}
                fill
                priority
                sizes="(max-width: 1024px) 90vw, 40vw"
                className="object-cover grayscale-[35%]"
              />
            </div>
            <div className="pointer-events-none absolute -right-10 -top-12 w-[46%]" aria-hidden>
              <Image src="/assets/design/hero-splatter.png" alt="" width={668} height={842} className="h-auto w-full" />
            </div>
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease, delay: 0.8 }}
              className="pointer-events-none absolute -left-12 bottom-6 w-[30%]"
              aria-hidden
            >
              <Image src="/assets/design/hero-arrow.png" alt="" width={322} height={178} className="h-auto w-full" />
            </motion.div>
            <div className="pointer-events-none absolute -bottom-10 left-6 w-[20%]" aria-hidden>
              <Image src="/assets/design/hero-scribble.png" alt="" width={242} height={282} className="h-auto w-full" />
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease, delay: 0.3 }}
            className="relative mx-auto hidden w-full max-w-[420px] lg:block"
            aria-hidden
          >
            <Image
              src="/assets/design/hero-splatter.png"
              alt=""
              width={668}
              height={842}
              className="h-auto w-full opacity-90"
            />
            <div
              className="absolute inset-[18%] rounded-full blur-3xl"
              style={{ background: accentHex[accent], opacity: 0.25 }}
            />
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default PageHero;
