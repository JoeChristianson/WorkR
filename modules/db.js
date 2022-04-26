const mysql = require('mysql2');

const db = mysql.createConnection(
    {
   host: 'localhost',
   // MySQL username,
   user: 'root',
   password: "rootroot",
   database: "employee_mgmt_db",
//    password: process.env.MYSQL_PASSWORD,
//    database: process.env.MYSQL_DB_NAME,
   },)

module.exports = db;