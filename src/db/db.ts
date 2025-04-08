import pg from 'pg';

const {Client} = pg

const client = new Client({
    user: 'parakhchaudhary',
    host: 'localhost',
    database: 'my_db',
    password: 'universe',
    port: 5432,
  });

async function testDB() {
    
    try {
        await client.connect();
        const result = await client.query('SELECT * FROM books;');
        console.log(result.rows[0]);

    } catch (err) {
        console.log(err);
        
    }
}

testDB();