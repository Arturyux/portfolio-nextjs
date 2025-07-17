import { db } from '../../../lib/db';

export default async function handler(req, res) {
  const { id } = req.query;
  if (req.method === 'PUT') {
    const { completed } = req.body;
    await db('todos').where({ id }).update({ completed });
    res.status(200).end();
  } else {
    res.status(405).end();
  }
}