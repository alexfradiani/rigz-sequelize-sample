if (!process.env.ENV) {
  process.env.ENV = 'dev';
}
require('dotenv').config({ path: `.env.${process.env.ENV}` });
console.log(`environment is set to: ${process.env.ENV}`);

const DB = {
  HOST: process.env.DB_HOST,
  PORT: process.env.DB_PORT,
  DATABASE: process.env.DB_DATABASE,
  USER: process.env.DB_USER,
  PASSWORD: process.env.DB_PASSWORD
};

const RATELIMIT = {
  WINDOW: parseInt(process.env.RATE_LIMIT_WINDOW) || 900000,
  MAX_REQUESTS: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 10
};

const IN_TESTING = process.env.ENV === 'test';

module.exports = {
  DB,
  RATELIMIT,
  IN_TESTING
};
