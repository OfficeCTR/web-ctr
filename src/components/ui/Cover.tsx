import Image from "next/image";

const palettes = [
  { bg: "#5B8FFF", fg: "#fff" },
  { bg: "#FE558E", fg: "#fff" },
  { bg: "#FED653", fg: "#0A0A0A" },
  { bg: "#0A0A0A", fg: "#fff" },
];

const isPlaceholder = (src?: string | null) => !src || /placeholder/i.test(src);

const Cover = ({
  src,
  alt,
  label,
  index = 0,
  sizes = "(max-width: 768px) 100vw, 33vw",
  className = "",
}: {
  src?: string | null;
  alt: string;
  label?: string;
  index?: number;
  sizes?: string;
  className?: string;
}) => {
  if (!isPlaceholder(src)) {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        <Image
          src={src!}
          alt={alt}
          fill
          sizes={sizes}
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
    );
  }
  const p = palettes[index % palettes.length];
  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ background: p.bg, color: p.fg }}
      aria-label={alt}
      role="img"
    >
      <div className="absolute -right-6 -top-4 w-[70%] opacity-40 mix-blend-luminosity transition-transform duration-700 group-hover:rotate-3 group-hover:scale-110">
        <Image src="/assets/design/europe-symbols.png" alt="" width={844} height={650} className="h-auto w-full" />
      </div>
      <div className="bg-dots-white absolute bottom-0 left-0 h-1/2 w-1/3 opacity-30 [mask-image:linear-gradient(45deg,#000,transparent)]" />
      {label && (
        <span className="absolute bottom-4 left-5 right-5 line-clamp-3 font-cond text-2xl font-black uppercase leading-[0.95] tracking-tight">
          {label}
        </span>
      )}
    </div>
  );
};

export default Cover;
