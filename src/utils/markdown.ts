import matter from 'gray-matter';
import { promises as fs } from 'fs';
import path from 'path';
import { getArticlesFromSheet, type SheetArticle } from './googleSheets';

const articlesDirectory = path.join(process.cwd(), 'src/content/articles');

export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: {
    name: string;
    avatar: string;
  };
  publishedAt: string;
  category: string;
}

async function getLocalArticles(): Promise<Article[]> {
  try {
    try {
      await fs.access(articlesDirectory);
    } catch {
      return [];
    }

    const fileNames = await fs.readdir(articlesDirectory);

    const allArticles = await Promise.all(
      fileNames
        .filter((fileName) => fileName.endsWith('.md'))
        .map(async (fileName) => {
          const slug = fileName.replace(/\.md$/, '');
          const fullPath = path.join(articlesDirectory, fileName);
          const fileContents = await fs.readFile(fullPath, 'utf8');
          const { data, content } = matter(fileContents);

          return {
            id: slug,
            slug,
            content,
            ...data,
          } as Article;
        })
    );

    return allArticles;
  } catch (error) {
    console.error('Error reading local articles:', error);
    return [];
  }
}

export async function getAllArticles(): Promise<Article[]> {
  const [sheetArticles, localArticles] = await Promise.all([
    getArticlesFromSheet(),
    getLocalArticles(),
  ]);

  const articleMap = new Map<string, Article>();

  for (const article of localArticles) {
    articleMap.set(article.slug, article);
  }

  for (const article of sheetArticles) {
    articleMap.set(article.slug, article as Article);
  }

  return Array.from(articleMap.values()).sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  try {
    const sheetArticles = await getArticlesFromSheet();
    const sheetArticle = sheetArticles.find((a) => a.slug === slug);
    if (sheetArticle) {
      return sheetArticle as Article;
    }
  } catch (error) {
    console.error('Error checking Google Sheets for article:', error);
  }

  try {
    const fullPath = path.join(articlesDirectory, `${slug}.md`);

    try {
      await fs.access(fullPath);
    } catch {
      return null;
    }

    const fileContents = await fs.readFile(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      id: slug,
      slug,
      content,
      ...data,
    } as Article;
  } catch (error) {
    console.error('Error reading article:', error);
    return null;
  }
}
