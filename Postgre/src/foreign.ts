import { Client } from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const client = new Client({
  connectionString: process.env.DATABASE_URL, // safer
});

async function createTables() {
  try {
    await client.connect();

    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        email VARCHAR(50) UNIQUE,
        password VARCHAR(255) NOT NULL,
        age INT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS address (
        id SERIAL PRIMARY KEY,
        user_id INT NOT NULL,
        address VARCHAR(50) NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      );
    `);

    console.log("✅ Tables created successfully.");
  } catch (err) {
    console.error("❌ Error creating tables:", err);
  } finally {
    await client.end();
  }
}

createTables();
