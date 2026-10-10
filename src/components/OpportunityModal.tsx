import type { Opportunity } from "../lib/types";
import { ModalShell } from "./ProjectModal";
import Cover from "./ui/Cover";
import { TabLabel } from "./ui/Sheet";

interface OpportunityModalProps {
  opportunity: Opportunity | null;
  onClose: () => void;
}

const getAbsoluteLink = (link?: string) => {
  if (!link) return undefined;
  if (link.startsWith("http://") || link.startsWith("https://")) return link;
  return `https://${link}`;
};

const Block = ({ title, text }: { title: string; text?: string }) =>
  text ? (
    <div>
      <h3 className="mb-2 text-xl font-bold">{title}</h3>
      <p className="whitespace-pre-line leading-relaxed text-black/70">{text}</p>
    </div>
  ) : null;

export default function OpportunityModal({ opportunity, onClose }: OpportunityModalProps) {
  const deadlineDate = opportunity?.deadline ? new Date(opportunity.deadline) : null;
  const isDeadlineNear = deadlineDate ? deadlineDate.getTime() - Date.now() < 7 * 24 * 60 * 60 * 1000 : false;
  const validImage =
    opportunity?.imageUrl?.startsWith("http://") ||
    opportunity?.imageUrl?.startsWith("https://") ||
    opportunity?.imageUrl?.startsWith("/");

  return (
    <ModalShell open={!!opportunity} onClose={onClose}>
      {opportunity && (
        <>
          <div className="relative">
            <Cover
              src={validImage ? opportunity.imageUrl : undefined}
              alt={opportunity.title}
              index={2}
              sizes="900px"
              className="h-48 sm:h-64"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
              <TabLabel tone={opportunity.isActive ? "blue" : "pink"}>
                {opportunity.isActive ? "Activ" : "Expirat"}
              </TabLabel>
              <h2 className="mt-3 text-2xl font-bold leading-tight text-white sm:text-4xl">{opportunity.title}</h2>
            </div>
          </div>

          <div className="space-y-7 p-6 sm:p-8">
            {(opportunity.organization || opportunity.location) && (
              <div className="flex flex-wrap gap-3 text-sm font-semibold">
                {opportunity.organization && (
                  <span className="rounded-full bg-ctr-paper px-4 py-2">🏢 {opportunity.organization}</span>
                )}
                {opportunity.location && (
                  <span className="rounded-full bg-ctr-paper px-4 py-2">📍 {opportunity.location}</span>
                )}
              </div>
            )}
            <Block title="Despre oportunitate" text={opportunity.fullDescription || opportunity.shortDescription} />
            <Block title="Cerințe" text={opportunity.requirements} />
            <Block title="Beneficii" text={opportunity.benefits} />

            <div className="flex flex-col items-start justify-between gap-4 border-t border-black/10 pt-6 sm:flex-row sm:items-center">
              {deadlineDate && (
                <div>
                  <span className="block text-xs font-semibold uppercase tracking-[0.15em] text-black/45">
                    Termen limită
                  </span>
                  <span className={`text-lg font-bold ${isDeadlineNear ? "text-ctr-pink" : ""}`}>
                    {deadlineDate.toLocaleDateString("ro-RO", { year: "numeric", month: "long", day: "numeric" })}
                  </span>
                </div>
              )}
              {opportunity.link && (
                <a
                  href={getAbsoluteLink(opportunity.link)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-pill group bg-ctr-blue text-white hover:bg-ctr-ink"
                >
                  Aplică acum
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </a>
              )}
            </div>
          </div>
        </>
      )}
    </ModalShell>
  );
}
