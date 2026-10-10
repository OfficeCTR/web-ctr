import { motion } from "framer-motion";
import { stickers } from "./sticker";

export const Sheet = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`relative z-10 -mt-12 rounded-t-[32px] bg-white lg:-mt-14 lg:rounded-t-[44px] ${className}`}>
    {children}
  </div>
);

type Tone = "blue" | "pink" | "yellow" | "ink";

const scriptTone: Record<Tone, React.CSSProperties> = {
  blue: stickers.scriptWhiteOnBlue,
  pink: stickers.scriptWhiteOnPink,
  yellow: stickers.scriptWhiteOnYellow,
  ink: stickers.scriptWhiteOnInk,
};

export const SectionTitle = ({
  before,
  script,
  after,
  tone = "ink",
  light = false,
  align = "center",
  className = "",
}: {
  before?: string;
  script: string;
  after?: string;
  tone?: Tone;
  light?: boolean;
  align?: "left" | "center";
  className?: string;
}) => (
  <motion.h2
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    className={`text-[2.3rem] font-bold leading-[1.05] tracking-[0.01em] sm:text-5xl lg:text-[3.6rem] ${
      light ? "text-white" : "text-ctr-ink"
    } ${align === "center" ? "text-center" : "text-left"} ${className}`}
  >
    {before && <>{before} </>}
    <span
      className="relative inline-block -rotate-3 px-1 font-script font-normal leading-[1.3]"
      style={scriptTone[tone]}
    >
      {script}
    </span>
    {after && <> {after}</>}
  </motion.h2>
);

export const PillTabs = <T extends string>({
  options,
  value,
  onChange,
  tone = "blue",
}: {
  options: Array<{ id: T; label: string }>;
  value: T;
  onChange: (id: T) => void;
  tone?: "blue" | "pink" | "yellow";
}) => {
  const active = {
    blue: "bg-ctr-blue text-white",
    pink: "bg-ctr-pink text-white",
    yellow: "bg-ctr-yellow text-ctr-ink",
  }[tone];
  return (
    <div className="scrollbar-hide -mx-5 flex gap-3 overflow-x-auto px-5 py-2 sm:mx-0 sm:flex-wrap sm:justify-center sm:overflow-visible sm:px-0">
      {options.map((o) => {
        const isActive = o.id === value;
        return (
          <button
            key={o.id}
            type="button"
            onClick={() => onChange(o.id)}
            className={`relative shrink-0 rounded-full border-2 px-6 py-2.5 font-cond text-lg font-bold tracking-wide transition-all duration-300 ${
              isActive
                ? `${active} border-transparent shadow-[0_10px_24px_-10px_rgba(0,0,0,.45)] -translate-y-0.5`
                : "border-black/10 bg-white text-ctr-ink hover:-translate-y-0.5 hover:border-black"
            }`}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
};

export const TabLabel = ({
  children,
  tone = "blue",
  className = "",
}: {
  children: React.ReactNode;
  tone?: "blue" | "pink" | "yellow";
  className?: string;
}) => {
  const bg = { blue: "bg-ctr-blue text-white", pink: "bg-ctr-pink text-white", yellow: "bg-ctr-yellow text-ctr-ink" }[
    tone
  ];
  return (
    <span className={`box-decoration-clone rounded-[10px] px-2.5 py-0.5 font-bold leading-[1.35] ${bg} ${className}`}>
      {children}
    </span>
  );
};
