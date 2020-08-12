// Import dependencies
const mysql = require('mysql')

// Mengkoneksikan dengan database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'pos_app'
})

// Handling error
connection.connect(error => {
    if (error) {
        throw error
    }
    console.log('You are now connected ...')
})

// Export koneksi
module.exports = connection