const { Pool } = require("pg");
const { DATABASE_NAME } = require("../constants/database");

const pool = new Pool({
  user: process.env.DATABASE_USER,
  database: DATABASE_NAME,
  password: process.env.DATABASE_USER_PASSWORD,
  port: process.env.DATABASE_PORT,
  host: "localhost",
});

module.exports = pool;
