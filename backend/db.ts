import mysql from 'mysql2';

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'zy041203',
  database: 'crime_db',
  waitForConnections: true,
  connectionLimit: 10
});

export default pool;
