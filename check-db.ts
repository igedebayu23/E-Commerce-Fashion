import { Pool } from 'pg';

const connectionString = "postgresql://neondb_owner:npg_Xmay8OY6wKPL@ep-square-pine-ao2chbfh-pooler.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require";
const pool = new Pool({
  connectionString,
  ssl: { rejectUnauthorized: false }
});

async function main() {
  console.log("Connecting...");
  const client = await pool.connect();
  console.log("Connected!");
  const res = await client.query('SELECT NOW()');
  console.log(res.rows);
  client.release();
  await pool.end();
}

main().catch(console.error);
