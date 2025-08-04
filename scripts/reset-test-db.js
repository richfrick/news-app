const { Client } = require("pg");

const client = new Client({
    host: process.env.PGHOST || "localhost",
    port: Number(process.env.PGPORT) || 5432,
    user: process.env.PGUSER || "postgres",
    password: process.env.PGPASSWORD || "postgres",
    database: "postgres", // connect to default db to manage test db
});

async function resetTestDB() {
    try {
        await client.connect();
        console.log("Connected to Postgres, resetting test database...");

        await client.query("DROP DATABASE IF EXISTS nc_news_test;");
        await client.query(
            "CREATE DATABASE nc_news_test WITH TEMPLATE template0 ENCODING 'UTF8';"
        );
        await client.query(
            "ALTER DATABASE nc_news_test SET timezone TO 'UTC';"
        );

        console.log("Test db reset complete");
    } catch (err) {
        console.error("Error resetting test db:", err);
        process.exit(1);
    } finally {
        await client.end();
    }
}

resetTestDB();
