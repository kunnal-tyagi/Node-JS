import { Client } from 'pg';

const client = new Client({
  connectionString:
    "postgresql://neondb_owner:npg_9fB7FTYhgwRv@ep-orange-smoke-a1r4stwg-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"
});

async function CreateTable() {
  try {
    await client.connect();
    console.log("✅ Connected to PostgreSQL");
    await client.query(`DROP TABLE IF EXISTS users;`);
    const result = await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        email VARCHAR(50) UNIQUE,
        password VARCHAR(225) NOT NULL,
        age INT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    console.log("✅ Users table created successfully!");
  } catch (err) {
    console.error("❌ Error creating table:", err);
  }
}

// ✅ Insert function
async function InsertData(username: string, password: string, age: number) {
  try {
    const inserting = `
      INSERT INTO users (username, password, age)
    //   $1 are placeholders
      VALUES ($1, $2, $3)
    //   Now PostgreSQL will return the newly inserted row back to you will parameters filled
      RETURNING *;
    `;
    const values = [username, password, age];
    const res = await client.query(inserting, values);

    console.log("✅ Inserted data:", res.rows[0]);
  } catch (err) {
    console.error("❌ Error during insertion:", err);
  } finally {
    await client.end();
    console.log("🔒 Connection closed");
  }
}

// ✅ Run in proper sequence
(async () => {
  await CreateTable(); // wait for table creation
  await InsertData("Kunnal", "2809932", 20);
})();
