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

const SHEET_ID = '1WsWOHWZ6GGERWORUR2ml5UdOjRuWLeEmcxkuWrw2Ns0';
const SHEET_NAME = 'Opportunities';

export async function getOpportunities(): Promise<Opportunity[]> {
  try {
    const response = await fetch(
      `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&sheet=${SHEET_NAME}`
    );
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