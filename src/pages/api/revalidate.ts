import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const secret = req.query.secret || req.headers['x-revalidation-secret'];

  if (secret !== process.env.REVALIDATION_SECRET) {
    return res.status(401).json({ message: 'Invalid secret' });
  }

  try {
    let paths: string[] = [];

    if (req.method === 'POST' && req.body?.paths) {
      paths = req.body.paths;
    } else if (req.query.path) {
      paths = Array.isArray(req.query.path)
        ? req.query.path
        : [req.query.path as string];
    } else {
      paths = ['/', '/oportunitati'];
    }

    const results: Record<string, boolean> = {};

    for (const pagePath of paths) {
      try {
        await res.revalidate(pagePath);
        results[pagePath] = true;
      } catch (err) {
        console.error(`Failed to revalidate ${pagePath}:`, err);
        results[pagePath] = false;
      }
    }

    return res.json({
      revalidated: true,
      paths: results,
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    console.error('Revalidation error:', err);
    return res.status(500).json({ message: 'Error revalidating' });
  }
}
