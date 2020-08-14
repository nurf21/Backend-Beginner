// Import dependencies
const mysql = require('mysql')

// Connect to database using env
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
})

// Error handling when failed to connect to database
connection.connect(error => {
  if (error) {
    throw error
  }
  console.log(`You are now connected to database: ${process.env.DB_NAME}`)
})

// Export connection
module.exports = connection
