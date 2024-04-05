const mysql = require('mysql');

// db connection pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'paper'
});

module.exports = pool;
