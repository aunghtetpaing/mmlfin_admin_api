
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'naydodhr_mmlfin',
  password: 'welcomeinno$10000',
  database: 'naydodhr_mmlfin'
});

connection.connect(error => {
  if (error) throw error;
  console.log("Successfully connected to the database.");
});

module.exports = connection;