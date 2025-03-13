const { Pool } = require('pg');

const ENV = process.env.NODE_ENV || 'development';

require('dotenv').config({ path: `${__dirname}/../.env.${ENV}` });

const config = {};

if (!process.env.PGDATABASE && !process.env.DATABASE_URL) {
  throw new Error('No PGDATABASE or DATABASE_URL configured');
} else if (ENV === 'production') {
  config.connectionString = process.env.DATABASE_URL;
  config.max = 2;
} else {
  console.log(`Connected to ${ENV}`);
}
const db = new Pool(config);

module.exports = db;
