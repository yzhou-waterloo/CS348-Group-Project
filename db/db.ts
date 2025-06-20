import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'your_password',
  database: 'sampledb',
  waitForConnections: true,
  connectionLimit: 10
});

export default pool;
