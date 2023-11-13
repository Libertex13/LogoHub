// pages/api/fetch-image.ts

import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { imageUrl } = req.query;
  if (!imageUrl || typeof imageUrl !== 'string') {
    return res.status(400).json({ message: 'Invalid image URL' });
  }
  try {
    const response = await fetch(imageUrl as string);
    const imageBuffer = await response.arrayBuffer();

    res.setHeader('Content-Type', 'image/png');
    res.send(Buffer.from(imageBuffer));
  } catch (error) {
    console.error('Error fetching image:', error);
    res.status(500).json({ message: 'Error fetching image' });
  }
}
