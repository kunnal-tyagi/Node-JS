import { Client } from 'pg';
import dotenv from 'dotenv';
dotenv.config();
const client = new Client({
    connectionString: process.env.DATABASE_URL,
});
async function createa() {
    try {
        await client.connect();
        const T1 = `
          CREATE TABLE IF NOT EXISTS TIMBERS(
            id serial primary key,
            name varchar(50) not null,
            age int
          )
        `;
        await client.query(T1);
        //insertinf data
        // const T2=`
        // INSERT INTO TIMBERS(name,age) VALUES($1,$2);
        // `
        // await client.query(T2,["kunnal",20]);
        // await client.query(T2,["samay",23]);
        const result = await client.query(`SELECT * FROM TIMBERS`);
        console.table(result.rows);
        // Transaction starts
        await client.query("BEGIN");
        await client.query(`
        update timbers set name=$1,age=$2 where id=3;
        `, ["vikrant", 20]);
        await client.query(`
        update timbers set name=$1,age=$2 where id=4;
        `, ["vikrant", 20]);
        await client.query('COMMIT');
        // await client.query('TRUNCATE TABLE timbers RESTART IDENTITY;')
        const updated = await client.query('SELECT * FROM TIMBERS');
        console.table(updated.rows);
    }
    catch (err) {
        console.log(err);
    }
    finally {
        await client.end();
    }
}
createa();
//# sourceMappingURL=Transaction.js.map