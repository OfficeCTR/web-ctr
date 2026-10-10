import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import type { Project } from "~/lib/types";
import Cover from "./ui/Cover";
import { TabLabel } from "./ui/Sheet";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ModalShell = ({
  open,
  onClose,
  children,
}: {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) => {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex items-end justify-center bg-black/70 backdrop-blur-sm sm:items-center sm:p-6"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: 60, opacity: 0, rotate: 1 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            exit={{ y: 60, opacity: 0 }}
            transition={{ type: "spring", stiffness: 160, damping: 20 }}
            className="relative max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-t-[28px] bg-white shadow-2xl sm:rounded-[28px]"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white text-black shadow-lg transition-transform hover:rotate-90"
              aria-label="Închide"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.4} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const Fact = ({ label, value }: { label: string; value?: string }) =>
  value ? (
    <div className="rounded-2xl bg-ctr-paper p-4">
      <span className="block text-xs font-semibold uppercase tracking-[0.15em] text-black/45">{label}</span>
      <span className="mt-1 block font-bold">{value}</span>
    </div>
  ) : null;

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const partners = project?.partners?.filter(Boolean) ?? [];
  const gallery = project?.galleryImages?.filter((g) => g && !/placeholder/i.test(g)) ?? [];

  return (
    <ModalShell open={!!project} onClose={onClose}>
      {project && (
        <>
          <div className="relative">
            <Cover
              src={project.imageUrl}
              alt={project.title}
              index={project.year}
              sizes="900px"
              className="h-56 sm:h-72"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
              <TabLabel tone="yellow">{project.year}</TabLabel>
              <h2 className="mt-3 text-2xl font-bold leading-tight text-white sm:text-4xl">{project.title}</h2>
            </div>
          </div>

          <div className="space-y-8 p-6 sm:p-8">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              <Fact label="Locație" value={project.location} />
              <Fact label="Durată" value={project.duration} />
              <Fact label="Participanți" value={project.participants} />
            </div>

            <div>
              <h3 className="mb-3 text-xl font-bold">Despre proiect</h3>
              <p className="whitespace-pre-line leading-relaxed text-black/70">
                {project.fullDescription ||
                  project.shortDescription ||
                  "Detaliile despre acest proiect vor fi publicate în curând."}
              </p>
            </div>

            {project.impact && (
              <div>
                <h3 className="mb-3 text-xl font-bold">Impact</h3>
                <p className="leading-relaxed text-black/70">{project.impact}</p>
              </div>
            )}

            {partners.length > 0 && (
              <div>
                <h3 className="mb-3 text-xl font-bold">Parteneri</h3>
                <div className="flex flex-wrap gap-2">
                  {partners.map((p, i) => (
                    <TabLabel key={p} tone={(["blue", "pink", "yellow"] as const)[i % 3]}>
                      {p}
                    </TabLabel>
                  ))}
                </div>
              </div>
            )}

            {gallery.length > 0 && (
              <div>
                <h3 className="mb-3 text-xl font-bold">Galerie</h3>
                <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
                  {gallery.map((image, idx) => (
                    <div key={idx} className="relative h-40 overflow-hidden rounded-2xl">
                      <Image
                        src={image}
                        alt={`${project.title} — ${idx + 1}`}
                        fill
                        sizes="300px"
                        className="object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </ModalShell>
  );
}
