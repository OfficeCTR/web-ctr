import { promises as fs } from "fs";
import path from "path";
import matter from "gray-matter";
import { createReader } from "@keystatic/core/reader";
import keystaticConfig from "../../keystatic.config";
import type { Article, ArticleSummary, Opportunity, Organization, Project, TeamMember } from "./types";

const reader = createReader(process.cwd(), keystaticConfig);

const FALLBACK_AVATAR = "/favicon.png";

export async function getArticles(): Promise<ArticleSummary[]> {
  const entries = await reader.collections.articles.all();
  return entries
    .map(({ slug, entry }) => ({
      id: slug,
      slug,
      title: entry.title,
      excerpt: entry.excerpt,
      coverImage: entry.coverImage ?? "/assets/design/photos/summit-x-stage.jpg",
      author: { name: entry.authorName || "Echipa CTR", avatar: entry.authorAvatar || FALLBACK_AVATAR },
      publishedAt: entry.publishedAt ?? "",
      category: entry.category,
    }))
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export async function getArticle(slug: string): Promise<Article | null> {
  const entry = await reader.collections.articles.read(slug);
  if (!entry) return null;
  const file = await fs.readFile(path.join(process.cwd(), "content/articles", `${slug}.md`), "utf8");
  return {
    id: slug,
    slug,
    title: entry.title,
    excerpt: entry.excerpt,
    content: matter(file).content,
    coverImage: entry.coverImage ?? "/assets/design/photos/summit-x-stage.jpg",
    author: { name: entry.authorName || "Echipa CTR", avatar: entry.authorAvatar || FALLBACK_AVATAR },
    publishedAt: entry.publishedAt ?? "",
    category: entry.category,
    gallery: entry.gallery
      .filter((photo): photo is { image: string; caption: string } => !!photo.image)
      .map((photo) => ({ image: photo.image, caption: photo.caption })),
  };
}

export async function getOpportunities(): Promise<Opportunity[]> {
  const today = new Date().toISOString().slice(0, 10);
  const entries = await reader.collections.opportunities.all();
  return entries
    .map(({ slug, entry }) => ({
      id: slug,
      title: entry.title,
      shortDescription: entry.shortDescription,
      fullDescription: entry.fullDescription,
      deadline: entry.deadline ?? "",
      isActive: entry.isActive && (!entry.deadline || entry.deadline >= today),
      category: entry.category,
      link: entry.link || null,
      imageUrl: entry.image ?? null,
      requirements: entry.requirements,
      benefits: entry.benefits,
      location: entry.location,
      organization: entry.organization,
    }))
    .sort(
      (a, b) => Number(b.isActive) - Number(a.isActive) || (a.deadline || "9999").localeCompare(b.deadline || "9999"),
    );
}

export async function getProjects(): Promise<Project[]> {
  const entries = await reader.collections.projects.all();
  return entries
    .map(({ slug, entry }) => ({
      id: slug,
      title: entry.title,
      shortDescription: entry.shortDescription,
      fullDescription: entry.fullDescription,
      year: entry.year ?? new Date().getFullYear(),
      location: entry.location,
      duration: entry.duration,
      participants: entry.participants,
      impact: entry.impact,
      partners: entry.partners.filter(Boolean),
      imageUrl: entry.image ?? null,
      galleryImages: entry.gallery.filter((g): g is string => !!g),
    }))
    .sort((a, b) => b.year - a.year || a.title.localeCompare(b.title, "ro"));
}

export async function getTeam(): Promise<TeamMember[]> {
  const entries = await reader.collections.team.all();
  return entries
    .map(({ slug, entry }) => ({
      id: slug,
      name: entry.name,
      position: entry.position,
      email: entry.email,
      photo: entry.photo ?? FALLBACK_AVATAR,
      department: entry.department,
      order: entry.order ?? 10,
    }))
    .sort((a, b) => a.order - b.order || a.name.localeCompare(b.name, "ro"));
}

export async function getOrganizations(): Promise<Organization[]> {
  const entries = await reader.collections.organizations.all();
  return entries
    .map(({ slug, entry }) => ({
      id: slug,
      name: entry.name,
      type: entry.type,
      region: entry.region,
      logo: entry.logo ?? null,
    }))
    .sort((a, b) => a.name.localeCompare(b.name, "ro"));
}
