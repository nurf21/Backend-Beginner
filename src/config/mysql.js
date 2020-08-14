// Import dependencies
const mysql = require('mysql')

// Connect to database
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
})

// Error handling
connection.connect(error => {
    if (error) {
        throw error
    }
    console.log('You are now connected to database.')
})

// Export connection
module.exports = connection