import { Client } from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

async function main() {
  try {
    await client.connect();

    // Create tables
    await client.query(`
      CREATE TABLE IF NOT EXISTS workers (
        id SERIAL PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        age INT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS address (
        id SERIAL PRIMARY KEY,
        user_id INT NOT NULL,
        address VARCHAR(50) NOT NULL,
        FOREIGN KEY (user_id) REFERENCES workers(id) ON DELETE CASCADE
        //  on delete RESTRICT
      );
    `);

    console.log("✅ Tables ready.");

    // Insert into users
    const userRes = await client.query(
      `INSERT INTO workers (username, age)
       VALUES ($1, $2)
       RETURNING id`,
      ['kunnal', 20]
    );

    const userId = userRes.rows[0].id;

    // Insert into address using same user_id
    await client.query(
      `INSERT INTO address (user_id, address)
       VALUES ($1, $2)`,
      [userId, 'Ghaziabad, U.P.']
    );

    console.log("✅ Inserted user and address successfully!");

  } catch (err) {
    console.error("❌ Error:", err);
  } finally {
    // await client.end();
  }
}

async function showTableData() {
  try {
    // await client.connect();

    // You can replace 'users' with 'address' to see that table
    const res = await client.query("SELECT * FROM workers;");
    console.table(res.rows); // prints neatly in console
    

    //performing Joins
    const joined=await client.query(`
          SELECT w.id,w.username,w.age,a.user_id,a.address
          from workers w
          JOIN address a ON w.id=a.user_id
          WHERE w.id=1
      `)

      console.log("📦 Joined Data:");
    console.table(joined.rows);
  } catch (err) {
    console.error("❌ Error fetching data:", err);
  } finally {
    await client.end();
  }
}

(async () => {
  await main();
  await showTableData();
})();


