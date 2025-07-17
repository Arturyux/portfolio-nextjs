import { db } from '../lib/db';

beforeAll(async () => {
  await db.schema.dropTableIfExists('todos');
  await db.schema.createTable('todos', (table) => {
    table.increments('id').primary();
    table.string('text');
    table.boolean('completed');
  });
});

test('database insert works', async () => {
  await db('todos').insert({ text: 'Test', completed: false });
  const todos = await db('todos').select('*');
  expect(todos.length).toBe(1);
  expect(todos[0].text).toBe('Test');
});