require("dotenv").config();
const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DataURL,
  ssl: { rejectUnauthorized: false },
});

module.exports = pool;