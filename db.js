const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'supermarket-db',
    waitForConnections: true,
    connectionLimit: 10
});

const promisePool = pool.promise();
module.exports = promisePool;