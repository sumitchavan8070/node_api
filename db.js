// In a separate file, e.g., db.js
const mysql = require('mysql');

// Create connection pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'paper'
});

module.exports = pool;
