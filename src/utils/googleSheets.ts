import { parse } from 'csv-parse/sync';

export type Opportunity = {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  deadline: string;
  isActive: boolean;
  category: 'scholarship' | 'internship' | 'competition' | 'volunteer' | 'other';
  link?: string;
  imageUrl?: string;
  requirements?: string;
  benefits?: string;
  location?: string;
  organization?: string;
};

export interface SheetArticle {
  id: string;
  slug: string;
  title: string;
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

const SHEET_ID = process.env.GOOGLE_SHEET_ID || '';
const OPPORTUNITIES_SHEET = 'Opportunities';
const ARTICLES_SHEET = 'Articles';

function buildSheetUrl(sheetName: string): string {
  return `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(sheetName)}`;
}

function toDriveDirectUrl(url: string): string {
  if (!url) return '';

  let fileId = '';

  const filePathMatch = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (filePathMatch) {
    fileId = filePathMatch[1];
  }

  const idParamMatch = url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (!fileId && idParamMatch) {
    fileId = idParamMatch[1];
  }

  if (fileId) {
    return `https://lh3.googleusercontent.com/d/${fileId}`;
  }

  return url;
}

export async function getOpportunities(): Promise<Opportunity[]> {
  try {
    const response = await fetch(buildSheetUrl(OPPORTUNITIES_SHEET));
    const csvText = await response.text();
    const records = parse(csvText, {
      columns: true,
      skip_empty_lines: true,
      trim: true,
    });

    return records.map((row: any, index: number) => ({
      id: `opp-${index + 1}`,
      title: row['Title'] || '',
      shortDescription: row['shortDescription'] || '',
      fullDescription: row['fullDescription'] || '',
      deadline: row['Deadline (in YYYY-MM-DD format)'] || '',
      isActive: (row['IsActive (true/false)'] || '').toLowerCase() === 'true',
      category: (row['Category (scholarship/internship/competition/volunteer/other)'] || 'other') as Opportunity['category'],
      link: row['Link (optional)'] || undefined,
      imageUrl: row['imageUrl'] || undefined,
      requirements: row['requirements'] || undefined,
      benefits: row['benefits'] || undefined,
      location: row['location'] || undefined,
      organization: row['organization'] || undefined,
    }));
  } catch (error) {
    console.error('Error fetching opportunities:', error);
    return [];
  }
}

export async function getArticlesFromSheet(): Promise<SheetArticle[]> {
  try {
    const response = await fetch(buildSheetUrl(ARTICLES_SHEET));
    if (!response.ok) {
      console.warn('Articles sheet not found or not accessible, skipping Google Sheets articles');
      return [];
    }

    const csvText = await response.text();
    if (!csvText || csvText.includes('<!DOCTYPE html>')) {
      console.warn('Articles sheet returned invalid data, skipping');
      return [];
    }

    const records = parse(csvText, {
      columns: true,
      skip_empty_lines: true,
      trim: true,
      relax_column_count: true,
    });

    return records
      .filter((row: any) => row['slug'] && row['title'])
      .map((row: any) => ({
        id: row['slug'],
        slug: row['slug'],
        title: row['title'],
        excerpt: row['excerpt'] || '',
        content: row['content'] || '',
        coverImage: toDriveDirectUrl(row['coverImage'] || '') || '/assets/ctr-logo.png',
        author: {
          name: row['authorName'] || 'Echipa CTR',
          avatar: toDriveDirectUrl(row['authorAvatar'] || '') || '/assets/ctr-logo.png',
        },
        publishedAt: row['publishedAt'] || new Date().toISOString().split('T')[0],
        category: row['category'] || 'General',
      }));
  } catch (error) {
    console.error('Error fetching articles from Google Sheets:', error);
    return [];
  }
}
