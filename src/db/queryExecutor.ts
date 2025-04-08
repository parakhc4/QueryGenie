import pg from 'pg';

const {Client} = pg

const client = new Client({
    user: 'parakhchaudhary',
    host: 'localhost',
    database: 'my_db',
    password: 'universe',
    port: 5432,
  });

await client.connect();


export async function runQuery(sql:string) {
    try {
        const result = await client.query(sql);
        console.log(result.rows[0]);
        return result.rows[0];

    } catch (err) {
        console.error(err);
        throw err;
    }
}