import { NextApiRequest, NextApiResponse } from 'next';
import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: 'https://boss-mallard-15618.upstash.io',
  token: 'AT0CAAIjcDFjZjNiYjFjNTYzOTE0MTg3Yjg5ODVkMDgyZTIyNmU5NXAxMA',
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const value = await redis.get('key');
      res.status(200).json({ value });
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch data from Redis' });
    }
  } else if (req.method === 'POST') {
    try {
      const { key, value } = req.body;
      await redis.set(key, value);
      res.status(200).json({ message: 'Data saved successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to save data to Redis' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}