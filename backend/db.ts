import mysql from 'mysql2';

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'crime_db',
  waitForConnections: true,
  connectionLimit: 10
}).promise();


export default pool;
