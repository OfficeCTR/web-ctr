export type Opportunity = {
  id: string;
  title: string;
  description: string;
  deadline: string;
  isActive: boolean;
  category: 'scholarship' | 'internship' | 'competition' | 'volunteer' | 'other';
  link?: string;
};

// Replace this with your Google Sheet ID
const SHEET_ID = '1WsWOHWZ6GGERWORUR2ml5UdOjRuWLeEmcxkuWrw2Ns0';
const SHEET_NAME = 'Opportunities';

export async function getOpportunities(): Promise<Opportunity[]> {
  try {
    // Fetch the sheet data as CSV
    const response = await fetch(
      `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&sheet=${SHEET_NAME}`
    );
    
    const csvText = await response.text();
    
    // Parse CSV to JSON
    const rows = csvText.split('\n').slice(1); // Skip header row
    const opportunities: Opportunity[] = rows.map((row, index) => {
      const [
        title,
        description,
        deadline,
        isActive,
        category,
        link
      ] = row.split(',').map(cell => cell.replace(/^"|"$/g, '')); // Remove quotes

      return {
        id: `opp-${index + 1}`,
        title,
        description,
        deadline,
        isActive: isActive.toLowerCase() === 'true',
        category: category as Opportunity['category'],
        link: link || undefined
      };
    });

    return opportunities;
  } catch (error) {
    console.error('Error fetching opportunities:', error);
    return [];
  }
} 