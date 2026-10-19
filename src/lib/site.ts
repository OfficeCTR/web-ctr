import settingsJson from "../../content/settings.json";
import homepageJson from "../../content/homepage.json";
import archiveJson from "../../content/archive.json";

type Logo = { name: string; logo: string | null; url?: string | null };

interface SiteSettings {
  email: string;
  phone: string;
  address: string;
  vat: string;
  form230Url: string | null;
  socials: {
    instagramUrl: string | null;
    instagramHandle: string;
    facebookUrl: string | null;
    facebookHandle: string;
    linkedinUrl: string | null;
    linkedinHandle: string;
    tiktokUrl: string | null;
    tiktokHandle: string;
  };
  bank: { beneficiary: string; name: string; ibanRon: string; ibanEur: string; swift: string };
  sponsors: Logo[];
  partners: Logo[];
}

interface HomepageContent {
  statFederations: number | null;
  statOrganizations: number | null;
  featuredProjects: Array<{ logo: string | null; logoAlt: string; text: string; link: string }>;
  carouselPhotos: Array<string | null>;
  advocacyPosters: Array<{ image: string | null; alt: string }>;
  advocacyButton: { label: string; link: string };
}

interface ArchiveContent {
  title: string;
  description: string;
  photos: Array<{ image: string | null; caption: string; year: number | null }>;
}

export const settings = settingsJson as unknown as SiteSettings;
export const homepage = homepageJson as unknown as HomepageContent;
export const archive = archiveJson as unknown as ArchiveContent;

export const socialLinks = [
  { name: "Instagram", url: settings.socials.instagramUrl, handle: settings.socials.instagramHandle },
  { name: "Facebook", url: settings.socials.facebookUrl, handle: settings.socials.facebookHandle },
  { name: "LinkedIn", url: settings.socials.linkedinUrl, handle: settings.socials.linkedinHandle },
  { name: "TikTok", url: settings.socials.tiktokUrl, handle: settings.socials.tiktokHandle },
].filter((s): s is { name: string; url: string; handle: string } => !!s.url);

export const isExternal = (href: string) => /^https?:\/\//.test(href);
