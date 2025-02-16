import type { NextApiRequest, NextApiResponse } from 'next';
import pool from '../../lib/db';
import { Todo } from '../../interfaces/todo';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const client = await pool.connect();
        const result = await client.query<Todo>('SELECT * FROM todos ORDER BY id ASC');
        client.release();
        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Failed to fetch todos', error);
        res.status(500).json({ error: 'Failed to fetch todos' });
    }
}