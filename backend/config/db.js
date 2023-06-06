const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'El23Va23in',
  database: 'task-managment'
});
 

module.exports = connection;