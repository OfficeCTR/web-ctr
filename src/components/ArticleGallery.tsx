import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import type { ArticlePhoto } from "../lib/types";
import { SectionTitle } from "./ui/Sheet";

const frames = ["#5B8FFF", "#FE558E", "#FED653"];
const tilts = [-1.5, 1, -0.5, 1.5, -1, 0.5];

const layoutFor = (count: number, index: number) => {
  const wideOnPhone = count === 1 || (index === 0 && count % 2 === 1);
  const phone = wideOnPhone ? "col-span-2 aspect-[16/10]" : "aspect-square";
  if (count === 1) return `${phone} sm:col-span-6 sm:aspect-[16/10]`;
  if (count === 2) return `${phone} sm:col-span-3 sm:aspect-[4/3]`;
  if (count % 3 === 1 && index === 0) return `${phone} sm:col-span-6 sm:aspect-[16/9]`;
  if (count % 3 === 2 && index < 2) return `${phone} sm:col-span-3 sm:aspect-[4/3]`;
  return `${phone} sm:col-span-2 sm:aspect-square`;
};

const ArrowButton = ({ dir, onClick }: { dir: "prev" | "next"; onClick: () => void }) => (
  <button
    type="button"
    onClick={(e) => {
      e.stopPropagation();
      onClick();
    }}
    className={`absolute top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white text-2xl text-ctr-ink shadow-xl transition-transform hover:scale-110 sm:h-14 sm:w-14 ${
      dir === "prev" ? "left-3 sm:left-6" : "right-3 sm:right-6"
    }`}
    aria-label={dir === "prev" ? "Fotografia anterioară" : "Fotografia următoare"}
  >
    {dir === "prev" ? "←" : "→"}
  </button>
);

const ArticleGallery = ({ photos, title }: { photos: ArticlePhoto[]; title: string }) => {
  const [open, setOpen] = useState<number | null>(null);
  const [direction, setDirection] = useState(0);

  const go = useCallback(
    (step: number) => {
      setDirection(step);
      setOpen((current) => (current === null ? current : (current + step + photos.length) % photos.length));
    },
    [photos.length],
  );

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, go]);

  if (!photos.length) return null;
  const current = open === null ? null : photos[open];

  return (
    <section className="mx-auto max-w-5xl px-5 pb-20 sm:px-8">
      <SectionTitle before="Galerie" script="foto" tone="pink" />
      <ul className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-6 sm:gap-6">
        {photos.map((photo, i) => (
          <motion.li
            key={photo.image}
            initial={{ opacity: 0, y: 30, rotate: 0 }}
            whileInView={{ opacity: 1, y: 0, rotate: tilts[i % tilts.length] }}
            whileHover={{ rotate: 0, scale: 1.03, zIndex: 10 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 140, damping: 16, delay: (i % 3) * 0.06 }}
            className={`relative ${layoutFor(photos.length, i)}`}
          >
            <button
              type="button"
              onClick={() => {
                setDirection(0);
                setOpen(i);
              }}
              className="group relative block h-full w-full overflow-hidden rounded-[18px] shadow-card"
              style={{ border: `6px solid ${frames[i % frames.length]}` }}
              aria-label={`Deschide fotografia ${i + 1}${photo.caption ? `: ${photo.caption}` : ""}`}
            >
              <Image
                src={photo.image}
                alt={photo.caption || `${title} — fotografia ${i + 1}`}
                fill
                sizes="(max-width: 640px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <span className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 via-transparent to-transparent p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <span className="flex items-center gap-2 text-left text-sm font-semibold text-white">
                  <span aria-hidden>⤢</span>
                  {photo.caption || "Mărește"}
                </span>
              </span>
            </button>
          </motion.li>
        ))}
      </ul>

      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {current && open !== null && (
              <motion.div
                key="lightbox"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[70] flex flex-col bg-black/95"
                onClick={() => setOpen(null)}
                role="dialog"
                aria-modal="true"
                aria-label="Galerie foto"
              >
                <div className="flex items-center justify-between px-5 py-4 text-white sm:px-8">
                  <span className="font-cond text-lg font-bold tracking-wide">
                    {open + 1} / {photos.length}
                  </span>
                  <button
                    type="button"
                    onClick={() => setOpen(null)}
                    className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-black transition-transform hover:rotate-90"
                    aria-label="Închide"
                  >
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.4} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="relative flex-1 overflow-hidden">
                  <AnimatePresence initial={false} custom={direction} mode="popLayout">
                    <motion.div
                      key={open}
                      custom={direction}
                      initial={{ opacity: 0, x: direction * 80 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: direction * -80 }}
                      transition={{ duration: 0.3 }}
                      drag={photos.length > 1 ? "x" : false}
                      dragConstraints={{ left: 0, right: 0 }}
                      dragElastic={0.6}
                      onDragEnd={(_, info) => {
                        if (info.offset.x < -60) go(1);
                        if (info.offset.x > 60) go(-1);
                      }}
                      className="absolute inset-4 sm:inset-x-24 sm:inset-y-4"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Image
                        src={current.image}
                        alt={current.caption || `${title} — fotografia ${open + 1}`}
                        fill
                        sizes="100vw"
                        className="pointer-events-none select-none object-contain"
                        priority
                      />
                    </motion.div>
                  </AnimatePresence>
                  {photos.length > 1 && (
                    <>
                      <ArrowButton dir="prev" onClick={() => go(-1)} />
                      <ArrowButton dir="next" onClick={() => go(1)} />
                    </>
                  )}
                </div>

                <p className="min-h-[3.5rem] px-5 py-4 text-center text-white/85 sm:px-8">{current.caption}</p>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </section>
  );
};

export default ArticleGallery;
