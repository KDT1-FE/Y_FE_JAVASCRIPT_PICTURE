const mysql = require('mysql');
const dotenv = require('dotenv');

dotenv.config();

const db = mysql.createConnection({
  host: process.env.RDS_HOSTNAME,
  database: process.env.RDS_DB_NAME,
  user: process.env.RDS_USERNAME,
  password: process.env.RDS_PASSWORD,
});

db.connect();

module.exports = db;
