import matter from 'gray-matter';
import { promises as fs } from 'fs';
import path from 'path';

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

export async function getAllArticles(): Promise<Article[]> {
  try {
    // Debug log
    console.log('Articles directory:', articlesDirectory);
    
    // Check if directory exists
    try {
      await fs.access(articlesDirectory);
    } catch (error) {
      console.error('Articles directory does not exist:', error);
      return [];
    }

    const fileNames = await fs.readdir(articlesDirectory);
    console.log('Found article files:', fileNames);

    const allArticles = await Promise.all(
      fileNames
        .filter((fileName) => fileName.endsWith('.md'))
        .map(async (fileName) => {
          const slug = fileName.replace(/\.md$/, '');
          const fullPath = path.join(articlesDirectory, fileName);
          
          console.log('Reading article file:', fullPath);
          
          const fileContents = await fs.readFile(fullPath, 'utf8');
          const { data, content } = matter(fileContents);

          // Debug log
          console.log('Parsed article data:', { slug, ...data });

          return {
            id: slug,
            slug,
            content,
            ...data,
          } as Article;
        })
    );

    return allArticles.sort(
      (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
  } catch (error) {
    console.error('Error reading articles:', error);
    return [];
  }
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  try {
    const fullPath = path.join(articlesDirectory, `${slug}.md`);
    
    // Debug log
    console.log('Attempting to read article:', fullPath);

    // Check if file exists
    try {
      await fs.access(fullPath);
    } catch (error) {
      console.error('Article file does not exist:', error);
      return null;
    }

    const fileContents = await fs.readFile(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    // Debug log
    console.log('Successfully parsed article:', { slug, ...data });

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