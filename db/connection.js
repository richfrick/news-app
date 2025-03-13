const { Pool } = require('pg');

const ENV = process.env.NODE_ENV || 'development';

require('dotenv').config({ path: `${__dirname}/../.env.${ENV}` });

if (!process.env.PGDATABASE && !process.env.DATABASE_URL) {
  throw new Error('No PGDATABASE or DATABASE_URL configured');
} else {
  console.log(`Connected to ${ENV}`);
}

const config =
  ENV === 'production'
    ? {
        connectionString: process.env.DATABASE_URL,
        max: 2,
      }
    : {};

const db = new Pool(config);

module.exports = db;
