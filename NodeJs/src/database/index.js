const mysql = require('mysql2');

// Create a connection to the database
const pool = mysql.createPool({
  host: 'localhost', // Replace with your host name
  user: 'root',
  port:'3307',
  password: '123456', // Replace with your database password
  database: 'PHANDANGHAI' ,// Replace with your database name
  waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});
pool.getConnection((err, connection) => {
  if (err) {
    console.error('Error connecting to the database:', err);
  } else {
    console.log('Connected to the MySQL database.');
    connection.release(); // Nhớ trả lại kết nối vào pool sau khi kiểm tra xong
  }
});

module.exports = pool.promise();