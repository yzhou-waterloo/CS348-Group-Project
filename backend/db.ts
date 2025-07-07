import mysql from 'mysql2';

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'crime_db',
  waitForConnections: true,
  connectionLimit: 10
<<<<<<< HEAD
}).promise();

=======
});
>>>>>>> 01266a109480a298b4d65c53b41f4c5520331cea

export default pool;
