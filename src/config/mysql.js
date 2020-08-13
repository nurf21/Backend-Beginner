// Import dependencies
const mysql = require('mysql')

// Connect to database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'pos_app'
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