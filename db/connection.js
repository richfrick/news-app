const { Pool } = require("pg");

const ENV = process.env.NODE_ENV || "development";

require("dotenv").config({ path: `${__dirname}/../.env.${ENV}` });

if (!process.env.PGDATABASE && !process.env.DATABASE_URL) {
    throw new Error("No PGDATABASE or DATABASE_URL configured");
} else {
    console.log(
        `Connected to ${ENV} using ${
            process.env.DATABASE_URL || process.env.PGDATABASE
        }`
    );
}

let config;

if (ENV === "production") {
    config = {
        connectionString: process.env.DATABASE_URL,
        max: 2,
    };
} else {
    config = {
        host: process.env.PGHOST || "localhost",
        database: process.env.PGDATABASE,
        user: process.env.PGUSER,
        password: process.env.PASSWORD,
        port: Number(process.env.PGPORT) || 5432,
    };
}

const db = new Pool(config);

db.on("connect", (client) => {
    client.query("SET TIME ZONE 'UTC';").catch((err) => {
        console.error("Failed to set UTC timezone on DB session", err);
    });
});

module.exports = db;
