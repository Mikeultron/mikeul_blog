const mysql = require('mysql');
const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'blog_db'
})

conn.connect((err) =>{
  if(err) throw err;
  console.log('Connected to DB!')
})

module.exports = conn;