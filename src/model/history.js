// Import connection
const connection = require('../config/mysql')

module.exports = {
    getAllHistory: () => {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM history', (error, result) => {
                !error ? resolve(result) : reject(new Error(error))
            })
        })
    }
}