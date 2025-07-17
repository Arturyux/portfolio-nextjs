const knex = require('knex');
const path = require('path');

const dbPath = process.env.NODE_ENV === 'production' ? '/app/data/todo.db' : path.join(process.cwd(), 'todo.db');

const db = knex({
  client: 'better-sqlite3',
  connection: {
    filename: dbPath,
  },
  useNullAsDefault: true,
});

async function initDb() {
  const exists = await db.schema.hasTable('todos');
  if (!exists) {
    await db.schema.createTable('todos', (table) => {
      table.increments('id').primary();
      table.string('text').notNullable();
      table.boolean('completed').defaultTo(false);
    });
  }
}

module.exports = { db, initDb };