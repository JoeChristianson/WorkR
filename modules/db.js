const mysql = require('mysql2');

const db = mysql.createConnection(
    {
   host: 'localhost',
   // MySQL username,
   user: 'root',
   password: 'rootroot',
   database: 'employee_mgmt_db'
   },)

module.exports = db;