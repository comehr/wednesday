// db.js
const mysql = require('mysql2');

// Create a connection pool (recommended for production)
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'cwsms'
});

// Export a promise-based pool
const promisePool = pool.promise();

module.exports = promisePool;