import { db } from '../../lib/db';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { text } = req.body;
    const [id] = await db('todos').insert({ text });
    const todo = await db('todos').where({ id }).first();
    res.status(200).json(todo);
  } else {
    res.status(405).end();
  }
}