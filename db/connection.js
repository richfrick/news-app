const { Pool } = require("pg");
const fs = require("fs");
const path = require("path");

const ENV = process.env.NODE_ENV || "development";

const localPath = path.join(__dirname, `../.env.${ENV}.local`);
const defaultPath = path.join(__dirname, `../.env.${ENV}`);

if (!process.env.PGHOST && !process.env.DATABASE_URL) {
    if (fs.existsSync(localPath)) {
        require("dotenv").config({ path: localPath });
    } else {
        require("dotenv").config({ path: defaultPath });
    }
}

if (!process.env.PGHOST && !process.env.DATABASE_URL) {
    if (!process.env.DOCKER) {
        process.env.PGHOST = "localhost";
    }
}

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
} else if (ENV === "staging") {
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
