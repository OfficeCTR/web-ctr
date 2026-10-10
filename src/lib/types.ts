export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: { name: string; avatar: string };
  publishedAt: string;
  category: string;
}

type OpportunityCategory = "for_youth" | "for_ngos" | "for_communities" | "other";

export interface Opportunity {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  deadline: string;
  isActive: boolean;
  category: OpportunityCategory;
  link: string | null;
  imageUrl: string | null;
  requirements: string;
  benefits: string;
  location: string;
  organization: string;
}

export interface Project {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  year: number;
  location: string;
  duration: string;
  participants: string;
  impact: string;
  partners: string[];
  imageUrl: string | null;
  galleryImages: string[];
}

export interface TeamMember {
  id: string;
  name: string;
  position: string;
  email: string;
  photo: string;
  department: "leadership" | "executive" | "media";
  order: number;
}

type OrganizationType = "international" | "national" | "regional";

export interface Organization {
  id: string;
  name: string;
  type: OrganizationType;
  region: string;
  logo: string | null;
}

export const opportunityCategories: Array<{ id: "all" | OpportunityCategory; label: string }> = [
  { id: "all", label: "Toate" },
  { id: "for_youth", label: "Pentru tineri" },
  { id: "for_ngos", label: "Pentru ONG-uri" },
  { id: "for_communities", label: "Pentru comunități" },
  { id: "other", label: "Altele" },
];

export const organizationTypes: OrganizationType[] = ["international", "national", "regional"];

export const typeDisplayLabels: Record<"all" | OrganizationType, string> = {
  all: "Toate organizațiile",
  international: "Afiliate internațional",
  national: "Nivel național",
  regional: "Regionale/Județene",
};

export const typeLabels: Record<OrganizationType, string> = {
  international: "Structuri neguvernamentale de tineret afiliate internațional",
  national: "Organizații neguvernamentale de tineret de nivel național",
  regional: "Structuri neguvernamentale de tineret cu activitate și reprezentativitate regională sau județeană",
};
