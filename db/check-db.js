import pg from 'pg';
const { Client } = pg;

const client = new Client({ connectionString: process.env.DATABASE_URL });
await client.connect();

// Check for presence of a key table
const res = await client.query(`SELECT to_regclass('public.articles') AS exists`);
if (!res.rows[0].exists) {
  console.log('DB not initialized, seeding required');
  process.exit(0); // run seed next
} else {
  console.log('DB already initialized');
  process.exit(1); // skip seeding
}

await client.end();
